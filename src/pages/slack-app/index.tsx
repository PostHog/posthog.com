import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import CloudinaryImage from 'components/CloudinaryImage'
import { CallToAction } from 'components/CallToAction'
import { TreeMenu } from 'components/TreeMenu'
import { productOSNav } from 'hooks/useProductOSNavigation'
import { Accordion } from 'components/RadixUI/Accordion'
import TabbedCarousel from 'components/TabbedCarousel'
import type { TabbedCarouselTab } from 'components/TabbedCarousel'
import { ProductScreenshot } from 'components/ProductScreenshot'
import Link from 'components/Link'
import {
    IconBook,
    IconThoughtBubble,
    IconCursorClick,
    IconSupport,
    IconCheck,
    IconBolt,
    IconBug,
    IconFlag,
    IconWrench,
    IconGitBranch,
} from '@posthog/icons'

const LeftSidebarContent = () => {
    return <TreeMenu items={productOSNav.children} />
}

const CONNECT_SLACK_URL = 'https://app.posthog.com/settings/project#integration-slack'

// Highlight phrase used in data-stack-style headings.
const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">{children}</span>
)

const shipFixCards = [
    { Icon: IconBug, color: 'text-red', name: 'Bug reports' },
    { Icon: IconFlag, color: 'text-blue', name: 'Flag cleanup' },
    { Icon: IconWrench, color: 'text-yellow', name: 'Flaky CI' },
    { Icon: IconGitBranch, color: 'text-purple', name: 'Merge conflicts' },
]

const featureTabs: TabbedCarouselTab[] = [
    {
        value: 'ship-a-fix',
        label: 'Ship a fix',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <div className="rounded pt-4 px-4 bg-primary">
                <h2 className="mt-0 mb-2 text-2xl font-bold">Drop a bug report. Get a draft PR.</h2>
                <p className="text-secondary text-sm">
                    Tag <code>@PostHog</code> with a bug report, a UX issue, or a flaky CI test. The bot explores
                    context in the thread, pulls from your product data to find the most likely cause, and opens a draft
                    PR.
                </p>
                <div className="bg-yellow/10 rounded px-3 border border-yellow mb-4">
                    <p className="text-secondary text-sm my-3">
                        <strong>Bigger task?</strong>{' '}
                        <Link to="/code" state={{ newWindow: true }} className="font-semibold">
                            PostHog Code
                        </Link>{' '}
                        runs deeper refactors, parallel agents across repos, and longer-running tasks from a desktop app
                        – the same agent, more room to work.
                    </p>
                </div>
                <div className="grid grid-cols-1 @sm:grid-cols-2 @2xl:grid-cols-4 gap-x-1">
                    {shipFixCards.map(({ Icon, color, name }) => (
                        <div key={name} className="rounded p-2">
                            <span className="inline-flex items-center gap-1.5 text-primary text-sm whitespace-nowrap relative top-0">
                                <Icon className={`size-4 ${color}`} />
                                <span className="font-semibold">{name}</span>
                            </span>
                        </div>
                    ))}
                </div>
                <div className="-mx-4 mt-4 leading-[0]">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/slack_app_P_Rs_a839df3615.png"
                        alt="Three draft PRs opened by @PostHog from Slack threads"
                        imgClassName="w-full"
                    />
                </div>
            </div>
        ),
    },
    {
        value: 'answer-a-data-question',
        label: 'Answer a data question',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        content: (
            <div className="p-4 @xl:p-8">
                <h2 className="mt-0 mb-2 text-2xl font-bold">Same agent loop as PostHog AI – in your Slack thread.</h2>
                <p>
                    Ask about a customer, a funnel, a feature, or a replay. The bot runs the same agent loop as PostHog
                    AI – the only difference is the answer turns up where you're already working, instead of in another
                    tab you'd forget to come back to.
                </p>
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/slackbot_cory_s_2_cde3716078.png"
                    alt="Slack thread where @PostHog briefs a PM before a user interview"
                    imgClassName="w-full rounded-md shadow border border-primary"
                />
            </div>
        ),
    },
    {
        value: 'edit-content',
        label: 'Edit content',
        color: 'bg-green',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <div className="p-4 @xl:p-8">
                <h2 className="mt-0 mb-2 text-2xl font-bold">Marketing ships copy. No GitHub round-trip.</h2>
                <p>
                    Copy fixes, blog typos, tile additions, image swaps – all from a Slack thread. The bot follows the
                    repo's existing conventions and politely offers to relabel things if it guessed wrong.
                </p>
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/slackbot_lizzie_1_a6f77f3495.png"
                    alt="Slack thread where @PostHog updates the company handbook"
                    imgClassName="w-full rounded-md shadow border border-primary"
                />
            </div>
        ),
    },
    {
        value: 'clear-the-backlog',
        label: 'Clear the chore backlog',
        color: 'bg-red',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <div className="p-4 @xl:p-8">
                <h2 className="mt-0 mb-2 text-2xl font-bold">
                    Boring work the bot is faster at (and never gets bored of).
                </h2>
                <p>
                    Rip out a feature flag after rollout. Fix the flaky CI job. Resolve a merge conflict and write the
                    PR description nobody else wanted to write. The toil chores that always slip to next sprint.
                </p>
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/slackbot_lucas_r_1_cda9922574.png"
                    alt="Slack thread where @PostHog digs through logs and finds a query bottleneck"
                    imgClassName="w-full rounded-md shadow border border-primary"
                />
            </div>
        ),
    },
]

const roleCards = [
    {
        icon: IconBook,
        color: 'text-brown',
        title: 'Engineers',
        copy: 'Offload the chores. CI fixes, feature flag cleanups, merge conflicts, dead click tracking. Triage product signals into PRs without ever leaving the thread you were already in.',
        examples: ['Resolve a merge conflict', 'Bump a dependency', 'Patch a failing CI job'],
    },
    {
        icon: IconThoughtBubble,
        color: 'text-purple',
        title: 'PMs & technical account managers',
        copy: 'Pull customer context before an interview. Build a small feature straight from a user request. The same conversation carries the rationale and the PR.',
        examples: ['Brief me on this customer', 'Add a small UX tweak', 'Ship the requested setting'],
    },
    {
        icon: IconCursorClick,
        color: 'text-salmon',
        title: 'Marketing',
        copy: 'Fix typos, swap tiles, update copy across the marketing site and handbook. Skip the "can someone please ship this" relay.',
        examples: ['Fix a typo in a blog post', 'Add a tile to the landing page', 'Update the handbook page'],
    },
    {
        icon: IconSupport,
        color: 'text-blue',
        title: 'Support & sales',
        copy: 'Turn a customer-reported bug into a draft PR in the same thread you flagged it in – before the ticket goes cold.',
        examples: ['Open a PR from a support ticket', 'Tag in the on-call channel', 'Patch a customer-blocking bug'],
    },
]

type CompareRow = {
    label: string
    ai: React.ReactNode
    slack: React.ReactNode
    code: React.ReactNode
}

const compareRows: CompareRow[] = [
    {
        label: 'Where it lives',
        ai: 'Right sidebar in app.posthog.com',
        slack: 'Any Slack thread',
        code: 'Desktop app on your machine',
    },
    {
        label: 'How to summon',
        ai: 'Click the sparkle',
        slack: (
            <>
                Tag <code>@PostHog</code> in a thread
            </>
        ),
        code: 'Open the app, start a task',
    },
    {
        label: 'Best for',
        ai: 'Exploring data, writing SQL with words instead of, you know, SQL. Building dashboards and configuring features without leaving the tab.',
        slack: 'Drop-and-go work from wherever you already are. Small fixes, content tweaks, and data questions in-thread.',
        code: 'Focused engineering work. Parallel agents, deep refactors, and signal-driven PRs from the inbox.',
    },
    {
        label: 'Reads',
        ai: 'PostHog events, persons, sessions, insights, dashboards, warehouse schema. Plus PostHog docs and the open web.',
        slack: 'Everything AI reads, plus the connected repo (thread text only – no screenshot input yet).',
        code: 'Your connected repos, plus everything AI reads, via the PostHog MCP.',
    },
    {
        label: 'Writes',
        ai: 'Insights, dashboards, feature flags, surveys, experiments, HogQL queries, Hog transformations.',
        slack: 'Draft PRs on connected repos, or just answers in-thread.',
        code: 'Local edits, commits, branches, PRs, and CI fixes.',
    },
    {
        label: 'Where it runs',
        ai: "None – it's a panel in PostHog Cloud.",
        slack: 'Ephemeral sandbox (~6 hours, then it disappears).',
        code: 'Local, an isolated worktree, or a PostHog-managed cloud sandbox.',
    },
    {
        label: 'Models',
        ai: "Auto-picked from OpenAI and Anthropic (we tune so you don't have to).",
        slack: 'Auto-picked. Every @mention runs through a Haiku-powered classifier first.',
        code: 'You pick: Claude Code or Codex, with reasoning effort dialed in per task.',
    },
]

const compareLinks: Array<{ label: string; url: string }> = [
    { label: 'PostHog AI', url: '/ai' },
    { label: 'PostHog Slack app', url: '#try' },
    { label: 'PostHog Code', url: '/code' },
]

const powerPatterns: Array<{ title: string; copy: React.ReactNode }> = [
    {
        title: 'Implement a spec by talking',
        copy: 'Slack becomes both the spec doc and the work tracker. The thread carries the rationale; the PR carries the diff.',
    },
    {
        title: 'The "yes-and" loop',
        copy: '"Swap the order so the full context is on top" → push. "Add a placeholder to preserve the original position" → push. Each round of feedback is a couple of lines from you and a complete PR update from the bot.',
    },
    {
        title: 'Multi-step refactoring (with pushback)',
        copy: '"Abstract these pieces into a shared module?" → ships the module. "Should the IAM roles go in too?" → answers no with three reasons. It will push back when something isn\'t a good idea.',
    },
    {
        title: 'Cross-repo work in one conversation',
        copy: 'A single thread can land coordinated PRs across multiple repos – app, charts, infra – keeping architecture consistent without you task-switching.',
    },
    {
        title: 'The soft work around code',
        copy: 'Merge conflicts, PR comments, motivational descriptions. "Solve the merge conflicts and write an entertaining description to encourage the team to merge it" → ships both in one turn.',
    },
]

const realPrompts = [
    {
        author: 'Will (technical account manager)',
        title: 'Built a new notebooks feature',
        body: (
            <>
                <p>
                    Asked @PostHog to add markdown copy-paste support to <Link to="/docs/notebooks">notebooks</Link>,
                    with proper rendering. The bot wrote the code, added 20 test cases, and auto-closed a stale GitHub
                    issue while it was at it. Merged in under 24 hours.
                </p>
                <p className="text-sm text-secondary mb-0">
                    PR{' '}
                    <Link to="https://github.com/PostHog/posthog/pull/59142" external>
                        #59142
                    </Link>
                </p>
            </>
        ),
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/slackbot_will_w_1_5398cb556b.png',
        alt: 'Slack thread where @PostHog ships a markdown paste feature for notebooks',
    },
    {
        author: 'Richard (product engineer)',
        title: 'Added an X-ray to the website',
        body: (
            <>
                <p>
                    Broke his foot at the offsite. Posted the X-rays. Asked @PostHog to add them to{' '}
                    <Link to="/feet-pics">posthog.com/feet-pics</Link>. The bot grabbed the image, labeled it{' '}
                    <code>broken bone (real).jpg</code>, and passed 19 CI checks. The PR merged a lot quicker than
                    Richard's anticipated 4–6 week recovery period.
                </p>
                <p className="text-sm text-secondary mb-0">
                    PR{' '}
                    <Link to="https://github.com/PostHog/posthog.com/pull/16876" external>
                        #16876
                    </Link>
                </p>
            </>
        ),
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/slackbot_Richard_s_1_0a043105c4.png',
        alt: "Slack thread where @PostHog adds Richard's broken-foot X-ray to /feet-pics",
    },
]

const FAQ_ITEMS = [
    {
        trigger: 'Is it a better coding model?',
        content: (
            <p>
                No. It runs the same frontier models everyone else does. The difference is context – an agent that can
                read your funnels, replays, and errors is working from evidence, not guessing at what matters.
            </p>
        ),
    },
    {
        trigger: 'Is it an analytics agent or a coding agent?',
        content: (
            <p>
                Both, in one thread. A two-stage classifier looks at every @mention and decides whether it needs repo
                access (code task) or not (data question). Explore data and build in the same conversation.
            </p>
        ),
    },
    {
        trigger: 'Does it just open a PR and walk away?',
        content: (
            <p>
                No. It sticks with the PR through failing checks and reruns until it's mergeable – we call that
                babysitting. On a big repo, getting through CI is often more work than the code.
            </p>
        ),
    },
    {
        trigger: 'Will it touch our whole codebase?',
        content: (
            <p>
                It only touches repos you connect, and every change goes through a PR you review. Nothing merges without
                a human saying yes.
            </p>
        ),
    },
    {
        trigger: 'Do I need to be an engineer to use it?',
        content: (
            <p>
                Not at all. It's a Slack message. People in sales and marketing have already merged PRs to our main
                repo. Describe the problem or the idea, and the agent takes it from there.
            </p>
        ),
    },
    {
        trigger: "Won't it try to code every message?",
        content: (
            <p>
                Every @PostHog mention runs through a task classifier and a repo router first. Data questions get
                answered, not turned into PRs – and a prompt like "make a team photo of us as the Spice Girls" gets
                correctly classified as non-actionable. (Sorry, Paul.)
            </p>
        ),
    },
    {
        trigger: 'Do I need PostHog Code to use it?',
        content: (
            <p>
                No. The Slack app has its own feature flag and isn't gated on a <Link to="/code">PostHog Code</Link>{' '}
                subscription. They share the same coding agent under the hood – the Slack app is just the front door if
                you'd rather work from a thread than a desktop app.
            </p>
        ),
    },
    {
        trigger: 'How does billing work?',
        content: (
            <p>
                Usage-based, billed through <Link to="/ai">PostHog AI</Link>. The RFC for pricing is still open, so this
                is the current direction rather than the final word – we'll update this answer once it settles.
            </p>
        ),
    },
    {
        trigger: 'What are the current limitations?',
        content: (
            <ul>
                <li>The sandbox is ephemeral (~6 hours). Long iterations need re-prompting.</li>
                <li>GitHub auth requires a per-user personal integration – there's a known gap in onboarding.</li>
                <li>Only the user who started the task can follow up in the thread.</li>
                <li>The bot reads thread text only – no screenshot input yet.</li>
            </ul>
        ),
    },
]

export default function SlackAppPage(): JSX.Element {
    return (
        <>
            <SEO
                title="PostHog Slack app"
                description="Tag @PostHog in any Slack thread to ship a fix, answer a data question, or edit content – without leaving the conversation."
                image="/images/og/default.png"
            />
            <ReaderView
                leftSidebar={<LeftSidebarContent />}
                title="posthog-slack-app.md"
                hideTitle={true}
                // `header` is a valid prop on ReaderView but missing from its public type. Same
                // workaround used on /data-stack.
                {...({
                    header: (
                        <>
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/lazy_a2afd552f7.png"
                                alt="A hedgehog leaning back at a laptop while @PostHog opens the PR"
                                className="mt-4 px-4"
                                imgClassName="max-w-[280px] w-full mx-auto -scale-x-100"
                            />
                            <h2 className="text-xl @md/reader-content-container:text-2xl font-bold m-4 text-center pb-4">
                                Tag <Highlight>@PostHog</Highlight> in Slack.
                                <br />
                                Get a draft PR.
                            </h2>
                        </>
                    ),
                } as { header?: React.ReactNode })}
            >
                <div className="max-w-2xl mx-auto">
                    <h3>
                        The Slack app is <Highlight>PostHog AI in the thread</Highlight> you were already in – no GitHub
                        tab required
                    </h3>

                    <p>
                        Tag <strong>@PostHog</strong> with a bug, a screenshot, a feature idea, or a data question. It
                        spins up a sandboxed environment, plans, edits files, runs the tests, and opens a draft PR – or
                        just answers from your product data, no PR needed.
                    </p>
                    <p>
                        It launched to beta after enough internal dogfooding that we skipped alpha. Anyone in your
                        workspace can use it –{' '}
                        <span className="font-bold">sales, marketing, support, PMs, engineers</span>. The most magical
                        part is watching someone in a non-engineering role ship something to production from the same
                        Slack thread they would have filed a ticket in.
                    </p>

                    <ul className="list-none pl-0 not-prose space-y-1 text-[15px] my-4">
                        <li className="relative pl-6">
                            <IconCheck className="size-4 text-green absolute left-0 top-1.5" />
                            Drafts PRs from a Slack message (no IDE round-trip)
                        </li>
                        <li className="relative pl-6">
                            <IconCheck className="size-4 text-green absolute left-0 top-1.5" />
                            Wired into your product data by default – funnels, replays, errors
                        </li>
                        <li className="relative pl-6">
                            <IconCheck className="size-4 text-green absolute left-0 top-1.5" />
                            Works for everyone, not just engineers
                        </li>
                    </ul>

                    <CallToAction to={CONNECT_SLACK_URL} size="sm" externalNoIcon>
                        Connect Slack
                    </CallToAction>

                    <ProductScreenshot
                        imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/slackbot_papercuts_1_877de83ae8.png"
                        alt="The #papercuts Slack channel, where anyone can tag @PostHog and the bot opens a draft PR"
                        classes="rounded"
                        zoom={true}
                    />

                    <h3>
                        A typical run, from <Highlight>@mention to merge</Highlight>
                    </h3>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/slack_app_chat_2_e5993b2331.png"
                        alt="@PostHog working through CI checks on a draft PR in a Slack thread"
                        className="@lg/reader-content:float-right @lg/reader-content:max-w-xs ml-4 mb-2 mt-2"
                        imgClassName="w-full rounded-md shadow-lg border border-primary"
                    />
                    <p>
                        You don't need to know any of this to use it. But here's what actually happens after you hit
                        send:
                    </p>
                    <ol>
                        <li>Reads the thread (text only, for now).</li>
                        <li>Plans the work, edits files, and runs checks inside a sandboxed environment.</li>
                        <li>Opens a draft PR with a summary and links it back into the thread.</li>
                        <li>Iterates on follow-up messages from the original requester.</li>
                        <li>Watches CI. Reruns failed jobs that look environmental. Doesn't touch workflow files.</li>
                        <li>
                            Triages review comments by trust tier – acts on trusted code-review bots, and only addresses
                            the rest if there's a real underlying regression.
                        </li>
                    </ol>
                    <div className="clear-both" />

                    <h3>
                        What an <Highlight>@mention</Highlight> actually does
                    </h3>
                    <p>
                        One bot, one handle, two jobs. Code questions become draft PRs. Data questions get answered in
                        the thread. Here's what that looks like in the wild.
                    </p>
                    <div className="not-prose my-6">
                        <TabbedCarousel tabs={featureTabs} />
                    </div>

                    <h3>
                        Real prompts that became <Highlight>actual PRs</Highlight>
                    </h3>
                    <p>
                        None of these were engineers writing engineering tickets. They were Slack messages from
                        colleagues across the company. They all shipped to production.
                    </p>
                    <div className="not-prose space-y-8 my-6">
                        {realPrompts.map((p) => (
                            <article
                                key={p.author}
                                className="grid @lg/reader-content:grid-cols-[1fr_260px] gap-6 items-start"
                            >
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-secondary !m-0">
                                        {p.author}
                                    </p>
                                    <h4 className="font-bold !mt-1 !mb-2 text-lg">{p.title}</h4>
                                    {p.body}
                                </div>
                                <CloudinaryImage
                                    src={p.image}
                                    alt={p.alt}
                                    imgClassName="w-full rounded-md shadow border border-primary"
                                />
                            </article>
                        ))}
                    </div>

                    <h3>
                        A force multiplier for <Highlight>every role</Highlight>
                    </h3>
                    <p>
                        It's not just engineers offloading chores. Non-technical teams can describe a problem or an
                        idea, and the agent takes it from there.
                    </p>
                    <div className="not-prose grid @md/reader-content:grid-cols-2 gap-4 my-6">
                        {roleCards.map(({ icon: Icon, color, title, copy, examples }) => (
                            <div key={title} className="border border-primary rounded-md p-4 bg-primary">
                                <div className="flex gap-3 mb-2">
                                    <Icon className={`size-6 shrink-0 mt-1 ${color}`} />
                                    <h4 className="!mt-0 !mb-0 text-lg font-bold">{title}</h4>
                                </div>
                                <p className="!m-0 text-[15px]">{copy}</p>
                                <ul className="mt-3 mb-0 space-y-1 text-sm text-secondary list-none pl-0">
                                    {examples.map((ex) => (
                                        <li key={ex} className="relative pl-5">
                                            <span className="absolute left-1 top-2 size-1.5 rounded-full bg-sky-blue" />
                                            {ex}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <h3>
                        Where it <Highlight>really shines</Highlight>
                    </h3>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/slackbot_paul_2_e5c3312ba5.png"
                        alt="@PostHog politely refusing a Spice Girls team-photo prompt"
                        className="@lg/reader-content:float-right @lg/reader-content:max-w-xs ml-4 mb-2 rotate-1 shadow-2xl rounded border-4 border-white dark:border-primary"
                        imgClassName="w-full"
                    />
                    <p>
                        Beyond the obvious "fix this typo" or "patch this bug" prompts, the patterns where the Slack app
                        earns its keep are the ones built around <em>conversation</em>:
                    </p>
                    <ul className="list-none pl-0">
                        {powerPatterns.map(({ title, copy }) => (
                            <li key={title} className="relative pl-6 mb-4">
                                <IconBolt className="size-4 inline-block absolute top-1.5 left-0 text-yellow" />
                                <span className="font-bold">{title}</span>
                                <p className="text-sm text-secondary !my-0.5">{copy}</p>
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm text-secondary italic">
                        It also knows when to politely decline. The classifier catches non-coding asks before any
                        sandbox spins up – Paul learned this the hard way.
                    </p>
                    <div className="clear-both" />

                    <h3>
                        Pick the right tool: <Highlight>AI, Slack app, or Code</Highlight>
                    </h3>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/slack_app_chat_1_c6573ce6da.png"
                        alt="@PostHog rolling out a feature flag from a Slack thread via the PostHog MCP"
                        className="@lg/reader-content:float-right @lg/reader-content:max-w-xs ml-4 mb-2 mt-2"
                        imgClassName="w-full rounded-md shadow-lg border border-primary"
                    />
                    <p>
                        Three surfaces, one PostHog. They share context and complement each other – the question is
                        where you're working and how much heavy lifting you need. Everything PostHog AI can do – rolling
                        out flags, querying events, building dashboards – the Slack app can do too, via the same MCP.
                    </p>
                    <div className="clear-both" />
                    <div className="not-prose overflow-x-auto my-6">
                        <table className="min-w-full text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-primary">
                                    <th className="text-left py-3 pr-4 font-bold w-32" />
                                    {compareLinks.map(({ label, url }) => (
                                        <th
                                            key={label}
                                            className="text-left py-3 px-3 font-bold align-bottom whitespace-nowrap"
                                        >
                                            <Link to={url} className="font-bold text-primary">
                                                {label}
                                            </Link>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {compareRows.map((row) => (
                                    <tr key={row.label} className="border-b border-primary align-top">
                                        <td className="py-3 pr-4 font-bold text-secondary whitespace-nowrap">
                                            {row.label}
                                        </td>
                                        <td className="py-3 px-3 leading-snug">{row.ai}</td>
                                        <td className="py-3 px-3 leading-snug">{row.slack}</td>
                                        <td className="py-3 px-3 leading-snug">{row.code}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-secondary">
                        Bottom line: <strong>PostHog AI</strong> for understanding what's happening,{' '}
                        <strong>the Slack app</strong> for whenever you're already in Slack, and{' '}
                        <strong>PostHog Code</strong> when the work needs more than one round trip. They share product
                        context, so what you learn in one shows up in the next.
                    </p>

                    <h3>Try it</h3>
                    <p>
                        The PostHog Slack app is in beta. It's free to install, and free to uninstall when you realize
                        this means you can ship production code from your phone (which, frankly, might be too much power
                        for anyone).
                    </p>
                    <CallToAction to={CONNECT_SLACK_URL} size="sm" externalNoIcon>
                        Connect Slack
                    </CallToAction>

                    <h3>FAQ</h3>
                    <div className="not-prose mt-4">
                        <Accordion
                            type="multiple"
                            triggerClassName="!px-3 !py-2"
                            contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                            items={FAQ_ITEMS}
                        />
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
