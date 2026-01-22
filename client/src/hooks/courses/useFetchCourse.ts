import { indexCourses } from "@/actions/course";
import { setCourses, type ICourseItem } from "@/store/slices/course";
import type { RootState } from "@/store/store";
import { useAsyncHandler } from "@/utils/async-handler";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useCourseFetch() {
  const asyncHandler = useAsyncHandler();
  const safeIndexCourses = asyncHandler(indexCourses);
  const user = useSelector((state: RootState) => state.user);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["courses", user.user?.id],
    queryFn: () => safeIndexCourses(user?.token ?? ""),
    enabled: !!user?.token,
    select: (res) => {
      if (!res) {
        return;
      }

      return (res.data?.courses ?? []).map((course) => ({
        id: course.id,
        title: course.title,
        moduleId: course.modules[0]._id,
        lessonId: course.modules[0].lessons[0]._id,
        slug: course.slug,
        moduleSlug: course.modules[0].slug,
        lessonSlug: course.modules[0].lessons[0].slug,
      }));
    },
  });

  return {
    courses: data ?? [],
    isLoading,
    isError,
    error,
  };
}
