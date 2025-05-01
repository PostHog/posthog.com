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
    // Approach 1: Dynamic column widths
    columns?: Column[]
    // Approach 2: Static column widths
    columnWidths?: string
    rows: Row[]
    className?: string
}

const OSTable: React.FC<OSTableProps> = ({ columns, columnWidths, rows, className = '' }) => {
    // If using dynamic approach, construct the grid class
    const gridClass = columns
        ? `grid grid-cols-[${columns.map(col => col.width || 'auto').join('_')}]`
        : columnWidths || ''

    return (
        <div className={`${gridClass} divide-x divide-y divide-border border-r border-b border-primary [&_div]:p-2 text-[15px] ${className}`}>
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
                            className={`flex items-center ${
                                columns?.[cellIndex]?.align === 'center' ? 'justify-center' : ''
                            } ${cell.className || ''}`}
                        >
                            {cell.content}
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
}

export default OSTable
