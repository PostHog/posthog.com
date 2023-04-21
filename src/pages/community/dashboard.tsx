import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { useUser } from 'hooks/useUser'
import CommunityLayout, { SectionTitle } from 'components/Community/Layout'
import QuestionsTable from 'components/Questions/QuestionsTable'
import { useQuestions } from 'hooks/useQuestions'

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

    useEffect(() => {
        if (!user) {
            fetchUser().catch(() => navigate('/questions'))
        }
    }, [user])

    return (
        <div id="my-activity" className="mb-12">
            <SectionTitle>My discussions</SectionTitle>
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
