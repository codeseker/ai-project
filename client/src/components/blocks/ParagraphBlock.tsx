type ParagraphBlockProps = {
  children: React.ReactNode;
};

export default function ParagraphBlock({ children }: ParagraphBlockProps) {
  return (
    <p className="leading-7 text-muted-foreground mb-4 whitespace-pre-line">
      {children}
    </p>
  );
}
