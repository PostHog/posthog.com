import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'

const PostHugPage = () => {
    return (
        <Layout>
            <SEO title="PostHug" description="Free hedgehugs." image={`/images/about.png`} />

            <div>
                <div className="max-w-2xl mx-auto py-8 px-4 md:px-8">
                    <h1 className="text-5xl text-center">
                        Were you looking for
                        <div className="text-center my-8">
                            <img src="/brand/posthog-logo.svg" className="w-full" />
                        </div>
                    </h1>

                    <p className="m-2 text-center text-balance">Even engineers need hugs every now and again.</p>

                    <p className="m-2 text-center text-balance">
                        Seeing as how we can't literally give you a hug, here is the next best thing:
                    </p>

                    <button>Get a Hug</button>

                    <p>🦔 ❤️ 🦔</p>
                </div>
            </div>
        </Layout>
    )
}

export default PostHugPage
