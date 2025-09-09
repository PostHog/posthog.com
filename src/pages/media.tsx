import { graphql } from 'gatsby'
import React from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import Link from 'components/Link'
import { shortcodes } from '../mdxGlobalComponents'
// Note: MDX components are handled globally via mdxGlobalComponents

interface MediaProps {
    data: { mdx: { body: string; frontmatter: { title: string } } }
}

export default function Media({ data }: MediaProps) {
    const { tabs, handleTabChange, tabContainerClassName, className } = useCompanyNavigation({
        value: '/media',
        content: (
            <div className="max-w-3xl mx-auto pb-12">
                <MDXProvider
                    components={{ a: (props) => <Link {...props} state={{ newWindow: true }} />, ...shortcodes }}
                >
                    <MDXRenderer>{data.mdx.body}</MDXRenderer>
                </MDXProvider>
            </div>
        ),
    })

    return (
        <>
            <SEO
                title="Media & press - PostHog"
                description="Media resources, press information, and brand assets for PostHog"
                image={`/images/og/product-analytics.jpg`}
            />
            <Editor
                maxWidth="100%"
                proseSize="base"
                bookmark={{
                    title: 'Media & press',
                    description: 'Media resources and press information',
                }}
                hasTabs
            >
                <OSTabs
                    tabs={tabs}
                    defaultValue="/media"
                    onValueChange={handleTabChange}
                    padding
                    tabContainerClassName={tabContainerClassName}
                    tabContentClassName="px-4 @xl:px-8"
                    className={className}
                    triggerDataScheme="primary"
                    centerTabs
                />
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
