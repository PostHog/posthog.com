import React from 'react'
import { Link } from 'gatsby'
import { CallToAction } from '../CallToAction'
import 'antd/lib/card/style/css'
import './style.scss'

interface PostType {
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

const FeaturedPost = ({ post }: { post: PostType }) => {
    return (
        <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center">
            <div className="w-full md:w-1/2 md:pr-8 py-4 mx-auto">
                <span className="text-gray-400 text-xs uppercase">Latest Post</span>
                <header className="text-4xl text-gray-900 dark:text-gray-100 font-gosha mt-1">
                    {post.frontmatter.title}
                </header>
                <div className="text-gray-500 dark:text-gray-300 mt-2 text-sm leading-relaxed font-inter">
                    {post.excerpt}
                </div>
                <ReadPost to={post.fields.slug} />
            </div>
            {post.frontmatter.featuredImage?.publicURL && (
                <div className="w-full md:ml-8 md:w-1/2 md:h-96 rounded overflow-hidden flex items-center justify-center">
                    <Link to={post.fields.slug} className="featured-post-img">
                        <img
                            className="w-full h-auto block rounded shadow-lg"
                            src={post.frontmatter.featuredImage.publicURL}
                        />
                    </Link>
                </div>
            )}
        </div>
    )
}

const PostCard = ({ post, featured = false }: { post: PostType; featured?: boolean }) => (
    <div>
        {featured ? (
            <FeaturedPost post={post} />
        ) : (
            <div className="flex flex-col mb-12">
                <h3 className="mb-0">
                    <Link
                        to={post.fields.slug}
                        className="font-bold font-gosha text-2xl text-gray-900 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-100 hover:underline"
                    >
                        {post.frontmatter.title}
                    </Link>
                </h3>
                <div className="mt-4 leading-relaxed text-sm font-inter">{post.excerpt}</div>
                <ReadPost to={post.fields.slug} />
            </div>
        )}
    </div>
)

export default PostCard
