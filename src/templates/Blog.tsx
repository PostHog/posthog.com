import PostLayout from 'components/PostLayout'
import { graphql } from 'gatsby'
import React from 'react'
import { SEO } from 'components/seo'
import Layout from 'components/Layout'
import { Posts } from 'components/Blog'
import Pagination from 'components/Pagination'
import { NewsletterForm } from 'components/NewsletterForm'
import CommunityCTA from 'components/CommunityCTA'
import { companyMenu } from '../navs'

const BlogCategory = ({
    data: {
        allPostsRecent: { edges: allPostsRecent },
    },
    pageContext: { numPages, currentPage, base },
}) => {
    return (
        <Layout parent={companyMenu} activeInternalMenu={companyMenu.children[5]}>
            <SEO title={`All posts - PostHog`} />

            <PostLayout
                breadcrumb={[{ name: 'Blog', url: '/blog' }, { name: 'All' }]}
                article={false}
                title="Blog"
                hideSidebar
                hideSurvey
            >
                <Posts
                    title="All posts"
                    action={
                        <p className="m-0 leading-none font-semibold text-sm opacity-50">
                            Page {currentPage} of {numPages}
                        </p>
                    }
                    posts={allPostsRecent.slice(0, 4)}
                />
                <NewsletterForm />
                <Posts posts={allPostsRecent.slice(4, 12)} />
                {allPostsRecent.length > 12 && (
                    <>
                        <CommunityCTA />
                        <Posts posts={allPostsRecent.slice(12)} />
                    </>
                )}
                <Pagination currentPage={currentPage} numPages={numPages} base={base} />
            </PostLayout>
        </Layout>
    )
}

export default BlogCategory

export const pageQuery = graphql`
    query ($skip: Int!, $limit: Int!) {
        allPostsRecent: allMdx(
            limit: $limit
            skip: $skip
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: {
                isFuture: { ne: true }
                frontmatter: { date: { ne: null } }
                fields: { slug: { regex: "/^/blog/" } }
            }
        ) {
            edges {
                node {
                    ...BlogFragment
                }
            }
        }
    }
`
