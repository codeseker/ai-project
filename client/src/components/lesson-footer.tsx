// LessonStickyFooter.tsx
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check, Star } from "lucide-react";

interface LessonStickyFooterProps {
  onPrevLesson: () => void;
  onNextLesson: () => void;
  onCompleteLesson: (complete: boolean) => void;
  lessonCompleted: boolean;
  hasPrevLesson: boolean;
  hasNextLesson: boolean;
}

export function LessonStickyFooter({
  onPrevLesson,
  onNextLesson,
  onCompleteLesson,
  lessonCompleted,
  hasPrevLesson,
  hasNextLesson,
}: LessonStickyFooterProps) {
  return (
    <div className="fixed bottom-0 z-50 pointer-events-none left-0 right-0 lg:left-64">
      <div className="mx-auto w-full max-w-5xl px-4 lg:px-8 pointer-events-auto">
        <div className="flex items-center justify-center rounded-t-xl border border-b-0 border-border bg-background/95 px-4 py-3 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/90">
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrevLesson}
              disabled={!hasPrevLesson}
              className="h-10 w-10 text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
              title="Previous Lesson"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>

            {/* Complete/Completed Status */}
            {lessonCompleted ? (
              <div 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white"
                title="Completed"
              >
                <Check className="h-5 w-5" />
                <span className="sr-only">Completed</span>
              </div>
            ) : (
              <Button
                onClick={() => onCompleteLesson(!lessonCompleted)}
                size="icon"
                className="h-10 w-10 bg-primary text-primary-foreground hover:opacity-90"
                title="Mark Complete"
              >
                <Check className="h-5 w-5" />
                <span className="hidden mg:block">Mark Complete</span>
              </Button>
            )}

            {/* Next Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onNextLesson}
              disabled={!hasNextLesson}
              className="h-10 w-10 text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
              title="Next Lesson"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}