import Layout from 'components/Layout'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import { Dialog } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import { dayFormat, dateToDays } from '../../utils'
import { useTopicMenu } from 'lib/useTopicMenu'
import PostLayout from 'components/PostLayout'
import SidebarSearchBox from 'components/Search/SidebarSearchBox'
import { useUser } from '../../hooks/useUser'
import useSWRInfinite from 'swr/infinite'
import slugify from 'slugify'
import { ChevronDownIcon } from '@heroicons/react/outline'

import { Listbox } from '@headlessui/react'

export default function Questions() {
    const { user } = useUser()
    const menu = useTopicMenu()
    const [showForm, setShowForm] = useState(false)
    const [sortBy, setSortBy] = useState<'newest' | 'activity' | 'popular'>('newest')

    const handleSqueakSubmit = () => {
        setShowForm(false)
    }

    const { data, size, setSize } = useSWRInfinite<any[]>(
        (offset) =>
            `https://squeak.cloud/api/v1/questions?organizationId=a898bcf2-c5b9-4039-82a0-a00220a8c626&start=${
                offset * 20
            }&perPage=20&published=true&sortBy=${sortBy}`,
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
                                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                        <div className="overflow-hidden border border-dashed border-gray-accent-light">
                                            <table className="min-w-full">
                                                <thead className="bg-gray-50 border-b border-gray-accent-light border-dashed">
                                                    <tr className="">
                                                        <th
                                                            scope="col"
                                                            className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                        >
                                                            Topic
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6"
                                                        >
                                                            Replies
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                        >
                                                            Activity
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-accent-light divide-dashed">
                                                    {questions.map((question) => {
                                                        const latestReply =
                                                            question.replies[question.replies.length - 1]

                                                        return (
                                                            <tr key={question.id} className="">
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6 space-y-2">
                                                                    <div className="flex items-center space-x-2">
                                                                        <Link to={`/questions/${question.permalink}`}>
                                                                            <span className="text-[16px]">
                                                                                {question.subject}
                                                                            </span>
                                                                        </Link>
                                                                        {question.topics.map(
                                                                            ({
                                                                                topic,
                                                                            }: {
                                                                                topic: { id: string; label: string }
                                                                            }) => {
                                                                                return (
                                                                                    <Link
                                                                                        key={topic.id}
                                                                                        to={`/questions/topics/${slugify(
                                                                                            topic.label,
                                                                                            { lower: true }
                                                                                        )}`}
                                                                                        className="bg-gray-accent-light text-gray px-1 py-0.5 rounded-sm"
                                                                                    >
                                                                                        {topic.label}
                                                                                    </Link>
                                                                                )
                                                                            }
                                                                        )}
                                                                    </div>
                                                                    <p className="max-w-xl break-words whitespace-normal line-clamp-2 text-sm opacity-90">
                                                                        {question.replies[0].body}
                                                                    </p>
                                                                    <a
                                                                        href={`/community/profiles/${question.profile.id}`}
                                                                        className="flex items-center space-x-1.5"
                                                                    >
                                                                        <div
                                                                            className={`w-5 h-5 overflow-hidden rounded-full`}
                                                                        >
                                                                            {question.profile.avatar ? (
                                                                                <img
                                                                                    className="w-full h-full"
                                                                                    alt=""
                                                                                    src={question.profile.avatar}
                                                                                />
                                                                            ) : (
                                                                                <svg
                                                                                    viewBox="0 0 40 40"
                                                                                    fill="none"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                >
                                                                                    <path
                                                                                        d="M20.0782 41.0392H5.42978C4.03134 41.0392 3.1173 40.1642 3.09386 38.7736C3.07823 37.7814 3.07042 36.797 3.10948 35.8048C3.15636 34.6329 3.72668 33.7345 4.74228 33.1798C8.0782 31.3595 11.4299 29.5783 14.7659 27.7658C15.0081 27.633 15.1565 27.758 15.3362 27.8517C18.1878 29.3439 21.0942 29.4689 24.0626 28.2267C24.1485 28.1955 24.2423 28.1721 24.3126 28.1096C24.9298 27.5861 25.4845 27.7971 26.1251 28.1486C29.1173 29.7971 32.1331 31.4143 35.1487 33.0238C36.4534 33.7191 37.094 34.766 37.0706 36.2426C37.0549 37.0785 37.0706 37.9067 37.0706 38.7426C37.0628 40.1254 36.1409 41.0395 34.7659 41.0395H20.0783L20.0782 41.0392Z"
                                                                                        fill="#BFBFBC"
                                                                                    ></path>
                                                                                    <path
                                                                                        d="M19.8359 27.0625C17.0859 26.9687 14.8047 25.6094 13.1251 23.1953C10.3751 19.2344 10.7032 13.6093 13.8516 10.0001C17.2735 6.08599 22.9452 6.10943 26.336 10.0469C29.9376 14.2345 29.711 20.8437 25.8126 24.6405C24.2188 26.1952 22.3126 27.0312 19.8362 27.0624L19.8359 27.0625Z"
                                                                                        fill="#BFBFBC"
                                                                                    ></path>
                                                                                </svg>
                                                                            )}
                                                                        </div>
                                                                        <span className="text-gray font-semibold">
                                                                            {question.profile.first_name}{' '}
                                                                            {question.profile.last_name}
                                                                        </span>
                                                                    </a>
                                                                </td>
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6 text-gray font-semibold">
                                                                    {question.replies.length - 1}
                                                                </td>
                                                                <td className="whitespace-nowrap p-4 text-sm text-gray-500 text-gray font-semibold">
                                                                    {dayFormat(dateToDays(latestReply.created_at))}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="py-2 border-l border-b border-r border-gray-accent-light border-dashed flex justify-center item-center">
                                    <button
                                        className="py-2 px-4 hover:bg-gray-accent-light text-gray font-semibold rounded"
                                        onClick={() => setSize((size) => size + 1)}
                                    >
                                        Load more
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </PostLayout>
        </Layout>
    )
}
