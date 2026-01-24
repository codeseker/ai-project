import { BookOpen, Clock, CheckCircle2, PlayCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Lesson, Module } from "@/types/common";
import useFetchLesson from "@/hooks/lessons/useFetchLesson";
import VideoBlock from "@/components/blocks/VideoBlock";
import CodeBlock from "@/components/blocks/CodeBlock";
import HeadingBlock from "@/components/blocks/HeadingBlock";
import ParagraphBlock from "@/components/blocks/ParagraphBlock";
import McqBlock from "@/components/blocks/McqBlock";

interface LessonContentProps {
  lesson: Lesson;
  module: Module;
  courseTitle: string;
}

export function LessonContent({
  lesson,
  module,
  courseTitle,
}: LessonContentProps) {
  const { lessonData, isLoading, isError, error } = useFetchLesson();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError && error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          <span>{courseTitle}</span>
          <span className="text-border">/</span>
          <span>{module.title}</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>15 min read</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>Not completed</span>
          </div>
        </div>
      </div>

      {/* Lesson Body */}
      <div className="w-full space-y-6">
        {Array.isArray(lessonData?.content) &&
          lessonData?.content.map((block) => {
            switch (block.type) {
              case "code":
                return (
                  <CodeBlock
                    key={block.text}
                    language={block.language}
                    code={block.text}
                  />
                );

              case "paragraph":
                return <ParagraphBlock text={block.text} key={block.text} />;

              case "mcq":
                return (
                  <McqBlock
                    key={block.answer}
                    answer={block.answer}
                    explanation={block.explanation}
                    options={block.options}
                    question={block.question}
                  />
                );

              case "heading":
                return (
                  <HeadingBlock key={block.text} level={1} text={block.text} />
                );
            }
          })}

        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 col-span-3">
          {lessonData?.ytVideos.map((video) => (
            <VideoBlock videoId={video} key={video} />
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button variant="outline">Previous Lesson</Button>
        <Button>Mark as Complete</Button>
        <Button variant="outline">Next Lesson</Button>
      </div>
    </div>
  );
}
