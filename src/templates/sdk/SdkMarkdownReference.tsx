import React from 'react'
import { graphql } from 'gatsby'
import ReactMarkdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import GithubSlugger from 'github-slugger'
import visit from 'unist-util-visit'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import Link from 'components/Link'
import { Blockquote } from 'components/BlockQuote'
import { SingleCodeBlock } from 'components/CodeBlock'
import { Heading } from 'components/Heading'
import { InlineCode } from 'components/InlineCode'
import { OverflowXSection } from 'components/OverflowXSection'

// An SDK reference that the SDK repo generates and Strapi stores as Markdown. It renders as plain
// Markdown, never as MDX, so a page can't run code. Its raw HTML, such as <details>, is sanitized.

const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

// The default schema drops a code block's `language-*` class, which picks its highlighting.
const schema = { ...defaultSchema, attributes: { ...defaultSchema.attributes, code: ['className'] } }

const text = (node): string => (node.type === 'text' ? node.value : (node.children || []).map(text).join(''))

/** Gives each heading the ID that gatsby-remark-autolink-headers gives an MDX page, which the table of contents links to. */
const headingIds = () => (tree) => {
    const slugger = new GithubSlugger()
    visit(tree, 'element', (node) => {
        if (HEADINGS.includes(node.tagName)) node.properties.id = slugger.slug(text(node))
    })
}

const components: Partial<Components> = {
    ...Object.fromEntries(HEADINGS.map((as) => [as, ({ node, ...props }) => <Heading as={as} {...(props as any)} />])),
    // A code block. Its language is the code element's `language-*` class.
    pre: ({ node }) => {
        const code = node.children[0] as any
        const className = (code?.properties?.className || []).find((name) => name.startsWith('language-'))
        return (
            <SingleCodeBlock language={className?.slice('language-'.length) || ''}>
                {text(code).trimEnd()}
            </SingleCodeBlock>
        )
    },
    code: ({ node, inline, ...props }) => <InlineCode {...props} />,
    a: ({ node, ...props }) => <Link {...props} />,
    blockquote: ({ node, ...props }) => <Blockquote {...props} />,
    table: ({ node, ...props }) => (
        <OverflowXSection>
            <table {...props} />
        </OverflowXSection>
    ),
}

const renderMarkdown = (markdown: string) => (
    // rehype-sanitize sanitizes the HTML that rehype-raw parses, so no raw HTML is trusted.
    // nosemgrep: typescript.react.security.react-markdown-insecure-html.react-markdown-insecure-html
    <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, schema], headingIds] as any}
        components={components}
    >
        {markdown}
    </ReactMarkdown>
)

export default function SdkMarkdownReference({ data: { sdkMarkdownReference } }) {
    const { title, body, tableOfContents, contentMaxWidthClass } = sdkMarkdownReference
    return (
        <>
            <SEO title={`${title} - PostHog`} />
            <ReaderView
                body={{ type: 'mdx', content: body }}
                title={title}
                tableOfContents={tableOfContents}
                renderMdx={renderMarkdown}
                contentMaxWidthClass={contentMaxWidthClass}
                showSurvey
            />
        </>
    )
}

export const query = graphql`
    query SdkMarkdownReference($id: String!) {
        sdkMarkdownReference(id: { eq: $id }) {
            title
            body
            contentMaxWidthClass
            tableOfContents {
                value
                url
                depth
            }
        }
    }
`
