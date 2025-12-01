import { Link, useLocation } from "react-router-dom";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { indexCourses } from "@/actions/course";

const items = [
    { title: "Home", url: "/course/1", icon: Home },
    { title: "Inbox", url: "/course/2", icon: Inbox },
    { title: "Calendar", url: "/course/3", icon: Calendar },
    { title: "Search", url: "/course/4", icon: Search },
    { title: "Settings", url: "/course/5", icon: Settings },
];

export default function MySidebar() {
    const { pathname } = useLocation();

    const [search, setSearch] = useState("");

    const user = useSelector((state: RootState) => state.user);

    const getCourses = async (token: string) => {
        const res = await indexCourses(token);


        console.log(res?.data);
    }
    useEffect(() => {
        if (!user.token) return;

        getCourses(user.token);
    }, [user])

    return (
        <Sidebar className="bg-[#0d0d0d] border-r border-[#1f1f1f]">
            <SidebarContent className="px-3 py-5">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-sm text-gray-400 mb-3">
                        My Courses
                    </SidebarGroupLabel>

                    <div className="mb-4">
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search courses..."
                            className="bg-[#1a1a1a] border-[#333] text-white placeholder:text-gray-500"
                        />
                    </div>


                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {items.map((item) => {
                                const isActive = pathname.startsWith(item.url);

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                to={item.url}
                                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
                            ${isActive
                                                        ? "bg-[#1d1d1d] text-white"
                                                        : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
                                                    }
                        `}
                                            >
                                                <item.icon className="w-5 h-5" />
                                                <span className="text-sm font-medium">
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
