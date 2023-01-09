import Avatar from 'components/CommunityQuestions/Avatar'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import Toggle from 'components/Toggle'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import Layout from '../Layout'
import { SEO } from '../seo'
import slugify from 'slugify'
import { NewsletterForm } from 'components/NewsletterForm'
import { blog } from '../../sidebars/sidebars.json'
import { homeCategories } from './constants/categories'

export const Posts = ({ posts, title, action }) => {
    return (
        <section className="mb-12">
            {title && (
                <div className="pb-2 mb-5 border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark flex justify-between items-center">
                    <h4 className="m-0 text-2xl">{title}</h4>
                    <div>{action}</div>
                </div>
            )}
            <ul className="list-none m-0 p-0 grid md:grid-cols-2 gap-4">
                {posts.map((post) => {
                    const {
                        node: {
                            id,
                            frontmatter: { date, title, featuredImage, authors, category },
                            fields: { slug },
                        },
                    } = post

                    return (
                        <li className="relative rounded-md overflow-hidden" key={id}>
                            <Link className="text-white hover:text-white" to={slug}>
                                <GatsbyImage image={getImage(featuredImage)} />
                                <div className="bg-black/60 absolute inset-0 p-6 flex flex-col h-full w-full">
                                    {category && <p className="m-0 text-sm opacity-80">{category}</p>}
                                    <h5 className="text-2xl m-0">{title}</h5>
                                    <p className="m-0 text-base font-light mt-2">{date}</p>
                                    <ul className="list-none m-0 p-0 mt-auto grid gap-y-2">
                                        {authors?.slice(0, 2).map(({ name, image }) => {
                                            return (
                                                <li className="flex space-x-2 items-center" key={name}>
                                                    <Avatar image={image} />
                                                    <span>{name}</span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export const PostToggle = ({ onChange, checked }) => {
    return (
        <Toggle
            iconLeft={<span className="text-sm">Latest</span>}
            iconRight={<span className="text-sm">Popular</span>}
            onChange={onChange}
            checked={checked}
        />
    )
}

const Blog = ({
    data: {
        allPostsRecent: { edges: allPostsRecent },
        allPostsPopular: { edges: allPostsPopular },
        categories,
    },
}) => {
    const [allPostsFilter, setAllPostsFilter] = useState<'recent' | 'popular'>('recent')

    return (
        <Layout>
            <SEO title="Blog - PostHog" />

            <PostLayout article={false} title="Blog" menu={blog} hideSidebar hideSurvey>
                <h1 className="mb-6 mt-0">Blog</h1>
                <Posts
                    title={`Most ${allPostsFilter} articles`}
                    posts={allPostsFilter === 'popular' ? allPostsPopular : allPostsRecent}
                    action={<Link to="/blog/all">View all</Link>}
                />
                <NewsletterForm />
                {homeCategories.map((categoryToShow) => {
                    const categoryData = categories.group.find(({ category }) => category === categoryToShow)
                    if (!categoryData) return null
                    const { category, edges } = categoryData
                    const slug = slugify(category, { lower: true })
                    const url = `/blog/categories/${slug}`
                    return (
                        <Posts key={category} title={category} posts={edges} action={<Link to={url}>View all</Link>} />
                    )
                })}
            </PostLayout>
        </Layout>
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
            date(formatString: "MMM D, YYYY")
            title
            rootPage
            category
            featuredImage {
                publicURL
                childImageSharp {
                    gatsbyImageData(width: 480, height: 270)
                }
            }
            authors: authorData {
                handle
                name
                role
                link_type
                link_url
                image {
                    childImageSharp {
                        gatsbyImageData(width: 30, height: 30)
                    }
                }
            }
        }
    }
`
