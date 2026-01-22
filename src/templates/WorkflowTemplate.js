import React from 'react'
import { graphql } from 'gatsby'
import ReaderView from 'components/ReaderView'
import { SEO } from 'components/seo'
import { TreeMenu } from 'components/TreeMenu'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'

export default function WorkflowTemplate({ data }) {
    if (!data) return null

    const { workflow, mdxTemplates, workflowTemplates } = data

    if (!workflow) return null

    const { templateId, name, description, image_url, created_by } = workflow

    // Build sidebar menu from all templates
    const dashboardTemplates = (mdxTemplates?.nodes || []).filter((t) =>
        t.frontmatter.filters?.type?.some((type) => type.toLowerCase() === 'dashboard')
    )
    const surveyTemplates = (mdxTemplates?.nodes || []).filter((t) =>
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

    const authorName = created_by ? [created_by.first_name, created_by.last_name].filter(Boolean).join(' ') : 'PostHog'

    return (
        <>
            <SEO image={image_url} title={`${name} workflow template - PostHog`} description={description} />
            <ReaderView
                body={{
                    type: 'plain',
                }}
                title={name}
                homeURL="/templates"
                leftSidebar={<TreeMenu items={templatesMenu} />}
                hideRightSidebar
                hideTitle
                showQuestions={false}
            >
                <div className="max-w-3xl mx-auto prose">
                    <h1 className="!mb-4">{name}</h1>
                    {image_url && (
                        <div className="mb-4">
                            <CloudinaryImage
                                src={image_url}
                                alt={name}
                                className="rounded w-full"
                                imgClassName="w-full"
                            />
                        </div>
                    )}
                    {description && <p className="mb-4 mt-0">{description}</p>}
                    {authorName && (
                        <p className="text-sm text-muted m-0">
                            Created by <span className="font-semibold">{authorName}</span>
                        </p>
                    )}
                </div>
            </ReaderView>
        </>
    )
}

export const query = graphql`
    query WorkflowTemplate($slug: String!) {
        workflow: postHogWorkflowTemplate(fields: { slug: { eq: $slug } }) {
            templateId
            fields {
                slug
            }
            name
            description
            image_url
            created_by {
                first_name
                last_name
            }
        }
        mdxTemplates: allMdx(
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
