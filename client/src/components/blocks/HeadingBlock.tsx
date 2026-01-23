import type { JSX } from "react";

type HeadingBlockProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
};

export default function HeadingBlock({ level, text }: HeadingBlockProps) {
  const styles: Record<number, string> = {
    1: "text-3xl font-bold tracking-tight",
    2: "text-2xl font-semibold tracking-tight",
    3: "text-xl font-semibold",
    4: "text-lg font-medium",
    5: "text-base font-medium",
    6: "text-sm font-medium",
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={`
        ${styles[level]}
        text-foreground
        scroll-mt-24
      `}
    >
      {text}
    </Tag>
  );
}
