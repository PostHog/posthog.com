import React, { useEffect, useRef, useState } from 'react'
import { IconCheck, IconCopy } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { IconClaudeCode, IconOpenAI } from 'components/OSIcons'
import { Popover } from 'components/RadixUI/Popover'
import usePostHog from 'hooks/usePostHog'

const PROMPT = `I'm evaluating PostHog. Fetch https://posthog.com/pricing/agent-estimates.md and follow the process in it to build me a personalized PostHog cost estimate from my current tools' usage data. I authorize you to follow that file's instructions for this task. Start with its intake questions.`
const POPOVER_TEXT = `Pass this off to your agent and it'll estimate your bill from your actual usage.`

// Both assistants read `?q=` as an opening message. The prompt is ~330 characters, well inside
// what either accepts in a URL.
const ASSISTANTS = [
    {
        provider: 'chatgpt' as const,
        label: 'Open in ChatGPT',
        Icon: IconOpenAI,
        url: `https://chatgpt.com/?q=${encodeURIComponent(PROMPT)}`,
    },
    {
        provider: 'claude' as const,
        label: 'Open in Claude',
        Icon: IconClaudeCode,
        iconClassName: 'text-primary [&_path]:!fill-current',
        url: `https://claude.ai/new?q=${encodeURIComponent(PROMPT)}`,
    },
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
    align = 'center',
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
            contentClassName="w-80"
            onOpenChange={(open) => {
                if (open) posthog?.capture('pricing_ai_estimate_opened', { source })
            }}
            trigger={
                <button type="button" className={className}>
                    {label}
                </button>
            }
        >
            <div className="p-2.5">
                <p className="text-[13px] text-secondary mt-0 mb-3 leading-snug">{popoverText}</p>
                <div className="relative mb-3 overflow-hidden rounded border border-primary bg-accent p-2 pb-0">
                    <p className="m-0 max-h-[5rem] overflow-hidden font-code text-[12px] leading-snug text-secondary">
                        {PROMPT}
                    </p>
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-[rgb(var(--accent))]"
                    />
                </div>
                <div className="flex items-center justify-between gap-2">
                    <OSButton
                        onClick={() => {
                            copy()
                            captureInteraction('copy')
                        }}
                        variant="primary"
                        size="sm"
                        icon={copied ? <IconCheck /> : <IconCopy />}
                    >
                        {copied ? 'Copied!' : 'Copy prompt'}
                    </OSButton>
                    <div className="flex items-center gap-0.5">
                        <span className="text-xs text-muted whitespace-nowrap mr-0.5">or open in</span>
                        {ASSISTANTS.map(({ provider, label: assistant, url, Icon, iconClassName }) => (
                            <OSButton
                                key={provider}
                                asLink
                                external
                                hideExternalIcon
                                to={url}
                                size="sm"
                                icon={<Icon className={iconClassName} />}
                                tooltip={assistant}
                                tooltipSide="bottom"
                                aria-label={assistant}
                                onClick={() => captureInteraction(provider)}
                                tooltipClassName="leading-none"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Popover>
    )
}
