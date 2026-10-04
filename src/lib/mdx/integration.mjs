// Content as React: compiles MDX to React components (Vite plugin) and lets content collections
// load .mdx files with Astro's standard glob() loader (content entry type).
//
// Astro's own MDX integration renders MDX as Astro components, which would turn the interactive
// React components in docs (tabs, code blocks, steps) into static HTML. Pages render the body with
// components/MDXRenderer instead, so the entry type only provides frontmatter and headings.
import { extractHeadings } from './headings.mjs'
import { splitFrontmatter } from './frontmatter.mjs'
import { formatFor } from './options.mjs'
import mdxContent from './vite-plugin.mjs'

/** @param {Parameters<typeof mdxContent>[0]} options */
export default function mdx(options) {
    return {
        name: 'posthog:mdx',
        hooks: {
            'astro:config:setup': ({ updateConfig, addContentEntryType }) => {
                updateConfig({ vite: { plugins: [mdxContent(options)] } })
                addContentEntryType({
                    extensions: ['.mdx'],
                    handlePropagation: false,
                    getEntryInfo({ contents }) {
                        const { data, rawData, body } = splitFrontmatter(contents)
                        return { data, rawData, body, slug: '' }
                    },
                    async getRenderFunction() {
                        return async (entry) => ({
                            html: '',
                            metadata: {
                                headings: extractHeadings(entry.body ?? '', formatFor(entry.filePath ?? '')),
                                frontmatter: entry.data,
                            },
                        })
                    },
                })
            },
        },
    }
}
