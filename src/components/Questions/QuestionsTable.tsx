import React, { useEffect } from 'react'

import Link from 'components/Link'
import { QuestionData, StrapiResult } from 'lib/strapi'
import Tooltip from 'components/Tooltip'
import Markdown from 'components/Squeak/components/Markdown'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useInView } from 'react-intersection-observer'
import { IconCheckCircle, IconClock, IconPin, IconX } from '@posthog/icons'
import { useUser } from 'hooks/useUser'
dayjs.extend(relativeTime)

type QuestionsTableProps = {
    questions: Omit<StrapiResult<QuestionData[]>, 'meta'>
    pinnedQuestions: Omit<StrapiResult<QuestionData[]>, 'meta'>
    isLoading: boolean
    fetchMore: () => void
    hideLoadMore?: boolean
    className?: string
    currentPage?: {
        url: string
        title: string
    }
    hasMore?: boolean
    showAuthor?: boolean
    showTopic?: boolean
    showBody?: boolean
    sortBy?: 'newest' | 'activity' | 'popular'
}

export const Skeleton = () => {
    return (
        <div className="">
            <div className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 space-y-2">
                <div className="w-96 h-4 bg-gray-accent-light dark:bg-gray-accent-dark rounded-sm animate-pulse"></div>
                <div className="w-60 h-4 bg-gray-accent-light dark:bg-gray-accent-dark rounded-sm animate-pulse"></div>
                <div className="w-36 h-4 bg-gray-accent-light dark:bg-gray-accent-dark rounded-sm animate-pulse"></div>
            </div>

            <div className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 font-semibold animate-pulse">
                <div className="w-full h-4 bg-gray-accent-light dark:bg-gray-accent-dark rounded-sm animate-pulse"></div>
            </div>
            <div className="whitespace-nowrap p-4 text-sm text-gray-500 text-gray font-semibold animate-pulse">
                <div className="w-full h-4 bg-gray-accent-light dark:bg-gray-accent-dark rounded-sm animate-pulse"></div>
            </div>
        </div>
    )
}

const Row = ({ question, className, currentPage, showTopic, showBody, showAuthor, sortBy, pinned, fetchMore }) => {
    const { isModerator } = useUser()
    const {
        attributes: { profile, subject, permalink, replies, createdAt, resolved, topics, activeAt, body },
    } = question

    const latestAuthor = replies?.data?.[replies.data.length - 1]?.attributes?.profile || profile
    const numReplies = replies?.data?.length || 0

    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true,
    })

    useEffect(() => {
        if (inView) {
            fetchMore()
        }
    }, [inView])

    return profile ? (
        <div ref={fetchMore ? ref : null} key={question.id} className="py-2.5">
            <Link
                state={currentPage && { previous: currentPage }}
                to={`/questions/${permalink}`}
                className={`${className} group flex items-center relative px-2 py-1.5 -mt-1.5 mx-[-2px] -mb-3 rounded active:bg-light dark:active:bg-dark border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all active:before:h-[2px] active:before:bg-light dark:active:before:bg-dark active:before:absolute active:before:content-[''] active:before:top-[-3px] active:before:left-0 active:before:right-0`}
            >
                <div className="grid grid-cols-12 items-center w-full">
                    <div className="col-span-12 md:col-span-7 2xl:col-span-8 flex items-center space-x-4">
                        <div className="w-5 flex-shrink-0">
                            {pinned ? (
                                <Tooltip content="Pinned">
                                    <span className="relative text-primary/60 dark:text-primary-dark/60">
                                        <IconPin />
                                    </span>
                                </Tooltip>
                            ) : resolved ? (
                                <Tooltip content="Resolved">
                                    <span className="relative text-green">
                                        <IconCheckCircle />
                                    </span>
                                </Tooltip>
                            ) : isModerator ? (
                                latestAuthor?.data?.attributes?.user?.data?.attributes?.role?.data?.attributes?.type ===
                                'moderator' ? (
                                    <Tooltip content="Pending response">
                                        <span className="relative text-yellow">
                                            <IconClock />
                                        </span>
                                    </Tooltip>
                                ) : (
                                    <Tooltip content="Needs response">
                                        <span className="relative text-red">
                                            <IconX />
                                        </span>
                                    </Tooltip>
                                )
                            ) : null}
                        </div>

                        <div className="w-full">
                            <span className="text-sm text-red dark:text-yellow line-clamp-1">{subject}</span>
                            {showTopic && (
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center text-sm space-x-1 text-primary group">
                                        <div className="text-primary dark:text-primary-dark font-medium opacity-60 group-hover:opacity-100 line-clamp-1">
                                            {topics?.data?.[0]?.attributes.label || 'Uncategorized'}
                                        </div>
                                    </div>

                                    <div className="md:hidden text-primary dark:text-primary-dark text-sm font-medium opacity-60 line-clamp-2">
                                        {dayjs(sortBy === 'activity' ? activeAt : createdAt).fromNow()}
                                    </div>
                                </div>
                            )}
                            {showBody && (
                                <div className="text-black items-baseline flex flex-1 min-w-0 whitespace-nowrap overflow-hidden dark:text-white question-table-body-container">
                                    <Markdown allowedElements={['p']}>{body}</Markdown>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="hidden md:block md:col-span-2 2xl:col-span-1 text-center text-sm font-normal text-primary/60 dark:text-primary-dark/60">
                        {numReplies}
                    </div>
                    <div className="hidden md:block md:col-span-3 text-sm font-normal text-primary/60 dark:text-primary-dark/60">
                        <div className="text-primary dark:text-primary-dark font-medium opacity-60 line-clamp-2">
                            {dayjs(sortBy === 'activity' ? activeAt : createdAt).fromNow()} by{' '}
                            {profile.data?.attributes?.firstName} {profile.data?.attributes?.lastName} {}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    ) : null
}

export const QuestionsTable = ({
    questions,
    isLoading,
    fetchMore,
    hideLoadMore,
    className = '',
    currentPage,
    hasMore,
    showTopic,
    showBody,
    showAuthor = true,
    sortBy,
    pinnedQuestions,
}: QuestionsTableProps) => {
    const questionsFiltered = questions.data.length > 0 && questions.data.filter(Boolean)
    return (
        <ul className="m-0 p-0 list-none">
            <li className="grid grid-cols-12 pl-2 pr-3 py-1.5 items-center text-primary/75 dark:text-primary-dark/75 !text-sm bg-accent dark:bg-accent-dark rounded">
                <div className="col-span-12 xl:col-span-7 2xl:col-span-8 pl-8">Question / Topic</div>
                <div className="hidden xl:block xl:col-span-2 2xl:col-span-1 text-center">Replies</div>
                <div className="hidden xl:block xl:col-span-3">{sortBy === 'activity' ? 'Last active' : 'Created'}</div>
            </li>
            {pinnedQuestions?.data?.length > 0 ? (
                <li className="list-none">
                    {pinnedQuestions.data.filter(Boolean).map((question) => {
                        return (
                            <Row
                                key={question.id}
                                className={className}
                                currentPage={currentPage}
                                showTopic={showTopic}
                                showBody={showBody}
                                showAuthor={showAuthor}
                                question={question}
                                sortBy={sortBy}
                                pinned
                            />
                        )
                    })}
                </li>
            ) : null}
            {questionsFiltered
                ? questionsFiltered.map((question, index) => {
                      return (
                          <li key={question.id} className="list-none px-[2px] divide-y divide-light dark:divide-dark">
                              <Row
                                  className={className}
                                  currentPage={currentPage}
                                  showTopic={showTopic}
                                  showBody={showBody}
                                  showAuthor={showAuthor}
                                  question={question}
                                  sortBy={sortBy}
                                  fetchMore={questionsFiltered.length === index + 1 && fetchMore}
                              />
                          </li>
                      )
                  })
                : new Array(9).fill(0).map((_, i) => <Skeleton key={i} />)}
            {isLoading && <Skeleton />}
        </ul>
    )
}

export default QuestionsTable
