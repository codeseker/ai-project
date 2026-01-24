import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Copy, Check } from "lucide-react";

type CodeBlockProps = {
  language?: string;
  code: string;
};

export default function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
        <span className="font-medium uppercase tracking-wide">
          {language || "code"}
        </span>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="bg-card font-mono text-sm text-foreground">
        <SyntaxHighlighter
          language={language}
          showLineNumbers
          wrapLines
          customStyle={{
            margin: 0,
            background: "transparent",
            padding: "1rem",
          }}
          lineNumberStyle={{
            opacity: 0.35,
            fontSize: "0.75rem",
            marginRight: "1rem",
          }}
          codeTagProps={{
            className: "font-mono text-foreground",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
