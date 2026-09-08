import React, { useEffect, useMemo, useState } from 'react'
import { navigate } from 'gatsby'
import { IconArrowUpRight, IconCheck, IconCopy, IconExpand } from '@posthog/icons'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import Modal from 'components/RadixUI/Modal'
import usePostHog from '../../../hooks/usePostHog'
import { CANVASES, CanvasShape, deepLinkFor, GalleryCanvas, MODELS, SHAPES } from './canvases'

const shapeOrder: CanvasShape[] = ['disposable', 'durable', 'showable']

function useGalleryEvent() {
    const posthog = usePostHog()
    return (action: string, canvas: GalleryCanvas) =>
        posthog?.capture('canvas_gallery_interaction', {
            action,
            canvas: canvas.slug,
            shape: canvas.shape,
            model: MODELS[canvas.model].id,
        })
}

function ShapeChip({ shape }: { shape: CanvasShape }): JSX.Element {
    return (
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${SHAPES[shape].chipClass}`}>
            {SHAPES[shape].label}
        </span>
    )
}

function CopyPromptButton({ canvas, size = 'sm' }: { canvas: GalleryCanvas; size?: 'sm' | 'md' }): JSX.Element {
    const [copied, setCopied] = useState(false)
    const track = useGalleryEvent()
    const copy = async () => {
        await navigator.clipboard.writeText(canvas.prompt)
        track('copy_prompt', canvas)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2000)
    }
    return (
        <OSButton
            size={size}
            variant="secondary"
            icon={copied ? <IconCheck className="text-green" /> : <IconCopy />}
            onClick={copy}
            disabled={copied}
        >
            {copied ? 'Copied' : 'Copy prompt'}
        </OSButton>
    )
}

function OpenInDesktopButton({ canvas, size = 'sm' }: { canvas: GalleryCanvas; size?: 'sm' | 'md' }): JSX.Element {
    const track = useGalleryEvent()
    return (
        <OSButton
            size={size}
            variant="primary"
            icon={<IconArrowUpRight />}
            iconPosition="right"
            onClick={() => {
                track('open_in_desktop', canvas)
                // Same hand-off as /code/open: the browser asks to launch the app.
                window.location.href = deepLinkFor(canvas)
            }}
            tooltip="Opens PostHog Desktop with this prompt and model pre-filled"
        >
            Open in Desktop
        </OSButton>
    )
}

function CanvasCard({ canvas, onOpen }: { canvas: GalleryCanvas; onOpen: () => void }): JSX.Element {
    const { Demo } = canvas
    return (
        <article className="rounded border border-primary bg-primary overflow-hidden flex flex-col group">
            <button
                type="button"
                onClick={onOpen}
                className="relative block w-full h-56 text-left border-b border-primary bg-accent overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                aria-label={`Open the live ${canvas.title} canvas`}
            >
                <div className="absolute top-0 left-0 w-[150%] h-[150%] origin-top-left scale-[0.6667] pointer-events-none select-none">
                    <Demo />
                </div>
                <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded bg-primary/90 border border-primary px-1.5 py-0.5 text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
                    <IconExpand className="size-3" /> Open live
                </span>
            </button>
            <div className="p-3 flex flex-col gap-2 flex-1">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[15px] font-semibold text-primary leading-snug m-0">{canvas.title}</h3>
                    <div className="flex items-center gap-1 shrink-0">
                        {canvas.weird && (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-yellow/20 text-primary">
                                weird
                            </span>
                        )}
                        <ShapeChip shape={canvas.shape} />
                    </div>
                </div>
                <p className="text-sm text-secondary m-0 leading-snug">{canvas.tagline}</p>
                <dl className="grid grid-cols-2 gap-x-3 text-[11px] m-0 mt-auto">
                    <dt className="text-muted">Skim time</dt>
                    <dt className="text-muted">Model</dt>
                    <dd className="text-primary m-0 tabular-nums">{canvas.skim}</dd>
                    <dd className="text-primary m-0">{MODELS[canvas.model].label}</dd>
                </dl>
                <div className="flex flex-wrap gap-1.5 pt-1">
                    <CopyPromptButton canvas={canvas} />
                    <OpenInDesktopButton canvas={canvas} />
                </div>
            </div>
        </article>
    )
}

function CanvasDetail({ canvas }: { canvas: GalleryCanvas }): JSX.Element {
    const { Demo } = canvas
    const model = MODELS[canvas.model]
    return (
        <div className="@container max-h-[85vh] overflow-y-auto bg-primary">
            <div className="h-[340px] @2xl:h-[420px] border-b border-primary bg-accent">
                <Demo />
            </div>
            <div className="p-4 @xl:p-5 grid gap-4 @2xl:grid-cols-[3fr_2fr]">
                <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <ShapeChip shape={canvas.shape} />
                        <span className="text-xs text-muted">{SHAPES[canvas.shape].verb}</span>
                    </div>
                    <p className="text-sm text-primary mt-0 mb-3 leading-relaxed">{canvas.when}</p>
                    <div className="text-xs font-semibold text-secondary mb-1">The prompt</div>
                    <pre className="whitespace-pre-wrap text-[13px] leading-relaxed font-sans bg-accent border border-primary rounded p-3 m-0 text-primary">
                        {canvas.prompt}
                    </pre>
                    <div className="flex flex-wrap gap-2 mt-3">
                        <CopyPromptButton canvas={canvas} size="md" />
                        <OpenInDesktopButton canvas={canvas} size="md" />
                    </div>
                    <p className="text-[11px] text-muted mt-2 mb-0">
                        No app yet?{' '}
                        <Link to="/desktop#download" state={{ newWindow: true }} className="font-semibold">
                            Download PostHog Desktop
                        </Link>
                        . The prompt also works in any space's composer.
                    </p>
                </div>
                <div className="min-w-0 text-sm">
                    <div className="text-xs font-semibold text-secondary mb-1">Suggested model</div>
                    <p className="m-0 mb-3 text-primary">
                        <strong>{model.label}</strong> <code className="text-[11px] text-muted">{model.id}</code>
                        <br />
                        <span className="text-secondary">{model.why}</span>
                    </p>
                    <div className="text-xs font-semibold text-secondary mb-1">What it reads</div>
                    <ul className="m-0 mb-3 pl-4 text-primary space-y-0.5">
                        {canvas.reads.map((r) => (
                            <li key={r}>{r}</li>
                        ))}
                    </ul>
                    <div className="text-xs font-semibold text-secondary mb-1">Skim time</div>
                    <p className="m-0 text-primary tabular-nums">{canvas.skim}</p>
                </div>
            </div>
        </div>
    )
}

export default function CanvasGallery(): JSX.Element {
    const [shapeFilter, setShapeFilter] = useState<CanvasShape | null>(null)
    const [openSlug, setOpenSlug] = useState<string | null>(null)
    const track = useGalleryEvent()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const slug = params.get('canvas')
        if (slug && CANVASES.some((c) => c.slug === slug)) setOpenSlug(slug)
    }, [])

    useEffect(() => {
        if (typeof window === 'undefined') return
        const params = new URLSearchParams(window.location.search)
        if (openSlug) params.set('canvas', openSlug)
        else params.delete('canvas')
        const query = params.toString()
        const next = query ? `${window.location.pathname}?${query}` : window.location.pathname
        if (next !== window.location.pathname + window.location.search) navigate(next, { replace: true })
    }, [openSlug])

    const visible = useMemo(
        () => (shapeFilter ? CANVASES.filter((c) => c.shape === shapeFilter) : CANVASES),
        [shapeFilter]
    )
    const open = openSlug ? CANVASES.find((c) => c.slug === openSlug) : undefined

    return (
        <div className="@container not-prose">
            <div className="grid @xl:grid-cols-3 gap-2 mb-5">
                {shapeOrder.map((shape) => {
                    const info = SHAPES[shape]
                    const count = CANVASES.filter((c) => c.shape === shape).length
                    return (
                        <button
                            key={shape}
                            type="button"
                            onClick={() => setShapeFilter(shapeFilter === shape ? null : shape)}
                            aria-pressed={shapeFilter === shape}
                            className={`text-left rounded border p-3 transition-colors ${
                                shapeFilter === shape
                                    ? 'border-primary bg-accent'
                                    : 'border-primary bg-primary hover:bg-accent'
                            }`}
                        >
                            <div className="flex items-center justify-between gap-2 mb-1">
                                <ShapeChip shape={shape} />
                                <span className="text-[11px] text-muted tabular-nums">
                                    {count} · lives {info.lifespan}
                                </span>
                            </div>
                            <div className="text-sm font-semibold text-primary">{info.verb}</div>
                            <p className="text-[13px] text-secondary m-0 mt-0.5 leading-snug">{info.description}</p>
                        </button>
                    )
                })}
            </div>

            <div className="flex items-center justify-between gap-2 mb-3">
                <h2 className="text-lg font-bold text-primary m-0">
                    {shapeFilter ? `${SHAPES[shapeFilter].label} canvases` : 'All canvases'}{' '}
                    <span className="text-muted font-normal text-sm tabular-nums">({visible.length})</span>
                </h2>
                {shapeFilter && (
                    <OSButton size="sm" variant="underline" onClick={() => setShapeFilter(null)}>
                        Show all
                    </OSButton>
                )}
            </div>

            <div className="grid grid-cols-1 @xl:grid-cols-2 gap-4">
                {visible.map((canvas) => (
                    <CanvasCard
                        key={canvas.slug}
                        canvas={canvas}
                        onOpen={() => {
                            track('open_live', canvas)
                            setOpenSlug(canvas.slug)
                        }}
                    />
                ))}
            </div>

            <Modal
                open={!!open}
                onOpenChange={(isOpen) => !isOpen && setOpenSlug(null)}
                title={open?.title}
                maxWidth={960}
            >
                {open && <CanvasDetail canvas={open} />}
            </Modal>
        </div>
    )
}
