import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

type McqBlockProps = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export default function McqBlock({
  question,
  options,
  answer,
  explanation,
}: McqBlockProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const hasAnswered = selected !== null;

  return (
    <div className="my-6 rounded-xl border border-border bg-card p-6">
      {/* Question */}
      <h4 className="mb-4 text-base font-semibold text-foreground">
        {question}
      </h4>

      {/* Options */}
      <div className="space-y-2">
        {options.map((opt, idx) => {
          const isSelected = selected === idx;
          const isCorrect = idx === answer;
          const isWrong = isSelected && !isCorrect;

          return (
            <button
              key={idx}
              disabled={hasAnswered}
              onClick={() => setSelected(idx)}
              className={`
                w-full flex items-center justify-between
                rounded-lg border px-4 py-3 text-left
                transition
                ${
                  !hasAnswered
                    ? "hover:bg-accent/40 hover:border-accent"
                    : ""
                }
                ${
                  hasAnswered && isCorrect
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : ""
                }
                ${
                  hasAnswered && isWrong
                    ? "bg-destructive/10 border-destructive/30 text-destructive"
                    : ""
                }
                ${
                  hasAnswered && !isCorrect && !isWrong
                    ? "opacity-60"
                    : ""
                }
              `}
            >
              <span>{opt}</span>

              {hasAnswered && isCorrect && (
                <CheckCircle2 className="h-4 w-4 text-primary" />
              )}

              {hasAnswered && isWrong && (
                <XCircle className="h-4 w-4 text-destructive" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {hasAnswered && (
        <div className="mt-4 rounded-md border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          {explanation}
        </div>
      )}
    </div>
  );
}
