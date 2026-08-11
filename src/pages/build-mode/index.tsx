import React from 'react'
import { graphql } from 'gatsby'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import FeaturedPost from 'components/BuildMode/FeaturedPost'
import Hero, { HeroHeader } from 'components/BuildMode/Hero'
import PostsGallery from 'components/BuildMode/PostsGallery'
import RecentPosts from 'components/BuildMode/RecentPosts'
import { BuildModePost } from 'components/BuildMode/types'

/** How many posts hang on the pinboard below the featured one. */
const PINNED_COUNT = 8

export default function BuildModePage({ data }: { data: { posts: { nodes: BuildModePost[] } } }): JSX.Element {
    const posts = data.posts.nodes.filter((post) => post.frontmatter?.title)
    const [featured, ...rest] = posts
    // Most-viewed posts (fields.pageViews — sourced from PostHog at build time).
    // Builds without POSTHOG_APP_API_KEY see all zeros, and the stable sort
    // preserves the query's date order — a recency fallback for free.
    const pinned = [...rest]
        .sort((a, b) => (b.fields.pageViews ?? 0) - (a.fields.pageViews ?? 0))
        .slice(0, PINNED_COUNT)

    return (
        <>
            <SEO
                title="build mode – PostHog"
                description="Tools, tactics, and taste for product builders. Advice on building great products, lessons (and mistakes) from building PostHog, and deep dives into the strategies of top startups."
            />
            <ReaderView hideLeftSidebar hideRightSidebar showQuestions={false} hideMobileTableOfContents>
                <div className="@container not-prose text-pretty text-primary">
                    <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 @xl:px-8">
                        <HeroHeader placement="build-mode-header" />
                        <Hero className="mt-16" />
                        {featured && (
                            <header className="mt-24">
                                <FeaturedPost post={featured} />
                            </header>
                        )}
                        <hr className="my-8 h-px border-none bg-red/40" />
                        <RecentPosts posts={pinned} />
                        <hr className="my-8 h-px border-none bg-red/40" />
                        <PostsGallery posts={posts} />
                        <hr className="my-8 h-px border-none bg-red/40" />
                        <HeroHeader placement="build-mode-footer" />
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
                fields: { slug: { regex: "/^/newsletter/" } }
                frontmatter: { date: { ne: null } }
            }
            sort: { order: DESC, fields: [frontmatter___date] }
        ) {
            nodes {
                id
                fields {
                    slug
                    pageViews
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
