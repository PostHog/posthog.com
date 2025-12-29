import React from 'react'
import Link from 'components/Link'
import { useQuestions } from 'hooks/useQuestions'
import { IconCheckCircle, IconMessage } from '@posthog/icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

interface SolvedQuestionsProps {
    topicLabel?: string
    limit?: number
    className?: string
    pinnedQuestions?: string[]
}

export default function SolvedQuestions({
    topicLabel,
    limit = 5,
    className = '',
    pinnedQuestions = [],
}: SolvedQuestionsProps) {
    const { questions: pinnedData, isLoading: isPinnedLoading } = useQuestions({
        limit: pinnedQuestions.length || 1,
        filters: {
            permalink: {
                $in: pinnedQuestions.length ? pinnedQuestions : ['__none__'],
            },
        },
    })

    const { questions: recentData, isLoading: isRecentLoading } = useQuestions({
        limit: limit + pinnedQuestions.length,
        sortBy: 'activity',
        filters: {
            resolved: {
                $eq: true,
            },
            subject: {
                $ne: '',
            },
            ...(topicLabel && {
                topics: {
                    label: {
                        $eqi: topicLabel,
                    },
                },
            }),
        },
    })

    const isLoading = isPinnedLoading || isRecentLoading

    const questions = React.useMemo(() => {
        const pinned = pinnedData?.data || []
        const recent = recentData?.data || []

        // Get permalinks of pinned questions to filter duplicates
        const pinnedPermalinks = new Set(pinnedQuestions)

        // Filter out pinned questions from recent
        const recentFiltered = recent.filter((q) => !pinnedPermalinks.has(q.attributes.permalink))

        // Calculate how many recent questions we can show after pinned
        const remainingSlots = Math.max(0, limit - pinned.length)

        // Combine: pinned first, then recent to fill remaining slots
        const combined = [...pinned, ...recentFiltered.slice(0, remainingSlots)]

        return { data: combined }
    }, [pinnedData, recentData, pinnedQuestions, limit])

    if (isLoading) {
        return (
            <div className={`bg-accent rounded-md p-6 ${className}`}>
                <div className="animate-pulse space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-12 bg-border rounded" />
                    ))}
                </div>
            </div>
        )
    }

    if (!questions?.data?.length) {
        return (
            <div className={`bg-accent rounded-md p-6 ${className}`}>
                <p className="text-secondary m-0">No community questions have been answered for this topic yet.</p>
            </div>
        )
    }

    return (
        <div className={`bg-accent rounded-md p-6 ${className}`}>
            <p className="mt-0 mb-4">
                These {topicLabel} questions were asked and answered by the PostHog community. Browse them for
                real-world solutions to common issues.
            </p>
            <ul className="list-none m-0 p-0 space-y-4">
                {questions.data.map((question) => {
                    const replyCount = question.attributes.replies?.data?.length || 0
                    const resolvedAt = question.attributes.resolved ? question.attributes.activeAt : null
                    const profile = question.attributes.profile?.data?.attributes
                    const authorName = profile
                        ? `${profile.firstName || ''}${profile.lastName ? ` ${profile.lastName}` : ''}`.trim()
                        : null

                    return (
                        <li key={question.id}>
                            <Link
                                to={`/questions/${question.attributes.permalink}`}
                                className="group block no-underline"
                                externalNoIcon
                            >
                                <div className="flex items-start gap-3">
                                    <IconCheckCircle className="size-5 text-green flex-shrink-0 mt-0.5" />
                                    <div className="flex-1 min-w-0">
                                        <span className="text-primary font-medium group-hover:text-red dark:group-hover:text-yellow">
                                            {question.attributes.subject}
                                        </span>
                                        <div className="flex items-center gap-3 mt-1 text-sm opacity-60">
                                            {authorName && <span>Asked by {authorName}</span>}
                                            <span className="flex items-center gap-1">
                                                <IconMessage className="size-4" />
                                                {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
                                            </span>
                                            {resolvedAt && <span>Solved {dayjs(resolvedAt).fromNow()}</span>}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            {topicLabel && (
                <div className="mt-4">
                    <Link
                        to={`/questions/topic/${topicLabel.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-sm font-medium"
                    >
                        View all {topicLabel} questions →
                    </Link>
                </div>
            )}
        </div>
    )
}
