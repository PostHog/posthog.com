import React from 'react'
import { SingleCodeBlock } from 'components/CodeBlock'
import { TOOL_CLASSES } from './tools'
import { AnnotationInput, AnnotationOutput, Tool } from './types'

/*
 * The two halves of every touchpoint, kept in a consistent shape: an input block
 * (CODE or CONFIG) for what you instrument, and an output block (DATA) for what
 * PostHog gives back. The pairing is the whole point of the page, so the format is
 * deliberately identical everywhere rather than left to each annotation to invent.
 */

/** Inline monospace chip; the same styling the sidebar's PROSE gives inline <code>. */
export const CHIP = 'font-code text-xs bg-accent px-1 py-0.5 rounded'

type BadgeKind = 'CODE' | 'CONFIG' | 'DATA'

/**
 * The colored pill (CODE / CONFIG / DATA) plus the gray context label. The product
 * name comes from the tool, so callers pass only the trailing context; this keeps
 * "Surveys · targeting" and "Surveys · responses" reading as one product, two views.
 */
function BlockHeader({ kind, tool, context }: { kind: BadgeKind; tool: Tool; context?: string }): JSX.Element {
    const classes = TOOL_CLASSES[tool.color]
    return (
        <div className="flex items-center gap-1.5 mb-1">
            <span
                className={`shrink-0 text-xs font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded leading-none ${classes.bg} ${classes.on}`}
            >
                {kind}
            </span>
            <span className="text-xs text-muted truncate">
                {tool.name}
                {context ? ` · ${context}` : ''}
            </span>
        </div>
    )
}

/** Two-column field/value table, used by CONFIG inputs and field/value DATA outputs. */
function FieldValueTable({ rows }: { rows: { field: React.ReactNode; value: React.ReactNode }[] }): JSX.Element {
    return (
        <table className="w-full text-xs border-collapse">
            <tbody>
                {rows.map((row, i) => (
                    <tr key={i} className="border-b border-primary last:border-0">
                        <td className="py-1 pr-3 align-top text-secondary whitespace-nowrap">{row.field}</td>
                        <td className="py-1 align-top text-primary">{row.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

/** Columnar table with a header row; numeric columns are right-aligned. */
function ColumnsTable({
    columns,
    rows,
}: {
    columns: { label: React.ReactNode; align?: 'left' | 'right' }[]
    rows: React.ReactNode[][]
}): JSX.Element {
    return (
        <table className="w-full text-xs border-collapse tabular-nums">
            <thead>
                <tr className="border-b border-primary">
                    {columns.map((col, i) => (
                        <th
                            key={i}
                            className={`py-1 font-normal text-muted ${
                                col.align === 'right' ? 'text-right' : 'text-left'
                            } ${i > 0 ? 'pl-3' : ''}`}
                        >
                            {col.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, i) => (
                    <tr key={i} className="border-b border-primary last:border-0">
                        {row.map((cell, j) => (
                            <td
                                key={j}
                                className={`py-1 align-top text-primary ${
                                    columns[j]?.align === 'right' ? 'text-right' : 'text-left'
                                } ${j > 0 ? 'pl-3' : ''}`}
                            >
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

/** The instrumentation half: a syntax-highlighted code block, or a config table. */
export function InputBlock({ input, tool }: { input: AnnotationInput; tool: Tool }): JSX.Element {
    if (input.kind === 'code') {
        return (
            <div className="mt-2">
                <BlockHeader kind="CODE" tool={tool} context={input.context} />
                <div className="[&_pre]:text-xs">
                    <SingleCodeBlock language={input.language} showLabel={false}>
                        {input.snippet}
                    </SingleCodeBlock>
                </div>
            </div>
        )
    }
    return (
        <div className="mt-2">
            <BlockHeader kind="CONFIG" tool={tool} context={input.context} />
            <div className="rounded border border-primary px-2.5 py-1">
                <FieldValueTable rows={input.rows} />
            </div>
        </div>
    )
}

/** The result half: the PostHog data or signal instrumentation produces. */
export function OutputBlock({ output, tool }: { output: AnnotationOutput; tool: Tool }): JSX.Element {
    return (
        <div className="mt-2">
            <BlockHeader kind="DATA" tool={tool} context={output.context} />
            <div className="rounded border border-primary px-2.5 py-1">
                {output.table.kind === 'columns' ? (
                    <ColumnsTable columns={output.table.columns} rows={output.table.rows} />
                ) : (
                    <FieldValueTable rows={output.table.rows} />
                )}
                {output.footnote && (
                    <p className="mt-1.5 mb-0.5 text-xs text-muted [&_code]:font-code [&_code]:bg-accent [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded">
                        {output.footnote}
                    </p>
                )}
            </div>
        </div>
    )
}
