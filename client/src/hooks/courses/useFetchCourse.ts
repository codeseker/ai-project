import { indexCourses } from "@/actions/course";
import { type ICourseItem } from "@/store/slices/course";
import type { RootState } from "@/store/store";
import { useAsyncHandler } from "@/utils/async-handler";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function useCourseFetch() {
  const asyncHandler = useAsyncHandler();
  const safeIndexCourses = asyncHandler(indexCourses);
  const user = useSelector((state: RootState) => state.user);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["courses", user.user?.id],
    queryFn: () => safeIndexCourses(user?.token ?? ""),
    enabled: !!user?.token,
    select: (res) => {
      if (!res?.data?.courses) return [];

      return res.data.courses
        .filter((course) => course.modules?.length)
        .map((course) => {
          const module = course.modules[0];
          const lesson = module?.lessons?.[0];

          if (!lesson) return null;

          return {
            id: course.id,
            title: course.title,
            moduleId: module._id,
            lessonId: lesson._id,
            slug: course.slug,
            moduleSlug: module.slug,
            lessonSlug: lesson.slug,
          } as ICourseItem;
        })
        .filter(Boolean);
    },
  });

  return {
    courses: data ?? [],
    isLoading,
    isError,
    error,
  };
}
