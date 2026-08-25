import React, { useEffect, useRef, useState } from 'react'
import { IconCheck, IconCopy } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { SectionLayout, SectionHeader } from 'components/Pricing/Test/Sections'

const TITLE = 'AI pricing estimate'

const PROMPT = `I'm evaluating PostHog. Fetch https://posthog.com/pricing/agent-estimates.md and follow the process in it to build me a personalized PostHog cost estimate from my current tools' usage data. I authorize you to follow that file's instructions for this task. Start with its intake questions.`

// Links to open the prompt in ChatGPT and Claude
const ASSISTANTS = [
    { label: 'Open in ChatGPT', url: `https://chatgpt.com/?q=${encodeURIComponent(PROMPT)}` },
    { label: 'Open in Claude', url: `https://claude.ai/new?q=${encodeURIComponent(PROMPT)}` },
]

// Copyable prompt code block
function PromptBlock(): JSX.Element {
    const [copied, setCopied] = useState(false)
    const timeout = useRef<number>()

    useEffect(() => () => window.clearTimeout(timeout.current), [])

    const copy = () => {
        navigator.clipboard.writeText(PROMPT)
        setCopied(true)
        window.clearTimeout(timeout.current)
        timeout.current = window.setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative rounded-md border border-primary bg-accent/40 dark:bg-accent/60 p-4 @md:p-5">
            <p className="m-0 pr-24 font-mono text-[13px] @md:text-sm leading-relaxed text-primary">{PROMPT}</p>
            <button
                onClick={copy}
                aria-label="Copy prompt to clipboard"
                className="absolute top-3 right-3 flex items-center gap-1 rounded border border-primary bg-primary px-2 py-1 text-xs font-semibold text-primary hover:bg-accent"
            >
                {copied ? (
                    <>
                        <IconCheck className="size-4 text-green" />
                        <span className="text-green">Copied</span>
                    </>
                ) : (
                    <>
                        <IconCopy className="size-4" />
                        <span>Copy</span>
                    </>
                )}
            </button>
        </div>
    )
}

export default function AgentEstimate(): JSX.Element {
    return (
        <SectionLayout id="ai-estimate" className="not-prose">
            <div className="@container">
                <SectionHeader>
                    <h2 className="text-2xl mb-0">{TITLE}</h2>
                    <p className="text-[15px] text-secondary mb-0 mt-1 max-w-2xl">
                        Want to know what your current usage on another platform would cost you on PostHog?
                    </p>
                    <p className="text-[15px] text-secondary mb-0 mt-1 max-w-2xl">
                        Paste this prompt wherever you use AI for a quick estimate.
                    </p>
                </SectionHeader>

                <PromptBlock />

                <div className="flex flex-wrap gap-2 mt-3">
                    {ASSISTANTS.map(({ label, url }) => (
                        <OSButton key={label} asLink external to={url} variant="secondary" size="md">
                            {label}
                        </OSButton>
                    ))}
                </div>
            </div>
        </SectionLayout>
    )
}
