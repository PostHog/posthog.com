// Headings of an MDX document, in the shape Astro uses for `rendered.metadata.headings`, and the
// remark plugin that gives each rendered heading the matching `id`.
import { createProcessor } from '@mdx-js/mdx'
import GithubSlugger from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

const processors = {
    md: createProcessor({ format: 'md', remarkPlugins: [remarkGfm] }),
    mdx: createProcessor({ format: 'mdx', remarkPlugins: [remarkGfm] }),
}

// Every heading in document order with its slug. The table of contents and the heading ids both
// come from here, so a link in the table of contents always finds its heading.
function slugHeadings(tree) {
    const slugger = new GithubSlugger()
    const headings = []
    visit(tree, 'heading', (node, _index, parent) => {
        // Inline JSX in a heading (a beta badge, for example) is not part of its text.
        const text = toString({
            type: 'root',
            children: node.children.filter((child) => !child.type.startsWith('mdxJsx')),
        }).trim()
        headings.push({ node, parent, text, slug: slugger.slug(text) })
    })
    return headings
}

/** @returns {{ depth: number, slug: string, text: string }[]} */
export function extractHeadings(body, format = 'mdx') {
    const tree = processors[format].parse(body)
    return slugHeadings(tree)
        .filter(({ parent }) => parent === tree)
        .map(({ node, slug, text }) => ({ depth: node.depth, slug, text }))
}

/** Remark plugin: sets each heading's `id` to its slug, for anchors and the table of contents. */
export function remarkHeadingIds() {
    return (tree) => {
        for (const { node, slug } of slugHeadings(tree)) {
            node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id: slug } }
        }
    }
}
