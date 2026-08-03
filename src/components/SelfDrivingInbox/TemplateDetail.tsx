import React, { useState } from 'react'

import { IconInfo, IconMinus, IconNotification, IconPlus } from '@posthog/icons'

import { SingleCodeBlock } from 'components/CodeBlock'
import Link from 'components/Link'
import Markdown from 'components/Markdown'

import EnableScout from './EnableScout'
import ReportCard from './ReportCard'
import Term from './terms'
import { productSource } from './sources'
import { InboxTemplate, ScoutSpec } from './types'

/**
 * The scout's SKILL.md, clipped until you ask for the rest.
 *
 * Clipped with `max-height`, not with CodeBlock's own `focusOnLines`: that drops the hidden lines
 * from the DOM, and the full file has to stay in the built HTML for the .md agent mirror. Styled
 * to match CodeBlock's "Show full example" affordance anyway. See README.md.
 */
function ScoutFile({ scout }: { scout: ScoutSpec }): JSX.Element {
    const [expanded, setExpanded] = useState(false)
    const code = (scout.raw ?? '').trim()

    return (
        <div>
            {/* CodeBlock's `whitespace-pre` scrolls long lines off a pane this narrow, and this is
                the one block we tell people to read. Wrap locally, not globally. */}
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
            {/* Plus/minus, the same affordance RadixUI/Accordion uses for expand and collapse –
                the label alone didn't read as a control. */}
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

/**
 * One numbered section – a lighter `components/Docs/Steps.tsx`, whose docs-scale treatment would
 * overpower a reading pane. Container query, not Steps' `lg:` media query: this pane resizes.
 */
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
            {/* The connector stops at the last marker, so the line reads as joining sections
                rather than trailing off into the call to action. */}
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

/**
 * One scout template, in one pane. The order teaches before it asks, so the offer to add it
 * comes last. Vocabulary is explained by `<Term>` hover cards, not by any template's own copy.
 */
export default function TemplateDetail({ template }: TemplateDetailProps): JSX.Element {
    const { question, premise, discriminator, watches, requires, scout, report, templateTitle } = template

    // Built as a list rather than inline conditionals so the numbering stays correct when a
    // template omits an optional section – a gap in the sequence reads as a missing step.
    const sections: { title: string; content: JSX.Element }[] = []

    sections.push({
        title: "What you'd receive",
        content: (
            <>
                <p className="mb-3 text-[15px] text-secondary">
                    This template sets up one <Term name="scout" />, a scheduled agent that watches for the question
                    above. When the scout finds something, it files a <Term name="report" /> in your{' '}
                    <Term name="inbox" />. Here's a report it might send you – yours would name your events, your
                    deploys, and your users.
                </p>
                <ReportCard report={report} variant="page" />
            </>
        ),
    })

    if (discriminator) {
        sections.push({
            title: 'How the scout tells a real problem from noise',
            content: (
                <>
                    {/* An empty inbox reads as broken until someone is told quiet is normal. */}
                    <p className="mb-3 text-[15px] text-secondary">
                        The scout runs on a schedule, and most runs write nothing – that's good! It means your product
                        is working. When it creates an inbox report, this is a signal your product isn't working as
                        expected.
                    </p>
                    {/* Equal weight: muted, the quiet case read as a footnote rather than the point. */}
                    <div className="grid gap-3 @[560px]:grid-cols-2">
                        <div className="rounded border border-light bg-accent p-4 dark:border-dark dark:bg-accent-dark">
                            <p className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-primary">
                                <IconNotification className="size-4 shrink-0 text-red" aria-hidden="true" />
                                Writes to your inbox
                            </p>
                            <p className="m-0 text-[15px] text-primary">{discriminator.writesToInbox}</p>
                        </div>
                        <div className="rounded border border-light bg-accent p-4 dark:border-dark dark:bg-accent-dark">
                            <p className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-primary">
                                {/* "Nothing", not "success" – a check mark implied the quiet run
                                    passed a test, when it simply produced no output. */}
                                <IconMinus className="size-4 shrink-0 text-secondary" aria-hidden="true" />
                                Writes nothing
                            </p>
                            <p className="m-0 text-[15px] text-primary">{discriminator.writesNothing}</p>
                        </div>
                    </div>
                    {discriminator.why && (
                        <p className="mt-3 mb-0 text-[15px] text-secondary">
                            <Markdown className="inline [&>p]:m-0 [&>p]:inline">{discriminator.why}</Markdown>
                        </p>
                    )}
                    {/* Why a quiet run isn't wasted. Same tokens as the docs' `fyi` CalloutBox,
                        minus its docs-scale title – as plain text it got lost between two cards. */}
                    <div className="mt-3 flex items-start gap-2 rounded border border-primary bg-accent p-3">
                        <IconInfo className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden="true" />
                        <p className="m-0 text-[15px] text-primary">
                            Quiet runs still count: scouts keep durable memory, so each one records what it learned and
                            won't re-raise a finding you've already seen.
                        </p>
                    </div>
                </>
            ),
        })
    }

    if (watches && watches.length > 0) {
        sections.push({
            title: 'What the scout reads',
            content: (
                <>
                    <p className="mb-3 text-[15px] text-secondary">
                        The scout checks more than one <Term name="signal source" />, so the report can name a likely
                        cause instead of just a number that moved.
                    </p>
                    {/* House row pattern from src/pages/self-driving. One column – an odd count
                        left an empty grid cell that read as something missing. */}
                    <ul className="m-0 list-none space-y-3 p-0">
                        {watches.map((source) => {
                            const { Icon, token, docs } = productSource(source.name)
                            return (
                                <li key={source.name} className="flex items-start gap-2">
                                    <Icon className={`mt-0.5 size-5 shrink-0 text-${token}`} aria-hidden="true" />
                                    <div>
                                        {/* Underlined explicitly: `fullScreen` drops Explorer's
                                            prose wrapper, so nothing styles links here. */}
                                        <p className="m-0 text-[15px] font-bold text-primary">
                                            {docs ? (
                                                <Link to={docs} state={{ newWindow: true }} className="underline">
                                                    {source.name}
                                                </Link>
                                            ) : (
                                                source.name
                                            )}
                                        </p>
                                        <p className="m-0 text-[15px] leading-snug text-secondary">{source.detail}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </>
            ),
        })
    }

    sections.push({
        title: 'What happens after',
        content: (
            <>
                <p className="mb-2 text-[15px] text-secondary">
                    An actionable report becomes a pull request an agent opens for you – sandboxed, on its own branch,
                    with the evidence attached. You review and merge it like any other PR, and PostHog re-measures the
                    number afterward to check the fix held. Nothing merges without you.
                </p>
                {/* Naming the price is a credibility move, most of all on a template about
                    controlling spend. */}
                <p className="m-0 text-[15px] text-secondary">
                    Reports are free. You pay <strong>$15 per pull request</strong>, and your first three PRs each month
                    are free. See{' '}
                    <Link to="/docs/self-driving/pricing" state={{ newWindow: true }} className="underline">
                        Pricing
                    </Link>{' '}
                    for more information.
                </p>
            </>
        ),
    })

    // Last before the call to action, deliberately. The prose sections above are the doc; this is
    // the appendix that backs them. Placed higher, the reader met the discriminator three times –
    // prose, sources, then the file restating both – before reaching what happens next.
    //
    // Heading is not "What this scout actually does": four of five started with "What", and that
    // phrasing implied the preceding sections were something other than what it does.
    if (scout?.raw) {
        sections.push({
            title: 'The scout itself',
            content: (
                <>
                    <p className="mb-3 text-[15px] text-secondary">
                        A scout is just instructions an agent follows on a schedule. This is the file for this scout,
                        start to finish – worth reading before you enable anything that can open pull requests against
                        your code.
                    </p>
                    <ScoutFile scout={scout} />
                </>
            ),
        })
    }

    sections.push({
        title: 'Add this to your scout troop',
        content: <EnableScout scout={scout} requires={requires} templateTitle={templateTitle} />,
    })

    return (
        <article className="@container mx-auto max-w-2xl p-6">
            <header className="mb-8">
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-secondary">The question</p>
                <h2 className="mt-0 mb-2 text-xl font-bold leading-tight text-primary @[560px]:text-2xl">
                    {question || templateTitle}
                </h2>
                {premise && <p className="m-0 text-[15px] text-secondary">{premise}</p>}
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
