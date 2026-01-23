import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
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
    <div className="rounded-xl border border-border overflow-hidden my-6 bg-card">
      {/* Header */}
      <div
        className="
          flex items-center justify-between
          px-4 py-2
          bg-muted/50
          text-xs text-muted-foreground
        "
      >
        <span className="uppercase tracking-wide">{language || "code"}</span>

        <button
          onClick={handleCopy}
          className="
            inline-flex items-center gap-1
            hover:text-foreground transition
          "
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" /> Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" /> Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        style={dracula}
        language={language}
        showLineNumbers
        customStyle={{
          margin: 0,
          background: "transparent",
          padding: "1rem",
          fontSize: "0.85rem",
        }}
        lineNumberStyle={{
          opacity: 0.5,
          fontSize: "0.75rem",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
