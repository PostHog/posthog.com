import React from 'react'

import { IconCheckCircle, IconCompass, IconGraph, IconPullRequest } from '@posthog/icons'

import CustomSelfDrivingLoop from 'components/CustomSelfDrivingLoop'
import ProductImageAnnotations from 'components/ImageAnnotations/FromProduct'
import { useProductScreenshot } from 'components/ImageAnnotations/useProductScreenshot'
import ScoutFile from 'components/SelfDrivingInbox/ScoutFile'

import Divergence, { DivergenceSeries } from './Divergence'
import Figure from './Figure'
import FlagLedger, { FlagLedgerRow } from './FlagLedger'
import LeakFunnel, { LeakFunnelProps } from './LeakFunnel'
import InboxFigure from './InboxFigure'
import ReportAnatomy, { AnatomyHint } from './ReportAnatomy'
import ReportDetailAnatomy from './ReportDetailAnatomy'
import { useTemplate } from './bookContext'

/** The loop, drawn. Wording from /docs/self-driving/self-improving-loop. */
const LOOP_STAGES = [
    { label: 'Signal', icon: IconCompass, color: '#FFA81C', description: 'Something worth knowing, with its evidence' },
    { label: 'Report', icon: IconGraph, color: '#F54E00', description: 'Related signals grouped into one problem' },
    {
        label: 'Pull request',
        icon: IconPullRequest,
        color: '#A737D2',
        description: 'An agent writes the fix; you review and merge',
    },
    { label: 'Measured', icon: IconCheckCircle, color: '#47C861', description: 'PostHog checks whether it worked' },
]

interface FigProps {
    n: number
    caption: string
    legend?: React.ReactNode
    children?: React.ReactNode
}

/** `<Fig n={1} caption="…">` – any exhibit. The numbered frame and caption come from here. */
export function Fig({ n, caption, legend, children }: FigProps): JSX.Element {
    return (
        <Figure number={n} caption={caption} legend={legend ? <span className="mt-1 block">{legend}</span> : undefined}>
            {children}
        </Figure>
    )
}

/**
 * A screenshot a product page already ships, framed as a book figure. The image and its
 * annotation sets are resolved from `useProducts`, so the book never holds its own copy of a
 * URL – update the product hook and every figure citing it follows.
 */
export function ScreenshotFigure({
    n = 1,
    caption,
    legend,
    product,
    screenshot,
    set,
    type,
    showKey,
    alt,
}: {
    n?: number
    caption: string
    legend?: string
    /** Product handle, e.g. "session_replay". */
    product: string
    /** Key in that product's `screenshots` object, e.g. "overview". */
    screenshot: string
    /** Named annotation set on the screenshot – omit for an unannotated image. */
    set?: string
    type?: 'dots' | 'numbered'
    showKey?: boolean
    alt?: string
}): JSX.Element | null {
    // Checked here as well as inside the annotator: without it a missing screenshot key would
    // print an empty frame and its caption, which reads as a broken figure rather than none.
    const shot = useProductScreenshot(product, screenshot)
    if (!shot?.src) {
        return null
    }
    // The annotator prints a key for every numbered set, including an empty one – which on an
    // unannotated figure is a bare "Key" heading under the image. No set, no key: the figure's
    // own caption and legend are what carry a plain screenshot.
    const hasAnnotations = Boolean(set && shot.annotations?.[set]?.items?.length)
    return (
        <Fig n={n} caption={caption} legend={legend}>
            <ProductImageAnnotations
                product={product}
                screenshot={screenshot}
                set={set}
                type={type}
                showKey={showKey ?? hasAnnotations}
                alt={alt}
                // Core yellow, matching the book's other teaching apparatus (the loop's Signal
                // stage above) rather than the product pages' red – so the markers read as part
                // of the page, not an overlay from somewhere else.
                markerClassName="bg-[#FFA81C] text-black"
                // The frame already supplies the border and ground, so the product page's
                // drop shadow would read as a second frame inside it.
                imgClassName="rounded"
            />
        </Fig>
    )
}

/** This use case's report, as it lands in the inbox. */
export function ReportFigure({
    n = 1,
    caption,
    legend,
}: {
    n?: number
    caption: string
    legend?: string
}): JSX.Element | null {
    const template = useTemplate()
    if (!template) {
        return null
    }
    return (
        <Fig n={n} caption={caption} legend={legend}>
            <InboxFigure template={template} />
        </Fig>
    )
}

/** This use case's scout, as the file an agent follows. */
export function ScoutFigure({ n = 2, caption }: { n?: number; caption: string }): JSX.Element | null {
    const template = useTemplate()
    if (!template?.scout?.raw) {
        return null
    }
    return (
        <Fig n={n} caption={caption}>
            <ScoutFile scout={template.scout} />
        </Fig>
    )
}

/** This use case's report card, annotated part by part. The parts are the same every time. */
export function AnatomyFigure({
    n = 1,
    caption,
    legend,
    priority,
    status,
    actionability,
    headline,
}: {
    n?: number
    caption: string
    legend?: string
    priority?: string
    status?: string
    actionability?: string
    headline?: string
}): JSX.Element | null {
    const template = useTemplate()
    if (!template) {
        return null
    }
    return (
        <Fig n={n} caption={caption} legend={legend ?? <AnatomyHint />}>
            <ReportAnatomy
                report={template.report}
                priority={priority}
                status={status}
                actionability={actionability}
                headline={headline}
            />
        </Fig>
    )
}

/** The report opened – what clicking Review shows, in miniature and annotated. */
export function DetailFigure({
    n = 1,
    caption,
    legend,
    priority,
    status,
    actionability,
}: {
    n?: number
    caption: string
    legend?: string
    priority?: string
    status?: string
    actionability?: string
}): JSX.Element | null {
    const template = useTemplate()
    if (!template) {
        return null
    }
    return (
        <Fig n={n} caption={caption} legend={legend ?? <AnatomyHint />}>
            <ReportDetailAnatomy
                report={template.report}
                watches={template.watches}
                priority={priority}
                status={status}
                actionability={actionability}
            />
        </Fig>
    )
}

/** The scout's worklist, drawn: one row per flag it walked. Flag debt's hero. */
export function LedgerFigure({
    n = 1,
    caption,
    legend,
    rows,
}: {
    n?: number
    caption: string
    legend?: string
    rows: FlagLedgerRow[]
}): JSX.Element {
    return (
        <Fig n={n} caption={caption} legend={legend}>
            <FlagLedger rows={rows} />
        </Fig>
    )
}

/** The leak, drawn: who started, who finished, and the filled gap between. */
export function LeakFigure({
    n = 1,
    caption,
    legend,
    ...leak
}: LeakFunnelProps & {
    n?: number
    caption: string
    legend?: string
}): JSX.Element {
    return (
        <Fig n={n} caption={caption} legend={legend}>
            <LeakFunnel {...leak} />
        </Fig>
    )
}

/** The discriminator, drawn: what moved, against what held steady. */
export function DivergenceFigure({
    n = 1,
    caption,
    legend,
    series,
    markerAt,
    markerLabel,
}: {
    n?: number
    caption: string
    legend?: string
    series: DivergenceSeries[]
    markerAt?: number
    markerLabel?: string
}): JSX.Element {
    return (
        <Fig n={n} caption={caption} legend={legend}>
            <Divergence series={series} markerAt={markerAt} markerLabel={markerLabel} />
        </Fig>
    )
}

export function LoopFigure({ n = 1, caption }: { n?: number; caption: string }): JSX.Element {
    return (
        <Fig n={n} caption={caption}>
            <CustomSelfDrivingLoop stages={LOOP_STAGES} loop />
        </Fig>
    )
}
