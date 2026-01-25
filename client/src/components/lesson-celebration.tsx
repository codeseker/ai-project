import { useEffect, useState } from "react";

interface LessonCompleteCelebrationProps {
  open: boolean;
  onDone?: () => void;
}

export default function LessonCompleteCelebration({
  open,
  onDone,
}: LessonCompleteCelebrationProps) {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
        onDone?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [open, onDone]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />

      <div className="relative z-10 rounded-2xl border border-border bg-card px-8 py-6 text-center shadow-xl animate-pop">
        <h2 className="text-2xl font-bold text-primary">
          Lesson Completed! 🎉
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Awesome job — keep the momentum going!
        </p>
      </div>

      <div className="absolute inset-0 z-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.8}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        .confetti-piece {
          position: absolute;
          top: -10px;
          width: 8px;
          height: 14px;
          border-radius: 2px;
          background: hsl(var(--primary));
          opacity: 0.9;
          animation-name: fall, sway;
          animation-timing-function: linear, ease-in-out;
          animation-iteration-count: 1, infinite;
        }

        .confetti-piece:nth-child(3n) { background: hsl(var(--accent)); }
        .confetti-piece:nth-child(4n) { background: hsl(var(--secondary)); }
        .confetti-piece:nth-child(5n) { background: hsl(var(--destructive)); }

        @keyframes fall {
          to {
            transform: translateY(110vh) rotate(720deg);
            opacity: 1;
          }
        }

        @keyframes sway {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(30px); }
        }

        @keyframes pop {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-pop {
          animation: pop 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
