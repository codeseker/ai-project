import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppSidebar } from "@/components/app-sidebar";
import { CourseNavbar } from "@/components/course-navbar";
import { LessonContent } from "@/pages/lesson/Lesson";
import useFetchSingleCourse from "@/hooks/courses/useFetchSingleCourse";
import type { Lesson, Module } from "@/types/common";

export default function CoursePage() {
  const navigate = useNavigate();

  const {
    courseData: course,
    isLoading,
    isError,
    error,
  } = useFetchSingleCourse();

  // ✅ hooks ALWAYS declared
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // ✅ sync state after data arrives
  useEffect(() => {
    if (!course) return;

    const firstModule = course.modules?.[0];
    const firstLesson = firstModule?.lessons?.[0];

    if (firstModule && firstLesson) {
      setSelectedModule(firstModule);
      setSelectedLesson(firstLesson);
    }
  }, [course]);

  /* ------------------ LOADING ------------------ */
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  /* ------------------ NOT FOUND ------------------ */
  if (!course || isError || error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <p className="text-muted-foreground">
            The course you are looking for does not exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-primary hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  // extra safety
  if (!selectedModule || !selectedLesson) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <CourseNavbar
          course={course}
          selectedModule={selectedModule}
          selectedLesson={selectedLesson}
          onModuleChange={setSelectedModule}
          onLessonChange={setSelectedLesson}
        />

        <main className="flex-1 overflow-y-auto">
          <LessonContent
            lesson={selectedLesson}
            module={selectedModule}
            courseTitle={course.title}
          />
        </main>
      </div>
    </div>
  );
}
