import React from 'react'
import { IconArrowRight } from '@posthog/icons'
import CommunityQuestionsList from './CommunityQuestionsList'
import OSButton2 from 'components/OSButton/OSButton2'
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

    const forumUrl = `/questions/topic/${slug}`

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <header className="mb-6 @md/reader-content:mb-8">
                <h2 className="text-3xl @md/reader-content:text-4xl font-bold text-primary m-0 leading-tight">
                    Community questions
                </h2>
                <p className="text-base text-secondary leading-relaxed m-0 mt-1">
                    Recent discussions in the {productData.name} forum
                </p>
            </header>

            <CommunityQuestionsList
                questions={questions}
                isLoading={isLoading}
                forumUrl={forumUrl}
                currentPage={{
                    title: productData.name,
                    url: `/${slug}`,
                }}
            />

            <div className="mt-6">
                <OSButton2 to={forumUrl} state={{ newWindow: true }}>
                    View all questions
                    <IconArrowRight className="size-4" />
                </OSButton2>
            </div>
        </section>
    )
}

export default CommunityQuestions
