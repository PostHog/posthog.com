import React, { useState } from 'react'
import { IconCheck, IconCopy } from '@posthog/icons'
import { useToast } from '../../context/Toast'
import { cn } from '../../utils'

export type CopyableCommandProps = {
    command: string
    className?: string
    /** Apply the wizard gradient text effect to the command */
    animate?: boolean
}

export function CopyableCommand({ command, className = '', animate = false }: CopyableCommandProps): JSX.Element {
    const { addToast } = useToast()
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(command)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1500)
        addToast({
            description: (
                <span className="inline-flex items-center gap-1.5">
                    <IconCheck className="size-4 text-green" />
                    Copied to clipboard
                </span>
            ),
            duration: 2000,
        })
    }

    const isMultiline = command.includes('\n')

    return (
        <div
            className={cn(
                'group flex items-start gap-2 bg-primary border border-primary rounded px-2 py-1.5',
                className
            )}
        >
            <pre className="flex-1 m-0 p-0 bg-transparent text-[13px] leading-[1.45] font-mono text-primary whitespace-pre-wrap break-all">
                <code className={cn('!bg-transparent !p-0 !border-0', animate && 'text-gradient-wizard')}>
                    {command}
                </code>
            </pre>
            <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy to clipboard"
                className={cn(
                    'shrink-0 inline-flex items-center justify-center size-5 rounded text-primary opacity-60 hover:opacity-100 cursor-pointer',
                    isMultiline ? 'self-start' : 'self-center'
                )}
            >
                {copied ? <IconCheck className="size-4 text-green" /> : <IconCopy className="size-4" />}
            </button>
        </div>
    )
}
