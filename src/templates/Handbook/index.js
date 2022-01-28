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
import { shortcodes } from '../../mdxGlobalComponents'
import '../../styles/handbook.scss'

const HandbookSidebar = ({ contributors, title, location }) => {
    return (
        <>
            {contributors && (
                <SidebarSection className="lg:block hidden" title={`Author${contributors?.length > 1 ? 's' : ''}`}>
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
    data: { post },
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
    const { title, hideAnchor, description, featuredImage, hideLastUpdated } = frontmatter
    const { parent, excerpt } = post
    const lastUpdated = parent?.fields?.gitLogLatestDate
    const filePath = `/${parent?.relativePath}`

    const styles = {
        bmOverlay: {
            background: 'transparent',
        },
    }
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
                    menu={menu}
                    sidebar={<HandbookSidebar contributors={contributors} title={title} location={location} />}
                    tableOfContents={tableOfContents}
                    contentWidth="100%"
                >
                    <section>
                        <div className="mb-8 relative">
                            <h1 className="dark:text-white text-3xl sm:text-5xl mt-0 mb-2">{title}</h1>
                            {!hideLastUpdated && (
                                <p className="mt-1 mb-0 !opacity-30 text-black dark:text-white font-semibold">
                                    Last updated: <time>{lastUpdated}</time>
                                </p>
                            )}
                        </div>
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
                featuredImage {
                    publicURL
                }
            }
            parent {
                ... on File {
                    relativePath
                    fields {
                        gitLogLatestDate(formatString: "MMM D, YYYY")
                    }
                }
            }
        }
    }
`
