type ParagraphBlockProps = {
  text: string;
};

export default function ParagraphBlock({ text }: ParagraphBlockProps) {
  return (
    <p className="text-base leading-7 text-muted-foreground whitespace-pre-wrap mb-4 last:mb-0">
      {text}
    </p>
  );
}
