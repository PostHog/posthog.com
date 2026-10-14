import React, { useRef } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { IconPullRequest } from '@posthog/icons'
import Link from 'components/Link'
import { useElementSize } from '../hooks'

interface MergedPullRequest {
    prNumber: number
    summary: string
    type: string
    scope: string
    url: string
    openedAt: string | null
    mergedAt: string | null
}

export const WALL_SIZE = 6
const NARROW_WALL_SIZE = 4
const MINUTE_MS = 60 * 1000
const HOUR_MS = 60 * MINUTE_MS
const DAY_MS = 24 * HOUR_MS
const CARD_HEIGHT = 108
const CARD_GAP = 12
const TWO_COLUMN_WIDTH = 672
const THREE_COLUMN_WIDTH = 896
const SLIDE_MS = 600
const FADE_MS = 400
const SLIDE_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)'

const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1)

const mergeTime = ({ openedAt, mergedAt }: MergedPullRequest): number | null =>
    openedAt && mergedAt ? new Date(mergedAt).getTime() - new Date(openedAt).getTime() : null

function formatDuration(ms: number): string {
    if (ms < HOUR_MS) {
        return `${Math.max(1, Math.round(ms / MINUTE_MS))} min`
    }
    if (ms < 2 * DAY_MS) {
        return `${Math.round(ms / HOUR_MS)} h`
    }
    return `${Math.round(ms / DAY_MS)} days`
}

const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })

function median(values: number[]): number | null {
    if (values.length === 0) {
        return null
    }
    const sorted = [...values].sort((a, b) => a - b)
    const middle = Math.floor(sorted.length / 2)
    return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle]
}

export function useMergedPullRequests(): MergedPullRequest[] {
    const data = useStaticQuery(graphql`
        query HomeSelfDrivingPullRequests {
            allSelfDrivingPullRequest(filter: { state: { eq: "merged" } }, sort: { fields: mergedAt, order: DESC }) {
                nodes {
                    prNumber
                    summary
                    type
                    scope
                    url
                    openedAt
                    mergedAt
                }
            }
        }
    `)
    return data?.allSelfDrivingPullRequest?.nodes ?? []
}

function PullRequestCard({ pullRequest }: { pullRequest: MergedPullRequest }): JSX.Element {
    const duration = mergeTime(pullRequest)
    return (
        <Link
            to={pullRequest.url}
            externalNoIcon
            className="block h-full rounded-md border border-primary bg-primary p-3 text-primary no-underline transition-colors hover:bg-accent"
        >
            <span className="flex items-center gap-1.5 font-mono text-[10px] leading-4 text-muted">
                <IconPullRequest className="size-3.5 shrink-0 text-purple" />
                <span className="truncate">
                    #{pullRequest.prNumber}
                    {pullRequest.type && ` · ${pullRequest.type}${pullRequest.scope ? `(${pullRequest.scope})` : ''}`}
                </span>
            </span>
            <span className="mt-1.5 line-clamp-2 min-h-[2.75em] text-[13px] font-semibold leading-snug">
                {capitalize(pullRequest.summary)}
            </span>
            <span className="mt-1.5 block font-mono text-[10px] leading-4 text-muted">
                {pullRequest.mergedAt && `merged ${formatDate(pullRequest.mergedAt)}`}
                {duration !== null && ` · ${formatDuration(duration)} after opening`}
            </span>
        </Link>
    )
}

function wallLayout(width: number) {
    const columns = width >= THREE_COLUMN_WIDTH ? 3 : width >= TWO_COLUMN_WIDTH ? 2 : 1
    const slots = columns === 1 ? NARROW_WALL_SIZE : WALL_SIZE
    const cardWidth = (width - CARD_GAP * (columns - 1)) / columns
    const slotAt = (index: number) => ({
        x: (index % columns) * (cardWidth + CARD_GAP),
        y: Math.floor(index / columns) * (CARD_HEIGHT + CARD_GAP),
    })
    return { slots, cardWidth, slotAt }
}

const wallHeight = (rows: number): string => `${rows * CARD_HEIGHT + (rows - 1) * CARD_GAP}px`

const WALL_HEIGHTS = {
    ['--wall-narrow' as string]: wallHeight(NARROW_WALL_SIZE),
    ['--wall-medium' as string]: wallHeight(WALL_SIZE / 2),
    ['--wall-wide' as string]: wallHeight(WALL_SIZE / 3),
}

export default function PullRequestWall({
    pullRequests,
    hiddenNewer,
}: {
    pullRequests: MergedPullRequest[]
    hiddenNewer: number
}): JSX.Element | null {
    const wallRef = useRef<HTMLDivElement>(null)
    const size = useElementSize(wallRef)
    if (pullRequests.length === 0) {
        return null
    }
    const shown = pullRequests.slice(hiddenNewer, hiddenNewer + WALL_SIZE + 1)
    const medianMergeTime = median(
        pullRequests.map(mergeTime).filter((value): value is number => value !== null && value > 0)
    )
    const layout = size ? wallLayout(size.width) : null

    return (
        <>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="m-0 text-base font-semibold text-primary">Pull requests from our own loop</h3>
                <span className="font-mono text-[11px] text-muted">
                    last {pullRequests.length} merged
                    {medianMergeTime !== null && <> · median {formatDuration(medianMergeTime)} from PR to merge</>}
                </span>
            </div>
            <div
                ref={wallRef}
                className="relative mt-3 h-[var(--wall-narrow)] @2xl:h-[var(--wall-medium)] @4xl:h-[var(--wall-wide)]"
                style={WALL_HEIGHTS}
            >
                {layout &&
                    shown.map((pullRequest, index) => {
                        const isShown = index < layout.slots
                        const { x, y } = layout.slotAt(Math.min(index, layout.slots - 1))
                        return (
                            <div
                                key={pullRequest.prNumber}
                                aria-hidden={!isShown}
                                className="absolute left-0 top-0 motion-reduce:transition-none"
                                style={{
                                    width: layout.cardWidth,
                                    height: CARD_HEIGHT,
                                    zIndex: WALL_SIZE - index,
                                    transform: `translate(${x}px, ${y}px)`,
                                    opacity: isShown ? 1 : 0,
                                    visibility: isShown ? 'visible' : 'hidden',
                                    transition: `transform ${SLIDE_MS}ms ${SLIDE_EASING}, opacity ${FADE_MS}ms ease-out, visibility 0s ${
                                        isShown ? 0 : FADE_MS
                                    }ms`,
                                }}
                            >
                                <div className="data-story-pop h-full [&>span]:block [&>span]:h-full">
                                    <PullRequestCard pullRequest={pullRequest} />
                                </div>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}
