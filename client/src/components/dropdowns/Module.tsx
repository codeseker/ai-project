import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import useCourseDetails from "@/hooks/courses/useFetchSingleCourse";

export function ModuleDropdown({
  courseId,
  activeModuleId,
}: {
  courseId: string;
  activeModuleId?: string;
}) {
  const { courseData } = useCourseDetails();
  const active = courseData?.modules.find((m) => m.slug === activeModuleId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 font-medium">
        {active?.title ?? "Module"}
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {courseData?.modules.map((m) => (
          <DropdownMenuItem key={m.id} asChild>
            <Link to={`/course/${courseId}/module/${m.slug}`}>{m.title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
