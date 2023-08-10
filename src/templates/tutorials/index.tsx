import PostLayout from 'components/PostLayout'
import { graphql } from 'gatsby'
import React from 'react'
import { SEO } from 'components/seo'
import Layout from 'components/Layout'
import { Posts } from 'components/Blog'
import Pagination from 'components/Pagination'
import { NewsletterForm } from 'components/NewsletterForm'
import { communityMenu } from '../../navs'

const Tutorials = ({
    data: {
        allPostsRecent: { edges: allPostsRecent },
    },
    pageContext: { numPages, currentPage, base },
}) => {
    return (
        <Layout parent={communityMenu} activeInternalMenu={communityMenu.children[2]}>
            <SEO title={`All tutorials - PostHog`} />

            <PostLayout
                breadcrumb={[{ name: 'Tutorials', url: '/tutorials' }, { name: 'All' }]}
                article={false}
                title="Tutorials"
                hideSidebar
                hideSurvey
            >
                <Posts
                    title="All tutorials"
                    action={
                        <p className="m-0 leading-none font-semibold">
                            Page {currentPage} of {numPages}
                        </p>
                    }
                    posts={allPostsRecent.slice(0, 4)}
                />
                <NewsletterForm />
                <Posts posts={allPostsRecent.slice(4)} />
                <Pagination currentPage={currentPage} numPages={numPages} base={base} />
            </PostLayout>
        </Layout>
    )
}

export default Tutorials

export const pageQuery = graphql`
    query ($skip: Int!, $limit: Int!) {
        allPostsRecent: allMdx(
            limit: $limit
            skip: $skip
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { isFuture: { ne: true }, fields: { slug: { regex: "/^/tutorials/" } } }
        ) {
            edges {
                node {
                    ...BlogFragment
                }
            }
        }
    }
`
