import React, { useState } from 'react'

import { Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import SidebarSearchBox from 'components/Search/SidebarSearchBox'
import QuestionsTable from 'components/Questions/QuestionsTable'
import QuestionForm from 'components/Questions/QuestionForm'
import { useQuestions } from 'hooks/useQuestions'
import { graphql } from 'gatsby'
import Link from 'components/Link'
import { RightArrow } from 'components/Icons'
import SubscribeButton from 'components/Squeak/components/SubscribeButton'
import CommunityLayout from 'components/Community/Layout'

interface ITopic {
    label: string
    slug: string
}

interface IProps {
    data: {
        squeakTopic: {
            id: string
            squeakId: number
            label: string
        }
    }
    pageContext: {
        id: string
        topics: ITopic[]
        slug: string
    }
}

export default function Questions({ data, pageContext }: IProps) {
    const [sortBy, setSortBy] = useState<'newest' | 'activity' | 'popular'>('newest')

    const { questions, isLoading, refresh, fetchMore, hasMore } = useQuestions({
        limit: 20,
        sortBy,
        topicId: data?.squeakTopic?.squeakId,
    })

    return (
        <CommunityLayout title={data.squeakTopic.label}>
            <div className="max-w-6xl mx-auto space-y-8 pb-12">
                <section className="max-w-6xl mx-auto">
                    <div className="w-full flex items-center mb-8">
                        <Link
                            to={'/questions'}
                            className="flex space-x-1 p-1 pr-2 rounded hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark relative hover:scale-[1.005] active:scale-[1] hover:top-[-.5px] active:top-0"
                        >
                            <RightArrow className="-scale-x-100 w-6" />
                            <span className="text-primary dark:text-primary-dark text-[15px]">Topics</span>
                        </Link>
                        <div className="ml-auto">
                            <QuestionForm topicID={data?.squeakTopic?.squeakId} onSubmit={refresh} />
                        </div>
                    </div>
                    <div className="w-full sm:flex sm:items-center mb-4">
                        <div className="flex space-x-4 items-baseline">
                            <h1 className="text-4xl m-0">{data?.squeakTopic?.label} questions</h1>
                            <SubscribeButton
                                className="text-red font-bold disabled:text-black dark:disabled:text-white disabled:opacity-50"
                                contentType="topic"
                                id={data?.squeakTopic?.squeakId}
                            />
                        </div>
                    </div>
                    <div className="full">
                        <SidebarSearchBox filter="question" />
                    </div>

                    <div className="mt-8 flex flex-col">
                        <QuestionsTable
                            hasMore={hasMore}
                            className="sm:grid-cols-4"
                            questions={questions}
                            isLoading={isLoading}
                            fetchMore={fetchMore}
                            currentPage={{
                                title: `${data?.squeakTopic?.label} questions`,
                                url: `/questions/topic/${pageContext.slug}`,
                            }}
                        />
                    </div>
                </section>
            </div>
        </CommunityLayout>
    )
}

export const query = graphql`
    query ($id: String!) {
        squeakTopic(id: { eq: $id }) {
            id
            squeakId
            label
        }
    }
`
