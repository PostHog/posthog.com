import React from 'react'
import { IconCopy, IconChevronRight, IconCheck, IconArrowUpRight } from '@posthog/icons'
import useCloud from 'hooks/useCloud'
import { useToast } from '../../context/Toast'
import Link from 'components/Link'
import ZoomHover from 'components/ZoomHover'

export default function WizardCommand({
    className = '',
    latest = true,
    slim = false,
}: {
    className?: string
    latest?: boolean
    slim?: boolean
}): JSX.Element {
    const cloud = useCloud()
    const { addToast } = useToast()
    const code = `npx @posthog/wizard${latest ? '@latest' : ''}${cloud ? ` --region ${cloud}` : ''}`

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
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

    return (
        <div className="inline-flex flex-col not-prose">
            <ZoomHover size="lg">
                <button
                    onClick={handleCopy}
                    className={`group inline-flex items-center gap-2 bg-dark text-white font-mono text-sm pl-3 pr-3 py-2.5 rounded-md cursor-pointer border-0 dark:border border-secondary ${
                        !slim ? 'relative z-10' : ''
                    } ${className}`}
                >
                    <IconChevronRight className="size-4 opacity-50" />
                    <code className="!bg-transparent !p-0 !border-0 mr-1 text-white dark:text-yellow">{code}</code>
                    <IconCopy className="size-4 opacity-60 group-hover:opacity-80" />
                </button>
            </ZoomHover>
            {!slim && (
                <Link
                    to="/wizard"
                    state={{ newWindow: true }}
                    className="group relative -top-2 flex gap-px justify-center items-center pt-3 pr-2 pl-5 pb-1 text-xs text-secondary hover:text-primary mx-1.5 border-b border-x border-primary bg-accent/50 hover:bg-hover/100 rounded-b-md text-center"
                >
                    Learn more
                    <IconArrowUpRight className="invisible group-hover:visible inline-block size-3 opacity-75 relative" />
                </Link>
            )}
        </div>
    )
}
