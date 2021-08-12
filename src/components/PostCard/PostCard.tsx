import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { CallToAction } from '../CallToAction'
import 'antd/lib/card/style/css'
import './style.scss'
import { AuthorsData } from 'types'
import AuthorIndexView from 'components/Blog/BlogAuthor/AuthorIndexView'

export interface PostType {
    id: string
    excerpt: string
    fields: {
        slug: string
    }
    frontmatter: {
        date: string
        title: string
        featuredImage: {
            publicURL: string | null
        } | null
    }
}

type PostTypeWithImage = PostType & {
    frontmatter: PostType['frontmatter'] & {
        featuredImage: {
            publicURL: string
        }
    }
}

const ReadPost = ({ to }: { to: string }) => {
    return (
        <CallToAction
            type="button"
            icon="read-dark"
            iconBg="bg-gray-500 dark:bg-gray-400"
            to={to}
            width="full"
            className="mt-8 border-gray-800 text-gray-600 dark:border-gray-400 dark:text-gray-200 hover:border-gray-900 dark:hover:text-gray-100 hover:text-gray-900"
        >
            Read Post
        </CallToAction>
    )
}

const ReadPostHome = ({ to }: { to: string }) => {
    return (
        <CallToAction type="button" icon="book" iconBg="bg-white relative" to={to} width="full" className="">
            Read Post
        </CallToAction>
    )
}

const FeaturedPost = ({ post, authorDetails }: { post: PostTypeWithImage; authorDetails?: AuthorsData }) => {
    return (
        <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center">
            <div className="w-full md:w-1/2 md:pr-8 py-4 mx-auto">
                <span className="text-gray-400 text-xs uppercase">Latest Post</span>
                <h2 className="text-4xl text-gray-900 dark:text-gray-100 font-sans normal-case my-1">
                    <Link
                        to={post.fields.slug}
                        className="text-gray-900 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-100 hover:underline"
                    >
                        {post.frontmatter.title}
                    </Link>
                </h2>
                <AuthorIndexView authorDetails={authorDetails} />
            </div>
            <div className="w-full md:ml-8 md:w-1/2 md:h-96 rounded overflow-hidden flex items-center justify-center">
                <Link to={post.fields.slug} className="featured-post-img">
                    <img
                        className="w-full h-auto block rounded shadow-lg"
                        src={post.frontmatter.featuredImage.publicURL}
                    />
                </Link>
            </div>
        </div>
    )
}

const LandingPageLatestPost = ({ post, authorDetails }: { post: PostTypeWithImage; authorDetails?: AuthorsData }) => {
    return (
        <div className="w-full flex flex-col justify-between items-center">
            <div className="w-full rounded overflow-hidden flex items-center justify-center pt-4">
                <Link to={post.fields.slug} className="featured-post-img">
                    <img
                        className="w-full h-auto block rounded shadow-lg mb-0"
                        src={post.frontmatter.featuredImage.publicURL}
                    />
                </Link>
            </div>
            <div className="w-full py-4">
                <h2 className="text-2xl text-white font-sans normal-case my-1">
                    <Link to={post.fields.slug} className="text-white hover:text-white hover:underline">
                        {post.frontmatter.title}
                    </Link>
                </h2>
                <AuthorIndexView authorDetails={authorDetails} />
                <div className="text-white text-opacity-75 mt-2 text-sm leading-relaxed post-preview-fade">
                    {post.excerpt}
                </div>
                <ReadPostHome to={post.fields.slug} />
            </div>
        </div>
    )
}

const LandingPageSnippet = ({ post, authorDetails }: { post: PostTypeWithImage; authorDetails?: AuthorsData }) => {
    return (
        <div className="w-full flex flex-col justify-between items-center">
            <div className="w-full rounded overflow-hidden flex items-center justify-center pt-4">
                <Link to={post.fields.slug} className="featured-post-img">
                    <img
                        className="w-full h-auto block rounded shadow-lg mb-0"
                        src={post.frontmatter.featuredImage.publicURL}
                    />
                </Link>
            </div>
            <div className="w-full py-2">
                <h2 className="text-lg text-white font-sans normal-case my-1 leading-tight">
                    <Link to={post.fields.slug} className="text-white hover:text-white hover:underline">
                        {post.frontmatter.title}
                    </Link>
                </h2>
                <AuthorIndexView authorDetails={authorDetails} />
            </div>
        </div>
    )
}

const addDefaultImage = (post: PostType, defaultImage: string): PostTypeWithImage => ({
    ...(post || {}),
    frontmatter: {
        ...(post.frontmatter || {}),
        featuredImage: {
            ...(post.frontmatter.featuredImage || {}),
            publicURL: post.frontmatter.featuredImage?.publicURL || defaultImage,
        },
    },
})

const PostCard = ({
    post: sourcePost,
    featured = false,
    landingPage = false,
    snippet = false,
    authorDetails,
}: {
    post: PostType
    featured?: boolean
    landingPage?: boolean
    snippet?: boolean
    authorDetails?: AuthorsData
}): JSX.Element => {
    const { site } = useStaticQuery(query)
    const { defaultImage } = site.siteMetadata
    console.log({ sourcePost })
    const post = addDefaultImage(sourcePost, defaultImage)

    return (
        <div>
            {featured ? (
                <FeaturedPost post={post} authorDetails={authorDetails} />
            ) : landingPage ? (
                <LandingPageLatestPost post={post} authorDetails={authorDetails} />
            ) : snippet ? (
                <LandingPageSnippet post={post} authorDetails={authorDetails} />
            ) : (
                <div className="flex flex-col mb-12">
                    <h3 className="mb-0">
                        <Link
                            to={post.fields.slug}
                            className="font-bold font-sans normal-case text-2xl text-gray-900 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-100 hover:underline"
                        >
                            <div className="w-full rounded mb-3 overflow-hidden flex items-center justify-center">
                                <Link to={post.fields.slug} className="featured-post-img">
                                    <img
                                        className="w-full h-auto block rounded shadow-lg"
                                        src={post.frontmatter.featuredImage.publicURL || defaultImage}
                                    />
                                </Link>
                            </div>
                            {post.frontmatter.title}
                        </Link>
                    </h3>
                    <AuthorIndexView authorDetails={authorDetails} />
                </div>
            )}
        </div>
    )
}

const query = graphql`
    query DefaultMetaImage {
        site {
            siteMetadata {
                defaultImage: image
            }
        }
    }
`

export default PostCard
