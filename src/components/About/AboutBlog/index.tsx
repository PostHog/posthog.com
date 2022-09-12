import React from 'react'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'

export const AboutBlog = () => {
    return (
        <section id="blog" className="max-w-5xl mx-auto bg-black lg:grid lg:grid-cols-5 text-white p-8 lg:p-12 gap-8">
            <div className="col-span-3">
                <h3 className="mb-2 text-5xl leading-tight">Still can't get enough PostHog?</h3>
                <h4 className="text-2xl mb-4">
                    Check out our blog. <span className="text-yellow">(We put a lot of work into it.)</span>
                </h4>
                <CallToAction to="/blog" type="secondary">
                    Visit blog
                </CallToAction>
            </div>
            <div className="col-span-2">
                <Link to="/blog/post">
                    <figure className="mb-2">
                        <div className="aspect-video border border-solid border-gray-aceent-dark flex items-center justify-center">
                            image here
                        </div>
                    </figure>
                    <h4 className="text-white">Latest blog post title name</h4>
                </Link>
            </div>
        </section>
    )
}
