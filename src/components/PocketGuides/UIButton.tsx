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

function Chrome({ children }: { children: React.ReactNode }): JSX.Element {
    return <span className="pocket-guide-inline-control pocket-guide-inline-control--static">{children}</span>
}

/** The recording buttons, singular and plural – one drawing, so they can't drift apart. */
function RecordingButton({ label }: { label: string }): JSX.Element {
    return (
        <Chrome>
            {label}
            <IconRewindPlay className="pocket-guide-inline-control__icon" aria-hidden="true" />
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

/** Opens PostHog AI with the prompt prefilled – the site's standard Max deep link. */
const maxPromptUrl = (prompt: string) => `https://app.posthog.com/#panel=max:!${encodeURIComponent(prompt)}`

/**
 * A question you can hand straight to PostHog AI: `<AskAI q="Users who rage clicked…" />`.
 *
 * Same chrome as the buttons above so it reads as a control rather than a quoted string, with an
 * arrow marking that it leaves the page – the plain link the docs use is easy to miss in a list.
 * Children override the label: a table cell wants "Set up", not the whole prompt spelled out.
 */
export function AskAI({ q, children }: { q: string; children?: React.ReactNode }): JSX.Element {
    return (
        <a
            href={maxPromptUrl(q)}
            // A short label is a control and shouldn't break across lines; a whole prompt spelled
            // out has to wrap or it overflows the page column.
            className={`pocket-guide-inline-control pocket-guide-inline-control--link${
                children ? ' pocket-guide-inline-control--short' : ''
            }`}
        >
            {children ?? q}
            <IconArrowUpRight className="pocket-guide-inline-control__icon" aria-hidden="true" />
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
            className="not-prose pocket-guide-template"
        >
            <span className="pocket-guide-template__heading">
                <span className="pocket-guide-template__name">{name}</span>
                <span className="pocket-guide-template__type">{type}</span>
                <IconArrowUpRight className="pocket-guide-template__icon" aria-hidden="true" />
            </span>
            <span className="pocket-guide-template__question">“{asks}”</span>
            <span className="pocket-guide-template__answer">
                {answers} · <code>{property}</code>
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
export function CTA({
    to,
    children,
    external = true,
}: {
    to: string
    children: React.ReactNode
    external?: boolean
}): JSX.Element {
    return (
        <span className="not-prose pocket-guide-cta">
            <OSButton asLink to={to} external={external} variant="primary" size="md">
                {children}
            </OSButton>
        </span>
    )
}
