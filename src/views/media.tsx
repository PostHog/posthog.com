import React from 'react'
import Editor from 'components/Editor'
import SEO from 'components/seo'
import { MDXProvider } from '@mdx-js/react'
import Link from 'components/Link'
import { shortcodes } from '../mdxGlobalComponents'
import { MDXRenderer } from 'components/MDXRenderer'
// Note: MDX components are handled globally via mdxGlobalComponents

interface MediaProps {
    /** The page's MDX content key (src/lib/routes/viewData.ts). */
    data: { body: string }
}

export default function Media({ data }: MediaProps) {
    return (
        <>
            <SEO
                title="Media & press - PostHog"
                description="Media resources, press information, and brand assets for PostHog"
                image={`/images/og/default.png`}
            />
            <Editor
                maxWidth="100%"
                proseSize="base"
                bookmark={{
                    title: 'Media & press',
                    description: 'Media resources and press information',
                }}
            >
                <div className="max-w-3xl mx-auto pb-12 px-4 @xl:px-8">
                    <MDXProvider
                        components={{ a: (props) => <Link {...props} state={{ newWindow: true }} />, ...shortcodes }}
                    >
                        <MDXRenderer>{data.body}</MDXRenderer>
                    </MDXProvider>
                </div>
            </Editor>
        </>
    )
}
