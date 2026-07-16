import React, { useRef, useState } from 'react'
import { IconCheck, IconCopy } from '@posthog/icons'
import { useToast } from '../../context/Toast'
import { cn } from '../../utils'
import { useCopyConfettiZIndex, fireCopyConfetti } from './confetti'

export type CopyableCommandProps = {
    command: string
    /** Clipboard override: when set, this is copied instead of `command` (display still shows `command`). */
    copyCommand?: string
    className?: string
    /** Apply the wizard gradient text effect to the command */
    animate?: boolean
}

export function CopyableCommand({
    command,
    copyCommand,
    className = '',
    animate = false,
}: CopyableCommandProps): JSX.Element {
    const { addToast } = useToast()
    const confettiZIndex = useCopyConfettiZIndex()
    const copyButtonRef = useRef<HTMLButtonElement>(null)
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(copyCommand ?? command)
        setCopied(true)
        fireCopyConfetti(copyButtonRef.current, confettiZIndex)
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
            <pre
                className={cn(
                    'flex-1 min-w-0 m-0 p-0 bg-transparent text-[13px] leading-[1.45] font-mono text-primary',
                    // Single-line commands scroll horizontally (no wrap) with a hidden scrollbar and a
                    // right-edge fade so long commands don't run into the copy button. The fade only
                    // visually bites when the text actually overflows (short commands end before it).
                    // Multiline snippets (e.g. JSON MCP configs) keep wrapping so newlines aren't collapsed.
                    isMultiline
                        ? 'whitespace-pre-wrap break-all'
                        : 'overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,#000_calc(100%-2rem),transparent)] [-webkit-mask-image:linear-gradient(to_right,#000_calc(100%-2rem),transparent)]'
                )}
            >
                <code className={cn('!bg-transparent !p-0 !border-0', animate && 'text-gradient-wizard')}>
                    {command}
                </code>
            </pre>
            <span
                className={cn(
                    'inline-flex shrink-0 items-center justify-center',
                    isMultiline ? 'self-start' : 'self-center'
                )}
            >
                <button
                    ref={copyButtonRef}
                    type="button"
                    onClick={handleCopy}
                    aria-label="Copy to clipboard"
                    className={cn(
                        'inline-flex items-center justify-center size-5 rounded text-primary opacity-60 hover:opacity-100 cursor-pointer'
                    )}
                >
                    {copied ? <IconCheck className="size-4 text-green" /> : <IconCopy className="size-4" />}
                </button>
            </span>
        </div>
    )
}
