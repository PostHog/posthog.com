import { IconArrowLeft, IconArrowRight, IconSpinner } from '@posthog/icons'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { groupBy as _groupBy } from 'lodash'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { CallToAction } from 'components/CallToAction'
import OSButton from 'components/OSButton'

interface Column {
    name: string | React.ReactNode
    align?: 'left' | 'center' | 'right'
    width?: string
    className?: string
}

interface Row {
    key?: string
    cells: {
        content: React.ReactNode
        className?: string
        style?: React.CSSProperties
    }[]
}

interface OSTableProps {
    columns?: Column[]
    rows: Row[]
    className?: string
    rowAlignment?: 'top' | 'center'
    size?: 'sm' | 'md' | 'lg'
    width?: string
    editable?: boolean
    onLastRowInView?: () => void
    loading?: boolean
    groupBy?: string
    fetchMore?: () => void
    type?: string
    pagination?: {
        totalPages: number
        currentPage: number
        nextPage: () => void
        prevPage: () => void
        goToPage: (page: number) => void
        hasNextPage: boolean
        hasPrevPage: boolean
    }
    children?: React.ReactNode
    shadow?: boolean
    background?: 'full' | 'header' | 'none'
}

const RowSkeleton = () => {
    return (
        <div className="flex items-center justify-center mt-4">
            <IconSpinner className="size-7 opacity-60 animate-spin" />
        </div>
    )
}

const Pagination = ({
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
}: {
    currentPage: number
    totalPages: number
    goToPage: (page: number) => void
    nextPage: () => void
    prevPage: () => void
    hasNextPage: boolean
    hasPrevPage: boolean
}) => {
    const getVisiblePages = () => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i)
        }

        const pages = new Set<number>()

        // Always show first page
        pages.add(0)

        // Always show last page
        pages.add(totalPages - 1)

        // Show current page and surrounding pages
        const start = Math.max(0, currentPage - 1)
        const end = Math.min(totalPages - 1, currentPage + 1)

        for (let i = start; i <= end; i++) {
            pages.add(i)
        }

        // Add middle page if there's a big gap
        if (currentPage > 3 && currentPage < totalPages - 4) {
            const middle = Math.floor(totalPages / 2)
            pages.add(middle)
        }

        return Array.from(pages).sort((a, b) => a - b)
    }

    const visiblePages = getVisiblePages()

    const buttonClass = 'px-3 py-1 text-sm border border-border bg-primary hover:bg-accent transition-colors'
    const activeClass = 'bg-accent text-primary font-semibold'
    const disabledClass = 'opacity-50 cursor-not-allowed hover:bg-primary'

    return (
        <div className="flex items-center justify-center gap-2 mt-6 mb-4">
            <OSButton onClick={prevPage} disabled={!hasPrevPage}>
                <IconArrowLeft className="size-4" />
            </OSButton>

            {visiblePages.map((page, index) => {
                const prevPage = visiblePages[index - 1]
                const showGap = prevPage !== undefined && page - prevPage > 1

                return (
                    <React.Fragment key={page}>
                        {showGap && <span className="px-2 text-muted">...</span>}
                        <OSButton onClick={() => goToPage(page)} className={page === currentPage ? 'font-bold' : ''}>
                            {page + 1}
                        </OSButton>
                    </React.Fragment>
                )
            })}

            <OSButton onClick={nextPage} disabled={!hasNextPage}>
                <IconArrowRight className="size-4" />
            </OSButton>
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
    type,
    isLastRow = false,
    background = 'full',
}: {
    row: Row
    lastRowRef: any
    rowAlignment: 'top' | 'center'
    columns?: Column[]
    editable: boolean
    moreCount?: number
    onShowMore?: () => void
    type?: string
    isLastRow?: boolean
    background?: 'full' | 'header' | 'none'
}) => {
    const hasMoreRow = !!(moreCount && moreCount > 0)
    const cellBg = background === 'full' ? 'bg-primary' : ''
    const moreRowBg = background === 'full' ? 'bg-accent hover:bg-input-hover' : 'bg-accent/50 hover:bg-accent'
    return (
        <>
            <React.Fragment>
                {row.cells.map((cell, cellIndex) => {
                    const isFirstCell = cellIndex === 0
                    const isLastCell = cellIndex === row.cells.length - 1
                    const roundBottomLeft = isLastRow && !hasMoreRow && isFirstCell
                    const roundBottomRight = isLastRow && !hasMoreRow && isLastCell
                    return (
                        <div
                            ref={lastRowRef}
                            key={cellIndex}
                            className={`
                                relative
               ${cellBg}
               ${isLastCell ? '!border-r' : ''}
               ${roundBottomLeft ? 'rounded-bl-md' : ''}
               ${roundBottomRight ? 'rounded-br-md' : ''}
            ${rowAlignment === 'center' ? 'flex items-center' : ''}
            ${
                columns?.[cellIndex]?.align === 'right'
                    ? 'text-right'
                    : columns?.[cellIndex]?.align === 'center'
                    ? 'text-center'
                    : ''
            } ${cell.className || ''}`}
                            style={cell.style}
                        >
                            {cell.content}
                        </div>
                    )
                })}
                {hasMoreRow ? (
                    <div
                        className={`col-span-full text-center !py-0 !border-r border-primary ${moreRowBg} ${
                            isLastRow ? 'rounded-b-md' : ''
                        }`}
                    >
                        <button
                            onClick={onShowMore}
                            className="text-primary hover:text-accent font-semibold text-[13px] w-full py-1"
                        >
                            Show {moreCount} more {moreCount === 1 ? type : `${type}s`}
                        </button>
                    </div>
                ) : null}
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
    type,
    isLastGroup = false,
    background = 'full',
}: {
    rows: Row[]
    lastRowRef: any
    rowAlignment: 'top' | 'center'
    columns?: Column[]
    editable: boolean
    type?: string
    isLastGroup?: boolean
    background?: 'full' | 'header' | 'none'
}) => {
    const [showMore, setShowMore] = useState(false)
    const visibleRows = showMore ? rows : rows.slice(0, 1)
    return (
        <>
            {visibleRows.map((row, rowIndex) => (
                <Row
                    key={rowIndex}
                    row={row}
                    lastRowRef={rowIndex === rows.length - 1 ? lastRowRef : null}
                    rowAlignment={rowAlignment}
                    columns={columns}
                    editable={editable}
                    moreCount={showMore ? undefined : rows.length - 1}
                    onShowMore={() => setShowMore(true)}
                    type={type}
                    isLastRow={isLastGroup && rowIndex === visibleRows.length - 1}
                    background={background}
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
    width = 'auto',
    onLastRowInView,
    loading,
    groupBy,
    fetchMore,
    pagination,
    type,
    children,
    shadow = false,
    background = 'full',
}) => {
    const headerBg = background === 'none' ? '' : 'bg-input'
    const gridClass = columns?.map((col) => col.width || 'auto').join(' ') || ''
    const [lastRowRef, lastRowInView] = useInView({ threshold: 0.1 })
    const groupIndex = columns?.findIndex((col) => col.name === groupBy)

    useEffect(() => {
        if (lastRowInView) {
            onLastRowInView?.()
        }
    }, [lastRowInView])
    return (
        <div
            className={`OSTable md:@2xs/not-full-width:mx-0 mb-2 relative ${
                width === 'full' ? '' : '-mx-4 @md/reader-content-container:-mx-6 @lg/reader-content-container:-mx-8'
            }`}
        >
            {shadow && (
                <div
                    aria-hidden
                    className="hidden @sm:block pointer-events-none absolute inset-0 bg-black blur-xl opacity-10 -z-10 rounded-md"
                />
            )}
            <ScrollArea fullWidth>
                <div
                    className={`md:@2xs/not-full-width:px-0 flex ${
                        width === 'full'
                            ? ''
                            : 'px-4 @md/reader-content-container:px-6 @lg/reader-content-container:px-8'
                    }`}
                >
                    <div
                        className={`text-primary inline-grid max-w-full divide-x divide-y divide-border border-b border-primary text-[15px] [&>div]:px-2 rounded-md ${
                            width === 'full' ? 'w-full' : 'w-min'
                        } ${
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
                                        className={`text-sm border-l border-t border-primary ${headerBg} font-bold ${
                                            index === 0 ? 'rounded-tl-md' : ''
                                        } ${index === columns.length - 1 ? '!border-r rounded-tr-md' : ''} ${
                                            column.align === 'center' ? 'text-center' : ''
                                        } ${column.className || ''}`}
                                    >
                                        {column.name}
                                    </div>
                                ))}
                            </>
                        )}

                        {/* Data Rows */}
                        {groupBy
                            ? (() => {
                                  const groupedEntries = Object.entries(
                                      _groupBy(
                                          rows,
                                          `cells[${columns?.findIndex(
                                              (col) => typeof col.name === 'string' && col.name === groupBy
                                          )}].content.props.children`
                                      )
                                  )
                                  return groupedEntries.map(([_group, value], index) => (
                                      <GroupedRows
                                          key={index}
                                          rows={value as Row[]}
                                          lastRowRef={lastRowRef}
                                          rowAlignment={rowAlignment}
                                          columns={columns}
                                          editable={editable}
                                          type={_group ? `${_group.toLowerCase()} ${type}` : type}
                                          isLastGroup={index === groupedEntries.length - 1}
                                          background={background}
                                      />
                                  ))
                              })()
                            : rows?.map((row, rowIndex) => (
                                  <Row
                                      key={row.key || rowIndex}
                                      row={row}
                                      lastRowRef={rowIndex === rows.length - 1 ? lastRowRef : null}
                                      rowAlignment={rowAlignment}
                                      columns={columns}
                                      editable={editable}
                                      type={type}
                                      isLastRow={rowIndex === rows.length - 1}
                                      background={background}
                                  />
                              ))}
                    </div>
                    {(loading || fetchMore) && (
                        <div className="mt-4 mb-16">
                            {loading ? (
                                <RowSkeleton />
                            ) : fetchMore ? (
                                <CallToAction onClick={() => fetchMore()} size="md" width="full">
                                    Load more
                                </CallToAction>
                            ) : null}
                        </div>
                    )}
                </div>
                {children}
                {pagination && (
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        goToPage={pagination.goToPage}
                        nextPage={pagination.nextPage}
                        prevPage={pagination.prevPage}
                        hasNextPage={pagination.hasNextPage}
                        hasPrevPage={pagination.hasPrevPage}
                    />
                )}
            </ScrollArea>
        </div>
    )
}

export default OSTable
