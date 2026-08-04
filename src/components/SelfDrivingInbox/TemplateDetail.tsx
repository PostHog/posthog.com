import React, { useState } from 'react'

import { IconMinus, IconPlus } from '@posthog/icons'

import { SingleCodeBlock } from 'components/CodeBlock'
import Link from 'components/Link'

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
    const { premise, watches, requires, scout, report, templateTitle } = template

    // Built as a list rather than inline conditionals so the numbering stays correct when a
    // template omits an optional section – a gap in the sequence reads as a missing step.
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

    // The sources it reads live here rather than in a section of their own: they describe the
    // scout, and as a separate step they read as a third thing to learn before the payoff.
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
                            {/* House row pattern from src/pages/self-driving. One column – an odd
                                count left an empty grid cell that read as something missing. */}
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
                                                {/* Underlined explicitly: `fullScreen` drops
                                                    Explorer's prose wrapper, so nothing styles
                                                    links here. */}
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
                <p className="mb-2 text-[15px] text-secondary">
                    {scout?.schedule ? (
                        <>
                            This one runs <strong>{scout.schedule.toLowerCase()}</strong> by default.
                        </>
                    ) : (
                        <>You pick how often it runs.</>
                    )}{' '}
                    Hourly, daily, weekly, at a set time, or only when you run it by hand.
                </p>
                {/* An empty inbox reads as broken until someone is told quiet is normal. The
                    mechanics of how it decides are docs territory – link, don't explain. */}
                <p className="m-0 text-[15px] text-secondary">
                    Most runs find nothing and write nothing. That's the scout working, not a scout that's broken –{' '}
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
                {/* The job, named – not the question it answers. A question-shaped headline read
                    as open-ended and contemplative where this wants to be boring and active. */}
                <h2 className="mt-0 mb-2 text-xl font-bold leading-tight text-primary @[560px]:text-2xl">
                    {templateTitle}
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
