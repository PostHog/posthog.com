import React from 'react'
import { graphql } from 'gatsby'
import { Logo } from '@posthog/brand/logo'
import FeaturedPost from 'components/PostsIndex/FeaturedPost'
import PostsGallery from 'components/PostsIndex/PostsGallery'
import { PostSummary } from 'components/PostsIndex/types'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'

const TAG_ORDER_OVERRIDE = ['Comparisons', 'Alternatives', 'Roundups']

/** The PostHog logomark (light/dark pair) with "Compare" beside it. */
function CompareWordmark(): JSX.Element {
    return (
        <div className="flex items-center gap-3">
            <Logo layout="logomark" className="h-8 w-[59px] dark:hidden" width="auto" title="PostHog" />
            <Logo
                layout="logomark"
                variant="mono"
                color="white"
                className="hidden h-8 w-[59px] dark:block"
                width="auto"
                title="PostHog"
            />
            <span className="text-3xl font-bold leading-none">Compare</span>
        </div>
    )
}

function CompareHeader(): JSX.Element {
    return (
        <div className="flex flex-row items-center justify-between gap-4 py-2 flex-wrap">
            <CompareWordmark />
        </div>
    )
}

export default function ComparePage({ data }: { data: { posts: { nodes: PostSummary[] } } }): JSX.Element {
    const posts = data.posts.nodes.filter((post) => post.frontmatter?.title)
    const featured = posts[0]

    return (
        <>
            <SEO
                title="Compare - PostHog"
                description="Head-to-head comparisons, alternatives, and best-of roundups. See how PostHog stacks up against other product and analytics tools."
            />
            <ReaderView
                hideLeftSidebar
                hideRightSidebar
                showQuestions={false}
                hideMobileTableOfContents
                hideMarkdownActions
            >
                <div className="@container not-prose text-pretty text-primary">
                    <CompareHeader />
                    <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 @2xl:pb-20 @xl:px-8">
                        <div className="mt-2 @lg:mt-10 flex @2xl:flex-row flex-col items-center gap-8 @2xl:gap-16">
                            {featured && (
                                <header className="mt-12 @2xl:mt-0">
                                    <FeaturedPost calloutPosition="right" post={featured} accent="purple" />
                                </header>
                            )}
                        </div>
                        <div className="mt-8 @2xl:mt-16">
                            <PostsGallery
                                posts={posts.slice(1)}
                                accent="purple"
                                tagOrderOverride={TAG_ORDER_OVERRIDE}
                            />
                        </div>
                        <hr className="my-10 h-px border-none bg-purple/40 @2xl:my-16" />
                        <CompareHeader />
                    </div>
                </div>
            </ReaderView>
        </>
    )
}

export const query = graphql`
    {
        posts: allMdx(
            filter: {
                isFuture: { eq: false }
                fields: { slug: { regex: "/^/compare/" } }
                frontmatter: { date: { ne: null } }
            }
            sort: { order: DESC, fields: [frontmatter___date] }
        ) {
            nodes {
                id
                fields {
                    slug
                    pageViews
                    wordCount
                }
                excerpt(pruneLength: 200)
                frontmatter {
                    title
                    shortDate: date(formatString: "MMM D")
                    fullDate: date(formatString: "MMM D, YYYY")
                    tags
                    seo {
                        metaDescription
                    }
                    featuredImage {
                        publicURL
                        childImageSharp {
                            gatsbyImageData(width: 800)
                        }
                    }
                    authors: authorData {
                        name
                    }
                }
            }
        }
    }
`
