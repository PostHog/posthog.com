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
        <Popover className="relative">
            <Popover.Button className="flex items-center justify-center text-gray-400 hover:text-gray-500 whitespace-nowrap">
                Add topic
            </Popover.Button>

            <Popover.Panel className="absolute z-10 w-64 h-80 px-4 mt-3 transform sm:px-0 right-0 overflow-y-scroll overscroll-contain bg-white rounded">
                <ol className="list-none p-0 py-1.5">
                    {data?.map((topic) => {
                        const isSelected = question?.attributes?.topics?.data?.find((t) => t.id === topic.id)

                        return (
                            <li key={topic.id}>
                                <button
                                    className="px-4 py-1.5 flex items-start rounded-lg hover:bg-gray-50"
                                    onClick={isSelected ? () => removeTopic(topic) : () => addTopic(topic)}
                                >
                                    {isSelected && <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" />}
                                    <div className="flex-shrink-0 flex items-center justify-center rounded-md whitespace-nowrap">
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
