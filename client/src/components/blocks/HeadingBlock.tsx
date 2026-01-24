import type { JSX } from "react";

type HeadingBlockProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
};

export default function HeadingBlock({ level, text }: HeadingBlockProps) {
  const styles: Record<HeadingBlockProps["level"], string> = {
    1: "text-3xl font-bold tracking-tight mt-8 mb-4",
    2: "text-2xl font-semibold tracking-tight mt-8 mb-3",
    3: "text-xl font-semibold mt-6 mb-2",
    4: "text-lg font-medium mt-5 mb-2",
    5: "text-base font-medium mt-4 mb-1.5",
    6: "text-sm font-medium mt-4 mb-1",
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
