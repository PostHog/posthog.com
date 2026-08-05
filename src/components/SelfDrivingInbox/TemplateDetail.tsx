import React from 'react'

import Link from 'components/Link'

import EnableScout from './EnableScout'
import ReportCard from './ReportCard'
import ScoutFile from './ScoutFile'
import Term from './terms'
import { productSource } from './sources'
import { InboxTemplate } from './types'

interface TemplateDetailProps {
    template: InboxTemplate
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section>
            <h3 className="mt-8 mb-2 text-xs font-bold uppercase tracking-wide text-primary">{title}</h3>
            {children}
        </section>
    )
}

/**
 * One guide, compact, inside the inbox's detail pane. Pocket guide pages are authored as MDX and
 * rendered by `components/PocketGuides/BookPage.tsx`; this stays the in-exhibit rendering.
 */
export default function TemplateDetail({ template }: TemplateDetailProps): JSX.Element {
    const { premise, tldr, watches, requires, scout, report, templateTitle } = template

    return (
        <article className="@container mx-auto max-w-2xl p-6">
            <header>
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-secondary">
                    Pocket guide · Self-driving
                </p>
                <h2 className="mt-0 mb-2 text-xl font-bold leading-tight text-primary @[560px]:text-2xl">
                    {templateTitle}
                </h2>
                {premise && <p className="mb-3 text-[15px] text-secondary">{premise}</p>}
                {/* Its own line, never the premise's last sentence: it's the one-thing takeaway. */}
                {tldr && <p className="m-0 text-[15px] text-secondary">{tldr}</p>}
            </header>

            <Section title="The report in your inbox">
                <p className="mb-3 text-[15px] text-secondary">
                    A <Term name="scout" /> files a <Term name="report" /> when it finds this. Yours would name your
                    events, your deploys, your users.
                </p>
                <ReportCard report={report} variant="page" />
            </Section>

            <Section title="The pull request you merge">
                <p className="mb-2 text-[15px] text-secondary">
                    An agent opens the pull request on its own branch, with the evidence attached. You review and merge
                    it like any other. Nothing merges without you.
                </p>
                <p className="m-0 text-[15px] text-secondary">
                    Reports are free. Pull requests are <strong>$15 each</strong>, and your first three every month are
                    free – see{' '}
                    <Link to="/docs/self-driving/pricing" state={{ newWindow: true }} className="underline">
                        Pricing
                    </Link>
                    .
                </p>
            </Section>

            {(scout?.raw || (watches && watches.length > 0)) && (
                <Section title="The scout itself">
                    <p className="mb-3 text-[15px] text-secondary">
                        A scout is instructions an agent follows on a schedule. Worth reading before you let anything
                        open pull requests against your code.
                    </p>
                    {watches && watches.length > 0 && (
                        <ul className="mb-4 mt-0 list-none space-y-3 p-0">
                            {watches.map((source) => {
                                const { Icon, token, docs } = productSource(source.name)
                                return (
                                    <li key={source.name} className="flex items-start gap-2">
                                        <Icon className={`mt-0.5 size-5 shrink-0 text-${token}`} aria-hidden="true" />
                                        <div>
                                            <p className="m-0 text-[15px] font-bold text-primary">
                                                {docs ? (
                                                    <Link to={docs} state={{ newWindow: true }} className="underline">
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
                    )}
                    {scout?.raw && <ScoutFile scout={scout} />}
                </Section>
            )}

            <Section title="The schedule it runs on">
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
            </Section>

            <Section title="Add this to your scout troop">
                <EnableScout scout={scout} requires={requires} templateTitle={templateTitle} />
            </Section>
        </article>
    )
}
