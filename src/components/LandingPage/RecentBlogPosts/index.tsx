import React from 'react'
import { PostCard } from '../../PostCard'
import { BlogPosts } from '../../Blog/BlogPosts'
import { PostType } from '../../PostCard/PostCard'
import { CallToAction } from '../../CallToAction'

export const RecentBlogPosts = () => {
    return (
        <div className="recent-blog-posts py-24">
            <div className="w-11/12 max-w-4xl mx-auto relative">
                <h2 className="text-white text-center text-3xl mb-0">News &amp; Blog</h2>
                <p className="text-white opacity-80 text-center mt-2 text-sm">Follow our journey as we grow</p>

                <div className="mt-12 flex flex-col lg:flex-row justify-between">
                    <div className="bg-purple-500 bg-opacity-10 p-6 w-full lg:w-2/3 lg:mr-2 rounded flex flex-col lg:flex-row justify-between items-stretch">
                        <div className="w-full ml-2 text-white">
                            <span className="block opacity-70">Latest post</span>

                            <BlogPosts
                                render={(posts) => {
                                    const postCard = (posts as { node: PostType }[])
                                        .slice(0, 1)
                                        .map((post) => <PostCard key={post.node.id} post={post.node} landingPage />)

                                    return <>{postCard}</>
                                }}
                            />
                        </div>
                    </div>

                    <div className="bg-purple-500 bg-opacity-10 p-6 w-full mt-2 lg:mt-0 lg:w-1/3 lg:ml-2 rounded text-white">
                        <span className="block opacity-70">Recent Posts</span>

                        <BlogPosts
                            render={(posts) => {
                                const postCard = (posts as { node: PostType }[])
                                    .slice(1, 4)
                                    .map((post) => <PostCard key={post.node.id} post={post.node} snippet />)

                                return <>{postCard}</>
                            }}
                        />
                    </div>
                </div>

                <div className="flex relative z-10">
                    <CallToAction type="button" className="mt-12 max-w-sm mx-auto" to="/blog" icon="book">
                        Visit Blog
                    </CallToAction>
                </div>
            </div>
        </div>
    )
}
