import React from 'react'
import { IconCheckCircle, IconPullRequest } from '@posthog/icons'
import TabbedCarousel from 'components/TabbedCarousel'
import type { TabbedCarouselTab } from 'components/TabbedCarousel'

/**
 * SelfDrivingStory – the "Scout → Signal → Investigate → PR → Merge" walkthrough,
 * generalized from the "Your product, fixing itself" section on /traces
 * (`TracesSelfHealing.tsx`) into a data-driven component so any product page (or
 * the /ship-with-posthog inbox) can tell the same five-beat story with its own
 * copy and screenshots.
 *
 * The five stages – their labels, colors, and progress-bar styling – are fixed
 * so the story reads the same everywhere. A story renders one tab per step, and
 * a step picks its stage via `stage` (else positional order), so a signal source
 * can run four beats (Signal → Investigate → PR → Merge) and skip Scout. Copy and
 * image/placeholder are always per-step.
 */

export type StoryStage = 'scout' | 'signal' | 'investigate' | 'pr' | 'merge'

interface StageChrome {
    stage: StoryStage
    label: string
    color: string
    activeText: string
    progressBar: string
}

// Same colors and order as the /traces carousel. bg-yellow (Merge) uses dark text.
const WHITE_PROGRESS = 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]'
const STAGE_CHROME: Record<StoryStage, StageChrome> = {
    scout: { stage: 'scout', label: 'Scout', color: 'bg-blue', activeText: 'text-white', progressBar: WHITE_PROGRESS },
    signal: {
        stage: 'signal',
        label: 'Signal',
        color: 'bg-red',
        activeText: 'text-white',
        progressBar: WHITE_PROGRESS,
    },
    investigate: {
        stage: 'investigate',
        label: 'Investigate',
        color: 'bg-purple',
        activeText: 'text-white',
        progressBar: WHITE_PROGRESS,
    },
    pr: { stage: 'pr', label: 'PR', color: 'bg-green', activeText: 'text-white', progressBar: WHITE_PROGRESS },
    merge: {
        stage: 'merge',
        label: 'Merge',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
    },
}
// Default stage order when a step doesn't name its own stage – the full five-beat story.
const DEFAULT_STAGE_ORDER: StoryStage[] = ['scout', 'signal', 'investigate', 'pr', 'merge']

export interface SelfDrivingStoryStep {
    /**
     * Which stage this step is. Omit to fall back to positional order
     * (scout, signal, investigate, PR, merge). Set it to render a subset –
     * e.g. a signal-source story that skips Scout and leads with Signal.
     */
    stage?: StoryStage
    /** Copy for this stage. Keep it to one or two sentences. */
    copy: React.ReactNode
    /** Cloudinary (or other) screenshot URL. Takes precedence over `imagePlaceholder`. */
    image?: string
    /** When there's no screenshot yet, render a labeled dashed box describing what goes here. */
    imagePlaceholder?: string
    /** Override the stage's default label – used to show "Source" instead of "Scout" on the first tab. */
    label?: string
}

export interface SelfDrivingStoryProps {
    /** One entry per tab, in display order. Up to five (scout, signal, investigate, PR, merge). */
    steps: SelfDrivingStoryStep[]
    /** Optional section headline (rendered as an h2). Omitted inside the inbox reading pane. */
    headline?: string
    /** Optional intro paragraph under the headline. */
    intro?: React.ReactNode
    /** Optional closing line under the carousel. */
    footer?: React.ReactNode
    /**
     * When provided, the Merge tab renders a working "Merge pull request" button that calls this.
     * Product-page reuse (e.g. /traces) omits it and the tab is read-only.
     */
    onMerge?: () => void
    /** Whether this story's PR has already been merged (flips the Merge tab to its merged state). */
    merged?: boolean
    className?: string
}

const StageImage = ({ image, label, alt }: { image?: string; label?: string; alt: string }): JSX.Element | null => {
    if (image) {
        // No border or shadow: these are screenshots that already carry their own window
        // chrome, so framing them again reads as a box inside a box.
        return <img src={image} alt={alt} className="mt-6 block w-full rounded-md" />
    }
    if (label) {
        return (
            <div className="mt-6 flex min-h-[160px] items-center justify-center rounded-md border border-dashed border-primary bg-accent/40 p-6 text-center text-sm text-secondary">
                {label}
            </div>
        )
    }
    return null
}

const MergeAction = ({ merged, onMerge }: { merged?: boolean; onMerge?: () => void }): JSX.Element | null => {
    if (!onMerge) return null
    if (merged) {
        return (
            <div className="mt-6 inline-flex items-center gap-2 rounded-md bg-purple/10 px-3 py-2 text-sm font-semibold text-purple">
                <IconPullRequest className="size-4" />
                Merged
            </div>
        )
    }
    return (
        <button
            type="button"
            onClick={onMerge}
            // GitHub-green merge button.
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#1f883d] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1a7f37]"
        >
            <IconCheckCircle className="size-4" />
            Merge pull request
        </button>
    )
}

const TabPanel = ({
    stage,
    step,
    merged,
    onMerge,
}: {
    stage: StageChrome
    step: SelfDrivingStoryStep
    merged?: boolean
    onMerge?: () => void
}): JSX.Element => (
    <div className="flex h-full flex-col justify-center rounded bg-primary p-4 @xl:p-6">
        <div className="text-lg !leading-normal text-secondary @xl:text-xl">
            <p className="m-0">{step.copy}</p>
        </div>
        <StageImage image={step.image} label={step.imagePlaceholder} alt={`${stage.label} step`} />
        {stage.stage === 'merge' && <MergeAction merged={merged} onMerge={onMerge} />}
    </div>
)

export default function SelfDrivingStory({
    steps,
    headline,
    intro,
    footer,
    onMerge,
    merged,
    className,
}: SelfDrivingStoryProps): JSX.Element {
    // One tab per step, in the order given. Each step's chrome comes from its own
    // `stage` when set, else the positional default – so a story can run the full
    // five beats or a subset (e.g. Signal → Investigate → PR → Merge).
    const tabs: TabbedCarouselTab[] = steps.map((step, index) => {
        const stage = STAGE_CHROME[step.stage ?? DEFAULT_STAGE_ORDER[index] ?? 'signal']
        return {
            value: stage.stage,
            label: step.label ?? stage.label,
            color: stage.color,
            activeText: stage.activeText,
            progressBar: stage.progressBar,
            content: <TabPanel stage={stage} step={step} merged={merged} onMerge={onMerge} />,
        }
    })

    return (
        <div className={className}>
            {headline && <h2 className="mb-2 text-4xl font-bold @2xl:text-5xl">{headline}</h2>}
            {intro && <p className="mb-6 text-lg text-secondary @2xl:text-xl">{intro}</p>}
            <div className="not-prose">
                <TabbedCarousel tabs={tabs} />
            </div>
            {footer && <p className="mt-6 text-base text-secondary @2xl:text-lg">{footer}</p>}
        </div>
    )
}
