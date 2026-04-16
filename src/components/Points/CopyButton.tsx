import React, { useState } from 'react'
import { IconCheck, IconCopy } from '@posthog/icons'

export default function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            disabled={copied}
            className={`${copied ? '' : 'active:top-[0.5px] active:scale-[.90]'} relative outline-none group`}
            onClick={handleCopy}
        >
            {copied ? (
                <IconCheck className="size-4 text-green" />
            ) : (
                <IconCopy className="size-4 text-muted group-hover:text-primary" />
            )}
        </button>
    )
}
