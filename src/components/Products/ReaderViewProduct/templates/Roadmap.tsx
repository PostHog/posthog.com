import React, { useMemo, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../../../context/App'
import { IconArrowRight, IconThumbsUp, IconUndo } from '@posthog/icons'
import { SectionComponentProps } from '../types'
import { FilterTag } from '../helpers'

interface RoadmapNode {
    id: number
    title: string
    description?: string
    projectedCompletion?: string | null
    teams?: { data?: Array<{ attributes?: { name?: string } }> }
}

interface StaticReactionNode {
    squeakId: number
    githubPages?: Array<{ reactions?: { total_count?: number } }>
}

const formatProjected = (value: string | null | undefined): string | null => {
    if (!value) return null
    const quarterMatch = value.match(/^(\d{4})-Q([1-4])$/)
    if (quarterMatch) return `Q${quarterMatch[2]} ${quarterMatch[1]}`
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const RoadmapRow = ({ item, baseLikeCount }: { item: RoadmapNode; baseLikeCount: number }) => {
    const { user, likeRoadmap } = useUser()
    const { openSignIn } = useApp()
    const initiallyLiked = user?.profile?.roadmapLikes?.some(({ id }: { id: number }) => id === item.id) ?? false
    const [liked, setLiked] = useState(initiallyLiked)
    const [pending, setPending] = useState(false)
    const likeCount = baseLikeCount + (liked && !initiallyLiked ? 1 : !liked && initiallyLiked ? -1 : 0)
    const projected = formatProjected(item.projectedCompletion)

    const onVote = async () => {
        if (!user) {
            openSignIn()
            return
        }
        setPending(true)
        const next = !liked
        setLiked(next)
        try {
            await likeRoadmap({ id: item.id, title: item.title, user, unlike: !next })
        } catch (e) {
            setLiked(!next)
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
                    <h4 className="text-base font-semibold m-0 leading-snug text-primary">{item.title}</h4>
                    {projected && <FilterTag>{projected}</FilterTag>}
                </div>
                {item.description && (
                    <p className="text-sm text-secondary m-0 mt-1 leading-relaxed line-clamp-3">
                        {item.description.replace(/<[^>]+>/g, '')}
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

const Group = ({
    title,
    items,
    likeCounts,
}: {
    title: string
    items: RoadmapNode[]
    likeCounts: Map<number, number>
}) => {
    if (!items.length) return null
    return (
        <div>
            <h3 className="text-base font-semibold text-primary m-0 mb-1 pb-1 border-b border-primary">
                {title} <span className="text-sm text-secondary font-normal">({items.length})</span>
            </h3>
            <ul className="list-none m-0 p-0">
                {items.map((item) => (
                    <RoadmapRow key={item.id} item={item} baseLikeCount={likeCounts.get(item.id) ?? 0} />
                ))}
            </ul>
        </div>
    )
}

const Roadmap = ({ id, productData }: SectionComponentProps) => {
    const teamSlug = (productData as any)?.teamSlug
    if (!teamSlug) return null

    const { allRoadmap, allSqueakRoadmap, allSqueakTeam } = useStaticQuery(graphql`
        query ProductRoadmapSectionQuery {
            allRoadmap(filter: { complete: { ne: true } }) {
                nodes {
                    id: strapiID
                    title
                    description
                    projectedCompletion
                    teams {
                        data {
                            attributes {
                                name
                            }
                        }
                    }
                }
            }
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

    const items: RoadmapNode[] = useMemo(() => {
        if (!team) return []
        return allRoadmap.nodes.filter((node: RoadmapNode) =>
            node.teams?.data?.some((t) => t.attributes?.name === team.name)
        )
    }, [allRoadmap.nodes, team])

    const likeCounts = useMemo(() => {
        const map = new Map<number, number>()
        for (const node of allSqueakRoadmap.nodes as StaticReactionNode[]) {
            map.set(node.squeakId, node.githubPages?.[0]?.reactions?.total_count ?? 0)
        }
        return map
    }, [allSqueakRoadmap.nodes])

    if (!team || !items.length) return null

    const inProgress = items.filter((i) => i.projectedCompletion)
    const underConsideration = items.filter((i) => !i.projectedCompletion)

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-3">Roadmap</h2>
            <p className="text-base text-secondary leading-relaxed m-0 mb-6">
                What the {team.name} Team is working on next. Vote for the things you'd like to see.
            </p>
            <div className="flex flex-col gap-6">
                <Group title="In progress" items={inProgress} likeCounts={likeCounts} />
                <Group title="Under consideration" items={underConsideration} likeCounts={likeCounts} />
            </div>
            <div className="mt-6">
                <Link
                    to={`/roadmap?team=${encodeURIComponent(team.name)}`}
                    state={{ newWindow: true }}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-red dark:text-yellow hover:underline"
                >
                    View full roadmap
                    <IconArrowRight className="size-4" />
                </Link>
            </div>
        </section>
    )
}

export default Roadmap
