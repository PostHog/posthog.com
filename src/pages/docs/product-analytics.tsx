import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import docs from 'sidebars/docs.json'

export default function ProductAnalytics() {
    return (
        <Layout>
            <SEO title="Documentation - PostHog" />

            <PostLayout title={'Docs'} menu={docs} hideSidebar hideSurvey>
                <div />
            </PostLayout>
        </Layout>
    )
}
