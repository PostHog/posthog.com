import React, { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import { IconArrowRight, IconGithub } from '@posthog/icons'
import { SectionComponentProps } from '../types'
import { FilterTag } from '../helpers'

interface RoadmapNode {
    id: string | number
    title: string
    description?: string
    projectedCompletion?: string | null
    githubUrls?: string[]
    teams?: { data?: Array<{ attributes?: { name?: string; slug?: string } }> }
}

interface TeamNode {
    name: string
    slug: string
}

const formatProjected = (value: string | null | undefined): string | null => {
    if (!value) return null
    // Backend stores quarters as "2026-Q2" or full ISO dates; surface them tersely.
    const quarterMatch = value.match(/^(\d{4})-Q([1-4])$/)
    if (quarterMatch) return `Q${quarterMatch[2]} ${quarterMatch[1]}`
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const RoadmapRow = ({ item }: { item: RoadmapNode }) => {
    const projected = formatProjected(item.projectedCompletion)
    const ghUrl = item.githubUrls?.[0]
    return (
        <li className="m-0 py-3 grid grid-cols-1 @lg:grid-cols-[140px_1fr] gap-x-4 gap-y-1 border-b border-primary last:border-b-0">
            <div className="@lg:pt-1">
                {projected ? (
                    <FilterTag>{projected}</FilterTag>
                ) : (
                    <span className="text-xs text-secondary italic">No date yet</span>
                )}
            </div>
            <div>
                <h4 className="text-base font-semibold m-0 leading-snug text-primary">{item.title}</h4>
                {item.description && (
                    <p className="text-sm text-secondary m-0 mt-1 leading-relaxed line-clamp-3">
                        {item.description.replace(/<[^>]+>/g, '')}
                    </p>
                )}
                {ghUrl && (
                    <Link
                        to={ghUrl}
                        externalNoIcon
                        className="inline-flex items-center gap-1 mt-2 text-xs font-mono text-secondary hover:text-primary"
                        state={{ newWindow: true }}
                    >
                        <IconGithub className="size-3" />
                        {ghUrl.replace(/^https?:\/\/github\.com\//, '')}
                    </Link>
                )}
            </div>
        </li>
    )
}

const Group = ({ title, items }: { title: string; items: RoadmapNode[] }) => {
    if (!items.length) return null
    return (
        <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold text-secondary m-0 mb-2 pb-1 border-b border-primary">
                {title} <span className="text-secondary/60 font-normal">({items.length})</span>
            </h3>
            <ul className="list-none m-0 p-0">
                {items.map((item) => (
                    <RoadmapRow key={item.id} item={item} />
                ))}
            </ul>
        </div>
    )
}

const Roadmap = ({ id, productData }: SectionComponentProps) => {
    const teamSlug = (productData as any)?.teamSlug
    if (!teamSlug) return null

    const { allRoadmap, allSqueakTeam } = useStaticQuery(graphql`
        query ProductRoadmapSectionQuery {
            allRoadmap(filter: { complete: { ne: true } }) {
                nodes {
                    id: strapiID
                    title
                    description
                    projectedCompletion
                    githubUrls
                    teams {
                        data {
                            attributes {
                                name
                            }
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

    const team: TeamNode | undefined = allSqueakTeam.nodes.find((t: TeamNode) => t.slug === teamSlug)

    const items: RoadmapNode[] = useMemo(() => {
        if (!team) return []
        return allRoadmap.nodes.filter((node: RoadmapNode) =>
            node.teams?.data?.some((t) => t.attributes?.name === team.name)
        )
    }, [allRoadmap.nodes, team])

    if (!team || !items.length) return null

    const inProgress = items.filter((i) => i.projectedCompletion)
    const underConsideration = items.filter((i) => !i.projectedCompletion)

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-3">Roadmap</h2>
            <p className="text-base text-secondary leading-relaxed m-0 mb-6">
                What the {team.name} Team is shipping next.
            </p>
            <div className="flex flex-col gap-6">
                <Group title="In progress" items={inProgress} />
                <Group title="Under consideration" items={underConsideration} />
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
