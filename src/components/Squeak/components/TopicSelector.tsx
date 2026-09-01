import React from 'react'
import { Popover } from 'components/RadixUI/Popover'
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
        <Popover
            dataScheme="primary"
            align="end"
            contentClassName="w-64 max-h-[var(--radix-popover-content-available-height)]"
            trigger={
                <button className="text-red dark:text-yellow text-sm font-bold flex items-center justify-center hover:text-gray-500 whitespace-nowrap">
                    Add topics
                </button>
            }
        >
            <ol className="list-none p-0 m-0">
                {data?.map((topic) => {
                    const isSelected = question?.attributes?.topics?.data?.find((t) => t.id === topic.id)

                    return (
                        <li key={topic.id} className="m-0 p-0">
                            <button
                                aria-pressed={Boolean(isSelected)}
                                className="w-full border-b border-primary text-sm px-3 py-1.5 flex items-center space-x-2 hover:bg-accent dark:hover:bg-black/30"
                                onClick={isSelected ? () => removeTopic(topic) : () => addTopic(topic)}
                            >
                                {isSelected ? (
                                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-red dark:text-yellow" />
                                ) : (
                                    <div className="flex-shrink-0 h-5 w-5" />
                                )}
                                <div className={`min-w-0 flex items-center rounded-md ${isSelected && 'font-bold'}`}>
                                    {topic.attributes.label}
                                </div>
                            </button>
                        </li>
                    )
                })}
            </ol>
        </Popover>
    )
}
