import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import { NewsletterForm } from '../components/NewsletterForm'
import { SEO } from '../components/seo'
import { Structure } from '../components/Structure'
import { BlogCategoriesList } from '../components/Blog/BlogCategoriesList'
import { DarkModeToggle } from '../components/DarkModeToggle'
import { findAuthor } from 'lib/utils'

const BlogPage = ({
    data: {
        allMarkdownRemark: { edges },
        allMdx,
        markdownRemark: {
            frontmatter: { authors },
        },
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

    const findAuth = findAuthor(authors)

    const latestPost = (
        <PostCard
            key={posts[0].node.id}
            post={posts[0].node}
            featured
            authorDetails={findAuth(posts[0].node.frontmatter.author)}
        />
    )
    const nonLatestPosts = posts
        .slice(1)
        .map((edge) => (
            <PostCard authorDetails={findAuth(edge.node.frontmatter.author)} key={edge.node.id} post={edge.node} />
        ))

    return (
        <div className="bg-offwhite-purple text-gray-900 dark:bg-darkmode-purple dark:text-white">
            <Layout onBlogPage>
                <SEO title="PostHog Blog" description="What we are up to, every week." />

                <div className="bg-offwhite-purple text-gray-900 bg-gradient-to-b dark:from-darkmode-purple dark:to-footer dark:text-white">
                    <div className="w-11/12 mx-auto text-right">
                        <DarkModeToggle />
                    </div>

                    <Structure.Section width="5xl" className="my-0">
                        <Structure.SectionHeader title="Blog" titleTag="h1" titleClassName="text-center" />
                    </Structure.Section>
                    <BlogCategoriesList />
                    <Structure.Section width="5xl" className="my-0">
                        {latestPost}
                        <NewsletterForm
                            compact
                            className="bg-offwhite-purple dark:bg-darkmode-purple text-gray-900 dark:text-white"
                        />
                        <header className="text-xs text-gray-400 text-center uppercase mb-8">Recent Posts</header>
                        <section className="grid md:grid-cols-3 gap-4">{nonLatestPosts}</section>
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
                            childImageSharp {
                                gatsbyImageData(width: 1200, height: 630)
                            }
                        }
                        author
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
                            childImageSharp {
                                gatsbyImageData(width: 1200, height: 630)
                            }
                        }
                    }
                }
            }
        }
        markdownRemark(fields: { slug: { eq: "/authors" } }) {
            frontmatter {
                authors {
                    handle
                    name
                    role
                    image
                    link_type
                    link_url
                }
            }
            id
        }
    }
`
