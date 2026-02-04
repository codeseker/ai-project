import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { getImageUrl } from "@/utils/getImageUrl";
import useFetchCoursesWithStats from "@/hooks/courses/useFetchCoursesWithStats";
import useDeleteCourse from "@/hooks/courses/useDeleteCourse";
import { Loader2, BookOpen, Trophy, Clock, Upload, Trash2 } from "lucide-react";
import useAvatarUpload from "@/hooks/user/useAvatarUpload";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function Profile() {
  const stateUser = useSelector((state: RootState) => state.user);

  const user = {
    name: stateUser.user?.name,
    email: stateUser.user?.email,
    avatar: stateUser.user?.avatar?.url
      ? getImageUrl(stateUser.user?.avatar?.url)
      : "",
  };

  const [deletingCourseSlug, setDeletingCourseSlug] = useState<string | null>(
    null,
  );
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({});

  const { coursesWithStatsData, isLoading, error } = useFetchCoursesWithStats();
  const { mutateAsync: deleteCourse, isPending: deleteCoursePending } =
    useDeleteCourse();
  const { handleFileChange } = useAvatarUpload();

  const courses = coursesWithStatsData?.data?.courses || [];

  const stats = useMemo(() => {
    const total = courses.length;
    const completed = courses.filter((c) => c.stats.progress === 100).length;
    const inProgress = courses.filter(
      (c) => c.stats.progress > 0 && c.stats.progress < 100,
    ).length;

    return [
      { label: "Total Courses", value: total, icon: BookOpen },
      { label: "Completed", value: completed, icon: Trophy },
      { label: "In Progress", value: inProgress, icon: Clock },
    ];
  }, [courses]);

  const toggleDescription = (courseId: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  const handleDeleteCourse = async (courseId: string) => {
    setDeletingCourseSlug(courseId);
    await deleteCourse(courseId);
    setDeletingCourseSlug(null);
  };

  if (error) {
    return <p className="p-6 text-destructive">{error.message}</p>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 p-6 text-foreground">
      {/* PAGE TITLE */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground text-sm">
          Manage your account and track your learning progress
        </p>
      </div>

      {/* PROFILE HEADER */}
      <Card className="border-border/60 shadow-sm">
        <CardContent className="flex flex-col md:flex-row items-center gap-8 p-8">
          {isLoading ? (
            <Skeleton className="h-28 w-28 rounded-full" />
          ) : (
            <Avatar className="h-28 w-28 shadow-md rounded-full overflow-hidden">
              {user.avatar ? (
                <AvatarImage
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <AvatarFallback className="text-2xl flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                  {user.name?.charAt(0) ?? "U"}
                </AvatarFallback>
              )}
            </Avatar>
          )}

          <div className="flex-1 text-center md:text-left space-y-3">
            {isLoading ? (
              <>
                <Skeleton className="h-7 w-52" />
                <Skeleton className="h-4 w-64" />
              </>
            ) : (
              <>
                <h2 className="text-3xl font-semibold tracking-tight">
                  {user.name}
                </h2>
                <p className="text-muted-foreground">{user.email}</p>
              </>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 md:justify-start">
              {/* Hidden file input */}
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Trigger */}
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <Button
                  asChild
                  size="sm"
                  className="
        flex items-center gap-2
        rounded-md
        bg-primary text-primary-foreground
        shadow-sm
        transition-all
        hover:bg-primary/90 hover:shadow-md
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      "
                >
                  <span>
                    <Upload className="h-4 w-4" />
                    Change Avatar
                  </span>
                </Button>
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* STATS */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              key={i}
              className="border-border/60 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    <p className="text-3xl font-semibold tracking-tight">
                      {stat.value}
                    </p>
                  )}
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Your Courses</h2>
        <p className="text-sm text-muted-foreground">
          Track progress, explore modules, and continue learning
        </p>
      </div>

      {/* COURSES */}
      {courses.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-6">
          {courses.map((course) => (
            <AccordionItem
              key={course.id}
              value={course.id}
              className="rounded-2xl border border-border/60 bg-card"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline">
                <div className="flex w-full items-start justify-between gap-6">
                  {/* LEFT */}
                  <div className="space-y-2 text-left max-w-2xl">
                    <h3 className="text-lg font-semibold leading-snug">
                      {course.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p
                      className={cn(
                        "text-sm text-muted-foreground transition-all",
                        !expandedDescriptions[course.id] && "line-clamp-2",
                      )}
                    >
                      {course.description}
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDescription(course.id);
                      }}
                      className="text-xs text-primary hover:underline"
                    >
                      {expandedDescriptions[course.id]
                        ? "View less"
                        : "View more"}
                    </button>

                    {/* TARGET AUDIENCE */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {course.targetAudience.slice(0, 3).map((aud) => (
                        <Badge key={aud} variant="secondary">
                          {aud}
                        </Badge>
                      ))}

                      {course.targetAudience.length > 3 && (
                        <Badge variant="outline">
                          +{course.targetAudience.length - 3} more
                        </Badge>
                      )}

                      <Badge variant="outline">{course.intentCategory}</Badge>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col items-end gap-3 min-w-[200px]">
                    <div className="w-full space-y-1">
                      <Progress value={course.stats.progress} />
                      <p className="text-xs text-muted-foreground text-right">
                        {course.stats.completedLessons}/
                        {course.stats.totalLessons} lessons
                      </p>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      ⏱ {course.estimatedDuration} mins
                    </p>

                    {/* DELETE */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCourse(course.slug);
                      }}
                      disabled={
                        deleteCoursePending &&
                        deletingCourseSlug === course.slug
                      }
                      className="text-destructive hover:text-destructive cursor-pointer"
                    >
                      {deleteCoursePending &&
                      deletingCourseSlug === course.slug ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <Accordion type="multiple" className="space-y-4">
                  {course.modules.map((module) => (
                    <AccordionItem
                      key={module.id}
                      value={module.id}
                      className="rounded-xl border border-border/60"
                    >
                      <AccordionTrigger className="px-4 py-3 hover:no-underline">
                        <div className="flex w-full items-center justify-between">
                          <div className="text-left space-y-1">
                            <p className="font-medium">{module.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {module.description}
                            </p>
                          </div>

                          <Badge
                            variant={
                              module.isCompleted ? "default" : "secondary"
                            }
                          >
                            {module.isCompleted ? "Completed" : "In Progress"}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="space-y-2">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson._id}
                              className="
                        flex items-start justify-between
                        rounded-lg border border-border/50
                        bg-muted/40 px-4 py-3
                      "
                            >
                              <div className="space-y-1">
                                <p className="text-sm font-medium">
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {lesson.description}
                                </p>
                              </div>

                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>{lesson.estimatedMinutes} min</span>
                                {lesson.isCompleted && (
                                  <Badge variant="outline">Done</Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="rounded-full bg-muted p-4">
            <BookOpen className="h-6 w-6 text-muted-foreground" />
          </div>

          <div className="space-y-1">
            <p className="text-lg font-medium">No courses yet</p>
            <p className="text-sm text-muted-foreground max-w-sm">
              Start by creating your first course and begin tracking progress
              here.
            </p>
          </div>

          <Button asChild className="mt-2">
            <Link to="/">Create your first course</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
