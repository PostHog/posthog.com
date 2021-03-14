import React from 'react'
import { Link } from 'gatsby'

import { CallToAction } from '../../CallToAction'
import blogPostImg from './images/blog-post.png'

export const RecentBlogPosts = () => {
    return (
        <div className="recent-blog-posts py-24">
            <div className="w-11/12 max-w-4xl mx-auto">
                <h4 className="text-white text-center text-3xl mb-0">News &amp; Blog</h4>
                <p className="text-white opacity-80 text-center mt-2 text-sm">Follow our journey as we grow</p>

                <div className="mt-12 flex flex-col lg:flex-row justify-between">
                    <div className="bg-purple-500 bg-opacity-10 p-6 w-full lg:w-2/3 lg:mr-2 rounded flex flex-col lg:flex-row justify-between items-stretch">
                        <div className="w-full lg:w-1/3 mr-2">
                            <img src={blogPostImg} className="w-full mb-0" />
                        </div>

                        <div className="w-full lg:w-2/3 ml-2 text-white">
                            <span className="block opacity-70">Latest post</span>

                            <h5 className="mt-3 text-white">A story about pivots</h5>

                            <p className="mt-4 opacity-70 text-sm">PostHog has pivoted a lot.</p>

                            <p className="mt-1 opacity-70 text-sm">
                                After 5 pivots in 6 months, we got into YCombinator last year, pivoted again whilst we
                                were there and have now gone from the first commit to thousands of deployments, a team
                                across 10 countries and $12M raised, in well under a year. We've a long way to go, but
                                we're delighted at how it has gone so far.
                            </p>

                            <p className="mt-1 opacity-70 text-sm">This is that story and what we learned from it.</p>

                            <CallToAction
                                type="secondary"
                                className="mx-0 mt-4"
                                to="/blog/story-about-pivots"
                                icon="book"
                                width="full"
                            >
                                Continue reading
                            </CallToAction>
                        </div>
                    </div>

                    <div className="bg-purple-500 bg-opacity-10 p-6 w-full mt-2 lg:mt-0 lg:w-1/3 lg:ml-2 rounded text-white">
                        <span className="block opacity-70">Popular articles</span>

                        <Link
                            to="/blog/posthog-announces-9-million-dollar-series-A"
                            className="block mt-3 text-white hover:text-white hover:underline"
                        >
                            PostHog Raises $12 Million in Funding Led by GV and Y Combinator
                            <span className="block mt-1 opacity-50 font-sm">8 min read</span>
                        </Link>

                        <Link
                            to="/blog/hacktoberfest-2020"
                            className="block mt-4 text-white hover:text-white hover:underline"
                        >
                            PostHog Joins Hacktoberfest 2020
                            <span className="block mt-1 opacity-50 font-sm">8 min read</span>
                        </Link>

                        <Link
                            to="/blog/open-source-telemetry-ethical"
                            className="block mt-4 text-white hover:text-white hover:underline"
                        >
                            Should open source projects track you?
                            <span className="block mt-1 opacity-50 font-sm">8 min read</span>
                        </Link>

                        <Link
                            to="/blog/remote-culture"
                            className="block mt-4 text-white hover:text-white hover:underline"
                        >
                            Building an All-Remote Company from Scratch
                            <span className="block mt-1 opacity-50 font-sm">8 min read</span>
                        </Link>
                    </div>
                </div>

                <div className="flex">
                    <CallToAction type="secondary" className="mt-12 mx-auto" to="/blog" icon="book">
                        Visit Blog
                    </CallToAction>
                </div>
            </div>
        </div>
    )
}
