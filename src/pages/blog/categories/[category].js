import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../../components/Layout'
import PostCard from '../../../components/PostCard'
import { NewsletterForm } from '../../../components/NewsletterForm'
import { SEO } from '../../../components/seo'
import { Structure } from '../../../components/Structure'
import { BlogCategoriesList } from '../../../components/Blog/BlogCategoriesList'
import { BlogCategories } from '../../../components/Blog/constants/categories'
import { DarkModeToggle } from '../../../components/DarkModeToggle'
import { findAuthor } from 'lib/utils'

const BlogCategoryPage = ({
    data: {
        allMarkdownRemark: { edges },
        allMdx,
        markdownRemark: {
            frontmatter: { authors },
        },
    },
    params: { category },
}) => {
    // Standardize position of 'slug' across MDX and MD
    const parsedMdxData = allMdx.edges.map((edge) => ({
        ...edge,
        node: { ...edge.node, fields: { slug: `/${edge.node.slug}` } },
    }))

    const posts = [...edges, ...parsedMdxData] // Merge MDX and MD data into one array
        .filter((edge) => {
            const categories = edge.node.frontmatter.categories || ''
            return !!edge.node.frontmatter.date && categories.indexOf(category) >= 0
        })
        .sort((a, b) => new Date(b.node.frontmatter.date) - new Date(a.node.frontmatter.date)) // Resort based on dates following merge

    const findAuth = findAuthor(authors)

    const latestPost = posts.length ? (
        <PostCard
            key={posts[0].node.id}
            post={posts[0].node}
            authorDetails={findAuth(posts[0].node.frontmatter.author)}
            featured
        />
    ) : null
    const nonLatestPosts = posts
        .slice(1)
        .map((edge) => (
            <PostCard key={edge.node.id} post={edge.node} authorDetails={findAuth(edge.node.frontmatter.author)} />
        ))

    const title = BlogCategories.find((k) => k.slug === category)?.title

    return (
        <div className="bg-offwhite-purple text-gray-900 dark:bg-darkmode-purple dark:text-white">
            <Layout onBlogPage headerBackgroundTransparent>
                <SEO title="PostHog Blog" description="What we are up to, every week." />

                <div className="bg-offwhite-purple text-gray-900 bg-gradient-to-b dark:from-darkmode-purple dark:to-footer dark:text-white">
                    <div className="w-11/12 mx-auto text-right">
                        <DarkModeToggle />
                    </div>

                    <Structure.Section width="5xl">
                        <Structure.SectionHeader title={`Blog: ${title}`} titleTag="h1" titleClassName="text-center" />
                        <BlogCategoriesList activeSlug={category} />
                        {latestPost}
                        <NewsletterForm
                            compact
                            className="bg-offwhite-purple dark:bg-darkmode-purple text-gray-900 dark:text-white"
                        />

                        <header className="text-xs text-gray-400 uppercase mb-8">Recent Posts</header>
                        <section className="grid grid-cols-3 gap-4">{nonLatestPosts}</section>
                    </Structure.Section>
                </div>
            </Layout>
        </div>
    )
}

export default BlogCategoryPage

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
                        categories
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
                        categories
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
