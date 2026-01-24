import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { BookOpen, ChevronRight, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import useCoursesFetch from "@/hooks/courses/useFetchCourses"

/* ------------------ DUMMY DATA ------------------ */
const dummyCourses = [
  { id: "1", title: "React for Beginners" },
  { id: "2", title: "Advanced TypeScript" },
  { id: "3", title: "Fullstack Web Development" },
]

export function AppSidebar() {
  const location = useLocation()
  const isMobile = useIsMobile()

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const {courses, error, isError, isLoading: areCoursesLoading} = useCoursesFetch();


  const handleCourseClick = () => {
    if (isMobile) setSidebarOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      {!sidebarOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">CourseHub</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Course List */}
          <div className="flex-1 overflow-hidden">
            <div className="px-4 py-4">
              <p className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Your Courses
              </p>
            </div>

            <ScrollArea className="h-[calc(100vh-200px)] px-4">
              <div className="space-y-1">
                {courses.length === 0 ? (
                  <p className="px-2 py-4 text-sm text-muted-foreground">
                    No courses yet.
                  </p>
                ) : (
                  courses.map((course) => {
                    const isActive =
                      location.pathname === `/course/${course.slug}`

                    return (
                      <Link
                        key={course.id}
                        to={`/course/${course.slug}/module/${course.moduleSlug}/lesson/${course.lessonSlug}`}
                        onClick={handleCourseClick}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "hover:bg-sidebar-accent/50"
                        )}
                      >
                        <span className="truncate">{course.title}</span>
                        <ChevronRight className="h-4 w-4 opacity-50" />
                      </Link>
                    )
                  })
                )}
              </div>
            </ScrollArea>
          </div>

          {/* User Profile */}
          <div className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 px-2"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">John Doe</span>
                    <span className="text-xs text-muted-foreground">
                      john@example.com
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
    </>
  )
}
