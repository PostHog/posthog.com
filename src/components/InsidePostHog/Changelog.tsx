import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import { topicIcons } from 'components/Questions/TopicsTable'
import { useRoadmaps } from 'hooks/useRoadmaps'
import React from 'react'

type RoadmapItem = {
    id: number
    attributes?: {
        title?: string
        image?: {
            data?: {
                attributes?: {
                    formats?: {
                        small?: {
                            url?: string
                        }
                    }
                }
            }
        }
        topic?: {
            data?: {
                attributes?: {
                    label?: string
                }
            }
        }
        teams?: {
            data?: Array<{
                attributes?: {
                    name?: string
                }
            }>
        }
    }
}

export default function Changelog(): JSX.Element {
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
        <div className="pt-4">
            <h3 className="m-0">Changelog</h3>
            <p className="m-0 opacity-70 mb-4">Here's what we've shipped in the last two weeks.</p>
            <ul className="list-none p-0 m-0 space-y-4 @lg:space-y-4 mb-4">
                {roadmaps.map((roadmap: RoadmapItem) => {
                    const { title, image, topic, teams } = roadmap?.attributes || {}
                    const topicName = topic?.data?.attributes?.label
                    const topicKey = topicName?.toLowerCase() as keyof typeof topicIcons | undefined
                    const Icon = topicKey ? topicIcons[topicKey] : null
                    const imageURL = image?.data?.attributes?.formats?.small?.url

                    return (
                        <li key={roadmap.id} className="border-t border-primary first:border-t-0 pt-4">
                            <Link
                                className="grid md:grid-cols-8 gap-x-4 items-center text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark"
                                to={`/changelog?id=${roadmap.id}`}
                            >
                                <div className="md:col-span-5">
                                    <p className="m-0 opacity-50 flex space-x-1 items-center text-[15px]">
                                        {Icon && (
                                            <span>
                                                <Icon className="w-4" />
                                            </span>
                                        )}
                                        <span>{topicName}</span>
                                    </p>
                                    <h4 className="my-1 @lg:m-0 text-lg leading-tight text-red hover:text-red dark:text-yellow dark:hover:text-yellow">
                                        {title}
                                    </h4>
                                    <p className="m-0 opacity-50 text-[15px]">
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
            <CallToAction to="/changelog" type="secondary" size="md" width="[calc(100%_+_3px)]">
                Visit changelog
            </CallToAction>
        </div>
    )
}
