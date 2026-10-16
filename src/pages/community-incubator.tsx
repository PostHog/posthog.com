import { graphql } from 'gatsby'
import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { shortcodes } from '../mdxGlobalComponents'
import ReaderView from 'components/ReaderView'
import { SEO } from 'components/seo'

export default function CommunityIncubatorPage({ data }: { data: any }) {
    const { mdx } = data || {}
    if (!mdx) return null

    return (
        <>
            <SEO title={mdx.frontmatter?.title || 'Community Incubator'} />
            <ReaderView hideLeftSidebar>
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <MDXProvider components={shortcodes}>
                        <MDXRenderer>{mdx.body}</MDXRenderer>
                    </MDXProvider>
                </div>
            </ReaderView>
        </>
    )
}

export const query = graphql`
    {
        mdx(fields: { slug: { eq: "/community-incubator" } }) {
            body
            frontmatter {
                title
            }
        }
    }
`
