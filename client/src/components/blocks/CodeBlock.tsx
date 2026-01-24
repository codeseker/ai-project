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
    <div className="my-6 overflow-hidden rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
        <span className="uppercase tracking-wide">{language || "code"}</span>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 transition hover:text-foreground"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" /> Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        showLineNumbers
        wrapLines
        customStyle={{
          margin: 0,
          background: "transparent",
          padding: "1rem",
          fontSize: "0.85rem",
          fontFamily: "var(--font-mono)",
          color: "var(--foreground)",
          overflowX: "auto",
        }}
        lineNumberStyle={{
          opacity: 0.4,
          fontSize: "0.75rem",
          marginRight: "1rem",
        }}
        codeTagProps={{
          className: "text-foreground",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
