import React from 'react'
import { Link } from 'gatsby'
import { PostCard } from '../../PostCard'
import { BlogPosts } from '../../Blog/BlogPosts'
import { PostType } from '../../PostCard/PostCard'
import { CallToAction } from '../../CallToAction'
import blogPostImg from './images/blog-post.png'

export const RecentBlogPosts = () => {
    return (
        <div className="recent-blog-posts py-24">
            <div className="w-11/12 max-w-4xl mx-auto">
                <h2 className="text-white text-center text-3xl mb-0">News &amp; Blog</h2>
                <p className="text-white opacity-80 text-center mt-2 text-sm">Follow our journey as we grow</p>

                <div className="mt-12 flex flex-col lg:flex-row justify-between">
                    <div className="bg-purple-500 bg-opacity-10 p-6 w-full lg:w-2/3 lg:mr-2 rounded flex flex-col lg:flex-row justify-between items-stretch">
                        <div className="w-full lg:w-1/3 mr-2 hidden">
                            <img src={blogPostImg} className="w-full mb-0" />
                        </div>

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
                        <span className="block opacity-70">Pinned articles</span>

                        <Link
                            to="/blog/posthog-announces-9-million-dollar-series-A"
                            className="block mt-3 text-white hover:text-white hover:underline"
                        >
                            PostHog Raises $12 Million in Funding Led by GV and Y Combinator
                            <span className="block mt-1 opacity-50 font-sm hidden">8 min read</span>
                        </Link>

                        <Link
                            to="/blog/hacktoberfest-2020"
                            className="block mt-4 text-white hover:text-white hover:underline"
                        >
                            PostHog Joins Hacktoberfest 2020
                            <span className="block mt-1 opacity-50 font-sm hidden">8 min read</span>
                        </Link>

                        <Link
                            to="/blog/open-source-telemetry-ethical"
                            className="block mt-4 text-white hover:text-white hover:underline"
                        >
                            Should open source projects track you?
                            <span className="block mt-1 opacity-50 font-sm hidden">8 min read</span>
                        </Link>

                        <Link
                            to="/blog/remote-culture"
                            className="block mt-4 text-white hover:text-white hover:underline"
                        >
                            Building an All-Remote Company from Scratch
                            <span className="block mt-1 opacity-50 font-sm hidden">8 min read</span>
                        </Link>
                    </div>
                </div>

                <div className="flex">
                    <CallToAction type="button" className="mt-12 mx-auto" to="/blog" icon="book">
                        Visit Blog
                    </CallToAction>
                </div>
            </div>
        </div>
    )
}
