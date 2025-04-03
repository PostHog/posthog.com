import React, { useEffect, useState } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { IconChevronRight } from '@posthog/icons'
import { motion } from 'framer-motion'
import Link from 'components/Link'
import { useLocation } from '@reach/router'
import { replacePath } from '../../../gatsby/utils'

interface MenuItem {
    name: string
    url?: string
    children?: MenuItem[]
}

interface TreeMenuProps {
    items: MenuItem[]
    activeItem?: MenuItem
}

const TreeLink = (menuItem: MenuItem) => {
    const location = useLocation()
    const pathname = replacePath(location?.pathname)
    const active = pathname === menuItem.url
    return menuItem.url ? (
        <Link className={`block ${active ? 'bg-accent' : ''}`} to={menuItem.url}>
            {menuItem.name}
        </Link>
    ) : (
        <span className="opacity-50 block">{menuItem.name}</span>
    )
}

export function TreeMenu({ items, activeItem }: TreeMenuProps) {
    return (
        <div className="space-y-1">
            {items.map((item) => {
                const hasChildren = item.children && item.children.length > 0
                return hasChildren ? (
                    <TreeMenuItem key={item.name} item={item} activeItem={activeItem} />
                ) : (
                    <TreeLink {...item} />
                )
            })}
        </div>
    )
}

const isOpen = (children: MenuItem[], pathname: string): boolean => {
    return (
        children &&
        children.some((child: MenuItem) => {
            return child.url === pathname || (child.children && isOpen(child.children, pathname))
        })
    )
}

function TreeMenuItem({ item, activeItem }: { item: MenuItem; activeItem?: MenuItem }) {
    const [open, setOpen] = useState(false)
    const hasChildren = item.children && item.children.length > 0
    const location = useLocation()
    const pathname = replacePath(location?.pathname)

    const handleOpenChange = (open) => {
        setOpen(open)
    }

    useEffect(() => {
        if (item.children) {
            setOpen(isOpen(item.children, pathname))
        }
    }, [pathname])

    return (
        <Collapsible.Root open={open} onOpenChange={handleOpenChange}>
            <Collapsible.Trigger className="flex w-full text-left items-center gap-1">
                {hasChildren && (
                    <motion.div animate={{ rotate: open ? 90 : 0 }}>
                        <IconChevronRight className="size-4" />
                    </motion.div>
                )}
                <span className={`${open ? 'font-semibold' : ''}`}>{item.name}</span>
            </Collapsible.Trigger>

            {hasChildren && (
                <Collapsible.Content>
                    <div className="ml-5">
                        {item.children?.map((child) => {
                            const hasChildren = child.children && child.children.length > 0
                            return hasChildren ? (
                                <TreeMenuItem key={child.name} item={child} activeItem={activeItem} />
                            ) : (
                                <TreeLink {...child} />
                            )
                        })}
                    </div>
                </Collapsible.Content>
            )}
        </Collapsible.Root>
    )
}
