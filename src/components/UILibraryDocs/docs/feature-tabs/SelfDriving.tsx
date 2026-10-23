import React from 'react'
import type { ReactNode } from 'react'
import {
    IconWarning,
    IconRewindPlay,
    IconSupport,
    IconPlug,
    IconCheckCircle,
    IconStack,
    IconSparkles,
    IconSearch,
    IconAtSign,
    IconBolt,
    IconCode,
    IconCompass,
    IconPeople,
    IconShieldLock,
} from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'
import { FeatureTabs } from 'components/UI/FeatureTabs'
import type { FeatureTabsTab } from 'components/UI/FeatureTabs'

type IconComponent = React.ComponentType<{ className?: string }>
type CloudinarySrc = `https://res.cloudinary.com/${string}`
const LOOP_SCOUTS_IMAGE: CloudinarySrc = 'https://res.cloudinary.com/dmukukwp6/image/upload/scouts_8fe0af6de1.png'
const LOOP_INBOX_IMAGE: CloudinarySrc =
    'https://res.cloudinary.com/dmukukwp6/image/upload/inbox_prs_cloud_f44f8ba69b.png'
const LOOP_MERGE_IMAGE: CloudinarySrc = 'https://res.cloudinary.com/dmukukwp6/image/upload/4_merge_ffb549df4a.png'

type IconGroup = { title: string; description: string; items: { Icon: IconComponent; color: string; name: string }[] }

const IconGroupColumns = ({ groups }: { groups: IconGroup[] }): JSX.Element => (
    <div className="not-prose mt-4 grid grid-cols-1 gap-6 @sm:grid-cols-2">
        {groups.map((group) => (
            <div key={group.title} className="@container flex flex-col gap-3">
                <div>
                    <p className="m-0 text-base font-bold text-primary">{group.title}</p>
                    <p className="m-0 text-sm text-secondary">{group.description}</p>
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-1.5 @xs:grid-cols-2">
                    {group.items.map(({ Icon, color, name }) => (
                        <span key={name} className="flex items-start gap-1.5 text-sm text-primary">
                            <Icon className={`mt-0.5 size-5 shrink-0 ${color}`} />
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        ))}
    </div>
)

type TabPanelHighlightColor = 'blue' | 'red' | 'yellow' | 'green'

const tabPanelHighlightClasses: Record<TabPanelHighlightColor, string> = {
    blue: 'bg-blue/10 text-blue dark:bg-blue/20',
    red: 'bg-red/10 text-red dark:bg-red/20',
    yellow: 'bg-yellow/15 text-yellow dark:bg-yellow/20',
    green: 'bg-green/10 text-green dark:bg-green/20',
}

const TabPanel = ({
    title,
    highlightedTitle,
    titleSuffix,
    highlightColor = 'blue',
    children,
    image,
}: {
    title: string
    highlightedTitle?: string
    titleSuffix?: string
    highlightColor?: TabPanelHighlightColor
    children: ReactNode
    image: CloudinarySrc
}): JSX.Element => {
    const fullTitle = [title, highlightedTitle, titleSuffix].filter(Boolean).join(' ')

    return (
        <div className="rounded bg-primary p-4 @xl:p-6">
            <h2 className="mt-0 mb-2 text-2xl font-bold">
                {title}
                {highlightedTitle ? (
                    <>
                        {' '}
                        <span className={`rounded-sm px-0.5 ${tabPanelHighlightClasses[highlightColor]}`}>
                            {highlightedTitle}
                        </span>
                        {titleSuffix ? ` ${titleSuffix}` : null}
                    </>
                ) : null}
            </h2>
            <div className="text-secondary">{children}</div>
            <div className="-mx-4 -mb-4 mt-4 overflow-hidden rounded-b leading-[0] @xl:-mx-6 @xl:-mb-6">
                <CloudinaryImage src={image} alt={fullTitle} imgClassName="w-full block" />
            </div>
        </div>
    )
}

const signalSources: { Icon: IconComponent; color: string; name: string; description: string; href: string }[] = [
    {
        Icon: IconWarning,
        color: 'text-yellow',
        name: 'Error tracking',
        description: 'Exceptions and stack traces grouped into issues',
        href: '/error-tracking',
    },
    {
        Icon: IconRewindPlay,
        color: 'text-orange',
        name: 'Session replay',
        description: 'Dead clicks, quick backs, long stalls',
        href: '/session-replay',
    },
    {
        Icon: IconSupport,
        color: 'text-blue',
        name: 'Support',
        description: 'Tickets and conversations from your users',
        href: '/support',
    },
    {
        Icon: IconPlug,
        color: 'text-purple',
        name: 'External tools',
        description: 'Zendesk, Linear, GitHub issues',
        href: '/docs/self-driving/signals',
    },
]

const scoutGroups: IconGroup[] = [
    {
        title: 'Canonical scouts',
        description: 'Pre-built to watch common patterns.',
        items: [
            { Icon: IconCheckCircle, color: 'text-green', name: 'Health checks' },
            { Icon: IconStack, color: 'text-blue', name: 'Data pipelines' },
            { Icon: IconSparkles, color: 'text-purple', name: 'AI observability' },
            { Icon: IconSearch, color: 'text-orange', name: 'Observability gaps' },
        ],
    },
    {
        title: 'Custom scouts',
        description: 'Specific to your product.',
        items: [
            { Icon: IconAtSign, color: 'text-sky-blue', name: 'A Slack channel' },
            { Icon: IconBolt, color: 'text-yellow', name: 'A custom event' },
            { Icon: IconCode, color: 'text-blue', name: 'A GitHub repo' },
            { Icon: IconCompass, color: 'text-purple', name: 'The troop itself' },
        ],
    },
]

const loopTabs: FeatureTabsTab[] = [
    {
        value: 'signals',
        label: 'Signals',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <TabPanel
                title="Notable things"
                highlightedTitle="happening in your product"
                image="https://res.cloudinary.com/dmukukwp6/image/upload/report_177cacd2dd.png"
            >
                <p className="m-0">A signal is a single observation about your product.</p>
                <div className="not-prose mt-4 grid grid-cols-1 gap-x-4 gap-y-3 @sm:grid-cols-2">
                    {signalSources.map(({ Icon, color, name, description, href }) => (
                        <div key={name} className="flex items-start gap-2">
                            <Icon className={`mt-0.5 size-5 shrink-0 ${color}`} />
                            <div>
                                <p className="m-0 text-base font-bold">
                                    <Link
                                        to={href}
                                        state={{ newWindow: true }}
                                        className="text-primary underline underline-offset-2 hover:text-red dark:hover:text-yellow"
                                    >
                                        {name}
                                    </Link>
                                </p>
                                <p className="m-0 text-sm leading-snug text-secondary">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </TabPanel>
        ),
    },
    {
        value: 'scouts',
        label: 'Scouts',
        color: 'bg-red',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <TabPanel
                title="Specialist agents that"
                highlightedTitle="go deep"
                titleSuffix="on one surface"
                highlightColor="red"
                image={LOOP_SCOUTS_IMAGE}
            >
                <p className="m-0">Scouts run on a schedule and build durable memory of what they've seen.</p>
                <IconGroupColumns groups={scoutGroups} />
            </TabPanel>
        ),
    },
    {
        value: 'inbox',
        label: 'Inbox',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        content: (
            <TabPanel
                title="One"
                highlightedTitle="prioritized list"
                titleSuffix="of work to review"
                highlightColor="yellow"
                image={LOOP_INBOX_IMAGE}
            >
                <p className="m-0">Your Inbox clusters related findings into researched reports, ranked by priority.</p>
                <div className="not-prose mt-4 grid grid-cols-1 gap-4 @sm:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconCode className="size-5 shrink-0 text-blue" />
                            <span className="text-base font-bold text-primary">Code importance</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Is the issue in a hot path like checkout, signup, or billing?
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconPeople className="size-5 shrink-0 text-purple" />
                            <span className="text-base font-bold text-primary">User impact</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            How many users are affected, and are they on a paid plan?
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconWarning className="size-5 shrink-0 text-red" />
                            <span className="text-base font-bold text-primary">Severity</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Is the product broken for these users, or just a minor UX issue?
                        </p>
                    </div>
                </div>
            </TabPanel>
        ),
    },
    {
        value: 'pull-requests',
        label: 'Pull requests',
        color: 'bg-green',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <TabPanel
                title="Actionable reports, opened as"
                highlightedTitle="pull requests"
                highlightColor="green"
                image={LOOP_MERGE_IMAGE}
            >
                <p className="m-0">
                    When something needs a code change, an agent clones your repo into a sandbox, traces the root cause,
                    writes the code, and opens a pull request. If a report <em>isn't</em> actionable, it triggers a
                    research task.
                </p>
                <div className="not-prose mt-4 grid grid-cols-1 gap-4 @sm:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconSearch className="size-5 shrink-0 text-blue" />
                            <span className="text-base font-bold text-primary">Root cause analysis</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Pairs the signal with your code to find what's actually broken.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconShieldLock className="size-5 shrink-0 text-purple" />
                            <span className="text-base font-bold text-primary">Sandboxed execution</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Clones your repo, applies the fix, and runs your tests.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconCheckCircle className="size-5 shrink-0 text-green" />
                            <span className="text-base font-bold text-primary">You review and merge</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Chat with the agent to tweak it, or merge as-is (lgtm!).
                        </p>
                    </div>
                </div>
            </TabPanel>
        ),
    },
]

export default function SelfDriving(): JSX.Element {
    return <FeatureTabs tabs={loopTabs} variant="hero" />
}
