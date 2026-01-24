type ParagraphBlockProps = {
  text: string;
};

export default function ParagraphBlock({ text }: ParagraphBlockProps) {
  return (
    <p className="text-foreground leading-relaxed whitespace-pre-wrap">
      {text}
    </p>
  );
}
