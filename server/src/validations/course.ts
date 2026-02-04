import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { errorResponse } from "../utils/api";
import { z } from "zod";
import Course from "../models/course";
import { AIModel } from "../types/ai";
import { ERROR } from "../utils/error";

export const indexValidation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit, search } = req.query;
    const errors: { field: string; message: string }[] = [];

    if (page !== undefined && (isNaN(Number(page)) || Number(page) <= 0)) {
      errors.push({
        field: "page",
        message: "Page must be a positive number",
      });
    }

    if (limit !== undefined && (isNaN(Number(limit)) || Number(limit) <= 0)) {
      errors.push({
        field: "limit",
        message: "Limit must be a positive number",
      });
    }

    if (search !== undefined && typeof search !== "string") {
      errors.push({
        field: "search",
        message: "Search must be a string",
      });
    }

    if (errors.length > 0) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Validation Error",
        errorCode: ERROR.PAGINATION_ERROR,
        errors,
      });
    }

    next();
  },
);

const createCourseSchema = z.object({
  prompt: z.string().min(10).max(500),
});

export const createValidation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { prompt } = req.body;

    const parseResult = createCourseSchema.safeParse({
      prompt,
    });

    if (!parseResult.success) {
      const errors = parseResult.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      }));
      return errorResponse(res, {
        statusCode: 400,
        message: "Validation Error",
        errorCode: ERROR.COURSE_PROMPT,
        errors,
      });
    }

    next();
  },
);

export const courseIdValidation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;

    if (!courseId) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Validation Error",
        errorCode: ERROR.COURSE_ID,
        errors: [{ field: "courseId", message: "Course ID is required" }],
      });
    }

    const schema = z.object({
      courseId: z.string().nonempty("Course ID is required"),
    });

    const parseResult = schema.safeParse({
      courseId,
    });

    if (!parseResult.success) {
      const errors = parseResult.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      }));
      return errorResponse(res, {
        statusCode: 400,
        message: "Validation Error",
        errorCode: ERROR.COURSE_ID,
        errors,
      });
    }

    const courseData = await Course.findOne({
      slug: courseId,
      isDeleted: false,
      createdBy: (req as any).user.id,
    });

    if (!courseData) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Course not found",
        errorCode: ERROR.COURSE_NOT_FOUND,
      });
    }

    next();
  },
);

export async function validateUserQuery(
  model: AIModel,
  securityChecks: string,
  userQuery: string,
): Promise<{ isValid: boolean; reasons: string[] }> {
  try {
    const checks = await model.generateContent({
      contents: [
        {
          role: "system",
          parts: [{ text: securityChecks }],
        },
        {
          role: "user",
          parts: [{ text: userQuery }],
        },
      ],
    });

    const responseText = checks.response.text();

    if (!responseText) {
      return {
        isValid: false,
        reasons: ["Model returned an empty or invalid response."],
      };
    }

    let json;

    // ---- Safe JSON extraction ----
    try {
      json = JSON.parse(responseText);
    } catch (err) {
      return {
        isValid: false,
        reasons: ["Failed to parse validation response as JSON."],
      };
    }

    // ---- Mandatory schema enforcement ----
    if (typeof json.isValid !== "boolean" || !Array.isArray(json.reasons)) {
      return {
        isValid: false,
        reasons: [
          "Validation response JSON structure is incorrect.",
          "Expected: { isValid: boolean, reasons: [] }",
        ],
      };
    }

    return json; // { isValid: true/false, reasons: [...] }
  } catch (err) {
    console.error("Validation Error:", err);

    return {
      isValid: false,
      reasons: ["Validation call failed internally."],
    };
  }
}
