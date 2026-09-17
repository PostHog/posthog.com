import React from 'react'

import { IconCheckCircle, IconCompass, IconGraph, IconPullRequest } from '@posthog/icons'

import CloudinaryImage from 'components/CloudinaryImage'
import CustomSelfDrivingLoop from 'components/CustomSelfDrivingLoop'
import type { Annotation } from 'components/ImageAnnotations'
import { useProductScreenshot } from 'components/ImageAnnotations/useProductScreenshot'
import type { SelfDrivingReport } from 'components/SelfDrivingInbox/types'
import ScoutFile from 'components/SelfDrivingInbox/ScoutFile'

import Divergence, { DivergenceSeries } from './Divergence'
import Figure from './Figure'
import FactorSplit, { FactorSplitRow } from './FactorSplit'
import FlagLedger, { FlagLedgerRow } from './FlagLedger'
import LeakFunnel, { LeakFunnelProps } from './LeakFunnel'
import InboxFigure from './InboxFigure'
import EvalRuns, { EvalRun } from './EvalRuns'
import PersonsModal, { PersonsModalProps } from './PersonsModal'
import RedirectLoop from './RedirectLoop'
import ReportAnatomy, { AnatomyHint } from './ReportAnatomy'
import ReportDetailAnatomy from './ReportDetailAnatomy'
import TraceTree, { TraceTreeRow } from './TraceTree'
import TriggerGroupForm, { TriggerGroupFormProps } from './TriggerGroupForm'
import { FigureMarker } from './FigureMarker'
import { useEntry, useTemplate } from './bookContext'
import { normalizeUrl } from './bookModel'
import { useSkillFiles } from './useSkillFile'

type CloudinarySrc = `https://res.cloudinary.com/${string}`

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
 * A worked example illustrating what an answer looks like – arbitrary MDX content (usually a
 * table) in a numbered frame. A named wrapper around `<Fig>`, not `<Fig>` itself: the reader's
 * wrapper only positions a `<LeftPage>` child by its `<SeeFig>` citation when its component name
 * ends in "Figure" – ambient `<Fig>` prints at the top of the page, uncited.
 */
export function ExampleFigure({ n = 1, caption, legend, children }: FigProps): JSX.Element {
    return (
        <Fig n={n} caption={caption} legend={legend}>
            {children}
        </Fig>
    )
}

/**
 * A screenshot a product page already ships, framed as a book figure. The image is resolved from
 * `useProducts`, so the book never holds its own copy of a URL – update the product hook and every
 * figure citing it follows.
 *
 * Annotation copy belongs with the page that says it, so write the markers inline:
 *
 *     <ScreenshotFigure n={1} product="session_replay" screenshot="home" caption="…"
 *         annotations={[{ x: 16, y: 36, title: 'The player', description: 'What it does.' }]} />
 *
 * `set` is the other way in: it reuses a named annotation set already stored on the product hook,
 * for figures that should stay in step with a product page. Inline `annotations` win if both are
 * given. Coordinates for either are percentages of the image – /image-annotator picks them off a
 * screenshot for you.
 */
export function ScreenshotFigure({
    n = 1,
    caption,
    legend,
    product,
    screenshot,
    set,
    annotations,
    alt,
}: {
    n?: number
    caption: string
    legend?: string
    /** Product handle, e.g. "session_replay". */
    product: string
    /** Key in that product's `screenshots` object, e.g. "overview". */
    screenshot: string
    /** Named annotation set on the screenshot – for reusing a product page's markers. */
    set?: string
    /** Markers written inline, in page order. Takes precedence over `set`. */
    annotations?: Annotation[]
    alt?: string
}): JSX.Element | null {
    // Checked so a missing screenshot key skips the figure entirely – an empty frame with a
    // caption reads as a broken figure rather than none.
    const shot = useProductScreenshot(product, screenshot)
    if (!shot?.src) {
        return null
    }
    const items: Annotation[] = annotations ?? (set ? shot.annotations?.[set]?.items : undefined) ?? []
    // The frame already supplies the border and ground, so the product page's drop shadow
    // would read as a second frame inside it.
    const imgClasses = 'rounded max-w-full h-auto'
    return (
        <Fig n={n} caption={caption} legend={legend ?? (items.length > 0 ? <AnatomyHint /> : undefined)}>
            <div className="relative leading-[0]">
                {/* The theme toggle lives on a wrapper, not on CloudinaryImage's `className`:
                    a src carrying inline transformations has commas in it, and CloudinaryImage
                    falls back to a plain <img> for those, dropping className. Both variants would
                    render at once. */}
                <span className={`block w-full ${shot.srcDark ? 'dark:hidden' : ''}`}>
                    <CloudinaryImage
                        src={shot.src as CloudinarySrc}
                        alt={alt ?? shot.alt ?? ''}
                        className="w-full"
                        imgClassName={imgClasses}
                    />
                </span>
                {shot.srcDark && (
                    <span className="hidden w-full dark:block">
                        <CloudinaryImage
                            src={shot.srcDark as CloudinarySrc}
                            alt={alt ?? shot.alt ?? ''}
                            className="w-full"
                            imgClassName={imgClasses}
                        />
                    </span>
                )}
                {/* The same markers the anatomy figures use, kept always-visible: on an image
                    they anchor a spot, so a marker hidden until hover leaves nothing to find. */}
                {items.map((item, index) => (
                    <span
                        key={index}
                        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    >
                        <FigureMarker
                            n={index + 1}
                            label={item.title}
                            gloss={item.description ?? ''}
                            visibility="always"
                        />
                    </span>
                ))}
            </div>
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

/**
 * A page's own `SKILL.md`, for guides that aren't self-driving scouts and so have no
 * `InboxTemplate` to pull one from. Paired by directory, the same way self-driving's scouts are.
 */
export function SkillFigure({ n = 1, caption }: { n?: number; caption: string }): JSX.Element | null {
    const entry = useEntry()?.entry
    const skills = useSkillFiles()
    const skill = entry ? skills.get(normalizeUrl(entry.url)) : undefined
    if (!skill?.raw) {
        return null
    }
    return (
        <Fig n={n} caption={caption}>
            <ScoutFile scout={{ name: skill.name ?? '', description: skill.description ?? '', raw: skill.raw }} />
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
    report,
}: {
    n?: number
    caption: string
    legend?: string
    priority?: string
    status?: string
    actionability?: string
    headline?: string
    /**
     * A report written inline, for pages outside the self-driving volume that want to show the
     * card without being a use case themselves. Use-case pages leave this off and the report
     * comes from their own frontmatter.
     */
    report?: SelfDrivingReport
}): JSX.Element | null {
    const template = useTemplate()
    const shown = report ?? template?.report
    if (!shown) {
        return null
    }
    return (
        <Fig n={n} caption={caption} legend={legend ?? <AnatomyHint />}>
            <ReportAnatomy
                report={shown}
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

/** One total split into the two factors behind it, for rows that share a number but not a story. */
export function FactorSplitFigure({
    n = 1,
    caption,
    legend,
    totalLabel,
    factorLabels,
    rows,
}: {
    n?: number
    caption: string
    legend?: string
    totalLabel: string
    factorLabels: [string, string]
    rows: FactorSplitRow[]
}): JSX.Element {
    return (
        <Fig n={n} caption={caption} legend={legend}>
            <FactorSplit totalLabel={totalLabel} factorLabels={factorLabels} rows={rows} />
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

/** The evaluation's runs tab, annotated – what a scored generation looks like in the app. */
export function EvalRunsFigure({
    n = 1,
    caption,
    legend,
    runs,
}: {
    n?: number
    caption: string
    legend?: string
    runs: EvalRun[]
}): JSX.Element {
    return (
        <Fig n={n} caption={caption} legend={legend ?? <AnatomyHint />}>
            <EvalRuns runs={runs} />
        </Fig>
    )
}

/** One trace, drawn: the calls a single interaction made, and what each one cost. */
export function TraceFigure({
    n = 1,
    caption,
    legend,
    rows,
}: {
    n?: number
    caption: string
    legend?: string
    rows: TraceTreeRow[]
}): JSX.Element {
    return (
        <Fig n={n} caption={caption} legend={legend}>
            <TraceTree rows={rows} />
        </Fig>
    )
}

/** One trigger group's form: the fields that decide which sessions get recorded. */
export function TriggerGroupFigure({
    n = 1,
    caption,
    legend,
    ...group
}: TriggerGroupFormProps & {
    n?: number
    caption: string
    legend?: string
}): JSX.Element {
    return (
        // No hover hint: this figure's markers are always visible, so there is nothing to reveal.
        <Fig n={n} caption={caption} legend={legend}>
            <TriggerGroupForm {...group} />
        </Fig>
    )
}

export function PersonsModalFigure({
    n = 1,
    caption,
    legend,
    ...modal
}: PersonsModalProps & {
    n?: number
    caption: string
    legend?: string
}): JSX.Element {
    return (
        // No hover hint: this figure's markers are always visible, so there is nothing to reveal.
        <Fig n={n} caption={caption} legend={legend}>
            <PersonsModal {...modal} />
        </Fig>
    )
}

export function RedirectLoopFigure({
    n = 1,
    caption,
    legend,
}: {
    n?: number
    caption: string
    legend?: string
}): JSX.Element {
    return (
        <Fig n={n} caption={caption} legend={legend}>
            <RedirectLoop />
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
