import React from 'react'
import { Popover } from '@headlessui/react'
import { StrapiData, StrapiRecord, TopicData } from 'lib/strapi'
import useSWR from 'swr'
import qs from 'qs'
import { CheckIcon } from '@heroicons/react/outline'

type TopicSelectorProps = {
    questionId: number
    selected?: StrapiData<TopicData[]>
    onChooseTopic?: (topicId: number) => void
}

export const TopicSelector = (props: TopicSelectorProps) => {
    const { data } = useSWR<StrapiRecord<TopicData>[]>(
        `${process.env.GATSBY_SQUEAK_API_HOST}/api/topics?sort=label:asc`,
        async (url) => {
            const res = await fetch(url)
            const { data } = await res.json()
            return data
        }
    )

    console.log(data)

    return (
        <Popover className="relative">
            <Popover.Button className="flex items-center justify-center text-gray-400 hover:text-gray-500 whitespace-nowrap">
                Add topic
            </Popover.Button>

            <Popover.Panel className="absolute z-10 w-64 h-80 px-4 mt-3 transform sm:px-0 right-0 overflow-y-scroll overscroll-contain bg-white rounded">
                <ol className="list-none p-0 py-1.5">
                    {data?.map((topic) => (
                        <li key={topic.id}>
                            <a
                                href="#"
                                className="px-4 py-1.5 flex items-start rounded-lg hover:bg-gray-50"
                                onClick={() => props?.onChooseTopic(topic.id)}
                            >
                                {props?.selected?.data?.find((t) => t.id === topic.id) && (
                                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" />
                                )}
                                <div className="flex-shrink-0 flex items-center justify-center rounded-md whitespace-nowrap">
                                    {topic.attributes.label}
                                </div>
                            </a>
                        </li>
                    ))}
                </ol>
            </Popover.Panel>
        </Popover>
    )
}
