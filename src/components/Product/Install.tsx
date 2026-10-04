import { MDXProvider } from '@mdx-js/react'
import { Blockquote } from 'components/BlockQuote'
import { MdxCodeBlock } from 'components/CodeBlock'
import { Heading } from 'components/Heading'
import { InlineCode } from 'components/InlineCode'
import Link from 'components/Link'
import { ZoomImage } from 'components/ZoomImage'
import React from 'react'
import { shortcodes } from '../../mdxGlobalComponents'
import { MDXRenderer } from 'components/MDXRenderer'
import installSnippetJson from '@data/content-install-snippet.json'
import type { InstallSnippet } from '~/data-layer/queries/content'

const installSnippet = installSnippetJson as InstallSnippet

function Install(): JSX.Element {
    const components = {
        code: InlineCode,
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
        a: (props) => <Link {...props} />,
        ...shortcodes,
    }
    return (
        <div className="article-content">
            <MDXProvider components={components}>
                {installSnippet && <MDXRenderer>{installSnippet}</MDXRenderer>}
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
