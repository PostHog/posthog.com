import React from 'react'
import Markdown from 'components/Squeak/components/Markdown'
import { IconCheck } from '@posthog/icons'
import Link from 'components/Link'
import { graphql, useStaticQuery } from 'gatsby'
import { useRoadmaps } from 'hooks/useRoadmaps'

interface RoadmapItem {
    id: string
    strapiID: string
    title: string
    description: string
    projectedCompletion?: string
    complete?: boolean
}

export default function CustomRoadmapSlide(): JSX.Element {
    const { roadmaps: clientRoadmaps } = useRoadmaps({
        params: {
            filters: {
                $or: [
                    {
                        teams: {
                            name: {
                                $eq: 'PostHog AI',
                            },
                        },
                    },
                ],
            },
        },
    })
    const { roadmaps } = useStaticQuery(graphql`
        {
            roadmaps: allRoadmap(
                filter: { teams: { data: { elemMatch: { attributes: { name: { eq: "PostHog AI" } } } } } }
            ) {
                nodes {
                    id
                    strapiID
                    title
                    description
                    projectedCompletion
                    complete
                }
            }
        }
    `)

    const underConsideration = roadmaps.nodes.filter(
        (roadmap: any) => !roadmap.projectedCompletion && !roadmap.complete
    )
    const inProgress = roadmaps.nodes.filter((roadmap: any) => roadmap.projectedCompletion && !roadmap.complete)
    const shipped = roadmaps.nodes.filter((roadmap: any) => roadmap.complete)

    return (
        <div data-scheme="primary" className="h-full bg-primary text-primary p-4 @md:p-8 overflow-auto">
            <h2 className="text-3xl @md:text-4xl font-bold mb-6 text-center">Roadmap</h2>

            <div className="grid @lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                {/* Under Consideration */}
                <div className="border border-primary rounded overflow-hidden">
                    <h3 className="text-sm @md:text-base text-center bg-accent px-4 py-2 mb-0 font-semibold">
                        Under consideration
                    </h3>
                    <div className="divide-y divide-primary overflow-y-auto">
                        {underConsideration
                            .filter((r) => !!r.description?.trim())
                            .slice(0, 3)
                            .map((roadmap: RoadmapItem) => {
                                const clientRoadmap = clientRoadmaps.find((r: any) => r.id === roadmap.strapiID)
                                const likeCount = clientRoadmap?.attributes?.likes?.data?.length || 0
                                return (
                                    <div key={roadmap.id} className="p-3">
                                        <div className="flex gap-2">
                                            <div className="shrink-0">
                                                <div className="bg-[#F5E2B2] rounded px-2 py-1 text-xs font-semibold">
                                                    <span className={clientRoadmaps?.length > 0 ? '' : 'opacity-0'}>
                                                        {likeCount}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold mb-1 leading-tight truncate">
                                                    {roadmap.title}
                                                </h4>
                                                <div className="text-xs line-clamp-2">
                                                    <Markdown>{roadmap.description}</Markdown>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>

                {/* In Progress */}
                <div className="border border-primary rounded overflow-hidden">
                    <h3 className="text-sm @md:text-base text-center bg-orange text-white px-4 py-2 mb-0 font-semibold">
                        In progress
                    </h3>
                    <div className="divide-y divide-primary overflow-y-auto">
                        {inProgress.slice(0, 3).map((roadmap: RoadmapItem) => (
                            <div key={roadmap.id} className="p-3">
                                <div className="flex gap-2">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold mb-1 leading-tight truncate">
                                            {roadmap.title}
                                        </h4>
                                        <div className="text-xs line-clamp-2">
                                            <Markdown>{roadmap.description}</Markdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shipped */}
                <div className="border border-primary rounded overflow-hidden">
                    <h3 className="text-sm @md:text-base text-center bg-green px-4 py-2 mb-0 font-semibold text-white">
                        Shipped
                    </h3>
                    <div className="divide-y divide-primary overflow-y-auto">
                        {shipped.slice(0, 3).map((roadmap: RoadmapItem) => (
                            <div key={roadmap.id} className="p-3">
                                <div className="flex gap-2">
                                    <div className="shrink-0">
                                        <IconCheck className="w-4 h-4 text-green" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold mb-1 leading-tight">{roadmap.title}</h4>
                                        <div className="text-xs line-clamp-2">
                                            <Markdown>{roadmap.description}</Markdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center mt-6">
                <p className="text-sm text-secondary">
                    Have opinions about what we should build next?{' '}
                    <Link to="/roadmap" className="text-primary underline" state={{ newWindow: true }}>
                        Vote on our roadmap.
                    </Link>
                </p>
            </div>
        </div>
    )
}
