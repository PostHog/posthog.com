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
import TemplateCTA, { CtaSpec } from 'components/TemplateCTA'
import SelfDrivingInboxPage from 'components/SelfDrivingInbox/Page'

const A = (props) => <Link {...props} />

/** Until every template declares a `cta`, keep deriving one from its type. */
function legacyCta(templateType?: string, title?: string): CtaSpec | null {
    if (templateType === 'self-driving') {
        return { kind: 'url', value: 'https://app.posthog.com/inbox/config', label: 'Open your scout fleet' }
    }
    if (templateType === 'survey') {
        // No `?template=` here: the app matches an exact enum value, which only the frontmatter knows.
        return { kind: 'url', value: 'https://app.posthog.com/surveys/guided/new', label: 'Create a survey' }
    }
    return title ? { kind: 'dashboard', value: title } : null
}

function legacySecondary(templateType?: string): { href: string; label: string } | null {
    if (templateType === 'self-driving') {
        return { href: '/docs/self-driving/setup', label: 'Set up self-driving' }
    }
    if (templateType === 'survey') {
        return { href: '/docs/surveys', label: 'Read the surveys docs' }
    }
    return { href: 'https://app.posthog.com/dashboards', label: 'Go to dashboards' }
}

export default function Template({ data }) {
    const { pageData, templates, workflowTemplates } = data
    const {
        body,
        excerpt,
        fields: { slug },
        parent,
    } = pageData
    const { title, featuredImage, description, filters, cta } = pageData?.frontmatter
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
    const selfDrivingTemplates = allTemplates.filter((t) =>
        t.frontmatter.filters?.type?.some((type) => type.toLowerCase() === 'self-driving')
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
        ...(selfDrivingTemplates.length > 0
            ? [
                  {
                      name: 'Self-driving',
                      children: selfDrivingTemplates.map(({ frontmatter: { title }, fields: { slug } }) => ({
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

    // Self-driving templates have no page of their own: the inbox is the entire surface, so
    // /templates/<slug> renders the same UI with that report pre-selected. Everything it needs
    // lives in frontmatter, which is why these MDX bodies are empty.
    // See components/SelfDrivingInbox/README.md.
    if (templateType === 'self-driving') {
        const templateSlug = slug.replace(/^\/templates\//, '').replace(/\/$/, '')
        return (
            <>
                <SEO
                    image={`/images/templates/${slug.split('/')[2]}.png`}
                    title={`${title} – self-driving template - PostHog`}
                    description={pageData?.frontmatter?.subtitle || description || excerpt}
                />
                <SelfDrivingInboxPage initialSlug={templateSlug} />
            </>
        )
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
                        <TemplateCTA
                            cta={cta ?? legacyCta(templateType, title)}
                            secondary={legacySecondary(templateType)}
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
                subtitle
                filters {
                    type
                }
                cta {
                    kind
                    value
                    label
                    fallback
                }
                report {
                    title
                    priority
                    source
                    receivedAgo
                    body
                    suggestedAction
                    actionNote
                    affected
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
