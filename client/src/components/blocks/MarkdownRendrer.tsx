import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import HeadingBlock from "./HeadingBlock";
import ParagraphBlock from "./ParagraphBlock";
import CodeBlock from "./CodeBlock";
import VideoBlock from "./VideoBlock";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        /* HEADINGS */
        h1: ({ children }) => <HeadingBlock level={1}>{children}</HeadingBlock>,
        h2: ({ children }) => <HeadingBlock level={2}>{children}</HeadingBlock>,
        h3: ({ children }) => <HeadingBlock level={3}>{children}</HeadingBlock>,
        h4: ({ children }) => <HeadingBlock level={4}>{children}</HeadingBlock>,

        /* PARAGRAPH */
        p: ({ children }) => <ParagraphBlock>{children}</ParagraphBlock>,

        /* CODE */
        code({ inline, className, children }: any) {
          const match = /language-(\w+)/.exec(className || "");
          return (
            <CodeBlock
              inline={inline}
              language={match?.[1]}
              value={String(children).replace(/\n$/, "")}
            />
          );
        },

        /* VIDEO */
        iframe({ node, ...props }) {
          return <VideoBlock src={props.src as string} />;
        },

        /* LISTS */
        ul: ({ children }) => (
          <ul className="list-disc pl-6 space-y-1 mb-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 space-y-1 mb-4">{children}</ol>
        ),

        li: ({ children }) => (
          <li className="text-muted-foreground">{children}</li>
        ),
      }}
    >
      {content}
    </Markdown>
  );
}
