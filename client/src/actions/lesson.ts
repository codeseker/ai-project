import type { ApiResponse } from "@/types/api-response";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_API_URL_LOCAL;

export interface HeadingBlock {
  type: "heading";
  text: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface CodeBlock {
  type: "code";
  language: string;
  text: string;
}

export interface MCQBlock {
  type: "mcq";
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface VideoBlock {
  type: "video";
  query: string;
}

export type ContentBlock = HeadingBlock | ParagraphBlock | CodeBlock | MCQBlock;

export interface LessonContentResponse {
  content: ContentBlock[];
  navigation: {
    nextModuleSlug: string | null;
    nextLessonSlug: string | null;
  };
  ytVideos: string[];
}

export async function generateLessonContent(
  token: string,
  {
    courseId,
    moduleId,
    lessonId,
  }: {
    courseId: string;
    moduleId: string;
    lessonId: string;
  },
): Promise<ApiResponse<LessonContentResponse>> {
  const res = await axios.post(
    `${baseUrl}/lesson/create`,
    {
      courseId,
      moduleId,
      lessonId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  return res.data as ApiResponse<LessonContentResponse>;
}
