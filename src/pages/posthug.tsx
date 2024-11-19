import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'

const PostHugPage = () => {
    return (
        <Layout>
            <SEO title="PostHug" description="Free hedgehugs." image={`/images/about.png`} />

            <div>Need a hug? 🦔</div>

            <a href="http://posthog.com">Go to PostHog</a>
        </Layout>
    )
}

export default PostHugPage
