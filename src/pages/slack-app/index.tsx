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
import OSTable from 'components/OSTable'
import Link from 'components/Link'
import {
    IconCode,
    IconTarget,
    IconThoughtBubble,
    IconCursorClick,
    IconSupport,
    IconBolt,
    IconFlag,
    IconWrench,
    IconGitBranch,
    IconSparkles,
    IconCoffee,
    IconCalendar,
    IconExternal,
    IconBell,
    IconFilter,
    IconTrash,
    IconRefresh,
    IconWarning,
    IconChat,
} from '@posthog/icons'

const CONNECT_SLACK_URL = 'https://app.posthog.com/settings/project#integration-slack'

type IconComponent = React.ComponentType<{ className?: string }>

type IconItem = {
    Icon: IconComponent
    color: string
    name: string
}

type IconGroup = {
    title: string
    items: IconItem[]
}

const LeftSidebarContent = () => <TreeMenu items={productOSNav.children} />

const IconChipRow = ({ items }: { items: IconItem[] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @2xl:grid-cols-4 gap-x-1">
        {items.map(({ Icon, color, name }) => (
            <span
                key={name}
                className="inline-flex items-center gap-1.5 text-primary text-sm whitespace-nowrap font-semibold p-2"
            >
                <Icon className={`size-4 ${color}`} />
                {name}
            </span>
        ))}
    </div>
)

const IconGroupColumns = ({ groups }: { groups: IconGroup[] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 gap-6 clear-both pt-4">
        {groups.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
                <div className="text-secondary text-sm border-b border-secondary pb-1">{group.title}</div>
                <div className="flex flex-col gap-1.5">
                    {group.items.map(({ Icon, color, name }) => (
                        <span key={name} className="inline-flex items-center gap-1.5 text-primary text-sm">
                            <Icon className={`size-4 shrink-0 ${color}`} />
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        ))}
    </div>
)

const DottedList = ({ items, bulletClass }: { items: React.ReactNode[]; bulletClass: string }) => (
    <ul className="mt-3 mb-0 space-y-1 text-sm text-secondary list-none pl-0">
        {items.map((item, index) => (
            <li key={index} className="relative pl-5">
                <span className={`absolute left-1 top-2 size-1.5 rounded-full ${bulletClass}`} />
                {item}
            </li>
        ))}
    </ul>
)

const shipFixCards: IconItem[] = [
    { Icon: IconCoffee, color: 'text-brown', name: 'Spec to draft PR' },
    { Icon: IconRefresh, color: 'text-blue', name: 'In-thread iteration' },
    { Icon: IconBolt, color: 'text-yellow', name: 'Multi-step changes' },
    { Icon: IconGitBranch, color: 'text-purple', name: 'Cross-repo work' },
]

const choreGroups: IconGroup[] = [
    {
        title: 'Codebase cleanup',
        items: [
            { Icon: IconFlag, color: 'text-blue', name: 'Feature flag removal' },
            { Icon: IconTrash, color: 'text-red', name: 'Dead code & unused imports' },
            { Icon: IconRefresh, color: 'text-purple', name: 'Stale branches' },
        ],
    },
    {
        title: 'Routine maintenance',
        items: [
            { Icon: IconBolt, color: 'text-yellow', name: 'Dependency bumps' },
            { Icon: IconWarning, color: 'text-salmon', name: 'Type & lint errors' },
            { Icon: IconWrench, color: 'text-yellow', name: 'Flaky CI jobs' },
        ],
    },
    {
        title: 'The annoying final mile',
        items: [
            { Icon: IconGitBranch, color: 'text-purple', name: 'Merge conflicts' },
            { Icon: IconCoffee, color: 'text-brown', name: 'PR descriptions' },
            { Icon: IconBell, color: 'text-blue', name: 'Review-comment triage' },
        ],
    },
]

const contentGroups: IconGroup[] = [
    {
        title: 'Marketing site',
        items: [
            { Icon: IconCursorClick, color: 'text-salmon', name: 'Landing page copy' },
            { Icon: IconBolt, color: 'text-yellow', name: 'Pricing & tile edits' },
            { Icon: IconThoughtBubble, color: 'text-purple', name: 'Customer story metrics' },
        ],
    },
    {
        title: 'Docs',
        items: [
            { Icon: IconCoffee, color: 'text-brown', name: 'SDK snippet updates' },
            { Icon: IconExternal, color: 'text-blue', name: 'Cross-doc link inserts' },
            { Icon: IconSparkles, color: 'text-green', name: 'Style guide enforcement' },
        ],
    },
    {
        title: 'Blog & editorial',
        items: [
            { Icon: IconCalendar, color: 'text-blue', name: 'Changelog drafts from PRs' },
            { Icon: IconRefresh, color: 'text-yellow', name: 'Frontmatter normalization' },
            { Icon: IconWrench, color: 'text-salmon', name: 'Broken link fixes' },
        ],
    },
]

const pipeDataCards: IconItem[] = [
    { Icon: IconCalendar, color: 'text-blue', name: 'Daily digests' },
    { Icon: IconExternal, color: 'text-purple', name: 'Link unfurls' },
    { Icon: IconBell, color: 'text-yellow', name: 'Event triggers' },
    { Icon: IconFilter, color: 'text-green', name: 'Usage trends' },
]

const featureTabs: TabbedCarouselTab[] = [
    {
        value: 'ship-a-fix',
        label: 'Code in the cloud',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <div className="rounded pt-4 px-4 bg-primary">
                <h2 className="mt-0 mb-2 text-2xl font-bold">Ship new features without opening your editor</h2>
                <p className="text-secondary text-sm">
                    Tag <code>@PostHog</code> with a feature idea, a half-formed spec, or a paragraph from a Linear
                    ticket. The bot plans the work, edits files across the repo, and opens a draft PR – then iterates
                    message-by-message until it actually lands.
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
                <IconChipRow items={shipFixCards} />
                <div className="-mx-4 mt-4 leading-[0]">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/slack_app_ship_a_fix_82a4003b3a.png"
                        alt="@PostHog shipping a fix from a Slack thread"
                        imgClassName="w-full"
                    />
                </div>
            </div>
        ),
    },
    {
        value: 'clear-the-backlog',
        label: 'Ship a fix',
        color: 'bg-red',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <div className="rounded p-4 pb-6 bg-primary">
                <h2 className="mt-0 mb-2 text-2xl font-bold">Make the robot do your chores</h2>
                <p className="text-secondary text-sm">
                    The engineering grunt work you keep punting on – plus the test failures, CI babysitting, and
                    review-comment triage that comes after. Fire it all at the bot in parallel threads, and only get
                    pulled in when something actually needs a human.
                </p>
                <p className="text-secondary text-sm">
                    You know the stuff in your codebase that everyone complains about but nobody fixes? Make a{' '}
                    <code>#papercuts</code> channel and tag <code>@PostHog</code>.
                </p>
                <IconGroupColumns groups={choreGroups} />
            </div>
        ),
    },
    {
        value: 'pipe-data-into-slack',
        label: 'Pipe data into Slack',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        content: (
            <div className="rounded pt-4 px-4 bg-primary">
                <h2 className="mt-0 mb-2 text-2xl font-bold">Push product data into the channels that care</h2>
                <p className="text-secondary text-sm">
                    Pipe dashboards into channels on a schedule, or fire a custom Slack message every time a PostHog
                    event matches your filter. Paste a PostHog link in any thread and it unfurls into a rich preview
                    that respects your project's access permissions.
                </p>
                <div className="bg-yellow/10 rounded px-3 border border-yellow mb-4">
                    <p className="text-secondary text-sm my-3">
                        <strong>Need an answer right now?</strong> Tag <code>@PostHog</code> with a question in any
                        thread.
                    </p>
                </div>
                <IconChipRow items={pipeDataCards} />
                <div className="-mx-4 mt-4 leading-[0]">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/subscription_insights_50ce62125e.png"
                        alt="Configuring a PostHog insight subscription to a Slack channel"
                        imgClassName="w-full"
                    />
                </div>
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
            <div className="rounded p-4 pb-6 bg-primary">
                <h2 className="mt-0 mb-2 text-2xl font-bold">Sweep the site for em dashes (ew)</h2>
                <p className="text-secondary text-sm">
                    Tag <code>@PostHog</code> with what you want changed and where. The bot finds the file, drafts the
                    edit in the repo's existing style, and opens a PR with a deploy preview attached. Skim the preview,
                    request a tweak in-thread, and merge when it reads right.
                </p>
                <p className="text-secondary text-sm">
                    Works across everything that lives in the same repo your engineers ship from – marketing site, docs,
                    blog, customer stories, changelog, handbook.
                </p>
                <IconGroupColumns groups={contentGroups} />
            </div>
        ),
    },
]

type IntroCardProps = {
    icon: IconComponent
    iconColor: string
    bulletClass: string
    href: string
    title: string
    badge: string
    description: React.ReactNode
    examples: string[]
}

const introCards: IntroCardProps[] = [
    {
        icon: IconCoffee,
        iconColor: 'text-brown',
        bulletClass: 'bg-brown',
        href: '/code',
        title: 'PostHog Code',
        badge: 'Sandboxed',
        description: (
            <>
                Tag <code>@PostHog</code> with a bug, edit, or a feature idea. It spins up a sandboxed environment,
                plans, edits files, runs the tests, and opens a draft PR.
            </>
        ),
        examples: [
            '"Fix the flaky billing CI job"',
            '"Add a retry policy to the webhook worker"',
            '"Resolve the merge conflicts on PR #1234"',
        ],
    },
    {
        icon: IconSparkles,
        iconColor: 'text-blue',
        bulletClass: 'bg-blue',
        href: '/ai',
        title: 'PostHog AI',
        badge: 'Via MCP',
        description: (
            <>
                Tag <code>@PostHog</code> with any data question. It's the same SQL-writing, statistically-minded
                assistant as PostHog AI, but it pulls the data into where you're already working.
            </>
        ),
        examples: [
            '"Why did EU signups drop last week?"',
            '"Brief me on this customer before my call"',
            '"Roll out the new dashboard flag to 25%"',
        ],
    },
]

const IntroCard = ({
    icon: Icon,
    iconColor,
    bulletClass,
    href,
    title,
    badge,
    description,
    examples,
}: IntroCardProps) => (
    <div className="border border-primary rounded-md p-4 bg-primary">
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
            <Link to={href} className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary">
                <Icon className={`size-5 shrink-0 ${iconColor}`} />
                {title} <span className="text-secondary font-normal">in Slack</span>
            </Link>
            <span className="rounded-sm bg-highlight py-0.5 px-1 text-xs font-bold text-red dark:text-yellow">
                {badge}
            </span>
        </div>
        <p className="mt-0 mb-5 text-base leading-snug">{description}</p>
        <DottedList items={examples} bulletClass={bulletClass} />
    </div>
)

type RoleCard = {
    icon: IconComponent
    color: string
    title: string
    copy: string
    examples: string[]
}

const roleCards: RoleCard[] = [
    {
        icon: IconCode,
        color: 'text-brown',
        title: 'Engineers',
        copy: "The fun part is building. The boring parts are now the bot's problem.",
        examples: [
            '"Prototype the new onboarding flow as a feature-flagged variant"',
            '"Instrument the checkout funnel with the events product needs"',
            '"Wire up a kill-switch flag around the billing webhook"',
        ],
    },
    {
        icon: IconTarget,
        color: 'text-purple',
        title: 'Product managers',
        copy: 'Generate PRs instead of PRDs. Run ad-hoc analysis without pinging an engineer.',
        examples: [
            '"Compare activation across the last three signup variants"',
            '"Spin up a 25/25/50 flag for the onboarding rewrite"',
            '"Synthesize themes from this week\'s user interviews"',
        ],
    },
    {
        icon: IconCursorClick,
        color: 'text-salmon',
        title: 'Product marketers',
        copy: 'Draft launches faster than you can make a meme. The bot actually reads your positioning doc.',
        examples: [
            '"Draft the launch blog from the spec doc"',
            '"Update positioning across the site for the new release"',
            '"Refresh the competitor comparison page with current data"',
        ],
    },
    {
        icon: IconSupport,
        color: 'text-blue',
        title: 'Support & Sales',
        copy: 'Pull customer activity before the renewal call starts. Ship "Acme needs export" before the deal closes.',
        examples: [
            '"Brief me on Acme before tomorrow\'s call"',
            '"Find every ticket from this week mentioning rate limits"',
            '"Draft a PR for the export option three customers have asked for"',
        ],
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
        ai: (
            <>
                Right sidebar in <Link to="https://app.posthog.com">app.posthog.com</Link>
            </>
        ),
        slack: 'Any Slack channel or thread',
        code: 'Desktop app',
    },
    {
        label: 'How to summon',
        ai: 'Click the sparkle or AI chat window',
        slack: (
            <>
                Tag <code>@PostHog</code>
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
        label: 'Permissions',
        ai: 'Reads and writes inside your PostHog project – insights, dashboards, flags, experiments, surveys, HogQL. Never touches your source code or the open web.',
        slack: 'Everything PostHog AI can do, plus drafts code changes as PRs on the repos you connect.',
        code: 'Everything the Slack app can do, plus reads your local repos and pulls in context from Linear, GitHub Issues, and Zendesk.',
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

const compareLinks: { label: string; url: string }[] = [
    { label: 'PostHog AI', url: '/ai' },
    { label: 'PostHog Slack app', url: '#try' },
    { label: 'PostHog Code', url: '/code' },
]

const faqItems = [
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

const fighterOptions: { icon: IconComponent; iconColor: string; label: React.ReactNode; copy: React.ReactNode }[] = [
    {
        icon: IconSparkles,
        iconColor: 'text-blue',
        label: (
            <Link to="/ai" className="font-bold text-primary">
                PostHog AI
            </Link>
        ),
        copy: "When you're already in the app looking at data – ask it to write the SQL, build the dashboard, or make sense of what you're seeing.",
    },
    {
        icon: IconChat,
        iconColor: 'text-sky-blue',
        label: 'PostHog Slack app',
        copy: (
            <>
                For the drive-by stuff – typos, cross-repo checks, whatever lands in <code>#papercuts</code>.
            </>
        ),
    },
    {
        icon: IconCoffee,
        iconColor: 'text-brown',
        label: (
            <Link to="/code" className="font-bold text-primary">
                PostHog Code
            </Link>
        ),
        copy: 'For real engineering work – signals from the inbox, parallel agents, anything where you care about the diff before it ships.',
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
            <ReaderView leftSidebar={<LeftSidebarContent />} title="posthog-slack-app.md" hideTitle={true}>
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-4">
                        <h1 className="text-3xl @md/reader-content-container:text-4xl font-bold m-0 mb-2">
                            Don't @me,{' '}
                            <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">@PostHog</span>
                        </h1>
                        <p className="text-secondary text-base @md/reader-content-container:text-lg max-w-lg mx-auto m-0">
                            PostHog now lives in Slack. Ask about your product data, debug issues, and generate PRs
                            without leaving the thread.
                        </p>
                    </div>

                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/slack_app_update_docs_f0c917f70a.png"
                        alt="@PostHog updating docs from a Slack thread"
                        className="w-full !block m-0"
                        imgClassName="w-full !block"
                    />
                    <hr className="border-t border-primary m-0 mb-6" />

                    <h3>
                        One hog,{' '}
                        <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">two jobs</span>
                    </h3>
                    <p>
                        <code>@PostHog</code> wraps two competencies – analytics and coding – into a single agent.
                        Explore "why did EU signups drop?", then prompt a PR to do something about it.
                    </p>
                    <CallToAction to={CONNECT_SLACK_URL} size="sm" externalNoIcon className="mb-6">
                        Connect Slack
                    </CallToAction>
                    <div className="not-prose grid @md/reader-content:grid-cols-2 gap-4 mb-6">
                        {introCards.map((card) => (
                            <IntroCard key={card.title} {...card} />
                        ))}
                    </div>

                    <h3>
                        A typical run, from{' '}
                        <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">
                            @mention to merge
                        </span>
                    </h3>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/slack_app_chat_1_c6573ce6da.png"
                        alt="@PostHog rolling out a feature flag from a Slack thread via the PostHog MCP"
                        className="@lg/reader-content:float-right @lg/reader-content:max-w-xs ml-4 mb-2 mt-2"
                        imgClassName="w-full rounded-md shadow-lg border border-primary"
                    />
                    <p>You don't need to know any of this to use it. But here's what happens after you hit send:</p>
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

                    <div className="not-prose my-6">
                        <TabbedCarousel tabs={featureTabs} />
                    </div>

                    <h3>
                        <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">Everyone</span> can
                        code now
                    </h3>
                    <p>
                        It's not just engineers offloading chores. Non-technical team members can describe a problem or
                        an idea, and the agent takes it from there.
                    </p>
                    <div className="not-prose grid @md/reader-content:grid-cols-2 gap-4 my-6">
                        {roleCards.map(({ icon: Icon, color, title, copy, examples }) => (
                            <div key={title} className="border border-primary rounded-md p-4 bg-primary">
                                <div className="flex gap-3 mb-2">
                                    <Icon className={`size-6 shrink-0 mt-1 ${color}`} />
                                    <h4 className="m-0 text-lg font-bold">{title}</h4>
                                </div>
                                <p className="m-0 text-base">{copy}</p>
                                <DottedList items={examples} bulletClass="bg-sky-blue" />
                            </div>
                        ))}
                    </div>

                    <h3>
                        Choose your{' '}
                        <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">fighter</span>
                    </h3>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/magnifying_glass_hog_c994f17b25.png"
                        alt="A hedgehog inspecting things with a magnifying glass"
                        className="@lg/reader-content:float-right @lg/reader-content:max-w-[200px] ml-4 mb-2 mt-2"
                        imgClassName="w-full"
                    />
                    <div className="not-prose space-y-3 my-4">
                        {fighterOptions.map(({ icon: Icon, iconColor, label, copy }, index) => (
                            <div key={index}>
                                <p className="m-0 inline-flex items-center gap-2 font-bold">
                                    <Icon className={`size-4 shrink-0 ${iconColor}`} />
                                    {label}
                                </p>
                                <p className="m-0 mt-1 text-base leading-snug">{copy}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-secondary">
                        Building your own? <Link to="/docs/model-context-protocol">PostHog MCP</Link> wires the same
                        product context into the editor or agent of your choice.
                    </p>
                    <div className="clear-both" />
                    <div className="not-prose my-6">
                        <OSTable
                            size="sm"
                            rowAlignment="top"
                            className="text-sm"
                            columns={[
                                { name: '', align: 'left', width: 'minmax(80px,110px)' },
                                ...compareLinks.map(({ label, url }) => ({
                                    name: (
                                        <Link to={url} className="font-bold text-primary">
                                            {label}
                                        </Link>
                                    ),
                                    align: 'left' as const,
                                    width: 'minmax(160px,1fr)',
                                })),
                            ]}
                            rows={compareRows.map((row) => ({
                                key: row.label,
                                cells: [
                                    { content: <span className="font-bold text-secondary">{row.label}</span> },
                                    { content: row.ai },
                                    { content: row.slack },
                                    { content: row.code },
                                ],
                            }))}
                        />
                    </div>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/slack_app_chat_2_e5993b2331.png"
                        alt="@PostHog working through CI checks on a draft PR in a Slack thread"
                        className="@lg/reader-content:float-right @lg/reader-content:max-w-xs ml-4 mb-2 mt-2"
                        imgClassName="w-full"
                    />
                    <div
                        id="try"
                        className="not-prose bg-accent border border-primary rounded-md p-4 @md/reader-content:p-6 my-6"
                    >
                        <h3 className="mt-0 mb-2 text-2xl font-bold inline-flex items-center gap-2 flex-wrap">
                            Try it
                            <span className="rounded-sm bg-highlight py-0.5 px-1 text-xs font-bold text-red dark:text-yellow">
                                Beta
                            </span>
                        </h3>
                        <p className="mt-0 mb-4">
                            The PostHog Slack app is free to install, and free to uninstall when you realize this means
                            you can ship production code from your phone (which, frankly, might be too much power for
                            anyone).
                        </p>
                        <CallToAction to={CONNECT_SLACK_URL} size="sm" externalNoIcon>
                            Connect Slack
                        </CallToAction>
                    </div>
                    <div className="clear-both" />

                    <h3>FAQ</h3>
                    <div className="not-prose mt-4">
                        <Accordion
                            type="multiple"
                            triggerClassName="!px-3 !py-2"
                            contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                            items={faqItems}
                        />
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
