import { Outlet, useParams, Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { CourseDropdown } from "../dropdowns/Course";
import { ModuleDropdown } from "../dropdowns/Module";
import { LessonDropdown } from "../dropdowns/Lesson";

/**
 * CourseLayout
 * - Sidebar: collapsed (for course switching)
 * - Top navbar: course/module/lesson navigation
 */
export default function CourseLayout() {
  const { courseId, modId, lessonId } = useParams();

  return (
    <SidebarProvider defaultOpen={false}>
      {/* Collapsed sidebar */}
      <AppSidebar />

      <SidebarInset className="flex flex-col bg-background">
        {/* COURSE NAVBAR */}
        <header
          className="
            sticky top-0 z-20
            flex h-14 items-center gap-4
            border-b border-border
            bg-background/80 backdrop-blur
            px-6
          "
        >
          {/* COURSE DROPDOWN */}
          <CourseDropdown courseId={courseId!} />

          <ChevronRight className="h-4 w-4 text-muted-foreground" />

          {/* MODULE DROPDOWN */}
          <ModuleDropdown courseId={courseId!} activeModuleId={modId} />

          <ChevronRight className="h-4 w-4 text-muted-foreground" />

          {/* LESSON DROPDOWN */}
          <LessonDropdown
            courseId={courseId!}
            moduleId={modId!}
            activeLessonId={lessonId}
          />

          {/* RIGHT SIDE */}
          <div className="ml-auto flex items-center gap-4">
            <button className="text-sm text-muted-foreground hover:text-foreground">
              Profile
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground">
              Logout
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
