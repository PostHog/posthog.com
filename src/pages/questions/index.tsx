import React, { useState } from 'react'

import { Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import useSWRInfinite from 'swr/infinite'

import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { community } from '../../sidebars/sidebars.json'
import PostLayout from 'components/PostLayout'
import SidebarSearchBox from 'components/Search/SidebarSearchBox'
import QuestionsTable from 'components/Questions/QuestionsTable'
import QuestionForm from 'components/Questions/QuestionForm'

export default function Questions() {
    const [sortBy, setSortBy] = useState<'newest' | 'activity' | 'popular'>('newest')

    const { data, size, setSize, isLoading, mutate } = useSWRInfinite<any[]>(
        (offset) =>
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/v1/questions?organizationId=${
                process.env.GATSBY_SQUEAK_ORG_ID
            }&start=${offset * 20}&perPage=20&published=true&sortBy=${sortBy}`,
        (url: string) =>
            fetch(url)
                .then((r) => r.json())
                .then((r) => r.questions)
    )

    const questions = React.useMemo(() => {
        return data?.flat() || []
    }, [size, data])

    return (
        <Layout>
            <PostLayout title={'Questions'} menu={community} hideSurvey>
                <SEO title={'Questions - PostHog'} />

                <div className="max-w-6xl mx-auto space-y-8 my-8">
                    <section>
                        <div className="space-y-2">
                            <h1 className="text-5xl m-0">Questions?</h1>
                            <p className="text-gray">We've got answers!</p>
                        </div>
                    </section>

                    <section className="max-w-6xl mx-auto">
                        <div className="w-full sm:flex sm:items-center">
                            <div className="w-64">
                                <SidebarSearchBox filter="question" />
                            </div>
                            <div className="ml-auto flex items-center space-x-3">
                                <Listbox as="div" className="relative" value={sortBy} onChange={setSortBy}>
                                    <Listbox.Label className="sr-only">Sort by</Listbox.Label>
                                    <Listbox.Button className="relative w-32 flex items-center py-2 px-3 text-left bg-white/50 rounded shadow-lg cursor-pointer text-sm text-gray border border-gray/30 dark:bg-gray-accent-dark">
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

                                <QuestionForm onSubmit={() => mutate()} />
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col">
                            <QuestionsTable questions={questions} size={size} setSize={setSize} isLoading={isLoading} />
                        </div>
                    </section>
                </div>
            </PostLayout>
        </Layout>
    )
}
