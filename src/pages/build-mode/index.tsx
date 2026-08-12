import React from 'react'
import { graphql } from 'gatsby'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import FeaturedPost from 'components/BuildMode/FeaturedPost'
import Hero, { HeroHeader } from 'components/BuildMode/Hero'
import PostsGallery from 'components/BuildMode/PostsGallery'
import { BuildModePost } from 'components/BuildMode/types'

export default function BuildModePage({ data }: { data: { posts: { nodes: BuildModePost[] } } }): JSX.Element {
    const posts = data.posts.nodes.filter((post) => post.frontmatter?.title)
    const featured = posts[0]

    return (
        <>
            <SEO
                title="build mode – PostHog"
                description="Tools, tactics, and taste for product builders. Advice on building great products, lessons (and mistakes) from building PostHog, and deep dives into the strategies of top startups."
            />
            <ReaderView hideLeftSidebar hideRightSidebar showQuestions={false} hideMobileTableOfContents>
                <div className="@container not-prose text-pretty text-primary">
                    <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 @xl:px-8">
                        <HeroHeader />
                        <Hero className="mt-4" placement="build-mode-header" />
                        {featured && (
                            <header className="mt-16">
                                <FeaturedPost post={featured} />
                            </header>
                        )}
                        <div className="mt-16">
                            <PostsGallery posts={posts} />
                        </div>
                        <hr className="my-16 h-px border-none bg-red/40" />
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
