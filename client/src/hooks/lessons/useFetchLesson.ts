import { generateLessonContent } from "@/actions/lesson";
import { useAsyncHandler } from "@/utils/async-handler";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export type LessonParams = {
  courseId: string;
  moduleId: string;
  lessonId: string;
};

export default function useFetchLesson() {
  const { courseId, moduleId, lessonId } = useParams<LessonParams>();

  const asyncHandler = useAsyncHandler();
  const lessonGenerateSafe = asyncHandler(generateLessonContent);

  const isEnabled = !!courseId && !!moduleId && !!lessonId;

  const {
    data: lessonData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["lesson", courseId, moduleId, lessonId],
    queryFn: async () => {
      if (!courseId || !moduleId || !lessonId) {
        throw new Error("Missing required lesson params");
      }

      return lessonGenerateSafe({
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
