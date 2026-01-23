import {
  BookIcon,
  Folder,
  MoreHorizontal,
  Trash2,
  Sparkles,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import useDeleteCourse from "@/hooks/courses/useDeleteCourse";
import type { ICourseItem } from "@/store/slices/course";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Courses({ projects }: { projects: (ICourseItem | null)[] }) {
  const { isMobile } = useSidebar();
  const { mutateAsync: deleteCourse } = useDeleteCourse();

  const hasCourses = projects.some(Boolean);

  const handleDelete = async (id: string) => {
    await deleteCourse(id);
  };

  /* ---------------- EMPTY STATE ---------------- */
  if (!hasCourses) {
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel className="text-xs tracking-wide">
          YOUR COURSES
        </SidebarGroupLabel>

        <div className="px-3 py-4 space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            You haven’t created or been added to any courses yet.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Create Course
            </div>

            <p className="text-xs text-muted-foreground">
              Generate a course by entering a topic
            </p>

            <Input placeholder="Enter course topic" className="h-9" />

            <Button className="w-full">Create</Button>
          </div>
        </div>
      </SidebarGroup>
    );
  }

  /* ---------------- COURSE LIST ---------------- */
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>My Courses</SidebarGroupLabel>

      <SidebarMenu>
        {projects.map((item) => {
          if (!item) return null;

          const url = `/course/${item.slug}/module/${item.moduleSlug}/lesson/${item.lessonSlug}`;

          return (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <Link to={url}>
                  <BookIcon className="h-4 w-4" />
                  <span className="truncate">{item.title}</span>
                </Link>
              </SidebarMenuButton>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-44 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem asChild>
                    <Link to={`/course/${item.slug}`}>
                      <Folder className="mr-2 h-4 w-4 text-muted-foreground" />
                      View Course
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => handleDelete(item.slug)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Course
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
