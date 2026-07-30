import React from 'react'
import { IconCode } from '@posthog/icons'
import { Hint } from './prose'
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
    return tag.tooltip ? <Hint trigger={pill}>{tag.tooltip}</Hint> : pill
}

/**
 * One evidence finding behind a report: which source saw it, what it saw, and the repo
 * files the agent read to work it out.
 *
 * Bodies are re-worded from the stored findings for privacy; the code paths under them
 * are verbatim. See the note above `INBOX_ITEMS` in `inboxData.tsx`.
 */
export default function EvidenceCard({ item }: { item: EvidenceItem }): JSX.Element {
    const source = EVIDENCE_SOURCE_META[item.source]
    const SourceIcon = source.Icon

    return (
        <div className="rounded-md border border-primary bg-accent p-2.5">
            {/*
             * Source and tags share the top line; the title gets its own. Sharing one
             * line meant the shrink-0 source label and tags left the title around 150px
             * in this column, which truncated every one of them to a few words.
             */}
            <div className="flex items-center justify-between gap-2">
                <p className="m-0 flex min-w-0 items-center gap-1.5 text-xs text-secondary">
                    <Hint trigger={<SourceIcon className={`size-4 shrink-0 ${source.color}`} />}>
                        {source.label} fed this finding into the report
                    </Hint>
                    <span className="truncate">{source.label}</span>
                </p>
                <span className="flex shrink-0 items-center gap-1">
                    {item.tags.map((tag) => (
                        <Tag key={tag.label} tag={tag} />
                    ))}
                </span>
            </div>
            <p className="m-0 mt-1 text-xs font-semibold leading-snug text-primary">{item.title}</p>
            <p className="m-0 mt-1 text-xs leading-snug text-secondary">{item.body}</p>
            {!!item.codePaths?.length && (
                <div className="mt-2 border-t border-primary pt-1.5">
                    <Hint
                        trigger={
                            <p className="m-0 mb-1 inline-flex items-center gap-1 text-xs font-semibold text-secondary">
                                <IconCode className="size-3.5" />
                                {item.codePaths.length} files read
                            </p>
                        }
                    >
                        The files the agent opened while working this finding out. Straight from the report, and the
                        most concrete evidence that it read the code rather than guessed.
                    </Hint>
                    <ul className="m-0 list-none p-0">
                        {item.codePaths.map((path) => (
                            <li key={path} className="truncate font-mono text-xs leading-snug text-secondary">
                                {path}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
