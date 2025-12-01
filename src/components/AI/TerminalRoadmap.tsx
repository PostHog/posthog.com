import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { useRoadmaps } from 'hooks/useRoadmaps'
import Link from 'components/Link'

interface RoadmapItem {
    id: string
    strapiID: string
    title: string
    description: string
    projectedCompletion?: string
    complete?: boolean
}

export default function TerminalRoadmap(): JSX.Element {
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
        (roadmap: RoadmapItem) => !roadmap.projectedCompletion && !roadmap.complete
    )
    const inProgress = roadmaps.nodes.filter((roadmap: RoadmapItem) => roadmap.projectedCompletion && !roadmap.complete)
    const shipped = roadmaps.nodes.filter((roadmap: RoadmapItem) => roadmap.complete)

    const stripMarkdown = (text: string): string => {
        return text.replace(/[*_~`#]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 @2xl:grid-cols-3 gap-6">
                {/* Under Consideration */}
                <div className="space-y-3">
                    <div className="text-[#F1A82C] text-sm font-bold border-b border-[#F1A82C] pb-2">
                        [?] UNDER CONSIDERATION
                    </div>
                    {underConsideration
                        .filter((r: RoadmapItem) => !!r.description?.trim())
                        .slice(0, 3)
                        .map((roadmap: RoadmapItem) => {
                            const clientRoadmap = clientRoadmaps.find((r: any) => r.id === roadmap.strapiID)
                            const likeCount = clientRoadmap?.attributes?.likes?.data?.length || 0
                            return (
                                <div key={roadmap.id} className="space-y-1">
                                    <div className="flex items-start gap-2">
                                        {clientRoadmaps?.length > 0 && likeCount > 0 && (
                                            <span className="text-[#F1A82C] text-[12px] bg-[#F1A82C]/20 px-2 py-0.5 rounded shrink-0">
                                                {likeCount}★
                                            </span>
                                        )}
                                        <div className="flex-1">
                                            <div className="text-[rgba(238,239,233,0.9)] text-sm font-bold leading-tight">
                                                {roadmap.title.substring(0, 60)}
                                                {roadmap.title.length > 60 ? '...' : ''}
                                            </div>
                                            {roadmap.description && (
                                                <div className="text-[#666] text-[12px] leading-tight mt-1">
                                                    {stripMarkdown(roadmap.description).substring(0, 80)}...
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>

                {/* In Progress */}
                <div className="space-y-3">
                    <div className="text-[#F54E00] text-sm font-bold border-b border-[#F54E00] pb-2">
                        [→] IN PROGRESS
                    </div>
                    {inProgress.slice(0, 3).map((roadmap: RoadmapItem) => (
                        <div key={roadmap.id} className="space-y-1">
                            <div className="text-[rgba(238,239,233,0.9)] text-sm font-bold leading-tight">
                                {roadmap.title.substring(0, 60)}
                                {roadmap.title.length > 60 ? '...' : ''}
                            </div>
                            {roadmap.description && (
                                <div className="text-[#666] text-[12px] leading-tight">
                                    {stripMarkdown(roadmap.description).substring(0, 80)}...
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Shipped */}
                <div className="space-y-3">
                    <div className="text-[#00FF00] text-sm font-bold border-b border-[#00FF00] pb-2">[✓] SHIPPED</div>
                    {shipped.slice(0, 3).map((roadmap: RoadmapItem) => (
                        <div key={roadmap.id} className="space-y-1">
                            <div className="text-[rgba(238,239,233,0.9)] text-sm font-bold leading-tight">
                                {roadmap.title.substring(0, 60)}
                                {roadmap.title.length > 60 ? '...' : ''}
                            </div>
                            {roadmap.description && (
                                <div className="text-[#666] text-[12px] leading-tight">
                                    {stripMarkdown(roadmap.description).substring(0, 80)}...
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-[#333] text-[14px]">
                <span className="text-[#666]">Have opinions about what we should build next? </span>
                <Link
                    to="/roadmap"
                    className="text-[#1D4AFF] hover:text-[#F1A82C] underline"
                    state={{ newWindow: true }}
                >
                    Vote on our roadmap
                </Link>
            </div>
        </div>
    )
}
