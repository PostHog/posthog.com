import React from 'react'
import TerminalTabs from './TerminalTabs'
import { wrapText } from './TerminalSection'

interface PersonaFeature {
    title: string
    description: string
}

interface Persona {
    role: string
    title: string
    description: string
    features: PersonaFeature[]
}

const personas: Record<string, Persona> = {
    founders: {
        role: 'Founders',
        title: 'Move fast and break (fewer) things',
        description:
            'PostHog AI surfaces issues hiding in session recordings and error logs so you know about issues without users having to report them.',
        features: [
            {
                title: 'Get a technical co-founder that never sleeps',
                description: 'Query your data in natural language and get insights instantaneously.',
            },
            {
                title: 'See the patterns hiding in product data',
                description:
                    "PostHog AI analyzes user behavior, surfaces the 'aha,' and helps write the playbook for what to build next.",
            },
        ],
    },
    'product-engineers': {
        role: 'Product Engineers',
        title: 'Analyze product usage data where it lives',
        description: "PostHog is AI-native, so there's no need to copy/paste or export data to third-party AI tools.",
        features: [
            {
                title: 'Context-aware',
                description:
                    "Whether you're deep in a dashboard or dissecting a session, PostHog AI understands what you're looking at and responds in context.",
            },
            {
                title: 'See how PostHog AI thinks',
                description:
                    'Follow along with the chain of thought as your answer is generated. Click through to debug when the AI gets it wrong (and it will sometimes). Every decision links to something you can verify.',
            },
        ],
    },
    'product-managers': {
        role: 'Product Managers',
        title: 'From problem to plan – without the PRD',
        description: "PostHog AI pinpoints friction and helps ship an experiment before anyone utters 'PRD'.",
        features: [
            {
                title: 'Run your own experiments',
                description:
                    'Set up A/B tests, analyze results, iterate by asking in natural language. PostHog AI is your thought partner in crime.',
            },
            {
                title: '10x your investigation speed',
                description:
                    'Answer questions like, "Why did sign-ups drop?", "Is NPS trending positive?", or "What\'s my retention by acquisition channel?" – all without getting bogged down by taxonomy.',
            },
        ],
    },
    'growth-marketers': {
        role: 'Growth / Marketers',
        title: 'Bring data to the design debate',
        description: 'Get answers with PostHog AI – no engineering degree required.',
        features: [
            {
                title: 'Build dashboards and insights by describing them',
                description:
                    'PostHog AI combines context clues across your product to answer questions like, "Which landing pages are highest converting?" or the classic, "Which shade of blue do users like best?"',
            },
            {
                title: 'Know what your users really think',
                description:
                    'PostHog AI summarizes sentiment, common themes, and must-fix issues from thousands of session recordings and survey responses.',
            },
        ],
    },
    'data-analysts': {
        role: 'Data Analysts',
        title: 'Automate the boring stuff, answer harder questions',
        description: 'Skip the tedious asks and focus on signals that can make a bigger impact.',
        features: [
            {
                title: 'Analyze at a greater magnitude',
                description:
                    'PostHog AI digs through data at scale to surface patterns and larger problems worth investigating.',
            },
            {
                title: 'Save countless hours from "quick questions"',
                description:
                    'Skip the time sink of common analysis requests. PostHog AI offers teammates a way to self-serve the data instead.',
            },
        ],
    },
}

const asciiArt: Record<string, string> = {
    founders: '👤',
    'product-engineers': '⚙️',
    'product-managers': '📊',
    'growth-marketers': '📈',
    'data-analysts': '📉',
}

export default function TerminalPersonas(): JSX.Element {
    const tabs = Object.entries(personas).map(([key, persona]) => ({
        id: key,
        label: persona.role,
    }))

    return (
        <div className="space-y-4">
            <div className="text-lg mb-6">
                <span className="text-[rgba(238,239,233,0.9)]">What PostHog AI can do for </span>
                <span className="text-[#F54E00] font-bold">[YOU]</span>
            </div>

            <TerminalTabs tabs={tabs} vertical>
                {(activeTab) => {
                    const persona = personas[activeTab]
                    if (!persona) return null

                    return (
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="mb-8">
                                <div className="text-4xl mb-4">{asciiArt[activeTab]}</div>
                                <h3 className="text-[#F1A82C] text-xl font-bold mb-2">{persona.title}</h3>
                                <p className="text-sm text-[rgba(238,239,233,0.8)] leading-relaxed">
                                    {persona.description}
                                </p>
                            </div>

                            {/* Features */}
                            <div className="space-y-6">
                                {persona.features.map((feature, idx) => (
                                    <div key={idx} className="pl-4 border-l-2 border-[#1D4AFF] space-y-2">
                                        <div className="text-[#1D4AFF] text-sm font-bold">
                                            [{idx + 1}] {feature.title}
                                        </div>
                                        <div className="text-[14px] text-[rgba(238,239,233,0.8)] leading-relaxed">
                                            {feature.description}
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
