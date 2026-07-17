import React, { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Link from 'components/Link'
import { ZoomImage } from 'components/ZoomImage'
import OSButton2 from 'components/OSButton/OSButton2'
import { IconArrowRight } from '@posthog/icons'
import { SectionComponentProps } from '../types'

dayjs.extend(utc)

const MAX_ENTRIES = 12

interface ChangelogNode {
    id: number
    date: string
    title: string
    description?: string
    media?: { gatsbyImageData?: IGatsbyImageData }
    teams?: { data?: Array<{ attributes?: { name?: string } }> }
}

interface MonthGroup {
    key: string
    label: string
    entries: ChangelogNode[]
}

// Strip markdown link syntax `[text](url)` → `text`, then strip raw HTML, then collapse whitespace.
const sanitize = (input: string): string =>
    input
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links
        .replace(/`([^`]+)`/g, '$1') // inline code
        .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
        .replace(/\*([^*]+)\*/g, '$1') // italic
        .replace(/_([^_]+)_/g, '$1') // underscore italic
        .replace(/<[^>]+>/g, '') // html
        .replace(/\s+/g, ' ')
        .trim()

const truncate = (text: string, max = 140) =>
    text.length <= max ? text : text.slice(0, max).replace(/\s+\S*$/, '') + '…'

const ChangelogRow = ({ entry }: { entry: ChangelogNode }) => {
    const date = dayjs.utc(entry.date)
    const description = entry.description ? truncate(sanitize(entry.description)) : null
    const thumb = entry.media?.gatsbyImageData ? getImage(entry.media.gatsbyImageData) : null
    const href = `/changelog?id=${entry.id}`
    return (
        <li className="m-0 grid grid-cols-[60px_1fr] @md/reader-content:grid-cols-[60px_1fr_auto] gap-x-3 gap-y-1 py-2 border-b border-primary last:border-b-0 items-center @md/reader-content:items-start">
            <div className="text-xs font-mono text-secondary pt-0.5 self-start">{date.format('MMM D')}</div>
            <div className="min-w-0">
                <Link to={href} state={{ newWindow: true, preventScroll: true }} className="text-inherit">
                    <h4 className="text-[15px] font-semibold m-0 leading-snug text-primary hover:underline hover:text-red dark:hover:text-yellow">
                        {entry.title}
                    </h4>
                </Link>
                {description && <p className="text-sm text-secondary m-0 mt-0.5 leading-snug">{description}</p>}
            </div>
            {thumb && (
                <div className="hidden @md/reader-content:block w-32 shrink-0 overflow-hidden rounded border border-primary leading-[0]">
                    <ZoomImage>
                        <GatsbyImage image={thumb} alt={entry.title} className="w-full h-20 object-cover" />
                    </ZoomImage>
                </div>
            )}
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
                    media {
                        gatsbyImageData(width: 320, height: 200)
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
            <div className="flex flex-col gap-8">
                {groups.map((group) => (
                    <div key={group.key}>
                        <h3 className="text-base font-semibold text-primary m-0 mb-1 pb-1 border-b border-primary flex items-baseline gap-2">
                            <span>{group.label}</span>
                            <span className="text-base text-secondary font-normal">({group.entries.length})</span>
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
                <OSButton2 to={`/changelog?team=${encodeURIComponent(team.name)}`} state={{ newWindow: true }}>
                    View full changelog
                    <IconArrowRight className="size-4" />
                </OSButton2>
            </div>
        </section>
    )
}

export default Changelog
