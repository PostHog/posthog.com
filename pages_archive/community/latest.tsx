import React from 'react'
import { CallToAction } from 'components/CallToAction'
import QuestionsTable from 'components/Questions/QuestionsTable'
import { useQuestions } from 'hooks/useQuestions'
import CommunityLayout, { SectionTitle } from 'components/Community/Layout'

export default function CommunityPage() {
    const { questions, fetchMore, isLoading } = useQuestions({
        limit: 10,
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
    return (
        <CommunityLayout title="Latest">
            <div id="recent-questions" className="mb-12 xl:-mx-6">
                <SectionTitle>Recent questions</SectionTitle>
                <QuestionsTable
                    hideLoadMore
                    questions={questions}
                    showTopic
                    fetchMore={fetchMore}
                    isLoading={isLoading}
                />
                <CallToAction className="mt-4" type="secondary" width="full" to="/questions">
                    Browse topics
                </CallToAction>
            </div>
        </CommunityLayout>
    )
}
