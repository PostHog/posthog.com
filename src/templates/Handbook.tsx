import { MDXProvider } from '@mdx-js/react'
import { useLocation } from '@reach/router'
import { Blockquote } from 'components/BlockQuote'
import { MdxCodeBlock } from 'components/CodeBlock'
import { Heading } from 'components/Heading'
import { InlineCode } from 'components/InlineCode'
import Layout from 'components/Layout'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import Contributors from 'components/PostLayout/Contributors'
import SidebarSection from 'components/PostLayout/SidebarSection'
import { SEO } from 'components/seo'
import Team from 'components/Team'
import TestimonialsTable from 'components/TestimonialsTable'
import { ZoomImage } from 'components/ZoomImage'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { shortcodes } from '../mdxGlobalComponents'
import MobileSidebar from 'components/Docs/MobileSidebar'
import LibraryFeatures from 'components/LibraryFeatures'
import { GitHub } from 'components/Icons/Icons'
import { getCookie } from 'lib/utils'
import { CallToAction } from 'components/CallToAction'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Tooltip from 'components/Tooltip'
import CommunityQuestions from 'components/CommunityQuestions'
import { formatNode } from 'components/GlossaryElement'
import Markdown from 'markdown-to-jsx'
import CheckIcon from '../images/check.svg'
import XIcon from '../images/x.svg'
import WarningIcon from '../images/warning.svg'
import TeamRoadmap from 'components/TeamRoadmap'
import TeamMembers from 'components/TeamMembers'
import { CategoryData } from 'components/Blog/constants/categories'
import { TutorialTags } from 'components/Tutorials/constants/tags'
import { Emoji } from 'components/Emoji'
import TeamUpdate from 'components/TeamUpdate'
import CopyCode from 'components/CopyCode'

const renderAvailabilityIcon = (availability: 'full' | 'partial' | 'none') => {
    switch (availability) {
        case 'full':
            return (
                <Tooltip content="This plan has full access to this feature">
                    <img src={CheckIcon} alt="Available" className="h-4 w-4" aria-hidden="true" />
                </Tooltip>
            )
        case 'partial':
            return (
                <Tooltip content="Some parts of this feature are not available on this plan">
                    <img src={WarningIcon} alt="Partially available" className="h-4 w-4" aria-hidden="true" />
                </Tooltip>
            )
        case 'none':
            return (
                <Tooltip content="This feature is not available on this plan">
                    <img src={XIcon} alt="Not available" className="h-4 w-4" aria-hidden="true" />
                </Tooltip>
            )
    }
}

const MDX = ({ body }) => (
    <MDXProvider components={{}}>
        <MDXRenderer>{body}</MDXRenderer>
    </MDXProvider>
)

export const HandbookSidebar = ({ contributors, title, location, availability, related }) => {
    return (
        <>
            {contributors && (
                <SidebarSection>
                    <Contributors
                        contributors={contributors.map(({ url, username, avatar, teamData }) => ({
                            url,
                            name: teamData?.name || username,
                            image: avatar,
                        }))}
                    />
                </SidebarSection>
            )}

            {availability && (
                <SidebarSection title="Feature availability" className="space-y-1.5">
                    <div className="flex items-center justify-between font-bold">
                        <span>Free / Open-source</span>
                        {renderAvailabilityIcon(availability.free)}
                    </div>
                    <div className="flex items-center justify-between font-bold">
                        <span>Self-serve</span>
                        {renderAvailabilityIcon(availability.selfServe)}
                    </div>
                    <div className="flex items-center justify-between font-bold">
                        <span>Enterprise</span>
                        {renderAvailabilityIcon(availability.enterprise)}
                    </div>
                </SidebarSection>
            )}

            {related && (
                <SidebarSection title="Related articles">
                    <ul className="p-0 space-y-1.5">
                        {related.map(({ childMdx }) => (
                            <li key={childMdx.fields.slug} className="list-none">
                                <Link to={childMdx.fields.slug} className="text-sm block">
                                    {childMdx.frontmatter.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </SidebarSection>
            )}
        </>
    )
}

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

export default function Handbook({
    data: { post, nextPost, glossary, mission, objectives },
    pageContext: { menu, breadcrumb = [], breadcrumbBase, tableOfContents, searchFilter },
    location,
}) {
    const {
        body,
        frontmatter,
        fields: { slug, contributors, appConfig },
    } = post
    const {
        title,
        description,
        showTitle,
        hideAnchor,
        hideLastUpdated,
        features,
        github,
        availability,
        installUrl,
        thumbnail,
        crest,
        related,
        seo,
    } = frontmatter
    const { parent, excerpt } = post
    const lastUpdated = parent?.fields?.gitLogLatestDate
    const showToc = !hideAnchor && tableOfContents?.length > 0
    const filePath = post?.parent?.relativePath

    const isArticle = frontmatter.isArticle !== false

    const [showCTA, setShowCTA] = React.useState<boolean>(
        typeof window !== 'undefined' ? Boolean(getCookie('ph_current_project_token')) : false
    )

    const A = (props) => (
        <Link
            {...props}
            glossary={glossary?.nodes?.map(formatNode)}
            className="text-red hover:text-red font-semibold"
        />
    )

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
        Mission: (_props) => (mission?.body ? MDX({ body: mission.body }) : null),
        Objectives: (_props) => (objectives?.body ? MDX({ body: objectives.body }) : null),
        TeamRoadmap: (props) => TeamRoadmap({ team: title?.replace(/team/gi, '').trim(), ...props }),
        TeamMembers: (props) => TeamMembers({ team: title?.replace(/team/gi, '').trim(), ...props }),
        CategoryData,
        TutorialTags,
        Emoji,
        TeamUpdate: (props) => TeamUpdate({ teamName: title?.replace(/team/gi, '').trim(), ...props }),
        CopyCode,
        ...shortcodes,
    }

    return (
        <>
            <SEO
                title={seo?.metaTitle || `${title} - ${breadcrumbBase.name} - PostHog`}
                description={seo?.metaDescription || excerpt}
                article
                image={`/og-images/${slug.replace(/\//g, '')}.jpeg`}
            />
            <Layout>
                <PostLayout
                    searchFilter={searchFilter}
                    title={title}
                    filePath={filePath}
                    questions={
                        <div id="squeak-questions" className="pb-8">
                            <CommunityQuestions />
                        </div>
                    }
                    menu={menu}
                    menuWidth={{ left: 400 }}
                    sidebar={
                        <HandbookSidebar
                            contributors={contributors}
                            availability={availability}
                            related={related}
                            location={location}
                            title={title}
                        />
                    }
                    tableOfContents={[...tableOfContents, { depth: 0, value: 'Questions?', url: 'squeak-questions' }]}
                    breadcrumb={[breadcrumbBase, ...(breadcrumb?.slice(0, breadcrumb.length - 1) || [])]}
                    hideSidebar={hideAnchor}
                    nextPost={nextPost}
                >
                    <section>
                        <div className="mb-8 relative">
                            <div className="flex items-center mt-0 flex-wrap justify-between">
                                <div className="flex flex-col-reverse md:flex-row md:items-center space-x-2 mb-1 w-full">
                                    {thumbnail && <GatsbyImage image={getImage(thumbnail)} />}
                                    {showTitle && (
                                        <div className="flex-1">
                                            <h1 className="dark:text-white text-3xl sm:text-4xl m-0">{title}</h1>
                                            {description && (
                                                <p className="italic opacity-75 leading-tight mt-1 mb-0">
                                                    {description}
                                                </p>
                                            )}
                                            {(!hideLastUpdated || filePath) && (
                                                <div className="flex space-x-2 items-center mb-4 md:mt-1 md:mb-0 text-black dark:text-white">
                                                    {!hideLastUpdated && (
                                                        <p className="m-0 font-semibold text-primary/30 dark:text-primary-dark/30">
                                                            Last updated: <time>{lastUpdated}</time>
                                                        </p>
                                                    )}
                                                    {!hideLastUpdated && filePath && (
                                                        <span className="text-primary/30 dark:text-primary-dark/30">
                                                            |
                                                        </span>
                                                    )}
                                                    {filePath && (
                                                        <Link
                                                            className="text-primary/30 dark:text-primary-dark/30 hover:text-red dark:hover:text-yellow"
                                                            to={`https://github.com/PostHog/posthog.com/tree/master/contents/${filePath}`}
                                                        >
                                                            Edit this page
                                                        </Link>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {crest ? (
                                        <div className="w-64">
                                            <GatsbyImage image={getImage(crest)} className="mix-blend-multiply" />
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <div className="flex items-center space-x-2">
                                    {github && (
                                        <Link to={github}>
                                            <GitHub className="w-8 h-8 text-black/80 hover:text-black/60 dark:text-white/80 hover:dark:text-white/60 transition-colors" />
                                        </Link>
                                    )}
                                    {installUrl && showCTA && (
                                        <CallToAction size="sm" to={installUrl}>
                                            <span className="text-[17px] md:px-1 md:py-0.5">Install</span>
                                        </CallToAction>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="lg:hidden">
                            {showToc && <MobileSidebar tableOfContents={tableOfContents} />}
                        </div>
                        {features && <LibraryFeatures availability={features} />}
                        <div className={isArticle && 'article-content'}>
                            <MDXProvider components={components}>
                                <MDXRenderer>{body}</MDXRenderer>
                            </MDXProvider>
                        </div>
                    </section>
                </PostLayout>
            </Layout>
        </>
    )
}

export const query = graphql`
    query HandbookQuery($id: String!, $nextURL: String!, $links: [String!]!, $mission: String, $objectives: String) {
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
        mission: mdx(fields: { slug: { eq: $mission } }) {
            body
        }
        objectives: mdx(fields: { slug: { eq: $objectives } }) {
            body
        }
        post: mdx(id: { eq: $id }) {
            id
            body
            excerpt(pruneLength: 150)
            fields {
                slug
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
                    avatar {
                        childImageSharp {
                            gatsbyImageData(width: 38, height: 38)
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
                }
                availability {
                    free
                    selfServe
                    enterprise
                }
                thumbnail {
                    childImageSharp {
                        gatsbyImageData(placeholder: NONE, width: 36)
                    }
                }
                crest {
                    childImageSharp {
                        gatsbyImageData(placeholder: NONE, width: 512)
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
