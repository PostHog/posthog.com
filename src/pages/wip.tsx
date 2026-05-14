import React, { useEffect, useMemo, useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import OSTable from 'components/OSTable'
import SEO from 'components/seo'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import TeamMemberComponent, { FutureTeamMember } from 'components/TeamMember'
import SmallTeam from 'components/SmallTeam'
import Link from 'components/Link'
import { Select } from 'components/RadixUI/Select'

const TypedMDXProvider = MDXProvider as React.ComponentType<{
    components: Record<string, React.ComponentType<any>> // eslint-disable-line @typescript-eslint/no-explicit-any
    children: React.ReactNode
}>

function getCurrentQuarter() {
    const now = new Date()
    const quarter = Math.floor(now.getMonth() / 3) + 1
    return { quarter, year: now.getFullYear() }
}

function stripQuarterPrefix(excerpt: string, quarter: number, year: number): string {
    const quarterPrefixRegex = new RegExp(
        `^\\s*(?:#+\\s*)?Q${quarter}\\s+${year}\\s*(?:objectives?|objective\\s*\\d*|goals?)?\\s*[:\\-–]?\\s*`,
        'i'
    )
    return excerpt.replace(quarterPrefixRegex, '').trim()
}

interface TeamNode {
    id: string
    name: string
    slug: string
    crest?: {
        data?: {
            attributes?: {
                url?: string
            }
        }
    }
    objectives?: {
        body?: string
        excerpt?: string
    } | null
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
            <TypedMDXProvider
                components={{
                    TeamMember: TeamMemberComponent,
                    FutureTeamMember,
                    SmallTeam,
                }}
            >
                <MDXRenderer>{body}</MDXRenderer>
            </TypedMDXProvider>
        </div>
    )
}

export default function WhatWereWorkingOn(): JSX.Element {
    const [teamFilter, setTeamFilter] = useState('all')
    const [expandedObjectives, setExpandedObjectives] = useState<Record<string, boolean>>({})
    const { quarter, year } = getCurrentQuarter()

    const { allSqueakTeam } = useStaticQuery<{ allSqueakTeam: { nodes: TeamNode[] } }>(graphql`
        {
            allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) {
                nodes {
                    id
                    objectives {
                        body
                        excerpt(pruneLength: 250)
                    }
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

    const teams = useMemo(
        () => [...allSqueakTeam.nodes].sort((a, b) => a.name.localeCompare(b.name)),
        [allSqueakTeam.nodes]
    )

    const filteredTeams = useMemo(() => {
        if (teamFilter === 'all') return teams
        return teams.filter((t) => t.slug === teamFilter)
    }, [teams, teamFilter])

    const expandableTeamSlugs = useMemo(
        () =>
            filteredTeams.filter((team) => team.objectives?.body && team.objectives?.excerpt).map((team) => team.slug),
        [filteredTeams]
    )

    const allExpandableTeamsExpanded =
        expandableTeamSlugs.length > 0 && expandableTeamSlugs.every((slug) => expandedObjectives[slug])

    const toggleObjective = (slug: string) => {
        setExpandedObjectives((prev) => ({
            ...prev,
            [slug]: !prev[slug],
        }))
    }

    const toggleAllObjectives = () => {
        setExpandedObjectives((prev) => {
            const next = { ...prev }

            if (allExpandableTeamsExpanded) {
                expandableTeamSlugs.forEach((slug) => {
                    delete next[slug]
                })
            } else {
                expandableTeamSlugs.forEach((slug) => {
                    next[slug] = true
                })
            }

            return next
        })
    }

    const tableColumns = [
        { name: 'Team', width: '250px', align: 'left' as const },
        { name: `Objectives`, width: 'minmax(500px, 2fr)', align: 'left' as const },
    ]

    const tableRows = useMemo(
        () =>
            filteredTeams.map((team) => {
                const crestUrl = team.crest?.data?.attributes?.url
                const body = team.objectives?.body
                const rawExcerpt = team.objectives?.excerpt || ''
                const excerpt = stripQuarterPrefix(rawExcerpt, quarter, year)
                const isExpanded = !!expandedObjectives[team.slug]
                const canExpand = !!body && !!excerpt

                return {
                    key: team.id,
                    cells: [
                        {
                            content: (
                                <Link
                                    to={`/teams/${team.slug}`}
                                    state={{ newWindow: true }}
                                    className="flex items-center gap-3 !no-underline !font-normal"
                                >
                                    {crestUrl && (
                                        <img src={crestUrl} alt="" className="w-8 h-8 object-contain flex-shrink-0" />
                                    )}
                                    <span className="!font-semibold !underline">{team.name}</span>
                                </Link>
                            ),
                        },
                        {
                            content: body ? (
                                canExpand && !isExpanded ? (
                                    <div>
                                        <p className="m-0 text-sm text-secondary dark:text-secondary-dark">{excerpt}</p>
                                        <button
                                            onClick={() => toggleObjective(team.slug)}
                                            className="mt-1 text-sm font-semibold text-red dark:text-yellow"
                                        >
                                            Show more
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <QuarterObjectives body={body} quarter={quarter} year={year} />
                                        {canExpand && (
                                            <button
                                                onClick={() => toggleObjective(team.slug)}
                                                className="mt-2 text-sm font-semibold text-red dark:text-yellow"
                                            >
                                                Show less
                                            </button>
                                        )}
                                    </div>
                                )
                            ) : (
                                <p className="text-secondary text-sm italic m-0">This team hasn't set goals yet.</p>
                            ),
                            className: '!py-4',
                        },
                    ],
                }
            }),
        [filteredTeams, expandedObjectives, quarter, year]
    )

    const { tabs, handleTabChange, tabContainerClassName, className } = useCompanyNavigation({
        value: '/wip',
        content: (
            <div className="p-4 @xl:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-0">
                    <div>
                        <h1 className="text-2xl @lg:text-3xl font-bold m-0">Work in progress</h1>
                    </div>
                    <div className="w-full @md:w-auto flex items-center gap-3">
                        <button
                            onClick={toggleAllObjectives}
                            disabled={expandableTeamSlugs.length === 0}
                            className="text-red dark:text-yellow underline underline-offset-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                            {allExpandableTeamsExpanded ? 'Collapse all' : 'Expand all'}
                        </button>
                        <Select
                            value={teamFilter}
                            onValueChange={setTeamFilter}
                            groups={[
                                {
                                    label: 'Teams',
                                    items: [
                                        { label: 'All teams', value: 'all' },
                                        ...teams.map((team) => ({
                                            label: team.name,
                                            value: team.slug,
                                        })),
                                    ],
                                },
                            ]}
                            placeholder="Filter by team"
                        />
                    </div>
                </div>

                <p className="mt-0 mb-6">
                    Every quarter, each PostHog team sets goals using our{' '}
                    <Link
                        to="/handbook/company/goal-setting"
                        state={{ newWindow: true }}
                        className="font-semibold underline"
                    >
                        HOGS process
                    </Link>
                    . Goals are owned by team leads, reviewed in all-hands, and refreshed each quarter. Click any team
                    below to see their current goals.
                </p>

                <OSTable columns={tableColumns} rows={tableRows} rowAlignment="top" width="full" />
            </div>
        ),
    })

    return (
        <>
            <SEO
                title="Work in progress - PostHog"
                description={`Q${quarter} ${year} goals across all PostHog teams`}
            />
            <Editor hasTabs type="what-were-working-on" proseSize="base" maxWidth="100%">
                <OSTabs
                    tabs={tabs}
                    defaultValue="/wip"
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
