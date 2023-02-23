import React, { useEffect } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { useLocation } from '@reach/router'
import { Blockquote } from 'components/BlockQuote'
import { MdxCodeBlock } from 'components/CodeBlock'
import { Heading } from 'components/Heading'
import { InlineCode } from 'components/InlineCode'
import Layout from 'components/Layout'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import { SEO } from 'components/seo'
import Team from 'components/Team'
import { ZoomImage } from 'components/ZoomImage'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { animateScroll as scroll } from 'react-scroll'
import { shortcodes } from '../mdxGlobalComponents'
import { GitHub } from 'components/Icons/Icons'
import { getCookie } from 'lib/utils'
import { CallToAction } from 'components/CallToAction'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import CommunityQuestions from 'components/CommunityQuestions'
import { formatNode } from 'components/GlossaryElement'
import { HandbookSidebar } from './Handbook'

export default function GettingStarted({
    data: { post, glossary },
    pageContext: { menu, breadcrumb = [], breadcrumbBase, tableOfContents, searchFilter },
    location,
}) {
    const { hash } = useLocation()
    const {
        body,
        frontmatter,
        fields: { slug, contributors, appConfig },
    } = post
    const { title, hideAnchor, description, hideLastUpdated, github, availability, installUrl, thumbnail, related } =
        frontmatter
    const { parent, excerpt } = post
    const lastUpdated = parent?.fields?.gitLogLatestDate
    const showToc = !hideAnchor && tableOfContents?.length > 0
    const filePath = post?.parent?.relativePath

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
        ...shortcodes,
    }

    useEffect(() => {
        if (hash) {
            scroll.scrollMore(-50)
        }
    }, [])

    console.log('test')

    return (
        <>
            <SEO
                title={`${title} - ${breadcrumbBase.name} - PostHog`}
                description={description || excerpt}
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
                    contentWidth="100%"
                    breadcrumb={[breadcrumbBase, ...(breadcrumb?.slice(0, breadcrumb.length - 1) || [])]}
                    hideSidebar={hideAnchor}
                >
                    <section>
                        <div className="mb-8 relative">
                            <div className="flex items-center mt-0 flex-wrap justify-between">
                                <div className="flex items-center space-x-2 mb-1">
                                    <h1 className="dark:text-white text-3xl sm:text-5xl m-0">{title}</h1>
                                </div>
                                <div className="flex items-center space-x-2"></div>
                            </div>
                        </div>
                        <div className="article-content"></div>
                    </section>

                    <section>
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center space-x-2">
                                {frontmatter?.next?.childMdx && <div>{frontmatter.next?.childMdx?.title}</div>}
                            </div>
                        </div>
                    </section>
                </PostLayout>
            </Layout>
        </>
    )
}

export const query = graphql`
    query GettingStartedQuery($id: String!, $links: [String!]!) {
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
        post: mdx(id: { eq: $id }) {
            id
            body
            fields {
                slug
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
                hideAnchor
                description
                hideLastUpdated
                github
                thumbnail {
                    childImageSharp {
                        gatsbyImageData(placeholder: NONE, width: 36)
                    }
                }
                featuredImage {
                    publicURL
                }
                next {
                    childMdx {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                        }
                    }
                }
            }
        }
    }
`
