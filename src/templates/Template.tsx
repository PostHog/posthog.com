import React from 'react'
import { graphql } from 'gatsby'
import ReaderView from 'components/ReaderView'
import { SEO } from 'components/seo'
import { Section } from 'components/Section'
import { shortcodes } from '../mdxGlobalComponents'
import { Blockquote } from 'components/BlockQuote'
import { MdxCodeBlock } from 'components/CodeBlock'
import { Heading } from 'components/Heading'
import { InlineCode } from 'components/InlineCode'
import { ZoomImage } from 'components/ZoomImage'
import Link from 'components/Link'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { TreeMenu } from 'components/TreeMenu'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import TemplateCTAs from 'components/TemplateCTAs'

const A = (props) => <Link {...props} />

export default function Template({ data }) {
    const { pageData, templates, workflowTemplates } = data
    const {
        body,
        excerpt,
        fields: { slug },
        parent,
    } = pageData
    const { title, featuredImage, description, filters } = pageData?.frontmatter
    const templateType = filters?.type?.[0]?.toLowerCase()
    const filePath = parent?.relativePath

    // Group templates by type for the sidebar menu
    const allTemplates = templates?.nodes || []
    const dashboardTemplates = allTemplates.filter((t) =>
        t.frontmatter.filters?.type?.some((type) => type.toLowerCase() === 'dashboard')
    )
    const surveyTemplates = allTemplates.filter((t) =>
        t.frontmatter.filters?.type?.some((type) => type.toLowerCase() === 'survey')
    )
    const workflows = workflowTemplates?.nodes || []

    const templatesMenu = [
        ...(dashboardTemplates.length > 0
            ? [
                  {
                      name: 'Dashboards',
                      children: dashboardTemplates.map(({ frontmatter: { title }, fields: { slug } }) => ({
                          name: title,
                          url: slug,
                      })),
                  },
              ]
            : []),
        ...(surveyTemplates.length > 0
            ? [
                  {
                      name: 'Surveys',
                      children: surveyTemplates.map(({ frontmatter: { title }, fields: { slug } }) => ({
                          name: title,
                          url: slug,
                      })),
                  },
              ]
            : []),
        ...(workflows.length > 0
            ? [
                  {
                      name: 'Workflows',
                      children: workflows.map((w) => ({
                          name: w.name,
                          url: `/templates/workflow/${w.fields.slug}`,
                      })),
                  },
              ]
            : []),
    ]

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
        a: A,
        ...shortcodes,
        Section,
    }

    return (
        <>
            <SEO
                image={`/images/templates/${slug.split('/')[2]}.png`}
                title={`${title} template - PostHog`}
                description={description || excerpt}
            />
            <ReaderView
                body={{
                    type: 'plain',
                }}
                title={title}
                filePath={filePath}
                homeURL="/templates"
                leftSidebar={<TreeMenu items={templatesMenu} />}
                hideRightSidebar
                hideTitle
                showQuestions={false}
            >
                <div className="max-w-3xl mx-auto">
                    <h1 className="!mb-4">{title}</h1>
                    <div className="mb-4">
                        {featuredImage && (
                            <GatsbyImage image={getImage(featuredImage)} alt={title} className="rounded" />
                        )}
                    </div>
                    <MDXProvider components={components}>
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                    <div className="mb-12">
                        <TemplateCTAs
                            urls={{
                                primary:
                                    templateType === 'survey'
                                        ? `https://app.posthog.com/survey_templates`
                                        : `https://app.posthog.com/dashboard?templateFilter=${title}#newDashboard`,
                                secondary:
                                    templateType === 'survey'
                                        ? `https://app.posthog.com/surveys/guided/new`
                                        : `https://app.posthog.com/dashboards`,
                            }}
                        />
                    </div>
                </div>
            </ReaderView>
        </>
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
                description
                featuredImage {
                    publicURL
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                filters {
                    type
                }
            }
            parent {
                ... on File {
                    relativePath
                }
            }
        }
        templates: allMdx(
            filter: { fields: { slug: { regex: "/^/templates/(?!.*/docs).*/" } } }
            sort: { fields: [fields___slug], order: ASC }
        ) {
            nodes {
                id
                fields {
                    slug
                }
                frontmatter {
                    title
                    filters {
                        type
                    }
                }
            }
        }
        workflowTemplates: allPostHogWorkflowTemplate(sort: { fields: [name], order: ASC }) {
            nodes {
                fields {
                    slug
                }
                name
            }
        }
    }
`
