import React from 'react'
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
                title="Ship with PostHog – six tools, one loop"
                description="Six pull requests, one per PostHog tool, and none of them started with a ticket. Open each one to see how your product fixes itself – then hit merge."
                image="/images/og/default.png"
            />
            <div data-scheme="secondary" className="@container h-full w-full bg-primary text-primary">
                <ScrollArea className="h-full">
                    <div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
                        {/* Hero – the inbox is the centerpiece */}
                        <div className="mx-auto mb-6 max-w-3xl text-center @md:mb-8">
                            <p className="m-0 text-sm font-bold uppercase tracking-wider text-red dark:text-yellow">
                                Self-driving use cases
                            </p>
                            <h1 className="mt-3 flex justify-center">
                                <SlotMachineText
                                    className="text-3xl font-bold !leading-[1.15] tracking-tight @md:text-4xl @2xl:text-5xl"
                                    words={SHIP_WORDS}
                                    wordClassName="text-red dark:text-yellow"
                                    prefix={<span>Ship</span>}
                                    suffix={<span>with PostHog</span>}
                                />
                            </h1>
                            <p className="mx-auto mt-4 max-w-2xl text-base text-secondary @2xl:text-lg">
                                Each one started in a different PostHog tool – an error, a session, a log line, a slow
                                trace, a failing eval. None of them started with a ticket. Review one and hit merge –
                                then see how each signal got here below.
                            </p>
                        </div>

                        {/* The Inbox */}
                        <InboxReplica />

                        {/* How different signals get to your Inbox */}
                        <div className="mt-14 @md:mt-20">
                            <SignalsToInbox />
                        </div>

                        {/* Six tools, one loop */}
                        <div className="mx-auto mt-14 max-w-2xl text-center @md:mt-20">
                            <h2 className="text-2xl font-bold @md:text-3xl">Six tools, one loop</h2>
                            <p className="mt-3 text-secondary @2xl:text-lg">
                                The loop never changes – watch, catch, investigate, fix, merge. The only thing that
                                changes is which tool opens its eyes first. Turn on more of them and more of your
                                product comes into view.
                            </p>
                            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-semibold">
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
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </>
    )
}
