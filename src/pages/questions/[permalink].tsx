import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import React from 'react'
import { Question } from 'components/Squeak'
import community from 'sidebars/community.json'

import QuestionSidebar from 'components/Questions/QuestionSidebar'
import Link from 'components/Link'

type QuestionPageProps = {
    params: {
        permalink: string
    }
}

export default function QuestionPage(props: QuestionPageProps) {
    const question = {}

    return (
        <Layout>
            {/*<SEO title={`${question?.subject} - PostHog`} />*/}
            <PostLayout
                title={question?.subject || ''}
                menu={community}
                // sidebar={<QuestionSidebar question={question} />}
                hideSurvey
            >
                <section className="max-w-5xl mx-auto pb-12">
                    <div className="mb-4">
                        <Link to="/questions" className="text-gray hover:text-gray-accent-light">
                            ← Back to Questions
                        </Link>
                    </div>

                    <Question id={props.params.permalink} />
                </section>
            </PostLayout>
        </Layout>
    )
}
