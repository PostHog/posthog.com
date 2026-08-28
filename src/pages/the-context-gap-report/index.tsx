import React from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { CallToAction } from 'components/CallToAction'
import CopyButton from 'components/Points/CopyButton'
import Link from 'components/Link'
import TeamMember from 'components/TeamMember'
import { CalloutBox } from 'components/Docs/CalloutBox'
import { Bang } from 'components/Icons'
import CloudinaryImage from 'components/CloudinaryImage'
import { Hedgehog996 } from '@posthog/brand/hoggies'
import { IconSparkles, IconOpenSidebar } from '@posthog/icons'

const PDF_PATH = '/brand/The-Context-Gap-Report.pdf'

const AGENT_PROMPT = `Research the current state of "data readiness" for AI products in 2026. Focus on data warehousing, data ingestion/ELT, data governance and quality, and data orchestration.

Pull findings from recent industry reports and surveys (Fivetran, Monte Carlo, dbt Labs, Astronomer, Snowflake, Databricks, Matillion, and the State of Data survey), plus any comparable reports you can find.

Write a 30-page report called "The Context Gap" that:
1. Defines what "data readiness" actually means for AI agents and products, not just BI dashboards.
2. Explains why AI agents give confident, wrong answers when they can't see the full picture (product data, billing, support, etc. in one place).
3. Explains why teams end up building pipelines to compensate for that, and why that's a tax rather than a fix.
4. Proposes what a unified approach (ingestion, modeling, storage, and querying in one system) would need to look like to close the gap.

Cite every stat to its source report. Flag anything you can't verify instead of guessing at a number.`

const CLAUDE_URL = `https://claude.ai/new?q=${encodeURIComponent(AGENT_PROMPT)}`
const MAX_URL = `https://app.posthog.com/#panel=max:!${encodeURIComponent(AGENT_PROMPT)}`

export default function ContextGapReport() {
    // components/Link treats any path starting with "/" as internal and ignores the `external`
    // prop (no target="_blank"), so this needs an absolute URL to open in a new tab.
    const pdfUrl = typeof window !== 'undefined' ? `${window.location.origin}${PDF_PATH}` : PDF_PATH

    return (
        <ReaderView hideLeftSidebar showQuestions={false}>
            <SEO
                title="The Context Gap - PostHog"
                description="We read 10 industry reports about the data market so you don't have to give anyone your email."
                image={`/images/og/default.png`}
            />
            <div className="max-w-6xl mx-auto px-5 py-12">
                <div className="@container">
                    <header className="not-prose">
                        <div className="flex flex-col-reverse @lg:flex-row items-center gap-6 @lg:gap-10">
                            <div className="flex-1 text-center @lg:text-left">
                                <span className="inline-block text-xs font-semibold uppercase tracking-wide text-red bg-accent border border-primary rounded-full px-3 py-1 mb-3">
                                    A PostHog industry report
                                </span>
                                <h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold !leading-[1.12] !mb-3 !mt-0 tracking-tight">
                                    The{' '}
                                    <span className="bg-red/10 dark:bg-yellow/20 text-red dark:text-yellow rounded-md px-1 whitespace-nowrap">
                                        Context Gap
                                    </span>
                                </h1>
                                <p className="!mt-0 !mb-0 text-base @sm:text-lg opacity-80">
                                    We read 10 industry reports so you don't have to give anyone your email.
                                </p>

                                <p className="not-prose text-sm text-secondary mt-2">
                                    A landing page. For a three-page PDF. We know exactly how this looks, and we're doing
                                    it anyway.
                                </p>

                                <div className="flex justify-center @lg:justify-start mt-4">
                                    <CallToAction to={pdfUrl} externalNoIcon size="md">
                                        Open the report
                                    </CallToAction>
                                </div>
                            </div>
                            <div className="shrink-0 flex justify-center">
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/haha_bizzniss_5bc44659ec.svg"
                                    className="h-auto w-40 @lg:w-56"
                                />
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-10 @2xl:gap-16 mt-10">
                        <div>
                            <p className="mt-0">
                                Part of <TeamMember name="Lizzie Epton" photo />
                                's job as a product marketer is keeping tabs on what every other company in the data
                                space is talking about.
                            </p>

                            <p>
                                When you read industry reports back-to-back you notice every vendor is talking about the same problem:{' '}
                                <strong>AI ambition is outrunning data readiness, trust, and governance.</strong>
                            </p>

                            <p>
                                We wrote our own industry report to tell you why a context warehouse is the thing our competitors have been looking for, backed up by their own data. 
                            </p>

                            <p>
                                You don't have to read everyone's reports to know what's important in data infrastructure, just read ours:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>It's only 2 pages, not 300.</li>
                                <li>It's still a PDF, so it still feels professional.</li>
                                <li>Not gated behind a form, no need to give us your email</li>
                            </ul>

                            <CalloutBox icon="IconDatabase" title="Why is a context warehouse the answer?" type="fyi">
                                <p>
                                    A <Link to="/context-warehouse">context warehouse</Link> is a data warehouse, plus
                                    the pipeline, modeling, and query tools - in one system, optimized for
                                    agents.
                                </p>
                            </CalloutBox>
                        </div>

                        <div className="relative h-full">
                            {/* -1.5rem offsets CalloutBox's own mb-6, so this bottom edge lines up with the callout's */}
                            <div className="not-prose relative h-[calc(100%-1.5rem)] border border-primary rounded overflow-hidden bg-accent">
                                <iframe
                                    src={`${PDF_PATH}#view=FitH`}
                                    title="The Context Gap report preview"
                                    className="w-full h-full"
                                />
                                <a
                                    href={pdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Open The Context Gap report as a PDF in a new tab"
                                    className="absolute top-2 right-2 flex items-center gap-1 text-xs font-semibold text-white bg-black/60 hover:bg-black/80 transition-colors rounded px-2 py-1"
                                >
                                    <IconOpenSidebar className="size-3.5" />
                                    Open in new tab
                                </a>
                            </div>

                            <div className="absolute -top-6 -right-12 pointer-events-none">
                                <div className="relative">
                                    <Bang className="w-40 @lg:w-52 animate-grow" />
                                    <p className="px-7 text-center m-0 absolute inset-0 flex flex-col items-center justify-center text-black uppercase leading-tight font-bold text-xs @lg:text-sm rotate-6">
                                        No form
                                        <br />
                                        to fill,
                                        <br />
                                        just click!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="not-prose mt-16">
                    <h2 className="text-2xl mb-3">Prefer the 30-page version?</h2>
                    <p className="mb-6 max-w-2xl">
                        Copy the prompt below into your own agent, or hand it straight to Claude, and it'll go build the
                        long version, sources and all. Consider it the corporate version.
                    </p>

                    <div className="relative">
                        <div className="absolute right-10 bottom-full translate-y-1/3 -z-10 w-32 @lg:w-40">
                            <Hedgehog996 className="w-full h-auto" />
                        </div>
                        <div className="border border-primary rounded overflow-hidden mb-4 bg-light dark:bg-dark">
                            <div className="flex items-center justify-between px-3 py-2 border-b border-primary bg-accent">
                                <span className="font-code font-medium text-xs uppercase tracking-wide text-secondary">
                                    Prompt for your agent
                                </span>
                                <CopyButton text={AGENT_PROMPT} />
                            </div>
                            <pre className="font-code text-[13px] leading-relaxed whitespace-pre-wrap break-words p-4 m-0 overflow-x-auto">
                                {AGENT_PROMPT}
                            </pre>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <CallToAction to={CLAUDE_URL} externalNoIcon size="md">
                            <span className="inline-flex items-center justify-center gap-2">
                                <IconSparkles className="size-4" />
                                Just ask Claude
                            </span>
                        </CallToAction>
                        <CallToAction to={MAX_URL} externalNoIcon size="md">
                            <span className="inline-flex items-center justify-center gap-2">
                                <IconOpenSidebar className="size-4" />
                                Just ask PostHog AI
                            </span>
                        </CallToAction>
                    </div>
                </div>
            </div>
        </ReaderView>
    )
}
