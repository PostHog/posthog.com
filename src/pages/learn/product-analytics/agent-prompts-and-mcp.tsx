import React from 'react'
import { IconTerminal } from '@posthog/icons'
import { SingleCodeBlock } from 'components/CodeBlock'
import Link from 'components/Link'
import WizardCommand from 'components/WizardCommand'
import LearnPage from 'components/PocketGuides/LearnPage'
import AgentTeachingActions, { AGENT_TEACHING_PROMPT } from 'components/PocketGuides/AgentTeachingActions'

const chapterPrompts = [
    {
        title: 'Events and properties',
        prompt: `Teach me PostHog events and properties using one interaction in my product. Explain autocapture, custom events, and useful properties. Help me design an event, predict its payload, and compare event counts with unique people.`,
    },
    {
        title: 'Identity and sessions',
        prompt: `Teach me PostHog identity and sessions using my product’s sign-in journey. Explain distinct_id, session IDs, identify, and reset. Help me trace anonymous and signed-in activity, including browser and server events, and spot an identity gap.`,
    },
    {
        title: 'Trends and funnels',
        prompt: `Teach me PostHog trends and funnels using a real feature and user journey in my product. Compare event counts with unique people, define a funnel and conversion window, and investigate a drop-off. Distinguish attempted actions from successful outcomes.`,
    },
]

const teachingPrompts = [
    { title: 'Start with your product', prompt: AGENT_TEACHING_PROMPT },
    ...chapterPrompts.map(({ title, prompt }) => ({
        title,
        prompt: `${prompt}

Use my code and PostHog data. Teach one concept at a time with a small exercise, and review my answer before continuing. Use https://posthog.com/docs/product-analytics.md as the source of truth.

Don’t change my project without asking. If context is missing, ask for it.`,
    })),
]

export default function ProductAnalyticsAgentTeaching(): JSX.Element {
    return (
        <LearnPage
            productHandle="product_analytics"
            title="Learn Product Analytics with your agent – PostHog"
            description="Use your coding agent to learn PostHog Product Analytics with examples from your own product and data."
        >
            <div className="not-prose flex min-w-0 flex-col gap-6">
                <div>
                    <div className="mb-3 flex items-center gap-3">
                        <IconTerminal className="size-6 shrink-0 text-purple" />
                        <h1 className="m-0 text-2xl font-bold">Learn Product Analytics with your agent</h1>
                    </div>
                    <h2 className="mt-0 mb-4 text-base font-medium text-secondary">
                        Learn with examples from your own product and data.
                    </h2>
                    <p className="m-0 leading-relaxed">
                        Start with a learning path for your product, or choose a Pocket Guide chapter below. Each prompt
                        uses your code and data to teach one concept at a time, with small exercises you can try.
                    </p>
                    <aside className="mt-6 leading-relaxed">
                        <p className="mt-0 mb-2">Before you start:</p>
                        <ul className="m-0 space-y-2 pl-5 marker:text-primary [&>li]:!list-disc">
                            <li>Open your product’s repository in your coding agent.</li>
                            <li>
                                Connect it to the{' '}
                                <Link
                                    to="/docs/model-context-protocol"
                                    state={{ newWindow: true }}
                                    className="text-primary underline"
                                >
                                    PostHog MCP server
                                </Link>{' '}
                                so it can read your event schema and query your project.
                            </li>
                            <li>
                                Not connected yet? Use the setup wizard:
                                <div className="mt-3">
                                    <WizardCommand command="mcp add" />
                                </div>
                            </li>
                        </ul>
                    </aside>
                </div>
                {teachingPrompts.map(({ title, prompt }) => (
                    <section key={title} className="min-w-0 border-t border-primary pt-6">
                        <h2 className="mt-0 mb-4 text-xl font-semibold">{title}</h2>
                        <div className="min-w-0 [&_.code-block]:mt-0 [&_.code-block_pre]:max-h-72 [&_.code-block_pre]:overflow-y-auto [&_.code-block_pre]:[scrollbar-width:none] [&_.code-block_pre::-webkit-scrollbar]:hidden [&_.min-w-fit]:min-w-0 [&_.whitespace-pre]:whitespace-pre-wrap [&_.whitespace-pre]:break-words">
                            <SingleCodeBlock
                                language="text"
                                label="Your teaching prompt"
                                showLabel
                                showCopy
                                showLineNumbers={false}
                                showAskAI={false}
                            >
                                {prompt}
                            </SingleCodeBlock>
                        </div>
                        <AgentTeachingActions prompt={prompt} />
                    </section>
                ))}
            </div>
        </LearnPage>
    )
}
