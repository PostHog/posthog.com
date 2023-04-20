import React, { useEffect } from 'react'
import { PageProps } from 'gatsby'
import Link from 'components/Link'
import { useUser } from 'hooks/useUser'
import { QuestionData } from 'lib/strapi'
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
        if (user) fetchUser()
    }, [])

    return (
        <div id="my-activity" className="mb-12">
            <SectionTitle>My discussions</SectionTitle>
            {questions?.data.length > 0 ? (
                <QuestionsTable
                    showTopic
                    showAuthor={false}
                    fetchMore={fetchMore}
                    isLoading={isLoading}
                    questions={questions}
                />
            ) : (
                <p>You're not subscribed to any questions yet</p>
            )}
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
