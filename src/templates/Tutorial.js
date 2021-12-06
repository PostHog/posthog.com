import { MDXProvider } from '@mdx-js/react'
import { FeatureSnapshot } from 'components/FeatureSnapshot'
import { Hero } from 'components/Hero'
import { Check, Close } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { Section } from 'components/Section'
import { SEO } from 'components/seo'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { CodeBlock } from '../components/CodeBlock'
import { shortcodes } from '../mdxGlobalComponents'

const articleWidth = {
    lg: 'max-w-screen-2xl',
    md: 'max-w-5xl',
    sm: 'max-w-2xl',
    full: 'w-full',
}

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

export default function Plain({ data }) {
    const { pageData } = data
    const { body, excerpt } = pageData
    const { title, featuredImage, description, showTitle, width = 'sm', noindex } = pageData?.frontmatter
    const components = {
        pre: CodeBlock,
        Hero,
        Section,
        FeatureSnapshot,
        Check,
        Close,
        a: A,
        ...shortcodes,
    }
    return (
        <Layout>
            <SEO
                title={title + ' - PostHog'}
                description={description || excerpt}
                article
                image={featuredImage?.publicURL}
                noindex={noindex}
            />
            <div
                style={{ gridAutoColumns: '1fr minmax(auto, 650px) minmax(max-content, 1fr)' }}
                className="w-full relative lg:grid lg:grid-flow-col items-start -mb-20"
            >
                <article className="col-span-2 px-5 lg:px-8 border-l border-dashed border-gray-accent-light dark:border-gray-accent-dark mt-10 lg:mt-0 lg:pt-10 pb-20">
                    <div className="max-w-[650px] w-full">
                        <h1 className="text-center">{title}</h1>
                        <MDXProvider components={components}>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                </article>
                <aside className="lg:sticky top-10 flex-shrink-0 w-full lg:w-[229px] justify-self-end px-5 lg:px-8 lg:box-content my-10 lg:my-0 lg:pt-10 lg:pb-20"></aside>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query TutorialLayout($id: String!) {
        pageData: mdx(id: { eq: $id }) {
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            frontmatter {
                title
                showTitle
                description
                featuredImageType
                featuredImage {
                    publicURL
                }
                width
                noindex
            }
        }
    }
`
