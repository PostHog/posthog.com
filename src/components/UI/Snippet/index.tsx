import React from 'react'
import { cn } from '../../../utils'
import { CopyButton } from '../CopyButton'
import { focusRing, plainCode, toneBorder, toneFill, toneText } from '../styles'
import type { Tone } from '../styles'
import './styles.css'

export type SnippetTone = Tone

export type SnippetProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onCopy'> & {
    text: string | readonly string[]
    prompt?: boolean
    tone?: SnippetTone
    onCopy?: () => void
}

export type SnippetInlineProps = React.HTMLAttributes<HTMLElement> & {
    tone?: SnippetTone
}

const neutralSurface =
    'border-[rgb(var(--text-primary)/0.1)] bg-[rgb(var(--text-primary)/0.035)] shadow-[inset_0_1px_0_rgb(0_0_0/0.04)] dark:bg-black/20 dark:shadow-[inset_0_1px_0_rgb(0_0_0/0.3)]'

const brandSurface = 'border-yellow/25 bg-yellow/10 dark:border-yellow/30 dark:bg-yellow/20'

const brandText = 'text-[color:color-mix(in_srgb,theme(colors.orange-dark)_82%,theme(colors.brown))] dark:text-yellow'

function surfaceFor(tone: SnippetTone): string {
    if (tone === 'neutral') return neutralSurface
    if (tone === 'brand') return brandSurface
    return cn(toneFill[tone], toneBorder[tone])
}

function textFor(tone: SnippetTone): string {
    if (tone === 'neutral') return 'text-primary'
    if (tone === 'brand') return brandText
    return toneText[tone]
}

const Block = React.forwardRef<HTMLDivElement, SnippetProps>(function Snippet(
    { text, prompt = true, tone = 'neutral', onCopy, className, ...props },
    ref
) {
    const content = typeof text === 'string' ? text : text.join('\n')
    return (
        <div
            ref={ref}
            className={cn(
                'flex min-w-0 items-start gap-2 rounded-md border p-2',
                surfaceFor(tone),
                textFor(tone),
                className
            )}
            {...props}
        >
            <pre
                className={cn(
                    'm-0 min-w-0 flex-1 overflow-x-auto rounded-[3px] bg-transparent p-0 font-code text-[13px] leading-[26px] text-inherit',
                    focusRing
                )}
                tabIndex={0}
                role="region"
                aria-label="Code snippet"
            >
                <code className={cn(plainCode, 'text-inherit')}>
                    {content.split('\n').map((line, index) => (
                        <span className="block min-h-[26px]" key={index}>
                            {prompt && (
                                <span aria-hidden="true" className="select-none pr-3 opacity-50">
                                    $
                                </span>
                            )}
                            {line}
                        </span>
                    ))}
                </code>
            </pre>
            <span className="shrink-0">
                <CopyButton text={content} label="Copy snippet" size="sm" onCopy={onCopy} />
            </span>
        </div>
    )
})

const Inline = React.forwardRef<HTMLElement, SnippetInlineProps>(function SnippetInline(
    { tone = 'neutral', className, ...props },
    ref
) {
    return (
        <code
            ref={ref}
            {...props}
            className={cn(
                plainCode,
                'ui-snippet-inline inline rounded border px-1 py-px font-code font-medium not-italic [overflow-wrap:anywhere] [white-space:normal] [-webkit-box-decoration-break:clone] [box-decoration-break:clone] before:content-none after:content-none',
                surfaceFor(tone),
                textFor(tone),
                className
            )}
        />
    )
})

export const Snippet = Object.assign(Block, { Inline })
