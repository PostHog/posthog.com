import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import { NewsletterForm } from '../components/NewsletterForm'
import { SEO } from '../components/seo'
import { Structure } from '../components/Structure'
import { BlogSidebar } from '../components/Blog/BlogSidebar'
import { DarkModeToggle } from '../components/DarkModeToggle'

const BlogPage = ({
    data: {
        allMarkdownRemark: { edges },
        allMdx,
    },
}) => {
    // Standardize position of 'slug' across MDX and MD
    const parsedMdxData = allMdx.edges.map((edge) => ({
        ...edge,
        node: { ...edge.node, fields: { slug: `/${edge.node.slug}` } },
    }))

    const posts = [...edges, ...parsedMdxData] // Merge MDX and MD data into one array
        .filter((edge) => !!edge.node.frontmatter.date)
        .sort((a, b) => new Date(b.node.frontmatter.date) - new Date(a.node.frontmatter.date)) // Resort based on dates following merge

    const latestPost = <PostCard key={posts[0].node.id} post={posts[0].node} featured />
    const nonLatestPosts = posts.slice(1).map((edge) => <PostCard key={edge.node.id} post={edge.node} />)

    return (
        <div className="bg-offwhite-purple text-gray-900 dark:bg-darkmode-purple dark:text-white">
            <Layout headerBackgroundTransparent>
                <SEO title="PostHog Blog" description="What we are up to, every week." />

                <div className="bg-offwhite-purple text-gray-900 dark:bg-darkmode-purple dark:text-white">
                    <div className="w-11/12 mx-auto text-right">
                        <DarkModeToggle />
                    </div>

                    <Structure.Section width="5xl" className="my-0">
                        <Structure.SectionHeader title="Blog" titleTag="h1" titleClassName="text-center" />

                        {latestPost}
                        <NewsletterForm
                            compact
                            className="bg-offwhite-purple dark:bg-darkmode-purple text-gray-900 dark:text-white"
                        />

                        <div className="w-11/12 max-w-3xl mx-auto flex flex-col lg:flex-row justify-between items-start">
                            <div className="hidden lg:block lg:w-1/4 lg:pr-8">
                                <BlogSidebar />
                            </div>
                            <div className="w-full lg:w-3/4 lg:pl-8">
                                <header className="text-xs text-gray-400 uppercase">Recent Posts</header>
                                {nonLatestPosts}
                            </div>
                        </div>
                    </Structure.Section>
                </div>
            </Layout>
        </div>
    )
}

export default BlogPage

export const pageQuery = graphql`
    query {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { rootPage: { eq: "/blog" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    id
                    excerpt(pruneLength: 250)
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        rootPage
                        featuredImage {
                            publicURL
                        }
                    }
                }
            }
        }
        allMdx(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { rootPage: { eq: "/blog" } } }
        ) {
            edges {
                node {
                    slug
                    id
                    excerpt(pruneLength: 250)
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        rootPage
                        featuredImage {
                            publicURL
                        }
                    }
                }
            }
        }
    }
`
