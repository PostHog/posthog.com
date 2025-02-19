import React from 'react'
import { IconArrowRight, IconInfo } from '@posthog/icons'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import { useQuestions } from 'hooks/useQuestions'
import { useUser } from 'hooks/useUser'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isToday from 'dayjs/plugin/isToday'
dayjs.extend(relativeTime)
dayjs.extend(isToday)

const Skeleton = () => {
    return <div className="animate-pulse bg-accent dark:bg-accent-dark h-[160px] w-full rounded-md" />
}

const ThreadHeaderRow = ({ columns }: { columns: string[] }) => {
    return (
        <>
            {columns.map((column, index) => {
                return (
                    <div
                        key={index}
                        className="font-medium text-[13px] pb-1 mb-1 text-left border-b border-border dark:border-dark text-primary/60 dark:text-primary-dark/60 even:pl-2 even:hidden even:text-right @2xs:even:block"
                    >
                        {column}
                    </div>
                )
            })}
        </>
    )
}

const Thread = ({ title, status, url }: { title: string; status: string; url: string }) => {
    return (
        <>
            <div>
                <Link to={`/questions/${url}`} className="font-semibold text-sm @2xs:py-1 leading-tight line-clamp-3">
                    {title}
                </Link>
            </div>
            <div className="@2xs:text-right text-[13px] opacity-60 mb-2 @2xs:mb-0 @2xs:mt-1 @2xs:pl-2">{status}</div>
        </>
    )
}

export default function Questions(): JSX.Element {
    const { user } = useUser()
    const { questions: subscribedQuestions, isLoading: subscribedQuestionsLoading } = useQuestions({
        limit: 3,
        sortBy: 'activity',
        filters: {
            subject: {
                $ne: '',
            },
            resolved: {
                $ne: true,
            },
            profileSubscribers: {
                id: {
                    $eq: user?.profile?.id,
                },
            },
        },
        revalidateOnFocus: false,
    })

    const { questions: newestQuestions, isLoading: newestQuestionsLoading } = useQuestions({
        limit: 3,
        sortBy: 'newest',
        filters: {
            subject: {
                $ne: '',
            },
            slugs: {
                slug: {
                    $notContainsi: '/community/profiles',
                },
            },
            topics: {
                label: {
                    $notContainsi: '#',
                },
            },
        },
        revalidateOnFocus: false,
    })

    return (
        <div className="flex flex-col gap-4">
            {user &&
                (subscribedQuestionsLoading ? (
                    <Skeleton />
                ) : (
                    <div>
                        <div className="flex gap-4 w-full items-baseline">
                            <h3 className="flex-1 text-lg mb-2">
                                My discussions
                                <Tooltip content="Subscribed threads with recent activity" placement="top">
                                    <IconInfo className="w-4 h-4 opacity-75 inline-block ml-1 relative -top-px" />
                                </Tooltip>
                            </h3>
                            <div>
                                <Link
                                    to="/community/dashboard"
                                    className="text-[13px] font-bold flex items-center bg-accent dark:bg-accent-dark rounded-lg px-2 py-1"
                                >
                                    View all
                                    <IconArrowRight className="inline-block w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                        <div className="grid items-start w-full @2xs:grid-cols-[1fr_max-content]">
                            <ThreadHeaderRow columns={['Topic', 'Last reply']} />
                            {subscribedQuestions?.data?.map(({ attributes: { subject, activeAt, permalink }, id }) => {
                                const status = dayjs(activeAt).fromNow()
                                return <Thread key={id} title={subject} status={status} url={permalink} />
                            })}
                        </div>
                    </div>
                ))}

            {newestQuestionsLoading ? (
                <Skeleton />
            ) : (
                <div className="">
                    <div className="flex gap-4 w-full items-baseline">
                        <h3 className="flex-1 text-lg mb-2">
                            Latest questions
                            <Tooltip content="Questions posted to the community forums" placement="top">
                                <IconInfo className="w-4 h-4 opacity-75 inline-block ml-1 relative -top-px" />
                            </Tooltip>
                        </h3>
                        <div>
                            <Link
                                to="/questions"
                                className="text-[13px] font-bold flex items-center bg-accent dark:bg-accent-dark rounded-lg px-2 py-1"
                            >
                                View all
                                <IconArrowRight className="inline-block w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </div>

                    <div className="grid items-start w-full @2xs:grid-cols-[1fr_max-content]">
                        <ThreadHeaderRow columns={['Topic', 'Last reply']} />
                        {newestQuestions?.data?.map(({ attributes: { subject, activeAt, permalink }, id }) => {
                            const status = dayjs(activeAt).fromNow()
                            return <Thread key={id} title={subject} status={status} url={permalink} />
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
