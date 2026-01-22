import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAsyncHandler } from "@/utils/async-handler";
import { createCourse } from "@/actions/course";
import type { RootState } from "@/store/store";
import { successToast } from "@/utils/toaster";
import { addCourse } from "@/store/slices/course";

const courseSchema = z.object({
  prompt: z.string().min(10, "User query must be at least 10 characters long"),
});

type CourseFormData = z.infer<typeof courseSchema>;

export default function Home() {
  const asyncHandler = useAsyncHandler();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const safeCourseCreation = asyncHandler(createCourse);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
  });

  useEffect(() => {
    if (errors.prompt) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [errors.prompt]);

  const onSubmit = async (data: CourseFormData) => {
    if (!user.token) return;

    setLoading(true);
    const res = await safeCourseCreation(user.token, data);
    setLoading(false);

    if (!res?.data) return;

    successToast("Course created successfully");
    dispatch(
      addCourse({
        id: res.data.courseId,
        title: res.data.title,
        moduleId: "",
        lessonId: "",
        slug: res.data.slug,
        lessonSlug: "",
        moduleSlug: "",
      }),
    );
  };

  return (
    <div className="w-full flex justify-center py-28 px-4">
      <div className="max-w-2xl w-full flex flex-col items-center space-y-10">
        {/* Title */}
        <h1 className="text-5xl font-extrabold tracking-tight text-center text-foreground">
          What do you want to master today?
        </h1>

        {/* CTA */}
        <p className="text-lg text-muted-foreground text-center">
          Describe your topic, and let AI build a complete, personalized course
          for you.
        </p>

        {/* Input */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full relative">
          <div
            className="
              flex items-center w-full rounded-full
              pl-6 pr-14 py-4
              bg-card border border-border
              shadow-sm
              transition
              focus-within:ring-2 focus-within:ring-ring
            "
          >
            <input
              placeholder="Tell AI what course you want to generate..."
              className="
                w-full bg-transparent text-lg
                text-foreground placeholder:text-muted-foreground
                outline-none
              "
              {...register("prompt")}
            />

            <button
              type="submit"
              disabled={loading}
              className="
                absolute right-2
                flex items-center justify-center
                w-10 h-10 rounded-full
                bg-primary text-primary-foreground
                hover:opacity-90
                transition
                disabled:opacity-50
              "
            >
              {loading ? (
                "…"
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12h18m0 0l-7-7m7 7l-7 7"
                  />
                </svg>
              )}
            </button>
          </div>
        </form>

        {/* Error */}
        {showError && errors.prompt && (
          <div className="flex items-center gap-2 text-sm font-medium text-destructive">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 3h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
              />
            </svg>
            {errors.prompt.message}
          </div>
        )}
      </div>
    </div>
  );
}
