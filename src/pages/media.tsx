import { graphql } from 'gatsby'
import React from 'react'
import Editor from 'components/Editor'
import SEO from 'components/seo'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import Link from 'components/Link'
import { shortcodes } from '../mdxGlobalComponents'
// Note: MDX components are handled globally via mdxGlobalComponents

interface MediaProps {
    data: { mdx: { body: string; frontmatter: { title: string } } }
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
                        <MDXRenderer>{data.mdx.body}</MDXRenderer>
                    </MDXProvider>
                </div>
            </Editor>
        </>
    )
}

export const query = graphql`
    {
        mdx(fields: { slug: { eq: "/media-contents" } }) {
            body
            frontmatter {
                title
            }
        }
    }
`
