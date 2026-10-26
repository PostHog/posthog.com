import React from 'react'
import { IconChevronLeft, IconChevronRight } from '@posthog/icons'
import { Button, ButtonLink, IconButton } from '../Button'
import { cn } from '../../../utils'

export type PaginationProps = Omit<React.ComponentPropsWithoutRef<'nav'>, 'children' | 'onChange'> & {
    page: number
    pageCount: number
    onPageChange?: (page: number) => void
    getPageHref?: (page: number) => string
    siblingCount?: number
    size?: 'sm' | 'md' | 'lg'
    compact?: boolean
}

function pageRange(first: number, last: number): number[] {
    return Array.from({ length: last - first + 1 }, (_, index) => first + index)
}

function visiblePages(page: number, pageCount: number, siblingCount: number): number[] {
    const slotCount = siblingCount * 2 + 5
    if (pageCount <= slotCount) return pageRange(1, pageCount)

    const edgeRun = siblingCount * 2 + 3
    if (page <= siblingCount + 3) return [...pageRange(1, edgeRun), pageCount]
    if (page >= pageCount - siblingCount - 2) return [1, ...pageRange(pageCount - edgeRun + 1, pageCount)]
    return [1, ...pageRange(page - siblingCount, page + siblingCount), pageCount]
}

const pageMinWidths = { sm: 'min-w-[26px]', md: 'min-w-[36px]', lg: 'min-w-[44px]' }

const pageButtonClassName =
    'shrink-0 tabular-nums motion-reduce:transition-none data-[pressed]:bg-[rgb(var(--text-primary)/0.1)] dark:data-[pressed]:bg-[rgb(var(--text-primary)/0.1)]'

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(function Pagination(
    { page, pageCount, onPageChange, getPageHref, siblingCount = 1, size = 'md', compact = false, className, ...props },
    ref
) {
    const count = Number.isFinite(pageCount) ? Math.max(0, Math.floor(pageCount)) : 0
    if (count === 0) return null

    const currentPage = Number.isFinite(page) ? Math.min(count, Math.max(1, Math.floor(page))) : 1
    const siblings = Number.isFinite(siblingCount) ? Math.max(0, Math.floor(siblingCount)) : 1
    const pages = visiblePages(currentPage, count, siblings)
    const previousDisabled = currentPage === 1
    const nextDisabled = currentPage === count

    function directionControl(direction: 'previous' | 'next') {
        const disabled = direction === 'previous' ? previousDisabled : nextDisabled
        const target = currentPage + (direction === 'previous' ? -1 : 1)
        const icon = direction === 'previous' ? <IconChevronLeft /> : <IconChevronRight />
        const label = direction === 'previous' ? 'Previous page' : 'Next page'

        return getPageHref && !disabled ? (
            <ButtonLink
                to={getPageHref(target)}
                size={size}
                icon={icon}
                aria-label={label}
                rel={direction === 'previous' ? 'prev' : 'next'}
                className="shrink-0 motion-reduce:transition-none"
            />
        ) : (
            <IconButton
                size={size}
                icon={icon}
                aria-label={label}
                disabled={disabled || !onPageChange}
                onClick={() => onPageChange?.(target)}
                className="shrink-0 motion-reduce:transition-none"
            />
        )
    }

    return (
        <nav ref={ref} aria-label="Pagination" {...props} className={cn('flex items-center gap-1', className)}>
            {directionControl('previous')}
            {compact ? (
                <span className="whitespace-nowrap px-2 text-sm text-secondary tabular-nums">
                    Page {currentPage} of {count}
                </span>
            ) : (
                pages.map((number, index) => {
                    const isCurrent = number === currentPage
                    const previousPage = pages[index - 1]
                    return (
                        <React.Fragment key={number}>
                            {previousPage !== undefined && number - previousPage > 1 && (
                                <span aria-hidden="true" className="px-1 text-muted">
                                    …
                                </span>
                            )}
                            {getPageHref ? (
                                <ButtonLink
                                    to={getPageHref(number)}
                                    size={size}
                                    aria-label={`Page ${number}`}
                                    aria-current={isCurrent ? 'page' : undefined}
                                    data-pressed={isCurrent ? '' : undefined}
                                    className={cn(pageButtonClassName, pageMinWidths[size])}
                                >
                                    {number}
                                </ButtonLink>
                            ) : (
                                <Button
                                    size={size}
                                    aria-label={`Page ${number}`}
                                    aria-current={isCurrent ? 'page' : undefined}
                                    data-pressed={isCurrent ? '' : undefined}
                                    disabled={!onPageChange}
                                    onClick={() => onPageChange?.(number)}
                                    className={cn(pageButtonClassName, pageMinWidths[size])}
                                >
                                    {number}
                                </Button>
                            )}
                        </React.Fragment>
                    )
                })
            )}
            {directionControl('next')}
        </nav>
    )
})
