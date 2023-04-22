import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import React from 'react'
import { Question, TopicSelector, useQuestion } from 'components/Squeak'
import { RightArrow } from 'components/Icons'

import QuestionSidebar from 'components/Questions/QuestionSidebar'
import Link from 'components/Link'
import SEO from 'components/seo'
import { useUser } from 'hooks/useUser'
import { useNav } from 'components/Community/useNav'

import { XIcon } from '@heroicons/react/outline'

type QuestionPageProps = {
    params: {
        permalink: string
    }
}

export default function QuestionPage(props: QuestionPageProps) {
    const { permalink } = props?.params || {}
    const { question, isLoading } = useQuestion(permalink)
    const { user, isModerator } = useUser()
    const { removeTopic } = useQuestion(permalink)

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

    const nav = useNav()
    return (
        <Layout>
            <SEO
                title={isLoading ? 'Squeak question - PostHog' : `${question?.attributes?.subject} - PostHog`}
                noindex={question?.attributes.archived}
            />
            <PostLayout
                title={question?.attributes?.subject || ''}
                menu={nav}
                sidebar={<QuestionSidebar permalink={permalink} />}
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

                    <Question id={permalink} expanded={true} />
                </section>

                {isModerator && question && (
                    <div className="bg-almost-black dark:bg-white/25 rounded-md p-6 mb-6 text-primary-dark bg:text-primary">
                        <h4 className="text-xs text-primary-dark opacity-70 mb-2 -mt-2 p-0 font-semibold uppercase">
                            Moderator tools
                        </h4>

                        <div className="w-full relative">
                            <p className="text-sm pt-0.5 pb-0  mb-0 flex flex-col items-end space-y-1.5 absolute top-0 right-0">
                                <Link className="font-bold" to={link} externalNoIcon>
                                    View in PostHog
                                </Link>
                                <Link
                                    to={`${process.env.GATSBY_SQUEAK_API_HOST}/admin/content-manager/collectionType/api::question?.question/${question?.id}`}
                                    externalNoIcon
                                    className="font-bold"
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

                        <div className="pb-4 mb-4 border-b border-dashed border-gray-accent-dark">
                            <input
                                className="w-full m-0 font-normal text-sm text-primary-dark/60 border-none p-0 bg-transparent focus:ring-0"
                                type="text"
                                value={question?.attributes?.profile?.data?.attributes?.user?.data?.attributes?.email}
                                readOnly
                                onFocus={(e) => e.target.select()}
                            />
                        </div>

                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xs text-primary-dark opacity-70 p-0 m-0 font-semibold uppercase">
                                Forum topics
                            </h4>
                            <TopicSelector questionId={question?.id} permalink={permalink} />
                        </div>
                        <ul className="flex items-center list-none p-0 flex-wrap">
                            {question?.attributes?.topics?.data.map((topic) => (
                                <li
                                    key={topic.id}
                                    className="bg-gray-accent-dark dark:bg-gray-accent-light text-primary-dark dark:text-primary py-0.5 px-2 rounded-sm whitespace-nowrap mr-2 my-2 inline-flex items-center space-x-1.5"
                                >
                                    <Link
                                        to={`/questions/topic/${topic.attributes.slug}`}
                                        className="text-yellow text-sm"
                                    >
                                        {topic.attributes.label}
                                    </Link>

                                    <button onClick={() => removeTopic(topic)}>
                                        <XIcon className="h-4 w-4 text-primary-dark dark:text-primary" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </PostLayout>
        </Layout>
    )
}
