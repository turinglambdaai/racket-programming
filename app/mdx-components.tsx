import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-sand-900 mt-10 mb-6">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold text-sand-900 mt-12 mb-4 tracking-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-sand-800 mt-10 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-sand-800 leading-[1.8] mb-5">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="text-sand-800 mb-5 space-y-2 list-disc pl-6 marker:text-sand-400">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="text-sand-800 mb-5 space-y-2 list-decimal pl-6 marker:text-sand-400">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-[1.8] pl-1">{children}</li>,
  pre: ({ children }) => (
    <pre className="!bg-sand-900 !text-sand-100 !rounded-lg !p-5 overflow-x-auto !text-sm my-8 font-mono !leading-[1.7] border border-sand-800">
      {children}
    </pre>
  ),
  code: ({ children, className }) => (
    <code className={className}>{children}</code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-accent-400 pl-4 py-2 my-8 text-sand-600 italic">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-accent-500 hover:text-accent-600 underline underline-offset-2 decoration-sand-300 hover:decoration-accent-300 transition-colors">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full border-collapse">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b-2 border-sand-300 px-4 py-2.5 text-left text-sm font-semibold text-sand-700 bg-sand-50">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-sand-200 px-4 py-2.5 text-sm text-sand-700">
      {children}
    </td>
  ),
  hr: () => <hr className="my-10 border-sand-200" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-sand-900">{children}</strong>
  ),
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  }
}
