import React from 'react'
import { IconArrowRight } from '@posthog/icons'
import Link from 'components/Link'
import CommunityQuestionsList from './CommunityQuestionsList'
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
            <header className="mb-6 @md/reader-content:mb-8 flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-3xl @md/reader-content:text-4xl font-bold text-primary m-0 leading-tight">
                        Community questions
                    </h2>
                    <p className="text-base text-secondary leading-relaxed m-0 mt-1">
                        The 10 most recently active discussions in the {productData.name} forum.
                    </p>
                </div>
                <Link
                    to={forumUrl}
                    state={{ newWindow: true }}
                    className="shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-red dark:text-yellow hover:underline mt-1"
                >
                    View all
                    <IconArrowRight className="size-4" />
                </Link>
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
        </section>
    )
}

export default CommunityQuestions
