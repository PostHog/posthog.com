import React from 'react'

import { IconArrowUpRight, IconRewindPlay } from '@posthog/icons'

import OSButton from 'components/OSButton'

/**
 * A button from the app, drawn inline in a sentence – "click <ViewRecordings /> to watch them".
 * Sized in `em` so it rides the line at whatever reading size the Aa control is set to, rather
 * than a screenshot that would tower over the text on a phone.
 *
 * Kept to the buttons the book actually names. Add one here rather than styling a `<span>` in MDX,
 * so every mention of the same control looks the same everywhere in the volume.
 */

/** The shared chrome: bordered, rounded, and vertically centered on the text baseline. */
const CHROME_CLASSES =
    'mx-0.5 inline-flex translate-y-[0.05em] items-center gap-1 rounded border border-primary bg-primary px-1.5 py-0.5 align-baseline text-[0.8em] font-semibold leading-none text-primary'

function Chrome({ children }: { children: React.ReactNode }): JSX.Element {
    return <span className={`${CHROME_CLASSES} select-none whitespace-nowrap`}>{children}</span>
}

/** The recording buttons, singular and plural – one drawing, so they can't drift apart. */
function RecordingButton({ label }: { label: string }): JSX.Element {
    return (
        <Chrome>
            {label}
            <IconRewindPlay className="size-[1.1em] shrink-0" aria-hidden="true" />
        </Chrome>
    )
}

/** The button above a persons list: watch every session behind the number, back to back. */
export function ViewRecordings(): JSX.Element {
    return <RecordingButton label="View recordings" />
}

/** The per-person button inside that list: jump straight to one session. */
export function ViewRecording(): JSX.Element {
    return <RecordingButton label="View recording" />
}

/**
 * A question you can hand straight to PostHog AI: `<AskAI q="Users who rage clicked…" />`.
 * Same chrome as the buttons above so it reads as a control rather than a quoted string, with an
 * arrow marking that it leaves the page – the plain link the docs use is easy to miss in a list.
 */
export function AskAI({ q }: { q: string }): JSX.Element {
    return (
        <a
            href={`https://app.posthog.com/#panel=max:${encodeURIComponent(q)}`}
            className={`group/ask ${CHROME_CLASSES} no-underline hover:border-orange hover:text-orange`}
        >
            {q}
            <IconArrowUpRight
                className="size-[1.1em] shrink-0 text-secondary group-hover/ask:text-orange"
                aria-hidden="true"
            />
        </a>
    )
}

/**
 * A Replay Vision scanner template, linked straight into the editor pre-filled with it. Carries
 * the three things that tell you what a scanner is: its type, the question it asks, and the shape
 * of the answer you get back.
 *
 * Template keys are the app's own – products/replay_vision/frontend/replay_scanners/scannerTemplates.ts.
 * The route is `/replay-vision/new/details?template=<key>`, which is what the in-app template
 * picker pushes when you click a card.
 */
export function ScannerTemplate({
    name,
    template,
    type,
    asks,
    answers,
    property,
}: {
    name: string
    template: string
    type: string
    asks: string
    answers: string
    property: string
}): JSX.Element {
    return (
        <a
            href={`https://app.posthog.com/replay-vision/new/details?template=${template}`}
            className="group/tpl not-prose mb-2 block rounded border border-primary bg-primary px-3 py-2 no-underline hover:border-orange"
        >
            <span className="flex items-baseline gap-2">
                <span className="text-[0.85em] font-bold leading-snug text-primary group-hover/tpl:text-orange">
                    {name}
                </span>
                <span className="rounded bg-accent px-1 py-0.5 text-[0.65em] font-bold uppercase leading-none tracking-wide text-secondary dark:bg-accent-dark">
                    {type}
                </span>
                <IconArrowUpRight
                    className="ml-auto size-[1em] shrink-0 text-secondary group-hover/tpl:text-orange"
                    aria-hidden="true"
                />
            </span>
            <span className="mt-1 block text-[0.8em] italic leading-snug text-primary">“{asks}”</span>
            <span className="mt-0.5 block text-[0.75em] leading-snug text-secondary">
                {answers} · <code className="text-[0.95em]">{property}</code>
            </span>
        </a>
    )
}

/**
 * The book's "go do it" button: `<CTA to="https://app.posthog.com/…">Set up a proxy</CTA>`.
 *
 * The self-driving volume has `<Enable />`, which prefills a scout – this is the plain version for
 * volumes without a template behind them. One per section at most; a page of buttons is a page
 * with no button.
 */
export function CTA({ to, children }: { to: string; children: React.ReactNode }): JSX.Element {
    return (
        <span className="not-prose my-[0.8em] block">
            <OSButton asLink to={to} external variant="primary" size="md">
                {children}
            </OSButton>
        </span>
    )
}
