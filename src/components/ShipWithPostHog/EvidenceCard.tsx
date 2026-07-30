import React from 'react'
import { IconPlayFilled } from '@posthog/icons'
import { EVIDENCE_SOURCE_META, type EvidenceItem, type TagTone } from './inboxData'

/**
 * Status tag hues. Literal class strings so Tailwind's JIT keeps them – the same
 * reason `SOURCE_META.color` is spelled out rather than built from a template.
 */
const TAG_TONE: Record<TagTone, string> = {
    red: 'border-red/40 bg-red/10 text-red',
    orange: 'border-orange/40 bg-orange/10 text-orange',
    yellow: 'border-yellow/40 bg-yellow/10 text-yellow',
    blue: 'border-blue/40 bg-blue/10 text-blue',
    green: 'border-green/40 bg-green/10 text-green',
}

const DOT_TONE: Record<TagTone, string> = {
    red: 'bg-red',
    orange: 'bg-orange',
    yellow: 'bg-yellow',
    blue: 'bg-blue',
    green: 'bg-green',
}

/**
 * One evidence finding behind a report: which product saw it, what it saw, and how
 * bad it looked. The "View replay" button is chrome – this is a replica, there's no
 * recording to open.
 */
export default function EvidenceCard({ item }: { item: EvidenceItem }): JSX.Element {
    const source = EVIDENCE_SOURCE_META[item.source]
    const SourceIcon = source.Icon

    return (
        <div className="rounded-md border border-primary bg-accent p-3">
            <div className="flex items-start justify-between gap-2">
                <p className="m-0 flex min-w-0 items-center gap-1.5 text-xs text-secondary">
                    <SourceIcon className={`size-4 shrink-0 ${source.color}`} />
                    <span className="shrink-0">{source.label}</span>
                    <span aria-hidden>·</span>
                    <span className="shrink-0">{item.kind}</span>
                </p>
                <span
                    className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-1.5 py-0.5 text-xs font-semibold ${
                        TAG_TONE[item.tag.tone]
                    }`}
                >
                    {item.tag.dot && <span className={`size-1.5 rounded-full ${DOT_TONE[item.tag.tone]}`} />}
                    {item.tag.label}
                </span>
            </div>
            <p className="m-0 mt-1.5 text-sm font-semibold leading-snug text-primary">{item.title}</p>
            <p className="m-0 mt-1 text-xs leading-snug text-secondary">{item.body}</p>
            {item.hasReplay && (
                <button
                    type="button"
                    className="mt-2.5 inline-flex items-center gap-1.5 rounded border border-primary bg-primary px-2 py-1 text-xs font-semibold text-primary transition-colors hover:bg-accent"
                >
                    View replay
                    <IconPlayFilled className="size-3" />
                </button>
            )}
            {item.footer && (
                <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 border-t border-primary pt-2 text-xs text-secondary">
                    <span className="font-mono">{item.footer.id}</span>
                    {item.footer.timing && (
                        <>
                            <span aria-hidden>·</span>
                            <span className="tabular-nums">{item.footer.timing}</span>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
