import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { motion, useReducedMotion } from 'framer-motion'
import {
    IconActivity,
    IconArrowUpRight,
    IconCheck,
    IconCopy,
    IconCursorClick,
    IconDatabase,
    IconDecisionTree,
    IconEndpoints,
    IconEye,
    IconExpand,
    IconFlask,
    IconGraph,
    IconHandMoney,
    IconLlmAnalytics,
    IconMessage,
    IconPeople,
    IconPieChart,
    IconRewindPlay,
    IconSupport,
    IconToggle,
    IconWarning,
} from '@posthog/icons'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import { DownloadButtons } from 'components/Code/DownloadButtons'
import Glow from 'components/Glow'
import { Bang } from 'components/Icons'
import OSButton from 'components/OSButton'
import { IconDiscord } from 'components/OSIcons/Icons'
import Modal from 'components/RadixUI/Modal'
import SlotMachineText from 'components/SlotMachineText'
import { useApp } from '../../../context/App'
import usePostHog from '../../../hooks/usePostHog'
import posthogIcon from '../../../images/posthog-icon-white.svg'
import {
    CANVASES,
    CATEGORIES,
    CanvasCategory,
    CanvasTopic,
    deepLinkFor,
    GalleryCanvas,
    SHAPES,
    type CanvasTool,
} from './canvases'

const categoryOrder: CanvasCategory[] = ['investigate', 'monitor', 'present']
type SwipeFileId = CanvasCategory | 'all'

const swipeFileOrder: SwipeFileId[] = ['all', ...categoryOrder]
const swipeFileTabStart: Record<SwipeFileId, number> = {
    investigate: 58,
    monitor: 436,
    present: 218,
    all: 670,
}

const folderTopPath = (tabStart: number): string => {
    const tabEnd = tabStart + 232
    return `M 0 64 H ${tabStart} C ${tabStart + 12} 64 ${tabStart + 18} 59 ${tabStart + 22} 50 C ${tabStart + 26} 34 ${
        tabStart + 34
    } 20 ${tabStart + 50} 20 H ${tabEnd} C ${tabEnd + 12} 20 ${tabEnd + 20} 34 ${tabEnd + 24} 50 C ${tabEnd + 28} 59 ${
        tabEnd + 34
    } 64 ${tabEnd + 46} 64 H 970 V 64 Z`
}

const folderTones: Record<SwipeFileId, { color: string }> = {
    investigate: { color: '#E5F1FF' },
    monitor: { color: '#FBE2BD' },
    present: { color: '#FFF1D5' },
    all: { color: '#E2D6FF' },
}

const allCanvasesFile = {
    label: 'All canvases',
}

const paintCanvasStyle = {
    backgroundImage: 'conic-gradient(#EEEFE9 25%, #fff 0 50%, #EEEFE9 0 75%, #fff 0)',
    backgroundSize: '16px 16px',
}

type PaintTool = {
    label: string
    Icon: React.ComponentType<{ className?: string }>
    color: string
}

const paintTools: PaintTool[] = [
    { label: 'Product analytics', Icon: IconGraph, color: 'blue' },
    { label: 'Web analytics', Icon: IconPieChart, color: 'green-2' },
    { label: 'AI observability', Icon: IconLlmAnalytics, color: 'purple' },
    { label: 'Session replay', Icon: IconRewindPlay, color: 'yellow' },
    { label: 'Replay Vision', Icon: IconEye, color: 'yellow' },
    { label: 'Feature flags', Icon: IconToggle, color: 'seagreen' },
    { label: 'Experiments', Icon: IconFlask, color: 'purple' },
    { label: 'Error tracking', Icon: IconWarning, color: 'orange' },
    { label: 'Logs', Icon: IconActivity, color: 'red' },
    { label: 'Endpoints', Icon: IconEndpoints, color: 'teal' },
    { label: 'Workflows', Icon: IconDecisionTree, color: 'teal' },
    { label: 'Surveys', Icon: IconMessage, color: 'salmon' },
    { label: 'Support', Icon: IconSupport, color: 'blue' },
    { label: 'Heatmaps', Icon: IconCursorClick, color: 'green' },
    { label: 'Group analytics', Icon: IconPeople, color: 'teal' },
    { label: 'Data warehouse', Icon: IconDatabase, color: 'purple' },
]

function PaintToolIcon({ tool }: { tool: PaintTool }): JSX.Element {
    return (
        <span
            className="flex aspect-square items-center justify-center border border-primary bg-primary"
            title={tool.label}
        >
            <tool.Icon className={`size-4 text-${tool.color}`} />
        </span>
    )
}

export function CanvasGalleryHeader(): JSX.Element {
    return (
        <section
            className="@container not-prose overflow-hidden rounded-t border-x border-t border-primary bg-primary"
            aria-label="Canvas ideas"
        >
            <div className="grid gap-5 p-4 pb-16 @2xl:grid-cols-[0.92fr_1.08fr] @2xl:items-center @2xl:p-5 @2xl:pb-16">
                <div className="relative z-10">
                    <SlotMachineText
                        className="mb-2 text-xs font-semibold uppercase tracking-wide text-secondary"
                        words={['visualize', 'ideate', 'analyze', 'investigate', 'monitor', 'present']}
                        wordClassName="text-red dark:text-yellow"
                        prefix={
                            <span className="inline-flex items-center gap-1.5">
                                <span>Let</span>
                                <img src={posthogIcon} alt="" aria-hidden className="size-4 rounded-sm" />
                                <span>PostHog</span>
                            </span>
                        }
                    />
                    <h1 className="m-0 text-3xl font-bold tracking-tight text-primary @lg:text-4xl">
                        Your product data, on a blank canvas
                    </h1>
                    <p className="mb-0 mt-2 text-sm leading-relaxed text-secondary">
                        Make a masterpiece out of your metrics with canvases in PostHog Desktop. Give an agent a product
                        signal, team objective, or open question, and get a useful tool built on your real data model.
                    </p>
                    <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h2 className="m-0 text-lg font-bold text-primary">Swipe files</h2>
                        <p className="m-0 text-sm text-secondary">Steal these canvases (the easiest art heist ever).</p>
                    </div>
                </div>

                <div
                    className="relative min-h-[300px] overflow-hidden rounded-md select-none @2xl:min-h-[330px]"
                    role="group"
                    aria-label="PostHog Paint preview"
                >
                    <div className="absolute inset-0 flex flex-col overflow-hidden rounded-md border border-primary bg-primary shadow-sm">
                        <div className="flex h-7 shrink-0 items-center justify-between bg-blue px-2 text-xs font-bold text-white">
                            <span className="flex items-center gap-1.5">
                                <img src={posthogIcon} alt="" className="size-3" />
                                untitled - PostHog Paint
                            </span>
                            <span className="flex gap-0.5">
                                <span className="flex size-4 items-center justify-center border border-primary bg-primary text-[10px] leading-none text-primary">
                                    −
                                </span>
                                <span className="flex size-4 items-center justify-center border border-primary bg-primary text-[10px] leading-none text-primary">
                                    □
                                </span>
                                <span className="flex size-4 items-center justify-center border border-primary bg-primary text-[10px] leading-none text-primary">
                                    ×
                                </span>
                            </span>
                        </div>
                        <div className="flex shrink-0 gap-3 border-b border-primary px-2 py-1 text-xs font-semibold text-primary">
                            <span>File</span>
                            <span>Edit</span>
                            <span>View</span>
                            <span>Tools</span>
                        </div>
                        <div className="flex min-h-0 flex-1">
                            <div className="grid w-14 shrink-0 grid-cols-2 content-start gap-1 border-r border-primary bg-accent p-1.5">
                                {paintTools.map((tool) => (
                                    <PaintToolIcon key={tool.label} tool={tool} />
                                ))}
                            </div>
                            <div className="relative min-w-0 flex-1 overflow-hidden">
                                <div className="absolute inset-0" style={paintCanvasStyle}>
                                    <img
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/loop_hog_9822b11db8.png"
                                        alt=""
                                        className="absolute left-[54%] top-[56%] w-44 -translate-x-1/2 -translate-y-1/2 rotate-3 @xl:w-56"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-1 border-t border-primary bg-accent p-1.5">
                            <span className="size-5 border border-primary bg-blue" />
                            <span className="size-5 border border-primary bg-purple" />
                            <span className="size-5 border border-primary bg-red" />
                            <span className="size-5 border border-primary bg-orange" />
                            <span className="size-5 border border-primary bg-green" />
                            <span className="size-5 border border-primary bg-salmon" />
                            <span className="size-5 border border-primary bg-light-purple" />
                            <span className="size-5 border border-primary bg-primary" />
                            <a
                                href="/paint"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-auto border border-primary bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                            >
                                More colors...
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function useGalleryEvent() {
    const posthog = usePostHog()
    return (action: string, canvas: GalleryCanvas) =>
        posthog?.capture('canvas_gallery_interaction', {
            action,
            canvas: canvas.slug,
            shape: canvas.shape,
        })
}

function CanvasPreview({
    canvas,
    className = '',
    imgClassName = '',
}: {
    canvas: GalleryCanvas
    className?: string
    imgClassName?: string
}): JSX.Element {
    const { siteSettings } = useApp()
    const { image } = canvas
    const src = siteSettings.theme === 'dark' && image.dark ? image.dark : image.light

    return <img src={src} alt={image.alt} className={`${className} ${imgClassName}`} />
}

function TopicChip({ topic }: { topic: CanvasTopic }): JSX.Element {
    return <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-secondary">{topic}</span>
}

const canvasToolInfo: Record<
    CanvasTool,
    { label: string; Icon: React.ComponentType<{ className?: string }>; color: string }
> = {
    productAnalytics: { label: 'Product analytics', Icon: IconGraph, color: 'blue' },
    featureFlags: { label: 'Feature flags', Icon: IconToggle, color: 'seagreen' },
    errorTracking: { label: 'Error tracking', Icon: IconWarning, color: 'orange' },
    sessionReplay: { label: 'Session replay', Icon: IconRewindPlay, color: 'yellow' },
    experiments: { label: 'Experiments', Icon: IconFlask, color: 'purple' },
    surveys: { label: 'Surveys', Icon: IconMessage, color: 'salmon' },
    billing: { label: 'Billing', Icon: IconHandMoney, color: 'green' },
    logs: { label: 'Logs', Icon: IconActivity, color: 'red' },
}

function CanvasToolChip({ tool }: { tool: CanvasTool }): JSX.Element {
    const { label, Icon, color } = canvasToolInfo[tool]
    return (
        <li className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-primary">
            <Icon className={`size-4 text-${color}`} />
            {label}
        </li>
    )
}

function SwipeFileTabs({
    activeFile,
    onSelect,
}: {
    activeFile: SwipeFileId | null
    onSelect: (file: SwipeFileId | null) => void
}): JSX.Element {
    const reduceMotion = useReducedMotion()
    const fileOrder = activeFile
        ? [...swipeFileOrder.filter((file) => file !== activeFile), activeFile]
        : swipeFileOrder
    const finalFileHeight = activeFile && activeFile !== 'all' ? 112 : 80
    const finalFileOffset = activeFile && activeFile !== 'all' ? 6 : 0
    return (
        <div className="relative" aria-label="Swipe files">
            {fileOrder.map((file, index) => {
                const tabStart = swipeFileTabStart[file]
                const tone = folderTones[file]
                const active = activeFile === file
                const category = file === 'all' ? undefined : CATEGORIES[file]
                const expanded = active && !!category
                const finalFile = index === fileOrder.length - 1
                const heightClass = expanded ? (finalFile ? 'h-28' : 'h-[150px]') : finalFile ? 'h-20' : 'h-24'
                const bodyBottom = finalFile
                    ? 0
                    : index === fileOrder.length - 2
                    ? 48 - finalFileHeight + finalFileOffset
                    : -48
                const label = category ? category.verb : allCanvasesFile.label
                const shape = category ? SHAPES[category.shape] : undefined
                return (
                    <motion.div
                        key={file}
                        initial={false}
                        layout="position"
                        transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                        style={{
                            zIndex: index + 1,
                            marginTop: index === 0 ? 0 : -48,
                        }}
                    >
                        <button
                            type="button"
                            aria-pressed={active}
                            aria-expanded={expanded}
                            onClick={() => onSelect(active ? null : file)}
                            className={`relative block w-full text-left transition-[height,transform] duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue motion-reduce:transition-none ${
                                expanded ? '-translate-y-1.5' : ''
                            } ${heightClass}`}
                        >
                            <span
                                className="absolute inset-x-0 top-[48px]"
                                style={{ backgroundColor: tone.color, bottom: bodyBottom }}
                                aria-hidden="true"
                            />
                            <svg
                                viewBox="0 0 1000 64"
                                preserveAspectRatio="none"
                                className="absolute inset-x-0 top-0 h-16 w-full"
                                aria-hidden="true"
                            >
                                <path d={folderTopPath(tabStart)} fill={tone.color} />
                            </svg>
                            <span
                                className="absolute top-[30px] -translate-x-1/2 text-sm font-semibold leading-none text-brown"
                                style={{ left: `${(tabStart + 141) / 10}%` }}
                            >
                                {label}
                            </span>
                            {expanded && category && shape && (
                                <motion.span
                                    initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: reduceMotion ? 0 : 0.18, delay: reduceMotion ? 0 : 0.08 }}
                                    className="absolute left-4 right-4 top-[82px] flex items-start gap-3 text-left @xl:left-5 @xl:right-5"
                                >
                                    <span className="shrink-0 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-brown shadow-sm">
                                        {shape.label} <span className="text-muted">· {shape.lifespan}</span>
                                    </span>
                                    <span className="max-w-xl text-sm leading-snug text-brown">
                                        {category.description}
                                    </span>
                                </motion.span>
                            )}
                        </button>
                    </motion.div>
                )
            })}
        </div>
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
            tooltip="Opens PostHog Desktop with this prompt pre-filled"
        >
            Open in Desktop
        </OSButton>
    )
}

function CanvasCard({ canvas, onOpen }: { canvas: GalleryCanvas; onOpen: () => void }): JSX.Element {
    return (
        <article className="group flex flex-col overflow-hidden rounded border border-primary bg-primary">
            <button
                type="button"
                onClick={onOpen}
                className="relative block w-full h-56 text-left border-b border-primary bg-accent overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                aria-label={`Open the ${canvas.title} example`}
            >
                <CanvasPreview canvas={canvas} className="size-full" imgClassName="size-full object-cover object-top" />
                <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded bg-primary/90 border border-primary px-1.5 py-0.5 text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
                    <IconExpand className="size-3" /> View example
                </span>
            </button>
            <div className="p-3 flex flex-col gap-2 flex-1">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[15px] font-semibold text-primary leading-snug m-0">{canvas.title}</h3>
                    <div className="flex shrink-0 flex-wrap justify-end gap-1">
                        {canvas.weird && (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-yellow/20 text-primary">
                                weird
                            </span>
                        )}
                        {canvas.topics.map((topic) => (
                            <TopicChip key={topic} topic={topic} />
                        ))}
                    </div>
                </div>
                <p className="text-sm text-secondary m-0 leading-snug">{canvas.tagline}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                    <CopyPromptButton canvas={canvas} />
                    <OpenInDesktopButton canvas={canvas} />
                </div>
            </div>
        </article>
    )
}

function CanvasDetail({ canvas }: { canvas: GalleryCanvas }): JSX.Element {
    return (
        <div className="@container max-h-[85vh] overflow-y-auto bg-primary">
            <div className="h-[340px] @2xl:h-[420px] border-b border-primary bg-accent">
                <CanvasPreview canvas={canvas} className="size-full" imgClassName="size-full object-cover object-top" />
            </div>
            <div className="p-4 @xl:p-5">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        {canvas.topics.map((topic) => (
                            <TopicChip key={topic} topic={topic} />
                        ))}
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
                        .
                    </p>
                    <div className="mt-4 text-sm">
                        <div className="mb-1 text-xs font-semibold text-secondary">What it reads</div>
                        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                            <ul className="m-0 flex shrink-0 list-none items-center gap-6 p-0 pr-6">
                                {canvas.tools.map((tool) => (
                                    <CanvasToolChip key={tool} tool={tool} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function DesktopShamelessCTA(): JSX.Element {
    return (
        <section className="@container relative mt-12 overflow-x-hidden border-t border-primary pb-8 pt-8">
            <h2 className="mb-0 text-2xl">Shameless CTA</h2>
            <p className="mb-6 mt-3">
                If nothing else has sold you on canvases, hopefully these classic marketing tactics will.
            </p>
            <div className="relative">
                <div className="rounded-md border border-primary bg-accent p-6 @xl:p-8">
                    <div className="grid gap-8 @xl:grid-cols-2 @xl:items-center @xl:gap-16">
                        <div className="relative min-h-[250px] @xl:min-h-[320px]">
                            <Glow
                                color="blue"
                                intensity="soft"
                                size="sm"
                                className="absolute inset-x-3 bottom-0 @xl:inset-x-0"
                            >
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/desktop_surveys_canvas_light_160e744e82.png"
                                    alt="A canvas of survey results open in PostHog Desktop"
                                    className="dark:hidden"
                                    imgClassName="w-full h-auto rounded-lg"
                                />
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/desktop_surveys_canvas_dark_085ef34c25.png"
                                    alt="A canvas of survey results open in PostHog Desktop"
                                    className="hidden dark:block"
                                    imgClassName="w-full h-auto rounded-lg"
                                />
                            </Glow>
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/multiplayer_hogs_41ec7dc243.png"
                                alt="Two hedgehogs building something together"
                                className="absolute -bottom-2 -right-2 z-10 h-[170px] @xl:-right-5 @xl:h-[230px]"
                                imgClassName="h-full w-auto"
                            />
                            <div className="absolute left-0 top-6 z-20 w-32 -rotate-6 @xl:-left-4 @xl:w-40">
                                <Bang className="w-full" />
                                <p className="absolute inset-0 m-0 flex items-center justify-center px-5 text-center text-[10px] font-bold uppercase leading-[1.1] text-black @xl:text-xs">
                                    Co-op mode
                                    <br />
                                    with shared
                                    <br />
                                    context
                                </p>
                            </div>
                        </div>
                        <div>
                            <span className="inline-flex items-center gap-1 rounded-sm bg-green px-2 py-1 text-xs font-semibold uppercase text-white">
                                Agents included
                            </span>
                            <p className="mb-0 mt-2 text-4xl font-bold text-primary">PostHog Desktop</p>
                            <p className="mb-4 text-sm text-secondary">For people with too many tabs open*</p>
                            <p className="mb-3 text-[15px] leading-relaxed text-primary">
                                PostHog Desktop brings coding agents, product context, and team processes into one app.
                            </p>
                            <ul className="mb-5 space-y-1.5 p-0 text-sm text-primary">
                                {[
                                    'Build and edit your product',
                                    'Run a fleet of agents',
                                    'Turn product signals into PRs',
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-1.5 list-none">
                                        <IconCheck className="size-4 text-green" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <DownloadButtons size="sm" />
                            <p className="mb-0 mt-3 text-xs text-secondary">*Browser, editor, and mental tabs.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function CanvasCommunityCTA(): JSX.Element {
    return (
        <section className="@container mt-8">
            <div className="grid gap-5 rounded-md border border-primary bg-primary p-4 @lg:grid-cols-[1fr_auto] @lg:items-center @lg:p-5">
                <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-purple">Built with PostHog</p>
                    <h2 className="m-0 text-xl font-bold text-primary">Add your own canvas to the gallery</h2>
                    <p className="mb-0 mt-1 text-sm leading-relaxed text-secondary">
                        Made something useful, weird, or beautiful? Share your canvas in Discord and join the people
                        building with PostHog.
                    </p>
                </div>
                <OSButton
                    asLink
                    external
                    to="https://discord.gg/posthog"
                    variant="secondary"
                    size="md"
                    icon={<IconDiscord className="size-5" />}
                >
                    Share in Discord
                </OSButton>
            </div>
        </section>
    )
}

export default function CanvasGallery(): JSX.Element {
    const [activeFile, setActiveFile] = useState<SwipeFileId | null>('all')
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

    const open = openSlug ? CANVASES.find((c) => c.slug === openSlug) : undefined
    const visibleCanvases =
        activeFile === 'all' ? CANVASES : activeFile ? CANVASES.filter((canvas) => canvas.category === activeFile) : []
    const galleryColor = activeFile ? folderTones[activeFile].color : undefined

    return (
        <>
            <div className="@container not-prose relative z-10 -mt-16 overflow-hidden rounded-b border-x border-b border-primary">
                <SwipeFileTabs activeFile={activeFile} onSelect={setActiveFile} />

                <div
                    className={`relative -mt-1.5 px-4 pb-4 pt-3 @xl:px-5 ${activeFile ? '' : 'bg-accent'}`}
                    style={{ backgroundColor: galleryColor }}
                >
                    <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2">
                        {visibleCanvases.map((canvas) => (
                            <CanvasCard
                                key={canvas.slug}
                                canvas={canvas}
                                onOpen={() => {
                                    track('view_example', canvas)
                                    setOpenSlug(canvas.slug)
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="not-prose">
                <CanvasCommunityCTA />
                <DesktopShamelessCTA />
            </div>

            <Modal
                open={!!open}
                onOpenChange={(isOpen) => !isOpen && setOpenSlug(null)}
                title={open?.title}
                maxWidth={960}
            >
                {open && <CanvasDetail canvas={open} />}
            </Modal>
        </>
    )
}
