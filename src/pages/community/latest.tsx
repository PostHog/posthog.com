import React from 'react'
import { CallToAction } from 'components/CallToAction'
import QuestionsTable from 'components/Questions/QuestionsTable'
import { useQuestions } from 'hooks/useQuestions'
import CommunityLayout, { SectionTitle } from 'components/Community/Layout'

const RecentQuestions = () => {
    // const [sortBy, setSortBy] = useState<'newest' | 'activity' | 'popular'>('newest')

    const { questions, fetchMore, isLoading } = useQuestions({ limit: 10 })

    return (
        <div id="recent-questions" className="mb-12">
            <SectionTitle>Recent questions</SectionTitle>
            <QuestionsTable hideLoadMore questions={questions} fetchMore={fetchMore} isLoading={isLoading} />
            <CallToAction className="mt-4" type="secondary" width="full" to="/questions">
                Browse all questions
            </CallToAction>
        </div>
    )
}

export default function CommunityPage() {
    return (
        <CommunityLayout title="Latest">
            <RecentQuestions />
        </CommunityLayout>
    )
}
