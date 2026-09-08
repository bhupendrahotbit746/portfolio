"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type MarkdownContentProps = {
  content: string;
  className?: string;
};

export default function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { className, children, ...rest } = props;
            const match = /language-(\w+)/.exec(className ?? "");
            const isInline = !match && !String(children).includes("\n");

            if (isInline) {
              return (
                <code
                  className="rounded border border-border bg-violet-dim/40 px-1.5 py-0.5 font-mono text-[0.85em] text-violet-bright"
                  {...rest}
                >
                  {children}
                </code>
              );
            }

            const language = match?.[1] ?? "text";
            const codeString = String(children).replace(/\n$/, "");

            return (
              <span className="my-6 block overflow-hidden rounded-lg border border-border">
                <span className="flex items-center justify-between border-b border-border bg-[#1e1e1e] px-4 py-2">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                  </span>
                  <span className="font-mono text-[11px] tracking-widest text-white/40">
                    {language.toUpperCase()}
                  </span>
                </span>
                <SyntaxHighlighter
                  language={language}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: "1rem",
                    background: "#1e1e1e",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                  }}
                  showLineNumbers
                  wrapLongLines={false}
                >
                  {codeString}
                </SyntaxHighlighter>
              </span>
            );
          },
          a(props) {
            return (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-bright underline decoration-violet-dim underline-offset-4 hover:text-violet"
              />
            );
          },
          img(props) {
            // eslint-disable-next-line @next/next/no-img-element
            return <img {...props} className="my-8 w-full rounded-lg object-cover" alt={props.alt ?? ""} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
