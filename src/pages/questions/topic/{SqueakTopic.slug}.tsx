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
    const [sortBy, setSortBy] = useState<'newest' | 'activity' | 'popular'>('activity')

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
                        <div className="ml-auto sm:mt-0 mt-4 sm:w-32 z-50 relative">
                            <Listbox as="div" className="relative" value={sortBy} onChange={setSortBy}>
                                <Listbox.Label className="sr-only">Sort by</Listbox.Label>
                                <Listbox.Button className="relative w-full flex items-center py-2 px-3 text-left bg-white/50 rounded shadow-lg cursor-pointer text-sm text-gray border border-gray/30 dark:bg-gray-accent-dark">
                                    <span className="block truncate">
                                        {sortBy === 'newest'
                                            ? 'Newest'
                                            : sortBy === 'activity'
                                            ? 'Activity'
                                            : 'Popular'}
                                    </span>

                                    <ChevronDownIcon className="ml-auto w-4 h-4 pointer-events-none text-gray-accent-light" />
                                </Listbox.Button>

                                <Listbox.Options className="absolute z-10 w-full text-gray mt-1 py-1 text-sm border border-gray/30 overflow-auto text-base bg-white dark:bg-gray-accent-dark dark:text-white rounded shadow-lg max-h-60 focus:outline-none sm:text-sm list-none p-0">
                                    {['Newest', 'Activity', 'Popular'].map((option) => (
                                        <Listbox.Option
                                            key={option}
                                            className="px-2 py-1 text-sm hover:bg-red hover:text-white cursor-pointer"
                                            value={option.toLowerCase()}
                                        >
                                            {option}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Listbox>
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
                            sortBy={sortBy}
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
