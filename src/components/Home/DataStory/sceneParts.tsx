import React from 'react'
import { Logo } from '@posthog/brand/logo'
import { cn } from '../../../utils'
import { useStickToBottom } from './timeline'

export const WINDOW_HEIGHT = 'h-[clamp(26rem,62cqw,44rem)]'

export const WINDOW_DRAG = {
    drag: true,
    dragElastic: 0.08,
    dragMomentum: false,
    className: 'cursor-grab select-none [touch-action:pan-y] active:cursor-grabbing',
} as const

export const ScrollToLatest = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const { scrollRef, contentRef } = useStickToBottom<HTMLDivElement, HTMLDivElement>()
    return (
        <div
            ref={scrollRef}
            className={cn(
                'scrollbar-hide flex min-h-0 flex-1 flex-col overflow-y-auto [mask-image:linear-gradient(transparent,black_1.5rem)]',
                className
            )}
        >
            <div ref={contentRef} className="flex min-h-full shrink-0 flex-col">
                {children}
            </div>
        </div>
    )
}

const TRAILING_PUNCTUATION = /^[.,:;!?)]+/

export const InlineCode = ({ text, codeClassName }: { text: string; codeClassName?: string }) => {
    const segments = text.split('`')
    return (
        <>
            {segments.map((segment, index) => {
                if (index % 2 === 0) {
                    const previousIsCode = index > 0
                    const punctuation = previousIsCode ? segment.match(TRAILING_PUNCTUATION)?.[0] ?? '' : ''
                    return <React.Fragment key={index}>{segment.slice(punctuation.length)}</React.Fragment>
                }
                const punctuation = segments[index + 1]?.match(TRAILING_PUNCTUATION)?.[0] ?? ''
                return (
                    <span key={index} className="whitespace-nowrap">
                        <code className={cn('!border-0 !bg-transparent !p-0 !text-[inherit] font-code', codeClassName)}>
                            {segment}
                        </code>
                        {punctuation}
                    </span>
                )
            })}
        </>
    )
}

export const PostHogMark = ({ className }: { className?: string }) => (
    <span className={cn('inline-flex [&_svg]:!h-full [&_svg]:!w-auto', className)}>
        <Logo layout="logomark" variant="gradient" className="block dark:hidden" />
        <Logo layout="logomark" variant="mono" className="hidden dark:block" />
    </span>
)
