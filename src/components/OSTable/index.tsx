import { MDXEditor } from '@mdxeditor/editor'
import React from 'react'

interface Column {
    name: string
    align?: 'left' | 'center' | 'right'
    width?: string
}

interface Row {
    cells: {
        content: React.ReactNode
        className?: string
    }[]
}

interface OSTableProps {
    columns?: Column[]
    rows: Row[]
    className?: string
    rowAlignment?: 'top' | 'center'
    editable?: boolean
}

const OSTable: React.FC<OSTableProps> = ({
    columns,
    rows,
    className = '',
    rowAlignment = 'center',
    editable = true,
}) => {
    const gridClass = columns?.map((col) => col.width || 'auto').join(' ') || ''

    return (
        <div
            className={`grid divide-x divide-y divide-border border-r border-b border-primary [&>div]:p-2 text-[15px] ${className}`}
            style={{ gridTemplateColumns: gridClass }}
        >
            {/* Header Row */}
            {columns && (
                <>
                    {columns.map((column, index) => (
                        <div
                            key={index}
                            className={`text-sm border-l border-t border-border bg-input font-bold ${
                                column.align === 'center' ? 'text-center' : ''
                            }`}
                        >
                            {column.name}
                        </div>
                    ))}
                </>
            )}

            {/* Data Rows */}
            {rows.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                    {row.cells.map((cell, cellIndex) => (
                        <div
                            key={cellIndex}
                            className={`flex ${rowAlignment === 'top' ? 'items-start' : 'items-center'} ${
                                columns?.[cellIndex]?.align === 'left'
                                    ? 'items-start'
                                    : columns?.[cellIndex]?.align === 'right'
                                    ? 'items-end'
                                    : 'justify-center'
                            } ${cell.className || ''}`}
                        >
                            {editable && typeof cell.content === 'string' ? (
                                <MDXEditor contentEditableClassName="[&_p]:m-0 min-w-[10px]" markdown={cell.content} />
                            ) : (
                                cell.content
                            )}
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
}

export default OSTable
