import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ReactNode } from 'react'
import { IconToggle, IconAI, IconBrain, IconBatteryCharge, IconHandMoney, IconTerminal } from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import { FeatureTabs } from 'components/UI/FeatureTabs'
import type { FeatureTabsTab } from 'components/UI/FeatureTabs'

type FeaturePanelProps = {
    title: string
    highlightedTitle: string
    titleSuffix?: string
    highlightColor: 'green' | 'yellow'
    imageLight: `https://res.cloudinary.com/${string}`
    imageDark: `https://res.cloudinary.com/${string}`
    imageAlt: string
    children: ReactNode
}
const highlightClasses = {
    green: 'bg-green/10 text-green dark:bg-green/20',
    yellow: 'bg-yellow/15 text-yellow dark:bg-yellow/20',
}
function FeaturePanel({
    title,
    highlightedTitle,
    titleSuffix,
    highlightColor,
    imageLight,
    imageDark,
    imageAlt,
    children,
}: FeaturePanelProps): JSX.Element {
    return (
        <div className="flex h-full flex-col rounded bg-primary p-4 @xl:p-6">
            <h3 className="m-0 mt-0 mb-2 text-2xl font-bold">
                {title}{' '}
                <span className={`rounded-sm px-0.5 ${highlightClasses[highlightColor]}`}>{highlightedTitle}</span>
                {titleSuffix ? ` ${titleSuffix}` : null}
            </h3>
            <div className="flex-1 text-[15px] text-secondary">{children}</div>
            <div className="-mx-4 -mb-4 mt-4 overflow-hidden rounded-b leading-[0] @xl:-mx-6 @xl:-mb-6">
                <CloudinaryImage src={imageLight} alt={imageAlt} className="dark:hidden" imgClassName="w-full block" />
                <CloudinaryImage
                    src={imageDark}
                    alt={imageAlt}
                    className="hidden dark:block"
                    imgClassName="w-full block"
                />
            </div>
        </div>
    )
}
function SlideCallout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <div className="mt-5 rounded border border-yellow bg-yellow/10 px-3 py-2.5 text-sm text-secondary">
            {children}
        </div>
    )
}

const featureTabs: FeatureTabsTab[] = [
    {
        value: 'plan',
        label: 'Plan',
        color: 'bg-green',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <FeaturePanel
                title="Agree on the"
                highlightedTitle="plan"
                titleSuffix="before any code"
                highlightColor="green"
                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/plan_mode_light_f271562e0c.png"
                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/plan_mode_dark_e8253c4a4e.png"
                imageAlt="Plan mode: clarifying questions and an implementation plan to approve"
            >
                <p className="m-0">
                    If <em>dangerously skipping permissions</em> isn't your thing, coding tasks can start in Plan mode.
                    The agent explores your data, asks clarifying questions, then writes an implementation plan for you
                    to approve.
                </p>
                <div className="not-prose mt-4 grid grid-cols-1 gap-4 @sm:grid-cols-3">
                    {[
                        {
                            Icon: IconToggle,
                            color: 'text-green',
                            title: 'Mode',
                            tagline: 'Switch anytime, even mid-task',
                            items: ['Accept Edits', 'Plan Mode', 'Auto Mode'],
                        },
                        {
                            Icon: IconAI,
                            color: 'text-purple',
                            title: 'Model',
                            tagline: 'Choose your weapon',
                            items: ['Claude', 'Codex', 'Open source'],
                        },
                        {
                            Icon: IconBrain,
                            color: 'text-orange',
                            title: 'Effort level',
                            tagline: 'Still effortless for you',
                            items: ['Low–medium', 'High–extra high', 'Max'],
                        },
                    ].map(({ Icon, color, title, tagline, items }) => (
                        <div key={title}>
                            <div className="flex items-center gap-1.5">
                                <Icon className={`size-5 shrink-0 ${color}`} />
                                <span className="text-base font-bold text-primary">{title}</span>
                            </div>
                            <p className="m-0 mt-1 text-sm leading-snug text-secondary">{tagline}</p>
                            <div className="mt-2 flex flex-col gap-1">
                                {items.map((item) => (
                                    <span key={item} className="flex items-center gap-2 text-sm text-secondary">
                                        <span className="size-1.5 shrink-0 rounded-full bg-border" />
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </FeaturePanel>
        ),
    },
    {
        value: 'tasks',
        label: 'Prompt',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        content: (
            <FeaturePanel
                title="Ship code by"
                highlightedTitle="describing it"
                highlightColor="yellow"
                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/prompt_task_light_ad118d1efc.png"
                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/prompt_task_dark_6cb8a38596.png"
                imageAlt="Prompting a task in PostHog Desktop"
            >
                <p className="m-0">
                    A <strong className="text-primary">task</strong> is the unit of work in PostHog Desktop. Prompt code
                    changes locally, or in the cloud.
                </p>
                <SlideCallout>
                    <strong className="text-primary">Steer</strong> injects your message at the next tool boundary.{' '}
                    <strong className="text-primary">Queue</strong> holds the message until the current turn ends.
                </SlideCallout>
                <div className="not-prose mt-4 grid grid-cols-1 gap-4 @sm:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconBatteryCharge className="size-5 shrink-0 text-green" />
                            <span className="text-base font-bold text-primary">Context</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            A 1M-token window, with a live meter as you chat. Run{' '}
                            <Snippet.Inline>/compact</Snippet.Inline> any time to summarize.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconHandMoney className="size-5 shrink-0 text-orange" />
                            <span className="text-base font-bold text-primary">Cost</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            It's usage-based, so switching models per task pays off (no need for a bazooka to swat a
                            fly).
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconTerminal className="size-5 shrink-0 text-blue" />
                            <span className="text-base font-bold text-primary">Do it here</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Prompt changes, attach a screenshot, use a slash command, review the diff, open a terminal.
                        </p>
                    </div>
                </div>
            </FeaturePanel>
        ),
    },
]

export default function Desktop(): JSX.Element {
    return <FeatureTabs tabs={featureTabs} />
}
