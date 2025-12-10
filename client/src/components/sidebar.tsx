import React, { useEffect, useState } from "react"
import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { Courses } from "@/components/sidebar-content"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { useAsyncHandler } from "@/utils/async-handler"
import { indexCourses, type MultipleCoursesResponse } from "@/actions/course"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { setCourses } from "@/store/slices/course"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();
  const asyncHandler = useAsyncHandler();
  const safeIndexCourses = asyncHandler(indexCourses);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const user = useSelector((state: RootState) => state.user);

  const courses = useSelector(
    (state: RootState) => state.course.courses
  ) as { id: string; title: string, moduleId: string, lessonId: string }[];

  const getCourses = async (token: string) => {
    const res = await safeIndexCourses(token);

    if (!res?.data) return;

    const data: MultipleCoursesResponse = res?.data;


    const temp = data.courses.map((course) => ({
      id: course.id,
      title: course.title,
      moduleId: course.modules[0]._id,
      lessonId: course.modules[0].lessons[0]._id
    }));

    dispatch(setCourses(temp));
  };
  useEffect(() => {
    if (!user.token) return;
    getCourses(user.token);
  }, [user]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link to={"/"}> My APP </Link>
      </SidebarHeader>
      <SidebarContent>
        {courses.length > 0 ? <Courses projects={courses} /> : <p>No Courses Yet</p>}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
