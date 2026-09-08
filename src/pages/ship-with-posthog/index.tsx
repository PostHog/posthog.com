import React from 'react'
import { graphql } from 'gatsby'
import { IconArrowUpRight } from '@posthog/icons'
import SEO from 'components/seo'
import { Accordion } from 'components/RadixUI/Accordion'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import WizardCommand from 'components/WizardCommand'
import InboxReplica from 'components/ShipWithPostHog/InboxReplica'
import SignalsToInbox from 'components/ShipWithPostHog/SignalsToInbox'
import SelfDrivingStories, { type SelfDrivingPost } from 'components/ShipWithPostHog/SelfDrivingStories'
import SlotMachineText from 'components/SlotMachineText'

// Words cycled through the "Ship {word} with PostHog" headline. "code" rests last (held
// longest) so the line settles on the page's punchline, matching the /desktop scroller.
const SHIP_WORDS = ['features', 'fixes', 'experiments', 'flags', 'surveys', 'code']

// The URL for this page. Kept in one place so renaming it is a folder move plus a
// redirect in vercel.json – nothing else references the slug.
export const SLUG = 'ship-with-posthog'

interface ShipWithPostHogProps {
    data: {
        selfDrivingPosts: { nodes: SelfDrivingPost[] }
    }
}

/*
 * FAQ under the CTA, using the same `Accordion` the /slack page's FAQ uses rather than a
 * new component. Questions are the ones people actually ask about this loop: what the
 * Inbox is, whether "self-driving" is a thing you buy, and what the two words the rest of
 * the page leans on – signal and scout – actually mean.
 */
const LINK_CLASS = 'text-red dark:text-yellow font-semibold hover:underline'

const faqItems = [
    {
        trigger: 'What is the Inbox?',
        content: (
            <>
                <p>
                    It's where everything self-driving PostHog finds shows up for you to decide on. One list of reports,
                    each one a problem it noticed and wrote up. Some arrive with a pull request already attached. The
                    rest are waiting on a call only you can make.
                </p>
                <p className="mt-2">
                    The scene at the top of this page is a copy of it, loaded with real reports from our own project.
                    Open one and you get what we get.
                </p>
            </>
        ),
    },
    {
        trigger: 'Is the Inbox a separate app?',
        content: (
            <>
                <p>
                    No. It's part of the PostHog you already have. The same inbox is available in{' '}
                    <Link to="/docs/self-driving/web" state={{ newWindow: true }} className={LINK_CLASS}>
                        PostHog Web
                    </Link>
                    ,{' '}
                    <Link to="/docs/posthog-desktop/self-driving" state={{ newWindow: true }} className={LINK_CLASS}>
                        PostHog Desktop
                    </Link>
                    , and{' '}
                    <Link to="/slack" state={{ newWindow: true }} className={LINK_CLASS}>
                        Slack
                    </Link>
                    . Only the way you open it changes.
                </p>
                <p className="mt-2">
                    Setup is shared too, not per surface. Your signal sources, scouts, reports and inbox state are the
                    same everywhere: connect a source or tune a scout in one place and it takes effect in all of them.
                </p>
            </>
        ),
    },
    {
        trigger: 'Is self-driving a product?',
        content: (
            <>
                <p>
                    No. There's nothing called "self-driving" to buy, and no separate bill. It's what the products you
                    already have do when you turn the loop on: error tracking, session replay, product analytics and the
                    rest stop being dashboards you check and start filing work.
                </p>
                <p className="mt-2">
                    You can read{' '}
                    <Link to="/self-driving" state={{ newWindow: true }} className={LINK_CLASS}>
                        how it works
                    </Link>{' '}
                    in full.
                </p>
            </>
        ),
    },
    {
        trigger: 'What is a signal?',
        content: (
            <>
                <p>
                    Something your product did that's worth a second look. A new exception, a spike, a support thread, a
                    scanner catching someone give up on a recording. Signals arrive the moment the thing happens.
                </p>
                <p className="mt-2">
                    On their own they're noise. The useful part is the grouping: several signals describing the same
                    underlying problem become one report. That's why a report here often says "3 findings" instead of
                    arriving three times.
                </p>
            </>
        ),
    },
    {
        trigger: 'What is a scout?',
        content: (
            <>
                <p>
                    A scheduled agent that goes looking instead of waiting to be told. A scout runs on its own cadence,
                    hourly or daily, sweeps the surface it's responsible for, and files a report when it finds something
                    that clears its bar. Most runs find nothing.
                </p>
                <p className="mt-2">
                    Scouts learn. They keep durable notes on what turned out to be noise, so the same false positive
                    doesn't come back, and you can steer one by leaving it a note or dismissing a report with a reason.
                    Writing a new one takes a prompt.
                </p>
            </>
        ),
    },
    {
        trigger: 'How is a report different from a PR?',
        content: (
            <>
                <p>
                    A <strong>report</strong> is the investigation: what was noticed, what the agent checked in your
                    data and your code, and what it concluded. It names the file and the line it blames, and it carries
                    the evidence it reasoned from. Reports are free, and most of the value is here. A report you read
                    and fix yourself has already done its job.
                </p>
                <p className="mt-2">
                    A <strong>pull request</strong> is the optional next step: the agent writing the fix it described.
                    Not every report becomes one. Some are waiting on a decision only you can make, and some are a
                    documentation problem or a better answer instead of code. On the page above, the rows badged with a
                    number produced a PR. The rest haven't.
                </p>
            </>
        ),
    },
    {
        trigger: 'What does it cost?',
        content: (
            <>
                <p>
                    Reports are free. You pay a flat <strong>$15 per pull request</strong>, and your first three PRs
                    each month are free.
                </p>
                <p className="mt-2">
                    Every dollar has a ceiling: a default <strong>$150 billing limit</strong> is set for you and you can
                    lower it, and PR generation pauses when you hit it until the next billing period. If a PR
                    misdiagnoses the problem or doesn't fix what it claims to,{' '}
                    <Link to="/docs/self-driving/pricing#refunds" state={{ newWindow: true }} className={LINK_CLASS}>
                        it's refunded
                    </Link>
                    , which is why the detail view has a Refund button on it.
                </p>
            </>
        ),
    },
    {
        trigger: "Won't this fill my repo with AI slop?",
        content: (
            <>
                <p>That's the failure mode, and three things stand between a signal and your main branch:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>
                        Reports are investigated before anything is written. An agent has to confirm the problem is real
                        in your data and your code before a PR exists at all.
                    </li>
                    <li>
                        Every change is a pull request you review, with your CI and review rules attached. Nothing
                        merges itself.
                    </li>
                    <li>You pay per PR and get refunded for the ones that miss, so volume isn't the incentive.</li>
                </ul>
            </>
        ),
    },
    {
        trigger: 'What can the agents actually touch?',
        content: (
            <>
                <p>
                    Less than a contractor with repo access. Work happens in an isolated sandbox in the cloud, on a
                    clone of your repo, never on your machines or your infrastructure. Agents work on a branch, follow
                    your branch protections, and <strong>cannot merge</strong>.
                </p>
                <p className="mt-2">
                    Every action is logged: open the agent log on any report to see which files it read, which queries
                    it ran, and how it reached its conclusion. Your private repos stay private, and your code isn't used
                    to train models.
                </p>
            </>
        ),
    },
    {
        trigger: 'What happens when it gets something wrong?',
        content: (
            <>
                <p>
                    It will sometimes. It's in open beta, and the system is built so that being wrong is cheap. A wrong
                    report costs you nothing and can be dismissed. A wrong PR costs you a review and is then refunded.
                </p>
                <p className="mt-2">
                    A wrong merged change gets caught by the loop itself. PostHog measures whether the metric the change
                    targeted actually moved, and dismissing a report with a reason reaches the scout that filed it, so
                    the next one is better aimed.
                </p>
            </>
        ),
    },
]

export default function ShipWithPostHog({ data }: ShipWithPostHogProps): JSX.Element {
    return (
        <>
            <SEO
                title="Ship with PostHog: self-driving pull requests, already merged"
                description="Self-driving PostHog watches your product, investigates what it catches, and opens the pull request. These are real reports from our own inbox. Open one to read the evidence behind it and the diff that shipped."
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
                                    These are real reports from our own inbox. Some became merged pull requests on{' '}
                                    <Link to="https://github.com/PostHog/posthog" external>
                                        PostHog/posthog
                                    </Link>
                                    . The rest are still waiting on a decision. Open one to read the evidence behind it.
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

                        {/* The long-form write-ups of those PRs, pulled from the blog by tag */}
                        <div className="mt-14 @md:mt-20">
                            <SelfDrivingStories posts={data.selfDrivingPosts.nodes} />
                        </div>

                        {/* CTA */}
                        <div className="mx-auto mt-12 max-w-2xl rounded-lg border border-primary bg-accent p-6 @md:mt-16 @md:p-8">
                            <h2 className="mt-0 text-2xl font-bold">Set up your Inbox</h2>
                            <p className="mt-2 text-secondary">
                                Install PostHog, then run the wizard. It turns on your signal sources, connects GitHub,
                                and sets up your scouts. Your first reports start landing in about 20 to 30 minutes.
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

                        {/* FAQ, matching the slice on /slack */}
                        <div className="mx-auto mt-10 max-w-2xl @md:mt-12">
                            <h2 className="mt-0 text-2xl font-bold">FAQ</h2>
                            <div className="mt-4">
                                <Accordion
                                    type="multiple"
                                    triggerClassName="!px-3 !py-2"
                                    contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                                    items={faqItems}
                                />
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </>
    )
}

/*
 * The blog posts for the section above. Filtered by the `Self-driving` frontmatter tag,
 * so a new write-up joins the page by being tagged – see `SelfDrivingStories`.
 *
 * `limit` caps the visible rows; the section's footer button routes to the full tag page,
 * so anything past the cap is still reachable. `isFuture` keeps scheduled posts out.
 */
export const query = graphql`
    {
        selfDrivingPosts: allMdx(
            limit: 5
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { isFuture: { eq: false }, frontmatter: { tags: { in: ["Self-driving"] }, date: { ne: null } } }
        ) {
            nodes {
                ...BlogFragment
            }
        }
    }
`
