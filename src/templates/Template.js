import { MDXProvider } from '@mdx-js/react'
import Breadcrumbs from 'components/Breadcrumbs'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { Section } from 'components/Section'
import { SEO } from 'components/seo'
import { CallToAction } from 'components/CallToAction'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'
import React from 'react'
import { shortcodes } from '../mdxGlobalComponents'
import CreateDashboardImage from '../../contents/images/templates/create-dashboard.png'
import CreateSurveyImage from '../../contents/images/templates/create-survey.png'
import { communityMenu } from '../navs'

export default function Template({ data }) {
    const { pageData } = data
    const {
        body,
        excerpt,
        fields: { slug },
    } = pageData
    const { title, subtitle, featuredImage, description, filters } = pageData?.frontmatter
    const { type } = filters

    return (
        <Layout parent={communityMenu} activeInternalMenu={communityMenu.children[2]}>
            <SEO
                image={`/images/templates/${slug.split('/')[2]}.png`}
                title={`${title} template - PostHog`}
                description={description || excerpt}
            />
            <div
                style={{ gridAutoColumns: 'minmax(max-content, 1fr) minmax(auto, 880px) 1fr' }}
                className="mt-10 w-full relative lg:grid lg:grid-flow-col lg:gap-12 items-start"
            >
                <section>
                    <div className="lg:max-w-[880px] lg:pr-5 px-5 lg:px-0 mx-auto">
                        <h1 className="text-center mt-0 mb-2 lg:block">{title}</h1>
                        <h3 className="text-center mt-0 mb-6 font-semibold text-xl opacity-50">{subtitle}</h3>
                        <GatsbyImage image={getImage(featuredImage)} alt="" />
                        <article>
                            <MDXProvider components={{ ...shortcodes, Section }}>
                                <MDXRenderer>{body}</MDXRenderer>
                            </MDXProvider>
                        </article>
                        <article>
                            {type.includes('dashboard') && (
                                <div className="flex justify-center gap-2 mb-12">
                                    <CallToAction href="https://us.posthog.com/dashboard#newDashboard" type="primary">
                                        Get started with this template
                                    </CallToAction>
                                    <CallToAction href="https://us.posthog.com/dashboard" type="secondary">
                                        Create your own
                                    </CallToAction>
                                </div>
                            )}
                            {type.includes('survey') && (
                                <div className="flex justify-center gap-2 mb-12">
                                    <CallToAction href="https://us.posthog.com/survey_templates" type="primary">
                                        Get started with this template
                                    </CallToAction>
                                    <CallToAction href="https://us.posthog.com/surveys" type="secondary">
                                        Create your own
                                    </CallToAction>
                                </div>
                            )}
                        </article>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query Template($id: String!) {
        pageData: mdx(id: { eq: $id }) {
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            frontmatter {
                title
                subtitle
                description
                filters {
                    type
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
