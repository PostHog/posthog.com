import React from 'react'
import { cn } from '../../../utils'
import { CopyButton } from '../CopyButton'
import type { CopyButtonActions } from '../CopyButton'
import { globalToastManager } from '../Toast'
import { ScrollArea } from '../ScrollArea'
import { focusRing, plainCode, sunkenTopEdge } from '../styles'
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

const graySurface = `border-[rgb(var(--text-primary)/0.1)] ${sunkenTopEdge} bg-[rgb(var(--text-primary)/0.07)] dark:bg-black/30 dark:shadow-[inset_0_1px_0_rgb(0_0_0/0.3)] dark:[--ui-sunken-top:0.1]`

const COPIED_TOAST_MS = 2000

function showCopiedToast(): void {
    globalToastManager.add({ title: 'Copied to clipboard', type: 'success', timeout: COPIED_TOAST_MS })
}

function showCopyFailedToast(): void {
    globalToastManager.add({ title: 'Copy failed', type: 'error', timeout: COPIED_TOAST_MS })
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
                'flex min-w-0 items-start gap-2 overflow-hidden rounded-md border',
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
            <ScrollArea.Root className="min-w-0 flex-1 rounded-l-[5px]">
                <ScrollArea.Viewport role="region" aria-label="Code snippet">
                    <pre className="m-0 w-max min-w-full bg-transparent py-2 pl-2 font-code text-13 leading-[26px] text-inherit">
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
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="horizontal">
                    <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
            <span className="shrink-0 py-2 pr-2">
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
            showCopyFailedToast()
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
