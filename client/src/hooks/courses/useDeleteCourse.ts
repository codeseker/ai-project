import { deleteCourse } from "@/actions/course";
import type { RootState } from "@/store/store";
import { useAsyncHandler } from "@/utils/async-handler";
import { successToast } from "@/utils/toaster";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useDeleteCourse() {
  const user = useSelector((state: RootState) => state.user);
  const asyncHandler = useAsyncHandler();
  const safeCouseDelete = asyncHandler(deleteCourse);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-course"],
    mutationFn: async (courseId: string) => {
      if (!user?.token) {
        throw new Error("User not authenticated");
      }

      return safeCouseDelete(user.token, { courseId });
    },
    onSuccess: () => {
      successToast("Course deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      navigate("/", {
        replace: true,
      });
    },
  });

  return mutation;
}
