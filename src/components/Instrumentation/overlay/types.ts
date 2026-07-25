import React from 'react'

export type UnterPageId = 'ride' | 'highway' | 'help' | 'safety'

export type ToolKey =
    | 'core'
    | 'web'
    | 'product'
    | 'replay'
    | 'expflags'
    | 'error'
    | 'surveys'
    | 'llm'
    | 'logs'
    | 'selfdriving'

export interface Tool {
    key: ToolKey
    name: string
    /** Literal hex, because Tailwind can't JIT dynamic class names, so tool colors are applied via inline styles */
    color: string
    textOnColor: '#fff' | '#000'
    /** `style` is passed, not just `className`, because the color is a literal hex */
    Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
    docsUrl?: string
}

export interface AnnotationBody {
    /** Prose before the code block */
    why: React.ReactNode
    code?: { language: string; snippet: string }
    /** Prose after the code block */
    after?: React.ReactNode
}

export interface Annotation {
    /** Unique, formed as `${page}/${target}/${tool}` */
    id: string
    page: UnterPageId
    /** Matches a data-unter-id attribute in the Unter DOM */
    target: string
    tool: ToolKey
    /** Mono label shown in the sidebar row, e.g. `ride_prices_viewed` */
    label: string
    /** Fractional anchor position within the target's bounding rect (0 = left/top edge, 1 = right/bottom; can exceed the range to sit outside) */
    dx: number
    dy: number
    title: string
    body: AnnotationBody
}
