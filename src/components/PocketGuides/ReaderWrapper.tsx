import React from 'react'

/**
 * Authoring markers, not layout: `<LeftPage>` holds a page's figures, `<RightPage>` its prose.
 * The reader's wrapper consumes both by `mdxType` and interleaves them – these components only
 * render if something bypasses the wrapper, so they pass their children through unstyled.
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
 * The reader: as the MDX `wrapper` it re-orders the compiled LeftPage/RightPage trees (matched
 * by `mdxType` and `n`) so each figure follows the first block citing it.
 */
export default function ReaderWrapper({ children }: { children: React.ReactNode }): JSX.Element {
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
            // Anything authored outside the two pages still renders, after the prose.
            prose.push(page)
        }
    })

    const emitted = new Set<number>()
    const stream: React.ReactNode[] = []

    // A figure-less page authored as two prose pages – the volume's front matter – keeps its
    // two-page character as two columns at reading widths, instead of one tall stack.
    if (figures.size === 0 && preface.length > 0 && prose.length > 0) {
        stream.push(
            <div key="front-matter" className="@3xl:grid @3xl:grid-cols-2 @3xl:items-start @3xl:gap-12">
                <div>{preface}</div>
                <div>{prose}</div>
            </div>
        )
        prose = []
    } else {
        stream.push(...preface)
    }

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
        <div className="px-5 py-6 [counter-reset:book-section] @xl:px-12 @xl:py-10 [&_.anatomy-hint]:hidden @2xl:[&_.anatomy-hint]:inline-flex @2xl:[&_.anatomy-marker]:opacity-0">
            {React.Children.toArray(stream)}
        </div>
    )
}
