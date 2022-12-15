import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import { SEO } from 'components/seo'
import { createHubSpotContact } from 'lib/utils'
import { useTopicMenu } from 'lib/useTopicMenu'
import React from 'react'
import { FullQuestion } from 'squeak-react'
import useSWR from 'swr'

import type { Question } from 'components/Questions'
import QuestionSidebar from 'components/Questions/QuestionSidebar'
import Link from 'components/Link'

type QuestionPageProps = {
    params: {
        permalink: string
    }
}

export default function QuestionPage(props: QuestionPageProps) {
    const menu = useTopicMenu()
    const { data: question } = useSWR<Question>(
        `${process.env.GATSBY_SQUEAK_API_HOST}/api/v1/questions?organizationId=${process.env.GATSBY_SQUEAK_ORG_ID}&permalink=${props.params.permalink}`,
        (url) =>
            fetch(url)
                .then((res) => res.json())
                .then(({ questions }) => questions[0])
    )

    return (
        <Layout>
            <SEO title={`${question?.subject} - PostHog`} />
            <PostLayout
                title={question?.subject || ''}
                menu={menu}
                sidebar={<QuestionSidebar question={question} />}
                hideSurvey
            >
                {question && (
                    <section className="max-w-5xl mx-auto">
                        <div className="mb-4">
                            <Link to="/questions" className="text-gray hover:text-gray-accent-light">
                                ← Back to Questions
                            </Link>
                        </div>

                        <FullQuestion
                            apiHost={process.env.GATSBY_SQUEAK_API_HOST as string}
                            organizationId={process.env.GATSBY_SQUEAK_ORG_ID as string}
                            onSignUp={(user) => createHubSpotContact(user)}
                            question={question}
                        />
                    </section>
                )}
            </PostLayout>
        </Layout>
    )
}
