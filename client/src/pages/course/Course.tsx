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
    const data = res?.data;

    setCourse(data?.course);
  };

  useEffect(() => {
    if (!user.token || !user.user) return;
    getCourse();
  }, [user]);

  const toggleModule = (moduleId: string) => {
    setExpanded((prev) => (prev === moduleId ? null : moduleId));
  };

  if (!course) {
    return <>Invalid Id or Course Not found</>;
  }

  return (
    <div className="space-y-8">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">
            {course.title}
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {course.modules.map((m: any) => (
          <Card className="bg-card border-border" key={m.id}>
            <CardHeader
              className="cursor-pointer flex flex-row items-center justify-between"
              onClick={() => toggleModule(m.id)}
            >
              <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                {expanded === m.id ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
                {m.title}
              </CardTitle>
            </CardHeader>

            {expanded === m.id && (
              <CardContent className="space-y-3 animate-in fade-in duration-200">
                {m.lessons.map((lesson: any) => (
                  <div
                    key={lesson._id}
                    className="
                      flex items-center gap-3 p-3 rounded-md
                      bg-muted border border-border
                      hover:bg-muted/70 cursor-pointer transition
                    "
                  >
                    <Link
                      to={`/course/${id}/module/${m.slug}/lesson/${lesson.slug}`}
                      className="flex items-center gap-x-2"
                    >
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{lesson.title}</span>
                    </Link>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
