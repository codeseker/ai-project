import { uploadAvatar } from "@/actions/user";
import { setAvatar } from "@/store/slices/user";
import { useAsyncHandler } from "@/utils/async-handler";
import { errorToast, successToast } from "@/utils/toaster";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export default function useAvatarUpload() {
  const asyncHandler = useAsyncHandler();
  const dispatch = useDispatch();
  const uploadAvatarSafe = asyncHandler(uploadAvatar);

  const { mutateAsync } = useMutation({
    mutationKey: ["upload-avatar"],
    mutationFn: uploadAvatarSafe,
    onSuccess: (res) => {
      if (!res) return;
      dispatch(setAvatar(res.data));
      successToast("Avatar uploaded successfully");
    },
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      errorToast("Please upload a valid image file");
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    await mutateAsync(formData);
  };

  return {
    handleFileChange,
  };
}
