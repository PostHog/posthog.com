// MDX compile options shared by the site build (Vite) and scripts/check-mdx.mjs, so the check
// fails on exactly what the build fails on.
import path from 'node:path'
import rehypeRaw from 'rehype-raw'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'

const POSTHOG_REPO = '.cache/posthog-main-repo/'

/**
 * Which parser a file needs. Our own .md files are MDX: 1,300+ contain
 * JSX. The .md files from the posthog/posthog clone are plain GitHub Markdown with placeholders
 * such as `<TOKEN>`, so they are parsed as Markdown with raw HTML.
 */
export function formatFor(file) {
    return file.split(path.sep).join('/').includes(POSTHOG_REPO) && file.endsWith('.md') ? 'md' : 'mdx'
}

export function mdxCompileOptions({ development = false, format = 'mdx' } = {}) {
    return {
        format,
        development,
        jsxImportSource: 'react',
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkFrontmatter, remarkGfm],
        rehypePlugins: [
            ...(format === 'md'
                ? [
                      [
                          rehypeRaw,
                          {
                              passThrough: [
                                  'mdxjsEsm',
                                  'mdxFlowExpression',
                                  'mdxJsxFlowElement',
                                  'mdxJsxTextElement',
                                  'mdxTextExpression',
                              ],
                          },
                      ],
                  ]
                : []),
            // Code fence meta as JSX props on <code>: ```js file="app.js" (read by components/CodeBlock).
            [rehypeMdxCodeProps, { tagName: 'code' }],
        ],
    }
}
