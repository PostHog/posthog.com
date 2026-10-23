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

/**
 * The instrumentation side of a touchpoint: the code you wrote, or the no-code
 * config you set in PostHog. Rendered under a CODE or CONFIG badge.
 */
export type AnnotationInput =
    | {
          kind: 'code'
          language: string
          snippet: string
          /** Trailing context after the tool name in the badge label, e.g. "in <head>". */
          context?: string
      }
    | {
          kind: 'config'
          /** Trailing context after the tool name, e.g. "set in PostHog". */
          context?: string
          /** Two-column field/value rows. Values may hold inline <code> chips. */
          rows: { field: React.ReactNode; value: React.ReactNode }[]
      }

/**
 * The resulting PostHog data or signal, always shown as a table under a DATA
 * badge. Either a columnar table (header + rows) or field/value rows.
 */
export interface AnnotationOutput {
    /** Trailing context after the tool name, e.g. "funnel, /ride (7d)". */
    context?: string
    table:
        | {
              kind: 'columns'
              /** Column headers. Use `align: 'right'` for numeric columns. */
              columns: { label: React.ReactNode; align?: 'left' | 'right' }[]
              rows: React.ReactNode[][]
          }
        | {
              kind: 'fieldValue'
              rows: { field: React.ReactNode; value: React.ReactNode }[]
          }
    /** The "so what" line under the table. */
    footnote?: React.ReactNode
}

interface AnnotationBody {
    /** Prose before the input block */
    why: React.ReactNode
    /** SDK code or in-app config used to instrument this touchpoint */
    input?: AnnotationInput
    /** The PostHog data or signal that instrumentation produces */
    output?: AnnotationOutput
    /** Prose after the output block */
    after?: React.ReactNode
}

export interface Annotation {
    /** Unique, formed as `${page}/${target}/${tool}` */
    id: string
    page: UnterPageId
    /** Matches a data-unter-id attribute in the Unter DOM */
    target: string
    tool: ToolKey
    /** Docs link target, when the touchpoint's docs differ from the tool default (e.g. heatmaps live under the toolbar, not the tool it's grouped with). */
    docsUrl?: string
    /** Link text for `docsUrl`; defaults to `${tool.name} docs`. */
    docsLabel?: string
    /** Mono label shown in the sidebar row, e.g. `ride_prices_viewed` */
    label: string
    /** Fractional anchor position within the target's bounding rect (0 = left/top edge, 1 = right/bottom; can exceed the range to sit outside) */
    dx: number
    dy: number
    title: string
    body: AnnotationBody
}
