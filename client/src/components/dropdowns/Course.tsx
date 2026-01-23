import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import useCourseFetch from "@/hooks/courses/useFetchCourse";

export function CourseDropdown({ courseId }: { courseId: string }) {
  const { courses } = useCourseFetch();
  const active = courses.find((c) => c?.slug === courseId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 font-medium text-primary">
        {active?.title ?? "Course"}
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {courses.map(
          (c) =>
            c && (
              <DropdownMenuItem key={c.id} asChild>
                <Link to={`/course/${c.slug}`}>{c.title}</Link>
              </DropdownMenuItem>
            ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
