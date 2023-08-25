import React from 'react'
import { Popover } from '@headlessui/react'
import { StrapiRecord, TopicData } from 'lib/strapi'
import useSWR from 'swr'
import { CheckIcon } from '@heroicons/react/outline'
import { useQuestion } from '../hooks/useQuestion'

type TopicSelectorProps = {
    questionId: number
    permalink: string
}

export const TopicSelector = (props: TopicSelectorProps) => {
    const { data } = useSWR<StrapiRecord<TopicData>[]>(
        `${process.env.GATSBY_SQUEAK_API_HOST}/api/topics?sort=label:asc&pagination[pageSize]=100`,
        async (url) => {
            const res = await fetch(url)
            const { data } = await res.json()
            return data
        }
    )

    const { question, addTopic, removeTopic } = useQuestion(props.permalink)

    return (
        <Popover className="block relative">
            <Popover.Button className="text-red dark:text-yellow text-sm font-bold flex items-center justify-center text-gray-400 hover:text-gray-500 whitespace-nowrap">
                Add topics
            </Popover.Button>

            <Popover.Panel className="fixed z-[9999] text-black mb-0 w-64 top-[5vh] h-[90vh] px-4 mt-3 transform sm:px-0 overflow-y-scroll overscroll-contain bg-white dark:bg-accent-dark rounded border border-light dark:border-dark shadow-sm">
                <ol className="list-none p-0 m-0">
                    {data?.map((topic) => {
                        const isSelected = question?.attributes?.topics?.data?.find((t) => t.id === topic.id)

                        return (
                            <li key={topic.id} className="m-0 p-0">
                                <button
                                    className="w-full border-b border-light dark:border-dark text-sm px-3 py-1.5 flex items-center space-x-2 hover:bg-gray-accent-light dark:hover:bg-black/30 dark:text-white"
                                    onClick={isSelected ? () => removeTopic(topic) : () => addTopic(topic)}
                                >
                                    {isSelected ? (
                                        <CheckIcon className="flex-shrink-0 h-5 w-5 text-red dark:text-yellow" />
                                    ) : (
                                        <div className="flex-shrink-0 h-5 w-5" />
                                    )}
                                    <div
                                        className={`flex-shrink-0 flex items-center justify-center rounded-md whitespace-nowrap ${
                                            isSelected && 'font-bold'
                                        }`}
                                    >
                                        {topic.attributes.label}
                                    </div>
                                </button>
                            </li>
                        )
                    })}
                </ol>
            </Popover.Panel>
        </Popover>
    )
}
