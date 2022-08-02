import { MDXProvider } from '@mdx-js/react'
import { useLocation } from '@reach/router'
import { Blockquote } from 'components/BlockQuote'
import { CodeBlock } from 'components/CodeBlock'
import { Heading } from 'components/Heading'
import { InlineCode } from 'components/InlineCode'
import Layout from 'components/Layout'
import Link from 'components/Link'
import PostLayout, { Contributors, ShareLinks, SidebarSection } from 'components/PostLayout'
import { SEO } from 'components/seo'
import Team from 'components/Team'
import TestimonialsTable from 'components/TestimonialsTable'
import { ZoomImage } from 'components/ZoomImage'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React, { useEffect, useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import { shortcodes } from '../mdxGlobalComponents'
import MobileSidebar from 'components/Docs/MobileSidebar'
import LibraryFeatures from 'components/LibraryFeatures'
import { GitHub } from 'components/Icons/Icons'
import { getCookie } from 'lib/utils'
import { CallToAction } from 'components/CallToAction'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import CommunityQuestions from 'components/CommunityQuestions'

export const HandbookSidebar = ({ contributors, title, location }) => {
    return (
        <>
            {contributors && (
                <SidebarSection title={`Author${contributors?.length > 1 ? 's' : ''}`}>
                    <Contributors
                        className="flex flex-col space-y-2"
                        contributors={contributors.map(({ url, username, avatar, teamData }) => ({
                            url,
                            name: teamData?.name || username,
                            image: avatar?.publicURL,
                        }))}
                    />
                </SidebarSection>
            )}
            <SidebarSection title="Share">
                <ShareLinks title={title} href={location.href} />
            </SidebarSection>
        </>
    )
}

export default function Handbook({
    data: { post, countries },
    pageContext: { menu, next, previous, breadcrumb = [], breadcrumbBase, tableOfContents },
    location,
}) {
    const { hash } = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)
    const {
        body,
        frontmatter,
        contributors,
        fields: { slug },
    } = post
    const { title, hideAnchor, description, hideLastUpdated, features, github, installUrl, thumbnail } = frontmatter
    const { parent, excerpt } = post
    const lastUpdated = parent?.fields?.gitLogLatestDate
    const showToc = !hideAnchor && tableOfContents?.length > 0
    const filePath = post?.parent?.relativePath

    const [showCTA, setShowCTA] = React.useState<boolean>(
        typeof window !== 'undefined' ? Boolean(getCookie('ph_current_project_token')) : false
    )

    const TotalCountries = (props) => <span {...props}>{countries.group.length}</span>

    const TotalTeam = (props) => (
        <span {...props}>{countries.group.reduce((prev, curr) => prev + curr.totalCount, 0)}</span>
    )
    const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />
    const Iframe = (props) => {
        if (props.src && props.src.indexOf('youtube.com') !== -1) {
            return (
                <div style={{ position: 'relative', height: 0, paddingBottom: '56.25%' }}>
                    <iframe {...props} className="absolute top-0 left-0 w-full h-full" />
                </div>
            )
        } else {
            return <iframe {...props} />
        }
    }
    const components = {
        Team,
        iframe: Iframe,
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: CodeBlock,
        h1: (props) => Heading({ as: 'h1', ...props }),
        h2: (props) => Heading({ as: 'h2', ...props }),
        h3: (props) => Heading({ as: 'h3', ...props }),
        h4: (props) => Heading({ as: 'h4', ...props }),
        h5: (props) => Heading({ as: 'h5', ...props }),
        h6: (props) => Heading({ as: 'h6', ...props }),
        img: ZoomImage,
        a: A,
        TotalCountries,
        TotalTeam,
        TestimonialsTable,
        ...shortcodes,
    }

    const handleMobileMenuClick = () => {
        setMenuOpen(!menuOpen)
    }

    useEffect(() => {
        if (hash) {
            scroll.scrollMore(-50)
        }
    }, [])

    return (
        <>
            <SEO
                title={`${title} - Posthog ${breadcrumbBase.name}`}
                description={description || excerpt}
                article
                image={`/og-images/${slug.replace(/\//g, '')}.jpeg`}
            />
            <Layout>
                <PostLayout
                    title={title}
                    filePath={filePath}
                    questions={
                        <div id="squeak-questions">
                            <CommunityQuestions />
                        </div>
                    }
                    menu={menu}
                    sidebar={<HandbookSidebar contributors={contributors} title={title} location={location} />}
                    tableOfContents={[...tableOfContents, { depth: 0, value: 'Questions?', url: 'squeak-questions' }]}
                    contentWidth="100%"
                    breadcrumb={[breadcrumbBase, ...(breadcrumb || [])]}
                    hideSidebar={hideAnchor}
                >
                    <section>
                        <div className="mb-8 relative">
                            <div className="flex items-center mt-0 flex-wrap justify-between">
                                <div className="flex items-center space-x-2 mb-2">
                                    {thumbnail && <GatsbyImage image={getImage(thumbnail)} />}
                                    <h1 className="dark:text-white text-3xl sm:text-5xl m-0">{title}</h1>
                                </div>
                                <div className="flex items-center space-x-2 mb-2">
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

                            {!hideLastUpdated && (
                                <p className="mt-1 mb-0 !opacity-30 text-black dark:text-white font-semibold">
                                    Last updated: <time>{lastUpdated}</time>
                                </p>
                            )}
                            {showToc && <MobileSidebar tableOfContents={tableOfContents} />}
                        </div>
                        {features && <LibraryFeatures availability={features} />}
                        <MDXProvider components={components}>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                    </section>
                </PostLayout>
            </Layout>
        </>
    )
}

export const query = graphql`
    query HandbookQuery($id: String!) {
        countries: allMdx(filter: { fields: { slug: { regex: "/^/team/" } } }) {
            group(field: frontmatter___country) {
                totalCount
            }
        }
        post: mdx(id: { eq: $id }) {
            id
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            contributors {
                url
                username
                avatar {
                    publicURL
                }
                teamData {
                    name
                    jobTitle
                }
            }
            frontmatter {
                title
                hideAnchor
                description
                hideLastUpdated
                github
                features {
                    eventCapture
                    userIdentification
                    autoCapture
                    sessionRecording
                    featureFlags
                    groupAnalytics
                }
                thumbnail {
                    childImageSharp {
                        gatsbyImageData(placeholder: NONE, width: 36)
                    }
                }
                installUrl
                featuredImage {
                    publicURL
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
