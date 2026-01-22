import { useEffect, useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useAsyncHandler } from "@/utils/async-handler";
import {
  generateLessonContent,
  type LessonContentResponse,
} from "@/actions/lesson";

export default function Lesson() {
  const user = useSelector((state: RootState) => state.user);
  const { courseId, modId, lessonId } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState<string>("");
  const [lessonData, setLessonData] = useState<
    LessonContentResponse | null | undefined
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const asyncHandler = useAsyncHandler();
  const safeLessonContent = asyncHandler(generateLessonContent);

  const fetchLessonContent = async () => {
    if (!courseId || !modId || !lessonId || !user.user) return;

    setLoading(true);
    try {
      const res = await safeLessonContent(user.token!, {
        courseId,
        moduleId: modId,
        lessonId,
      });
      setContent(res?.data?.content ?? "");
      setLessonData(res?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessonContent();
  }, [courseId, modId, lessonId]);

  if (loading) {
    return (
      <div className="w-full flex justify-center px-6 py-10 animate-pulse">
        <div className="w-full max-w-5xl space-y-5">
          <Skeleton className="h-10 w-3/4 rounded-md" />
          <Skeleton className="h-5 w-full rounded-md" />
          <Skeleton className="h-5 w-[90%] rounded-md" />
          <Skeleton className="h-5 w-[80%] rounded-md" />
          <Skeleton className="h-[220px] w-full rounded-md mt-8" />
        </div>
      </div>
    );
  }

  if (!content) return null;

  // THEME-SAFE MARKDOWN COMPONENTS
  // const markdownComponents: Components = {
  //   h1: ({ children, ...props }) => (
  //     <h1 className="text-4xl font-bold mt-2 mb-6 text-primary" {...props}>
  //       {children}
  //     </h1>
  //   ),
  //   h2: ({ children, ...props }) => (
  //     <h2 className="text-2xl font-semibold mt-10 mb-3 text-primary" {...props}>
  //       {children}
  //     </h2>
  //   ),
  //   h3: ({ children, ...props }) => (
  //     <h3 className="text-xl font-medium mt-6 mb-2 text-foreground" {...props}>
  //       {children}
  //     </h3>
  //   ),
  //   p: ({ children, ...props }) => (
  //     <p className="text-base my-4 leading-relaxed text-foreground" {...props}>
  //       {children}
  //     </p>
  //   ),
  //   li: ({ children, ...props }) => (
  //     <li className="text-base my-2 leading-relaxed text-foreground" {...props}>
  //       {children}
  //     </li>
  //   ),
  //   pre: ({ children, ...props }) => (
  //     <pre
  //       className="rounded-lg mt-6 mb-6 p-4 bg-muted border border-border overflow-x-auto"
  //       {...props}
  //     >
  //       <code className="font-mono text-sm">{children}</code>
  //     </pre>
  //   ),
  //   code: ({ children, ...props }) => (
  //     <code
  //       className="px-1.5 py-0.5 rounded font-mono bg-muted text-foreground"
  //       {...props}
  //     >
  //       {children}
  //     </code>
  //   ),
  //   blockquote: ({ children, ...props }) => (
  //     <blockquote
  //       className="border-l-4 pl-6 pr-4 py-3 my-8 italic bg-card rounded-lg border-border text-muted-foreground"
  //       {...props}
  //     >
  //       {children}
  //     </blockquote>
  //   ),
  // };

  const markdownComponents: Components = {
    h1: ({ children, ...props }) => (
      <h1 className="text-4xl font-bold mt-2 mb-6 text-primary" {...props}>
        {children}
      </h1>
    ),

    h2: ({ children, ...props }) => (
      <h2 className="text-2xl font-semibold mt-10 mb-3 text-primary" {...props}>
        {children}
      </h2>
    ),

    h3: ({ children, ...props }) => (
      <h3 className="text-xl font-medium mt-6 mb-2 text-foreground" {...props}>
        {children}
      </h3>
    ),

    p: ({ children, ...props }) => (
      <p className="text-base my-4 leading-relaxed text-foreground" {...props}>
        {children}
      </p>
    ),

    li: ({ children, ...props }) => (
      <li className="text-base my-2 leading-relaxed text-foreground" {...props}>
        {children}
      </li>
    ),

    /* 🔥 MODERN CODE EDITOR BLOCK */
    pre: ({ children, ...props }) => (
      <div className="my-8 rounded-xl border border-border bg-card overflow-hidden">
        {/* Editor header */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted">
          <span className="h-3 w-3 rounded-full bg-destructive/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-muted-foreground font-medium">
            Code
          </span>
        </div>

        {/* Code area */}
        <pre
          className="p-4 overflow-x-auto text-sm font-mono bg-transparent"
          {...props}
        >
          {children}
        </pre>
      </div>
    ),

    /* Inline code */
    code: ({ children, ...props }) => (
      <code
        className="px-1.5 py-0.5 rounded-md font-mono text-sm
                 bg-muted text-foreground"
        {...props}
      >
        {children}
      </code>
    ),

    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 pl-6 pr-4 py-3 my-8 italic
                 bg-card rounded-lg border-border
                 text-muted-foreground"
        {...props}
      >
        {children}
      </blockquote>
    ),
  };

  return (
    <div className="w-full flex justify-center px-6 py-10">
      <div className="w-full max-w-5xl prose dark:prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          components={markdownComponents}
        >
          {content}
        </ReactMarkdown>

        {/* Navigation */}
        <div className="flex justify-between mt-12 pt-6 border-t border-border">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="px-5 py-3 rounded-md font-medium bg-muted hover:bg-accent text-foreground transition"
          >
            ← Previous Lesson
          </button>

          {lessonData?.navigation.nextModuleSlug &&
            lessonData?.navigation.nextLessonSlug && (
              <Link
                to={`/course/${courseId}/module/${lessonData?.navigation.nextModuleSlug}/lesson/${lessonData?.navigation.nextLessonSlug}`}
                className="px-5 py-3 rounded-md font-medium bg-primary hover:bg-primary/90 text-primary-foreground transition"
              >
                Next Lesson →
              </Link>
            )}
        </div>
      </div>
    </div>
  );
}
