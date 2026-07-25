import React, { useEffect, useMemo, useRef } from 'react'
import { IconHide, IconSearch } from '@posthog/icons'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import ScrollArea from 'components/RadixUI/ScrollArea'
import WizardCommand from 'components/WizardCommand'
import { SingleCodeBlock } from 'components/CodeBlock'
import { TOOLS } from './tools'
import { Annotation, ToolKey } from './types'

interface AnnotationSidebarProps {
    /** The PostHog toolbar mock, docked as this column's nav. */
    toolbar: React.ReactNode
    /** Annotations for the page being viewed. */
    annotations: Annotation[]
    numbers: Record<string, number>
    pageLabel: string
    inspecting: boolean
    selectedId: string | null
    filter: ToolKey | null
    onSelect: (annotationId: string | null) => void
    onFilter: (filter: ToolKey | null) => void
    onStartInspecting: () => void
    onStopInspecting: () => void
    className?: string
}

const PROSE =
    'text-sm text-secondary [&_code]:font-code [&_code]:text-xs [&_code]:bg-accent [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded'

/**
 * The docked column beside the demo: every touchpoint on the current page, with
 * the selected one expanded into its explanation and code.
 *
 * Deliberately a side column rather than floating cards: the markers sit on the
 * page, the reading happens here, and the two never cover each other up. Kept as
 * one scrolling list rather than tabs, so the explanations are always the thing
 * on screen.
 */
export default function AnnotationSidebar({
    toolbar,
    annotations,
    numbers,
    pageLabel,
    inspecting,
    selectedId,
    filter,
    onSelect,
    onFilter,
    onStartInspecting,
    onStopInspecting,
    className = '',
}: AnnotationSidebarProps): JSX.Element {
    const toolCount = useMemo(() => new Set(annotations.map((a) => a.tool)).size, [annotations])
    const visible = filter ? annotations.filter((a) => a.tool === filter) : annotations
    const viewportRef = useRef<HTMLDivElement | null>(null)

    // Selecting a marker out on the page should bring its row into view here, so
    // the two halves stay in step without the reader hunting for it.
    useEffect(() => {
        const viewport = viewportRef.current
        if (!selectedId || !viewport) return
        const row = viewport.querySelector<HTMLElement>(`[data-annotation-row="${selectedId}"]`)
        if (!row) return
        // Scroll this viewport only, since scrollIntoView would also move ancestors.
        const delta = row.getBoundingClientRect().top - viewport.getBoundingClientRect().top - 8
        viewport.scrollTo({ top: viewport.scrollTop + delta, behavior: 'smooth' })
    }, [selectedId])

    /* Side note, not a section: who wrote all of this. Shown in both states,
       since it's as true before you show the instrumentation as after. */
    const wizardNote = (
        <div className="mx-1.5 mb-2 mt-1 p-2.5 rounded bg-accent">
            <p className="text-xs text-secondary m-0 mb-2">
                Nobody wrote these by hand. The{' '}
                <Link to="/wizard" disablePrefetch externalNoIcon className="font-semibold">
                    PostHog wizard
                </Link>{' '}
                read the codebase and instrumented it in about eight minutes.
            </p>
            <WizardCommand slim />
        </div>
    )

    return (
        <div
            data-scheme="primary"
            className={`flex flex-col min-h-0 bg-primary border border-primary rounded-md overflow-hidden ${className}`}
        >
            {toolbar}
            <div className="px-3 py-2.5 border-b border-primary shrink-0">
                <div className="flex items-start gap-2">
                    <h2 className="flex-1 text-sm font-bold text-primary m-0">What PostHog measures here</h2>
                    {inspecting && (
                        <OSButton size="sm" icon={<IconHide />} onClick={onStopInspecting}>
                            Hide
                        </OSButton>
                    )}
                </div>
                {filter ? (
                    <p className="text-xs text-secondary m-0 flex items-center gap-1.5">
                        <span>
                            {TOOLS[filter].name} only · {visible.length} of {annotations.length}
                        </span>
                        <button type="button" onClick={() => onFilter(null)} className="underline font-semibold">
                            Show all
                        </button>
                    </p>
                ) : (
                    <p className="text-xs text-secondary m-0">
                        {annotations.length} touchpoints on {pageLabel}, using {toolCount} tools
                        {inspecting ? '. Filter with the tool icons above.' : '.'}
                    </p>
                )}
            </div>

            {!inspecting ? (
                // The landing state. Inspect starts off, so this button is the way
                // in and is sized accordingly.
                <div className="p-4 flex flex-col gap-3">
                    <OSButton
                        size="xl"
                        variant="primary"
                        width="full"
                        icon={<IconSearch />}
                        onClick={onStartInspecting}
                    >
                        Show instrumentation
                    </OSButton>
                    <p className="text-sm text-secondary m-0">
                        Right now Unter looks the way its users see it. {annotations.length} touchpoints are already
                        capturing data on this page, and none of them are visible.
                    </p>
                    <div className="-mx-1.5">{wizardNote}</div>
                </div>
            ) : (
                <ScrollArea viewportRef={viewportRef} className="flex-1 min-h-0">
                    <ul className="list-none m-0 p-1.5 space-y-0.5">
                        {visible.map((annotation) => {
                            const tool = TOOLS[annotation.tool]
                            const { Icon } = tool
                            const isSelected = annotation.id === selectedId
                            return (
                                <li key={annotation.id} data-annotation-row={annotation.id}>
                                    <button
                                        type="button"
                                        onClick={() => onSelect(isSelected ? null : annotation.id)}
                                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-left transition-colors ${
                                            isSelected ? 'bg-accent' : 'hover:bg-accent'
                                        }`}
                                    >
                                        <span
                                            className="shrink-0 flex items-center justify-center size-5 rounded-full text-xs font-semibold ring-1 ring-white"
                                            style={{ background: tool.color, color: tool.textOnColor }}
                                        >
                                            {numbers[annotation.id]}
                                        </span>
                                        <Icon className="size-4 shrink-0" style={{ color: tool.color }} />
                                        <span className="flex-1 min-w-0 font-code text-xs text-primary truncate">
                                            {annotation.label}
                                        </span>
                                    </button>
                                    {isSelected && (
                                        <div className="px-2 pt-1.5 pb-3">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-secondary m-0 mb-1">
                                                {tool.name}
                                            </p>
                                            <h3 className="text-sm font-bold text-primary m-0 mb-1.5">
                                                {annotation.title}
                                            </h3>
                                            <div className={PROSE}>{annotation.body.why}</div>
                                            {annotation.body.code && (
                                                <div className="mt-2 [&_pre]:text-xs">
                                                    <SingleCodeBlock
                                                        language={annotation.body.code.language}
                                                        showLabel={false}
                                                    >
                                                        {annotation.body.code.snippet}
                                                    </SingleCodeBlock>
                                                </div>
                                            )}
                                            {annotation.body.after && (
                                                <div className={`mt-2 ${PROSE}`}>{annotation.body.after}</div>
                                            )}
                                            {tool.docsUrl && (
                                                <Link
                                                    to={tool.docsUrl}
                                                    disablePrefetch
                                                    externalNoIcon
                                                    className="inline-block mt-2 text-sm font-semibold"
                                                >
                                                    {tool.name} docs →
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </li>
                            )
                        })}
                    </ul>

                    {wizardNote}
                </ScrollArea>
            )}
        </div>
    )
}
