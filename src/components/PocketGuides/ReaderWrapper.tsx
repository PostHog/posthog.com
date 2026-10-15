import React from 'react'

import { useEntry } from './bookContext'

/**
 * Legacy standalone guide markers: `<LeftPage>` holds figures, `<RightPage>` prose.
 * Learn chapters put figures directly in reading order and do not need these markers.
 * The wrapper consumes markers by `mdxType`; if bypassed, they pass children through unstyled.
 */
export const LeftPage = ({ children }: { children: React.ReactNode }): JSX.Element => <>{children}</>
export const RightPage = ({ children }: { children: React.ReactNode }): JSX.Element => <>{children}</>

/** Deep-walk an element tree collecting the figure numbers its <SeeFig> cues cite. */
function collectCitedFigures(node: React.ReactNode, found: Set<number>): void {
    React.Children.forEach(node as React.ReactNode[], (child) => {
        if (!React.isValidElement(child)) {
            return
        }
        const props = child.props as { mdxType?: string; n?: number; children?: React.ReactNode }
        if (props.mdxType === 'SeeFig' && typeof props.n === 'number') {
            found.add(props.n)
        }
        if (props.children) {
            collectCitedFigures(props.children, found)
        }
    })
}

/**
 * The MDX wrapper keeps unmarked chapters in source order. For legacy marked chapters, it
 * re-orders LeftPage/RightPage trees (matched by `mdxType` and `n`) so each figure follows the
 * first block citing it.
 */
export default function ReaderWrapper({ children }: { children: React.ReactNode }): JSX.Element {
    const isLearn = Boolean(useEntry()?.basePath)
    // Non-figure left-page content (the front matter's title block) leads the column.
    const preface: React.ReactNode[] = []
    const figures = new Map<number, React.ReactNode>()
    let prose: React.ReactNode[] = []

    React.Children.forEach(children as React.ReactNode[], (page) => {
        if (!React.isValidElement(page)) {
            return
        }
        const type = (page.props as { mdxType?: string }).mdxType
        if (type === 'LeftPage') {
            React.Children.forEach(
                (page.props as { children?: React.ReactNode }).children as React.ReactNode[],
                (child) => {
                    if (!React.isValidElement(child)) {
                        return
                    }
                    const props = child.props as { mdxType?: string; n?: number }
                    if (typeof props.n === 'number' && (props.mdxType ?? '').endsWith('Figure')) {
                        figures.set(props.n, child)
                    } else {
                        preface.push(child)
                    }
                }
            )
        } else if (type === 'RightPage') {
            prose = React.Children.toArray((page.props as { children?: React.ReactNode }).children)
        } else {
            // Unmarked Learn chapters render in source order.
            prose.push(page)
        }
    })

    const emitted = new Set<number>()
    const stream: React.ReactNode[] = [...preface]

    for (const block of prose) {
        stream.push(block)
        const cited = new Set<number>()
        collectCitedFigures(block, cited)
        for (const n of [...cited].sort((a, b) => a - b)) {
            if (!emitted.has(n) && figures.has(n)) {
                emitted.add(n)
                stream.push(figures.get(n))
            }
        }
    }
    // Never-cited figures still print, at the end.
    for (const [n, figure] of [...figures.entries()].sort(([a], [b]) => a - b)) {
        if (!emitted.has(n)) {
            stream.push(figure)
        }
    }

    return (
        // No hover on touch: below @2xl the hover hint disappears, markers stay visible, and
        // each figure prints its glosses as a numbered key instead. At @2xl+ the markers go
        // back to hover-reveal (group-hover and focus outrank the opacity-0 by specificity).
        <div
            className={`pocket-guide-page${
                isLearn ? '' : ' pocket-guide-page--standalone'
            } [&_.anatomy-hint]:hidden @2xl:[&_.anatomy-hint]:inline-flex @2xl:[&_.anatomy-marker]:opacity-0`}
        >
            {React.Children.toArray(stream)}
        </div>
    )
}
