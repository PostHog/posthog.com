import React from 'react'
import { IconPullRequest } from '@posthog/icons'
import PriorityBadge from './PriorityBadge'
import { originMeta, repoOf, type InboxItem } from './inboxData'

interface ReportRowProps {
    item: InboxItem
    isUnread: boolean
    onOpen: () => void
}

/**
 * One row in the inbox list.
 *
 * Scope tag and title share the first line, the summary is clamped to one line under
 * it, and a meta line closes the card: the repo the pull request lives in, then the
 * source that found the report. The right rail carries the pull-request badge above and
 * the timestamp below.
 *
 * There are no Archive or Review buttons – the redesign dropped both, and the whole card
 * is the click target, so nothing inside it is a button.
 *
 * The row's height is fixed, from the `--row-h` custom property the list sets. Every line
 * inside it is single-line and truncates, so the height is the same at every container
 * width. `shrink-0` matters as much as the height: the list is a capped column flex
 * container, so without it the rows shrink to share the cap between them instead of
 * overflowing it, and the list renders every row squashed rather than scrolling. That's what lets the list cap itself at exactly three and a half rows in CSS,
 * with no measuring – see `InboxReplica`. Truncating rather than wrapping also matches the
 * app, whose rows are single-line too.
 */
export default function ReportRow({ item, isUnread, onOpen }: ReportRowProps): JSX.Element {
    const origin = originMeta(item)
    const OriginIcon = origin.Icon
    const repo = repoOf(item)

    /*
     * Only an item with a pull request is badged. A report without one used to be badged
     * with its Actionable / Needs-input judgment; that badge is gone, and the judgment
     * lives on the status filter instead.
     */
    const prBadge = item.prNumber ? (
        <span className="inline-flex items-center gap-1 rounded-full border border-green/40 bg-green/10 px-1.5 py-0.5 font-mono text-xs font-semibold text-green">
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
            aria-label={`Open ${item.commitType}(${item.scope}): ${item.title}`}
            className="group relative h-[var(--row-h)] shrink-0 cursor-pointer overflow-hidden rounded-md border border-primary bg-primary p-3 transition-colors hover:border-secondary hover:bg-accent focus-visible:border-secondary focus-visible:outline-none @md:p-4"
        >
            <div className="flex items-start gap-3">
                <PriorityBadge priority={item.priority} />

                <div className="min-w-0 flex-1">
                    {/* Scope tag and title on one line, as the redesign has them */}
                    <div className="flex items-center gap-x-2">
                        {isUnread && <span aria-label="Unread" className="size-2 shrink-0 rounded-full bg-blue" />}
                        <span className="shrink-0 rounded border border-primary bg-accent px-1.5 py-0.5 font-mono text-xs text-secondary">
                            {item.commitType}({item.scope})
                        </span>
                        <span className="min-w-0 truncate text-sm font-semibold leading-snug text-primary">
                            {item.title}
                        </span>
                    </div>

                    <p className="m-0 mt-1 line-clamp-1 text-xs leading-snug text-secondary">{item.summary}</p>

                    <div className="mt-2 flex items-center gap-x-2 overflow-hidden text-xs text-secondary">
                        {/* Named only when there's a pull request to name it from */}
                        {repo && <span className="font-mono">{repo}</span>}
                        <span className="inline-flex items-center gap-1">
                            <OriginIcon className={`size-3.5 shrink-0 ${origin.color}`} />
                            {origin.primary}
                            {origin.secondary && <span className="text-secondary/80">· {origin.secondary}</span>}
                        </span>
                        {/* Badge and time inline on narrow cards, where the right rail is hidden */}
                        <span className="flex items-center gap-2 @md:hidden">
                            {prBadge}
                            <span className="tabular-nums">{item.timeAgo}</span>
                        </span>
                    </div>
                </div>

                {/* Right rail: badge above, timestamp below */}
                <div className="hidden shrink-0 flex-col items-end justify-between gap-2 self-stretch @md:flex">
                    {prBadge}
                    <span className="mt-auto text-xs tabular-nums text-secondary">{item.timeAgo}</span>
                </div>
            </div>
        </div>
    )
}
