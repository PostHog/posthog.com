import React from 'react'

import Markdown from 'components/Markdown'

import EnableScout from './EnableScout'
import ReportCard from './ReportCard'
import Term from './terms'
import { InboxTemplate } from './types'

interface TemplateDetailProps {
    template: InboxTemplate
}

function SectionHeading({ children }: { children: React.ReactNode }): JSX.Element {
    return <h3 className="mt-0 mb-2 text-xs font-bold uppercase tracking-wide text-secondary">{children}</h3>
}

/**
 * Everything a visitor needs about one scout template, in one pane.
 *
 * The order teaches before it asks: the question, then the artifact it produces, then how it
 * reasons, then what it reads, then what happens after — and only then the offer to add it.
 * Leading with the ask meant pitching a purchase before explaining the product, and leading with
 * the report dropped people into a finding about someone else's checkout flow.
 *
 * Concept vocabulary (report, scout, signal) is explained by `<Term>` hover cards rather than
 * inline prose, so the 101 is available on every template without any of them carrying it.
 */
export default function TemplateDetail({ template }: TemplateDetailProps): JSX.Element {
    const { question, premise, discriminator, watches, requires, scout, report, templateTitle } = template

    return (
        <article className="@container mx-auto max-w-2xl p-6">
            <header className="mb-8">
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-secondary">The question</p>
                <h2 className="mt-0 mb-2 text-xl font-bold leading-tight text-primary @[560px]:text-2xl">
                    {question || templateTitle}
                </h2>
                {premise && <p className="m-0 text-[15px] text-secondary">{premise}</p>}
            </header>

            <section className="mb-8">
                <SectionHeading>What you'd receive</SectionHeading>
                <p className="mb-3 text-[15px] text-secondary">
                    When it finds something, it files a <Term name="report" /> in your <Term name="inbox" />. Here's one
                    it might send you – yours would name your events, your deploys, and your users.
                </p>
                <ReportCard report={report} variant="page" />
            </section>

            {discriminator && (
                <section className="mb-8">
                    <SectionHeading>How it tells a real problem from noise</SectionHeading>
                    <div className="grid gap-3 @[560px]:grid-cols-2">
                        <div className="rounded border border-light bg-accent p-4 dark:border-dark dark:bg-accent-dark">
                            <p className="mb-1 flex items-center gap-1.5 text-sm font-bold text-primary">
                                <span className="size-2 rounded-full bg-red" aria-hidden="true" />
                                It speaks up
                            </p>
                            <p className="m-0 text-[15px] text-primary">{discriminator.speaksUp}</p>
                        </div>
                        <div className="rounded border border-light bg-accent p-4 dark:border-dark dark:bg-accent-dark">
                            <p className="mb-1 flex items-center gap-1.5 text-sm font-bold text-secondary">
                                <span className="size-2 rounded-full bg-secondary" aria-hidden="true" />
                                It stays quiet
                            </p>
                            <p className="m-0 text-[15px] text-secondary">{discriminator.staysQuiet}</p>
                        </div>
                    </div>
                    {discriminator.why && (
                        <p className="mt-3 mb-0 text-[15px] text-secondary">
                            <Markdown className="inline [&>p]:m-0 [&>p]:inline">{discriminator.why}</Markdown>
                        </p>
                    )}
                    <p className="mt-3 mb-0 text-sm text-secondary">
                        Knowing when to stay quiet is most of the work. A watcher that flags every dip trains you to
                        ignore it.
                    </p>
                </section>
            )}

            {watches && watches.length > 0 && (
                <section className="mb-8">
                    <SectionHeading>What it reads</SectionHeading>
                    <p className="mb-3 text-[15px] text-secondary">
                        It corroborates across more than one <Term name="signal source">source</Term>, which is what
                        lets a report name a likely cause instead of just a number that moved.
                    </p>
                    <ul className="m-0 list-none space-y-2 p-0">
                        {watches.map((source) => (
                            <li key={source.name} className="rounded border border-light px-4 py-3 dark:border-dark">
                                <p className="m-0 text-[15px] font-semibold text-primary">{source.name}</p>
                                <p className="m-0 text-sm text-secondary">{source.detail}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {scout?.body && (
                <section className="mb-8">
                    <SectionHeading>What this scout actually does</SectionHeading>
                    <p className="mb-3 text-[15px] text-secondary">
                        A <Term name="scout" /> is just instructions an agent follows on a schedule. Here are this
                        one's, in full – worth a read before you enable anything that can open pull requests against
                        your code.
                    </p>
                    {/* <details> is the house progressive-disclosure pattern in docs (styled in
                        global.css). Rendering the body – rather than only encoding it into the
                        deep link – is also what puts it in the built HTML, and therefore in the
                        .md mirror agents read. See README.md. */}
                    <details className="rounded border border-light px-4 py-3 dark:border-dark">
                        <summary className="cursor-pointer text-[15px] font-semibold text-primary">
                            Read the instructions
                        </summary>
                        <div className="mt-3">
                            {/* The canonical scout contract: the harness discovers scouts by
                                globbing signals-scout-*, and `description` doubles as the
                                description on the config API. */}
                            <pre className="mb-3 overflow-x-auto rounded bg-accent p-3 text-xs dark:bg-accent-dark">
                                <code>
                                    {[
                                        '---',
                                        `name: ${scout.name}`,
                                        `description: ${scout.description}`,
                                        'allowed_tools: [emit_report, edit_report]',
                                        '---',
                                    ].join('\n')}
                                </code>
                            </pre>
                            <Markdown className="text-[15px] text-primary">{scout.body}</Markdown>
                        </div>
                    </details>
                </section>
            )}

            <section className="mb-8">
                <SectionHeading>What happens after</SectionHeading>
                <p className="m-0 text-[15px] text-secondary">
                    An actionable report becomes a pull request an agent opens for you – sandboxed, on its own branch,
                    with the evidence attached. You review and merge it like any other PR, and PostHog re-measures the
                    number afterwards to check the fix held. Nothing merges without you.
                </p>
            </section>

            <EnableScout scout={scout} requires={requires} templateTitle={templateTitle} />
        </article>
    )
}
