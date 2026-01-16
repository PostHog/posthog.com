import React, { useState } from 'react'
import { IconPresent, IconReceipt, IconBadge, IconCheck, IconCopy } from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import dayjs from 'dayjs'
import type { TransactionMetadata } from './types'
import Link from 'components/Link'

const transactionTypeIcons: Record<string, React.ReactNode> = {
    gift: <IconPresent className="size-5 text-purple" />,
    redemption: <IconReceipt className="size-5 text-red" />,
    achievement: <IconBadge className="size-5 text-yellow" />,
}

export default function TransactionTitle({
    type,
    metadata,
    date,
    link,
}: {
    type: string
    metadata?: TransactionMetadata
    date?: Date
    link?: {
        url: string
        label: string
    }
}) {
    const iconURL = metadata?.achievement?.iconURL as `https://res.cloudinary.com/${string}` | undefined
    const typeKey = type.toLowerCase().replace(/_/g, '')
    const fallbackIcon = transactionTypeIcons[typeKey]
    const isRedemption = typeKey === 'redemption'
    const description = metadata?.description || metadata?.redemption?.title || metadata?.achievement?.title
    const code = metadata?.redemption?.code

    const [showCode, setShowCode] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleCopyCode = async (e: React.MouseEvent) => {
        e.stopPropagation()
        if (code) {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="flex gap-2 items-center min-w-0">
            <span className="shrink-0 w-6 h-6 flex items-center justify-center mt-px">
                {iconURL ? (
                    <CloudinaryImage width={24} height={24} src={iconURL} className="w-full" />
                ) : fallbackIcon ? (
                    fallbackIcon
                ) : null}
            </span>
            <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-1 leading-none">
                    <p className="text-sm capitalize m-0 font-semibold truncate">
                        {type.replace(/_/g, ' ').toLowerCase()}
                    </p>
                    {link ? (
                        <Link
                            to={link.url}
                            className="text-xs text-red dark:text-yellow shrink-0 font-semibold"
                            state={{ newWindow: true }}
                        >
                            {link.label}
                        </Link>
                    ) : null}
                </div>
                <div className="flex items-baseline gap-1">
                    <p className="text-xs text-muted m-0 truncate">
                        <span className="text-primary">{description}</span>
                        {description && date && ' - '}
                        {date && dayjs(date).format('MMM D, YYYY')}
                    </p>

                    {isRedemption && code ? (
                        showCode ? (
                            <button
                                onClick={handleCopyCode}
                                className="inline-flex items-center gap-0.5 text-xs font-mono text-muted hover:text-primary transition-colors shrink-0 font-semibold group"
                            >
                                <span>{code}</span>
                                {copied ? (
                                    <IconCheck className="size-3 text-green" />
                                ) : (
                                    <IconCopy className="size-3 text-muted group-hover:text-primary" />
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setShowCode(true)
                                }}
                                className="text-xs text-muted hover:text-primary transition-colors shrink-0 font-semibold"
                            >
                                Show code
                            </button>
                        )
                    ) : null}
                </div>
            </div>
        </div>
    )
}
