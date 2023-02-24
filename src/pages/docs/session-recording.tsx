import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import docs from 'sidebars/docs.json'

export default function SessionRecording() {
    return (
        <Layout>
            <SEO title="Session recording - Docs - PostHog" />

            <PostLayout title={'Session Recording'} menu={docs} hideSidebar hideSurvey>
                <div />
            </PostLayout>
        </Layout>
    )
}
