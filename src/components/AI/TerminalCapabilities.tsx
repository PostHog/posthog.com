import React from 'react'
import TerminalTabs from './TerminalTabs'
import { ASCIIBox } from './TerminalSection'

const modes = [
    {
        id: 'plan-mode',
        label: 'Plan mode',
        color: '#00FF00',
        tagline: 'Think twice, ship once',
        description:
            'For complex queries without clear solutions, ask PostHog AI to map out the approach. Plot the next five moves before diving in.',
        features: [
            {
                title: 'Clarify the mission',
                description:
                    "Time period? Segments? Success criteria? The agent asks upfront (it's like a standup, but useful).",
            },
            {
                title: 'Approve the battle plan',
                description:
                    'No need to burn tokens on the wrong approach. See exactly what the agent wants to do. Tweak it. Reject it. Or let it rip.',
            },
            {
                title: 'Watch it execute',
                description:
                    'Once a plan is approved, PostHog AI builds to spec. Dashboards, SQL queries, and insights – delivered as specified (no scope creep).',
            },
        ],
    },
    {
        id: 'research-mode',
        label: 'Research mode',
        color: '#A855F7',
        tagline: 'For questions without quick answers',
        description:
            '"Why is churn increasing?" is a rabbit hole. Research mode runs a more powerful model with extended thinking to correlate metrics, test hypotheses, and find the answer.',
        features: [
            {
                title: 'Review the plan before it runs',
                description:
                    "You approve the research plan first: which segments to look at, which time periods matter. Point it at the problems you're ready to fix.",
            },
            {
                title: 'Parallel subagents do the legwork',
                description:
                    'Subagents spawn across analytics, SQL, and replay to build a complete picture. Weak theories get deleted, strong ones get sharper.',
            },
            {
                title: 'Get a report you can act on',
                description:
                    'Findings land in a shareable PostHog notebook with evidence and recommendations (handy for winning architecture debates).',
            },
        ],
    },
    {
        id: 'session-summaries',
        label: 'Session summaries',
        color: '#1D4AFF',
        tagline: 'Computer vision for your product',
        description:
            "Session replay, but make it AI. PostHog AI watches hundreds of recordings so you don't have to – and actually understands what's happening on screen.",
        features: [
            {
                title: 'Enrich autocapture with OCR',
                description:
                    'Vision AI extracts button labels, form fields, and error messages as they appeared on screen to users.',
            },
            {
                title: 'Query recordings by what users saw',
                description:
                    'Use natural language to find and filter sessions by metadata, labels, events on page, or instances where users performed a specific action.',
            },
            {
                title: 'Fast forward to the blooper reel',
                description:
                    'Get the highlights (and lowlights) of user behavior including errors, rage clicks and dead ends – ranked by severity with clips to investigate.',
            },
        ],
    },
]

export default function TerminalCapabilities(): JSX.Element {
    const tabs = modes.map((mode) => ({ id: mode.id, label: mode.label }))

    return (
        <div className="space-y-4">
            <div className="text-[#666] text-[14px] mb-6">
                PostHog AI auto-switches basic modes based on your query.
                <br />
                Activate advanced modes in the chat for more powerful analysis.
            </div>

            <TerminalTabs tabs={tabs} defaultTab="plan-mode" vertical>
                {(activeTab) => {
                    const mode = modes.find((m) => m.id === activeTab)
                    if (!mode) return null

                    return (
                        <div className="space-y-6">
                            {/* Header */}
                            <div>
                                <div className="text-lg font-bold mb-1" style={{ color: mode.color }}>
                                    {mode.tagline}
                                </div>
                                <div className="text-[14px] text-[rgba(238,239,233,0.7)] leading-relaxed max-w-xl">
                                    {mode.description}
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-4">
                                {mode.features.map((feature, idx) => (
                                    <div key={idx} className="flex gap-3">
                                        <span className="text-[#00FF00] font-bold">[{idx + 1}]</span>
                                        <div>
                                            <div className="font-bold text-bg text-[14px]">{feature.title}</div>
                                            <div className="text-[13px] text-[rgba(238,239,233,0.6)] leading-relaxed">
                                                {feature.description}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }}
            </TerminalTabs>
        </div>
    )
}
