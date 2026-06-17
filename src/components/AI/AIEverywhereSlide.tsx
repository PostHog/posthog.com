import React from 'react'
import { IconArrowUpRight, IconPlug } from '@posthog/icons'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { LOGOS } from 'constants/logos'

export default function AIEverywhereSlide(): JSX.Element {
    return (
        <div data-scheme="primary" className="h-full bg-primary text-primary flex flex-col">
            <ScrollArea className="h-full">
                <div className="p-4 @md:p-8 flex flex-col justify-center min-h-full">
                    <div className="text-center mb-6 @2xl:mb-10">
                        <h2 className="text-5xl @2xl:text-4xl mb-2">PostHog AI, wherever you work</h2>
                        <p className="text-2xl @2xl:text-xl text-secondary">
                            Bring your product data into the tools you already use.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-6 @2xl:gap-10">
                        <div className="relative border border-primary rounded-md bg-accent flex flex-col overflow-hidden">
                            <Link
                                to="/docs/model-context-protocol"
                                state={{ newWindow: true }}
                                className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 text-sm font-semibold text-red hover:underline"
                            >
                                MCP docs
                                <IconArrowUpRight className="size-4" />
                            </Link>
                            <div className="p-6 pr-16 pb-4">
                                <h3 className="text-3xl @2xl:text-2xl mb-3 flex items-center gap-3">
                                    <IconPlug className="size-8 @2xl:size-7 shrink-0" />
                                    In your coding agent
                                </h3>
                                <p className="text-xl @2xl:text-base leading-snug mb-4">
                                    Plug PostHog into Claude, Cursor, and anything else that speaks MCP.
                                </p>
                                <ul className="space-y-2 text-xl @2xl:text-base">
                                    <li>
                                        <strong>Check before you change</strong> – "is anyone still on this flag?"
                                        before you delete it; "how often is this endpoint hit?" before you rewrite it.
                                    </li>
                                    <li>
                                        <strong>Size the impact</strong> – check who's on a feature flag or how an
                                        experiment is trending before you decide to ramp, hold, or roll back.
                                    </li>
                                    <li>
                                        <strong>Verify the deploy</strong> – see whether latency, errors, or conversion
                                        actually moved before you ship the next thing.
                                    </li>
                                </ul>
                            </div>
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog_in_claude_5dd8ef4761.png"
                                className="mt-auto"
                                imgClassName="w-full block"
                            />
                        </div>

                        <div className="relative border border-primary rounded-md bg-accent flex flex-col overflow-hidden">
                            <Link
                                to="/docs/slack"
                                state={{ newWindow: true }}
                                className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 text-sm font-semibold text-red hover:underline"
                            >
                                Slack app docs
                                <IconArrowUpRight className="size-4" />
                            </Link>
                            <div className="p-6 pr-16 pb-4">
                                <h3 className="text-3xl @2xl:text-2xl mb-3 flex items-center gap-3">
                                    <img
                                        src={LOGOS.slack}
                                        alt=""
                                        aria-hidden
                                        className="size-10 @2xl:size-9 shrink-0 object-contain"
                                    />
                                    In Slack
                                </h3>
                                <p className="text-xl @2xl:text-base leading-snug mb-4">
                                    Mention <code>@PostHog</code> with a data question, quick fix, or chore.
                                </p>
                                <ul className="space-y-2 text-xl @2xl:text-base">
                                    <li>
                                        <strong>Pull product data into a thread</strong> – conduct research and query
                                        data to answer product and customer questions.
                                    </li>
                                    <li>
                                        <strong>Subscribe to product insights and dashboards</strong> – receive a
                                        regular digest in your chosen Slack channels.
                                    </li>
                                    <li>
                                        <strong>Set up Slack notifications via PostHog Data Pipelines</strong> – get
                                        timely notifications of any event or action in PostHog.
                                    </li>
                                </ul>
                            </div>
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/subscription_insights_50ce62125e.png"
                                className="mt-auto"
                                imgClassName="w-full block"
                            />
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
