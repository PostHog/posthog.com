import React from 'react'
import { IconArchive, IconPullRequest } from '@posthog/icons'
import PriorityBadge from './PriorityBadge'
import { originMeta, formatAgo, type InboxItem } from './inboxData'

interface ReportRowProps {
    item: InboxItem
    isMerged: boolean
    isUnread: boolean
    onOpen: () => void
}

// One report/PR card in the inbox list, matching the real Inbox row: priority chip,
// a mono commit-scope tag, a bold title, a two-line summary, an origin line
// (source-product name for signal sources, "Scout · <category>" for scouts), and a
// right rail with the PR badge, Archive/Review actions, and a relative timestamp.
// The whole card is clickable – Archive/Review are visual affordances, since every
// action in the demo opens the story behind the PR.
export default function ReportRow({ item, isMerged, isUnread, onOpen }: ReportRowProps): JSX.Element {
    const origin = originMeta(item)
    const OriginIcon = origin.Icon
    const timeAgo = formatAgo(item.createdMinutesAgo)

    const PrBadge = (): JSX.Element | null =>
        item.prNumber ? (
            <span
                className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 font-mono text-xs font-semibold ${
                    isMerged ? 'border-purple/40 bg-purple/10 text-purple' : 'border-green/40 bg-green/10 text-green'
                }`}
            >
                <IconPullRequest className="size-3" />#{item.prNumber}
            </span>
        ) : null

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={onOpen}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onOpen()
                }
            }}
            aria-label={`Review ${item.commitType}(${item.scope}): ${item.title}`}
            className="group relative cursor-pointer rounded-md border border-primary bg-primary p-3 transition-colors hover:border-secondary hover:bg-accent focus-visible:border-secondary focus-visible:outline-none @md:p-4"
        >
            <div className="flex items-start gap-3">
                {/* Main content */}
                <div className="flex min-w-0 flex-1 items-start gap-3">
                    <PriorityBadge priority={item.priority} />
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            {isUnread && !isMerged && (
                                <span aria-label="Unread" className="size-2 shrink-0 rounded-full bg-blue" />
                            )}
                            <span className="shrink-0 rounded border border-primary bg-accent px-1.5 py-0.5 font-mono text-xs text-secondary">
                                {item.commitType}({item.scope})
                            </span>
                            <span
                                className={`min-w-0 text-sm font-semibold leading-snug ${
                                    isMerged ? 'text-secondary line-through' : 'text-primary'
                                }`}
                            >
                                {item.title}
                            </span>
                        </div>
                        <p className="m-0 mt-1 line-clamp-2 text-xs leading-snug text-secondary">{item.summary}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-secondary">
                            <span className="font-mono">PostHog/posthog</span>
                            <span className="inline-flex items-center gap-1">
                                <OriginIcon className={`size-3.5 shrink-0 ${origin.color}`} />
                                {origin.primary}
                                {origin.secondary && <span className="text-secondary/80">· {origin.secondary}</span>}
                            </span>
                            {isMerged && (
                                <span className="inline-flex items-center rounded-full bg-purple/15 px-1.5 py-0.5 font-semibold text-purple">
                                    Merged
                                </span>
                            )}
                            {/* PR badge + time inline on mobile, where the right rail is hidden */}
                            <span className="flex items-center gap-2 @md:hidden">
                                <PrBadge />
                                <span className="tabular-nums">{timeAgo}</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right rail: PR badge, actions, timestamp */}
                <div className="hidden shrink-0 flex-col items-end justify-between gap-2 self-stretch border-l border-primary pl-3 @md:flex">
                    <PrBadge />
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded border border-primary px-2 py-1 text-xs font-semibold text-secondary">
                            <IconArchive className="size-3.5" />
                            Archive
                        </span>
                        <span className="rounded border border-secondary bg-primary px-2.5 py-1 text-xs font-semibold text-primary transition-colors group-hover:bg-accent">
                            Review
                        </span>
                    </div>
                    <span className="text-xs tabular-nums text-secondary">{timeAgo}</span>
                </div>
            </div>
        </div>
    )
}
