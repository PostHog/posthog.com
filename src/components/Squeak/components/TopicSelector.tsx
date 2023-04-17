import React from 'react'
import { Popover } from '@headlessui/react'
import { StrapiData, StrapiRecord, TopicData } from 'lib/strapi'
import useSWR from 'swr'
import qs from 'qs'

type TopicSelectorProps = {
    questionId: number
    onChooseTopic: (topicId: number) => void
}

type QuestionTopicsData = StrapiRecord<{
    topics: StrapiData<TopicData[]>
}>

export const TopicSelector = (props: TopicSelectorProps) => {
    const query = qs.stringify({
        populate: {
            fields: ['id'],
            topics: {
                fields: ['id', 'label', 'slug'],
            },
        },
    })

    const { data } = useSWR<QuestionTopicsData>(
        `${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/${props.questionId}?${query}`,
        async (url) => {
            const res = await fetch(url)
            const { data } = await res.json()
            return data
        }
    )

    return (
        <Popover className="relative">
            <Popover.Button className="flex items-center justify-center w-8 h-8 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">Open options</span>
            </Popover.Button>

            <Popover.Panel className="absolute z-10 w-screen max-w-md px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl lg:left-8 lg:right-8">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                        {data?.attributes?.topics?.data?.map((topic) => (
                            <a
                                key={topic.id}
                                href="#"
                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                onClick={() => props.onChooseTopic(topic.id)}
                            >
                                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                    {topic.attributes.label}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </Popover.Panel>
        </Popover>
    )
}
