import { IconCopy } from '@posthog/icons'
import React, { useState } from 'react'

export default function CopyCode({ code }: { code: string }): JSX.Element {
    const [copied, setCopied] = useState(false)

    const copyCode = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1500)
    }
    return (
        <button onClick={copyCode} className="text-sm">
            {copied ? 'Copied!' : <IconCopy className="w-6 h-6" />}
        </button>
    )
}
