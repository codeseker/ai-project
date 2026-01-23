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
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      {/* Question */}
      <h4 className="text-base font-semibold text-foreground mb-4">
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
                rounded-md border px-4 py-3 text-left
                transition
                ${!hasAnswered && "hover:bg-accent hover:border-accent"}
                ${
                  hasAnswered &&
                  isCorrect &&
                  "bg-green-500/10 border-green-500/30 text-green-600"
                }
                ${
                  hasAnswered &&
                  isWrong &&
                  "bg-destructive/10 border-destructive/30 text-destructive"
                }
                ${hasAnswered && !isCorrect && !isWrong && "opacity-60"}
              `}
            >
              <span>{opt}</span>

              {hasAnswered && isCorrect && <CheckCircle2 className="w-4 h-4" />}

              {hasAnswered && isWrong && <XCircle className="w-4 h-4" />}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {hasAnswered && (
        <div className="mt-4 text-sm text-muted-foreground border-t border-border pt-4">
          {explanation}
        </div>
      )}
    </div>
  );
}
