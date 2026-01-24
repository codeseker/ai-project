import type { JSX } from "react";

type HeadingBlockProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
};

export default function HeadingBlock({ level, text }: HeadingBlockProps) {
  const styles: Record<HeadingBlockProps["level"], string> = {
    1: "text-4xl font-bold tracking-tight text-foreground mt-10 mb-5",
    2: "text-3xl font-semibold tracking-tight text-foreground mt-9 mb-4",
    3: "text-2xl font-semibold tracking-tight text-foreground mt-8 mb-3",
    4: "text-xl font-semibold text-foreground mt-6 mb-2",
    5: "text-lg font-medium text-foreground/90 mt-5 mb-2",
    6: "text-base font-medium text-muted-foreground mt-4 mb-1.5",
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={`
        ${styles[level]}
        leading-snug
        scroll-mt-24
      `}
    >
      {text}
    </Tag>
  );
}
