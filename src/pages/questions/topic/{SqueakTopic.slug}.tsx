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
import useTopicsNav from '../../../navs/useTopicsNav'

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
        filters: {
            pinnedTopics: {
                id: {
                    $null: true,
                },
            },
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

    const { questions: pinnedQuestions } = useQuestions({
        limit: 5,
        sortBy,
        filters: {
            pinnedTopics: {
                id: {
                    $eq: data?.squeakTopic?.squeakId,
                },
            },
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

    const topicsNav = useTopicsNav()

    return (
        <CommunityLayout menu={topicsNav} title={data.squeakTopic.label}>
            <section className="max-w-screen-4xl space-y-8 pb-12 -mx-3 lg:-mx-4 xl:-mx-10">
                <div className="w-full flex items-center mb-8">
                    <Link
                        to={'/questions'}
                        className="inline-flex space-x-1 items-center relative px-2 pt-1.5 pb-1 mb-1 rounded border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
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
                            <Listbox.Button className="relative w-full flex items-center py-2 px-3 text-left bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded cursor-pointer text-sm">
                                <span className="block truncate">
                                    {sortBy === 'newest' ? 'Newest' : sortBy === 'activity' ? 'Activity' : 'Popular'}
                                </span>

                                <ChevronDownIcon className="ml-auto w-4 h-4 pointer-events-none text-primary/50 dark:text-primary-dark/50" />
                            </Listbox.Button>

                            <Listbox.Options className="absolute z-10 mt-1 w-full text-primary dark:text-primary-dark py-1 border border-light dark:border-dark overflow-auto bg-white dark:bg-gray-accent-dark rounded max-h-60 focus:outline-none sm:text-sm list-none p-0">
                                {['Newest', 'Activity', 'Popular'].map((option) => (
                                    <Listbox.Option
                                        key={option}
                                        className="px-2 py-1 !text-sm hover:bg-red hover:text-white cursor-pointer"
                                        value={option.toLowerCase()}
                                    >
                                        {option}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Listbox>
                    </div>
                </div>
                <SidebarSearchBox filter="question" />
                <div className="mt-8 flex flex-col">
                    <QuestionsTable
                        hasMore={hasMore}
                        className="sm:grid-cols-4"
                        questions={questions}
                        isLoading={isLoading}
                        fetchMore={fetchMore}
                        sortBy={sortBy}
                        currentPage={{
                            title: data?.squeakTopic?.label,
                            url: `/questions/topic/${pageContext.slug}`,
                        }}
                        pinnedQuestions={pinnedQuestions}
                    />
                </div>
            </section>
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
