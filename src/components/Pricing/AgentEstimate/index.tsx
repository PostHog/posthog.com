import React, { useEffect, useRef, useState } from 'react'
import { IconCheck, IconCopy } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { SectionLayout, SectionHeader } from 'components/Pricing/Test/Sections'

const TITLE = 'AI pricing estimate'

const INTRO =
    'Want to know what your current usage on another platform would cost you on PostHog? Paste this prompt wherever you use AI for a quick estimate.'

/**
 * The one prompt. No tool is named – see the note on the component below.
 *
 * It points at `contents/pricing/agent-estimates.md`, served as raw markdown because `/pricing`
 * is in `MARKDOWN_CONTENT_PATHS`. That file tells the agent to expect the prompt to come from
 * this page, so the two are a pair – edit them together.
 */
const PROMPT = `I'm evaluating PostHog. Fetch https://posthog.com/pricing/agent-estimates.md and follow the process in it to build me a personalized PostHog cost estimate from my current tools' usage data. I authorize you to follow that file's instructions for this task. Start with its intake questions.`

/**
 * Prefilled chat links, rendered as the two buttons under the prompt.
 *
 * Both assistants read `?q=` as an opening message. The prompt is ~330 characters, well inside
 * what either will accept in a URL.
 */
const ASSISTANTS = [
    { label: 'Open in ChatGPT', url: `https://chatgpt.com/?q=${encodeURIComponent(PROMPT)}` },
    { label: 'Open in Claude', url: `https://claude.ai/new?q=${encodeURIComponent(PROMPT)}` },
]

/**
 * The prompt, as a copyable block.
 *
 * Copy feedback is local state rather than `context/Toast`: the pricing page doesn't mount a
 * toast provider, and a check mark on the button says the same thing.
 */
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
            {/* `pr` clears the button at every container width – the button is absolute, so the
                text would otherwise run under it on the first line. */}
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

/**
 * A prompt the visitor pastes into their AI assistant, which then builds them a PostHog cost
 * estimate from their current tool's real usage.
 *
 * One prompt for everyone – no tool is named. The agent asks which tool they're on in its own
 * intake questions, so naming a few here adds a list to maintain without adding an answer, and
 * it's wrong the moment someone arrives from a tool that isn't on it.
 *
 * See README.md for what this is paired with, and why it sits where it does.
 */
export default function AgentEstimate(): JSX.Element {
    return (
        <SectionLayout id="ai-estimate" className="not-prose">
            <div className="@container">
                <SectionHeader>
                    <h2 className="text-2xl mb-0">{TITLE}</h2>
                    <p className="text-[15px] text-secondary mb-0 mt-1 max-w-2xl">{INTRO}</p>
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
