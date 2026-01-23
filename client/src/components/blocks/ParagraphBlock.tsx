type ParagraphBlockProps = {
  text: string;
};

export default function ParagraphBlock({ text }: ParagraphBlockProps) {
  return (
    <p
      className="
        text-foreground
        leading-relaxed
        max-w-prose
        whitespace-pre-wrap
      "
    >
      {text}
    </p>
  );
}
