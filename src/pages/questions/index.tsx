import React, { useState } from 'react'

import { useTopicMenu } from 'lib/useTopicMenu'
import { useUser } from '../../hooks/useUser'
import { Dialog, Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import SidebarSearchBox from 'components/Search/SidebarSearchBox'
import QuestionsTable from 'components/Questions/QuestionsTable'

export default function Questions() {
    const { user } = useUser()
    const menu = useTopicMenu()
    const [showForm, setShowForm] = useState(false)
    const [sortBy, setSortBy] = useState<'newest' | 'activity' | 'popular'>('newest')

    const handleSqueakSubmit = () => {
        setShowForm(false)
    }

    return (
        <Layout>
            <PostLayout title={'Questions'} menu={menu} hideSurvey>
                <SEO title={'Questions - PostHog'} />

                <div className="max-w-6xl mx-auto space-y-8 my-8">
                    <section>
                        <div className="space-y-2">
                            <h1 className="text-5xl m-0">Questions?</h1>
                            <p className="text-gray">We've got answers!</p>
                        </div>
                    </section>

                    <Dialog open={showForm} onClose={(isOpen) => setShowForm(isOpen)}>
                        <div className="fixed inset-0 bg-black opacity-30 z-40" />

                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <Dialog.Panel className="bg-white p-4 rounded-lg shadow w-full max-w-2xl">
                                <Dialog.Title>Ask a question</Dialog.Title>
                                <div className="flex items-center justify-center">{JSON.stringify(user)}</div>
                            </Dialog.Panel>
                        </div>
                    </Dialog>

                    <section className="pt-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="w-full sm:flex sm:items-center">
                                <div className="w-64">
                                    <SidebarSearchBox filter="question" />
                                </div>
                                <div className="ml-auto flex items-center space-x-3">
                                    <Listbox as="div" className="relative" value={sortBy} onChange={setSortBy}>
                                        <Listbox.Label className="sr-only">Sort by</Listbox.Label>
                                        <Listbox.Button className="relative w-32 flex items-center py-2 px-3 text-left bg-white rounded shadow-lg cursor-pointer text-sm text-gray border border-gray/30">
                                            <span className="block truncate">
                                                {sortBy === 'newest'
                                                    ? 'Newest'
                                                    : sortBy === 'activity'
                                                    ? 'Activity'
                                                    : 'Popular'}
                                            </span>

                                            <ChevronDownIcon className="ml-auto w-4 h-4 pointer-events-none text-gray-accent-light" />
                                        </Listbox.Button>

                                        <Listbox.Options className="absolute z-10 w-full text-gray mt-1 py-1 text-sm border border-gray/30 overflow-auto text-base bg-white rounded shadow-lg max-h-60 focus:outline-none sm:text-sm list-none p-0">
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
                                    <button
                                        type="button"
                                        className="flex-shrink-0 inline-flex items-center justify-center rounded border border-transparent bg-red px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2 sm:w-auto shadow-lg"
                                        onClick={() => setShowForm(true)}
                                    >
                                        Ask a question
                                    </button>
                                </div>
                            </div>
                            <div className="mt-8 flex flex-col">
                                <QuestionsTable sortBy={sortBy} />
                            </div>
                        </div>
                    </section>
                </div>
            </PostLayout>
        </Layout>
    )
}
