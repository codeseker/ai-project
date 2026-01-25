import { showCourse } from "@/actions/course";
import { useAsyncHandler } from "@/utils/async-handler";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useFetchSingleCourse() {
  const { courseId } = useParams();

  const asyncHandler = useAsyncHandler();
  const safeCourseView = asyncHandler(showCourse);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => safeCourseView({ courseId: courseId as string }),
  });

  return {
    courseData: data?.data?.course,
    isLoading,
    isError,
    error,
  };
}
