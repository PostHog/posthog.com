import React from 'react'
import { IconExternal, IconPlayFilled } from '@posthog/icons'
import Tooltip from 'components/RadixUI/Tooltip'
import { EVIDENCE_SOURCE_META, type EvidenceItem, type EvidenceTag, type TagTone } from './inboxData'

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

const Tag = ({ tag }: { tag: EvidenceTag }): JSX.Element => {
    const pill = (
        <span
            className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-1.5 py-0.5 text-xs font-semibold ${
                TAG_TONE[tag.tone]
            }`}
        >
            {tag.dot && <span className={`size-1.5 rounded-full ${DOT_TONE[tag.tone]}`} />}
            {tag.label}
        </span>
    )
    return tag.tooltip ? <Tooltip trigger={pill}>{tag.tooltip}</Tooltip> : pill
}

/**
 * One evidence finding behind a report: which product saw it, what it saw, and how
 * bad it looked. The source and title share a line, truncating the title, so a long
 * list of findings stays skimmable.
 *
 * The "View replay" button and the footer link are chrome – this is a replica, there's
 * no recording or issue to open.
 */
export default function EvidenceCard({ item }: { item: EvidenceItem }): JSX.Element {
    const source = EVIDENCE_SOURCE_META[item.source]
    const SourceIcon = source.Icon

    return (
        <div className="rounded-md border border-primary bg-accent p-3">
            <div className="flex items-start justify-between gap-2">
                {/*
                 * `overflow-hidden` is load-bearing: the source and kind labels are
                 * shrink-0, so without it they overflow this row in a narrow column and
                 * collide with the tags instead of letting the title truncate.
                 */}
                <p className="m-0 flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden text-xs">
                    <Tooltip trigger={<SourceIcon className={`size-4 shrink-0 ${source.color}`} />}>
                        {source.label} fed this finding into the report
                    </Tooltip>
                    <span className="shrink-0 text-secondary">{source.label}</span>
                    <span aria-hidden className="shrink-0 text-secondary">
                        ·
                    </span>
                    <span className="shrink-0 text-secondary">{item.kind}</span>
                    <span className="truncate font-semibold text-primary">{item.title}</span>
                </p>
                <span className="flex shrink-0 items-center gap-1">
                    {item.tags.map((tag) => (
                        <Tag key={tag.label} tag={tag} />
                    ))}
                </span>
            </div>
            <p className="m-0 mt-1.5 text-xs leading-snug text-secondary">{item.body}</p>
            {item.hasReplay && (
                <Tooltip
                    trigger={
                        <button
                            type="button"
                            className="mt-2.5 inline-flex items-center gap-1.5 rounded border border-primary bg-primary px-2 py-1 text-xs font-semibold text-primary transition-colors hover:bg-accent"
                        >
                            View replay
                            <IconPlayFilled className="size-3" />
                        </button>
                    }
                >
                    Opens the recording at this moment, so you watch the failure rather than read about it.
                </Tooltip>
            )}
            {item.footer && (
                <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-primary pt-2 text-xs text-secondary">
                    <Tooltip trigger={<span className="font-mono">{item.footer.id}</span>}>
                        {item.footer.timing
                            ? 'The session this came from. Every finding keeps a link back to its source.'
                            : 'The issue this came from. Every finding keeps a link back to its source.'}
                    </Tooltip>
                    {item.footer.timing && (
                        <>
                            <span aria-hidden>·</span>
                            <Tooltip trigger={<span className="tabular-nums">{item.footer.timing}</span>}>
                                Where in the session it happened, and how long the person was actually active.
                            </Tooltip>
                        </>
                    )}
                    {item.footer.link && (
                        <button
                            type="button"
                            className="ml-auto inline-flex items-center gap-1 font-semibold text-red hover:underline dark:text-yellow"
                        >
                            {item.footer.link}
                            <IconExternal className="size-3" />
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
