import React, { useState } from 'react'

import { IconMinus, IconPlus } from '@posthog/icons'

import { SingleCodeBlock } from 'components/CodeBlock'
import Link from 'components/Link'

import EnableScout from './EnableScout'
import ReportCard from './ReportCard'
import Term from './terms'
import { productSource } from './sources'
import { InboxTemplate, ScoutSpec } from './types'

/** Clipped with `max-height`, not `focusOnLines`, which drops lines the .md mirror needs. */
function ScoutFile({ scout }: { scout: ScoutSpec }): JSX.Element {
    const [expanded, setExpanded] = useState(false)
    const code = (scout.raw ?? '').trim()

    return (
        <div>
            {/* Wrap locally: `whitespace-pre` scrolls long lines off a pane this narrow. */}
            <div
                className={`relative overflow-hidden [&_.min-w-fit]:min-w-0 [&_.whitespace-pre]:whitespace-pre-wrap [&_.whitespace-pre]:break-words ${
                    expanded ? '' : 'max-h-[15rem]'
                }`}
            >
                <SingleCodeBlock
                    language="markdown"
                    label={`${scout.name}/SKILL.md`}
                    showLabel
                    showCopy
                    showAskAI={false}
                >
                    {code}
                </SingleCodeBlock>
                {!expanded && (
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-primary"
                    />
                )}
            </div>
            {/* Plus/minus, as RadixUI/Accordion does – the label alone didn't read as a control. */}
            <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="mt-2 flex items-center gap-1.5 font-sans text-sm font-semibold text-secondary hover:text-primary"
            >
                {expanded ? (
                    <IconMinus className="size-4 shrink-0" aria-hidden="true" />
                ) : (
                    <IconPlus className="size-4 shrink-0" aria-hidden="true" />
                )}
                {expanded ? 'Show less' : 'Show full example'}
            </button>
        </div>
    )
}

interface TemplateDetailProps {
    template: InboxTemplate
}

/** A lighter `Docs/Steps.tsx`. Container query, not media: this pane resizes. */
function Section({
    number,
    title,
    isLast,
    children,
}: {
    number: number
    title: string
    isLast: boolean
    children: React.ReactNode
}) {
    return (
        <section className="relative pb-8 last:pb-0 @[300px]:pl-8">
            {/* Stops at the last marker, so the line joins sections instead of trailing off. */}
            {!isLast && (
                <span
                    aria-hidden="true"
                    className="absolute top-7 bottom-0 left-[11px] hidden w-px border-l border-primary opacity-60 @[300px]:block"
                />
            )}
            <span
                aria-hidden="true"
                className="absolute top-0 left-0 hidden size-[23px] items-center justify-center rounded-full border border-primary bg-primary text-[11px] font-bold text-secondary @[300px]:flex"
            >
                {number}
            </span>
            <h3 className="mt-0 mb-2 text-xs font-bold uppercase tracking-wide text-primary">{title}</h3>
            {children}
        </section>
    )
}

/** One guide, in one pane. The order teaches before it asks, so the offer comes last. */
export default function TemplateDetail({ template }: TemplateDetailProps): JSX.Element {
    const { premise, tldr, watches, requires, scout, report, templateTitle } = template

    // A list, not inline conditionals: an omitted section would leave a gap in the numbering.
    const sections: { title: string; content: JSX.Element }[] = []

    sections.push({
        title: 'The report in your inbox',
        content: (
            <>
                <p className="mb-3 text-[15px] text-secondary">
                    A <Term name="scout" /> files a <Term name="report" /> when it finds this. Yours would name your
                    events, your deploys, your users.
                </p>
                <ReportCard report={report} variant="page" />
            </>
        ),
    })

    sections.push({
        title: 'The pull request you merge',
        content: (
            <>
                <p className="mb-2 text-[15px] text-secondary">
                    An agent opens the pull request on its own branch, with the evidence attached. You review and merge
                    it like any other. Nothing merges without you.
                </p>
                {/* Naming the price is a credibility move, most of all on a template about spend. */}
                <p className="m-0 text-[15px] text-secondary">
                    Reports are free. Pull requests are <strong>$15 each</strong>, and your first three every month are
                    free – see{' '}
                    <Link to="/docs/self-driving/pricing" state={{ newWindow: true }} className="underline">
                        Pricing
                    </Link>
                    .
                </p>
            </>
        ),
    })

    // Sources live here, not in their own section: they describe the scout rather than a step.
    if (scout?.raw || (watches && watches.length > 0)) {
        sections.push({
            title: 'The scout itself',
            content: (
                <>
                    <p className="mb-3 text-[15px] text-secondary">
                        A scout is instructions an agent follows on a schedule. Worth reading before you let anything
                        open pull requests against your code.
                    </p>
                    {watches && watches.length > 0 && (
                        <>
                            <p className="mb-2 text-[15px] text-secondary">
                                It reads more than one <Term name="signal source" />, so the report can name a likely
                                cause instead of a number that moved.
                            </p>
                            {/* One column: an odd count left an empty grid cell reading as missing. */}
                            <ul className="mb-4 mt-0 list-none space-y-3 p-0">
                                {watches.map((source) => {
                                    const { Icon, token, docs } = productSource(source.name)
                                    return (
                                        <li key={source.name} className="flex items-start gap-2">
                                            <Icon
                                                className={`mt-0.5 size-5 shrink-0 text-${token}`}
                                                aria-hidden="true"
                                            />
                                            <div>
                                                {/* Explicit underline: `fullScreen` drops the prose wrapper. */}
                                                <p className="m-0 text-[15px] font-bold text-primary">
                                                    {docs ? (
                                                        <Link
                                                            to={docs}
                                                            state={{ newWindow: true }}
                                                            className="underline"
                                                        >
                                                            {source.name}
                                                        </Link>
                                                    ) : (
                                                        source.name
                                                    )}
                                                </p>
                                                <p className="m-0 text-[15px] leading-snug text-secondary">
                                                    {source.detail}
                                                </p>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </>
                    )}
                    {scout?.raw && <ScoutFile scout={scout} />}
                </>
            ),
        })
    }

    sections.push({
        title: 'The schedule it runs on',
        content: (
            <>
                {/* Range is the app's real one from RUN_INTERVAL_OPTIONS – no weekly, no manual run. */}
                <p className="m-0 text-[15px] text-secondary">
                    Runs <strong>{(scout?.schedule || 'Daily').toLowerCase()}</strong> by default, and you can change it
                    to anything from every 30 minutes to once a day, or a set time each day. It only writes when
                    something is wrong, so most days you won't hear from it –{' '}
                    <Link to="/docs/self-driving/scouts" state={{ newWindow: true }} className="underline">
                        how scouts decide
                    </Link>
                    .
                </p>
            </>
        ),
    })

    sections.push({
        title: 'Add this to your scout troop',
        content: <EnableScout scout={scout} requires={requires} templateTitle={templateTitle} />,
    })

    return (
        <article className="@container mx-auto max-w-2xl p-6">
            <header className="mb-8">
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-secondary">The loop</p>
                {/* The job, named – a question-shaped headline read as open-ended, not active. */}
                <h2 className="mt-0 mb-2 text-xl font-bold leading-tight text-primary @[560px]:text-2xl">
                    {templateTitle}
                </h2>
                {premise && <p className="mb-3 text-[15px] text-secondary">{premise}</p>}
                {/* Its own line, never the premise's last sentence: it's the one-thing takeaway. */}
                {tldr && <p className="m-0 text-[15px] text-secondary">{tldr}</p>}
            </header>

            {sections.map((section, index) => (
                <Section
                    key={section.title}
                    number={index + 1}
                    title={section.title}
                    isLast={index === sections.length - 1}
                >
                    {section.content}
                </Section>
            ))}
        </article>
    )
}
