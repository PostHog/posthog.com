import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import docs from 'sidebars/docs.json'

export default function Data() {
    return (
        <Layout>
            <SEO title="Data - Docs - PostHog" />

            <PostLayout title={'Data'} menu={docs} hideSidebar hideSurvey>
                <div />
            </PostLayout>
        </Layout>
    )
}
