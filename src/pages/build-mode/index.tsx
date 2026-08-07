import React from 'react'
import { graphql } from 'gatsby'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import FeaturedPost from 'components/BuildMode/FeaturedPost'
import Masthead from 'components/BuildMode/Masthead'
import PostsGallery from 'components/BuildMode/PostsGallery'
import RecentPosts from 'components/BuildMode/RecentPosts'
import { BuildModePost } from 'components/BuildMode/types'

/** How many posts hang on the pinboard below the featured one. */
const RECENT_COUNT = 8

export default function BuildModePage({ data }: { data: { posts: { nodes: BuildModePost[] } } }): JSX.Element {
    const posts = data.posts.nodes.filter((post) => post.frontmatter?.title)
    const [featured, ...rest] = posts
    const recent = rest.slice(0, RECENT_COUNT)

    return (
        <>
            <SEO
                title="build mode – PostHog"
                description="Tools, tactics, and taste for product builders. Advice on building great products, lessons (and mistakes) from building PostHog, and deep dives into the strategies of top startups."
            />
            <Editor slug="/build-mode" maxWidth="100%" hasPadding={false} disableFormatting>
                <div className="@container not-prose text-pretty text-primary">
                    <div className="mx-auto w-full max-w-6xl px-4 py-8 @xl:px-8">
                        <header className="flex flex-col gap-8 @3xl:flex-row @3xl:gap-12">
                            <Masthead />
                            {featured && <FeaturedPost post={featured} />}
                        </header>
                        <hr className="my-8 h-px border-none bg-red/40" />
                        <RecentPosts posts={recent} />
                        <hr className="my-8 h-px border-none bg-red/40" />
                        <PostsGallery posts={posts} />
                    </div>
                </div>
            </Editor>
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
