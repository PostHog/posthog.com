import React from 'react'
import { cn } from '../../utils'
import { flattenFragments } from './utils'

export const truncateText = 'block min-w-0 truncate [[data-disabled]_&]:pointer-events-auto'

export const wrapText = 'min-w-0 [overflow-wrap:anywhere]'

const inlinePhrasingTags = new Set([
    'a',
    'abbr',
    'b',
    'code',
    'em',
    'i',
    'mark',
    's',
    'small',
    'strong',
    'sub',
    'sup',
    'u',
])

function showFullTextWhenTruncated(event: React.PointerEvent<HTMLElement>): void {
    const element = event.currentTarget
    const callerTitleApplies = element.parentElement?.closest('[title]') !== null
    if (!callerTitleApplies && element.scrollWidth > element.clientWidth) element.title = element.textContent ?? ''
    else element.removeAttribute('title')
}

export function TruncatedText({ children, className }: { children: React.ReactNode; className?: string }): JSX.Element {
    return (
        <span className={cn(truncateText, className)} onPointerEnter={showFullTextWhenTruncated}>
            {children}
        </span>
    )
}

function isInlineText(child: React.ReactNode): boolean {
    if (typeof child === 'string' || typeof child === 'number') return true
    return React.isValidElement(child) && typeof child.type === 'string' && inlinePhrasingTags.has(child.type)
}

export function truncateTextChildren(children: React.ReactNode): React.ReactNode {
    const result: React.ReactNode[] = []
    let textRun: React.ReactNode[] = []
    const flushText = () => {
        if (textRun.length === 0) return
        result.push(<TruncatedText key={`text-${result.length}`}>{textRun}</TruncatedText>)
        textRun = []
    }
    flattenFragments(children).forEach((child) => {
        if (isInlineText(child)) {
            textRun.push(child)
        } else {
            flushText()
            result.push(child)
        }
    })
    flushText()
    return result
}
