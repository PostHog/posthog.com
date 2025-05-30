import React, { useEffect, useState, useMemo } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { IconChevronRight } from '@posthog/icons'
import { motion } from 'framer-motion'
import { useLocation } from '@reach/router'
import { replacePath } from '../../../gatsby/utils'
import OSButton from 'components/OSButton'

interface MenuItem {
    name: string
    url?: string
    children?: MenuItem[]
    icon?: React.ReactNode
}

interface TreeMenuProps {
    items: MenuItem[]
    activeItem?: MenuItem
}

const TreeLink = ({
    menuItem,
    index,
    onClick,
    activeItem,
}: {
    menuItem: MenuItem
    index: number
    onClick: (item: MenuItem) => void
    activeItem: MenuItem
}) => {
    const active = menuItem === activeItem

    return menuItem.url ? (
        <OSButton
            variant="ghost"
            active={active}
            align="left"
            width="full"
            asLink
            to={menuItem.url}
            className={index === 0 ? '' : index === 1 ? 'pl-7' : 'pl-11'}
            onClick={() => onClick(menuItem)}
            icon={typeof menuItem.icon !== 'string' && menuItem.icon}
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

const getActiveItem = (items: MenuItem[], currentUrl: string): MenuItem | undefined => {
    for (const item of items) {
        if (item.url === currentUrl) {
            return item
        }
        if (item.children?.length) {
            const activeChild = getActiveItem(item.children, currentUrl)
            if (activeChild) {
                return activeChild
            }
        }
    }
    return undefined
}

export function TreeMenu(props: TreeMenuProps) {
    const [activeItem, setActiveItem] = useState<MenuItem>(
        props.activeItem || getActiveItem(props.items, window.location.pathname)
    )

    const handleClick = (item: MenuItem) => {
        setActiveItem(item)
    }

    const items = useMemo(() => props.items, [])

    return (
        <div className="space-y-px">
            {items.map((item) => {
                const hasChildren = item.children && item.children.length > 0
                return hasChildren ? (
                    <TreeMenuItem key={item.name} item={item} activeItem={activeItem} index={0} onClick={handleClick} />
                ) : (
                    <TreeLink menuItem={item} index={0} onClick={handleClick} activeItem={activeItem} />
                )
            })}
        </div>
    )
}

const isOpen = (children: MenuItem[], activeItem: MenuItem): boolean => {
    return (
        children &&
        children.some((child: MenuItem) => {
            return child === activeItem || (child.children && isOpen(child.children, activeItem))
        })
    )
}

function TreeMenuItem({
    item,
    activeItem,
    index = 0,
    onClick,
}: {
    item: MenuItem
    activeItem: MenuItem
    index: number
    onClick: (item: MenuItem) => void
}) {
    const [open, setOpen] = useState(false)
    const hasChildren = item.children && item.children.length > 0
    const location = useLocation()
    const pathname = replacePath(location?.pathname)

    const handleOpenChange = (open) => {
        setOpen(open)
    }

    useEffect(() => {
        if (item.children) {
            setOpen(isOpen(item.children, activeItem))
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
                    active={activeItem === item}
                    onClick={() => onClick(item)}
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
                    <div className="space-y-px">
                        {item.children?.map((child) => {
                            const hasChildren = child.children && child.children.length > 0
                            return hasChildren ? (
                                <TreeMenuItem
                                    key={child.name}
                                    item={child}
                                    activeItem={activeItem}
                                    index={index + 1}
                                    onClick={onClick}
                                />
                            ) : (
                                <TreeLink
                                    menuItem={child}
                                    index={index + 1}
                                    onClick={onClick}
                                    activeItem={activeItem}
                                />
                            )
                        })}
                    </div>
                </Collapsible.Content>
            )}
        </Collapsible.Root>
    )
}
