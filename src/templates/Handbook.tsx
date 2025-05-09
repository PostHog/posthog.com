import React from 'react'
import ReaderView from 'components/ReaderView'
import { graphql } from 'gatsby'
import { Blockquote } from 'components/BlockQuote'
import { MdxCodeBlock } from 'components/CodeBlock'
import { Heading } from 'components/Heading'
import { InlineCode } from 'components/InlineCode'
import Team from 'components/People'
import TestimonialsTable from 'components/TestimonialsTable'
import { ZoomImage } from 'components/ZoomImage'
import { shortcodes } from '../mdxGlobalComponents'
import Markdown from 'markdown-to-jsx'
import TeamRoadmap from 'components/TeamRoadmap'
import TeamMembers from 'components/TeamMembers'
import { CategoryData } from 'components/Blog/constants/categories'
import { TutorialTags } from 'components/Tutorials/constants/tags'
import { Emoji } from 'components/Emoji'
import TeamUpdate from 'components/TeamUpdate'
import CopyCode from 'components/CopyCode'
import TeamMember from 'components/TeamMember'
import { OverflowXSection } from 'components/OverflowXSection'
import APIExamples from 'components/Product/Pipelines/APIExamples'
import Configuration from 'components/Product/Pipelines/Configuration'
import Link from 'components/Link'
import SEO from 'components/seo'

type AppParametersProps = {
    config:
        | {
              key: string
              name: string | null
              required: boolean | null
              type: string | null
              hint: string | null
              description: string | null
          }[]
        | null
}

type TemplateParametersProps =
    | {
          templateId: string
          name: string
          type: string
          inputs_schema:
              | {
                    key: string
                    type: string | null
                    label: string | null
                    description: string | null
                    default?: string | null
                    secret?: boolean | null
                    required?: boolean | null
                }[]
              | null
      }[]
    | null

export const AppParametersFactory: (params: AppParametersProps) => React.FC = ({ config }) => {
    const AppParameters = () => {
        if (!config) {
            return null
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th>Option</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {config.map((option) => {
                        if (!option.name) {
                            return null
                        }

                        return (
                            <tr key={option.key}>
                                <td>
                                    <div className="mb-6">
                                        <code className="dark:bg-gray-accent-dark dark:text-white bg-gray-accent-light text-inherit p-1 rounded">
                                            {option.name}
                                        </code>
                                    </div>

                                    {option.type && (
                                        <div>
                                            <strong>Type: </strong>
                                            <span>{option.type}</span>
                                        </div>
                                    )}

                                    <div>
                                        <strong>Required: </strong>
                                        <span>{option.required ? 'True' : 'False'}</span>
                                    </div>
                                </td>

                                <td>
                                    {option.description || option.hint ? (
                                        <Markdown>{option.description || option.hint || ''}</Markdown>
                                    ) : null}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    return AppParameters
}

export const TemplateParametersFactory: (params: TemplateParametersProps) => React.FC<{ templateId?: string }> = (
    templateConfigs
) => {
    const TemplateParameters = ({ templateId }: { templateId?: string }) => {
        const template = templateConfigs?.find((t) => t.templateId === templateId) || templateConfigs?.[0]
        const inputs_schema = template?.inputs_schema
        if (!inputs_schema) {
            return null
        }

        return (
            <div>
                <Configuration inputs_schema={inputs_schema} />
                <APIExamples
                    name={template?.name}
                    inputs_schema={inputs_schema}
                    id={template?.templateId}
                    type={template?.type}
                />
            </div>
        )
    }

    return TemplateParameters
}

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

export default function Handbook({
    data: { post },
    pageContext: { menu, breadcrumb = [], breadcrumbBase, tableOfContents, searchFilter },
}) {
    const {
        body,
        frontmatter: { title, seo },
        fields: { slug, contributors, appConfig, templateConfigs, commits },
        excerpt,
    } = post

    const components = {
        Team,
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
        TestimonialsTable,
        AppParameters: AppParametersFactory({ config: appConfig }),
        TemplateParameters: TemplateParametersFactory(templateConfigs),
        TeamRoadmap: (props) => TeamRoadmap({ team: title?.replace(/team/gi, '').trim(), ...props }),
        TeamMembers: (props) => TeamMembers({ team: title?.replace(/team/gi, '').trim(), ...props }),
        CategoryData,
        TutorialTags,
        Emoji,
        TeamUpdate: (props) => TeamUpdate({ teamName: title?.replace(/team/gi, '').trim(), ...props }),
        CopyCode,
        TeamMember,
        table: (props) => (
            <OverflowXSection>
                <table {...props} />
            </OverflowXSection>
        ),
        ...shortcodes,
    }

    return (
        <>
            <SEO
                title={seo?.metaTitle || `${title} - ${breadcrumbBase.name} - PostHog`}
                description={seo?.metaDescription || excerpt}
                article
                image={`${process.env.GATSBY_CLOUDFRONT_OG_URL}/${slug.replace(/\//g, '')}.jpeg`}
                imageType="absolute"
            />
            <ReaderView
                body={{ type: 'mdx', content: body }}
                title={title}
                tableOfContents={tableOfContents}
                mdxComponents={components}
                commits={commits}
                filePath={post.parent?.relativePath}
            />
        </>
    )
}

export const query = graphql`
    query HandbookQuery($id: String!, $nextURL: String!, $links: [String!]!) {
        glossary: allMdx(filter: { fields: { slug: { in: $links } } }) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    title
                    featuredVideo
                }
                excerpt(pruneLength: 300)
            }
        }
        nextPost: mdx(fields: { slug: { eq: $nextURL } }) {
            excerpt(pruneLength: 500)
            frontmatter {
                title
            }
            fields {
                slug
            }
        }
        post: mdx(id: { eq: $id }) {
            id
            body
            excerpt(pruneLength: 150)
            fields {
                slug
                commits {
                    author {
                        avatar_url
                        html_url
                        login
                    }
                    date
                    message
                    url
                }
                appConfig {
                    key
                    name
                    required
                    type
                    hint
                    description
                }
                contributors {
                    url
                    username
                    teamData {
                        name
                    }
                    avatar
                    profile {
                        squeakId
                        firstName
                        lastName
                        companyRole
                        avatar {
                            url
                        }
                    }
                }
            }
            frontmatter {
                title
                description
                showTitle
                hideAnchor
                hideLastUpdated
                github
                isArticle
                features {
                    eventCapture
                    userIdentification
                    autoCapture
                    sessionRecording
                    featureFlags
                    groupAnalytics
                    surveys
                    llmObservability
                    errorTracking
                }
                availability {
                    free
                    selfServe
                    teams
                    enterprise
                }
                thumbnail {
                    childImageSharp {
                        gatsbyImageData(placeholder: NONE, width: 36)
                    }
                }
                related {
                    childMdx {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                        }
                    }
                }
                installUrl
                featuredImage {
                    publicURL
                }
                seo {
                    ...SEOFragment
                }
            }
            parent {
                ... on File {
                    relativePath
                    fields {
                        gitLogLatestDate(formatString: "MMM DD, YYYY")
                    }
                }
            }
        }
    }
`
