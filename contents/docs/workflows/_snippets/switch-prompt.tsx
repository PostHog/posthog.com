import React, { useState } from 'react'
import { IconCopy } from '@posthog/icons'
import OSButton from 'components/OSButton'

// The providers that the MCP's provider-import tools can move a team from
const providers = ['Resend', 'Postmark', 'SendGrid', 'Mailgun', 'Mailchimp', 'Customer.io']

export function CopyPrompt({ prompt }: { prompt: string }): JSX.Element {
    const [copied, setCopied] = useState(false)
    return (
        <div className="not-prose my-2 flex !mx-0 items-center gap-2 rounded-md border border-primary bg-accent px-3 py-2">
            <span className="flex-1 font-code text-sm">“{prompt}”</span>
            <OSButton
                size="sm"
                icon={<IconCopy />}
                onClick={() => navigator.clipboard?.writeText(prompt).then(() => setCopied(true))}
            >
                {copied ? 'Copied' : 'Copy'}
            </OSButton>
        </div>
    )
}

export default function SwitchPrompt(): JSX.Element {
    const [provider, setProvider] = useState(providers[0])
    return (
        <div className="not-prose my-4 max-w-xl !mx-0">
            <div className="mb-2 flex flex-wrap gap-1.5">
                {providers.map((p) => (
                    <button
                        key={p}
                        type="button"
                        aria-pressed={provider === p}
                        onClick={() => setProvider(p)}
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                            provider === p ? 'border-red bg-red text-white' : 'border-primary text-secondary'
                        }`}
                    >
                        {p}
                    </button>
                ))}
            </div>
            <CopyPrompt key={provider} prompt={`Move our email from ${provider} to PostHog.`} />
        </div>
    )
}
