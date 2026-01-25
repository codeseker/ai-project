import { updateLesson } from "@/actions/lesson";
import { useAsyncHandler } from "@/utils/async-handler";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { LessonParams } from "./useFetchLesson";
import { useParams } from "react-router-dom";

export default function useUpdateLesson() {
  const { courseId, moduleId, lessonId } = useParams<LessonParams>();
  const asyncHandler = useAsyncHandler();
  const safeUpdateLesson = asyncHandler(updateLesson);

  const updateLessonMutation = useMutation({
    mutationKey: ["update-lesson", courseId, moduleId, lessonId],
    mutationFn: (complete: boolean) =>
      safeUpdateLesson({
        courseId: courseId!,
        moduleId: moduleId!,
        lessonId: lessonId!,
        complete,
      }),
    onSuccess: () => {
      toast.success("Lesson updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return updateLessonMutation;
}
