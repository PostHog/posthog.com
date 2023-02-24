import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import docs from 'sidebars/docs.json'

export default function FeatureFlags() {
    return (
        <Layout>
            <SEO title="Feature flags - Docs - PostHog" />

            <PostLayout title={'Feature flags'} menu={docs} hideSidebar hideSurvey>
                <div />
            </PostLayout>
        </Layout>
    )
}
