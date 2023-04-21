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
    const { user, isModerator } = useUser()

    const personsQuery = {
        kind: 'DataTableNode',
        source: {
            kind: 'PersonsNode',
            search:
                question?.attributes?.profile?.data?.attributes?.user?.data?.attributes?.distinctId ||
                question?.attributes?.profile?.data?.attributes?.user?.data?.attributes?.email,
        },
        full: true,
        propertiesViaUrl: true,
    }

    const link = `https://app.posthog.com/persons#q=${encodeURIComponent(JSON.stringify(personsQuery))}`

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

                {isModerator && (
                    <div className="bg-almost-black rounded-lg p-6 text-white">
                        <h4 className="text-xs opacity-70 mb-2 -mt-2 p-0 font-semibold uppercase">Moderator tools</h4>

                        <div className="w-full relative">
                            <p className="text-sm pt-0.5 pb-0  mb-0 flex flex-col items-end space-y-1.5 absolute top-0 right-0">
                                <Link className="" to={link} external>
                                    View in PostHog
                                </Link>
                                <Link
                                    to={`${process.env.GATSBY_SQUEAK_API_HOST}/admin/content-manager/collectionType/api::question?.question/${question?.id}`}
                                    external
                                >
                                    View in Strapi
                                </Link>
                            </p>

                            <Link
                                to={`/community/profiles/${question?.attributes?.profile?.data?.id}`}
                                className="text-yellow font-bold"
                            >
                                {question?.attributes?.profile?.data?.attributes?.firstName
                                    ? `${question?.attributes?.profile?.data?.attributes?.firstName} ${question?.attributes?.profile?.data?.attributes?.lastName}`
                                    : 'Anonymous'}
                            </Link>
                        </div>

                        <>
                            <input
                                className=" w-full m-0 font-normal text-sm text-white/60 dark:text-white/60 border-none p-0 bg-transparent focus:ring-0"
                                type="text"
                                value={question?.attributes?.profile?.data?.attributes?.user?.data?.attributes?.email}
                                readOnly
                                onFocus={(e) => e.target.select()}
                            />
                        </>
                    </div>
                )}
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
