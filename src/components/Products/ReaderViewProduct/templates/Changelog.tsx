import React, { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Link from 'components/Link'
import { IconArrowRight } from '@posthog/icons'
import { SectionComponentProps } from '../types'

dayjs.extend(utc)

const MAX_ENTRIES = 12

interface ChangelogNode {
    id: string | number
    date: string
    title: string
    description?: string
    cta?: { label?: string; url?: string }
    teams?: { data?: Array<{ attributes?: { name?: string } }> }
}

interface MonthGroup {
    key: string
    label: string
    entries: ChangelogNode[]
}

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '').trim()
const truncate = (text: string, max = 140) =>
    text.length <= max ? text : text.slice(0, max).replace(/\s+\S*$/, '') + '…'

const ChangelogRow = ({ entry }: { entry: ChangelogNode }) => {
    const date = dayjs.utc(entry.date)
    const description = entry.description ? truncate(stripHtml(entry.description)) : null
    return (
        <li className="m-0 py-2 grid grid-cols-[60px_1fr] gap-x-3 gap-y-0.5 border-b border-primary last:border-b-0">
            <div className="text-xs font-mono text-secondary pt-0.5">{date.format('MMM D')}</div>
            <div>
                <h4 className="text-[15px] font-semibold m-0 leading-snug text-primary">
                    {entry.cta?.url ? (
                        <Link
                            to={entry.cta.url}
                            state={{ newWindow: true }}
                            className="text-inherit hover:text-red dark:hover:text-yellow"
                        >
                            {entry.title}
                        </Link>
                    ) : (
                        entry.title
                    )}
                </h4>
                {description && <p className="text-sm text-secondary m-0 mt-0.5 leading-snug">{description}</p>}
            </div>
        </li>
    )
}

const Changelog = ({ id, productData }: SectionComponentProps) => {
    const teamSlug = (productData as any)?.teamSlug
    if (!teamSlug) return null

    const { allRoadmap, allSqueakTeam } = useStaticQuery(graphql`
        query ProductChangelogSectionQuery {
            allRoadmap(filter: { complete: { eq: true }, date: { ne: null } }, sort: { fields: date, order: DESC }) {
                nodes {
                    id: strapiID
                    date
                    title
                    description
                    cta {
                        label
                        url
                    }
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

    const team = allSqueakTeam.nodes.find((t: { slug: string }) => t.slug === teamSlug)

    const groups: MonthGroup[] = useMemo(() => {
        if (!team) return []
        const matching: ChangelogNode[] = (allRoadmap.nodes as ChangelogNode[])
            .filter((node) => node.date && node.teams?.data?.some((t) => t.attributes?.name === team.name))
            .slice(0, MAX_ENTRIES)
        const byMonth = new Map<string, MonthGroup>()
        for (const entry of matching) {
            const d = dayjs.utc(entry.date)
            const key = d.format('YYYY-MM')
            if (!byMonth.has(key)) {
                byMonth.set(key, { key, label: d.format('MMMM YYYY'), entries: [] })
            }
            byMonth.get(key)!.entries.push(entry)
        }
        return Array.from(byMonth.values())
    }, [allRoadmap.nodes, team])

    if (!team || !groups.length) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-3">Changelog</h2>
            <p className="text-base text-secondary leading-relaxed m-0 mb-6">
                Recent updates from the {team.name} Team.
            </p>
            <div className="flex flex-col gap-5">
                {groups.map((group) => (
                    <div key={group.key}>
                        <h3 className="text-base font-semibold text-primary m-0 mb-1 pb-1 border-b border-primary flex items-baseline gap-2">
                            <span>{group.label}</span>
                            <span className="text-xs text-secondary font-normal">
                                {group.entries.length} update{group.entries.length === 1 ? '' : 's'}
                            </span>
                        </h3>
                        <ul className="list-none m-0 p-0">
                            {group.entries.map((entry) => (
                                <ChangelogRow key={entry.id} entry={entry} />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <Link
                    to={`/changelog?team=${encodeURIComponent(team.name)}`}
                    state={{ newWindow: true }}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-red dark:text-yellow hover:underline"
                >
                    View full changelog
                    <IconArrowRight className="size-4" />
                </Link>
            </div>
        </section>
    )
}

export default Changelog
