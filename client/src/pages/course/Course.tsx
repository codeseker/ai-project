import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { useAsyncHandler } from "@/utils/async-handler";
import { showCourse } from "@/actions/course";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function CourseDetails() {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user);

  const asyncHandler = useAsyncHandler();
  const safeCourseView = asyncHandler(showCourse);

  const [course, setCourse] = useState<any>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const getCourse = async () => {
    const res = await safeCourseView(user.token as string, {
      courseId: id as string,
    });

    setCourse(res?.data?.course);
  };

  useEffect(() => {
    if (!user.token) return;
    getCourse();
  }, [user]);

  const toggleModule = (moduleId: string) => {
    setExpanded((prev) => (prev === moduleId ? null : moduleId));
  };

  if (!course) {
    return (
      <div className="text-muted-foreground">
        Invalid Id or Course Not found
      </div>
    );
  }

  return (
    <div className="bg-background px-6 py-10 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* Course Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{course.title}</h1>
          <p className="text-muted-foreground">
            {course.modules.length} modules
          </p>
        </div>

        {/* Modules */}
        <div className="space-y-4">
          {course.modules.map((m: any) => (
            <Card key={m.id} className="border-border">
              <CardHeader
                onClick={() => toggleModule(m.id)}
                className="
                  cursor-pointer flex flex-row items-center justify-between
                  hover:bg-accent transition rounded-md
                "
              >
                <CardTitle className="flex items-center gap-2 text-lg">
                  {expanded === m.id ? (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                  {m.title}
                </CardTitle>
              </CardHeader>

              {expanded === m.id && (
                <CardContent className="pt-0 space-y-2">
                  {m.lessons.map((lesson: any) => (
                    <Link
                      key={lesson._id}
                      to={`/course/${id}/module/${m.slug}/lesson/${lesson.slug}`}
                      className="
                        group flex items-center gap-3
                        rounded-md border border-border
                        px-4 py-3
                        bg-card
                        hover:bg-accent transition
                      "
                    >
                      <BookOpen className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                      <span className="text-foreground">{lesson.title}</span>
                    </Link>
                  ))}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
