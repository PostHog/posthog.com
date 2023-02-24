import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import docs from 'sidebars/docs.json'

export default function Experiments() {
    return (
        <Layout>
            <SEO title="Experiments - Docs - PostHog" />

            <PostLayout title={'Experiments'} menu={docs} hideSidebar hideSurvey>
                <div />
            </PostLayout>
        </Layout>
    )
}
