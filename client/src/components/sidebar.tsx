import React from "react";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

import { Courses } from "@/components/sidebar-content";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import useCourseFetch from "@/hooks/courses/useFetchCourse";

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { courses } = useCourseFetch();

  return (
    <Sidebar collapsible="icon" className="border-r bg-background" {...props}>
      {/* ---------- HEADER ---------- */}
      <SidebarHeader className="px-4 py-3">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-lg text-foreground"
        >
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="truncate">My App</span>
        </Link>
      </SidebarHeader>

      <Separator />

      {/* ---------- CONTENT ---------- */}
      <SidebarContent className="px-2 py-3">
        {/* Courses handles BOTH list & empty state */}
        <Courses projects={courses} />
      </SidebarContent>

      <Separator />

      {/* ---------- FOOTER ---------- */}
      <SidebarFooter className="p-2">
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
