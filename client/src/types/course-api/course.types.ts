import type { Course } from "../common";

export interface SingleCourseResponse {
  course: Course;
}

export interface MultipleCoursesResponse {
  courses: Course[];
}

export interface CreateCourseResponse {
  courseId: string;
  title: string;
  description: string;
  slug: string;
}

export interface DeleteCourseResponse {
  
}
