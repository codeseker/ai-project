import { generateLessonContent } from "@/actions/lesson";
import type { RootState } from "@/store/store";
import { useAsyncHandler } from "@/utils/async-handler";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

type LessonParams = {
  courseId: string;
  moduleId: string;
  lessonId: string;
};

export default function useFetchLesson() {
  const user = useSelector((state: RootState) => state.user);
  const { courseId, moduleId, lessonId } = useParams<LessonParams>();

  const asyncHandler = useAsyncHandler();
  const lessonGenerateSafe = asyncHandler(generateLessonContent);

  const isEnabled = !!user.token && !!courseId && !!moduleId && !!lessonId;

  const {
    data: lessonData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["lesson", courseId, moduleId, lessonId],
    queryFn: async () => {
      if (!courseId || !moduleId || !lessonId || !user.token) {
        throw new Error("Missing required lesson params");
      }

      return lessonGenerateSafe(user.token, {
        courseId,
        moduleId,
        lessonId,
      });
    },
    enabled: isEnabled,
  });

  return {
    lessonData: lessonData?.data,
    isLoading,
    error,
    isError,
  };
}
