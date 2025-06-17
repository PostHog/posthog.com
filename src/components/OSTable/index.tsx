import { MDXEditor } from '@mdxeditor/editor'
import { IconSpinner } from '@posthog/icons'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

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
    size?: 'sm' | 'md' | 'lg'
    editable?: boolean
    onLastRowInView?: () => void
    loading?: boolean
}

const RowSkeleton = () => {
    return (
        <div className="flex items-center justify-center mt-4">
            <IconSpinner className="size-7 opacity-60 animate-spin" />
        </div>
    )
}

const OSTable: React.FC<OSTableProps> = ({
    columns,
    rows,
    className = '',
    rowAlignment = 'center',
    editable = true,
    size = 'md',
    onLastRowInView,
    loading,
}) => {
    const gridClass = columns?.map((col) => col.width || 'auto').join(' ') || ''
    const [lastRowRef, lastRowInView] = useInView({ threshold: 0.1 })

    useEffect(() => {
        if (lastRowInView) {
            onLastRowInView?.()
        }
    }, [lastRowInView])

    return (
        <>
            <div
                className={`grid divide-x divide-y divide-border border-r border-b border-primary text-[15px] [&>div]:px-2 ${
                    size === 'sm' ? '[&>div]:py-1' : size === 'md' ? '[&>div]:py-2' : '[&>div]:py-3'
                } ${className}`}
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
                                ref={rowIndex === rows.length - 1 ? lastRowRef : null}
                                key={cellIndex}
                                className={`
                                flex flex-col 
                                ${rowAlignment === 'top' ? 'justify-start' : 'justify-center'} 
                                ${
                                    columns?.[cellIndex]?.align === 'left'
                                        ? 'items-start'
                                        : columns?.[cellIndex]?.align === 'right'
                                        ? 'justify-end'
                                        : 'items-center'
                                } ${cell.className || ''}`}
                            >
                                {editable && typeof cell.content === 'string' ? (
                                    <MDXEditor
                                        contentEditableClassName="[&_p]:m-0 min-w-[10px]"
                                        markdown={cell.content}
                                    />
                                ) : (
                                    cell.content
                                )}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
            {loading && <RowSkeleton />}
        </>
    )
}

export default OSTable
