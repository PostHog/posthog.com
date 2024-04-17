import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import { topicIcons } from 'components/Questions/TopicsTable'
import dayjs from 'dayjs'
import { useRoadmaps } from 'hooks/useRoadmaps'
import React from 'react'
import slugify from 'slugify'

export default function Changelog() {
    const { roadmaps } = useRoadmaps({
        params: {
            pagination: { limit: 3 },
            sort: { createdAt: 'desc' },
            filters: {
                complete: {
                    $eq: true,
                },
                topic: {
                    id: {
                        $notNull: true,
                    },
                },
            },
        },
    })

    return (
        <div>
            <h3 className="m-0">Changelog</h3>
            <p className="m-0 opacity-70 mb-4">Here's what we've shipped in the last two weeks.</p>
            <ul className="list-none p-0 m-0 space-y-2">
                {roadmaps.map((roadmap) => {
                    const { title, squeakId, dateCompleted, image, topic, teams } = roadmap?.attributes
                    const topicName = topic?.data?.attributes?.label
                    const Icon = topicIcons[topicName?.toLowerCase()]
                    const imageURL = image?.data?.attributes?.formats?.small?.url

                    return (
                        <li key={squeakId}>
                            <Link
                                className="grid md:grid-cols-8 gap-x-4 items-center text-inherit hover:text-inherit"
                                to={`/changelog/${dayjs(dateCompleted).year()}#${slugify(title, { lower: true })}`}
                            >
                                <div className="md:col-span-5 py-8">
                                    <p className="m-0 font-bold opacity-50 flex space-x-1 items-center">
                                        {Icon && (
                                            <span>
                                                <Icon className="w-4" />
                                            </span>
                                        )}
                                        <span>{topicName}</span>
                                    </p>
                                    <h4 className="m-0">{title}</h4>
                                    <p className="m-0 font-bold opacity-50">
                                        {teams?.data?.[0]?.attributes?.name} Team
                                    </p>
                                </div>
                                {imageURL && (
                                    <div className="relative md:h-full md:col-span-3 overflow-hidden flex items-center">
                                        <img className="object-contain md:absolute" src={imageURL} alt={title} />
                                    </div>
                                )}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <CallToAction to={`/changelog/${dayjs().year()}`} type="secondary" size="sm" width="[calc(100%_+_3px)]">
                Visit changelog
            </CallToAction>
        </div>
    )
}
