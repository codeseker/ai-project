import { Skeleton } from "@/components/ui/skeleton";
import useFetchLesson from "@/hooks/lessons/useFetchLesson";

import HeadingBlock from "@/components/blocks/HeadingBlock";
import ParagraphBlock from "@/components/blocks/ParagraphBlock";
import CodeBlock from "@/components/blocks/CodeBlock";
import McqBlock from "@/components/blocks/McqBlock";
import VideoBlock from "@/components/blocks/VideoBlock";

export default function Lesson() {
  const { lessonData, isLoading, error, isError } = useFetchLesson();

  if (isLoading) {
    return (
      <div className="bg-background px-6 py-10 flex justify-center animate-pulse">
        <div className="w-full max-w-4xl space-y-5">
          <Skeleton className="h-10 w-3/4 rounded-md" />
          <Skeleton className="h-5 w-full rounded-md" />
          <Skeleton className="h-5 w-[90%] rounded-md" />
          <Skeleton className="h-5 w-[80%] rounded-md" />
          <Skeleton className="h-[220px] w-full rounded-md mt-8" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-destructive text-center py-10">
        Error: {error?.message}
      </div>
    );
  }

  return (
    <div className="bg-background px-6 py-10 flex justify-center">
      <article
        className="
          w-full max-w-4xl
          bg-card border border-border
          rounded-xl
          px-6 py-8
          space-y-6
        "
      >
        {/* Lesson Content */}
        {lessonData?.content.map((block, idx) => {
          switch (block.type) {
            case "heading":
              return (
                <HeadingBlock
                  key={idx}
                  level={1} // ✅ FIXED
                  text={block.text}
                />
              );

            case "paragraph":
              return <ParagraphBlock key={idx} text={block.text} />;

            case "code":
              return (
                <CodeBlock
                  key={idx}
                  language={block.language}
                  code={block.text}
                />
              );

            case "mcq":
              return (
                <McqBlock
                  key={idx}
                  question={block.question}
                  options={block.options}
                  answer={block.answer}
                  explanation={block.explanation}
                />
              );

            default:
              return null;
          }
        })}

        {/* Videos */}
        {lessonData?.ytVideos.length ? (
          <div className="pt-6 space-y-6 border-t border-border">
            {lessonData.ytVideos.map((videoId) => (
              <VideoBlock key={videoId} videoId={videoId} />
            ))}
          </div>
        ) : null}
      </article>
    </div>
  );
}
