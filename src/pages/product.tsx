import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import Hero from 'components/Product/Hero'
import React from 'react'

export default function Product() {
    return (
        <Layout>
            <Hero />
            <PostLayout
                title="Product"
                hideSidebar
                hideSearch
                hideSurvey
                menu={[{ name: 'Overview', url: '/product' }]}
                menuTitle={false}
                article={false}
            >
                <h1 className="text-5xl m-0">Top features</h1>
                <p className="text-xl text-black/75 font-semibold m-0 mt-3 max-w-[700px]">
                    Product analytics was the trojan horse, but PostHog also ships with session recording, feature
                    flags, A/B testing, and more.
                </p>
            </PostLayout>
        </Layout>
    )
}
