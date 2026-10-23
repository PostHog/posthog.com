import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import type { Language, PrismTheme } from 'prism-react-renderer'
import { lightTheme, darkTheme } from '../../CodeBlock/theme'
import languageMap from '../../CodeBlock/languages'
import { cn } from '../../../utils'
import { Button } from '../Button'
import { CopyButton } from '../CopyButton'
import { Tabs } from '../Tabs'
import { insetFocusRing, plainCode, surfaceDivider, scrollbarHidden } from '../styles'
import { useId } from '../utils'

export type CodeSnippet = {
    id: string
    code: string
    language?: string
    fileName?: string
    label?: string
    highlightedLines?: readonly number[]
    addedLines?: readonly number[]
    removedLines?: readonly number[]
}

export type CodeBlockProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange' | 'onCopy'> & {
    snippets: readonly CodeSnippet[]
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    lineNumbers?: boolean
    lineNumberStart?: number
    maxHeight?: number
    showCopy?: boolean
    onCopy?: () => void
}

const tokenTheme: PrismTheme = { plain: {}, styles: [] }
function syntaxColor(types: string[], language: string, theme: PrismTheme): string {
    let color = theme.plain.color || 'inherit'
    for (const rule of theme.styles) {
        if (
            rule.types.some((type) => types.includes(type)) &&
            (!rule.languages || rule.languages.includes(language as Language))
        ) {
            color = rule.style.color || color
        }
    }
    return color
}
const glassButton =
    'hover:bg-[rgb(var(--text-primary)/0.07)] active:bg-[rgb(var(--text-primary)/0.1)] dark:hover:bg-[rgb(var(--text-primary)/0.07)] dark:active:bg-[rgb(var(--text-primary)/0.1)]'

function revealTab(list: HTMLDivElement, tab: HTMLElement) {
    const listBounds = list.getBoundingClientRect()
    const tabBounds = tab.getBoundingClientRect()
    const leftOverflow = tabBounds.left - listBounds.left
    const rightOverflow = tabBounds.right - listBounds.right
    if (leftOverflow < 0) list.scrollLeft += leftOverflow
    else if (rightOverflow > 0) list.scrollLeft += rightOverflow
}

function snippetLabel(snippet: CodeSnippet): React.ReactNode {
    return (
        snippet.fileName ||
        snippet.label ||
        languageMap[snippet.language || '']?.label ||
        snippet.language ||
        'Plain text'
    )
}

function SnippetContent({
    snippet,
    lineNumbers,
    lineNumberStart,
    maxHeight,
}: {
    snippet: CodeSnippet
    lineNumbers: boolean
    lineNumberStart: number
    maxHeight?: number
}) {
    const contentRef = React.useRef<HTMLPreElement>(null)
    const regionId = useId()
    const [contentHeight, setContentHeight] = React.useState<number>()
    const [expanded, setExpanded] = React.useState(false)
    const heightLimit = maxHeight === undefined ? undefined : Math.max(1, maxHeight)
    React.useEffect(() => {
        const content = contentRef.current
        if (!content) return
        const measure = () => setContentHeight(content.scrollHeight)
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(content)
        return () => observer.disconnect()
    }, [snippet.code])
    const canExpand = heightLimit !== undefined && contentHeight !== undefined && contentHeight > heightLimit
    const hasDiff = Boolean(snippet.addedLines?.length || snippet.removedLines?.length)
    const language = snippet.language?.toLowerCase() || 'text'

    return (
        <>
            <div
                id={regionId}
                role="region"
                aria-label={`${snippet.fileName || snippet.label || snippet.language || 'Plain text'} code`}
                tabIndex={0}
                className={cn(
                    'overflow-auto transition-[max-height] duration-200 ease-out motion-reduce:transition-none',
                    insetFocusRing
                )}
                style={{ maxHeight: heightLimit === undefined ? undefined : expanded ? contentHeight : heightLimit }}
            >
                <Highlight
                    {...defaultProps}
                    code={snippet.code}
                    language={(languageMap[language]?.language || language) as Language}
                    theme={tokenTheme}
                >
                    {({ tokens, getTokenProps }) => (
                        <pre
                            ref={contentRef}
                            className={cn(
                                'm-0 w-max min-w-full bg-transparent py-4 font-code text-sm leading-6 text-primary'
                            )}
                        >
                            <code className={cn(plainCode, 'm-0 font-code text-sm leading-6 text-primary')}>
                                {tokens.map((line, index) => {
                                    const lineNumber = index + 1
                                    const added = snippet.addedLines?.includes(lineNumber)
                                    const removed = snippet.removedLines?.includes(lineNumber)
                                    return (
                                        <span
                                            key={index}
                                            className={cn(
                                                'flex min-h-6 border-l px-4 border-transparent',
                                                snippet.highlightedLines?.includes(lineNumber) &&
                                                    'border-yellow bg-yellow/15 dark:bg-yellow/10',
                                                added && 'border-green bg-green/15 dark:bg-green/10',
                                                removed && 'border-red bg-red/10 dark:bg-red/15'
                                            )}
                                        >
                                            {lineNumbers && (
                                                <span
                                                    aria-hidden="true"
                                                    className="mr-4 shrink-0 select-none border-r border-[rgb(var(--text-primary)/0.1)] pr-3 text-right tabular-nums text-secondary"
                                                    style={{
                                                        width: `${
                                                            String(tokens.length - 1 + lineNumberStart).length + 2
                                                        }ch`,
                                                    }}
                                                >
                                                    {index + lineNumberStart}
                                                </span>
                                            )}
                                            {hasDiff && (
                                                <span
                                                    aria-hidden="true"
                                                    className={cn(
                                                        'mr-2 w-[1ch] shrink-0 select-none',
                                                        added
                                                            ? 'text-green-dark dark:text-lime-green'
                                                            : removed
                                                            ? 'text-red-2-dark dark:text-red-2'
                                                            : 'text-muted'
                                                    )}
                                                >
                                                    {added ? '+' : removed ? '-' : ' '}
                                                </span>
                                            )}
                                            {(added || removed) && (
                                                <span className="sr-only">{added ? 'Added: ' : 'Removed: '}</span>
                                            )}
                                            <span>
                                                {line.map((token, tokenIndex) => (
                                                    <span
                                                        {...getTokenProps({ token })}
                                                        key={tokenIndex}
                                                        className="text-[color:var(--syntax-light)] dark:text-[color:var(--syntax-dark)]"
                                                        style={
                                                            {
                                                                '--syntax-light': syntaxColor(
                                                                    token.types,
                                                                    languageMap[language]?.language || language,
                                                                    lightTheme
                                                                ),
                                                                '--syntax-dark': syntaxColor(
                                                                    token.types,
                                                                    languageMap[language]?.language || language,
                                                                    darkTheme
                                                                ),
                                                            } as React.CSSProperties
                                                        }
                                                    >
                                                        {token.empty ? '' : token.content}
                                                    </span>
                                                ))}
                                            </span>
                                        </span>
                                    )
                                })}
                            </code>
                        </pre>
                    )}
                </Highlight>
            </div>
            {canExpand && (
                <div className={cn('flex justify-between items-center gap-3 border-t px-3 py-2', surfaceDivider)}>
                    <span className="text-xs text-secondary">{expanded ? 'Complete snippet' : 'More lines below'}</span>
                    <Button
                        size="sm"
                        className={glassButton}
                        aria-controls={regionId}
                        aria-expanded={expanded}
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'Show less' : 'Show more'}
                    </Button>
                </div>
            )}
        </>
    )
}

export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(function CodeBlock(
    {
        snippets,
        value,
        defaultValue,
        onValueChange,
        lineNumbers = false,
        lineNumberStart = 1,
        maxHeight,
        showCopy = true,
        onCopy,
        className,
        ...props
    },
    ref
) {
    const [internalValue, setInternalValue] = React.useState(defaultValue || snippets[0]?.id)
    const selectedId = value === undefined ? internalValue : value
    const activeSnippet = snippets.find((snippet) => snippet.id === selectedId) || snippets[0]
    const tabListRef = React.useRef<HTMLDivElement>(null)
    React.useEffect(() => {
        const list = tabListRef.current
        if (!list) return
        const revealActiveTab = () => {
            const tab = list.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]')
            if (tab) revealTab(list, tab)
        }
        revealActiveTab()
        const observer = new ResizeObserver(revealActiveTab)
        observer.observe(list)
        return () => observer.disconnect()
    }, [activeSnippet?.id, snippets.length])
    if (!activeSnippet) return null
    return (
        <div
            {...props}
            ref={ref}
            className={cn(
                'not-prose min-w-0 overflow-hidden text-primary',
                '@container/codeblock rounded-[8px] border border-[rgb(var(--text-primary)/0.16)] bg-white dark:bg-white-dark',
                className
            )}
        >
            <Tabs.Root
                value={activeSnippet.id}
                onValueChange={(nextValue) => {
                    const nextId = String(nextValue)
                    if (value === undefined) setInternalValue(nextId)
                    onValueChange?.(nextId)
                }}
                variant="underline"
                className="gap-0"
            >
                <div
                    className={cn(
                        'flex min-w-0 items-center gap-2 border-b bg-[rgb(var(--text-primary)/0.04)] pr-2',
                        surfaceDivider
                    )}
                >
                    {snippets.length > 1 ? (
                        <Tabs.List
                            ref={tabListRef}
                            aria-label="Code files and languages"
                            onFocusCapture={(event) => {
                                const tab = (event.target as HTMLElement).closest<HTMLElement>('[role="tab"]')
                                if (tab) revealTab(event.currentTarget, tab)
                            }}
                            className={`min-w-0 shrink overflow-x-auto border-0 p-0 ${scrollbarHidden}`}
                        >
                            {snippets.map((snippet) => (
                                <Tabs.Tab
                                    key={snippet.id}
                                    value={snippet.id}
                                    className="rounded-none border-r border-[rgb(var(--text-primary)/0.12)] px-4 py-3 font-code text-xs data-[active]:bg-white dark:data-[active]:bg-white-dark"
                                >
                                    {snippetLabel(snippet)}
                                </Tabs.Tab>
                            ))}
                        </Tabs.List>
                    ) : (
                        <div className="min-w-0 px-2 py-1 text-xs font-semibold [overflow-wrap:anywhere]">
                            {snippetLabel(activeSnippet)}
                            {activeSnippet.fileName && activeSnippet.language && (
                                <span className="ml-2 font-normal text-muted">
                                    {languageMap[activeSnippet.language]?.label || activeSnippet.language}
                                </span>
                            )}
                        </div>
                    )}
                    {showCopy && (
                        <CopyButton
                            key={activeSnippet.id}
                            text={activeSnippet.code}
                            onCopy={onCopy}
                            label={`Copy ${
                                activeSnippet.fileName || activeSnippet.label || activeSnippet.language || 'code'
                            }`}
                            className={cn('ml-auto shrink-0', glassButton)}
                        />
                    )}
                </div>
                {snippets.length === 1 ? (
                    <SnippetContent
                        key={activeSnippet.id}
                        snippet={activeSnippet}
                        lineNumbers={lineNumbers}
                        lineNumberStart={lineNumberStart}
                        maxHeight={maxHeight}
                    />
                ) : (
                    snippets.map((snippet) => (
                        <Tabs.Panel key={snippet.id} value={snippet.id} keepMounted className="rounded-none text-sm">
                            <SnippetContent
                                snippet={snippet}
                                lineNumbers={lineNumbers}
                                lineNumberStart={lineNumberStart}
                                maxHeight={maxHeight}
                            />
                        </Tabs.Panel>
                    ))
                )}
            </Tabs.Root>
        </div>
    )
})
