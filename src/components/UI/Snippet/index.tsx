import React from 'react'
import { cn } from '../../../utils'
import { CopyButton } from '../CopyButton'
import type { CopyButtonActions } from '../CopyButton'
import { globalToastManager } from '../Toast'
import { focusRing, plainCode } from '../styles'
import { colorOpaque, colorText } from '../colors'
import type { ColorName } from '../colors'
import './styles.css'

export type SnippetColor = ColorName | 'white'

export type SnippetProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onCopy' | 'color'> & {
    text: string | readonly string[]
    prompt?: boolean
    color?: SnippetColor
    copyOnClick?: boolean
    onCopy?: () => void
}

export type SnippetInlineProps = Omit<React.HTMLAttributes<HTMLElement>, 'color' | 'onCopy'> & {
    color?: SnippetColor
    copyOnClick?: boolean
    onCopy?: () => void
}

const graySurface =
    'border-[rgb(var(--text-primary)/0.1)] bg-[rgb(var(--text-primary)/0.035)] shadow-[inset_0_1px_0_rgb(0_0_0/0.04)] dark:bg-black/20 dark:shadow-[inset_0_1px_0_rgb(0_0_0/0.3)]'

const COPIED_TOAST_MS = 2000

function showCopiedToast(): void {
    globalToastManager.add({ title: 'Copied to clipboard', type: 'success', timeout: COPIED_TOAST_MS })
}

function surfaceFor(color: SnippetColor): string {
    if (color === 'gray') return graySurface
    if (color === 'white') return colorOpaque.gray
    return colorOpaque[color]
}

function textFor(color: SnippetColor): string {
    return color === 'white' ? colorText.gray : colorText[color]
}

function selectContents(element: HTMLElement | null): void {
    const selection = window.getSelection()
    if (!element || !selection?.isCollapsed) return
    selection.selectAllChildren(element)
}

const Block = React.forwardRef<HTMLDivElement, SnippetProps>(function Snippet(
    { text, prompt = true, color = 'gray', copyOnClick = false, onCopy, onClick, className, ...props },
    ref
) {
    const content = typeof text === 'string' ? text : text.join('\n')
    const codeRef = React.useRef<HTMLElement>(null)
    const copyButtonRef = React.useRef<HTMLElement>(null)
    const copyActions = React.useRef<CopyButtonActions>(null)
    return (
        <div
            ref={ref}
            className={cn(
                'flex min-w-0 items-start gap-2 rounded-md border p-2',
                copyOnClick && 'cursor-pointer',
                surfaceFor(color),
                textFor(color),
                className
            )}
            onClick={(event) => {
                onClick?.(event)
                if (event.defaultPrevented) return
                const fromCopyButton = copyButtonRef.current?.contains(event.target as Node)
                if (fromCopyButton) return
                selectContents(codeRef.current)
                if (copyOnClick) copyActions.current?.copy()
            }}
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
                <code ref={codeRef} className={cn(plainCode, 'text-inherit')}>
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
                <CopyButton
                    appearance="flat"
                    ref={copyButtonRef}
                    actionsRef={copyActions}
                    text={content}
                    label="Copy snippet"
                    size="sm"
                    onCopy={() => {
                        if (copyOnClick) showCopiedToast()
                        onCopy?.()
                    }}
                />
            </span>
        </div>
    )
})

const Inline = React.forwardRef<HTMLElement, SnippetInlineProps>(function SnippetInline(
    { color = 'gray', copyOnClick = false, onCopy, onClick, onKeyDown, className, ...props },
    ref
) {
    async function copy(element: HTMLElement) {
        try {
            await navigator.clipboard.writeText(element.textContent ?? '')
        } catch {
            return
        }
        showCopiedToast()
        onCopy?.()
    }

    return (
        <code
            ref={ref}
            {...props}
            role={copyOnClick ? 'button' : props.role}
            tabIndex={copyOnClick ? 0 : props.tabIndex}
            title={copyOnClick ? props.title ?? 'Copy' : props.title}
            onClick={(event) => {
                onClick?.(event)
                if (copyOnClick && !event.defaultPrevented) void copy(event.currentTarget)
            }}
            onKeyDown={(event) => {
                onKeyDown?.(event)
                if (!copyOnClick || event.defaultPrevented) return
                if (event.key !== 'Enter' && event.key !== ' ') return
                event.preventDefault()
                void copy(event.currentTarget)
            }}
            className={cn(
                plainCode,
                'ui-snippet-inline inline rounded border px-1 py-px font-code font-medium not-italic [overflow-wrap:anywhere] [user-select:all] [white-space:normal] [-webkit-box-decoration-break:clone] [box-decoration-break:clone] before:content-none after:content-none',
                surfaceFor(color),
                textFor(color),
                copyOnClick && cn('cursor-pointer', focusRing),
                className
            )}
        />
    )
})

export const Snippet = Object.assign(Block, { Inline })
