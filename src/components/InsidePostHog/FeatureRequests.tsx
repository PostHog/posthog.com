import { CallToAction } from 'components/CallToAction'
import { VoteBox } from 'components/Roadmap'
import { graphql, useStaticQuery } from 'gatsby'
import { useRoadmaps } from 'hooks/useRoadmaps'
import React from 'react'

const Skeleton = () => {
    return new Array(3).fill(0).map((_, index) => {
        return <div className="h-16 w-full bg-accent rounded-md animate-pulse mb-2" key={index} />
    })
}

export default function FeatureRequests() {
    const { staticRoadmaps } = useStaticQuery(graphql`
        {
            staticRoadmaps: allSqueakRoadmap {
                nodes {
                    githubPages {
                        reactions {
                            total_count
                        }
                    }
                    squeakId
                }
            }
        }
    `)

    const { isLoading, ...other } = useRoadmaps({
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

    const roadmaps = other.roadmaps.map(({ id, attributes }) => {
        const likeCount = attributes?.likes?.data?.length || 0
        const staticLikeCount =
            staticRoadmaps.nodes.find((node) => node.squeakId === id)?.githubPages?.[0]?.reactions?.total_count || 0
        return { id, attributes: { ...attributes, likeCount: likeCount + staticLikeCount } }
    })

    return (
        <div className="border-y border-primary pt-4 @lg:border-b-0">
            <h3 className="text-lg">Latest feature requests</h3>
            {isLoading ? (
                <Skeleton />
            ) : (
                <ul className="list-none m-0 p-0 space-y-2 mt-2 mb-4">
                    {[...roadmaps]
                        .sort((a, b) => b.attributes?.likeCount - a.attributes?.likeCount)
                        .slice(0, 3)
                        .map((roadmap) => {
                            const likeCount = roadmap?.attributes?.likes?.data?.length || 0
                            const staticLikeCount =
                                staticRoadmaps.nodes.find((node) => node.squeakId === roadmap.id)?.githubPages?.[0]
                                    ?.reactions?.total_count || 0
                            const totalLikes = likeCount + staticLikeCount
                            return (
                                <li key={roadmap.squeakId} className="flex flex-wrap gap-1">
                                    <h4 className="text-base m-0 leading-tight flex-[1_0_100%]">
                                        {roadmap?.attributes?.title}
                                    </h4>
                                    <VoteBox likeCount={totalLikes} />
                                </li>
                            )
                        })}
                </ul>
            )}
            <CallToAction
                to="/roadmap"
                type="secondary"
                size="sm"
                state={{ newWindow: true }}
                width="[calc(100%_+_3px)]"
            >
                Vote on the roadmap
            </CallToAction>
        </div>
    )
}
