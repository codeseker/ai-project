import { BookIcon, Folder, MoreHorizontal, Trash2 } from "lucide-react";

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

export function Courses({ projects }: { projects: ICourseItem[] }) {
  const { isMobile } = useSidebar();
  const { mutateAsync: deleteCourse } = useDeleteCourse();

  const handleDelete = async (id: string) => {
    await deleteCourse(id);
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>My Courses</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          let url = `/course/${item.slug}/module/${item.moduleSlug}/lesson/${item.lessonSlug}`;
          return (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <Link to={url}>
                  <BookIcon />
                  <span>{item.title}</span>
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
                  <DropdownMenuItem>
                    <Folder className="text-muted-foreground" />
                    <Link to={`/course/${item.slug}`}>
                      <span>View Course</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleDelete(item.slug)}>
                    <Trash2 className="text-muted-foreground" />
                    <span>Delete Course</span>
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
