import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import React from 'react'
import { Question, useQuestion } from 'components/Squeak'
import community from 'sidebars/community.json'
import { RightArrow } from 'components/Icons'

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
                sidebar={<QuestionSidebar permalink={props.params.permalink} />}
                hideSurvey
            >
                <section className="max-w-5xl mx-auto pb-12">
                    <div className="mb-4">
                        <Link
                            to="/questions"
                            className="inline-flex space-x-1 p-1 pr-2 rounded hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark relative hover:scale-[1.005] active:scale-[1] hover:top-[-.5px] active:top-0"
                        >
                            <RightArrow className="-scale-x-100 w-6" />
                            <span className="text-primary dark:text-primary-dark text-[15px]">Back to questions</span>
                        </Link>
                    </div>

                    <Question id={props.params.permalink} expanded={true} />
                </section>
            </PostLayout>
        </Layout>
    )
}
