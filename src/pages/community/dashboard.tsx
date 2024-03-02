import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { useUser } from 'hooks/useUser'
import CommunityLayout, { SectionTitle } from 'components/Community/Layout'
import QuestionsTable from 'components/Questions/QuestionsTable'
import { useQuestions } from 'hooks/useQuestions'
import Link from 'components/Link'

export default function CommunityPage() {
    const { user, fetchUser } = useUser()
    const { questions, isLoading, fetchMore } = useQuestions({
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
    })
    const { questions: recentQuestions } = useQuestions({
        limit: 1,
        filters: {
            subject: {
                $ne: '',
            },
            slugs: {
                slug: {
                    $notContainsi: '/community/profiles',
                },
            },
        },
    })
    const topicSubscriptions = user?.profile?.topicSubscriptions

    useEffect(() => {
        if (!user) {
            fetchUser().catch(() => navigate('/questions'))
        }
    }, [user])

    const recentPermalink = recentQuestions?.data[0]?.attributes?.permalink

    return (
        <CommunityLayout title="Inbox">
            <SectionTitle>My discussions</SectionTitle>

            {topicSubscriptions && topicSubscriptions?.length > 0 && (
                <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark p-4 mb-4 rounded">
                    <h4 className="text-sm font-semibold opacity-60 mb-0">Jump to subscribed topics:</h4>
                    <ul className="list-none m-0 p-0 flex flex-wrap">
                        {topicSubscriptions.map(({ label, slug }) => {
                            return (
                                <li
                                    key={label}
                                    className="relative after:content-['|'] last:after:content-none mr-1 after:pl-1 after:opacity-50"
                                >
                                    <Link to={`/questions/topic/${slug}`} className="text-sm">
                                        {label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}

            {questions?.data?.length > 0 ? (
                <QuestionsTable
                    sortBy="activity"
                    showTopic
                    showAuthor={false}
                    fetchMore={fetchMore}
                    isLoading={isLoading}
                    questions={questions}
                />
            ) : (
                <>
                    <div className="font-medium text-sm m-0 mb-6 bg-accent dark:bg-accent-dark border border-light dark:border-dark p-4 rounded text-center">
                        <p className="font-bold !m-0 !p-0">You're not subscribed to any threads yet!</p>
                        {recentPermalink && (
                            <p className="!text-sm !m-0">
                                <Link to={`/questions/${recentPermalink}`}>This</Link> one looks enticing...
                            </p>
                        )}
                    </div>
                </>
            )}
        </CommunityLayout>
    )
}
