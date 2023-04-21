import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import React from 'react'
import { Question, useQuestion } from 'components/Squeak'
import { RightArrow } from 'components/Icons'

import QuestionSidebar from 'components/Questions/QuestionSidebar'
import Link from 'components/Link'
import SEO from 'components/seo'
import { useUser } from 'hooks/useUser'
import { useNav } from 'components/Community/useNav'

type QuestionPageProps = {
    params: {
        permalink: string
    }
}

const QuestionTemplate = (props: any) => {
    const { question, isLoading } = useQuestion(props.params.permalink)
    const { user } = useUser()
    const nav = useNav(user)
    return (
        <>
            <SEO
                title={isLoading ? 'Squeak question - PostHog' : `${question?.attributes?.subject} - PostHog`}
                noindex={question?.attributes.archived}
            />
            <PostLayout
                title={question?.attributes?.subject || ''}
                menu={nav}
                sidebar={<QuestionSidebar permalink={props.params.permalink} />}
                hideSurvey
                menuWidth={user?.role?.type === 'moderator' ? { right: 400 } : undefined}
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
        </>
    )
}

export default function QuestionPage(props: QuestionPageProps) {
    return (
        <Layout>
            <QuestionTemplate {...props} />
        </Layout>
    )
}
