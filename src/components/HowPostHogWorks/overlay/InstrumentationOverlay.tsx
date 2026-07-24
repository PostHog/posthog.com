import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ANNOTATIONS } from './annotations'
import AnnotationPopover from './AnnotationPopover'
import Chip from './Chip'
import Legend from './Legend'
import TogglePill from './TogglePill'
import useAnchorTracking, { AnnotationNodes } from './useAnchorTracking'
import { Annotation, ProductKey, SnufflPageId } from './types'

interface InstrumentationOverlayProps {
    on: boolean
    setOn: (on: boolean) => void
    page: SnufflPageId
    /** The browser-frame body: coordinate origin, query root, and clipping box */
    stageRef: React.MutableRefObject<HTMLDivElement | null>
}

export default function InstrumentationOverlay({
    on,
    setOn,
    page,
    stageRef,
}: InstrumentationOverlayProps): JSX.Element {
    const [filter, setFilter] = useState<ProductKey | null>(null)
    const [open, setOpenState] = useState<Annotation | null>(null)

    const nodesRef = useRef(new Map<string, AnnotationNodes>())
    const legendRef = useRef<HTMLDivElement | null>(null)
    const outlineRef = useRef<HTMLDivElement | null>(null)
    const popoverRef = useRef<HTMLDivElement | null>(null)
    const hoverRef = useRef<Annotation | null>(null)
    // The tracking loop reads the open annotation from a ref every frame;
    // React state renders the popover's content.
    const openRef = useRef<Annotation | null>(null)

    const setOpen = (annotation: Annotation | null) => {
        openRef.current = annotation
        setOpenState(annotation)
    }

    const pageAnnotations = useMemo(() => ANNOTATIONS.filter((a) => a.page === page), [page])

    // Page switches and toggling off invalidate the open popover and hover.
    useEffect(() => {
        setOpen(null)
        hoverRef.current = null
    }, [page, on])

    useAnchorTracking({
        enabled: on,
        annotations: pageAnnotations,
        stageRef,
        nodesRef,
        legendRef,
        outlineRef,
        popoverRef,
        hoverRef,
        openRef,
    })

    // Esc or a click outside the popover/chips closes the popover.
    useEffect(() => {
        if (!open) return
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(null)
        }
        const onPointerDown = (e: PointerEvent) => {
            const target = e.target as HTMLElement | null
            if (target?.closest('[data-hpw-popover]') || target?.closest('[data-hpw-chip]')) return
            setOpen(null)
        }
        document.addEventListener('keydown', onKeyDown)
        document.addEventListener('pointerdown', onPointerDown)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.removeEventListener('pointerdown', onPointerDown)
        }
    }, [open])

    const registerNode = (id: string, kind: keyof AnnotationNodes) => (el: HTMLElement | null) => {
        const map = nodesRef.current
        const entry = map.get(id) ?? { dot: null, chip: null }
        entry[kind] = el
        if (!entry.dot && !entry.chip) map.delete(id)
        else map.set(id, entry)
    }

    return (
        <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
            {on && (
                <>
                    <div ref={outlineRef} className="hpw-outline" />
                    {pageAnnotations.map((annotation, index) => (
                        <Chip
                            // Keyed by page so chips remount (and replay their
                            // staggered entrance) on every page switch.
                            key={`${page}-${annotation.id}`}
                            annotation={annotation}
                            index={index}
                            dimmed={!!filter && filter !== annotation.product}
                            registerDot={registerNode(annotation.id, 'dot')}
                            registerChip={registerNode(annotation.id, 'chip')}
                            onOpen={() => setOpen(annotation)}
                            onHoverChange={(hovering) => {
                                if (hovering) hoverRef.current = annotation
                                else if (hoverRef.current === annotation) hoverRef.current = null
                            }}
                        />
                    ))}
                    <Legend ref={legendRef} pageAnnotations={pageAnnotations} filter={filter} onFilter={setFilter} />
                    {open && (
                        <AnnotationPopover
                            key={open.id}
                            ref={popoverRef}
                            annotation={open}
                            onClose={() => setOpen(null)}
                        />
                    )}
                </>
            )}
            <TogglePill on={on} onClick={() => setOn(!on)} />
        </div>
    )
}
