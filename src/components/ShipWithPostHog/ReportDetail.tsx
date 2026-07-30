import React, { useState } from 'react'
import {
    IconArchive,
    IconArrowLeft,
    IconChevronDown,
    IconCheckCircle,
    IconCircleDashed,
    IconComment,
    IconGithub,
    IconInfo,
    IconPullRequest,
    IconReceipt,
} from '@posthog/icons'
import OSButton from 'components/OSButton'
import Tooltip from 'components/RadixUI/Tooltip'
import { Popover } from 'components/RadixUI/Popover'
import PriorityBadge from './PriorityBadge'
import CollapsibleCard from './CollapsibleCard'
import EvidenceCard from './EvidenceCard'
import ReviewerList, { AddReviewerMenu } from './ReviewerList'
import FilesChanged from './FilesChanged'
import {
    diffStat,
    EVIDENCE_SOURCE_META,
    findingsCount,
    originMeta,
    type CheckStatus,
    type InboxItem,
    type ProseSection,
} from './inboxData'

// Rows in the "Discuss" menu. Chrome – nothing is wired up behind them.
const DISCUSS_ACTIONS = ['Comment on the pull request', 'Share to Slack', 'Open a Linear issue']

const CHECK_ICON: Record<CheckStatus, { Icon: React.ComponentType<{ className?: string }>; color: string }> = {
    success: { Icon: IconCheckCircle, color: 'text-green' },
    skipped: { Icon: IconCircleDashed, color: 'text-muted' },
    pending: { Icon: IconCircleDashed, color: 'text-yellow' },
    failed: { Icon: IconCircleDashed, color: 'text-red' },
}

const Summary = ({ sections }: { sections: ProseSection[] }): JSX.Element => (
    <div className="flex flex-col gap-3">
        {sections.map((section, sectionIndex) => (
            // Index keys are correct here: sections are static authored data.
            <div key={sectionIndex}>
                {section.heading && <h4 className="m-0 mb-1 text-base font-bold text-primary">{section.heading}</h4>}
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                        key={paragraphIndex}
                        className="m-0 mt-2 text-sm leading-relaxed text-secondary first:mt-0 [&_strong]:text-primary"
                    >
                        {paragraph}
                    </p>
                ))}
            </div>
        ))}
    </div>
)

const DiscussMenu = (): JSX.Element => (
    <Popover
        dataScheme="secondary"
        contentClassName="border border-primary"
        trigger={
            <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded border border-primary bg-primary px-2 py-1 text-sm font-semibold text-primary transition-colors hover:bg-accent"
            >
                <IconComment className="size-4 text-secondary" />
                Discuss
                <IconChevronDown className="size-3 text-secondary" />
            </button>
        }
    >
        <div className="w-52">
            {DISCUSS_ACTIONS.map((action) => (
                <button
                    key={action}
                    type="button"
                    className="flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm text-primary transition-colors hover:bg-accent"
                >
                    {action}
                </button>
            ))}
        </div>
    </Popover>
)

/**
 * The report detail view: a replica of what the app hands you when an agent turns a
 * report into a pull request – the write-up on the left, and the machine's working
 * (CI, who should review it, the evidence it reasoned from) on the right.
 *
 * Every panel is optional, so an item carrying only a summary renders header plus
 * summary rather than a column of empty cards.
 */
export default function ReportDetail({ item, onBack }: { item: InboxItem; onBack: () => void }): JSX.Element {
    const [tab, setTab] = useState<'overview' | 'files'>('overview')
    const detail = item.detail
    const origin = originMeta(item)
    const OriginIcon = origin.Icon

    const stat = detail ? diffStat(detail) : { added: 0, removed: 0 }
    const hasFiles = !!detail?.files?.length
    const activeTab = hasFiles ? tab : 'overview'

    // "Support + 2" – the first contributing source by name, then a count of the rest.
    const sources = detail?.contributingSources ?? []
    const firstSource = sources.length ? EVIDENCE_SOURCE_META[sources[0]] : null
    const sourceLabel = firstSource
        ? `${firstSource.groupLabel ?? firstSource.label}${sources.length > 1 ? ` + ${sources.length - 1}` : ''}`
        : null

    return (
        <div className="p-4 @md:p-6">
            <button
                type="button"
                onClick={onBack}
                className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:text-primary"
            >
                <IconArrowLeft className="size-4" />
                Pull requests
            </button>

            {/* Title + actions */}
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                    <PriorityBadge priority={item.priority} />
                    <div className="min-w-0">
                        <h3 className="m-0 text-lg font-bold leading-snug text-primary @md:text-xl">
                            <span className="mr-1.5 font-mono text-sm font-normal text-secondary">
                                {item.commitType}({item.scope})
                            </span>
                            {item.title}
                        </h3>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2">
                    <OSButton
                        asLink
                        external
                        to={item.prUrl ?? 'https://github.com/PostHog/posthog'}
                        size="sm"
                        variant="secondary"
                        icon={<IconGithub />}
                        tooltip={item.prUrl ? undefined : 'This pull request is illustrative. Opens the repo instead.'}
                    >
                        Open in GitHub
                    </OSButton>
                    <DiscussMenu />
                    <Tooltip
                        trigger={
                            <OSButton size="sm" icon={<IconArchive />}>
                                Archive
                            </OSButton>
                        }
                    >
                        Clears the report without merging.
                    </Tooltip>
                    <Tooltip
                        trigger={
                            <OSButton size="sm" icon={<IconReceipt />}>
                                Refund
                            </OSButton>
                        }
                    >
                        Pull requests cost $15. If one isn't useful, refund it and you're not charged.
                    </Tooltip>
                </div>
            </div>

            {/* Meta row */}
            <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-secondary">
                {detail && (
                    <span className="inline-flex items-center rounded-full border border-green/40 bg-green/10 px-1.5 py-0.5 font-semibold text-green">
                        {detail.status}
                    </span>
                )}
                <span>{findingsCount(item)} findings</span>
                {detail && (
                    <>
                        <span aria-hidden>·</span>
                        <span>First seen {detail.firstSeen}</span>
                        <span aria-hidden>·</span>
                        <span>Last updated {detail.lastUpdated}</span>
                    </>
                )}
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                    <OriginIcon className={`size-3.5 ${origin.color}`} />
                    {origin.primary}
                    {origin.secondary && <span>· {origin.secondary}</span>}
                </span>
                {sourceLabel && (
                    <>
                        <span aria-hidden>·</span>
                        <span className="inline-flex items-center gap-1">
                            {sources.slice(0, 3).map((key) => {
                                const SourceIcon = EVIDENCE_SOURCE_META[key].Icon
                                return (
                                    <SourceIcon key={key} className={`size-3.5 ${EVIDENCE_SOURCE_META[key].color}`} />
                                )
                            })}
                            {sourceLabel}
                        </span>
                    </>
                )}
                {item.prNumber && (
                    <>
                        <span aria-hidden>·</span>
                        <span className="inline-flex items-center gap-1 font-mono font-semibold text-green">
                            <IconPullRequest className="size-3.5" />#{item.prNumber}
                        </span>
                    </>
                )}
            </div>

            {/* Tab strip */}
            <div className="mt-4 flex flex-wrap items-end gap-4 border-b border-primary text-sm">
                <button
                    type="button"
                    onClick={() => setTab('overview')}
                    className={`shrink-0 pb-2 ${
                        activeTab === 'overview'
                            ? 'border-b-2 border-red font-semibold text-primary dark:border-yellow'
                            : 'border-b-2 border-transparent text-secondary hover:text-primary'
                    }`}
                >
                    Overview
                </button>
                {hasFiles && (
                    <button
                        type="button"
                        onClick={() => setTab('files')}
                        className={`flex shrink-0 items-center gap-1.5 pb-2 ${
                            activeTab === 'files'
                                ? 'border-b-2 border-red font-semibold text-primary dark:border-yellow'
                                : 'border-b-2 border-transparent text-secondary hover:text-primary'
                        }`}
                    >
                        Files changed
                        <span className="font-mono text-xs tabular-nums">
                            <span className="text-red">−{stat.removed}</span>{' '}
                            <span className="text-green">+{stat.added}</span>
                        </span>
                    </button>
                )}
                {detail && (
                    <span className="mb-1.5 hidden min-w-0 items-center gap-1 rounded border border-primary bg-accent px-1.5 py-0.5 font-mono text-xs text-secondary @md:flex">
                        <IconPullRequest className="size-3 shrink-0" />
                        <span className="truncate">{detail.branch}</span>
                    </span>
                )}
            </div>

            {/* Body */}
            {activeTab === 'files' && detail?.files ? (
                <div className="mt-4">
                    <FilesChanged files={detail.files} />
                </div>
            ) : (
                <div className="mt-4 grid gap-4 @3xl:grid-cols-5">
                    <div className="@3xl:col-span-3">
                        {detail ? (
                            <CollapsibleCard title="Summary">
                                <Summary sections={detail.summary} />
                            </CollapsibleCard>
                        ) : (
                            <p className="m-0 text-sm text-secondary">{item.summary}</p>
                        )}
                    </div>
                    {/* Its own container: the evidence footers are what overflow first. */}
                    <div className="@container flex flex-col gap-3 @3xl:col-span-2">
                        {detail?.ci && (
                            <CollapsibleCard
                                title="CI checks"
                                defaultOpen={false}
                                meta={
                                    <span className="flex items-center gap-2">
                                        <span className="inline-flex items-center gap-1 text-green">
                                            <IconCheckCircle className="size-3.5" />
                                            {detail.ci.successful} successful
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <IconCircleDashed className="size-3.5" />
                                            {detail.ci.skipped} skipped
                                        </span>
                                    </span>
                                }
                            >
                                <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                                    {detail.ci.checks.map((check) => {
                                        const { Icon, color } = CHECK_ICON[check.status]
                                        return (
                                            <li
                                                key={check.name}
                                                className="flex items-center justify-between gap-2 text-xs"
                                            >
                                                <span className="inline-flex items-center gap-1.5 text-primary">
                                                    <Icon className={`size-4 shrink-0 ${color}`} />
                                                    {check.name}
                                                </span>
                                                <span className="text-secondary">{check.status}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </CollapsibleCard>
                        )}
                        {detail?.reviewers && (
                            <CollapsibleCard
                                title="Reviewers"
                                icon={
                                    <Tooltip trigger={<IconInfo className="size-3.5 shrink-0 text-secondary" />}>
                                        Suggested from a blame walk over the lines the fix touches.
                                    </Tooltip>
                                }
                                meta={<AddReviewerMenu />}
                            >
                                <ReviewerList reviewers={detail.reviewers} />
                            </CollapsibleCard>
                        )}
                        {detail?.evidence && (
                            <CollapsibleCard title="Evidence" meta={<span>{detail.evidence.length} findings</span>}>
                                <div className="flex flex-col gap-2.5">
                                    {detail.evidence.map((evidence) => (
                                        <EvidenceCard key={evidence.id} item={evidence} />
                                    ))}
                                </div>
                            </CollapsibleCard>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
