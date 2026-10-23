import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { IconChevronRight, IconEllipsis } from '@posthog/icons'
import SiteLink from 'components/Link'
import type { Props as SiteLinkProps } from 'components/Link'
import { Button } from '../Button'
import { Menu } from '../Menu'
import { focusRing } from '../styles'
import { cn } from '../../../utils'

export type BreadcrumbsRootProps = React.ComponentPropsWithoutRef<'nav'> & {
    maxItems?: number
}

const Item = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(function BreadcrumbsItem(
    { className, ...props },
    ref
) {
    return <li ref={ref} className={cn('min-w-0 shrink', className)} {...props} />
})

function Link({ className, contextMenu = false, ...props }: SiteLinkProps): JSX.Element {
    return (
        <SiteLink
            contextMenu={contextMenu}
            className={cn(
                `block truncate text-secondary hover:text-primary no-underline hover:underline underline-offset-4 ${focusRing}`,
                className
            )}
            {...props}
        />
    )
}

const Separator = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(function BreadcrumbsSeparator(
    { className, children = <IconChevronRight className="size-4" />, ...props },
    ref
) {
    return (
        <li
            ref={ref}
            {...props}
            role="presentation"
            aria-hidden="true"
            className={cn('flex shrink-0 items-center text-muted', className)}
        >
            {children}
        </li>
    )
})

const Page = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(function BreadcrumbsPage(
    { className, ...props },
    ref
) {
    return <span ref={ref} {...props} aria-current="page" className={cn('block truncate text-primary', className)} />
})

function childParts(children: React.ReactNode): React.ReactNode[] {
    return React.Children.toArray(children).flatMap((child) =>
        React.isValidElement<{ children?: React.ReactNode }>(child) && child.type === React.Fragment
            ? childParts(child.props.children)
            : [child]
    )
}

function CollapsedItems({ items }: { items: React.ReactElement<{ children?: React.ReactNode }>[] }): JSX.Element {
    return (
        <li className="flex shrink-0 items-center">
            <Menu.Root>
                <Menu.Trigger
                    render={<Button variant="default" size="sm" className="-my-[3px] px-1" />}
                    aria-label="Show hidden breadcrumbs"
                >
                    <IconEllipsis aria-hidden="true" className="size-4" />
                </Menu.Trigger>
                <Menu.Popup align="start">
                    {items.map((item) => {
                        const content = childParts(item.props.children).find(
                            (child) => React.isValidElement(child) && child.type !== Separator
                        )
                        if (React.isValidElement<SiteLinkProps>(content) && content.type === Link) {
                            const { to, state, onClick, children, external } = content.props
                            return (
                                <Menu.LinkItem
                                    key={item.key}
                                    render={
                                        /^\/(?!\/)/.test(to) && !external ? (
                                            <GatsbyLink to={to} state={state} onClick={onClick} />
                                        ) : (
                                            <a
                                                href={to}
                                                onClick={onClick}
                                                target={external ? '_blank' : undefined}
                                                rel={external ? 'noopener noreferrer' : undefined}
                                            />
                                        )
                                    }
                                    className="max-w-[min(24rem,var(--available-width))]"
                                >
                                    <span className="truncate">{children}</span>
                                </Menu.LinkItem>
                            )
                        }
                        if (
                            React.isValidElement<React.ComponentPropsWithoutRef<'button'>>(content) &&
                            content.type === 'button'
                        ) {
                            return (
                                <Menu.Item key={item.key} render={content}>
                                    {content.props.children}
                                </Menu.Item>
                            )
                        }
                        return (
                            <Menu.Item key={item.key} disabled>
                                {content}
                            </Menu.Item>
                        )
                    })}
                </Menu.Popup>
            </Menu.Root>
        </li>
    )
}

const Root = React.forwardRef<HTMLElement, BreadcrumbsRootProps>(function BreadcrumbsRoot(
    { className, children, maxItems, ...props },
    ref
) {
    const parts = childParts(children)
    const items = parts.filter(
        (child): child is React.ReactElement<{ children?: React.ReactNode }> =>
            React.isValidElement(child) && child.type === Item
    )
    const limit = maxItems !== undefined && Number.isFinite(maxItems) ? Math.max(3, Math.floor(maxItems)) : items.length
    const collapsed = items.length > limit
    const tailStart = items.length - (limit - 2)
    const firstIndex = parts.indexOf(items[0])
    const tailIndex = parts.indexOf(items[tailStart])

    return (
        <nav ref={ref} aria-label="Breadcrumb" {...props} className={cn('min-w-0', className)}>
            <ol className="m-0 flex min-w-0 list-none items-center gap-2 p-0 text-sm">
                {collapsed ? (
                    <>
                        {parts.slice(0, firstIndex + 1)}
                        <Separator />
                        <CollapsedItems items={items.slice(1, tailStart)} />
                        {React.isValidElement(parts[tailIndex - 1]) &&
                        (parts[tailIndex - 1] as React.ReactElement).type === Separator ? (
                            parts[tailIndex - 1]
                        ) : (
                            <Separator />
                        )}
                        {parts.slice(tailIndex)}
                    </>
                ) : (
                    children
                )}
            </ol>
        </nav>
    )
})

export const Breadcrumbs = { Root, Item, Link, Separator, Page }
