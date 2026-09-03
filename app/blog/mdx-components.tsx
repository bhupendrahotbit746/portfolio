import type { MDXComponents } from "mdx/types";
import Image from "next/image";

type BlogImageProps = {
  src: string;
  alt: string;
  caption?: string;
};

export function BlogImage({ src, alt, caption }: BlogImageProps) {
  return (
    <figure className="not-prose my-10">
      <div className="relative overflow-hidden border border-border">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-xs tracking-widest text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mb-6 mt-14 text-3xl font-bold tracking-tight text-foreground first:mt-0 sm:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-5 mt-12 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-4 mt-10 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-6 text-base leading-relaxed text-foreground/80 sm:text-lg">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-foreground/90">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-violet-bright underline decoration-violet-dim underline-offset-4 transition-colors hover:text-violet"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 ml-5 list-disc space-y-2 text-base leading-relaxed text-foreground/80 sm:text-lg">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 ml-5 list-decimal space-y-2 text-base leading-relaxed text-foreground/80 sm:text-lg">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-violet-dim pl-5 font-mono text-base italic text-foreground/70">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-border" />,
  code: ({ children, className }) => {
    const isBlock = Boolean(className);
    if (isBlock) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-violet-bright">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="mb-6 overflow-x-auto border border-border bg-[#050505] p-4 font-mono text-sm leading-relaxed [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit">
      {children}
    </pre>
  ),
  img: ({ src, alt }) => (
    <span className="not-prose my-10 block overflow-hidden border border-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={typeof src === "string" ? src : ""} alt={alt ?? ""} className="h-auto w-full" />
    </span>
  ),
  BlogImage,
};
