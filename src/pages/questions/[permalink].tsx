import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import React from 'react'
import { Question, TopicSelector, useQuestion } from 'components/Squeak'
import { RightArrow } from 'components/Icons'

import QuestionSidebar from 'components/Questions/QuestionSidebar'
import Link from 'components/Link'
import SEO from 'components/seo'
import { useUser } from 'hooks/useUser'
import { XIcon } from '@heroicons/react/outline'
import { communityMenu } from '../../navs'
import useTopicsNav from '../../navs/useTopicsNav'
import ZendeskTicket from 'components/ZendeskTicket'

type QuestionPageProps = {
    params: {
        permalink: string
    }
}

export default function QuestionPage(props: QuestionPageProps) {
    const { permalink } = props?.params || {}
    const { question, isLoading, mutate } = useQuestion(permalink)
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
    const nav = useTopicsNav()
    return (
        <Layout
            parent={communityMenu}
            activeInternalMenu={communityMenu.children.find(({ name }) => name.toLowerCase() === 'questions')}
        >
            <SEO
                title={isLoading ? 'Community question - PostHog' : `${question?.attributes?.subject} - PostHog`}
                noindex={question?.attributes.archived}
            />
            <PostLayout
                title={question?.attributes?.subject || ''}
                menu={nav}
                sidebar={<QuestionSidebar permalink={permalink} />}
                hideSurvey
                menuWidth={user?.role?.type === 'moderator' ? { right: 400 } : undefined}
            >
                <section className="pb-12">
                    <div className="mb-4">
                        <Link
                            to="/questions"
                            className="inline-flex space-x-1 items-center relative px-2 pt-1.5 pb-1 mb-1 rounded border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
                        >
                            <RightArrow className="-scale-x-100 w-6" />
                            <span className="text-primary dark:text-primary-dark text-[15px]">Back to questions</span>
                        </Link>
                    </div>

                    <Question showSlug id={permalink} expanded={true} />
                </section>

                {isModerator && question && (
                    <div className="bg-accent dark:bg-accent-dark rounded-md p-6 mb-6 text-primary dark:text-primary-dark">
                        <h4 className="text-xs opacity-70 mb-2 -mt-2 p-0 font-semibold uppercase">Moderator tools</h4>
                        <div className="grid grid-cols-2">
                            <div>
                                <Link
                                    to={`/community/profiles/${question?.attributes?.profile?.data?.id}`}
                                    className="text-yellow font-bold"
                                >
                                    {question?.attributes?.profile?.data?.attributes?.firstName
                                        ? `${question?.attributes?.profile?.data?.attributes?.firstName} ${question?.attributes?.profile?.data?.attributes?.lastName}`
                                        : 'Anonymous'}
                                </Link>
                                <input
                                    className="w-full m-0 font-normal text-sm text-primary dark:text-primary-dark border-none p-0 bg-transparent focus:ring-0"
                                    type="text"
                                    value={
                                        question?.attributes?.profile?.data?.attributes?.user?.data?.attributes?.email
                                    }
                                    readOnly
                                    onFocus={(e) => e.target.select()}
                                />
                            </div>
                            <div className="w-full relative">
                                <p className="!text-sm pt-0.5 pb-0  mb-0 flex flex-col items-end space-y-1.5">
                                    <Link className="font-bold" to={link} externalNoIcon>
                                        View in PostHog
                                    </Link>
                                    <Link
                                        to={`${process.env.GATSBY_SQUEAK_API_HOST}/admin/content-manager/collectionType/api::question.question/${question?.id}`}
                                        externalNoIcon
                                        className="font-bold"
                                    >
                                        View in Strapi
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div
                            className={`grid gap-x-4 mt-4 border-t divide-x divide-border dark:divide-border-dark border-light dark:border-dark ${
                                question.attributes.zendeskTicketID ? 'grid-cols-2' : ''
                            }`}
                        >
                            <ZendeskTicket mutateQuestion={mutate} question={question} questionID={question.id} />
                            <div className={`pt-4 ${question.attributes.zendeskTicketID ? 'pl-4' : ''}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-xs text-primary dark:text-primary-dark opacity-70 p-0 m-0 font-semibold uppercase">
                                        Forum topics
                                    </h4>
                                    <TopicSelector questionId={question?.id} permalink={permalink} />
                                </div>
                                <ul className="flex items-center list-none p-0 flex-wrap">
                                    {question?.attributes?.topics?.data.map((topic) => (
                                        <li
                                            key={topic.id}
                                            className="bg-white dark:bg-white/10 py-0.5 px-2 rounded-sm whitespace-nowrap mr-2 my-2 inline-flex items-center space-x-1.5"
                                        >
                                            <Link
                                                to={`/questions/topic/${topic.attributes.slug}`}
                                                className="text-yellow text-sm"
                                            >
                                                {topic.attributes.label}
                                            </Link>

                                            <button onClick={() => removeTopic(topic)}>
                                                <XIcon className="h-4 w-4 text-primary dark:text-primary-dark " />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </PostLayout>
        </Layout>
    )
}
