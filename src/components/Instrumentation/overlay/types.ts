import React from 'react'

export type UnterPageId = 'ride' | 'highway' | 'help' | 'safety'

export type ToolKey =
    | 'core'
    | 'web'
    | 'product'
    | 'replay'
    | 'experiments'
    | 'flags'
    | 'error'
    | 'surveys'
    | 'llm'
    | 'logs'
    | 'selfdriving'

/** A tailwind.config.js palette token. Resolve classes for it through `TOOL_CLASSES`. */
export type ToolColor =
    | 'gray'
    | 'green-2'
    | 'blue'
    | 'yellow'
    | 'purple'
    | 'seagreen'
    | 'orange'
    | 'salmon'
    | 'lilac'
    | 'red'

export interface Tool {
    key: ToolKey
    name: string
    /** Token name, not a hex: the classes come from `TOOL_CLASSES` in tools.ts. */
    color: ToolColor
    Icon: React.ComponentType<{ className?: string }>
    docsUrl?: string
}

interface AnnotationBody {
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
