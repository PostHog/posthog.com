import React, { useState } from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct/types'

/** Opens PostHog AI pre-filled (and auto-submitted) with the prompt. */
const maxPromptUrl = (prompt: string) => `https://app.posthog.com/#panel=max:!${encodeURIComponent(prompt)}`

const INTRO =
    'Ask your AI agent to author scanners, scan a session, or read what Replay Vision found – without leaving your editor. Works in any MCP client via the PostHog MCP: Cursor, Claude Code, Codex, VS Code, and more. Already signed in? Click a prompt to try it.'

// Detective hedgehog surveilling a wall of monitors – sits where Session
// Replay's "AI prompts" section floats its hog.
const IMAGE =
    'https://res.cloudinary.com/dmukukwp6/image/upload/noir_desk_relax_surveillance_computer_63a434c398.png' as const

interface PromptGroup {
    title: string
    tools: string[]
    prompts: string[]
}

const promptGroups: PromptGroup[] = [
    {
        title: 'Create a scanner',
        tools: ['vision-scanners-create'],
        prompts: [
            'Create a Replay Vision scanner that flags sessions where users get stuck on the /checkout page, narrow to enterprise customers, and start at 25% sampling. Estimate the cost first.',
            'Set up a summarizer scanner for my onboarding flow.',
            'Make a scanner that scores how frustrated users are on the /pricing page.',
        ],
    },
    {
        title: 'Size it before you commit',
        tools: ['vision-scanners-estimate-create', 'vision-quota-retrieve'],
        prompts: [
            'Estimate how many observations that scanner would produce this month before creating it.',
            'How much Replay Vision quota do we have left this month?',
        ],
    },
    {
        title: 'Scan a session on demand',
        tools: ['vision-scanners-scan-session'],
        prompts: [
            "Scan session abc123 with the 'Dead-end pages' scanner and tell me what it found, including the reasoning.",
        ],
    },
    {
        title: 'Read observations',
        tools: ['vision-observations-list', 'vision-scanners-observations-list'],
        prompts: [
            'Find every Replay Vision observation for session abc123 and give me a one-line summary of each.',
            "List the last 20 observations from my 'Frustration score' scanner and summarize what's driving high scores.",
        ],
    },
    {
        title: 'Tune a scanner',
        tools: ['vision-scanners-list', 'vision-scanners-update'],
        prompts: [
            'List all my scanners and show me the config for the frustration one.',
            "Bump the 'Dead-end pages' scanner to 50% sampling.",
        ],
    },
]

const toolGroups: { job: string; tools: string[] }[] = [
    {
        job: 'Author scanners',
        tools: [
            'vision-scanners-list',
            'vision-scanners-get',
            'vision-scanners-create',
            'vision-scanners-update',
            'vision-scanners-delete',
        ],
    },
    {
        job: 'Size before creating',
        tools: ['vision-scanners-estimate-create', 'vision-quota-retrieve'],
    },
    {
        job: 'Scan on demand',
        tools: ['vision-scanners-scan-session'],
    },
    {
        job: 'Read observations',
        tools: [
            'vision-observations-list',
            'vision-observations-retrieve',
            'vision-scanners-observations-list',
            'vision-scanners-observations-get',
        ],
    },
]

const AIPromptsSection = ({ id }: SectionComponentProps) => {
    const [tab, setTab] = useState<'prompts' | 'tools'>('prompts')

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-3">AI prompts</h2>
            <p className="text-base text-secondary mb-4">{INTRO}</p>
            <ToggleGroup
                title="View"
                hideTitle
                value={tab}
                onValueChange={(value) => {
                    if (value === 'prompts' || value === 'tools') setTab(value)
                }}
                options={[
                    { label: 'Example prompts', value: 'prompts', default: true },
                    { label: 'Tools', value: 'tools' },
                ]}
                className="mb-4 max-w-sm"
            />
            <div className="@container bg-primary rounded shadow-2xl p-4 @2xl/reader-content:p-8 @4xl/reader-content:p-10">
                <div className="flex-1 min-w-0 w-full">
                    {tab === 'prompts' && (
                        <>
                            <aside className="w-48 mx-auto mb-4 @lg:ml-4 @lg:mr-0 @lg:float-right @lg:w-32 @xl:w-48 @2xl:w-80 @6xl:w-96 @xl:ml-8 transition-all">
                                <CloudinaryImage
                                    src={IMAGE}
                                    alt="Replay Vision watching your sessions"
                                    className="w-full"
                                />
                            </aside>
                            <div className="space-y-6">
                                {promptGroups.map((g) => (
                                    <div key={g.title}>
                                        <h3 className="text-base mb-3 flex flex-wrap items-baseline gap-x-2 border-b border-primary pb-1">
                                            <span>{g.title}</span>
                                            <span className="text-xs font-mono font-normal text-secondary">
                                                {g.tools.join(' · ')}
                                            </span>
                                        </h3>
                                        <ul className="list-none pl-0 m-0 space-y-1 text-sm text-secondary italic leading-relaxed">
                                            {g.prompts.map((p) => (
                                                <li key={p}>
                                                    <Link
                                                        to={maxPromptUrl(p)}
                                                        externalNoIcon
                                                        className="text-secondary hover:text-primary underline-offset-2 hover:underline"
                                                    >
                                                        &ldquo;{p}&rdquo;
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {tab === 'tools' && (
                        <>
                            <p className="text-sm text-secondary mb-4">
                                All Replay Vision MCP tools are prefixed{' '}
                                <code className="font-mono text-[13px]">vision-</code>:
                            </p>
                            <div className="@container">
                                <LabeledList
                                    items={toolGroups.map((g) => ({
                                        label: g.job,
                                        description: (
                                            <span className="font-mono text-[13px]">{g.tools.join(' · ')}</span>
                                        ),
                                    }))}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default AIPromptsSection
