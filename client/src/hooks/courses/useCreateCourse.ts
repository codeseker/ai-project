import { createCourse } from "@/actions/course";
import { useAsyncHandler } from "@/utils/async-handler";
import { successToast } from "@/utils/toaster";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useCreateCourse() {
  const asyncHandler = useAsyncHandler();
  const safeCreateCourse = asyncHandler(createCourse);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["create-course"],
    mutationFn: async (prompt: string) => {
      return safeCreateCourse({ prompt });
    },
    onSuccess: () => {
      successToast("Course created successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  return mutation;
}
