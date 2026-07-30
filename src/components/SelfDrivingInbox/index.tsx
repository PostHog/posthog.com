import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import { useLocation } from '@reach/router'

import ScrollArea from 'components/RadixUI/ScrollArea'

import { EnableScoutBar } from './EnableScout'
import ReportRow from './ReportRow'
import TemplateDetail from './TemplateDetail'
import { DEFAULT_PRIORITY, InboxTemplate, isReportPriority, PRIORITY_ORDER } from './types'

/** Slug of the template a row points at, used as the `?report=` value. */
function slugOf(url: string): string {
    return url.replace(/^\/templates\//, '').replace(/\/$/, '')
}

function useSelfDrivingTemplates(): InboxTemplate[] {
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
                            speaksUp
                            staysQuiet
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
                        scout {
                            name
                            description
                            body
                            schedule
                        }
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
        }
    `)

    return useMemo(() => {
        const nodes = data?.templates?.nodes || []

        return nodes
            .filter((node: any) => {
                const types = node.frontmatter?.filters?.type || []
                // A template without a report can't appear in an inbox – it has nothing to show.
                return types.some((t: string) => t?.toLowerCase() === 'self-driving') && node.frontmatter?.report?.title
            })
            .map((node: any) => ({
                url: node.fields.slug,
                templateTitle: node.frontmatter.title,
                templateSubtitle: node.frontmatter.subtitle,
                report: node.frontmatter.report,
                question: node.frontmatter.question,
                premise: node.frontmatter.premise,
                discriminator: node.frontmatter.discriminator,
                watches: node.frontmatter.watches,
                requires: node.frontmatter.requires,
                scout: node.frontmatter.scout,
            }))
            .sort((a: InboxTemplate, b: InboxTemplate) => {
                const pa = isReportPriority(a.report.priority) ? a.report.priority : DEFAULT_PRIORITY
                const pb = isReportPriority(b.report.priority) ? b.report.priority : DEFAULT_PRIORITY
                return PRIORITY_ORDER[pa] - PRIORITY_ORDER[pb] || a.report.title.localeCompare(b.report.title)
            })
    }, [data])
}

interface SelfDrivingInboxProps {
    /**
     * Pre-select this template's slug. Set by the per-template route so
     * `/templates/<slug>` and `/templates/self-driving?report=<slug>` render the same UI.
     */
    initialSlug?: string
}

/**
 * Self-driving templates browsed as an inbox. See README.md.
 *
 * Static-first: the list renders at build time and every row is a real link to its template, so
 * the page works with JavaScript disabled. Selection, the preview pane, and keyboard navigation
 * are progressive enhancement layered on top.
 */
export default function SelfDrivingInbox({ initialSlug }: SelfDrivingInboxProps = {}): JSX.Element {
    const templates = useSelfDrivingTemplates()
    const location = useLocation()
    const listRef = useRef<HTMLDivElement>(null)

    // Enhancement gate: until this flips after mount, the component renders its static form.
    const [interactive, setInteractive] = useState(false)
    useEffect(() => setInteractive(true), [])

    // Seeded from `initialSlug` (falling back to the top report) so a selection exists during
    // SSR, not just after mount. That matters twice over: these pages are what search engines
    // and the .md agent mirror actually read, and both take the built HTML.
    const [selectedSlug, setSelectedSlug] = useState<string | null>(
        initialSlug ?? (templates.length > 0 ? slugOf(templates[0].url) : null)
    )

    // Selection precedence: an explicit `initialSlug` (a per-template URL) beats `?report=`,
    // which beats "first, highest-priority report" so the pane is never empty. Only `?report=`
    // needs an effect – it isn't knowable until the client has a URL.
    useEffect(() => {
        if (initialSlug) {
            setSelectedSlug(initialSlug)
            return
        }
        const params = new URLSearchParams(location.search)
        const requested = params.get('report')
        if (requested && templates.some((t) => slugOf(t.url) === requested)) {
            setSelectedSlug(requested)
        } else if (templates.length > 0) {
            setSelectedSlug(slugOf(templates[0].url))
        }
    }, [location.search, templates, initialSlug])

    const selected = useMemo(
        () => templates.find((t) => slugOf(t.url) === selectedSlug) ?? null,
        [templates, selectedSlug]
    )

    const select = useCallback(
        (template: InboxTemplate) => {
            const slug = slugOf(template.url)
            setSelectedSlug(slug)
            navigate(`${location.pathname}?report=${encodeURIComponent(slug)}`, { replace: true })
        },
        [location.pathname]
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
        <div className="@container flex h-full min-h-0 flex-col">
            <div className="flex min-h-0 flex-1 flex-col @[700px]:flex-row">
                {/* The list. Owns its own scroll so the preview pane can scroll independently. */}
                <div
                    ref={listRef}
                    role="list"
                    onKeyDown={onKeyDown}
                    className="flex min-h-0 flex-col border-light @[700px]:w-[380px] @[700px]:shrink-0 @[700px]:border-r dark:border-dark"
                >
                    <div className="border-b border-light px-4 py-2 dark:border-dark">
                        <p className="m-0 text-sm text-secondary">
                            {templates.length} {templates.length === 1 ? 'report' : 'reports'} · ranked by priority
                        </p>
                    </div>
                    <ScrollArea className="min-h-0 flex-1">
                        {templates.map((template) => (
                            <ReportRow
                                key={template.url}
                                template={template}
                                selected={interactive && slugOf(template.url) === selectedSlug}
                                onSelect={
                                    interactive
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
                    </ScrollArea>
                </div>

                {/* Renders server-side too: the built HTML is what search engines and the .md
                    agent mirror read, so the teaching content has to be in it. Only selecting a
                    different row without navigating is enhancement. */}
                {selected && (
                    <div className="hidden min-h-0 flex-1 flex-col @[700px]:flex">
                        <ScrollArea className="min-h-0 flex-1">
                            <TemplateDetail template={selected} />
                        </ScrollArea>
                        <EnableScoutBar scout={selected.scout} templateTitle={selected.templateTitle} />
                    </div>
                )}
            </div>
        </div>
    )
}
