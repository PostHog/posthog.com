import React from 'react'

export type SnufflPageId = 'ride' | 'highway' | 'safety'

export type ProductKey = 'core' | 'web' | 'product' | 'replay' | 'expflags' | 'error' | 'surveys' | 'llm' | 'logs'

export interface OverlayProduct {
    key: ProductKey
    name: string
    /** Short tag shown on chips, e.g. "Replay" */
    short: string
    /** Literal hex — Tailwind can't JIT dynamic class names, so product colors are applied via inline styles */
    color: string
    textOnColor: '#fff' | '#000'
    Icon: React.ComponentType<{ className?: string }>
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
    /** Unique — `${page}/${target}/${product}` */
    id: string
    page: SnufflPageId
    /** Matches a data-snuffl-id attribute in the Snuffl DOM */
    target: string
    product: ProductKey
    /** Mono label on the chip, e.g. `ride_prices_viewed` */
    label: string
    /** Fractional anchor position within the target's bounding rect (0 = left/top edge, 1 = right/bottom; can exceed the range to sit outside) */
    dx: number
    dy: number
    title: string
    body: AnnotationBody
}
