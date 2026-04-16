import React from 'react'
import Link from 'components/Link'

interface DemoCard {
    top: string
    bottom: string
}

const demoQuestions: DemoCard[] = [
    {
        top: 'What changed across my product this week?',
        bottom: 'Connect every data point to see the full picture',
    },
    {
        top: 'Find sessions where users got stuck',
        bottom: 'Summarize recordings and suggest next steps',
    },
    {
        top: 'Build a dashboard for onboarding retention',
        bottom: 'Build dashboards and insights from plain English',
    },
    {
        top: 'Analyze LLM token usage over the past 7 days',
        bottom: 'Build better AI products (how meta)',
    },
    {
        top: 'Find the most common user path from the blog',
        bottom: 'Analyze web traffic faster than you can say "I miss GA3"',
    },
    {
        top: "What's the right SQL syntax for this query?",
        bottom: 'Write and debug SQL queries (so you don\'t have to)',
    },
    {
        top: 'Find the top 10 orgs by number of active users',
        bottom: 'Join with external data sources for more context',
    },
    {
        top: 'How do I set up a feature flag?',
        bottom: 'Expert on using PostHog products',
    },
]

export default function TerminalDemo(): JSX.Element {
    return (
        <div className="space-y-6">
            <div className="mb-8">
                <p className="text-base text-[rgba(238,239,233,0.9)] mb-2">
                    Still building insights manually? <span className="text-[#F54E00]">Ew.</span>
                </p>
                <p className="text-sm text-[#666]">Let PostHog AI help.</p>
            </div>

            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">💡</span>
                <div className="text-sm text-[#666]">
                    <strong className="text-[rgba(238,239,233,0.9)]">Signed into PostHog?</strong>
                    <span className="ml-2">Click any question to launch PostHog AI.</span>
                </div>
            </div>

            <div className="space-y-4 max-w-4xl">
                {demoQuestions.map((card, idx) => {
                    const encodedQuestion = encodeURIComponent(
                        JSON.stringify({
                            conversationId: null,
                            query: card.top,
                        })
                    )
                    const url = `https://app.posthog.com/#panel=max:!${encodedQuestion}`

                    return (
                        <Link
                            key={idx}
                            to={url}
                            externalNoIcon
                            className="block group"
                        >
                            <div className="flex items-center gap-3 p-4 bg-[rgba(0,0,0,0.3)] border border-[#333] group-hover:border-[#00FF00] group-hover:bg-[rgba(0,255,0,0.05)]">
                                {/* Prompt indicator */}
                                <div className="text-[#00FF00] text-sm font-mono shrink-0">
                                    $
                                </div>

                                {/* Question with underline */}
                                <div className="flex-1 min-w-0">
                                    <div className="text-[rgba(238,239,233,0.9)] text-sm font-mono border-b border-dashed border-[#666] group-hover:border-[#00FF00] pb-1">
                                        {card.top}
                                    </div>
                                    <div className="text-[#666] text-sm mt-2 leading-relaxed">
                                        {card.bottom}
                                    </div>
                                </div>

                                {/* Go button */}
                                <div className="shrink-0">
                                    <div className="border border-[#00FF00] px-3 py-1 text-[#00FF00] text-[12px] font-mono group-hover:bg-[#00FF00] group-hover:text-[#151515]">
                                        [GO]
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
