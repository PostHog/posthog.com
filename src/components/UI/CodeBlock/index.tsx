import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import type { Language, PrismTheme } from 'prism-react-renderer'
import { lightTheme, darkTheme } from '../../CodeBlock/theme'
import languageMap from '../../CodeBlock/languages'
import { cn } from '../../../utils'
import { CopyButton } from '../CopyButton'
import { Tabs } from '../Tabs'
import {
    cardAppearances,
    cardBarSurface,
    cardInnerBottomRadius,
    cardInnerTopRadius,
    cardLevels,
    insetFocusRing,
    plainCode,
    scrollbarHidden,
} from '../styles'
import { wrapText } from '../truncation'
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
const CODE_LINE_HEIGHT_PX = 24
const CODE_PADDING_Y_PX = 16
const codeLineStyle: React.CSSProperties = { lineHeight: `${CODE_LINE_HEIGHT_PX}px`, minHeight: CODE_LINE_HEIGHT_PX }
const codePaneStyle: React.CSSProperties = { lineHeight: `${CODE_LINE_HEIGHT_PX}px`, paddingBlock: CODE_PADDING_Y_PX }

function codeHeight(code: string): number {
    const lineCount = code.split(/\r\n|\r|\n/).length
    return lineCount * CODE_LINE_HEIGHT_PX + CODE_PADDING_Y_PX * 2
}

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
    const regionId = useId()
    const [expanded, setExpanded] = React.useState(false)
    const heightLimit = maxHeight === undefined ? undefined : Math.max(1, maxHeight)
    const contentHeight = heightLimit === undefined ? 0 : codeHeight(snippet.code)
    const canExpand = heightLimit !== undefined && contentHeight > heightLimit
    const hasDiff = Boolean(snippet.addedLines?.length || snippet.removedLines?.length)
    const language = snippet.language?.toLowerCase() || 'text'
    const prismLanguage = languageMap[language]?.language || language

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
                    language={prismLanguage as Language}
                    theme={tokenTheme}
                >
                    {({ tokens, getTokenProps }) => (
                        <pre
                            className={cn('m-0 w-max min-w-full bg-transparent font-code text-sm text-primary')}
                            style={codePaneStyle}
                        >
                            <code className={cn(plainCode, 'm-0 font-code text-sm text-primary')} style={codeLineStyle}>
                                {tokens.map((line, index) => {
                                    const lineNumber = index + 1
                                    const added = snippet.addedLines?.includes(lineNumber)
                                    const removed = snippet.removedLines?.includes(lineNumber)
                                    return (
                                        <span
                                            key={index}
                                            className={cn(
                                                'flex border-l px-4 border-transparent',
                                                snippet.highlightedLines?.includes(lineNumber) &&
                                                    'border-yellow bg-yellow/15 dark:bg-yellow/10',
                                                added && 'border-green bg-green/15 dark:bg-green/10',
                                                removed && 'border-red bg-red/10 dark:bg-red/15'
                                            )}
                                            style={codeLineStyle}
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
                                                                    prismLanguage,
                                                                    lightTheme
                                                                ),
                                                                '--syntax-dark': syntaxColor(
                                                                    token.types,
                                                                    prismLanguage,
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
                <button
                    type="button"
                    aria-controls={regionId}
                    aria-expanded={expanded}
                    onClick={() => setExpanded(!expanded)}
                    className={cn(
                        'flex min-h-10 w-full items-center justify-between gap-3 border-0 border-t px-4 py-1.5 text-left text-[13px] text-secondary transition-colors duration-150 ease-out hover:bg-[rgb(var(--text-primary)/0.06)] hover:text-primary active:bg-[rgb(var(--text-primary)/0.1)] motion-reduce:transition-none',
                        cardInnerBottomRadius,
                        cardBarSurface,
                        insetFocusRing
                    )}
                >
                    <span>{expanded ? 'Complete snippet' : 'More lines below'}</span>
                    <span className="font-semibold text-primary">{expanded ? 'Show less' : 'Show more'}</span>
                </button>
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
                cardLevels[1],
                cardAppearances.solid,
                '@container/codeblock not-prose min-w-0 overflow-hidden text-primary',
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
                className="gap-0"
            >
                <div
                    className={cn(
                        'flex min-h-11 min-w-0 items-center gap-2 border-b py-1.5 pl-1.5 pr-2',
                        cardInnerTopRadius,
                        cardBarSurface
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
                            className={`min-w-0 shrink overflow-x-auto overflow-y-hidden p-0 ${scrollbarHidden}`}
                        >
                            {snippets.map((snippet) => (
                                <Tabs.Tab
                                    key={snippet.id}
                                    value={snippet.id}
                                    className="px-2.5 py-1.5 font-code text-[13px]"
                                >
                                    {snippetLabel(snippet)}
                                </Tabs.Tab>
                            ))}
                        </Tabs.List>
                    ) : (
                        <div className={cn(wrapText, 'px-2.5 text-[13px] font-semibold')}>
                            {snippetLabel(activeSnippet)}
                            {activeSnippet.fileName && activeSnippet.language && (
                                <span className="ml-2 font-code font-normal text-secondary">
                                    {languageMap[activeSnippet.language]?.label || activeSnippet.language}
                                </span>
                            )}
                        </div>
                    )}
                    {showCopy && (
                        <CopyButton
                            appearance="flat"
                            key={activeSnippet.id}
                            text={activeSnippet.code}
                            onCopy={onCopy}
                            label={`Copy ${
                                activeSnippet.fileName || activeSnippet.label || activeSnippet.language || 'code'
                            }`}
                            className="ml-auto shrink-0"
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
