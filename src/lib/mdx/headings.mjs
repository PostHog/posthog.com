// Headings of an MDX document, in the shape Astro uses for `rendered.metadata.headings`.
import { createProcessor } from '@mdx-js/mdx'
import GithubSlugger from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import remarkGfm from 'remark-gfm'

const processors = {
    md: createProcessor({ format: 'md', remarkPlugins: [remarkGfm] }),
    mdx: createProcessor({ format: 'mdx', remarkPlugins: [remarkGfm] }),
}

/** @returns {{ depth: number, slug: string, text: string }[]} */
export function extractHeadings(body, format = 'mdx') {
    const slugger = new GithubSlugger()
    const tree = processors[format].parse(body)
    return tree.children
        .filter((node) => node.type === 'heading')
        .map((node) => {
            // Inline JSX in a heading (a beta badge, for example) is not part of its text.
            const text = toString({
                type: 'root',
                children: node.children.filter((child) => !child.type.startsWith('mdxJsx')),
            }).trim()
            return { depth: node.depth, slug: slugger.slug(text), text }
        })
}
