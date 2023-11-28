import Avatar from 'components/CommunityQuestions/Avatar'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import Toggle from 'components/Toggle'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage, ImageDataLike, StaticImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import Layout from '../Layout'
import { SEO } from '../seo'
import slugify from 'slugify'
import { NewsletterForm } from 'components/NewsletterForm'
import { homeCategories } from './constants/categories'
import { capitalize } from 'instantsearch.js/es/lib/utils'
import CommunityCTA from 'components/CommunityCTA'
import { CallToAction } from 'components/CallToAction'

interface IPost {
    featuredImage?: ImageDataLike
    slug: string
    title: string
    category?: string
    date: string
    authors: {
        name: string
        image: ImageDataLike
    }[]
    imgClassName?: string
}

export const Post = ({ featuredImage, slug, title, category, date, authors, imgClassName }: IPost) => {
    const image = featuredImage && getImage(featuredImage)
    return (
        <div className="relative rounded-md overflow-hidden z-10 h-full w-full">
            <Link className="!text-white !hover:text-white cta" to={slug}>
                {image ? (
                    <GatsbyImage alt={title} className={imgClassName ?? 'w-full'} image={image} />
                ) : (
                    <StaticImage className={imgClassName ?? 'w-full'} alt={title} src="./images/default.jpg" />
                )}
                <div className="bg-gradient-to-b from-black/50 via-black/20  to-black/50 absolute inset-0 px-4 py-3 md:p-5 flex flex-col h-full w-full">
                    {category && <p className="m-0 text-sm opacity-80">{category}</p>}
                    <h3 className="m-0 leading-tight md:leading-7 [text-shadow:0_2px_10px_rgba(0,0,0,0.4)] line-clamp-3 !mt-0 text-xl md:text-2xl">
                        {title}
                    </h3>
                    <p className="m-0 !text-sm font-light mt-1">{date}</p>
                    <ul className="list-none m-0 p-0 mt-auto space-x-4 hidden md:flex">
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
        </div>
    )
}

export const Posts = ({ posts, title, action, titleBorder }) => {
    return (
        <section className="mb-6">
            {title && (
                <div
                    className={
                        titleBorder
                            ? 'pb-2 mb-5 flex justify-between items-center'
                            : 'pb-2 mb-2 flex justify-between items-center'
                    }
                >
                    <h4 className="text-lg m-0">{title}</h4>
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
                        <li
                            className="relative active:top-[1px] active:scale-[.99] shadow-lg after:rounded-md after:-inset-1.5 after:absolute"
                            key={id}
                        >
                            <Post
                                date={date}
                                title={title}
                                featuredImage={featuredImage}
                                authors={authors}
                                category={category}
                                slug={slug}
                            />
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

const CategoryPosts = ({ categoryToShow, categories }) => {
    const categoryData = categories.group.find(({ category }) => category === categoryToShow)
    if (!categoryData) return null
    const { category, edges } = categoryData
    const slug = slugify(category, { lower: true })
    const url = `/blog/categories/${slug}`
    return (
        <Posts
            key={category}
            title={category}
            posts={edges}
            action={
                <Link
                    className="-mr-2 px-2 py-1.5 rounded-sm hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark relative active:top-[1px] active:scale-[.99]"
                    to={url}
                >
                    View all
                </Link>
            }
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
    const [allPostsFilter, setAllPostsFilter] = useState<'latest' | 'popular'>('latest')
    return (
        <Layout>
            <SEO title="Blog - PostHog" />

            <PostLayout article={false} title="Blog" hideSidebar hideSurvey>
                <h1 className="mb-6 mt-0">Blog</h1>
                <Posts
                    titleBorder
                    title={`${capitalize(allPostsFilter)} articles`}
                    posts={allPostsFilter === 'popular' ? allPostsPopular : allPostsRecent}
                    action={
                        <Link
                            to="/blog/all"
                            className="-mr-2 px-2 py-1.5 rounded-sm hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark relative active:top-[1px] active:scale-[.99]"
                        >
                            View all
                        </Link>
                    }
                />
                <NewsletterForm />

                <div className="pb-2 mb-5 flex justify-between items-center">
                    <h4 className="opacity-50 text-base m-0">Browse by topic</h4>
                </div>

                {homeCategories.slice(0, 4).map((categoryToShow) => {
                    return (
                        <CategoryPosts key={categoryToShow} categories={categories} categoryToShow={categoryToShow} />
                    )
                })}
                <CommunityCTA />
                {homeCategories.slice(4).map((categoryToShow) => {
                    return (
                        <CategoryPosts key={categoryToShow} categories={categories} categoryToShow={categoryToShow} />
                    )
                })}
                <CallToAction width="full" type="secondary" to="/blog/all">
                    View all latest posts
                </CallToAction>
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
