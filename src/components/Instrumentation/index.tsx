import React, { useEffect, useMemo, useRef, useState } from 'react'
import ScrollArea from 'components/RadixUI/ScrollArea'
import BrowserFrame from './BrowserFrame'
import UnterSite from './Unter'
import SurveyPopover from './Unter/SurveyPopover'
import AnnotationSidebar from './overlay/AnnotationSidebar'
import MarkerLayer from './overlay/MarkerLayer'
import ToolbarBar from './overlay/ToolbarBar'
import useAnnotationPositions from './overlay/useAnnotationPositions'
import { ANNOTATIONS } from './overlay/annotations'
import { ToolKey, UnterPageId } from './overlay/types'
import './unter.css'

const PAGE_LABELS: Record<UnterPageId, string> = {
    ride: 'the Shuffle page',
    highway: 'the host signup page',
    help: 'the Help page',
    safety: 'the Safety page',
}

/** Which demo widget an annotation needs open before its marker can exist. */
const WIDGET_TARGETS: Record<string, 'survey'> = {
    'survey-pop': 'survey',
}

export default function Instrumentation(): JSX.Element {
    const [page, setPage] = useState<UnterPageId>('ride')
    // Off on arrival: you see Unter the way its users do, then choose to look
    // underneath. Turning it on is the whole point of the page, so the sidebar's
    // off-state is the primary call to action.
    const [inspecting, setInspecting] = useState(false)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [filter, setFilter] = useState<ToolKey | null>(null)
    // The survey waits for the signup it's supposed to follow, rather than
    // greeting you on arrival.
    const [surveyOpen, setSurveyOpen] = useState(false)

    const viewportRef = useRef<HTMLDivElement | null>(null)
    // The frame body contains the scrolling site plus the widgets pinned to it,
    // so it's the query root for annotation targets.
    const frameBodyRef = useRef<HTMLDivElement | null>(null)
    // The scrolling site content (markers measured against it scroll with it).
    const contentRef = useRef<HTMLDivElement | null>(null)

    const pageAnnotations = useMemo(() => ANNOTATIONS.filter((a) => a.page === page), [page])
    const numbers = useMemo(() => Object.fromEntries(pageAnnotations.map((a, i) => [a.id, i + 1])), [pageAnnotations])
    const counts = useMemo(() => {
        const byTool: Partial<Record<ToolKey, number>> = {}
        pageAnnotations.forEach((a) => {
            byTool[a.tool] = (byTool[a.tool] || 0) + 1
        })
        return byTool
    }, [pageAnnotations])

    // Opening a widget changes what's on screen without resizing either container,
    // so the measurement pass needs telling.
    const positions = useAnnotationPositions(
        inspecting ? pageAnnotations : [],
        contentRef,
        frameBodyRef,
        surveyOpen ? 1 : 0
    )

    // A marker from another page must never linger.
    useEffect(() => {
        setSelectedId(null)
        setFilter(null)
    }, [page])

    const goToPage = (next: UnterPageId) => {
        setPage(next)
        viewportRef.current?.scrollTo({ top: 0 })
    }

    // Turning inspect off must drop the filter too, or the header goes on
    // describing a filter with no visible markers and no way to clear it.
    const toggleInspect = () => {
        setInspecting((on) => !on)
        setSelectedId(null)
        setFilter(null)
    }

    // Back to how the page loaded, for when you've filtered, selected and
    // navigated your way somewhere confusing.
    const reset = () => {
        setPage('ride')
        setInspecting(false)
        setSelectedId(null)
        setFilter(null)
        setSurveyOpen(false)
        viewportRef.current?.scrollTo({ top: 0 })
    }

    const reveal = (annotation: (typeof ANNOTATIONS)[number]) => {
        // Picking a widget's touchpoint should reveal the widget it lives in.
        if (WIDGET_TARGETS[annotation.target] === 'survey') setSurveyOpen(true)
        // Wait a frame so a just-revealed widget is in the DOM before scrolling to it.
        requestAnimationFrame(() => {
            frameBodyRef.current
                ?.querySelector(`[data-unter-id="${annotation.target}"]`)
                ?.scrollIntoView({ block: 'center', behavior: 'smooth' })
        })
    }

    const select = (annotationId: string | null) => {
        setSelectedId(annotationId)
        if (!annotationId) return
        const annotation = pageAnnotations.find((a) => a.id === annotationId)
        if (annotation) reveal(annotation)
    }

    const isDimmed = (annotationId: string) => {
        if (!filter) return false
        const annotation = pageAnnotations.find((a) => a.id === annotationId)
        return !!annotation && annotation.tool !== filter
    }

    return (
        <div className="@container flex flex-col h-full">
            <div className="px-4 py-3 border-b border-primary bg-primary shrink-0">
                <h1 className="text-base font-bold m-0">How instrumentation works</h1>
                <p className="text-sm text-secondary m-0 max-w-4xl">
                    Unter is a fake app, instrumented for real. Show the instrumentation, then open any numbered marker
                    to see what PostHog captures there and why.
                </p>
            </div>

            <div className="flex-1 min-h-0 flex flex-col @3xl:flex-row gap-2 p-2">
                <BrowserFrame bodyRef={frameBodyRef} className="flex-1 min-h-0 min-w-0">
                    {/* Layer order inside the frame, lowest first: the scrolling content
                        (z-20) < the survey popover (z-25, in unter.css) < markers for
                        sticky and frame-pinned targets (z-30).

                        Inside the scroller, the content marker layer is z-30 against the
                        demo's sticky nav at z-40, so a marker that scrolls under the
                        header is clipped by it. Markers that annotate the nav itself are
                        measured against the frame instead (see useAnnotationPositions),
                        which is why they're in a separate layer that sits above it. */}
                    <div className="relative z-20 flex flex-col h-full min-h-0">
                        <ScrollArea viewportRef={viewportRef}>
                            <div className="relative" ref={contentRef}>
                                <div className="unter-root un-site">
                                    <UnterSite
                                        page={page}
                                        onNavigate={goToPage}
                                        onSignupCompleted={() => setSurveyOpen(true)}
                                    />
                                </div>
                                <MarkerLayer
                                    key={`content-${page}`}
                                    className="z-30"
                                    positions={positions.content}
                                    numbers={numbers}
                                    selectedId={selectedId}
                                    dimmed={isDimmed}
                                    onSelect={select}
                                />
                            </div>
                        </ScrollArea>
                    </div>
                    {page === 'highway' && surveyOpen && <SurveyPopover onDismiss={() => setSurveyOpen(false)} />}
                    <MarkerLayer
                        key={`frame-${page}`}
                        className="z-30"
                        positions={positions.frame}
                        numbers={numbers}
                        selectedId={selectedId}
                        dimmed={isDimmed}
                        onSelect={select}
                    />
                </BrowserFrame>
                <AnnotationSidebar
                    toolbar={
                        <ToolbarBar
                            inspecting={inspecting}
                            onToggleInspect={toggleInspect}
                            onReset={reset}
                            filter={filter}
                            onFilter={setFilter}
                            counts={counts}
                        />
                    }
                    annotations={pageAnnotations}
                    numbers={numbers}
                    pageLabel={PAGE_LABELS[page]}
                    inspecting={inspecting}
                    selectedId={selectedId}
                    filter={filter}
                    onSelect={select}
                    onFilter={setFilter}
                    onStartInspecting={() => setInspecting(true)}
                    onStopInspecting={toggleInspect}
                    className="@3xl:w-96 shrink-0 basis-96 @3xl:basis-auto"
                />
            </div>
        </div>
    )
}
