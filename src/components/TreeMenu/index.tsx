import React, { useEffect, useState } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { IconChevronRight } from '@posthog/icons'
import { motion } from 'framer-motion'
import Link from 'components/Link'
import { useLocation } from '@reach/router'
import { replacePath } from '../../../gatsby/utils'
import OSButton from 'components/OSButton'

interface MenuItem {
    name: string
    url?: string
    children?: MenuItem[]
}

interface TreeMenuProps {
    items: MenuItem[]
    activeItem?: MenuItem
}

const TreeLink = ({ menuItem, index }: { menuItem: MenuItem; index: number }) => {
    const location = useLocation()
    const pathname = replacePath(location?.pathname)
    const active = pathname === menuItem.url
    return menuItem.url ? (
        <OSButton
            variant="ghost"
            align="left"
            width="full"
            asLink
            to={menuItem.url}
            className={index === 0 ? '' : index === 1 ? 'pl-7' : 'pl-11'}
        >
            {menuItem.name}
        </OSButton>
    ) : (
        <div
            className={`text-muted text-sm py-0.5 ${index === 0 ? 'ml-2' : index === 1 ? 'ml-1' : ''} ${
                index === 0 ? '' : index === 1 ? 'pl-6' : 'pl-11'
            }`}
        >
            {menuItem.name}
        </div>
    )
}

export function TreeMenu({ items, activeItem }: TreeMenuProps) {
    return (
        <div className="space-y-px">
            {items.map((item) => {
                const hasChildren = item.children && item.children.length > 0
                return hasChildren ? (
                    <TreeMenuItem key={item.name} item={item} activeItem={activeItem} index={0} />
                ) : (
                    <TreeLink menuItem={item} index={0} />
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

function TreeMenuItem({ item, activeItem, index = 0 }: { item: MenuItem; activeItem?: MenuItem; index: number }) {
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
            <Collapsible.Trigger asChild>
                <OSButton
                    variant="ghost"
                    align="left"
                    width="full"
                    className={index === 0 ? '' : index === 1 ? 'pl-6' : 'pl-11'}
                >
                    {hasChildren && (
                        <motion.div animate={{ rotate: open ? 90 : 0 }}>
                            <IconChevronRight className="size-4" />
                        </motion.div>
                    )}
                    <span className={`${open ? 'font-semibold' : ''}`}>{item.name}</span>
                </OSButton>
            </Collapsible.Trigger>

            {hasChildren && (
                <Collapsible.Content>
                    <div className="children">
                        {item.children?.map((child) => {
                            const hasChildren = child.children && child.children.length > 0
                            return hasChildren ? (
                                <TreeMenuItem key={child.name} item={child} activeItem={activeItem} index={index + 1} />
                            ) : (
                                <TreeLink menuItem={child} index={index + 1} />
                            )
                        })}
                    </div>
                </Collapsible.Content>
            )}
        </Collapsible.Root>
    )
}
