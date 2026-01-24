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

  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

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
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading course…</p>
        </div>
      </div>
    );
  }

  /* ------------------ NOT FOUND ------------------ */
  if (!course || isError || error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="space-y-5 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Course not found
          </h1>
          <p className="text-muted-foreground">
            The course you are looking for doesn’t exist or may have been
            removed.
          </p>
          <button
            onClick={() => navigate("/")}
            className="font-medium text-primary hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  if (!selectedModule || !selectedLesson) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <AppSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <CourseNavbar
          course={course}
          selectedModule={selectedModule}
          selectedLesson={selectedLesson}
          onModuleChange={setSelectedModule}
          onLessonChange={setSelectedLesson}
        />

        <main className="flex-1 overflow-y-auto bg-background">
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
