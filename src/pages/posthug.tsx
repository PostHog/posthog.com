import React, { useState } from 'react'
import AnimatedBurger from 'components/AnimatedBurger'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'

const PostHugPage = () => {
    const [active, setActive] = useState(false)
    return (
        <Layout>
            <SEO title="PostHug" description="Free hedgehugs." image={`/images/about.png`} />

            <div>
                <div className="max-w-2xl mx-auto py-8 px-4 md:px-8">
                    <h1 className="text-5xl text-center">
                        Were you looking for
                        <div className="text-center my-8">
                            <img src="/brand/posthog-logo.svg" className="dark:hidden w-full" />
                            <img src="/brand/posthog-logo-white.svg" className="hidden dark:block w-full" />
                        </div>
                    </h1>

                    <div className="my-16 space-y-2 text-balance text-center">
                        <p>Even engineers need hugs every now and again. 🥺</p>

                        <p>Seeing as how we can't literally give you a hug, here is the next best thing:</p>

                        <button>Get a Hug</button>

                        <p>🦔 ❤️ 🦔</p>

                        <AnimatedBurger onClick={() => setActive(!active)} active={active} className="" />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PostHugPage
