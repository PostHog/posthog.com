import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    MouseSensor,
    TouchSensor,
    KeyboardSensor,
    useDraggable,
    useDndContext,
    useDroppable,
    useSensor,
    useSensors,
    pointerWithin,
    rectIntersection,
} from '@dnd-kit/core'
import { Catalog, Hoggie, loadLatestCatalog } from './catalog'
import OSButton from 'components/OSButton'
import Tooltip from 'components/RadixUI/Tooltip'
import { IconInfo, IconMultiply } from '@posthog/icons'
import { emptyRanking, moveHog, parseRanking, serializeRanking, tierIds, Ranking, Tier } from './state'

const HoggieNames = createContext<Map<string, Hoggie>>(new Map())
const storageKey = 'posthog-hoggie-tier-list-v1'
const defaultTitle = 'My hoggie tier list'
const imageUrl = (slug: string) => `https://brand.posthog.com/hoggies/${slug}.png`

function HogImage({ slug, lazy = false, vector = false }: { slug: string; lazy?: boolean; vector?: boolean }) {
    const bySlug = useContext(HoggieNames)
    return (
        <img
            src={vector ? imageUrl(slug).replace(/\.png$/, '.svg') : imageUrl(slug)}
            alt={bySlug.get(slug)?.name || slug}
            draggable={false}
            crossOrigin="anonymous"
            loading={lazy ? 'lazy' : 'eager'}
            className="size-full object-contain pointer-events-none"
        />
    )
}

function Hog({ slug, onRemove }: { slug: string; onRemove?: () => void }) {
    const bySlug = useContext(HoggieNames)
    const [previewOpen, setPreviewOpen] = useState(false)
    const { active } = useDndContext()
    const drag = useDraggable({ id: slug })
    const drop = useDroppable({ id: `hog:${slug}`, data: { slug } })
    const trigger = (
        <button
            ref={(node) => {
                drag.setNodeRef(node)
                drop.setNodeRef(node)
            }}
            {...drag.listeners}
            {...drag.attributes}
            aria-label={`Drag ${bySlug.get(slug)?.name}`}
            className={`size-12 @lg:size-14 p-1 rounded border bg-primary touch-auto shrink-0 focus-visible:ring-2 focus-visible:ring-orange ${
                drop.isOver ? 'border-orange ring-2 ring-orange' : 'border-transparent hover:border-primary'
            } ${drag.isDragging ? 'opacity-30' : ''}`}
        >
            <HogImage slug={slug} lazy />
        </button>
    )
    return (
        <span className="relative inline-flex shrink-0">
            <Tooltip
                trigger={trigger}
                open={previewOpen && !active}
                onOpenChange={setPreviewOpen}
                delay={150}
                sideOffset={10}
                className="inline-flex shrink-0"
                contentClassName="pointer-events-none !p-3"
            >
                <div className="size-56">
                    <HogImage slug={slug} />
                </div>
                <p className="text-sm font-semibold text-center !m-0 pt-2">{bySlug.get(slug)?.name}</p>
            </Tooltip>
            {onRemove && (
                <button
                    type="button"
                    aria-label={`Remove ${bySlug.get(slug)?.name} from tier list`}
                    title={`Remove ${bySlug.get(slug)?.name}`}
                    className="absolute top-0 right-0 z-10 size-5 flex items-center justify-center rounded-full border border-primary bg-primary text-primary hover:bg-accent focus-visible:ring-2 focus-visible:ring-orange"
                    onClick={() => {
                        setPreviewOpen(false)
                        onRemove()
                    }}
                >
                    <IconMultiply className="size-3" aria-hidden="true" />
                </button>
            )}
        </span>
    )
}

function DropZone({ id, children }: { id: string; children: React.ReactNode }) {
    const { setNodeRef, isOver } = useDroppable({ id })
    return (
        <div
            ref={setNodeRef}
            className={`flex items-center gap-1 p-1 ${
                id === 'tray'
                    ? 'w-max min-w-full flex-nowrap'
                    : 'min-w-0 flex-1 h-full flex-nowrap overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            } ${isOver ? 'bg-accent ring-2 ring-inset ring-orange' : ''}`}
        >
            {children}
        </div>
    )
}

export default function TierList() {
    const [catalog, setCatalog] = useState<Catalog | null>(null)
    const [loadError, setLoadError] = useState(false)
    const [loadAttempt, setLoadAttempt] = useState(0)
    const assets = catalog?.hoggies || []
    const tierColors = catalog?.tierColors || []
    const bySlug = useMemo(() => new Map(assets.map((asset) => [asset.slug, asset])), [assets])
    const [ranking, setRanking] = useState<Ranking>(emptyRanking)
    const [query, setQuery] = useState('')
    const [dragging, setDragging] = useState<string | null>(null)
    const [finished, setFinished] = useState(false)
    const [ready, setReady] = useState(false)
    const [message, setMessage] = useState('')
    const [exporting, setExporting] = useState(false)
    const board = useRef<HTMLDivElement>(null)
    const trayViewport = useRef<HTMLDivElement>(null)
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } }),
        useSensor(KeyboardSensor)
    )
    const ranked = useMemo(() => new Set(tierIds.flatMap((id) => ranking[id])), [ranking])
    const tray = assets.filter(
        ({ slug, name, tags }) =>
            !ranked.has(slug) && `${name} ${(tags || []).join(' ')}`.toLowerCase().includes(query.toLowerCase())
    )

    useEffect(() => {
        const controller = new AbortController()
        const timeout = window.setTimeout(() => controller.abort(), 5000)
        let cancelled = false
        async function initialize() {
            const latest = await loadLatestCatalog(controller.signal)
            window.clearTimeout(timeout)
            if (cancelled) return
            if (!latest) {
                setLoadError(true)
                return
            }
            setCatalog(latest)
            // Restore the local draft only after loading the current inventory.
            const available = new Set(latest.hoggies.map(({ slug }) => slug))
            let saved: string | null = null
            try {
                saved = localStorage.getItem(storageKey)
            } catch {
                /* Storage can be disabled. */
            }
            const restored = saved ? parseRanking(saved, available) : null
            if (restored) {
                setRanking(restored.ranking)
            }
            setReady(true)
        }
        initialize()
        return () => {
            cancelled = true
            window.clearTimeout(timeout)
            controller.abort()
        }
    }, [loadAttempt])

    useEffect(() => {
        if (!ready) return
        try {
            localStorage.setItem(storageKey, serializeRanking(defaultTitle, ranking))
        } catch {
            /* Ranking still works without storage. */
        }
    }, [ranking, ready])

    useEffect(() => {
        const viewport = trayViewport.current
        if (!viewport) return
        const scrollSideways = (event: WheelEvent) => {
            if (
                event.ctrlKey ||
                Math.abs(event.deltaX) >= Math.abs(event.deltaY) ||
                viewport.scrollWidth <= viewport.clientWidth
            )
                return
            event.preventDefault()
            viewport.scrollLeft +=
                event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientWidth : 1)
        }
        viewport.addEventListener('wheel', scrollSideways, { passive: false })
        return () => viewport.removeEventListener('wheel', scrollSideways)
    }, [finished, ready])

    useEffect(() => {
        if (trayViewport.current) trayViewport.current.scrollLeft = 0
    }, [query])

    function place(slug: string, destination: Tier | 'tray', before?: string) {
        setRanking((current) => moveHog(current, slug, destination, before))

        setMessage(
            `${bySlug.get(slug)?.name} moved to ${
                destination === 'tray' ? 'the unranked tray' : `${destination} tier`
            }.`
        )
    }

    function onDragEnd({ active, over }: DragEndEvent) {
        setDragging(null)
        if (!over || active.id === over.data.current?.slug) return
        const before = over.data.current?.slug as string | undefined
        const destination = before ? tierIds.find((id) => ranking[id].includes(before)) || 'tray' : String(over.id)
        if (destination === 'tray' || tierIds.includes(destination as Tier))
            place(String(active.id), destination as Tier | 'tray', before)
    }

    async function download() {
        const sourceBoard = board.current
        if (!sourceBoard || exporting) return
        setExporting(true)
        setMessage('Making your image…')
        let exportContainer: HTMLDivElement | undefined
        const controller = new AbortController()
        const timeout = window.setTimeout(() => controller.abort(), 15000)
        const deadline = new Promise<never>((_, reject) => {
            controller.signal.addEventListener('abort', () => reject(new Error('Image export timed out')), {
                once: true,
            })
        })
        async function renderImage(source: HTMLDivElement) {
            await document.fonts.ready
            controller.signal.throwIfAborted()
            const { toPng } = await import('html-to-image')
            controller.signal.throwIfAborted()
            // A separate layout keeps the download identical on phones and desktops without resizing the preview.
            exportContainer = document.createElement('div')
            exportContainer.className = '@container'
            exportContainer.setAttribute('aria-hidden', 'true')
            Object.assign(exportContainer.style, {
                position: 'fixed',
                left: '-10000px',
                top: '0',
                width: '1200px',
                pointerEvents: 'none',
            })
            const exportBoard = source.cloneNode(true) as HTMLDivElement
            exportBoard.style.width = '1200px'
            exportContainer.appendChild(exportBoard)
            // Inline artwork ourselves so an aborted fetch cannot poison html-to-image's resource cache.
            await Promise.all(
                Array.from(exportBoard.querySelectorAll('img')).map(async (img) => {
                    const response = await fetch(img.src, { signal: controller.signal })
                    if (!response.ok) throw new Error(`Image returned ${response.status}`)
                    const blob = await response.blob()
                    const dataUrl = await new Promise<string>((resolve, reject) => {
                        const reader = new FileReader()
                        reader.onload = () => resolve(reader.result as string)
                        reader.onerror = () => reject(reader.error)
                        reader.readAsDataURL(blob)
                    })
                    controller.signal.throwIfAborted()
                    img.src = dataUrl
                    await img.decode()
                })
            )
            controller.signal.throwIfAborted()
            source.parentElement?.appendChild(exportContainer)
            const { width, height } = exportBoard.getBoundingClientRect()
            // Keep typical lists at 4800px wide, with a canvas-area cap for unusually tall rankings.
            const scale = Math.min(4800 / width, Math.sqrt((16 * 1024 * 1024) / (width * height)))
            const outputWidth = Math.floor(width * scale)
            // Render the SVG/foreignObject at its final resolution instead of upscaling a thumbnail raster.
            return toPng(exportBoard, {
                fetchRequestInit: { signal: controller.signal },
                width: outputWidth,
                height: Math.ceil(height * scale),
                pixelRatio: 1,
                style: {
                    width: `${width}px`,
                    height: `${height}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                },
                backgroundColor: getComputedStyle(exportBoard).backgroundColor,
            })
        }
        try {
            const url = await Promise.race([renderImage(sourceBoard), deadline])
            const link = document.createElement('a')
            link.download = 'posthog-hoggie-tier-list.png'
            link.href = url
            link.click()
            setMessage('Image downloaded.')
        } catch {
            setMessage('The image could not be downloaded. Please try again.')
        } finally {
            window.clearTimeout(timeout)
            controller.abort()
            exportContainer?.querySelectorAll('img').forEach((img) => img.removeAttribute('src'))
            exportContainer?.remove()
            setExporting(false)
        }
    }

    if (!catalog) {
        return (
            <div className="@container absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center text-primary">
                <h1 className="text-2xl !m-0">Hoggie Tier List</h1>
                <p role="status" className="text-secondary !m-0">
                    {loadError ? "We couldn't load the hoggies. Please try again." : 'Loading the hoggies…'}
                </p>
                {loadError && (
                    <OSButton
                        variant="primary"
                        onClick={() => {
                            setLoadError(false)
                            setLoadAttempt((attempt) => attempt + 1)
                        }}
                    >
                        Try again
                    </OSButton>
                )}
            </div>
        )
    }

    return (
        <HoggieNames.Provider value={bySlug}>
            <div
                aria-busy={!ready}
                className={`@container text-primary absolute inset-0 min-h-0 p-3 @lg:p-4 ${
                    finished ? 'overflow-y-auto bg-accent' : 'flex flex-col overflow-y-auto'
                }`}
            >
                {finished ? (
                    <header className="max-w-4xl mx-auto text-center pt-2 pb-6" aria-label="Download your ranking">
                        <h1 className="text-3xl @lg:text-5xl font-bold !m-0">Share with your friends</h1>
                        <p className="text-sm @lg:text-base text-secondary mt-3 mb-0 max-w-2xl mx-auto">
                            Ideally on X would be cool. (Don't forget to tag @posthog!)
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-3 mt-4">
                            <OSButton variant="primary" size="lg" disabled={exporting} onClick={download}>
                                Download image
                            </OSButton>
                            <OSButton
                                size="lg"
                                disabled={exporting}
                                onClick={() => {
                                    setFinished(false)
                                    setMessage('')
                                }}
                            >
                                Back to editing
                            </OSButton>
                        </div>
                        <p role="status" aria-live="polite" className="min-h-5 text-sm text-secondary !mt-2 !mb-0">
                            {message}
                        </p>
                    </header>
                ) : (
                    <header className="flex shrink-0 items-center justify-between gap-3 mb-3">
                        <div className="min-w-0">
                            <h1 className="text-xl @lg:text-2xl !m-0">Hoggie Tier List</h1>
                            <p className="text-sm text-secondary !m-0">
                                Rank your favorite hoggies and share with friends. Choose wisely. Hoggies have feelings
                                too.
                            </p>
                        </div>
                        {!finished && (
                            <OSButton
                                size="sm"
                                disabled={!ranked.size}
                                onClick={() => {
                                    if (window.confirm('Clear your ranking and start over?')) {
                                        setRanking(emptyRanking())

                                        setMessage('Ranking cleared.')
                                    }
                                }}
                            >
                                Start over
                            </OSButton>
                        )}
                    </header>
                )}

                <DndContext
                    sensors={ready ? sensors : []}
                    collisionDetection={(args) =>
                        args.pointerCoordinates ? pointerWithin(args) : rectIntersection(args)
                    }
                    onDragStart={({ active }) => {
                        setDragging(String(active.id))
                    }}
                    onDragCancel={() => setDragging(null)}
                    onDragEnd={onDragEnd}
                >
                    <div className={finished ? 'max-w-4xl mx-auto w-full shadow-lg rounded mb-4' : 'contents'}>
                        <div
                            ref={board}
                            className={`bg-primary border border-primary rounded ${
                                finished
                                    ? 'overflow-hidden'
                                    : 'flex flex-col flex-1 min-h-[287px] @lg:min-h-[327px] overflow-hidden'
                            }`}
                        >
                            {finished && (
                                <div className="flex shrink-0 items-center justify-between gap-3 px-3 py-2 border-b border-primary">
                                    <h2 className="text-lg !m-0 break-words min-w-0">{defaultTitle}</h2>
                                    <div className="w-24 shrink-0">
                                        <img
                                            src="/brand/posthog-logo.svg"
                                            alt="PostHog"
                                            className="w-full dark:hidden"
                                        />
                                        <img
                                            src="/brand/posthog-logo-white.svg"
                                            alt="PostHog"
                                            className="w-full hidden dark:block"
                                        />
                                    </div>
                                </div>
                            )}
                            {tierIds.map((tier, index) => (
                                <div
                                    key={tier}
                                    role="group"
                                    aria-label={`${tier} tier`}
                                    className={`flex flex-1 border-b border-primary ${
                                        finished ? 'min-h-[48px]' : 'min-h-[57px] @lg:min-h-[65px] overflow-hidden'
                                    }`}
                                >
                                    <div
                                        style={{ backgroundColor: tierColors[index] }}
                                        className="w-12 @lg:w-16 shrink-0 flex items-center justify-center text-black"
                                    >
                                        <strong className="text-3xl !text-black">{tier}</strong>
                                    </div>
                                    {finished ? (
                                        <div className="flex flex-wrap items-center gap-1 p-2 min-w-0 flex-1">
                                            {ranking[tier].map((slug) => (
                                                <div
                                                    key={slug}
                                                    title={bySlug.get(slug)?.name}
                                                    className="size-12 @lg:size-16 p-1"
                                                >
                                                    <HogImage slug={slug} vector />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <DropZone id={tier}>
                                            {ranking[tier].map((slug) => (
                                                <Hog key={slug} slug={slug} onRemove={() => place(slug, 'tray')} />
                                            ))}
                                            {!ranking[tier].length && (
                                                <span className="text-sm text-secondary px-2">Drop a hoggie here</span>
                                            )}
                                        </DropZone>
                                    )}
                                </div>
                            ))}
                            {finished && (
                                <div className="flex shrink-0 justify-end px-3 py-2 text-xs text-secondary">
                                    <span>Make yours at posthog.com/tier-list</span>
                                </div>
                            )}
                        </div>
                    </div>
                    {!finished && (
                        <section className="shrink-0 mt-3" aria-label="Unranked hoggies">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h2 className="text-sm !m-0 font-semibold">
                                    Hoggie tray{' '}
                                    <span className="text-secondary font-normal">({assets.length - ranked.size})</span>
                                </h2>
                                <Tooltip
                                    trigger={
                                        <button
                                            type="button"
                                            aria-label="How to rank hoggies"
                                            className="inline-flex rounded focus-visible:ring-2 focus-visible:ring-orange"
                                        >
                                            <IconInfo className="size-4 text-secondary" aria-hidden="true" />
                                        </button>
                                    }
                                    sideOffset={6}
                                >
                                    <p className="max-w-xs text-sm leading-normal !m-0">
                                        Hover to see a hoggie up close. Scroll sideways to browse, then drag a hoggie
                                        into a tier. Use the X on a ranked hoggie to return it to the tray.
                                    </p>
                                </Tooltip>
                                <label className="sr-only" htmlFor="hoggie-search">
                                    Search hoggies
                                </label>
                                <input
                                    id="hoggie-search"
                                    type="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search hoggies…"
                                    className="bg-primary border border-primary rounded px-2 py-1 text-sm flex-1 min-w-0 max-w-xs"
                                />
                                <OSButton
                                    size="sm"
                                    aria-label="Scroll hoggies left"
                                    onClick={() =>
                                        trayViewport.current?.scrollBy({
                                            left: -trayViewport.current.clientWidth * 0.8,
                                            behavior: 'smooth',
                                        })
                                    }
                                >
                                    ←
                                </OSButton>
                                <OSButton
                                    size="sm"
                                    aria-label="Scroll hoggies right"
                                    onClick={() =>
                                        trayViewport.current?.scrollBy({
                                            left: trayViewport.current.clientWidth * 0.8,
                                            behavior: 'smooth',
                                        })
                                    }
                                >
                                    →
                                </OSButton>
                            </div>
                            <div
                                ref={trayViewport}
                                tabIndex={0}
                                aria-label="Scrollable hoggie tray"
                                className="border border-primary rounded bg-accent overflow-x-auto overflow-y-hidden"
                            >
                                <DropZone id="tray">
                                    {tray.map(({ slug }) => (
                                        <Hog key={slug} slug={slug} />
                                    ))}
                                    {!tray.length && (
                                        <p className="text-sm text-secondary !m-2">
                                            {query ? 'No hoggies match your search.' : 'Every hoggie has a home.'}
                                        </p>
                                    )}
                                </DropZone>
                            </div>
                        </section>
                    )}
                    <DragOverlay style={{ pointerEvents: 'none' }}>
                        {dragging && (
                            <div className="size-20 bg-primary rounded border border-primary shadow-lg p-1">
                                <HogImage slug={dragging} />
                            </div>
                        )}
                    </DragOverlay>
                </DndContext>

                {!finished && (
                    <footer className="shrink-0 flex justify-center border-t border-primary mt-3 pt-3">
                        <div className="w-full max-w-sm">
                            <OSButton
                                variant="primary"
                                size="xl"
                                width="full"
                                disabled={!ranked.size || !ready}
                                onClick={() => {
                                    setFinished(true)
                                    setMessage('')
                                }}
                            >
                                Finish & share
                            </OSButton>
                        </div>
                    </footer>
                )}

                {!finished && (
                    <p role="status" aria-live="polite" className="sr-only">
                        {message}
                    </p>
                )}
            </div>
        </HoggieNames.Provider>
    )
}
