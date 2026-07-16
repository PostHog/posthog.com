import React, { useState } from 'react'
import { IconStack, IconDrag, IconPencil, IconTrash, IconStopFilled, IconCompass } from '@posthog/icons'

type Mode = 'steer' | 'queue'
type Scenario = { caption: string; message: string }

const MODES: Record<Mode, { verb: string; blurb: string; header: string; scenarios: Scenario[] }> = {
    steer: {
        verb: 'Steer',
        blurb: 'Correct course mid-task. Your message interrupts the running agent right away.',
        header: 'Interrupt the running agent',
        scenarios: [
            {
                caption: 'Reining it in when it goes bigger than you asked',
                message:
                    "wait, hold on — you're rewriting way more than i need. i just wanted the billing service to retry failed charges, not a refactor of the whole payment module. revert everything in payments/ and keep it scoped to billing. and use the retry helper in lib/retry instead of writing your own",
            },
        ],
    },
    queue: {
        verb: 'Queue',
        blurb: 'Stack up work and step away from your laptop. Each message fires when the one before it finishes.',
        header: 'queued',
        scenarios: [
            {
                caption: 'Kick off a Linear ticket before you step away',
                message: 'grab ENG-4021 — the invite email logo is a broken image, fix the template url',
            },
            {
                caption: 'Line up the next ticket to run unattended',
                message: 'then start ENG-4025, add a loading skeleton to the dashboard while insights are fetching',
            },
        ],
    },
}

/**
 * Interactive Steer vs. Queue explainer for the /code page. A mode toggle switches between the
 * two ways of directing a running agent, rendered inside a full-width recreation of the PostHog
 * Code task chat window (message stack + composer) instead of a screenshot.
 */
export function SteerQueueDemo(): JSX.Element {
    const [mode, setMode] = useState<Mode>('steer')
    const data = MODES[mode]

    return (
        <div>
            {/* Mode toggle + blurb */}
            <div className="mb-4 flex flex-col gap-3 @md:flex-row @md:items-center @md:justify-between">
                <div className="inline-flex rounded-md border border-primary bg-accent p-0.5" role="tablist">
                    {(['steer', 'queue'] as const).map((m) => {
                        const Icon = m === 'steer' ? IconCompass : IconStack
                        const selected = mode === m
                        return (
                            <button
                                key={m}
                                type="button"
                                role="tab"
                                aria-selected={selected}
                                onClick={() => setMode(m)}
                                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-semibold transition-colors ${
                                    selected ? 'bg-primary text-primary shadow-sm' : 'text-secondary hover:text-primary'
                                }`}
                            >
                                <Icon className="size-4" />
                                {MODES[m].verb}
                            </button>
                        )
                    })}
                </div>
                <p className="m-0 text-sm leading-relaxed text-secondary @md:max-w-md @md:text-right">{data.blurb}</p>
            </div>

            {/* Full-width task chat window */}
            <div data-scheme="secondary" className="rounded-lg border border-primary bg-primary p-3 shadow-xl">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-secondary">
                    <IconStack className="size-4" />
                    {mode === 'queue' ? `${data.scenarios.length} ${data.header}` : data.header}
                </div>

                {/* Message stack */}
                <div className="space-y-2">
                    {data.scenarios.map((scenario, i) => (
                        <div
                            key={scenario.caption}
                            className="flex items-start gap-3 rounded-md border border-primary bg-accent px-3 py-2.5"
                        >
                            <IconDrag className="mt-1 size-4 shrink-0 text-secondary" />
                            <div className="min-w-0 flex-1">
                                <p className="m-0 mb-0.5 text-xs font-medium text-secondary">{scenario.caption}</p>
                                <p className="m-0 text-primary">{scenario.message}</p>
                            </div>
                            <div className="mt-0.5 flex shrink-0 items-center gap-2 text-secondary">
                                {mode === 'steer' ? (
                                    <span className="hidden items-center gap-1 whitespace-nowrap text-sm @sm:flex">
                                        <span aria-hidden>↵</span>
                                        Steer
                                    </span>
                                ) : (
                                    <span className="hidden text-sm tabular-nums @sm:inline">#{i + 1}</span>
                                )}
                                <IconPencil className="size-4" />
                                <IconTrash className="size-4" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Composer input */}
                <div className="mt-2 rounded-md border-2 border-blue bg-accent px-3 py-2.5">
                    <p className="m-0 text-secondary">
                        Type a message…{' '}
                        <span className="opacity-70">@ to mention files, ! for bash mode, / for skills</span>
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-secondary">
                        <span className="font-semibold text-blue">Auto Mode ▾</span>
                        <span>Claude Sonnet 5 ▾</span>
                        <span>High ▾</span>
                        <span className="flex items-center gap-1 font-semibold text-primary">
                            <IconStack className="size-3.5" />
                            {mode === 'queue' ? `Queue (${data.scenarios.length})` : 'Steer'}
                        </span>
                        <span className="ml-auto flex size-5 items-center justify-center rounded bg-red text-white">
                            <IconStopFilled className="size-3" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SteerQueueDemo
