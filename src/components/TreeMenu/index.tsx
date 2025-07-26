import React, { useEffect, useState, useMemo } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { IconChevronRight } from '@posthog/icons'
import { motion } from 'framer-motion'
import { useLocation } from '@reach/router'
import { replacePath } from '../../../gatsby/utils'
import OSButton from 'components/OSButton'
import { useWindow } from '../../context/Window'

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
    activeItem: MenuItem | undefined
}) => {
    const active = menuItem === activeItem

    return menuItem.url ? (
        <OSButton
            active={active}
            align="left"
            width="full"
            asLink
            to={menuItem.url}
            className={index === 0 ? '' : `pl-${4 + index * 3}`}
            onClick={() => onClick(menuItem)}
            icon={typeof menuItem.icon !== 'string' && menuItem.icon}
        >
            {menuItem.name}
        </OSButton>
    ) : (
        <div className={`text-muted text-sm py-0.5 !mt-2 ml-${2 + index} pl-${index * 4}`}>{menuItem.name}</div>
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
    const { appWindow } = useWindow()
    const { pathname } = useLocation()
    const [activeItem, setActiveItem] = useState<MenuItem | undefined>(
        props.activeItem || getActiveItem(props.items || [], pathname)
    )

    const handleClick = (item: MenuItem) => {
        setActiveItem(item.children?.[0]?.url ? item.children[0] : item)
    }

    const items = useMemo(() => props.items, [])

    useEffect(() => {
        setActiveItem(getActiveItem(items || [], appWindow?.path || pathname))
    }, [appWindow?.path])

    return (
        <div className="not-prose space-y-px">
            {items?.length > 0 ? (
                items?.map((item, index) => {
                    const key = `${item.name}-${index}-${item.url}`
                    const hasChildren = item.children && item.children.length > 0
                    return hasChildren ? (
                        <TreeMenuItem key={key} item={item} activeItem={activeItem} index={0} onClick={handleClick} />
                    ) : (
                        <TreeLink key={key} menuItem={item} index={0} onClick={handleClick} activeItem={activeItem} />
                    )
                })
            ) : (
                <p className="text-sm">No posts available</p>
            )}
        </div>
    )
}

const isOpen = (children: MenuItem[], activeItem: MenuItem | undefined): boolean => {
    if (!activeItem) return false
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
    activeItem: MenuItem | undefined
    index: number
    onClick: (item: MenuItem) => void
}) {
    const [open, setOpen] = useState(false)
    const hasChildren = item.children && item.children.length > 0
    const location = useLocation()
    const pathname = replacePath(location?.pathname)

    const handleOpenChange = (open: boolean) => {
        setOpen(open)
    }

    useEffect(() => {
        if (item.children && !open && activeItem) {
            setOpen(isOpen(item.children, activeItem))
        }
    }, [pathname])

    return (
        <Collapsible.Root open={open} onOpenChange={handleOpenChange}>
            <Collapsible.Trigger asChild>
                <OSButton
                    align="left"
                    width="full"
                    className={index === 0 ? '' : `pl-${2 + index * 4}`}
                    active={activeItem === item}
                    to={item.url || item.children?.[0]?.url}
                    asLink
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
                        {item.children?.map((child, childIndex) => {
                            const key = `${child.name}-${childIndex}-${child.url}`
                            const hasChildren = child.children && child.children.length > 0
                            return hasChildren ? (
                                <TreeMenuItem
                                    key={key}
                                    item={child}
                                    activeItem={activeItem}
                                    index={index + 1}
                                    onClick={onClick}
                                />
                            ) : (
                                <TreeLink
                                    key={key}
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
