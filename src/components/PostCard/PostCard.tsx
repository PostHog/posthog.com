import React from 'react'
import { Link } from 'gatsby'
import Card from 'antd/lib/card'
import { CallToAction } from '../CallToAction'
import dummyPostImg from '../LandingPage/RecentBlogPosts/images/blog-post.png'
import 'antd/lib/card/style/css'

interface PostType {
    id: string
    excerpt: string
    fields: {
        slug: string
    }
    frontmatter: {
        date: string
        title: string
    }
}

const FeaturedPost = ({ post }: { post: PostType }) => {
    return (
        <div className="w-full flex flex-col md:flex-row justify-between items-start">
            <div className="w-full md:w-1/2 md:pr-4 py-24">
                <span className="text-gray-400 text-xs uppercase">Latest Post</span>
                <header className="text-2xl text-gray-900 font-gosha mt-1">{post.frontmatter.title}</header>
                <div className="text-gray-500 mt-2">{post.excerpt}</div>
                <CallToAction
                    type="secondary"
                    icon="book"
                    to={post.fields.slug}
                    width="full"
                    className="mt-8 border-gray-800 text-gray-600 hover:border-gray-900 hover:text-gray-900"
                >
                    Read Post
                </CallToAction>
            </div>
            <div className="w-full md:w-1/2 md:pl-4 rounded-lg overflow-hidden">
                <img className="min-w-full min-h-full" src={dummyPostImg} />
            </div>
        </div>
    )
}

const PostCard = ({ post, featured = false }: { post: PostType; featured?: boolean }) => (
    <div>
        {featured ? (
            <FeaturedPost post={post} />
        ) : (
            <Card
                title={
                    <div>
                        <Link to={post.fields.slug} style={{ color: 'black', fontWeight: 'bold' }}>
                            {post.frontmatter.title}
                        </Link>
                        <span
                            style={{
                                float: 'right',
                                color: 'grey',
                            }}
                        >
                            {post.frontmatter.date}
                        </span>
                    </div>
                }
            >
                {post.excerpt}
            </Card>
        )}

        <br />
    </div>
)

export default PostCard
