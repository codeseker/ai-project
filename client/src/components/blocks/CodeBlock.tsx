import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

type CodeBlockProps = {
  inline?: boolean;
  language?: string;
  value: string;
};

export default function CodeBlock({
  inline,
  language,
  value,
}: CodeBlockProps) {
  if (inline) {
    return (
      <code className="px-1 py-0.5 rounded bg-muted text-sm">
        {value}
      </code>
    );
  }

  return (
    <div className="my-4 rounded-lg overflow-hidden">
      <SyntaxHighlighter
        style={dracula}
        language={language}
        className="text-sm"
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
