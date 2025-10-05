import { linkPlugin, MDXEditor } from '@mdxeditor/editor'
import { IconArrowLeft, IconArrowRight, IconSpinner } from '@posthog/icons'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { groupBy as _groupBy } from 'lodash'
import { navigate } from 'gatsby'
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

const Editor = ({ markdown }: { markdown: string }) => {
    const mdxEditorContainerRef = React.useRef<HTMLDivElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const href = (event.target as HTMLElement).closest('a.mdx-editor-link')?.getAttribute('href')
        if (href) {
            navigate(href, { state: { newWindow: true } })
        }
    }

    return (
        <div onClick={handleClick} ref={mdxEditorContainerRef}>
            <MDXEditor
                lexicalTheme={{
                    link: 'mdx-editor-link cursor-pointer',
                }}
                contentEditableClassName="[&_p]:m-0 min-w-[10px]"
                markdown={markdown}
                plugins={[linkPlugin()]}
            />
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
}: {
    row: Row
    lastRowRef: any
    rowAlignment: 'top' | 'center'
    columns?: Column[]
    editable: boolean
    moreCount?: number
    onShowMore?: () => void
    type?: string
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
                            {cell.content}
                        </div>
                    )
                })}
                {moreCount && moreCount > 0 ? (
                    <div className="col-span-full text-center !py-0 !border-r border-primary bg-accent/50 hover:bg-accent">
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
}: {
    rows: Row[]
    lastRowRef: any
    rowAlignment: 'top' | 'center'
    columns?: Column[]
    editable: boolean
    type?: string
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
                    type={type}
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
    groupBy,
    fetchMore,
    pagination,
    type,
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
        <div className="-mx-4 @xl:-mx-8">
            <ScrollArea fullWidth>
                <div className="px-4 @xl:px-8">
                    <div
                        className={`text-primary grid divide-x divide-y divide-border border-b border-primary text-[15px] min-w-full w-0 [&>div]:px-2 ${
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
                                      `cells[${columns?.findIndex(
                                          (col) => typeof col.name === 'string' && col.name === groupBy
                                      )}].content.props.children`
                                  )
                              ).map(([_group, value], index) => (
                                  <GroupedRows
                                      key={index}
                                      rows={value}
                                      lastRowRef={lastRowRef}
                                      rowAlignment={rowAlignment}
                                      columns={columns}
                                      editable={editable}
                                      type={_group ? `${_group.toLowerCase()} ${type}` : type}
                                  />
                              ))
                            : rows.map((row, rowIndex) => (
                                  <Row
                                      key={row.key || rowIndex}
                                      row={row}
                                      lastRowRef={rowIndex === rows.length - 1 ? lastRowRef : null}
                                      rowAlignment={rowAlignment}
                                      columns={columns}
                                      editable={editable}
                                      type={type}
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
                </div>
            </ScrollArea>
        </div>
    )
}

export default OSTable
