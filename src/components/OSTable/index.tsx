import { MDXEditor } from '@mdxeditor/editor'
import { IconSpinner } from '@posthog/icons'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { groupBy as _groupBy } from 'lodash'

interface Column {
    name: string
    align?: 'left' | 'center' | 'right'
    width?: string
    className?: string
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
    overflowX?: boolean
    groupBy?: string
}

const RowSkeleton = () => {
    return (
        <div className="flex items-center justify-center mt-4">
            <IconSpinner className="size-7 opacity-60 animate-spin" />
        </div>
    )
}

const Row = ({
    row,
    lastRowRef,
    rowAlignment,
    columns,
    editable,
    moreCount,
    onShowMore,
}: {
    row: Row
    lastRowRef: any
    rowAlignment: 'top' | 'center'
    columns?: Column[]
    editable: boolean
    moreCount?: number
    onShowMore?: () => void
}) => {
    return (
        <>
            <React.Fragment>
                {row.cells.map((cell, cellIndex) => {
                    return (
                        <div
                            ref={lastRowRef}
                            key={cellIndex}
                            className={`
                                relative
               ${cellIndex === row.cells.length - 1 ? '!border-r' : ''}
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
                                <MDXEditor contentEditableClassName="[&_p]:m-0 min-w-[10px]" markdown={cell.content} />
                            ) : (
                                cell.content
                            )}
                        </div>
                    )
                })}
                {moreCount && moreCount > 0
                    ? row.cells.map((cell, cellIndex) => {
                          return (
                              <div key={cellIndex} className={`!p-0 !border-none relative`}>
                                  <button
                                      className="absolute top-0 left-0 w-full h-full py-2 -translate-y-1/2"
                                      onClick={onShowMore}
                                  />
                                  <button
                                      className="absolute top-0 left-0 w-full border-t border-yellow z-[1]"
                                      onClick={onShowMore}
                                  />
                                  {moreCount && cellIndex === row.cells.length - 1 ? (
                                      <button
                                          onClick={onShowMore}
                                          className="leading-none text-[11px] absolute right-0 -translate-y-1/2 translate-x-1/2 size-6 rounded-full bg-yellow dark:text-black text-white flex items-center justify-center z-[1] border-white dark:border-black border font-semibold"
                                      >
                                          {`+${moreCount}`}
                                      </button>
                                  ) : null}
                              </div>
                          )
                      })
                    : null}
            </React.Fragment>
        </>
    )
}

const GroupedRows = ({
    rows,
    lastRowRef,
    rowAlignment,
    columns,
    editable,
}: {
    rows: Row[]
    lastRowRef: any
    rowAlignment: 'top' | 'center'
    columns?: Column[]
    editable: boolean
}) => {
    const [showMore, setShowMore] = useState(false)
    return (
        <>
            {(showMore ? rows : rows.slice(0, 1)).map((row, rowIndex) => (
                <Row
                    key={rowIndex}
                    row={row}
                    lastRowRef={rowIndex === rows.length - 1 ? lastRowRef : null}
                    rowAlignment={rowAlignment}
                    columns={columns}
                    editable={editable}
                    moreCount={showMore ? undefined : rows.length - 1}
                    onShowMore={() => setShowMore(true)}
                />
            ))}
        </>
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
    overflowX = false,
    groupBy,
}) => {
    const gridClass = columns?.map((col) => col.width || 'auto').join(' ') || ''
    const [lastRowRef, lastRowInView] = useInView({ threshold: 0.1 })
    const groupIndex = columns?.findIndex((col) => col.name === groupBy)

    useEffect(() => {
        if (lastRowInView) {
            onLastRowInView?.()
        }
    }, [lastRowInView])

    return (
        <>
            <div
                className={`${
                    overflowX ? ' min-w-full overflow-x-auto w-0' : ''
                } text-primary grid divide-x divide-y divide-border border-b border-primary text-[15px] [&>div]:px-2 ${
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
                                className={`text-sm border-l border-t border-primary bg-input font-bold ${
                                    index === columns.length - 1 ? '!border-r' : ''
                                } ${column.align === 'center' ? 'text-center' : ''} ${column.className || ''}`}
                            >
                                {column.name}
                            </div>
                        ))}
                    </>
                )}

                {/* Data Rows */}
                {groupBy
                    ? Object.entries(
                          _groupBy(
                              rows,
                              `cells[${columns?.findIndex((col) => col.name === groupBy)}].content.props.children`
                          )
                      ).map(([_group, value], index) => (
                          <GroupedRows
                              key={index}
                              rows={value}
                              lastRowRef={lastRowRef}
                              rowAlignment={rowAlignment}
                              columns={columns}
                              editable={editable}
                          />
                      ))
                    : rows.map((row, rowIndex) => (
                          <Row
                              key={rowIndex}
                              row={row}
                              lastRowRef={rowIndex === rows.length - 1 ? lastRowRef : null}
                              rowAlignment={rowAlignment}
                              columns={columns}
                              editable={editable}
                          />
                      ))}
            </div>
            {loading && <RowSkeleton />}
        </>
    )
}

export default OSTable
