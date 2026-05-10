import React from 'react'
import { IconArrowRight } from '@posthog/icons'
import Link from 'components/Link'
import QuestionsTable from 'components/Questions/QuestionsTable'
import { useQuestions } from 'hooks/useQuestions'
import { SectionComponentProps } from '../types'

const CommunityQuestions = ({ id, productData }: SectionComponentProps) => {
    const forumTopicId = (productData as any)?.forumTopicId
    const slug = (productData as any)?.slug
    if (!forumTopicId || !slug) return null

    const { questions, isLoading } = useQuestions({
        topicId: forumTopicId,
        limit: 10,
        sortBy: 'activity',
    })

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <header className="mb-6">
                <h2 className="text-3xl font-bold text-primary m-0 leading-tight">Community questions</h2>
                <p className="text-base text-secondary leading-relaxed m-0 mt-1">
                    The 10 most recently active discussions in the {productData.name} forum.
                </p>
            </header>

            <QuestionsTable
                questions={questions}
                pinnedQuestions={{ data: [] } as any}
                isLoading={isLoading}
                fetchMore={() => undefined}
                hideLoadMore
                sortBy="activity"
                showStatus={false}
                currentPage={{
                    title: productData.name,
                    url: `/${slug}`,
                }}
            />

            <div className="mt-6">
                <Link
                    to={`/questions/topic/${slug}`}
                    state={{ newWindow: true }}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-red dark:text-yellow hover:underline"
                >
                    View all questions
                    <IconArrowRight className="size-4" />
                </Link>
            </div>
        </section>
    )
}

export default CommunityQuestions
