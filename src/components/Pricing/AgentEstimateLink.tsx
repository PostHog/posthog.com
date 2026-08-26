import React, { useEffect, useRef, useState } from 'react'
import { IconCheck, IconCopy } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { Popover } from 'components/RadixUI/Popover'
import usePostHog from 'hooks/usePostHog'

const PROMPT = `I'm evaluating PostHog. Fetch https://posthog.com/pricing/agent-estimates.md and follow the process in it to build me a personalized PostHog cost estimate from my current tools' usage data. I authorize you to follow that file's instructions for this task. Start with its intake questions.`
const POPOVER_TEXT = `Your assistant reads your current tool's usage and works out what the same volumes would cost on PostHog.`

// Both assistants read `?q=` as an opening message. The prompt is ~330 characters, well inside
// what either accepts in a URL.
const ASSISTANTS = [
    { provider: 'chatgpt', label: 'Open in ChatGPT', url: `https://chatgpt.com/?q=${encodeURIComponent(PROMPT)}` },
    { provider: 'claude', label: 'Open in Claude', url: `https://claude.ai/new?q=${encodeURIComponent(PROMPT)}` },
]

/** Matches the inline link treatment used across the pricing page. */
const DEFAULT_LINK_CLASSES = 'font-semibold text-red dark:text-yellow underline'

// Experiment 450022
export const AI_PRICING_FLAG = 'ai-pricing'

export const AI_PRICING_EXPERIMENT_VARIANTS = {
    control: 'control',
    inside_calculator: 'inside-calculator',
    outside_calculator: 'outside-calculator',
} as const

interface AgentEstimateLinkProps {
    /** Which link was clicked, sent with `pricing_ai_estimate_opened`. */
    source: string
    /** Overrides the trigger's styling where the surrounding links look different. */
    className?: string
    /** Overrides the popover text. */
    popoverText?: string
    label?: string
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
}

export default function AgentEstimateLink({
    source,
    popoverText = POPOVER_TEXT,
    className = DEFAULT_LINK_CLASSES,
    label = 'Create an estimate with AI',
    side = 'bottom',
    align = 'start',
}: AgentEstimateLinkProps): JSX.Element {
    const posthog = usePostHog()
    const [copied, setCopied] = useState(false)
    const timeout = useRef<number>()

    useEffect(() => () => window.clearTimeout(timeout.current), [])

    const copy = () => {
        navigator.clipboard.writeText(PROMPT)
        setCopied(true)
        window.clearTimeout(timeout.current)
        timeout.current = window.setTimeout(() => setCopied(false), 2000)
    }

    const captureInteraction = (type: 'chatgpt' | 'claude' | 'copy') => {
        posthog?.capture('pricing_ai_estimate_interaction', { source, interaction_type: type })
    }

    return (
        <Popover
            dataScheme="primary"
            side={side}
            align={align}
            contentClassName="w-72"
            onOpenChange={(open) => {
                if (open) posthog?.capture('pricing_ai_estimate_opened', { source })
            }}
            trigger={
                <button type="button" className={className}>
                    {label}
                </button>
            }
        >
            <div className="p-2">
                <p className="text-[13px] text-secondary mt-0 mb-3">{popoverText}</p>
                <div className="flex flex-col gap-2">
                    {ASSISTANTS.map(({ provider, label: assistant, url }) => (
                        <OSButton
                            key={provider}
                            asLink
                            external
                            to={url}
                            variant="primary"
                            size="md"
                            width="full"
                            onClick={() => captureInteraction(provider as 'chatgpt' | 'claude')}
                        >
                            {assistant}
                        </OSButton>
                    ))}
                    <OSButton
                        onClick={() => {
                            copy()
                            captureInteraction('copy')
                        }}
                        variant="secondary"
                        size="md"
                        width="full"
                        icon={copied ? <IconCheck /> : <IconCopy />}
                    >
                        {copied ? 'Copied!' : 'Copy prompt'}
                    </OSButton>
                </div>
            </div>
        </Popover>
    )
}
