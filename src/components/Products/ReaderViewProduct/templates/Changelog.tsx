import React, { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Link from 'components/Link'
import { IconArrowRight } from '@posthog/icons'
import { SectionComponentProps } from '../types'

dayjs.extend(utc)

interface ChangelogNode {
    id: string | number
    date: string
    title: string
    description?: string
    cta?: { label?: string; url?: string }
    media?: { gatsbyImageData?: IGatsbyImageData }
    teams?: { data?: Array<{ attributes?: { name?: string } }> }
}

interface MonthGroup {
    key: string
    label: string
    entries: ChangelogNode[]
}

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '').trim()
const truncate = (text: string, max = 180) =>
    text.length <= max ? text : text.slice(0, max).replace(/\s+\S*$/, '') + '…'

const ChangelogCard = ({ entry }: { entry: ChangelogNode }) => {
    const date = dayjs.utc(entry.date)
    const image = entry.media?.gatsbyImageData ? getImage(entry.media.gatsbyImageData) : null
    const description = entry.description ? truncate(stripHtml(entry.description)) : null
    return (
        <article className="group relative bg-primary rounded shadow-2xl border border-primary p-4 @md/reader-content:p-5 transition-transform hover:-translate-y-0.5">
            <div className="flex flex-col @md/reader-content:flex-row gap-4">
                {image && (
                    <div className="@md/reader-content:w-40 @md/reader-content:shrink-0 overflow-hidden rounded">
                        <GatsbyImage
                            image={image}
                            alt={entry.title}
                            className="w-full h-32 @md/reader-content:h-24 transition-transform group-hover:scale-[1.02]"
                        />
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                        <h4 className="text-base font-semibold m-0 leading-snug text-primary">{entry.title}</h4>
                        <span className="shrink-0 text-xs font-mono text-secondary mt-0.5">{date.format('MMM D')}</span>
                    </div>
                    {description && <p className="text-sm text-secondary m-0 leading-relaxed">{description}</p>}
                    {entry.cta?.url && entry.cta?.label && (
                        <Link
                            to={entry.cta.url}
                            state={{ newWindow: true }}
                            className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-red dark:text-yellow hover:underline"
                        >
                            {entry.cta.label}
                            <IconArrowRight className="size-3" />
                        </Link>
                    )}
                </div>
            </div>
        </article>
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
                    media {
                        gatsbyImageData(width: 320)
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
        const cutoff = dayjs.utc().subtract(12, 'month').startOf('day')
        const entries: ChangelogNode[] = allRoadmap.nodes.filter((node: ChangelogNode) => {
            if (!node.date) return false
            if (dayjs.utc(node.date).isBefore(cutoff)) return false
            return node.teams?.data?.some((t) => t.attributes?.name === team.name)
        })
        const byMonth = new Map<string, MonthGroup>()
        for (const entry of entries) {
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
                What the {team.name} Team has shipped over the last 12 months.
            </p>
            <div className="relative pl-6">
                <div
                    className="absolute left-2 top-2 bottom-2 w-px bg-yellow/50 dark:bg-yellow/40"
                    aria-hidden="true"
                />
                <div className="flex flex-col gap-8">
                    {groups.map((group) => (
                        <div key={group.key} className="relative">
                            <div className="flex items-center gap-3 mb-3 -ml-6">
                                <span
                                    className="size-4 rounded-full bg-yellow border-2 border-primary shrink-0"
                                    aria-hidden="true"
                                />
                                <h3 className="text-sm uppercase tracking-wider font-semibold text-primary m-0">
                                    {group.label}
                                    <span className="ml-2 text-secondary/70 font-normal normal-case tracking-normal">
                                        {group.entries.length} update{group.entries.length === 1 ? '' : 's'}
                                    </span>
                                </h3>
                            </div>
                            <div className="flex flex-col gap-3">
                                {group.entries.map((entry) => (
                                    <ChangelogCard key={entry.id} entry={entry} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
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
