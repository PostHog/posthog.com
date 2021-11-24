import Breadcrumbs from 'components/Breadcrumbs'
import { graphql } from 'gatsby'
import { findAuthor } from 'lib/utils'
import React from 'react'
import Layout from '../Layout'
import { NewsletterForm } from '../NewsletterForm'
import PostCard from '../PostCard'
import { SEO } from '../seo'
import { Structure } from '../Structure'
import { BlogCategoriesList } from './BlogCategoriesList'

const Blog = ({
    data: {
        allMdx: { edges },
        markdownRemark: {
            frontmatter: { authors },
        },
    },
    pageContext,
}) => {
    const posts = edges.filter((edge) => !!edge.node.frontmatter.date)
    const title = pageContext?.title || 'Blog'
    const crumbs = pageContext?.crumbs || [{ title: 'Blog' }]
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
                    <div className="px-4 mt-4 mb-9">
                        <Breadcrumbs crumbs={crumbs} darkModeToggle />
                    </div>

                    <Structure.Section width="5xl" className="my-0">
                        <Structure.SectionHeader title={title} titleTag="h1" titleClassName="text-center" />
                    </Structure.Section>
                    <BlogCategoriesList activeSlug={pageContext?.slug} />
                    <Structure.Section width="5xl" className="my-0">
                        {latestPost}
                        <NewsletterForm
                            compact
                            className="bg-offwhite-purple dark:bg-darkmode-purple text-gray-900 dark:text-white"
                        />
                        <header className="text-xs text-gray-400 text-center uppercase mb-8">Recent Posts</header>
                        <section className="grid md:grid-cols-3 md:gap-4 lg:gap-8">{nonLatestPosts}</section>
                    </Structure.Section>
                </div>
            </Layout>
        </div>
    )
}

export default Blog

export const BlogFragment = graphql`
    fragment BlogFragment on Mdx {
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
`
