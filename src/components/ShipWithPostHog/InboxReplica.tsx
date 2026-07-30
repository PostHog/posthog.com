import React, { useEffect, useState } from 'react'
import {
    IconArrowLeft,
    IconChevronDown,
    IconSearch,
    IconSort,
    IconCompass,
    IconFlag,
    IconRefresh,
    IconNotification,
    IconPullRequest,
} from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import { CallToAction } from 'components/CallToAction'
import WizardCommand from 'components/WizardCommand'
import Link from 'components/Link'
import SelfDrivingStory from 'components/SelfDrivingStory'
import ReportRow from './ReportRow'
import PriorityBadge from './PriorityBadge'
import { INBOX_ITEMS, originMeta, type InboxItem } from './inboxData'

const TOTAL = INBOX_ITEMS.length

const nextUnmerged = (merged: Set<string>, fromIndex: number): string | null => {
    for (let step = 1; step <= TOTAL; step++) {
        const item = INBOX_ITEMS[(fromIndex + step) % TOTAL]
        if (!merged.has(item.id)) return item.id
    }
    return null
}

// A quiet, non-interactive filter chip mirroring the real Inbox filter bar.
const FilterChip = ({ icon, label }: { icon: React.ReactNode; label: string }): JSX.Element => (
    <span className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded border border-primary bg-primary px-2.5 text-sm text-secondary">
        {icon}
        {label}
        <IconChevronDown className="size-3.5 text-secondary/70" />
    </span>
)

const Tab = ({
    label,
    count,
    active,
    staff,
}: {
    label: string
    count?: number
    active?: boolean
    staff?: boolean
}): JSX.Element => (
    <span
        className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap pb-2 ${
            active
                ? 'border-b-2 border-red font-semibold text-primary dark:border-yellow'
                : 'border-b-2 border-transparent text-secondary'
        }`}
    >
        {label}
        {typeof count === 'number' && <span className="text-xs tabular-nums text-secondary">{count}</span>}
        {staff && (
            <span className="rounded-full border border-primary px-1.5 text-[10px] font-semibold text-secondary">
                Staff
            </span>
        )}
    </span>
)

const ReadingPane = ({
    item,
    merged,
    onMerge,
    onBack,
}: {
    item: InboxItem
    merged: boolean
    onMerge: () => void
    onBack: () => void
}): JSX.Element => {
    const origin = originMeta(item)
    const OriginIcon = origin.Icon

    return (
        <div className="p-4 @md:p-6">
            <button
                type="button"
                onClick={onBack}
                className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:text-primary"
            >
                <IconArrowLeft className="size-4" />
                Back to inbox
            </button>
            <div className="flex items-start gap-3">
                <PriorityBadge priority={item.priority} />
                <div className="min-w-0 flex-1">
                    <p className="m-0 font-mono text-xs text-secondary">
                        {item.commitType}({item.scope})
                    </p>
                    <h3 className="m-0 mt-0.5 text-lg font-bold leading-snug text-primary @md:text-xl">{item.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-secondary">
                        <span className="font-mono">PostHog/posthog</span>
                        <span aria-hidden>·</span>
                        <span className="inline-flex items-center gap-1">
                            <OriginIcon className={`size-3.5 ${origin.color}`} />
                            {origin.primary}
                            {origin.secondary && <span>· {origin.secondary}</span>}
                        </span>
                        <span aria-hidden>·</span>
                        <span>{item.signalCount} signals</span>
                        {item.prUrl && (
                            <>
                                <span aria-hidden>·</span>
                                <Link
                                    to={item.prUrl}
                                    external
                                    className="inline-flex items-center gap-1 font-mono font-semibold text-red dark:text-yellow"
                                >
                                    <IconPullRequest className="size-3.5" />#{item.prNumber}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <SelfDrivingStory steps={item.steps} onMerge={onMerge} merged={merged} />
            </div>
        </div>
    )
}

const InboxZero = (): JSX.Element => (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <CloudinaryImage
            src="https://res.cloudinary.com/dmukukwp6/image/upload/hog_head_popcorn_82aa11ea69.png"
            alt="A hedgehog eating popcorn"
            imgClassName="w-32"
        />
        <h3 className="m-0 text-2xl font-bold text-primary">Inbox zero.</h3>
        <p className="m-0 max-w-md text-secondary">
            Six pull requests, six tools, one loop – and not one of them started with a ticket. This is a demo, but the
            loop is real. Point it at your product and wake up to your own.
        </p>
        <div className="mt-2 w-full max-w-md">
            <WizardCommand command="self-driving" />
        </div>
        <CallToAction to="/docs/self-driving/inbox" state={{ newWindow: true }} size="md">
            Set up your Inbox
        </CallToAction>
    </div>
)

export default function InboxReplica(): JSX.Element {
    const [mergedIds, setMergedIds] = useState<Set<string>>(new Set())
    const [openedIds, setOpenedIds] = useState<Set<string>>(new Set())
    const [openId, setOpenId] = useState<string | null>(null)

    // Deep-link: open whichever item the URL hash points at on mount.
    useEffect(() => {
        const slug = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
        if (slug && INBOX_ITEMS.some((i) => i.id === slug)) {
            setOpenId(slug)
            setOpenedIds((prev) => new Set(prev).add(slug))
        }
    }, [])

    const setHash = (slug: string | null): void => {
        if (typeof window === 'undefined') return
        const url = slug ? `#${slug}` : window.location.pathname + window.location.search
        window.history.replaceState(null, '', url)
    }

    const openItem = (id: string): void => {
        setOpenId(id)
        setOpenedIds((prev) => new Set(prev).add(id))
        setHash(id)
    }

    const closeItem = (): void => {
        setOpenId(null)
        setHash(null)
    }

    const mergeItem = (id: string): void => {
        const merged = new Set(mergedIds).add(id)
        setMergedIds(merged)
        const index = INBOX_ITEMS.findIndex((i) => i.id === id)
        const next = nextUnmerged(merged, index)
        if (next) {
            setOpenId(next)
            setOpenedIds((prev) => new Set(prev).add(next))
            setHash(next)
        } else {
            setHash(null)
        }
    }

    const remaining = TOTAL - mergedIds.size
    const allMerged = remaining === 0
    const openItemData = openId ? INBOX_ITEMS.find((i) => i.id === openId) ?? null : null

    return (
        <div className="@container overflow-hidden rounded-lg border border-primary bg-accent shadow-xl">
            {allMerged ? (
                <InboxZero />
            ) : openItemData ? (
                <ReadingPane
                    item={openItemData}
                    merged={mergedIds.has(openItemData.id)}
                    onMerge={() => mergeItem(openItemData.id)}
                    onBack={closeItem}
                />
            ) : (
                <>
                    {/* Scene header */}
                    <div className="px-4 pt-4 @md:px-6">
                        <div className="flex items-center gap-2">
                            <IconNotification className="size-5 text-primary" />
                            <h2 className="m-0 text-xl font-bold text-primary">Inbox</h2>
                        </div>
                        <p className="m-0 mt-1 text-sm text-secondary">
                            Pull requests agents opened to resolve reports. Review and merge them on GitHub.
                        </p>
                    </div>

                    {/* Tab bar + scope picker */}
                    <div className="mt-3 flex items-end justify-between gap-2 border-b border-primary px-4 @md:px-6">
                        <div className="flex items-end gap-4 overflow-x-auto text-sm">
                            <Tab label="Pull requests" count={remaining} active />
                            <Tab label="Reports" count={254} />
                            <Tab label="Not actionable" count={0} staff />
                            <Tab label="Runs" />
                            <Tab label="Archive" count={30} />
                        </div>
                        <div className="mb-1.5 hidden shrink-0 items-center overflow-hidden rounded border border-primary text-xs @md:flex">
                            <span className="px-2 py-1 text-secondary">For you</span>
                            <span className="inline-flex items-center gap-1 border-l border-primary bg-primary px-2 py-1 font-semibold text-primary">
                                Entire project
                                <IconChevronDown className="size-3" />
                            </span>
                        </div>
                    </div>

                    {/* Filter bar */}
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 @md:px-6">
                        <span className="inline-flex h-8 min-w-[200px] flex-1 items-center gap-1.5 rounded border border-primary bg-primary px-2.5 text-sm text-secondary @md:max-w-sm">
                            <IconSearch className="size-3.5" />
                            Search by title or description.
                        </span>
                        <div className="ml-auto flex items-center gap-2">
                            <FilterChip icon={<IconSort className="size-3.5" />} label="Sort" />
                            <FilterChip icon={<IconCompass className="size-3.5" />} label="Scout" />
                            <FilterChip icon={<IconFlag className="size-3.5" />} label="Priority" />
                            <span className="inline-flex size-8 items-center justify-center rounded border border-primary bg-primary text-secondary">
                                <IconRefresh className="size-3.5" />
                            </span>
                        </div>
                    </div>

                    {/* List */}
                    <div className="mx-auto flex max-w-4xl flex-col gap-2.5 px-4 pb-5 @md:px-6">
                        {INBOX_ITEMS.map((item) => (
                            <ReportRow
                                key={item.id}
                                item={item}
                                isMerged={mergedIds.has(item.id)}
                                isUnread={!openedIds.has(item.id)}
                                onOpen={() => openItem(item.id)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
