import React, { useMemo, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import OSButton2 from 'components/OSButton/OSButton2'
import { useUser } from 'hooks/useUser'
import { useRoadmaps } from 'hooks/useRoadmaps'
import { useToast } from 'hooks/toast'
import { useApp } from '../../../../context/App'
import { IconArrowRight, IconThumbsUp, IconUndo } from '@posthog/icons'
import { SectionComponentProps } from '../types'
import { FilterTag } from '../helpers'

interface RoadmapAttrs {
    title: string
    description?: string
    projectedCompletion?: string | null
    likes?: { data?: Array<{ id: number | string }> }
    teams?: { data?: Array<{ attributes?: { name?: string; slug?: string } }> }
}

interface RoadmapItem {
    id: number
    attributes: RoadmapAttrs
}

const formatProjected = (value: string | null | undefined): string | null => {
    if (!value) return null
    const quarterMatch = value.match(/^(\d{4})-Q([1-4])$/)
    if (quarterMatch) return `Q${quarterMatch[2]} ${quarterMatch[1]}`
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const RoadmapRow = ({
    item,
    staticLikeCount,
    onVoted,
}: {
    item: RoadmapItem
    staticLikeCount: number
    onVoted: () => void
}) => {
    const { user, likeRoadmap } = useUser()
    const { openSignIn } = useApp()
    const { addToast } = useToast()
    const [pending, setPending] = useState(false)
    const roadmapLikes: Array<{ id: number }> = (user?.profile as any)?.roadmapLikes ?? []
    const liked = roadmapLikes.some(({ id }) => id === item.id)
    const dynamicLikeCount = item.attributes.likes?.data?.length ?? 0
    const likeCount = dynamicLikeCount + staticLikeCount
    const projected = formatProjected(item.attributes.projectedCompletion)

    const onVote = async () => {
        if (!user) {
            openSignIn()
            return
        }
        setPending(true)
        const wasLiked = liked
        try {
            await likeRoadmap({ id: item.id, title: item.attributes.title, user, unlike: wasLiked })
            onVoted()
            addToast({
                title: wasLiked ? 'Vote removed' : 'Voted!',
                description: wasLiked
                    ? `Your vote on "${item.attributes.title}" has been removed.`
                    : `Thanks for voting on "${item.attributes.title}".`,
            })
        } finally {
            setPending(false)
        }
    }

    return (
        <li className="m-0 py-4 flex gap-4 border-b border-primary last:border-b-0">
            <div className="shrink-0 w-12 text-center pt-0.5">
                <div className="font-bold text-lg leading-none text-primary">{likeCount}</div>
                <div className="text-xs text-secondary mt-0.5">vote{likeCount === 1 ? '' : 's'}</div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h4 className="text-base font-semibold m-0 leading-snug text-primary">{item.attributes.title}</h4>
                    {projected && <FilterTag>{projected}</FilterTag>}
                </div>
                {item.attributes.description && (
                    <p className="text-sm text-secondary m-0 mt-1 leading-relaxed line-clamp-3">
                        {item.attributes.description.replace(/<[^>]+>/g, '')}
                    </p>
                )}
                <div className="mt-2">
                    <CallToAction disabled={pending} onClick={onVote} size="sm" type={liked ? 'outline' : 'primary'}>
                        <span className="flex items-center gap-1.5">
                            {liked ? (
                                <>
                                    <IconUndo className="size-4" />
                                    <span>Unvote</span>
                                </>
                            ) : (
                                <>
                                    <IconThumbsUp className="size-4" />
                                    <span>Vote</span>
                                </>
                            )}
                        </span>
                    </CallToAction>
                </div>
            </div>
        </li>
    )
}

const Roadmap = ({ id, productData }: SectionComponentProps) => {
    const teamSlug = (productData as any)?.teamSlug
    if (!teamSlug) return null

    const { allSqueakRoadmap, allSqueakTeam } = useStaticQuery(graphql`
        query ProductRoadmapSectionQuery {
            allSqueakRoadmap {
                nodes {
                    squeakId
                    githubPages {
                        reactions {
                            total_count
                        }
                    }
                }
            }
            allSqueakTeam {
                nodes {
                    name
                    slug
                }
            }
        }
    `)

    const team = allSqueakTeam.nodes.find((t: { name: string; slug: string }) => t.slug === teamSlug)

    // Match the /roadmap page's "Under consideration" filter exactly: not yet
    // started (no projectedCompletion) and not completed (no dateCompleted).
    const { roadmaps, isLoading, mutate } = useRoadmaps({
        params: {
            filters: {
                dateCompleted: { $null: true },
                projectedCompletion: { $null: true },
                ...(team ? { teams: { name: { $eq: team.name } } } : {}),
            },
        },
        limit: 100,
    })

    const staticLikeCounts = useMemo(() => {
        const map = new Map<number, number>()
        for (const node of allSqueakRoadmap.nodes as Array<{
            squeakId: number
            githubPages?: Array<{ reactions?: { total_count?: number } }>
        }>) {
            map.set(node.squeakId, node.githubPages?.[0]?.reactions?.total_count ?? 0)
        }
        return map
    }, [allSqueakRoadmap.nodes])

    const sortedItems: RoadmapItem[] = useMemo(() => {
        const items = (roadmaps as RoadmapItem[]) ?? []
        return [...items].sort((a, b) => {
            const aTotal = (a.attributes.likes?.data?.length ?? 0) + (staticLikeCounts.get(a.id) ?? 0)
            const bTotal = (b.attributes.likes?.data?.length ?? 0) + (staticLikeCounts.get(b.id) ?? 0)
            return bTotal - aTotal
        })
    }, [roadmaps, staticLikeCounts])

    if (!team) return null

    const onVoted = () => {
        mutate()
    }

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-3">Roadmap</h2>
            <p className="text-base text-secondary leading-relaxed m-0 mb-6">
                What the {team.name} Team is considering next. Vote for the things you'd like to see.
            </p>
            {isLoading && !sortedItems.length ? (
                <div className="flex flex-col gap-3">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="h-20 w-full bg-accent rounded animate-pulse" />
                    ))}
                </div>
            ) : sortedItems.length ? (
                <ul className="list-none m-0 p-0">
                    {sortedItems.map((item) => (
                        <RoadmapRow
                            key={item.id}
                            item={item}
                            staticLikeCount={staticLikeCounts.get(item.id) ?? 0}
                            onVoted={onVoted}
                        />
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-secondary italic m-0">Nothing under consideration right now.</p>
            )}
            <div className="mt-6">
                <OSButton2 to={`/roadmap?team=${encodeURIComponent(team.name)}`} state={{ newWindow: true }}>
                    View full roadmap
                    <IconArrowRight className="size-4" />
                </OSButton2>
            </div>
        </section>
    )
}

export default Roadmap
