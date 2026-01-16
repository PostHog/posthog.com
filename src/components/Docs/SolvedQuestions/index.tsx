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
}

export default function SolvedQuestions({ topicLabel, limit = 5, className = '' }: SolvedQuestionsProps) {
    const { questions, isLoading } = useQuestions({
        limit,
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
        return null
    }

    return (
        <div className={`bg-accent rounded-md p-6 ${className}`}>
            <p className="mt-0 mb-4">
                These questions were asked and answered by the PostHog community. Browse them for real-world solutions
                to common issues.
            </p>
            <ul className="list-none m-0 p-0 space-y-4">
                {questions.data.map((question) => {
                    const replyCount = question.attributes.replies?.data?.length || 0
                    const resolvedAt = question.attributes.resolved ? question.attributes.activeAt : null

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
