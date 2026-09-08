import React, { useState } from 'react'
import {
    IconArrowLeft,
    IconArrowUpRight,
    IconCheckCircle,
    IconCircleDashed,
    IconEye,
    IconGithub,
    IconInfo,
    IconPullRequest,
    IconReceipt,
    IconSparkles,
    IconThumbsDown,
    IconThumbsUp,
} from '@posthog/icons'
import Link from 'components/Link'
import { Hint } from './prose'
import PriorityBadge from './PriorityBadge'
import CollapsibleCard from './CollapsibleCard'
import EvidenceRail from './EvidenceRail'
import ReviewerList, { AddReviewerMenu } from './ReviewerList'
import FilesChanged from './FilesChanged'
import {
    diffStat,
    EVIDENCE_SOURCE_META,
    findingsCount,
    originMeta,
    repoOf,
    sourceKeyOf,
    type CheckStatus,
    type InboxItem,
    type Priority,
    type ProseSection,
} from './inboxData'

/*
 * Shared look for the header actions. One bordered pill so the toolbar reads as a single
 * row, which is how the redesign has it – the actions moved up beside the back link and
 * out of the title row.
 */
const ACTION_BUTTON_CLASS =
    'inline-flex items-center gap-1.5 rounded border border-primary bg-primary px-2 py-1 text-sm font-semibold text-primary transition-colors hover:bg-accent'

// Real reports often have a single signal, so "1 findings" shows up without this.
const plural = (count: number, noun: string): string => `${count} ${noun}${count === 1 ? '' : 's'}`

// What each priority means, for the badge's tooltip.
const PRIORITY_HINT: Record<Priority, string> = {
    P0: 'Critical. Something is broken for everyone, right now.',
    P1: 'High. It blocks real work for a lot of people, but it is not an outage.',
    P2: 'Medium. Worth fixing, and it can wait for a normal review cycle.',
    P3: 'Low. Real but minor, or narrow enough to sit behind other work.',
    P4: 'Minimal. Filed for the record more than for the queue.',
}

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
                {section.heading && (
                    <h4 className="m-0 mb-1 text-base font-bold text-primary @md:text-lg">{section.heading}</h4>
                )}
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                        key={paragraphIndex}
                        className="m-0 mt-2 text-sm leading-relaxed text-secondary first:mt-0 [&_strong]:text-primary @md:text-base"
                    >
                        {paragraph}
                    </p>
                ))}
            </div>
        ))}
    </div>
)

/**
 * The report detail view, following the redesign's inverted layout: the evidence rail
 * on the left, and the agent's write-up given the wide column on the right.
 *
 * Every panel is optional, so an item carrying only a summary renders header plus
 * summary rather than a column of empty cards. Two panels the app has are absent for
 * that reason rather than by choice – see the note at the foot of README.md:
 *   - **Runs** (the Implementation / Research entries)
 *   - **Activity** (the "N entries" log)
 * Neither has a field on `ReportDetail`, and filling them in would mean inventing run
 * counts and timestamps on a page whose whole claim is that it doesn't.
 */
export default function ReportDetail({ item, onBack }: { item: InboxItem; onBack: () => void }): JSX.Element {
    const [tab, setTab] = useState<'summary' | 'files'>('summary')
    const detail = item.detail
    const origin = originMeta(item)
    const OriginIcon = origin.Icon
    const repo = repoOf(item)

    const stat = detail ? diffStat(detail) : { added: 0, removed: 0 }
    const hasFiles = !!detail?.files?.length
    /*
     * The real pull request's file count, which `stats` carries. `detail.files` is only
     * the excerpted hunk we display, so counting that would undercount the change.
     */
    const fileCount = detail?.stats?.files ?? detail?.files?.length ?? 0
    const activeTab = hasFiles ? tab : 'summary'

    /*
     * The contributing-source cluster, e.g. "Conversations + 1". Suppressed when it
     * would only repeat the origin beside it – most reports have a single source, and
     * that source IS the origin, so rendering both reads as "Error tracking · Error
     * tracking".
     */
    const sources = detail?.contributingSources ?? []
    const redundant = sources.length === 1 && sources[0] === sourceKeyOf(item)
    const firstSource = sources.length && !redundant ? EVIDENCE_SOURCE_META[sources[0]] : null
    const sourceLabel = firstSource
        ? `${firstSource.groupLabel ?? firstSource.label}${sources.length > 1 ? ` + ${sources.length - 1}` : ''}`
        : null

    const hasRail = !!(detail?.evidence?.length || detail?.ci || detail?.reviewers?.length)

    /* The scope chip that sits ahead of the title, in the header and on the Files tab. */
    const scopeChip = (
        <Hint
            trigger={
                <span className="mr-1.5 whitespace-nowrap rounded border border-primary bg-accent px-1.5 py-0.5 align-middle font-mono text-sm font-normal text-secondary">
                    {item.commitType}({item.scope})
                </span>
            }
        >
            The commit type and scope the agent chose, so the change reads like the rest of your history.
        </Hint>
    )

    return (
        <div className="p-3 @md:p-5">
            {/* Header: back link left, actions right */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:text-primary"
                >
                    <IconArrowLeft className="size-4" />
                    Self-driving inbox
                </button>

                <div className="flex flex-wrap items-center justify-end gap-2">
                    {/*
                     * Only an item with a pull request offers GitHub and Refund. The redesign
                     * dropped "Create PR" – a report with no pull request simply doesn't carry
                     * that action any more.
                     */}
                    {item.prUrl && (
                        <Link to={item.prUrl} externalNoIcon className={ACTION_BUTTON_CLASS}>
                            <IconGithub className="size-4 text-secondary" />
                            Open in GitHub
                            <IconArrowUpRight className="size-3.5 text-secondary" />
                        </Link>
                    )}
                    <Hint
                        trigger={
                            <button type="button" className={ACTION_BUTTON_CLASS}>
                                <IconSparkles className="size-4 text-secondary" />
                                Ask AI
                            </button>
                        }
                    >
                        Ask an agent anything about this report. Why it thinks this, or what else it looked at.
                    </Hint>
                    <Hint
                        trigger={
                            <button type="button" className={ACTION_BUTTON_CLASS}>
                                <IconCheckCircle className="size-4 text-secondary" />
                                Resolve
                            </button>
                        }
                    >
                        Marks the report done, once you've merged the fix or handled it yourself.
                    </Hint>
                    <Hint
                        trigger={
                            <button type="button" className={ACTION_BUTTON_CLASS}>
                                <IconEye className="size-4 text-secondary" />
                                Dismiss
                            </button>
                        }
                    >
                        Clears the report from your inbox without acting on it. The reason you give reaches the scout
                        that filed it.
                    </Hint>
                    {item.prNumber && (
                        <Hint
                            trigger={
                                <button type="button" className={ACTION_BUTTON_CLASS}>
                                    <IconReceipt className="size-4 text-secondary" />
                                    Refund
                                </button>
                            }
                        >
                            Pull requests cost $15. If one isn't useful, refund it and you're not charged.
                        </Hint>
                    )}
                </div>
            </div>

            {/* Body: evidence rail left, write-up right */}
            <div className={`mt-3 grid gap-3 ${hasRail ? '@3xl:grid-cols-[19rem_1fr]' : ''}`}>
                {hasRail && (
                    /* Its own container: the evidence footers are what overflow first. */
                    <aside className="@container flex min-w-0 flex-col gap-2">
                        {!!detail?.evidence?.length && <EvidenceRail evidence={detail.evidence} />}
                        {detail?.ci && (
                            <CollapsibleCard
                                title="CI checks"
                                defaultOpen={false}
                                meta={
                                    <Hint
                                        trigger={
                                            <span className="flex items-center gap-2">
                                                <span className="inline-flex items-center gap-1 text-green">
                                                    <IconCheckCircle className="size-3.5" />
                                                    {detail.ci.successful} successful
                                                </span>
                                            </span>
                                        }
                                    >
                                        Your own CI, on the agent's branch. It waits for the run and fixes what it
                                        breaks before asking you to look.
                                    </Hint>
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
                                                <span className="inline-flex min-w-0 items-center gap-1.5 text-primary">
                                                    <Icon className={`size-4 shrink-0 ${color}`} />
                                                    <span className="truncate">{check.name}</span>
                                                </span>
                                                <span className="shrink-0 text-secondary">{check.status}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </CollapsibleCard>
                        )}
                        {!!detail?.reviewers?.length && (
                            <CollapsibleCard
                                title="Reviewers"
                                icon={
                                    <Hint trigger={<IconInfo className="size-3.5 shrink-0 text-secondary" />}>
                                        Suggested from a blame walk over the lines the fix touches.
                                    </Hint>
                                }
                                meta={<AddReviewerMenu />}
                            >
                                <ReviewerList reviewers={detail.reviewers} />
                            </CollapsibleCard>
                        )}
                    </aside>
                )}

                <main className="min-w-0">
                    {/* Tab strip, with the diff stat inside the Files-changed label */}
                    <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-b border-primary text-sm">
                        <div className="flex items-end gap-4">
                            {hasFiles ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setTab('summary')}
                                        className={`shrink-0 pb-2 ${
                                            activeTab === 'summary'
                                                ? 'border-b-2 border-red font-semibold text-primary dark:border-yellow'
                                                : 'border-b-2 border-transparent text-secondary hover:text-primary'
                                        }`}
                                    >
                                        Summary
                                    </button>
                                    <Hint
                                        trigger={
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
                                        }
                                    >
                                        The diff the agent wrote: {stat.added} lines added, {stat.removed} removed,
                                        across {fileCount === 1 ? 'one file' : `${fileCount} files`}.
                                    </Hint>
                                </>
                            ) : (
                                /* No diff, so no tabs – the app titles the panel instead. */
                                <span className="shrink-0 pb-2 font-semibold text-primary">Report summary</span>
                            )}
                        </div>
                        {detail && (
                            <Hint
                                trigger={
                                    <span className="pb-2 text-xs text-secondary">Generated {detail.firstSeen}</span>
                                }
                            >
                                When the agent wrote this up. Reports stay live, and new signals keep attaching to this
                                one until it's resolved.
                            </Hint>
                        )}
                    </div>

                    {activeTab === 'files' && detail?.files ? (
                        <div className="mt-3">
                            {/* `fileCount` is the pull request's real total; `files` is what we excerpt. */}
                            <FilesChanged files={detail.files} totalFiles={fileCount} />
                        </div>
                    ) : (
                        <div className="mt-3">
                            {/* Title, with the priority chip and scope tag ahead of it */}
                            <h3 className="m-0 text-lg font-bold leading-snug text-primary @md:text-2xl">
                                <Hint trigger={<PriorityBadge priority={item.priority} />}>
                                    {PRIORITY_HINT[item.priority]}
                                </Hint>{' '}
                                {scopeChip}
                                {item.title}
                            </h3>

                            {/* Meta row */}
                            <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-secondary">
                                {detail && (
                                    <Hint
                                        trigger={
                                            <span
                                                className={`inline-flex items-center rounded-full border px-1.5 py-0.5 font-semibold ${
                                                    detail.status === 'Actionable'
                                                        ? 'border-green/40 bg-green/10 text-green'
                                                        : 'border-orange/40 bg-orange/10 text-orange'
                                                }`}
                                            >
                                                {detail.status}
                                            </span>
                                        }
                                    >
                                        {detail.status === 'Actionable'
                                            ? 'The agent found a fix it can write itself. Reports needing a judgment call are marked "needs input" and wait for you instead.'
                                            : 'The agent investigated but wouldn’t stand behind a fix, so it stopped and handed the call back to you instead of shipping a guess.'}
                                    </Hint>
                                )}
                                <Hint trigger={<span>{plural(findingsCount(item), 'finding')}</span>}>
                                    Separate signals that turned out to describe the same problem. Grouping them is what
                                    turns noise into one piece of work.
                                </Hint>
                                {detail && (
                                    <>
                                        <span aria-hidden>·</span>
                                        <Hint trigger={<span>Last updated {detail.lastUpdated}</span>}>
                                            Reports stay live. New signals keep attaching to this one until it's
                                            resolved.
                                        </Hint>
                                    </>
                                )}
                                <span aria-hidden>·</span>
                                <Hint
                                    trigger={
                                        <span className="inline-flex items-center gap-1">
                                            <OriginIcon className={`size-3.5 ${origin.color}`} />
                                            {origin.primary}
                                            {origin.secondary && <span>· {origin.secondary}</span>}
                                        </span>
                                    }
                                >
                                    {origin.primary === 'Scout'
                                        ? 'A scheduled agent went looking and found this. Scouts use judgment, so they report what they think is worth your time.'
                                        : `${origin.primary} is a signal source: it feeds the loop continuously, so this entered the moment it happened, with no scheduled check to wait for.`}
                                </Hint>
                                {sourceLabel && (
                                    <>
                                        <span aria-hidden>·</span>
                                        <Hint
                                            trigger={
                                                <span className="inline-flex items-center gap-1">
                                                    {sources.slice(0, 3).map((key) => {
                                                        const SourceIcon = EVIDENCE_SOURCE_META[key].Icon
                                                        return (
                                                            <SourceIcon
                                                                key={key}
                                                                className={`size-3.5 ${EVIDENCE_SOURCE_META[key].color}`}
                                                            />
                                                        )
                                                    })}
                                                    {sourceLabel}
                                                </span>
                                            }
                                        >
                                            Every product that contributed evidence:{' '}
                                            {sources.map((key) => EVIDENCE_SOURCE_META[key].label).join(', ')}. Turn on
                                            more of them and more of your product comes into view.
                                        </Hint>
                                    </>
                                )}
                                {/* No branch until an agent picks the report up, so this can be absent. */}
                                {detail?.branch && (
                                    <>
                                        <span aria-hidden>·</span>
                                        <Hint
                                            trigger={
                                                <span className="inline-flex min-w-0 items-center gap-1 font-mono">
                                                    <IconPullRequest className="size-3 shrink-0" />
                                                    <span className="truncate">{detail.branch}</span>
                                                </span>
                                            }
                                        >
                                            The branch the agent worked on. It runs in a sandbox, so it never touches
                                            your main branch.
                                        </Hint>
                                    </>
                                )}
                            </div>

                            <div className="mt-4">
                                {detail ? (
                                    <Summary sections={detail.summary} />
                                ) : (
                                    <p className="m-0 text-sm text-secondary @md:text-base">{item.summary}</p>
                                )}
                            </div>

                            {/* The pull-request callout that closes the write-up in the app */}
                            {item.prUrl && repo && (
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-md border border-primary bg-primary px-3 py-2.5">
                                    <p className="m-0 text-sm text-secondary">
                                        A pull request with this fix is merged:{' '}
                                        <span className="font-mono text-primary">
                                            {repo}#{item.prNumber}
                                        </span>
                                    </p>
                                    <Link to={item.prUrl} externalNoIcon className={ACTION_BUTTON_CLASS}>
                                        <IconGithub className="size-4 text-secondary" />
                                        Open in GitHub
                                        <IconArrowUpRight className="size-3.5 text-secondary" />
                                    </Link>
                                </div>
                            )}

                            {/* Feedback row, as the app closes every report */}
                            <div className="mt-4 flex items-center justify-end gap-2 text-xs text-secondary">
                                Was this report useful?
                                <Hint
                                    trigger={
                                        <span className="inline-flex items-center gap-1">
                                            <span className="inline-flex size-6 items-center justify-center rounded border border-primary bg-primary">
                                                <IconThumbsUp className="size-3.5" />
                                            </span>
                                            <span className="inline-flex size-6 items-center justify-center rounded border border-primary bg-primary">
                                                <IconThumbsDown className="size-3.5" />
                                            </span>
                                        </span>
                                    }
                                >
                                    Rating a report teaches the scout that filed it what you care about, so the next one
                                    is better aimed.
                                </Hint>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
