import { MDXProvider } from '@mdx-js/react'
import Chip from 'components/Chip'
import { FeatureSnapshot } from 'components/FeatureSnapshot'
import { Hero } from 'components/Hero'
import { Check, Close, Facebook, LinkedIn, Mail, Twitter } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { Section } from 'components/Section'
import { SEO } from 'components/seo'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { CodeBlock } from '../components/CodeBlock'
import { shortcodes } from '../mdxGlobalComponents'

const SidebarSection = ({ title, children }) => {
    return (
        <div className="py-4">
            {title && <h3 className="text-[13px] opacity-40 font-semibold mb-3">{title}</h3>}
            {children}
        </div>
    )
}

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

export default function Tutorial({ data, pageContext: { pageViews } }) {
    const { pageData } = data
    const { body, excerpt } = pageData
    const { title, featuredImage, description, contributors, categories } = pageData?.frontmatter
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
            />
            <div
                style={{ gridAutoColumns: '1fr minmax(auto, 650px) minmax(max-content, 1fr)' }}
                className="w-full relative lg:grid lg:grid-flow-col items-start"
            >
                <article className="col-span-2 px-5 lg:px-8 border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark mt-10 lg:mt-0 lg:pt-10 pb-20 ml-auto">
                    <div className="max-w-[650px] w-full">
                        <h1 className="text-2xl mb-6">{title}</h1>
                        <GatsbyImage className="mb-6" image={getImage(featuredImage)} />
                        <MDXProvider components={components}>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                </article>
                <aside className="lg:sticky top-10 flex-shrink-0 w-full lg:w-[229px] justify-self-end px-5 lg:px-8 lg:box-content my-10 lg:my-0 lg:pt-10 lg:pb-20 mr-auto">
                    <div className="grid divide-y divide-gray-accent-light divide-dashed">
                        <SidebarSection title="Contributors">
                            <ul className="list-none m-0 p-0">
                                {contributors.map(({ image, id, name }) => {
                                    return (
                                        <li key={id} className="flex space-x-2 items-center">
                                            <div className="w-[32px] h-[32px] relative rounded-full overflow-hidden">
                                                <img
                                                    className="absolute w-full h-full inset-0 object-cover"
                                                    src={image}
                                                />
                                            </div>
                                            <span className="author text-[14px] font-semibold opacity-50">{name}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </SidebarSection>
                        <SidebarSection title="Share">
                            <div className="opacity-50 flex space-x-3 items-center">
                                <Facebook />
                                <Twitter className="w-[32px] h-[32px]" />
                                <LinkedIn className="w-[32px] h-[32px]" />
                                <Mail />
                            </div>
                        </SidebarSection>
                        <SidebarSection>
                            <p className="m-0 opacity-50 font-semibold">{pageViews} views</p>
                        </SidebarSection>
                        <SidebarSection title="Filed under...">
                            <ul className="list-none p-0 m-0 flex flex-col items-start space-y-2">
                                {categories.map((category) => {
                                    return (
                                        <li key={category}>
                                            <Chip
                                                className="text-red hover:text-red"
                                                href={`/tutorials/${category}`}
                                                size="sm"
                                            >
                                                {category}
                                            </Chip>
                                        </li>
                                    )
                                })}
                            </ul>
                        </SidebarSection>
                    </div>
                </aside>
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
                description
                categories: topics
                contributors: authorData {
                    id
                    image
                    name
                }
                featuredImage {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
    }
`
