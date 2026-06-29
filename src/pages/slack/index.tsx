import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO, { buildProductStructuredData } from 'components/seo'
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
    IconBell,
    IconBolt,
    IconCalendar,
    IconChat,
    IconCode,
    IconCoffee,
    IconCursorClick,
    IconExternal,
    IconFlag,
    IconGitBranch,
    IconRefresh,
    IconSparkles,
    IconSupport,
    IconTarget,
    IconTestTube,
    IconThoughtBubble,
    IconTrash,
    IconWarning,
    IconWrench,
} from '@posthog/icons'

const CONNECT_SLACK_URL = 'https://app.posthog.com/integrations/slack'

type IconComponent = React.ComponentType<{ className?: string }>

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">{children}</span>
)

const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="rounded-sm bg-highlight py-0.5 px-1 text-xs font-bold text-red dark:text-yellow">{children}</span>
)

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
                <Icon className={`size-4 shrink-0 ${color}`} />
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
    { Icon: IconSparkles, color: 'text-purple', name: 'Spec to draft PR' },
    { Icon: IconSparkles, color: 'text-purple', name: 'In-thread iteration' },
    { Icon: IconSparkles, color: 'text-purple', name: 'Multi-step changes' },
    { Icon: IconSparkles, color: 'text-purple', name: 'Cross-repo work' },
]

const choreGroups: IconGroup[] = [
    {
        title: 'Codebase cleanup',
        items: [
            { Icon: IconFlag, color: 'text-blue', name: 'Feature flag removal' },
            { Icon: IconTrash, color: 'text-red', name: 'Dead code' },
            { Icon: IconRefresh, color: 'text-purple', name: 'Stale branches' },
            { Icon: IconCalendar, color: 'text-green', name: "'TO DO from 2022'" },
        ],
    },
    {
        title: 'Routine maintenance',
        items: [
            { Icon: IconBolt, color: 'text-yellow', name: 'Dependency bumps' },
            { Icon: IconWarning, color: 'text-salmon', name: 'Type & lint errors' },
            { Icon: IconWrench, color: 'text-yellow', name: 'Flaky CI jobs' },
            { Icon: IconCode, color: 'text-blue', name: "'// fix this later'" },
        ],
    },
    {
        title: 'The annoying final mile',
        items: [
            { Icon: IconGitBranch, color: 'text-purple', name: 'Merge conflicts' },
            { Icon: IconCoffee, color: 'text-brown', name: 'PR descriptions' },
            { Icon: IconBell, color: 'text-blue', name: 'Review-comment triage' },
            { Icon: IconTestTube, color: 'text-green', name: 'Writing tests' },
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
    { Icon: IconSparkles, color: 'text-purple', name: 'Daily digests' },
    { Icon: IconSparkles, color: 'text-purple', name: 'Link unfurls' },
    { Icon: IconSparkles, color: 'text-purple', name: 'Event triggers' },
    { Icon: IconSparkles, color: 'text-purple', name: 'Usage trends' },
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
                    Tag <code>@PostHog</code> with a feature idea, half a spec, or meeting notes from standup. The bot
                    spins up cloud agents to tackle each task, which is a fancy way of saying "not on your laptop".
                </p>
                <div className="bg-yellow/10 rounded px-3 border border-yellow mb-4">
                    <p className="text-secondary text-sm my-3">
                        <strong>Bigger task?</strong>{' '}
                        <Link to="/code" state={{ newWindow: true }} className="font-semibold text-primary underline">
                            PostHog Code
                        </Link>{' '}
                        runs parallel agents across repos, and longer-running tasks from a desktop app – the same agent,
                        more room to work.
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
                <h2 className="mt-0 mb-2 text-2xl font-bold">Make a robot do your chores</h2>
                <p className="text-secondary text-sm">
                    The engineering grunt work you keep putting off – plus the test failures, CI, and review comments
                    that comes after. Hand it all to an agent in parallel threads, and only get pulled in when it needs
                    human approval.
                </p>
                <IconGroupColumns groups={choreGroups} />
                <p className="text-secondary text-sm mt-6">
                    You know the stuff in your product that everyone complains about but nobody fixes? Make a{' '}
                    <code>#papercuts</code> channel and tag <code>@PostHog</code>.
                </p>
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
                <h2 className="mt-0 mb-2 text-2xl font-bold">Push insights to where you already work</h2>
                <p className="text-secondary text-sm">
                    Pipe product insights into channels on a schedule, or fire a custom Slack message every time a
                    PostHog event matches your filter. Paste a PostHog link in any thread and it unfurls into a rich
                    preview that respects your project's access permissions.
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
                    The stuff you currently DM an engineer about, or just live with. Tag <code>@PostHog</code> with what
                    to change and where – "fix the typo on the pricing page," "swap this screenshot on /customers." The
                    bot finds the file, edits in the repo's existing style, and opens a PR. Usually in one shot.
                </p>
                <p className="text-secondary text-sm">
                    Copy fixes, blog edits, page tweaks, new tiles – it follows your naming conventions and flags
                    anything it had to guess at. Now you can ship a PR from the same place you send goose gifs.
                </p>
                <IconGroupColumns groups={contentGroups} />
                <div className="mt-6 leading-[0]">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/slackbot_lizzie_1_a6f77f3495.png"
                        alt="@PostHog editing content from a Slack thread with Lizzie"
                        imgClassName="w-full rounded-md shadow-lg border border-primary"
                    />
                </div>
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
        icon: IconCode,
        iconColor: 'text-brown dark:text-brown-dark',
        bulletClass: 'bg-brown dark:bg-brown-dark',
        href: '/code',
        title: 'Coding',
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
        title: 'Analytics',
        badge: 'Via MCP',
        description: (
            <>
                Tag <code>@PostHog</code> with any data question. It's the same SQL-writing, statistically-minded
                assistant as PostHog AI, but it responds where you send work memes.
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
            <Link
                to={href}
                state={{ newWindow: true }}
                className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary"
            >
                <Icon className={`size-5 shrink-0 ${iconColor}`} />
                {title} <span className="text-secondary font-normal">in Slack</span>
            </Link>
            <Badge>{badge}</Badge>
        </div>
        <p className="m-0 text-base">{description}</p>
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
                Right sidebar in{' '}
                <Link
                    to="https://app.posthog.com"
                    state={{ newWindow: true }}
                    className="text-red dark:text-yellow font-semibold hover:underline"
                >
                    app.posthog.com
                </Link>
            </>
        ),
        slack: 'Any Slack channel or thread',
        code: 'Desktop app',
    },
    {
        label: 'How to summon',
        ai: 'Click the sparkle or AI chat window',
        slack: 'Tag @PostHog',
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
        slack: 'PostHog-managed cloud sandbox.',
        code: 'Local, an isolated worktree, or a PostHog-managed cloud sandbox.',
    },
    {
        label: 'Models',
        ai: "Auto-picked from OpenAI and Anthropic (we tune so you don't have to).",
        slack: 'Auto-picked from OpenAI and Anthropic.',
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
        trigger: 'Do I need PostHog Code to use the PostHog Slack app?',
        content: (
            <p>
                No. The Slack app isn't gated on a{' '}
                <Link
                    to="/code"
                    state={{ newWindow: true }}
                    className="text-red dark:text-yellow font-semibold hover:underline"
                >
                    PostHog Code
                </Link>{' '}
                subscription. They share the same coding agent under the hood – the Slack app is just the front door if
                you'd rather work from a thread than a desktop app.
            </p>
        ),
    },
    {
        trigger: 'How does the PostHog Slack app decide when to answer or code?',
        content: (
            <p>
                The PostHog Slack app doesn't have an explicit <code>/ask</code> vs <code>/code</code> toggle. Instead,
                when you @PostHog mention the bot, it auto-classifies the request. Phrasing your question with
                product/analytics terms (and avoiding repo/PR/file-extension words) is how you steer it to answer with
                data instead of a PR.
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
        trigger: 'What should I prompt the PostHog Slack app to do?',
        content: (
            <p>
                Fixing typos, grammar, or basic CSS is a common first use case to get familiar with the workflow. Once
                you see how easy and efficient it is to make changes, try prompting bigger changes, pulling complex data
                queries, or impressing your customers by building a feature request in the same thread they requested
                it.
            </p>
        ),
    },
    {
        trigger: 'What about projects with multiple repos?',
        content: (
            <p>
                Set a default repo per channel. Or set regex routing rules so the bot picks the right repo from the
                channel name or the task description. When the bot isn't sure, it opens a picker in-thread. See the{' '}
                <Link
                    to="/docs/slack/commands"
                    state={{ newWindow: true }}
                    className="text-red dark:text-yellow font-semibold hover:underline"
                >
                    PostHog Code Slack docs
                </Link>{' '}
                for the full command list.
            </p>
        ),
    },
    {
        trigger: 'Can multiple people drive the same task?',
        content: (
            <>
                <p>
                    Yes. Anyone in the thread can send follow-ups to the running agent. Every message in the thread is
                    forwarded as a new turn in the same conversation, so teammates can steer mid-run, drop in extra
                    context, or answer a question the agent asked.
                </p>
                <p>
                    Heads up: the resulting PR is still authored under whoever started the task – their personal GitHub
                    integration is the one wired up – so a teammate's follow-up edits land under the original
                    requester's name. If you want the PR credited to you, start your own task.
                </p>
            </>
        ),
    },
    {
        trigger: 'How are PRs generated with the Slack app credited?',
        content: (
            <p>
                Branches get a <code>posthog-code/</code> prefix, and each commit includes a{' '}
                <code>Generated-By: PostHog Code</code> line plus a <code>Task-Id</code> so you can trace it back. PRs
                are authored under your name via your{' '}
                <Link
                    to="https://app.posthog.com/settings/user-personal-integrations"
                    external
                    className="text-red dark:text-yellow font-semibold hover:underline"
                >
                    personal GitHub integration
                </Link>
                , which every teammate connects once before they can ship code.
            </p>
        ),
    },
    {
        trigger: 'Does the PostHog Slack app work in DMs?',
        content: (
            <p>
                No. But if you want to @PostHog for quick tasks (or embarrassing questions) without spamming your team,
                you can add it to a private channel with just you and the bot.
            </p>
        ),
    },
    {
        trigger: 'What scopes does the bot ask for?',
        content: (
            <p>
                Standard Slack bot scopes: read messages where it's been invited, post messages, upload files, and
                resolve user profiles to match Slack accounts to PostHog accounts. It does not read messages from
                channels it isn't in. See the full list on the PostHog app's{' '}
                <Link
                    to="https://slack.com/marketplace/A03M3FN0RSQ-posthog"
                    external
                    className="text-red dark:text-yellow font-semibold hover:underline"
                >
                    Slack marketplace listing
                </Link>
                .
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
        trigger: 'What are the current limitations?',
        content: (
            <>
                <p>An honest (but non-exhaustive) list:</p>
                <ul className="list-disc pl-5 space-y-1 [&_li]:!list-disc">
                    <li>
                        Sandbox is ephemeral (~6 hours). Long iterations need re-prompting once the sandbox recycles.
                    </li>
                    <li>
                        GitHub auth is per-user via a personal integration. Onboarding has a known gap; first-time setup
                        is rougher than it should be.
                    </li>
                    <li>
                        No screenshot input yet – the bot reads text only. Paste descriptions instead of images for now.
                    </li>
                    <li>
                        Prompt construction and review-bot trust heuristics are being actively iterated. Behavior may
                        shift between beta builds.
                    </li>
                </ul>
            </>
        ),
    },
]

const fighterOptions: { icon: IconComponent; iconColor: string; label: React.ReactNode; copy: React.ReactNode }[] = [
    {
        icon: IconSparkles,
        iconColor: 'text-blue',
        label: (
            <Link to="/ai" state={{ newWindow: true }} className="font-bold text-primary">
                PostHog AI
            </Link>
        ),
        copy: "When you're already in the app looking at data – ask it to write the SQL, build the dashboard, or make sense of what you're seeing.",
    },
    {
        icon: IconChat,
        iconColor: 'text-sky-blue',
        label: 'PostHog Slack app',
        copy: "For all the drive-by stuff you'd normally Slack a teammate about (typos, cross-repo checks, quick fixes).",
    },
    {
        icon: IconCoffee,
        iconColor: 'text-brown dark:text-brown-dark',
        label: (
            <Link to="/code" state={{ newWindow: true }} className="font-bold text-primary">
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
                description="The reactive way to reach self-driving: tag @PostHog in any Slack thread to ship a fix, answer a data question, or edit content – without leaving the conversation."
                image="/images/og/default.png"
                structuredData={buildProductStructuredData({
                    name: 'PostHog Slack app',
                    description:
                        'The reactive way to reach self-driving: tag @PostHog in any Slack thread to ship a fix, answer a data question, or edit content – without leaving the conversation.',
                    slug: 'slack-app',
                })}
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="posthog-slack-app.md" hideTitle={true}>
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-4">
                        <h1 className="text-3xl @md/reader-content-container:text-4xl font-bold m-0 mb-2">
                            Don't @ <em>me,</em> <Highlight>@PostHog</Highlight>
                        </h1>
                        <p className="text-secondary text-base @md/reader-content-container:text-lg max-w-lg mx-auto m-0">
                            The Slack app is the reactive way to reach self-driving – tag @PostHog in any thread to ask
                            about your product data, debug issues, and generate PRs without leaving the conversation.
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
                        One hog, <Highlight>two jobs</Highlight>
                    </h3>
                    <p>
                        The PostHog Slack app is a single agent that reads your product data and writes your code. Ask
                        "why did EU signups drop?", then have it open the PR that fixes it (without leaving Slack).
                    </p>
                    <div className="not-prose flex flex-wrap items-center gap-3 mb-6">
                        <CallToAction to={CONNECT_SLACK_URL} size="sm" externalNoIcon>
                            Connect Slack
                        </CallToAction>
                        <span className="text-sm text-secondary">
                            Not using PostHog?{' '}
                            <Link to="https://app.posthog.com/signup" external>
                                Sign up
                            </Link>
                        </span>
                    </div>
                    <div className="not-prose grid @2xl/reader-content:grid-cols-2 gap-4 mb-6">
                        {introCards.map((card) => (
                            <IntroCard key={card.title} {...card} />
                        ))}
                    </div>

                    <h3>
                        A typical run, from <Highlight>@mention to merge</Highlight>
                    </h3>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/slack_app_chat_1_c6573ce6da.png"
                        alt="@PostHog rolling out a feature flag from a Slack thread via the PostHog MCP"
                        className="@lg/reader-content:float-right @lg/reader-content:max-w-xs @lg/reader-content:ml-4 bg-light rounded-md shadow-lg border border-primary overflow-hidden mb-2 mt-2"
                        imgClassName="w-full"
                    />
                    <p>You don't need to know any of this to use it. But here's what happens after you hit send:</p>
                    <ol>
                        <li>The agent scans the thread for relevant content (text only, for now).</li>
                        <li>It plans the work, edits files, and runs checks inside a sandboxed environment.</li>
                        <li>It opens a draft PR with a detailed description, and links it back into the thread.</li>
                        <li>
                            It iterates on follow-up messages from anyone in the thread, so teammates can steer the run
                            together.
                        </li>
                        <li>
                            It watches CI, reruns failed jobs that look environmental, and doesn't touch workflow files.
                        </li>
                        <li>
                            It automatically triages review comments – acts on trusted code-review bots, and flags other
                            changes as it babysits.
                        </li>
                    </ol>
                    <div className="clear-both" />

                    <div className="not-prose my-6">
                        <TabbedCarousel tabs={featureTabs} />
                    </div>

                    <h3>
                        <Highlight>Everyone</Highlight> can code now
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
                        Choose your <Highlight>fighter</Highlight>
                    </h3>
                    <p>Same agent, three front doors.</p>
                    <div className="not-prose grid @lg/reader-content:grid-cols-2 gap-6 items-center my-6">
                        <div className="space-y-4">
                            {fighterOptions.map(({ icon: Icon, iconColor, label, copy }, index) => (
                                <div key={index}>
                                    <p className="m-0 inline-flex items-center gap-2 font-bold text-base">
                                        <Icon className={`size-5 shrink-0 ${iconColor}`} />
                                        {label}
                                    </p>
                                    <p className="m-0 mt-1 text-base">{copy}</p>
                                </div>
                            ))}
                        </div>
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/choose_your_fighter_e62bd78032.png"
                            alt="Choose your fighter"
                            className="hidden @lg/reader-content:block"
                            imgClassName="w-full"
                        />
                    </div>
                    <p className="text-sm text-secondary">
                        Building your own?{' '}
                        <Link to="/docs/model-context-protocol" state={{ newWindow: true }}>
                            PostHog MCP
                        </Link>{' '}
                        wires the same product context into the editor or agent of your choice.
                    </p>
                    <div className="not-prose my-6">
                        <OSTable
                            size="sm"
                            rowAlignment="top"
                            className="text-sm"
                            columns={[
                                { name: '', align: 'left', width: 'minmax(80px,110px)' },
                                ...compareLinks.map(({ label, url }) => ({
                                    name: (
                                        <Link to={url} state={{ newWindow: true }} className="font-bold text-primary">
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
                    <div
                        id="try"
                        className="not-prose bg-accent border border-primary rounded-md p-4 @md/reader-content:p-6 my-6"
                    >
                        <div className="grid @lg/reader-content:grid-cols-[1fr_260px] gap-6 items-center">
                            <div>
                                <h3 className="mt-0 mb-2 text-2xl font-bold inline-flex items-center gap-2 flex-wrap">
                                    Try it
                                    <Badge>Beta</Badge>
                                </h3>
                                <p className="mt-0 mb-4">
                                    The PostHog Slack app is free to install, and free to uninstall when you realize
                                    this means you can ship production code from your phone (which, frankly, might be
                                    too much power for anyone).
                                </p>
                                <div className="flex flex-wrap items-center gap-3">
                                    <CallToAction to={CONNECT_SLACK_URL} size="sm" externalNoIcon>
                                        Connect Slack
                                    </CallToAction>
                                    <span className="text-sm text-secondary">
                                        Not using PostHog?{' '}
                                        <Link to="https://app.posthog.com/signup" external>
                                            Sign up
                                        </Link>
                                    </span>
                                </div>
                            </div>
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/slack_app_chat_2_e5993b2331.png"
                                alt="@PostHog working through CI checks on a draft PR in a Slack thread"
                                className="bg-light rounded-md shadow border border-primary overflow-hidden"
                                imgClassName="w-full"
                            />
                        </div>
                    </div>

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
