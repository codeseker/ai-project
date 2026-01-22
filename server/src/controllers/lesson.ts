import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { errorResponse, successResponse } from "../utils/api";
import { lessonPrompt } from "../constants/prompts/lesson";
import { model } from "../config/ai";
import moduleModel from "../models/modules";
import lesson from "../models/lesson";
import course from "../models/course";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { courseId, moduleId, lessonId } = req.body;

  const courseData = await course.findOne({
    slug: courseId,
    isDeleted: false,
    createdBy: (req as any).user.id,
  });

  if (!courseData) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Course not found",
    });
  }

  const moduleData = await moduleModel
    .findOne({
      slug: moduleId,
      isDeleted: false,
      course: courseData._id,
    })
    .populate({
      path: "lessons",
      select: "title description order slug",
    })
    .exec();

  if (!moduleData) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Module not found",
    });
  }

  const lessonData = await lesson.findOne({
    slug: lessonId,
    isDeleted: false,
    module: moduleData._id,
  });

  if (!lessonData) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Lesson not found",
    });
  }

  /* ---------------- EXISTING CONTENT CHECK ---------------- */

  const content = lessonData.content;
  let isEmpty = false;

  if (typeof content === "string" || content instanceof String) {
    isEmpty = content.toString().trim().length === 0;
  } else if (Array.isArray(content)) {
    isEmpty = content.length === 0;
  } else if (typeof content === "object" && content !== null) {
    isEmpty = Object.keys(content).length === 0;
  } else {
    isEmpty = true;
  }

  /* ---------------- ADD: NEXT LESSON LOGIC ---------------- */

  const lessons = ((moduleData as any).lessons ?? []).sort(
    (a: any, b: any) => a.order - b.order,
  );

  const currentIndex = lessons.findIndex((l: any) => l.slug === lessonId);

  const nextLessonInSameModule =
    currentIndex !== -1 ? lessons[currentIndex + 1] : null;

  let nextModuleSlug: string | null = null;
  let nextLessonSlug: string | null = null;

  if (nextLessonInSameModule) {
    nextModuleSlug = (moduleData as any).slug;
    nextLessonSlug = nextLessonInSameModule.slug;
  }

  /* -------------------------------------------------------- */

  if (!isEmpty) {
    return successResponse(res, {
      statusCode: 200,
      message: "Lesson Created Successfully",
      data: {
        content,
        navigation: {
          nextModuleSlug,
          nextLessonSlug,
        },
      },
    });
  }

  /* ---------------- ADD: NEXT MODULE FALLBACK ---------------- */

  if (!nextLessonInSameModule) {
    const nextModule = await moduleModel
      .findOne({
        course: courseData._id,
        isDeleted: false,
        order: { $gt: (moduleData as any).order },
      })
      .sort({ order: 1 })
      .select("slug")
      .populate({
        path: "lessons",
        match: { isDeleted: false },
        options: { sort: { order: 1 }, limit: 1 },
        select: "slug",
      })
      .lean();

    if (nextModule && (nextModule as any).lessons?.length) {
      nextModuleSlug = nextModule.slug;
      nextLessonSlug = (nextModule as any).lessons[0].slug;
    }
  }

  /* ---------------------------------------------------------- */

  const upcomingLessons = lessons.filter(
    (l: any) => l.slug !== lessonId && l.order > lessonData.order,
  );

  const prompt = lessonPrompt({
    courseTitle: courseData.title,
    moduleTitle: moduleData.title,
    lessonTitle: lessonData.title,
    lessonOrder: lessonData.order,
    upcomingLessons,
  });

  const response = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  const text = response.response.text();

  const cleaned = JSON.parse(
    JSON.stringify(text)
      .replace(/^```(json)?/i, "")
      .replace(/```$/i, ""),
  ).replace(/\\n/g, "\n");

  lessonData.content = cleaned;
  await lessonData.save();

  return successResponse(res, {
    statusCode: 200,
    message: "Lesson created successfully",
    data: {
      content: cleaned,
      navigation: {
        nextModuleSlug,
        nextLessonSlug,
      },
    },
  });
});
