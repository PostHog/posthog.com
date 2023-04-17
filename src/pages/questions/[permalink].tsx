import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import React from 'react'
import { Question, useQuestion } from 'components/Squeak'
import community from 'sidebars/community.json'

import QuestionSidebar from 'components/Questions/QuestionSidebar'
import Link from 'components/Link'
import SEO from 'components/seo'

type QuestionPageProps = {
    params: {
        permalink: string
    }
}

export default function QuestionPage(props: QuestionPageProps) {
    const { question, isLoading } = useQuestion(props.params.permalink)

    return (
        <Layout>
            <SEO title={isLoading ? 'Squeak question - PostHog' : `${question?.attributes?.subject} - PostHog`} />
            <PostLayout
                title={question?.attributes?.subject || ''}
                menu={community}
                sidebar={<QuestionSidebar question={question} />}
                hideSurvey
            >
                <section className="max-w-5xl mx-auto pb-12">
                    <div className="mb-4">
                        <Link to="/questions" className="text-gray hover:text-gray-accent-light">
                            ← Back to Questions
                        </Link>
                    </div>

                    <Question id={props.params.permalink} expanded={true} />
                </section>
            </PostLayout>
        </Layout>
    )
}
