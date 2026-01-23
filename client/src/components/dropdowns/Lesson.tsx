import useFetchSingleCourse from "@/hooks/courses/useFetchSingleCourse";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export function LessonDropdown({
  courseId,
  moduleId,
  activeLessonId,
}: {
  courseId: string;
  moduleId: string;
  activeLessonId?: string;
}) {
  const { courseData } = useFetchSingleCourse();
  const module = courseData?.modules.find((m) => m.slug === moduleId);
  const active = module?.lessons.find((l) => l.slug === activeLessonId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 font-medium">
        {active?.title ?? "Lesson"}
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {module?.lessons.map((l) => (
          <DropdownMenuItem key={l._id} asChild>
            <Link
              to={`/course/${courseId}/module/${moduleId}/lesson/${l.slug}`}
            >
              {l.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
