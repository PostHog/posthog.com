import React, { useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import usePostHog from 'hooks/usePostHog'
import Link from 'components/Link'
import { cn } from '../../utils'
import SlackWindow, { type SlackScene } from './SlackWindow'

export interface Demo {
    /** For analytics */
    title: string
    /** The button text. Match the scene's first message. */
    label: string
    detail?: string
    Icon?: React.ComponentType<{ className?: string }>
    color?: string
    scene: SlackScene
}

// Real threads, cut short. Check a change with the person first.
const prompts: Demo[] = [
    {
        title: 'Fix a dead-end screen',
        label: "@PostHog new accounts get the Desktop sign-ups paused screen, and it's a dead end. It says we'll contact them, but nothing does. Please drop that, and send them to the hedgehog games instead?",
        scene: {
            channel: 'desktop',
            label: 'Real PR',
            endAt: 10300,
            messages: [
                {
                    from: 'person',
                    at: 600,
                    time: '5:40 PM',
                    name: 'Cleo Lant',
                    text: "@PostHog new accounts get the Desktop sign-ups paused screen, and it's a dead end. It says we'll contact them, but nothing does. Please drop that, and send them to the hedgehog games instead?",
                    reactedAt: 1300,
                    heartAt: 2000,
                },
                {
                    from: 'bot',
                    at: 1300,
                    time: '5:40 PM',
                    blocks: [
                        {
                            at: 2200,
                            type: 'plan',
                            steps: [
                                { label: 'Rewrite the text, without the promise', doneAt: 3100 },
                                { label: 'Add a Play a hedgehog game instead button', doneAt: 4000 },
                                { label: 'Make Check again the second button', doneAt: 4900 },
                                { label: 'Track clicks on the games button', doneAt: 5800 },
                                { label: 'Open a draft PR', doneAt: 6700 },
                            ],
                        },
                        {
                            at: 6900,
                            type: 'pr',
                            state: 'opened',
                            repo: 'PostHog/posthog',
                            number: 120590,
                            url: 'https://github.com/PostHog/posthog/pull/120590',
                        },
                        {
                            at: 7300,
                            type: 'text',
                            text: '@Cleo Done. A click sends `Desktop access link opened` with `link: games`, so you can see who plays. The other screens do not change.',
                        },
                    ],
                },
            ],
            summary:
                "A real request from PostHog's Slack, cut short: Cleo says the PostHog Desktop sign-ups paused screen is a dead end, because it promises a follow-up that never comes. She asks PostHog to drop the promise and send people to the hedgehog games. PostHog posts a plan, changes the screen, adds a tracking event, and opens a pull request in the main PostHog repo.",
        },
    },
    {
        title: 'Write the rule into the handbook',
        label: '@PostHog some applicants say they run more than one startup to get credits again. Can we write down that credits are once per founder and once per company, in the handbook and on /startups?',
        scene: {
            channel: 'startups',
            label: 'Real PR',
            endAt: 8900,
            messages: [
                {
                    from: 'person',
                    at: 600,
                    time: '5:10 PM',
                    name: 'Joe Black',
                    text: '@PostHog some applicants say they run more than one startup to get credits again. Can we write down that credits are once per founder and once per company, in the handbook and on /startups?',
                    reactedAt: 1300,
                },
                {
                    from: 'bot',
                    at: 1300,
                    time: '5:10 PM',
                    blocks: [
                        {
                            at: 2400,
                            type: 'text',
                            text: '@Joe Done, in both places. Credits are once per founder and once per organization, whichever comes first, and always at our discretion.',
                        },
                        {
                            at: 4600,
                            type: 'bullets',
                            items: [
                                '*/startups:* a new FAQ, "Can I get credits more than once?"',
                                '*The handbook:* a limit row in the program table, and a step in reviewing applications.',
                                'Annual YC renewals for the same company do not count as a new claim.',
                            ],
                        },
                        {
                            at: 7200,
                            type: 'pr',
                            state: 'opened',
                            repo: 'PostHog/posthog.com',
                            number: 21655,
                            url: 'https://github.com/PostHog/posthog.com/pull/21655',
                        },
                    ],
                },
            ],
            summary:
                "A real request from PostHog's Slack, cut short: Joe says some applicants claim to run more than one startup to get credits again. He asks PostHog to write down that credits are once per founder and once per company. PostHog adds the rule to the startups FAQ and the handbook, and opens a pull request.",
        },
    },
    {
        title: 'Fix a papercut',
        label: "@PostHog I keep getting the unsaved notebook warning when I move between pages that aren't notebooks. It should only warn while a notebook is open.",
        scene: {
            channel: 'papercuts',
            label: 'Real PR',
            endAt: 10900,
            messages: [
                {
                    from: 'person',
                    at: 600,
                    time: '12:29 PM',
                    name: "Paul D'Ambra",
                    text: "@PostHog I keep getting the unsaved notebook warning when I move between pages that aren't notebooks. It should only warn while a notebook is open.",
                    reactedAt: 1300,
                },
                {
                    from: 'bot',
                    at: 1300,
                    time: '12:29 PM',
                    blocks: [
                        {
                            at: 2200,
                            type: 'plan',
                            steps: [
                                { label: 'Find what sets the leave warning', doneAt: 3100 },
                                { label: 'Warn only while a notebook editor is open', doneAt: 4000 },
                                { label: 'Keep the warning on browser close and reload', doneAt: 4900 },
                                { label: 'Add tests', doneAt: 5800 },
                                { label: 'Open a draft PR', doneAt: 6700 },
                            ],
                        },
                        {
                            at: 6900,
                            type: 'pr',
                            state: 'opened',
                            repo: 'PostHog/posthog',
                            number: 130036,
                            url: 'https://github.com/PostHog/posthog/pull/130036',
                        },
                        {
                            at: 7300,
                            type: 'text',
                            text: '@Paul Fixed. In-app navigation warns only while a notebook editor is open, including Notes on groups and the side panel. Browser close and reload still protect unsaved notes.',
                        },
                    ],
                },
            ],
            summary:
                "A real request from PostHog's Slack, cut short: in the papercuts channel, Paul says the unsaved notebook warning shows on pages that are not notebooks. PostHog posts a plan, limits the warning to open notebook editors, adds tests, and opens a pull request.",
        },
    },
    {
        title: 'Hide a button that adds nothing',
        label: '@PostHog when an inbox report already has an open PR, the header shows View task next to Open in GitHub. The runs section already links the task. Can we hide it?',
        scene: {
            channel: 'team-signals',
            label: 'Real PR',
            endAt: 8400,
            messages: [
                {
                    from: 'person',
                    at: 600,
                    time: '11:17 AM',
                    name: 'Andy Maguire',
                    text: '@PostHog when an inbox report already has an open PR, the header shows View task next to Open in GitHub. The runs section already links the task. Can we hide it?',
                    reactedAt: 1300,
                },
                {
                    from: 'bot',
                    at: 1300,
                    time: '11:17 AM',
                    blocks: [
                        {
                            at: 2200,
                            type: 'plan',
                            steps: [
                                { label: 'Find where the report header picks its buttons', doneAt: 3100 },
                                { label: 'Skip Implement and View task when there is a PR', doneAt: 4000 },
                                { label: 'Open a draft PR', doneAt: 4900 },
                            ],
                        },
                        {
                            at: 5100,
                            type: 'pr',
                            state: 'opened',
                            repo: 'PostHog/posthog',
                            number: 133502,
                            url: 'https://github.com/PostHog/posthog/pull/133502',
                        },
                        {
                            at: 5500,
                            type: 'text',
                            text: '@Andy A report with a PR now shows only Open in GitHub. Reports without one keep Implement, or View task while a run is active.',
                        },
                    ],
                },
            ],
            summary:
                "A real request from PostHog's Slack, cut short: Andy asks PostHog to hide the View task button on Inbox reports that already have an open PR, because the runs section already links the task. PostHog posts a plan, changes the report header, and opens a pull request in the main PostHog repo.",
        },
    },
    {
        title: 'Fix a confusing pricing chart',
        label: '@PostHog people read the Replay Vision plans chart as "the paid plan has no free credits", because of the price per credit row. Both plans get 2,500 free credits a month. Can you fix the chart?',
        scene: {
            channel: 'replay-vision',
            label: 'Real PR',
            endAt: 7600,
            messages: [
                {
                    from: 'person',
                    at: 600,
                    time: '12:07 AM',
                    name: 'Kim Dugan',
                    text: '@PostHog people read the Replay Vision plans chart as "the paid plan has no free credits", because of the price per credit row. Both plans get 2,500 free credits a month. Can you fix the chart?',
                    reactedAt: 1300,
                },
                {
                    from: 'bot',
                    at: 1300,
                    time: '12:07 AM',
                    blocks: [
                        {
                            at: 2400,
                            type: 'text',
                            text: '@Kim Agreed. The row shows $0.01 on pay-as-you-go, so it reads like you pay from the first credit.',
                        },
                        {
                            at: 4200,
                            type: 'bullets',
                            items: [
                                '*Out:* the price per credit row.',
                                '*In:* what happens after the free credits, and if you need a card.',
                                'I checked the page in light and dark mode, narrow and wide.',
                            ],
                        },
                        {
                            at: 6800,
                            type: 'pr',
                            state: 'opened',
                            repo: 'PostHog/posthog.com',
                            number: 22212,
                            url: 'https://github.com/PostHog/posthog.com/pull/22212',
                        },
                    ],
                },
            ],
            summary:
                "A real request from PostHog's Slack, cut short: Kim says people read the Replay Vision plans chart as if the paid plan has no free credits, and asks PostHog to fix it. PostHog explains the problem, says which rows it removed and added, checks the page, and opens a pull request.",
        },
    },
    {
        title: 'Keep the chart in view',
        label: "@PostHog when you ask PostHog AI for a chart in the web chat, the chart folds into the collapsed tool calls row, so people don't see it. Can you keep it visible?",
        scene: {
            channel: 'team-posthog-ai',
            label: 'Real PR',
            endAt: 9600,
            messages: [
                {
                    from: 'person',
                    at: 600,
                    time: '8:25 AM',
                    name: 'Vojta Bartos',
                    text: "@PostHog when you ask PostHog AI for a chart in the web chat, the chart folds into the collapsed tool calls row, so people don't see it. Can you keep it visible?",
                    reactedAt: 1300,
                },
                {
                    from: 'bot',
                    at: 1300,
                    time: '8:25 AM',
                    blocks: [
                        {
                            at: 2200,
                            type: 'plan',
                            steps: [
                                { label: 'Find why the chart folds', doneAt: 3100 },
                                { label: 'Keep a finished chart open', doneAt: 4000 },
                                { label: 'Prefer a chart over a long table', doneAt: 4900 },
                                { label: 'Open a draft PR', doneAt: 5800 },
                            ],
                        },
                        {
                            at: 6000,
                            type: 'pr',
                            state: 'opened',
                            repo: 'PostHog/posthog',
                            number: 133434,
                            url: 'https://github.com/PostHog/posthog/pull/133434',
                        },
                        {
                            at: 6400,
                            type: 'text',
                            text: '@Vojta Found it. The agent calls `task_summary_update` after the chart, and the thread shows only the last call. A finished chart now stays open.',
                        },
                    ],
                },
            ],
            summary:
                "A real request from PostHog's Slack, cut short: Vojta says that charts in the PostHog AI web chat fold into a collapsed row, so people don't see them. PostHog posts a plan, finds the cause, keeps finished charts open, and opens a pull request in the main PostHog repo.",
        },
    },
    {
        title: 'Share a sales tip',
        label: '@PostHog I put a PostHog video in my Zoom waiting room, so customers who join early can watch it. Can you add the steps to the handbook, so the rest of the team can do it too?',
        scene: {
            channel: 'sales',
            label: 'Real PR',
            endAt: 7800,
            messages: [
                {
                    from: 'person',
                    at: 600,
                    time: '11:11 AM',
                    name: 'Joey Backs',
                    text: '@PostHog I put a PostHog video in my Zoom waiting room, so customers who join early can watch it. Can you add the steps to the handbook, so the rest of the team can do it too?',
                    reactedAt: 1300,
                },
                {
                    from: 'bot',
                    at: 1300,
                    time: '11:11 AM',
                    blocks: [
                        {
                            at: 2400,
                            type: 'text',
                            text: '@Joey Done. The steps go on the sales, CS, and onboarding tools page, in a new "Customize your Zoom waiting room" section.',
                        },
                        {
                            at: 4400,
                            type: 'bullets',
                            items: [
                                'The how we work pages for CS, TAMs, and TAEs link to it, so there is one page to update.',
                                'The link to the videos folder is private, because the folder is internal.',
                            ],
                        },
                        {
                            at: 6600,
                            type: 'pr',
                            state: 'opened',
                            repo: 'PostHog/posthog.com',
                            number: 22187,
                            url: 'https://github.com/PostHog/posthog.com/pull/22187',
                        },
                    ],
                },
            ],
            summary:
                "A real request from PostHog's Slack, cut short: Joey shows a PostHog video in his Zoom waiting room, and asks PostHog to add the steps to the handbook for the rest of the team. PostHog adds a new section to the sales tools page, links it from three team pages, and opens a pull request.",
        },
    },
    {
        title: 'Add a photo to the handbook',
        label: '@PostHog the cafe section of the events page has no picture. Can you add this photo from our Madrid cafe event, with a caption?',
        scene: {
            channel: 'events',
            label: 'Real PR',
            endAt: 7600,
            messages: [
                {
                    from: 'person',
                    at: 600,
                    time: '11:03 AM',
                    name: 'Daniel Zaltsman',
                    text: '@PostHog the cafe section of the events page has no picture. Can you add this photo from our Madrid cafe event, with a caption?',
                    attachment: 'madrid-cafe.jpg',
                    reactedAt: 1300,
                },
                {
                    from: 'bot',
                    at: 1300,
                    time: '11:03 AM',
                    blocks: [
                        {
                            at: 2200,
                            type: 'plan',
                            steps: [
                                { label: 'Find the cafe section of the events page', doneAt: 3100 },
                                { label: 'Add the photo and a caption', doneAt: 4000 },
                                { label: 'Open a PR', doneAt: 4900 },
                            ],
                        },
                        {
                            at: 5100,
                            type: 'pr',
                            state: 'opened',
                            repo: 'PostHog/posthog.com',
                            number: 22171,
                            url: 'https://github.com/PostHog/posthog.com/pull/22171',
                        },
                        {
                            at: 5500,
                            type: 'text',
                            text: '@Daniel Done. The photo goes under the text about cafe event timing and cost.',
                        },
                    ],
                },
            ],
            summary:
                "A real request from PostHog's Slack, cut short: Daniel attaches a photo from a Madrid cafe event and asks PostHog to add it to the events handbook page. PostHog posts a plan, adds the photo and a caption, and opens a pull request.",
        },
    },
]

const Prompt = ({ text }: { text: string }) =>
    text.startsWith('@PostHog') ? (
        <>
            <span className="text-blue">@PostHog</span>
            {text.slice('@PostHog'.length)}
        </>
    ) : (
        <>{text}</>
    )

export default function ThreadDemo({
    demos = prompts,
    variant,
    placement = 'slack_page_workspace',
}: {
    demos?: Demo[]
    variant?: 'window' | 'thread'
    placement?: string
}): JSX.Element {
    const posthog = usePostHog()
    const [activeIndex, setActiveIndex] = useState(0)
    const [runId, setRunId] = useState(0)
    const [picked, setPicked] = useState(false)
    const windowRef = useRef<HTMLDivElement>(null)
    const shouldReduceMotion = useReducedMotion()

    const play = (index: number) => {
        setActiveIndex(index)
        setRunId((id) => id + 1)
    }

    const pick = (index: number, trigger: 'list' | 'channel') => {
        const { title, label } = demos[index]
        setPicked(true)
        play(index)
        // In one column, the window is below the prompts
        windowRef.current?.scrollIntoView({ block: 'nearest', behavior: shouldReduceMotion ? 'auto' : 'smooth' })
        posthog?.capture('ai_prompt_selected', { group: title, prompt: label, placement, trigger })
    }

    const nextIndex = (activeIndex + 1) % demos.length
    const { scene } = demos[activeIndex]
    const channels = variant === 'thread' ? undefined : demos.map((demo) => demo.scene.channel)
    const people = Array.from(
        new Set(
            demos.flatMap(
                ({
                    scene: {
                        messages: [first],
                    },
                }) => (first.from === 'person' ? [first.name] : [])
            )
        )
    ).sort()
    // The window is hidden from screen readers, so repeat the last PR link here
    const pr = scene.messages
        .flatMap((message) => (message.from === 'bot' ? message.blocks : []))
        .flatMap((block) => (block.type === 'pr' && block.url ? [block] : []))
        .at(-1)

    const slackWindow = (
        <div ref={windowRef} className={cn('min-w-0 scroll-mt-4', !channels && 'relative')}>
            {/* In two columns, the thread fills its column and doesn't make the row taller */}
            <div className={cn(!channels && '@2xl/reader-content:absolute @2xl/reader-content:inset-0')}>
                <SlackWindow
                    key={runId}
                    scene={scene}
                    variant={variant}
                    channels={channels}
                    people={people}
                    onSelectChannel={channels && ((channel) => pick(channels.indexOf(channel), 'channel'))}
                    onDone={picked ? undefined : () => play(nextIndex)}
                />
            </div>
        </div>
    )

    return (
        <div className="flex flex-col gap-4">
            {channels ? (
                slackWindow
            ) : (
                <div className="grid gap-x-8 gap-y-4 @2xl/reader-content:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                    <ul className="m-0 list-none p-0">
                        {demos.map(({ title, label, detail, Icon, color }, index) => {
                            const active = index === activeIndex
                            return (
                                <li key={title} className="border-b border-primary last:border-b-0">
                                    <button
                                        type="button"
                                        aria-pressed={active}
                                        onClick={() => pick(index, 'list')}
                                        className={cn(
                                            'flex w-full cursor-pointer flex-col border-0 bg-transparent py-4 text-left text-primary transition-opacity',
                                            active ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                                        )}
                                    >
                                        <span className="flex items-start gap-2 text-base font-bold leading-snug">
                                            {Icon && <Icon className={cn('mt-0.5 size-5 shrink-0', color)} />}
                                            <span>
                                                <Prompt text={label} />
                                            </span>
                                        </span>
                                        {detail && <span className="mt-1.5 text-sm text-secondary">{detail}</span>}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                    {slackWindow}
                </div>
            )}
            {pr?.url && (
                <Link to={pr.url} external className="sr-only text-sm font-semibold underline focus:not-sr-only">
                    Open {pr.repo}#{pr.number} on GitHub
                </Link>
            )}
        </div>
    )
}
