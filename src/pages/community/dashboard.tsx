import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { useUser } from 'hooks/useUser'
import CommunityLayout, { SectionTitle } from 'components/Community/Layout'
import QuestionsTable from 'components/Questions/QuestionsTable'
import { useQuestions } from 'hooks/useQuestions'
import Link from 'components/Link'

const Subscriptions = () => {
    const { user, fetchUser } = useUser()
    const { questions, isLoading, fetchMore } = useQuestions({
        filters: {
            profileSubscribers: {
                id: {
                    $eq: user?.profile?.id,
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

    return (
        <div id="my-activity" className="mb-12">
            <SectionTitle>My discussions</SectionTitle>

            {topicSubscriptions && topicSubscriptions?.length > 0 && (
                <div className="bg-gray-accent-light dark:bg-gray-accent-dark p-4 mb-4 rounded">
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

            <QuestionsTable
                showTopic
                showAuthor={true}
                fetchMore={fetchMore}
                isLoading={isLoading}
                questions={questions}
            />
        </div>
    )
}

export default function CommunityPage() {
    return (
        <CommunityLayout title="Inbox">
            <Subscriptions />
        </CommunityLayout>
    )
}
