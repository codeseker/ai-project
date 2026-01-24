import { showCourse } from "@/actions/course";
import type { RootState } from "@/store/store";
import { useAsyncHandler } from "@/utils/async-handler";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function useFetchSingleCourse() {
  const { courseId } = useParams();
  const user = useSelector((state: RootState) => state.user);

  const asyncHandler = useAsyncHandler();
  const safeCourseView = asyncHandler(showCourse);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () =>
      safeCourseView(user.token as string, { courseId: courseId as string }),
  });

  return {
    courseData: data?.data?.course,
    isLoading,
    isError,
    error,
  };
}
