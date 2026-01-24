import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  ChevronRight,
  LogOut,
  Menu,
  SunMoon,
  User,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import useCoursesFetch from "@/hooks/courses/useFetchCourses";
import { toggleTheme } from "@/store/slices/theme";
import { useDispatch } from "react-redux";

export function AppSidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const { courses } = useCoursesFetch();

  const handleCourseClick = () => {
    if (isMobile) setSidebarOpen(false);
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {!sidebarOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-4 z-50 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-30 bg-background/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-72 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary shadow-sm">
                <BookOpen className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-sidebar-primary">
                CourseHub
              </span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Course List */}
          <div className="flex-1 overflow-hidden">
            <div className="px-4 py-4">
              <p className="px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70">
                Your Courses
              </p>
            </div>

            <ScrollArea className="h-[calc(100vh-200px)] px-4">
              <div className="space-y-1">
                {courses.length === 0 ? (
                  <p className="px-2 py-4 text-sm text-sidebar-foreground/60">
                    No courses yet.
                  </p>
                ) : (
                  courses.map((course) => {
                    const isActive = location.pathname.includes(
                      `/course/${course.slug}`,
                    );

                    return (
                      <Link
                        key={course.id}
                        to={`/course/${course.slug}/module/${course.moduleSlug}/lesson/${course.lessonSlug}`}
                        onClick={handleCourseClick}
                        className={cn(
                          "group flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                        )}
                      >
                        <span className="truncate">{course.title}</span>
                        <ChevronRight className="h-4 w-4 opacity-40 transition group-hover:opacity-70" />
                      </Link>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </div>

          {/* User Profile */}
          <div className="border-t border-sidebar-border p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 px-2 hover:bg-sidebar-accent"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">John Doe</span>
                    <span className="text-xs text-sidebar-foreground/60">
                      john@example.com
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleToggleTheme}
                  className="flex items-center gap-2"
                >
                  <SunMoon className="h-4 w-4" />
                  Toggle Theme
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
    </>
  );
}
