import React, { useState } from 'react'
import { useRoadmaps } from 'hooks/useRoadmaps'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import removeMarkdown from 'remove-markdown'

interface RoadmapRowProps {
    roadmap: {
        id: number
        attributes: {
            title: string
            description?: string
            likes?: {
                data?: any[]
            }
            teams?: {
                data?: Array<{
                    attributes: {
                        slug: string
                        name: string
                        miniCrest?: {
                            data?: {
                                attributes?: {
                                    url: string
                                }
                            }
                        }
                    }
                }>
            }
        }
    }
}

const RoadmapRow: React.FC<RoadmapRowProps> = ({ roadmap }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const { attributes } = roadmap
    const team = attributes.teams?.data?.[0]?.attributes
    const teamName = team?.name
    const plainDescription = removeMarkdown(attributes.description || '')
    const shouldShowExpandButton = plainDescription.length > 125

    return (
        <tr className="border-b last:border-b-0 border-light dark:border-dark">
            <td className="p-2 !pl-5 md:!pl-2 align-top text-center">
                <div className="leading-none text-xl font-bold bg-accent dark:bg-accent-dark flex flex-col items-center justify-center p-2">
                    {attributes.likes?.data?.length || 0}
                    <div className="text-sm opacity-80 font-normal">votes</div>
                </div>
            </td>
            <td className="p-2">
                <div className="font-bold leading-snug pb-0.5">{attributes.title}</div>
                <div className="sm:hidden pt-0.5 pb-1">
                    {team && (
                        <Link to={`/teams/${team.slug}`} className="flex items-center gap-1">
                            <div className="w-6 h-6">
                                {team?.miniCrest && (
                                    <CloudinaryImage
                                        alt={`${teamName} Team`}
                                        className="w-6 h-6"
                                        src={
                                            team.miniCrest.data?.attributes?.url ||
                                            'https://res.cloudinary.com/dmukukwp6/image/upload/crest_mini_default_def12aa14a.png'
                                        }
                                    />
                                )}
                            </div>
                            <span className="whitespace-nowrap">{teamName} Team</span>
                        </Link>
                    )}
                </div>
                <div className={`text-sm opacity-75 ${!isExpanded ? 'line-clamp-2' : ''}`}>{plainDescription}</div>
                {shouldShowExpandButton &&
                    (isExpanded ? (
                        <Link to={`/roadmap`} className="text-red dark:text-yellow font-semibold text-sm">
                            Visit roadmap
                        </Link>
                    ) : (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-red dark:text-yellow font-semibold text-sm"
                        >
                            Read more
                        </button>
                    ))}
            </td>
            <td className="hidden sm:table-cell p-2 align-top">
                {team && (
                    <Link to={`/teams/${team.slug}`} className="flex items-center gap-1">
                        <div className="w-6 h-6">
                            {team?.miniCrest && (
                                <CloudinaryImage
                                    alt={`${teamName} Team`}
                                    className="w-6 h-6"
                                    src={
                                        team.miniCrest.data?.attributes?.url ||
                                        'https://res.cloudinary.com/dmukukwp6/image/upload/crest_mini_default_def12aa14a.png'
                                    }
                                />
                            )}
                        </div>
                        <span className="whitespace-nowrap">{teamName}</span>
                    </Link>
                )}
            </td>
        </tr>
    )
}

const RoadmapPreview = () => {
    const { roadmaps, isLoading } = useRoadmaps({
        params: {
            filters: {
                dateCompleted: {
                    $null: true,
                },
                projectedCompletion: {
                    $null: true,
                },
            },
        },
    })

    const topRoadmaps = [...roadmaps]
        .sort((a, b) => (b.attributes?.likes?.data?.length || 0) - (a.attributes?.likes?.data?.length || 0))
        .slice(0, 5)

    return isLoading ? (
        <div className="space-y-2">
            <div className="h-6 bg-accent dark:bg-accent-dark rounded w-full animate-pulse" />
            <div className="h-6 bg-accent dark:bg-accent-dark rounded w-full animate-pulse" />
            <div className="h-6 bg-accent dark:bg-accent-dark rounded w-full animate-pulse" />
            <div className="h-6 bg-accent dark:bg-accent-dark rounded w-full animate-pulse" />
            <div className="h-6 bg-accent dark:bg-accent-dark rounded w-full animate-pulse" />
        </div>
    ) : (
        <div className="overflow-x-auto -mx-5 md:mx-0">
            <table className="w-full border-collapse !mb-1">
                <thead>
                    <tr className="bg-accent dark:bg-accent-dark">
                        <th className="p-2 !pl-5 md:!pl-2 w-18 text-center">Votes</th>
                        <th className="p-2 text-left">Feature</th>
                        <th className="p-2 text-left hidden sm:table-cell">Team</th>
                    </tr>
                </thead>
                <tbody>
                    {topRoadmaps.map((roadmap) => (
                        <RoadmapRow key={roadmap.id} roadmap={roadmap} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RoadmapPreview
