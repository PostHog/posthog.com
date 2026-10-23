import React from 'react'
import { cn } from '../../../utils'
import { insetFocusRing, surfaceVariants } from '../styles'
import type { Surface } from '../styles'
import { withClassName } from '../utils'

export type TableDensity = 'compact' | 'default'
export type TableSort = 'ascending' | 'descending' | 'none'
export type TableAlign = 'start' | 'center' | 'end'

export type TableRootProps = React.TableHTMLAttributes<HTMLTableElement> & {
    surface?: Surface
    density?: TableDensity
    striped?: boolean
    interactive?: boolean
    stickyHeader?: boolean
    containerProps?: React.HTMLAttributes<HTMLDivElement>
}

export type TableHeadProps = Omit<React.ThHTMLAttributes<HTMLTableCellElement>, 'align'> & {
    align?: TableAlign
    sort?: TableSort
    onSort?: () => void
}

export type TableCellProps = Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'align'> & {
    align?: TableAlign
}

type TableContextValue = { density: TableDensity; stickyHeader: boolean; surface: Surface }

const TableContext = React.createContext<TableContextValue>({
    density: 'default',
    stickyHeader: false,
    surface: 'outlined',
})

const alignment = { start: 'text-start', center: 'text-center', end: 'text-end' }

const cellBase = '!border-t-0 !border-[rgb(var(--text-primary)/0.14)] !align-middle'

const cellPadding: Record<TableDensity, string> = {
    default: '!px-3 !py-2.5',
    compact: '!px-3 !py-1',
}

const headStyles = {
    col: '!text-[13px] font-semibold text-secondary',
    row: '!text-sm font-medium text-primary',
}

const stripedRows = '[:where(&>tbody>tr:nth-child(even))]:bg-[rgb(var(--text-primary)/0.035)]'

const rowHover = '[:where(&>tbody>tr:hover>*)]:bg-[rgb(var(--text-primary)/0.05)]'

const stickyHeaderFill = 'sticky top-0 z-10 !bg-primary'

const stickyHeaderTints: Record<Surface, string> = {
    plain: '',
    outlined: '',
    raised: 'bg-[image:linear-gradient(rgb(255_255_255/0.6),rgb(255_255_255/0.6))] dark:bg-[image:linear-gradient(rgb(255_255_255/0.06),rgb(255_255_255/0.06))]',
}

const sortButton = `group/sort -mx-1.5 -my-1 inline-flex max-w-[calc(100%+0.75rem)] items-center gap-1 rounded px-1.5 py-1 hover:bg-[rgb(var(--text-primary)/0.07)] hover:text-primary active:bg-[rgb(var(--text-primary)/0.1)] ${insetFocusRing}`

const Root = React.forwardRef<HTMLTableElement, TableRootProps>(function TableRoot(
    {
        surface = 'outlined',
        density = 'default',
        striped = false,
        interactive = false,
        stickyHeader = false,
        containerProps = {},
        className,
        ...props
    },
    ref
) {
    const { className: containerClassName, ...scrollProps } = containerProps
    const context = React.useMemo(() => ({ density, stickyHeader, surface }), [density, stickyHeader, surface])
    return (
        <TableContext.Provider value={context}>
            <div
                {...scrollProps}
                className={cn(surfaceVariants[surface], 'overflow-auto text-primary', containerClassName)}
            >
                <table
                    {...props}
                    ref={ref}
                    className={cn(
                        'm-0 w-full border-separate border-spacing-0 text-sm',
                        striped && stripedRows,
                        interactive && rowHover,
                        className
                    )}
                />
            </div>
        </TableContext.Provider>
    )
})

const Header = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    function TableHeader({ className, ...props }, ref) {
        const { stickyHeader, surface } = React.useContext(TableContext)
        return (
            <thead
                {...props}
                ref={ref}
                className={cn(
                    '!bg-transparent [&>tr>th]:border-b',
                    stickyHeader && cn(stickyHeaderFill, stickyHeaderTints[surface]),
                    className
                )}
            />
        )
    }
)

function SortIcon({ sort }: { sort: TableSort }): JSX.Element {
    const idle = 'opacity-30 transition-opacity duration-150 group-hover/sort:opacity-60 motion-reduce:transition-none'
    return (
        <svg aria-hidden="true" viewBox="0 0 8 12" className="h-3 w-2 shrink-0 fill-current">
            <path d="M4 1.5 7 5H1z" className={sort === 'ascending' ? undefined : idle} />
            <path d="M4 10.5 1 7h6z" className={sort === 'descending' ? undefined : idle} />
        </svg>
    )
}

const Head = React.forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
    { align = 'start', sort, onSort, className, children, scope = 'col', ...props },
    ref
) {
    const { density } = React.useContext(TableContext)
    const rowHeader = scope === 'row' || scope === 'rowgroup'
    const sorted = sort === 'ascending' || sort === 'descending'
    const label = sort ? (
        <>
            <span className="min-w-0">{children}</span>
            <SortIcon sort={sort} />
        </>
    ) : (
        children
    )
    const labelLayout = cn('items-center gap-1', align === 'end' && 'flex-row-reverse')

    return (
        <th
            {...props}
            ref={ref}
            scope={scope}
            aria-sort={sort}
            className={cn(
                cellBase,
                cellPadding[density],
                '!table-cell !opacity-100',
                rowHeader ? headStyles.row : headStyles.col,
                sorted && 'text-primary',
                alignment[align],
                className
            )}
        >
            {onSort ? (
                <button type="button" onClick={onSort} className={cn(sortButton, labelLayout)}>
                    {label}
                </button>
            ) : sort ? (
                <span className={cn('inline-flex max-w-full', labelLayout)}>{label}</span>
            ) : (
                label
            )}
        </th>
    )
})

const Cell = React.forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
    { align = 'start', className, ...props },
    ref
) {
    const { density } = React.useContext(TableContext)
    return (
        <td
            {...props}
            ref={ref}
            className={cn(cellBase, cellPadding[density], '!text-sm tabular-nums', alignment[align], className)}
        />
    )
})

export const Table = {
    Root,
    Caption: withClassName('caption', 'caption-top px-3 py-2 text-start text-sm text-secondary'),
    Header,
    Body: withClassName('tbody', '[&>tr:not(:last-child)>*]:border-b'),
    Footer: withClassName('tfoot', '[&>tr:first-child>*]:!border-t font-medium'),
    Row: withClassName('tr', ''),
    Head,
    Cell,
}
