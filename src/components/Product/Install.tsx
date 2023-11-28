import { MDXProvider } from '@mdx-js/react'
import { Blockquote } from 'components/BlockQuote'
import { MdxCodeBlock } from 'components/CodeBlock'
import { Heading } from 'components/Heading'
import { InlineCode } from 'components/InlineCode'
import Link from 'components/Link'
import { ZoomImage } from 'components/ZoomImage'
import { graphql, useStaticQuery } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { shortcodes } from '../../mdxGlobalComponents'

function Install() {
    const data = useStaticQuery(graphql`
        {
            mdx(slug: { eq: "docs/getting-started/_snippets/install" }) {
                body
            }
        }
    `)
    const components = {
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: MdxCodeBlock,
        MultiLanguage: MdxCodeBlock,
        h1: (props) => Heading({ as: 'h1', ...props }),
        h2: (props) => Heading({ as: 'h2', ...props }),
        h3: (props) => Heading({ as: 'h3', ...props }),
        h4: (props) => Heading({ as: 'h4', ...props }),
        h5: (props) => Heading({ as: 'h5', ...props }),
        h6: (props) => Heading({ as: 'h6', ...props }),
        img: ZoomImage,
        a: (props) => <Link {...props} className="text-red hover:text-red font-semibold" />,
        ...shortcodes,
    }
    return (
        <div className="article-content">
            <MDXProvider components={components}>
                <MDXRenderer>{data.mdx.body}</MDXRenderer>
            </MDXProvider>
        </div>
    )
}

export default {
    title: 'Installation',
    body: Install,
    bodyType: 'component',
    code: ['posthog.init()'],
}
