import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { IconMapPin } from '@posthog/icons'

import { Popover } from 'components/RadixUI/Popover'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Tooltip from 'components/RadixUI/Tooltip'
import BrowserFrame from 'components/Instrumentation/BrowserFrame'
import UnterSite from 'components/Instrumentation/Unter'
import MarkerLayer from 'components/Instrumentation/overlay/MarkerLayer'
import useAnnotationPositions from 'components/Instrumentation/overlay/useAnnotationPositions'
import { InputBlock, OutputBlock } from 'components/Instrumentation/overlay/InstrumentationBlocks'
import { ANNOTATIONS } from 'components/Instrumentation/overlay/annotations'
import { TOOLS, TOOL_CLASSES } from 'components/Instrumentation/overlay/tools'
import { Annotation, ToolKey, UnterPageId } from 'components/Instrumentation/overlay/types'
import 'components/Instrumentation/unter.css'

import { Fig } from './figures'
import UnterMinimap from './UnterMinimap'

/* Module-level so "measure nothing" is a stable reference. An inline `[]` changes the
   measuring effect's deps every render, which re-measures, which sets state, which renders
   again – a 60fps loop in the state the figure loads in. */
const NO_ANNOTATIONS: Annotation[] = []

/** Breathing room around a cropped element, in px. */
const CROP_PAD = 16

/** Half a marker, plus its ring. A marker is centred on its anchor, so this much of it sits
 *  outside whatever the anchor is attached to. */
const MARKER_RADIUS = 14

interface UnterFigureProps {
    n?: number
    caption: string
    legend?: React.ReactNode
    /** Which Unter page. One page per chapter – the journey stays in one place. */
    page?: UnterPageId
    /**
     * A `data-unter-id` to crop to. Without it the figure is the establishing shot: the whole
     * page in browser chrome. With it the figure is one component, at size, no browser chrome
     * and nothing to scroll.
     */
    focus?: string
    /** Restrict markers to these tools. One tool at a time is the point. */
    tools?: ToolKey[]
    /** Show markers from the start. Off means the reader sees Unter as its users do. */
    inspect?: boolean
}

/**
 * Live Unter, in the reading column, one piece at a time.
 *
 * The demo began as a full-screen explainer: four pages, eleven touchpoints, every tool at
 * once. That asks the reader to find their own path through it, and the markers' numbering
 * follows the page's layout rather than any order worth reading in. A chapter is already a
 * sequence, so this figure shows one crop, filtered to one tool, and the prose does the
 * guiding – complexity arrives a figure at a time instead of all at once.
 *
 * Everything stays interactive. A crop is still the live site: retry still fails, markers
 * still open. What it drops is scroll and chrome, not behaviour.
 */
/** The live page, clipped to one component and offset so that component is what you see. */
function CropFrame({
    bodyRef,
    crop,
    site,
}: {
    bodyRef: React.MutableRefObject<HTMLDivElement | null>
    crop: { y: number; height: number } | null
    site: React.ReactNode
}): JSX.Element {
    return (
        <BrowserFrame bodyRef={bodyRef} chrome={false} className="w-full rounded border border-primary">
            <div
                className="relative w-full overflow-hidden [&_.un-topnav]:!static"
                style={{ height: crop ? crop.height + CROP_PAD * 2 : 240 }}
            >
                <div className="w-full" style={{ marginTop: crop ? -crop.y + CROP_PAD : 0 }}>
                    {site}
                </div>
            </div>
        </BrowserFrame>
    )
}

export default function UnterFigure({
    n = 1,
    caption,
    legend,
    page = 'ride',
    focus,
    tools,
    inspect = true,
}: UnterFigureProps): JSX.Element {
    const [inspecting, setInspecting] = useState(inspect)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [crop, setCrop] = useState<{ x: number; y: number; height: number } | null>(null)
    /* Ids whose marker actually falls inside the crop. Tool filtering alone is not enough: it
       selects across the whole page, so a crop of the nav still listed touchpoints living in the
       footer, numbered and colour-matched, with no marker anywhere to click. */
    const [inCrop, setInCrop] = useState<string[] | null>(null)

    const frameBodyRef = useRef<HTMLDivElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)
    const viewportRef = useRef<HTMLDivElement | null>(null)

    // Stable identity per (page, tools): the measurement hook re-measures on identity change.
    const toolKey = tools ? tools.join(',') : ''
    const annotations = useMemo(() => {
        const keys = toolKey ? toolKey.split(',') : null
        return ANNOTATIONS.filter((a) => a.page === page && (!keys || keys.includes(a.tool)))
    }, [page, toolKey])
    /* What the figure actually shows. A crop narrows the tool-filtered set to the markers inside
       it; the establishing shot shows the whole page, so nothing is narrowed. */
    const shown = useMemo(
        () => (focus && inCrop ? annotations.filter((a) => inCrop.includes(a.id)) : annotations),
        [annotations, focus, inCrop]
    )
    const numbers = useMemo(() => Object.fromEntries(shown.map((a, i) => [a.id, i + 1])), [shown])

    // Crop first, then measure markers against the cropped content: both read the same
    // layout, and the markers have to agree with where the content ended up.
    const measureCrop = useCallback(() => {
        const content = contentRef.current
        if (!content || !focus) return
        const el = content.querySelector<HTMLElement>(`[data-unter-id="${focus}"]`)
        if (!el) return
        const cb = content.getBoundingClientRect()
        const r = el.getBoundingClientRect()
        let top = r.top - cb.top
        let bottom = top + r.height

        // A target counts as in the crop when it is the focused element or sits inside it.
        const ids: string[] = []
        annotations.forEach((a) => {
            const t = content.querySelector<HTMLElement>(`[data-unter-id="${a.target}"]`)
            if (!t || !(t === el || el.contains(t))) return
            ids.push(a.id)
            if (!inspecting) return
            /* Grow the box to hold the marker as well as the element. An anchor is a fraction of
               its target's box and is allowed outside it (`dy: 1.15` means just below), so a box
               sized to the element alone clips markers off its edges – or loses them entirely. */
            const tr = t.getBoundingClientRect()
            const markerY = tr.top - cb.top + tr.height * a.dy
            top = Math.min(top, markerY - MARKER_RADIUS)
            bottom = Math.max(bottom, markerY + MARKER_RADIUS)
        })

        setCrop({ x: r.left - cb.left, y: top, height: bottom - top })
        setInCrop((prev) => (prev && prev.length === ids.length && prev.every((id, i) => id === ids[i]) ? prev : ids))
    }, [focus, annotations, inspecting])

    useLayoutEffect(() => {
        if (!focus) {
            setCrop(null)
            return
        }
        measureCrop()
        const content = contentRef.current
        if (!content) return
        const observer = new ResizeObserver(measureCrop)
        observer.observe(content)
        if (frameBodyRef.current) observer.observe(frameBodyRef.current)
        // The reader can change the crop's own height (retrying the map, opening an FAQ row).
        content.addEventListener('click', measureCrop, true)
        window.addEventListener('resize', measureCrop)
        return () => {
            observer.disconnect()
            content.removeEventListener('click', measureCrop, true)
            window.removeEventListener('resize', measureCrop)
        }
    }, [focus, measureCrop])

    const positions = useAnnotationPositions(
        inspecting ? shown : NO_ANNOTATIONS,
        contentRef,
        frameBodyRef,
        crop ? Math.round(crop.y) : 0
    )

    useEffect(() => {
        if (!inspecting) setSelectedId(null)
    }, [inspecting])

    const open = selectedId ? shown.find((a) => a.id === selectedId) : undefined

    const site = (
        <div className="relative" ref={contentRef}>
            <div className="unter-root un-site">
                <UnterSite page={page} onNavigate={() => undefined} onToggleSurvey={() => undefined} />
            </div>
            <MarkerLayer
                className="z-30"
                positions={positions.content}
                numbers={numbers}
                selectedId={selectedId}
                dimmed={() => false}
                onSelect={setSelectedId}
            />
        </div>
    )

    return (
        <Fig n={n} caption={caption} legend={legend}>
            <div data-scheme="primary" className="@container flex flex-col gap-2">
                {focus ? (
                    <div className="relative">
                        <CropFrame bodyRef={frameBodyRef} crop={crop} site={site} />
                        {/* A deliberate control rather than a hover target on the frame itself.
                            The frame is full of markers with their own tooltips, so opening the
                            thumbnail on frame-hover meant two explanations fighting over one
                            cursor. Hover the button for what it does, click it for the map. */}
                        <div className="absolute top-2 right-2 z-40">
                            <Popover
                                side="right"
                                align="start"
                                sideOffset={8}
                                contentClassName="!p-2"
                                trigger={
                                    <button type="button" aria-label="Where am I on the page">
                                        <Tooltip
                                            delay={200}
                                            trigger={
                                                <span className="flex items-center justify-center size-7 rounded-full bg-primary border border-primary shadow-md text-primary hover:bg-accent transition-colors">
                                                    <IconMapPin className="size-4" />
                                                </span>
                                            }
                                        >
                                            Where am I?
                                        </Tooltip>
                                    </button>
                                }
                            >
                                <UnterMinimap page={page} focus={focus} />
                            </Popover>
                        </div>
                    </div>
                ) : (
                    // The establishing shot: the whole page, in chrome, once per chapter. The
                    // only figure with a scroll of its own, and the only one that needs it. No
                    // map button here – locating the whole page on a picture of itself says nothing.
                    <BrowserFrame bodyRef={frameBodyRef} className="h-[420px] shrink-0">
                        <div className="relative z-20 flex flex-col h-full min-h-0">
                            <ScrollArea viewportRef={viewportRef}>{site}</ScrollArea>
                        </div>
                    </BrowserFrame>
                )}

                {/* The touchpoint, inline. No panel and no second scroll: the book scrolls. */}
                {inspecting && shown.length > 0 && (
                    <div className="rounded border border-primary bg-primary p-3">
                        {open ? (
                            <>
                                <div className="flex items-start gap-2">
                                    <p className="flex-1 text-xs font-semibold uppercase tracking-wide text-secondary m-0">
                                        {TOOLS[open.tool].name}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedId(null)}
                                        className="text-xs font-semibold text-secondary hover:text-primary"
                                    >
                                        Close
                                    </button>
                                </div>
                                <h3 className="text-sm font-bold text-primary m-0 mb-1.5">{open.title}</h3>
                                <div className="text-sm text-secondary">{open.body.why}</div>
                                {open.body.input && <InputBlock input={open.body.input} tool={TOOLS[open.tool]} />}
                                {open.body.output && <OutputBlock output={open.body.output} tool={TOOLS[open.tool]} />}
                            </>
                        ) : (
                            <div className="flex flex-wrap items-center gap-2">
                                {shown.map((a) => {
                                    const tool = TOOLS[a.tool]
                                    const { Icon } = tool
                                    const classes = TOOL_CLASSES[tool.color]
                                    return (
                                        <button
                                            key={a.id}
                                            type="button"
                                            onClick={() => setSelectedId(a.id)}
                                            className="flex items-center gap-1.5 px-2 py-1 rounded text-xs hover:bg-accent"
                                        >
                                            <span
                                                className={`flex items-center justify-center size-5 rounded-full font-semibold ring-1 ring-white ${classes.bg} ${classes.on}`}
                                            >
                                                {numbers[a.id]}
                                            </span>
                                            <Icon className={`size-4 ${classes.text}`} />
                                            <span className="font-code text-primary">{a.label}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Fig>
    )
}
