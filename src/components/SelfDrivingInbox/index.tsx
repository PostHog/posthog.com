import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { graphql, Link, navigate, useStaticQuery } from 'gatsby'
import { useLocation } from '@reach/router'

import ScrollArea from 'components/RadixUI/ScrollArea'

import { EnableScoutBar } from './EnableScout'
import { isTool, productLabel, productSource } from './sources'
import ReportRow from './ReportRow'
import TemplateDetail from './TemplateDetail'
import { DEFAULT_PRIORITY, InboxFilter, InboxTemplate, isReportPriority, PRIORITY_ORDER, UNCATEGORIZED } from './types'

/** Slug of the template a row points at, used as the `?report=` value. */
function slugOf(url: string): string {
    return url.replace(/^\/templates\//, '').replace(/\/$/, '')
}

/** Read on a cold load only, so a filtered view is still a shareable link. See `Page.tsx`. */
export const TOOL_PARAM = 'tool'

/** Every PostHog tool a template touches, as its subject or as something it reads. */
export function toolsOf(template: InboxTemplate): string[] {
    const names = [template.category, ...(template.watches || []).map((w) => w.name)]
    // Your codebase is context, not a tool, so it never earns a rail row.
    return [...new Set(names.filter(isTool).map(productLabel))]
}

/**
 * Tools in rail order, derived from the templates rather than a hardcoded map –
 * `TemplatesLibrary` keys its 34 entries by title, so nobody can add one without editing it.
 */
export function toolsInUse(templates: InboxTemplate[]): { name: string; count: number }[] {
    const counts = new Map<string, number>()
    templates.forEach((template) => toolsOf(template).forEach((n) => counts.set(n, (counts.get(n) ?? 0) + 1)))
    return [...counts.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

/** A template matches a tool when it's the subject or one of the things it reads. */
export function matchesFilter(template: InboxTemplate, filter: InboxFilter): boolean {
    return !filter || toolsOf(template).includes(filter)
}

export function useSelfDrivingTemplates(): InboxTemplate[] {
    const data = useStaticQuery(graphql`
        query SelfDrivingInboxQuery {
            templates: allMdx(filter: { fields: { slug: { regex: "/^/templates/(?!.*/docs).*/" } } }) {
                nodes {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        subtitle
                        filters {
                            type
                        }
                        question
                        premise
                        discriminator {
                            writesToInbox
                            writesNothing
                            why
                        }
                        watches {
                            name
                            detail
                        }
                        requires {
                            label
                            level
                        }
                        category
                        schedule
                        report {
                            title
                            priority
                            source
                            receivedAgo
                            body
                            suggestedAction
                            actionNote
                            affected
                        }
                    }
                }
            }
            # The scout is authored as a real SKILL.md beside its index.mdx, so it stays the file
            # format the monorepo uses instead of a markdown document flattened into YAML.
            # rawBody is the whole file including frontmatter, which is exactly what the page
            # displays – see components/SelfDrivingInbox/README.md.
            scouts: allMdx(filter: { fields: { slug: { regex: "//SKILL$/" } } }) {
                nodes {
                    rawBody
                    fields {
                        slug
                    }
                    frontmatter {
                        name
                        description
                    }
                }
            }
        }
    `)

    return useMemo(() => {
        const nodes = data?.templates?.nodes || []

        // Keyed by the template slug that owns each scout: /templates/x/SKILL -> /templates/x
        const scoutsByTemplate = new Map<string, any>(
            (data?.scouts?.nodes || []).map((node: any) => [node.fields.slug.replace(/\/SKILL$/, ''), node])
        )

        return nodes
            .filter((node: any) => {
                const types = node.frontmatter?.filters?.type || []
                // `_`-prefixed directories are starter files to copy, not templates to browse.
                if (node.fields.slug.startsWith('/templates/_')) {
                    return false
                }
                // A template without a report can't appear in an inbox – it has nothing to show.
                return types.some((t: string) => t?.toLowerCase() === 'self-driving') && node.frontmatter?.report?.title
            })
            .map((node: any) => {
                const scoutNode = scoutsByTemplate.get(node.fields.slug)
                return {
                    url: node.fields.slug,
                    category: node.frontmatter.category || UNCATEGORIZED,
                    templateTitle: node.frontmatter.title,
                    templateSubtitle: node.frontmatter.subtitle,
                    report: node.frontmatter.report,
                    question: node.frontmatter.question,
                    premise: node.frontmatter.premise,
                    discriminator: node.frontmatter.discriminator,
                    watches: node.frontmatter.watches,
                    requires: node.frontmatter.requires,
                    scout: scoutNode
                        ? {
                              name: scoutNode.frontmatter?.name,
                              description: scoutNode.frontmatter?.description,
                              raw: scoutNode.rawBody,
                              schedule: node.frontmatter.schedule,
                          }
                        : undefined,
                }
            })
            .sort((a: InboxTemplate, b: InboxTemplate) => {
                const pa = isReportPriority(a.report.priority) ? a.report.priority : DEFAULT_PRIORITY
                const pb = isReportPriority(b.report.priority) ? b.report.priority : DEFAULT_PRIORITY
                return PRIORITY_ORDER[pa] - PRIORITY_ORDER[pb] || a.report.title.localeCompare(b.report.title)
            })
    }, [data])
}

interface SelfDrivingInboxProps {
    /** Pre-selected slug, so a per-template route and the gallery render the same screen. */
    initialSlug?: string
    /** Owned by `Page.tsx`, since the rail lives in the Explorer sidebar. */
    activeFilter?: InboxFilter
    /** Lets the narrow-width select drive the same state the sidebar rail owns. */
    onFilterChange?: (filter: InboxFilter) => void
}

/**
 * Self-driving templates browsed as an inbox – see README.md. Static-first: the list renders at
 * build time, and selection, the preview pane, and keyboard navigation are enhancement on top.
 */
export default function SelfDrivingInbox({
    initialSlug,
    activeFilter = null,
    onFilterChange,
}: SelfDrivingInboxProps = {}): JSX.Element {
    const templates = useSelfDrivingTemplates()
    const location = useLocation()
    const listRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Enhancement gate: until this flips after mount, the component renders its static form.
    const [interactive, setInteractive] = useState(false)
    useEffect(() => setInteractive(true), [])

    // The detail pane is `hidden @[700px]:flex`, so below that width selecting a row has nothing
    // to render into. The click handler can't see a container query, so measure the container and
    // mirror the breakpoint here. Starts false, which is also the right pre-hydration answer.
    // Searches the report headline, the template's own question, its category and its signal
    // sources — the things someone actually remembers about a template they saw once.
    const [query, setQuery] = useState('')

    const [detailPaneVisible, setDetailPaneVisible] = useState(false)
    useEffect(() => {
        const element = containerRef.current
        if (!element || typeof ResizeObserver === 'undefined') {
            return
        }
        const observer = new ResizeObserver(([entry]) => setDetailPaneVisible(entry.contentRect.width >= 700))
        observer.observe(element)
        return () => observer.disconnect()
    }, [])

    // Seeded from `initialSlug` (falling back to the top report) so a selection exists during
    // SSR, not just after mount. That matters twice over: these pages are what search engines
    // and the .md agent mirror actually read, and both take the built HTML.
    const [selectedSlug, setSelectedSlug] = useState<string | null>(
        initialSlug ?? (templates.length > 0 ? slugOf(templates[0].url) : null)
    )

    // Grouped by subject, always: a product view spans several, and a flat priority sort at two
    // dozen templates is a wall of P1s with nothing to navigate by.
    const groups = useMemo(() => {
        const needle = query.trim().toLowerCase()
        const visible = templates
            .filter((t) => matchesFilter(t, activeFilter))
            .filter((t) =>
                needle
                    ? [t.report.title, t.templateTitle, t.question, t.category, ...(t.watches || []).map((w) => w.name)]
                          .filter(Boolean)
                          .some((field) => (field as string).toLowerCase().includes(needle))
                    : true
            )
        const byCategory = new Map<string, InboxTemplate[]>()
        visible.forEach((template) => {
            const bucket = byCategory.get(productLabel(template.category))
            if (bucket) {
                bucket.push(template)
            } else {
                byCategory.set(productLabel(template.category), [template])
            }
        })
        return [...byCategory.entries()]
            .map(([name, items]) => ({ name, items }))
            .sort((a, b) => b.items.length - a.items.length || a.name.localeCompare(b.name))
    }, [templates, activeFilter, query])

    const visibleCount = groups.reduce((total, group) => total + group.items.length, 0)

    const tools = useMemo(() => toolsInUse(templates), [templates])

    /** The template this route is named after, when the URL is a per-template one. */
    const routeSlug = useMemo(() => {
        const fromPath = slugOf(location.pathname)
        return templates.some((t) => slugOf(t.url) === fromPath) ? fromPath : initialSlug ?? null
    }, [location.pathname, templates, initialSlug])

    // Below 700px the two panes become one, picked by route: the list on /templates/self-driving,
    // the template on its own URL. Stacking both buried every template under the list.
    const onTemplateRoute = Boolean(routeSlug)

    /**
     * Select in place: the window shell keeps its tree mounted, so navigating leaves the pane on
     * the previous template. Under 700px the pane is hidden, so let the row behave as a link.
     */
    const canSelectInPlace = interactive && detailPaneVisible

    /**
     * `?report=` beats the route's own template, which beats the first report so the pane is
     * never empty. Without that order a per-template route snapped back on every row click.
     */
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const requested = params.get('report')
        if (requested && templates.some((t) => slugOf(t.url) === requested)) {
            setSelectedSlug(requested)
            return
        }
        if (routeSlug) {
            setSelectedSlug(routeSlug)
            return
        }
        if (templates.length > 0) {
            setSelectedSlug(slugOf(templates[0].url))
        }
    }, [location.search, templates, routeSlug])

    const selected = useMemo(
        () => templates.find((t) => slugOf(t.url) === selectedSlug) ?? null,
        [templates, selectedSlug]
    )

    const select = useCallback(
        (template: InboxTemplate) => {
            // Keyboard navigation routes through here too, so it has to honour the same rule as
            // a click – otherwise j/k would silently move a selection nobody can see.
            if (!canSelectInPlace) {
                navigate(template.url)
                return
            }
            const slug = slugOf(template.url)
            setSelectedSlug(slug)
            navigate(`${location.pathname}?report=${encodeURIComponent(slug)}`, { replace: true })
        },
        [canSelectInPlace, location.pathname]
    )

    const move = useCallback(
        (delta: number) => {
            if (templates.length === 0) return
            const current = templates.findIndex((t) => slugOf(t.url) === selectedSlug)
            const next = Math.min(Math.max((current === -1 ? 0 : current) + delta, 0), templates.length - 1)
            select(templates[next])
        },
        [templates, selectedSlug, select]
    )

    const onKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            // Never swallow keys aimed at a focused link's own activation.
            if (event.metaKey || event.ctrlKey || event.altKey) return
            if (event.key === 'j' || event.key === 'ArrowDown') {
                event.preventDefault()
                move(1)
            } else if (event.key === 'k' || event.key === 'ArrowUp') {
                event.preventDefault()
                move(-1)
            } else if (event.key === 'Escape') {
                setSelectedSlug(null)
            }
        },
        [move]
    )

    if (templates.length === 0) {
        return (
            <div className="p-8 text-center text-secondary">
                <p className="m-0 text-[15px]">No self-driving templates yet.</p>
            </div>
        )
    }

    return (
        <div ref={containerRef} className="@container flex h-full min-h-0 flex-col">
            {/* Explorer drops its own `title` under `fullScreen`, which the panes need for
                scrolling – so the heading lives here. */}
            <header className="border-b border-light px-4 py-3 dark:border-dark">
                <h1 className="m-0 text-base font-bold text-primary @[700px]:text-lg">Self-driving templates</h1>
                {/* No hover cards in chrome – dotted underlines in a caption read as clutter. */}
                <p className="m-0 text-sm text-secondary">
                    Use cases a scout can watch for, each shown as the report it would file.
                </p>
            </header>
            <div className="flex min-h-0 flex-1 flex-col @[700px]:flex-row">
                {/* The list. Owns its own scroll so the preview pane can scroll independently. */}
                <div
                    ref={listRef}
                    role="list"
                    onKeyDown={onKeyDown}
                    className={`min-h-0 flex-col border-light @[700px]:flex @[700px]:w-[380px] @[700px]:shrink-0 @[700px]:border-r dark:border-dark ${
                        onTemplateRoute ? 'hidden' : 'flex'
                    }`}
                >
                    <div className="space-y-2 border-b border-light px-4 py-2 dark:border-dark">
                        {/* Progressive enhancement, like the rest of the pane: with JS off the
                            full list is still there and still navigable. */}
                        {interactive && (
                            <input
                                type="search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder={`Search ${templates.length} templates`}
                                aria-label="Search templates"
                                className="w-full rounded border border-light bg-accent px-2 py-1 text-sm text-primary placeholder:text-secondary dark:border-dark dark:bg-accent-dark"
                            />
                        )}
                        {/* Explorer stacks its sidebar below the content on narrow, so the rail
                            lands after everything it filters. Same data, a select instead. */}
                        {interactive && tools.length > 0 && (
                            <select
                                value={activeFilter ?? ''}
                                onChange={(event) => onFilterChange?.(event.target.value || null)}
                                aria-label="Filter templates by tool"
                                className="w-full rounded border border-light bg-accent px-2 py-1 text-sm text-primary @[700px]:hidden dark:border-dark dark:bg-accent-dark"
                            >
                                <option value="">All templates ({templates.length})</option>
                                {tools.map(({ name, count }) => (
                                    <option key={name} value={name}>
                                        {name} ({count})
                                    </option>
                                ))}
                            </select>
                        )}
                        <p className="m-0 text-sm text-secondary">
                            {visibleCount} {visibleCount === 1 ? 'report' : 'reports'}
                            {activeFilter ? ` in ${activeFilter}` : ' · ranked by priority'}
                        </p>
                    </div>
                    <ScrollArea className="min-h-0 flex-1">
                        {groups.map((group) => {
                            const { token } = productSource(group.name)
                            return (
                                <section key={group.name}>
                                    {/* Sticky, so the category stays named while you scroll. Color
                                    alone carries it, borrowing the /desktop tab treatment – an
                                    icon competed with the priority dot in every row below. */}
                                    <h3
                                        className={`sticky top-0 z-10 m-0 flex items-center gap-1.5 border-b-2 bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-${token} border-${token}`}
                                    >
                                        {group.name}
                                        <span className="font-normal text-secondary">{group.items.length}</span>
                                    </h3>
                                    {group.items.map((template) => (
                                        <ReportRow
                                            key={template.url}
                                            template={template}
                                            selected={interactive && slugOf(template.url) === selectedSlug}
                                            onSelect={
                                                canSelectInPlace
                                                    ? (event) => {
                                                          // Let cmd/ctrl/shift/middle-click navigate natively.
                                                          if (
                                                              event.metaKey ||
                                                              event.ctrlKey ||
                                                              event.shiftKey ||
                                                              event.button !== 0
                                                          )
                                                              return
                                                          event.preventDefault()
                                                          select(template)
                                                      }
                                                    : undefined
                                            }
                                        />
                                    ))}
                                </section>
                            )
                        })}
                    </ScrollArea>
                </div>

                {/* Renders server-side: the built HTML is what search engines and the .md
                    agent mirror read, so the teaching content has to be in it. */}
                {selected && (
                    <div className={`min-h-0 flex-1 flex-col @[700px]:flex ${onTemplateRoute ? 'flex' : 'hidden'}`}>
                        <ScrollArea className="min-h-0 flex-1">
                            <Link
                                to="/templates/self-driving"
                                className="mx-6 mt-4 inline-block text-sm text-secondary @[700px]:hidden"
                            >
                                ‹ All templates
                            </Link>
                            <TemplateDetail template={selected} />
                        </ScrollArea>
                        <EnableScoutBar scout={selected.scout} templateTitle={selected.templateTitle} />
                    </div>
                )}
            </div>
        </div>
    )
}
