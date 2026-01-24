import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Course, Lesson, Module } from "@/types/common";

interface CourseNavbarProps {
  course: Course;
  selectedModule: Module;
  selectedLesson: Lesson;
  onModuleChange: (module: Module) => void;
  onLessonChange: (lesson: Lesson) => void;
}

export function CourseNavbar({
  course,
  selectedModule,
  selectedLesson,
  onModuleChange,
  onLessonChange,
}: CourseNavbarProps) {
  const navigate = useNavigate();
  const [moduleOpen, setModuleOpen] = useState(false);
  const [lessonOpen, setLessonOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-2 px-4 lg:px-6">
        {/* Home */}
        <Link to="/" className="hidden lg:block">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Button>
        </Link>

        <ChevronRight className="hidden lg:block h-4 w-4 text-muted-foreground" />

        {/* Course Name */}
        <span className="hidden sm:inline-block truncate max-w-[150px] text-sm font-medium">
          {course.title}
        </span>

        <ChevronRight className="h-4 w-4 text-muted-foreground" />

        {/* Module Dropdown */}
        <DropdownMenu open={moduleOpen} onOpenChange={setModuleOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 gap-1 px-2 text-sm font-medium"
            >
              <span className="truncate max-w-[120px] sm:max-w-[200px]">
                {selectedModule.title}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  moduleOpen && "rotate-180",
                )}
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-64">
            {course.modules.map((module) => (
              <DropdownMenuItem
                key={module.id}
                onClick={() => {
                  let url = `/course/${course.slug}/module/${module.slug}/`;
                  onModuleChange(module);
                  if (module.lessons.length > 0) {
                    url += `lesson/${module.lessons[0].slug}`;
                    onLessonChange(module.lessons[0]);
                  }

                  navigate(url);
                }}
                className={cn(selectedModule.id === module.id && "bg-accent")}
              >
                {module.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <ChevronRight className="h-4 w-4 text-muted-foreground" />

        {/* Lesson Dropdown */}
        <DropdownMenu open={lessonOpen} onOpenChange={setLessonOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 gap-1 px-2 text-sm font-medium"
            >
              <span className="truncate max-w-[120px] sm:max-w-[200px]">
                {selectedLesson.title}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  lessonOpen && "rotate-180",
                )}
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-64">
            {selectedModule.lessons.map((lesson) => (
              <DropdownMenuItem
                key={lesson._id}
                onClick={() => {
                  let url = `/course/${course.slug}/module/${selectedModule.slug}/lesson/${lesson.slug}`;
                  onLessonChange(lesson);
                  navigate(url);
                }}
                className={cn(selectedLesson._id === lesson._id && "bg-accent")}
              >
                {lesson.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
