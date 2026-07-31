import React from 'react'
import { IconArrowUpRight } from '@posthog/icons'
import SEO from 'components/seo'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import WizardCommand from 'components/WizardCommand'
import InboxReplica from 'components/ShipWithPostHog/InboxReplica'
import SignalsToInbox from 'components/ShipWithPostHog/SignalsToInbox'
import SlotMachineText from 'components/SlotMachineText'

// Words cycled through the "Ship {word} with PostHog" headline. "code" rests last (held
// longest) so the line settles on the page's punchline, matching the /desktop scroller.
const SHIP_WORDS = ['features', 'fixes', 'experiments', 'flags', 'surveys', 'code']

// The URL for this page. Kept in one place so renaming it is a folder move plus a
// redirect in vercel.json – nothing else references the slug.
export const SLUG = 'ship-with-posthog'

export default function ShipWithPostHog(): JSX.Element {
    return (
        <>
            <SEO
                title="Ship with PostHog – self-driving pull requests, already merged"
                description="Self-driving PostHog watches your product, investigates what it catches, and opens the pull request. These are real merged PRs on PostHog/posthog – open one to read the evidence behind it and the diff that shipped."
                image="/images/og/default.png"
            />
            <div data-scheme="secondary" className="@container h-full w-full bg-primary text-primary">
                <ScrollArea className="h-full">
                    <div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
                        {/* Hero – the inbox is the centerpiece. Two columns so the headline stays left
                            aligned: the scrolling word changes width every step, and a centered line would
                            shift sideways under it. "with PostHog" sits on its own line for the same reason. */}
                        <div className="mb-6 grid grid-cols-1 gap-4 @md:mb-8 @2xl:grid-cols-[auto_1fr] @2xl:items-start @2xl:gap-6">
                            <h1 className="whitespace-nowrap text-3xl font-bold !leading-[1.15] tracking-tight @md:text-4xl @2xl:text-5xl">
                                <SlotMachineText
                                    words={SHIP_WORDS}
                                    wordClassName="text-red dark:text-yellow"
                                    prefix={<span>Ship</span>}
                                />
                                <span className="block">with PostHog</span>
                            </h1>
                            <div className="max-w-2xl @2xl:border-l @2xl:border-primary @2xl:pl-6 @2xl:pt-1">
                                <p className="m-0 text-sm text-secondary @2xl:text-base">
                                    These are real merged pull requests on{' '}
                                    <Link to="https://github.com/PostHog/posthog" external>
                                        PostHog/posthog
                                    </Link>
                                    . Open one to read the evidence behind it and the diff that shipped.
                                </p>
                                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                                    <WizardCommand command="self-driving" slim />
                                    <Link
                                        to="/docs/self-driving/inbox"
                                        state={{ newWindow: true }}
                                        className="group inline-flex items-center gap-1 text-sm font-semibold text-red dark:text-yellow"
                                    >
                                        Set up your Inbox
                                        <IconArrowUpRight className="size-3.5 opacity-75 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* The Inbox */}
                        <InboxReplica />

                        {/* Per-PR walkthroughs of the five beats between signal and merge */}
                        <div className="mt-14 @md:mt-20">
                            <SignalsToInbox />
                        </div>

                        {/* CTA */}
                        <div className="mx-auto mt-12 max-w-2xl rounded-lg border border-primary bg-accent p-6 @md:mt-16 @md:p-8">
                            <h2 className="mt-0 text-2xl font-bold">Set up your Inbox</h2>
                            <p className="mt-2 text-secondary">
                                Install PostHog, then run the wizard – it turns on your signal sources, connects GitHub,
                                and sets up your scouts. Your first reports start landing in about 20–30 minutes.
                            </p>
                            <div className="mt-4">
                                <WizardCommand command="self-driving" />
                            </div>
                            <div className="mt-5 flex flex-wrap items-center gap-3">
                                <CallToAction to="/docs/self-driving/inbox" state={{ newWindow: true }} size="md">
                                    Set up your Inbox
                                </CallToAction>
                                <span className="text-sm text-secondary">
                                    New to PostHog?{' '}
                                    <Link to="https://app.posthog.com/signup" external>
                                        Sign up
                                    </Link>
                                </span>
                            </div>
                            {/* The page's only routes to the overview and the docs root. */}
                            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-primary pt-4 text-sm font-semibold">
                                <Link
                                    to="/self-driving"
                                    state={{ newWindow: true }}
                                    className="text-red dark:text-yellow"
                                >
                                    How self-driving works
                                </Link>
                                <span aria-hidden className="text-secondary">
                                    ·
                                </span>
                                <Link
                                    to="/docs/self-driving"
                                    state={{ newWindow: true }}
                                    className="text-red dark:text-yellow"
                                >
                                    Read the docs
                                </Link>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </>
    )
}
