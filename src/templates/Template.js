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
import Slugger from 'github-slugger'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { TreeMenu } from 'components/TreeMenu'
import { CallToAction } from 'components/CallToAction'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const A = (props) => <Link {...props} />

const TemplateCTAs = ({ type, title, usePrefilterLink = true }) => {
    const isDashboard = type.includes('dashboard')
    const isSurvey = type.includes('survey')

    if (!isDashboard && !isSurvey) return null

    const primaryHref = isDashboard
        ? `https://us.posthog.com/dashboard?${usePrefilterLink ? `templateFilter=${title}` : ''}#newDashboard`
        : 'https://us.posthog.com/survey_templates'
    const secondaryHref = isDashboard ? 'https://us.posthog.com/dashboard' : 'https://us.posthog.com/surveys'

    return (
        <div className="flex justify-center gap-2 mb-12">
            <CallToAction href={primaryHref} type="primary">
                Get started with this template
            </CallToAction>
            <CallToAction href={secondaryHref} type="secondary">
                Create your own
            </CallToAction>
        </div>
    )
}

// Format headings into table of contents, similar to createPages
function formatToc(headings) {
    const slugger = new Slugger()
    return headings.map((heading) => {
        const cleanValue = heading.value.replace(/\s*<([a-z]+).+?>.+?<\/\1>/g, '')
        return {
            ...heading,
            url: `#${slugger.slug(cleanValue)}`,
            value: cleanValue,
        }
    })
}

export default function Template({ data }) {
    const { pageData, templates, workflowTemplates } = data
    const {
        body,
        excerpt,
        headings,
        fields: { slug },
        parent,
    } = pageData
    const {
        title,
        subtitle,
        featuredImage,
        description,
        tableOfContents: frontmatterToc,
        filters,
    } = pageData?.frontmatter
    const type = filters?.type?.map((t) => t.toLowerCase()) || []
    const filePath = parent?.relativePath

    // Generate table of contents from headings or use frontmatter
    const tableOfContents = frontmatterToc || (headings ? formatToc(headings) : null)

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
                    <TemplateCTAs type={type} title={title} />
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
            headings {
                depth
                value
            }
            fields {
                slug
            }
            frontmatter {
                title
                subtitle
                description
                tableOfContents {
                    depth
                    url
                    value
                }
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
