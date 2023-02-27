import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import { graphql } from 'gatsby'
import React, { useState } from 'react'
import Layout from '../Layout'
import { SEO } from '../seo'
import slugify from 'slugify'
import { NewsletterForm } from 'components/NewsletterForm'
import docs from 'sidebars/docs.json'
import { capitalize } from 'instantsearch.js/es/lib/utils'
import { Posts } from 'components/Blog'

const Tutorials = ({
    data: {
        allPostsRecent: { edges: allPostsRecent },
        categories,
    },
}) => {
    const [allPostsFilter, setAllPostsFilter] = useState<'recent' | 'popular'>('recent')

    return (
        <Layout>
            <SEO title="Tutorials - PostHog" />

            <PostLayout article={false} title="Tutorials" menu={docs} hideSidebar hideSurvey>
                <h1 className="mb-6 mt-0">Tutorials</h1>
                <Posts
                    title={`Most ${allPostsFilter} tutorials`}
                    posts={allPostsRecent}
                    action={<Link to="/tutorials/all">View all</Link>}
                />
                <NewsletterForm />
                {categories.group.map(({ category, edges }) => {
                    const slug = slugify(category, { lower: true })
                    const url = `/tutorials/categories/${slug}`
                    return (
                        <Posts
                            key={category}
                            title={capitalize(category)}
                            posts={edges}
                            action={<Link to={url}>View all</Link>}
                        />
                    )
                })}
            </PostLayout>
        </Layout>
    )
}

export default Tutorials

export const tutorialsFragment = graphql`
    fragment TutorialsFragment on Mdx {
        id
        fields {
            slug
        }
        featuredImageImgix
        frontmatter {
            title
            date(formatString: "MMM 'YY")
            Category: tags
            Contributor: authorData {
                id
                image {
                    childImageSharp {
                        gatsbyImageData(width: 36, height: 36)
                    }
                }
                name
            }
        }
    }
`
