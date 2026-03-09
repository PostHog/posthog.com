import React, { useEffect, useMemo, useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import TeamMemberComponent, { FutureTeamMember } from 'components/TeamMember'
import SmallTeam from 'components/SmallTeam'
import Link from 'components/Link'
import { Select } from 'components/RadixUI/Select'
import { IconChevronDown } from '@posthog/icons'

function getCurrentQuarter() {
    const now = new Date()
    const quarter = Math.floor(now.getMonth() / 3) + 1
    return { quarter, year: now.getFullYear() }
}

interface SqueakTeamNode {
    name: string
    slug: string
    crest?: {
        data?: {
            attributes?: {
                url?: string
            }
        }
    }
}

function QuarterObjectives({ body, quarter, year }: { body: string; quarter: number; year: number }): JSX.Element {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!ref.current) return
        const container = ref.current
        const headings = container.querySelectorAll('h1, h2, h3')
        const qRegex = new RegExp(`Q${quarter}\\s+${year}`, 'i')
        const recapRegex = /recap/i

        let currentQHeading: Element | null = null
        let currentQLevel = 0

        for (const h of Array.from(headings)) {
            const text = h.textContent || ''
            if (qRegex.test(text) && !recapRegex.test(text)) {
                currentQHeading = h
                currentQLevel = parseInt(h.tagName[1])
                break
            }
        }

        if (!currentQHeading) return

        // Hide the quarter heading itself (page title already shows the quarter)
        const qHeadEl = currentQHeading as HTMLElement
        qHeadEl.style.display = 'none'

        // Hide everything before the current quarter heading
        let el = container.firstElementChild
        while (el && el !== currentQHeading) {
            const next = el.nextElementSibling
            const elHtml = el as HTMLElement
            elHtml.style.display = 'none'
            el = next
        }

        // Process elements after the current quarter section
        let sibling = currentQHeading.nextElementSibling
        let pastCurrentSection = false

        while (sibling) {
            const next = sibling.nextElementSibling

            if (sibling.matches('h1, h2, h3') && parseInt(sibling.tagName[1]) <= currentQLevel) {
                pastCurrentSection = true
                const text = sibling.textContent || ''

                if (recapRegex.test(text)) {
                    // Wrap recap section in a collapsible <details>
                    const details = document.createElement('details')
                    details.className = 'my-3 border border-light dark:border-dark rounded'
                    const summary = document.createElement('summary')
                    summary.className =
                        'cursor-pointer px-3 py-2 text-sm font-semibold text-primary/60 hover:text-primary/90 list-none flex items-center gap-1.5'
                    summary.textContent = text
                    details.appendChild(summary)

                    const wrapper = document.createElement('div')
                    wrapper.className = 'px-3 pb-3'

                    const sibHtml = sibling as HTMLElement
                    sibHtml.style.display = 'none'

                    let recapEl = next
                    while (recapEl) {
                        if (recapEl.matches('h1, h2, h3') && parseInt(recapEl.tagName[1]) <= currentQLevel) {
                            break
                        }
                        const recapNext = recapEl.nextElementSibling
                        wrapper.appendChild(recapEl)
                        recapEl = recapNext
                    }

                    details.appendChild(wrapper)
                    sibling.parentNode?.insertBefore(details, sibling.nextSibling)
                    sibling = recapEl
                    continue
                }
            }

            if (pastCurrentSection) {
                const pastSibHtml = sibling as HTMLElement
                pastSibHtml.style.display = 'none'
            }

            sibling = next
        }
    }, [body, quarter, year])

    return (
        <div ref={ref} className="prose prose-sm max-w-none dark:prose-invert">
            <MDXProvider
                components={{
                    TeamMember: TeamMemberComponent,
                    FutureTeamMember,
                    SmallTeam,
                }}
            >
                <MDXRenderer>{body}</MDXRenderer>
            </MDXProvider>
        </div>
    )
}

interface TeamEntry {
    name: string
    slug: string
    crestUrl: string | null
    body: string | null
}

export default function WhatWereWorkingOn(): JSX.Element {
    const [teamFilter, setTeamFilter] = useState('all')
    const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set())
    const { quarter, year } = getCurrentQuarter()

    const data = useStaticQuery(graphql`
        {
            allObjectives: allMdx(filter: { fields: { slug: { regex: "/^/teams/[^/]+/objectives$/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    body
                    rawBody
                }
            }
            allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) {
                nodes {
                    name
                    slug
                    crest {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                }
            }
        }
    `)

    const teams: TeamEntry[] = useMemo(() => {
        const objectives = data.allObjectives.nodes
        const squeakTeams = data.allSqueakTeam.nodes

        // Build a lookup of objectives by team slug
        const objectivesBySlug: Record<string, string> = {}
        for (const obj of objectives) {
            const match = obj.fields.slug.match(/^\/teams\/([^/]+)\/objectives$/)
            if (match) {
                objectivesBySlug[match[1]] = obj.body
            }
        }

        return squeakTeams
            .map((t: SqueakTeamNode) => ({
                name: t.name,
                slug: t.slug,
                crestUrl: t.crest?.data?.attributes?.url || null,
                body: objectivesBySlug[t.slug] || null,
            }))
            .sort((a: TeamEntry, b: TeamEntry) => a.name.localeCompare(b.name))
    }, [data])

    const filteredTeams = useMemo(() => {
        if (teamFilter === 'all') return teams
        return teams.filter((t) => t.slug === teamFilter)
    }, [teams, teamFilter])

    const toggleTeam = (slug: string) => {
        setExpandedTeams((prev) => {
            const next = new Set(prev)
            if (next.has(slug)) {
                next.delete(slug)
            } else {
                next.add(slug)
            }
            return next
        })
    }

    const expandAll = () => setExpandedTeams(new Set(filteredTeams.map((t) => t.slug)))
    const collapseAll = () => setExpandedTeams(new Set())

    const { tabs, handleTabChange, tabContainerClassName, className } = useCompanyNavigation({
        value: '/what-were-working-on',
        content: (
            <div className="p-4 @xl:p-8 max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                        <h1 className="text-2xl @lg:text-3xl font-bold m-0">What we're working on</h1>
                        <p className="text-secondary m-0 mt-1 text-sm">
                            Q{quarter} {year} goals across all PostHog teams
                        </p>
                    </div>
                    <div className="min-w-[180px]">
                        <Select
                            value={teamFilter}
                            onValueChange={(v) => {
                                setTeamFilter(v)
                                setExpandedTeams(new Set())
                            }}
                            groups={[
                                {
                                    label: 'Teams',
                                    items: [
                                        { label: 'All teams', value: 'all' },
                                        ...teams.map((t) => ({
                                            label: t.name,
                                            value: t.slug,
                                        })),
                                    ],
                                },
                            ]}
                            placeholder="Filter by team"
                        />
                    </div>
                </div>

                {/* Intro */}
                <div className="bg-accent border border-primary rounded-md p-4 mb-5 text-sm text-primary">
                    <p className="m-0">
                        Every quarter, each PostHog team sets goals using our{' '}
                        <Link
                            to="/handbook/company/goal-setting"
                            state={{ newWindow: true }}
                            className="font-semibold underline"
                        >
                            HOGS process
                        </Link>
                        . Goals are owned by team leads, reviewed in all-hands, and refreshed each quarter. Click any
                        team below to see their current goals.
                    </p>
                </div>

                {/* Expand/collapse controls */}
                <div className="flex items-center gap-3 mb-3 text-sm">
                    <button
                        onClick={expandAll}
                        className="text-secondary hover:text-primary underline underline-offset-2"
                    >
                        Expand all
                    </button>
                    <span className="text-border">·</span>
                    <button
                        onClick={collapseAll}
                        className="text-secondary hover:text-primary underline underline-offset-2"
                    >
                        Collapse all
                    </button>
                    <span className="ml-auto text-secondary text-xs">
                        {filteredTeams.length} team
                        {filteredTeams.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Team sections */}
                <div className="flex flex-col gap-2">
                    {filteredTeams.map((team) => {
                        const isExpanded = expandedTeams.has(team.slug)
                        return (
                            <div key={team.slug} className="border border-primary rounded-md overflow-hidden">
                                {/* Clickable header */}
                                <button
                                    onClick={() => toggleTeam(team.slug)}
                                    className="w-full flex items-center gap-3 px-4 py-3 bg-accent hover:bg-border/40 transition-colors text-left"
                                >
                                    {team.crestUrl && (
                                        <img
                                            src={team.crestUrl}
                                            alt=""
                                            className="w-7 h-7 object-contain flex-shrink-0"
                                        />
                                    )}
                                    <Link
                                        to={`/teams/${team.slug}`}
                                        state={{ newWindow: true }}
                                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                        className="font-semibold text-primary hover:underline flex-1"
                                    >
                                        {team.name}
                                    </Link>
                                    <IconChevronDown
                                        className={`size-5 text-secondary flex-shrink-0 transition-transform duration-150 ${
                                            isExpanded ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {/* Expandable content */}
                                {isExpanded && (
                                    <div className="px-4 py-4 border-t border-primary">
                                        {team.body ? (
                                            <QuarterObjectives body={team.body} quarter={quarter} year={year} />
                                        ) : (
                                            <p className="text-secondary text-sm italic m-0">
                                                This team hasn't set any goals yet.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        ),
    })

    return (
        <>
            <SEO
                title="What we're working on - PostHog"
                description={`Q${quarter} ${year} goals across all PostHog teams`}
            />
            <Editor hasTabs type="what-were-working-on" proseSize="base" maxWidth="100%">
                <OSTabs
                    tabs={tabs}
                    defaultValue="/what-were-working-on"
                    onValueChange={handleTabChange}
                    padding
                    contentPadding={false}
                    tabContainerClassName={tabContainerClassName}
                    className={className}
                    triggerDataScheme="primary"
                    centerTabs
                />
            </Editor>
        </>
    )
}
