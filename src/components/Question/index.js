import Breadcrumbs from 'components/Breadcrumbs'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { createHubSpotContact } from 'lib/utils'
import React from 'react'
import { Question } from 'squeak-react'

export default function QuestionPage() {
    return (
        <Layout>
            <SEO title={'Questions - PostHog'} />
            <Breadcrumbs
                crumbs={[{ title: 'Questions', url: '/questions' }]}
                darkModeToggle
                className="px-4 mt-4 sticky top-[-2px] z-10 bg-tan dark:bg-primary"
            />
            <section className="max-w-3xl mx-auto py-12">
                <Question
                    onSignUp={(user) => createHubSpotContact(user)}
                    apiHost="https://squeak.cloud"
                    organizationId="a898bcf2-c5b9-4039-82a0-a00220a8c626"
                />
            </section>
        </Layout>
    )
}
