import * as React from 'react'
import { Menubar as RadixMenubar } from 'radix-ui'
import { IconChevronRight } from '@posthog/icons'
import Link from 'components/Link'
import ScrollArea from './ScrollArea'
import KeyboardShortcut from 'components/KeyboardShortcut'
import { useResponsive } from '../../hooks/useResponsive'

// Types
export type MenuItemType = {
    type: 'item' | 'submenu' | 'separator'
    label?: string
    link?: string
    shortcut?: string | string[] // Support both string and array of keys
    disabled?: boolean
    icon?: React.ReactNode
    items?: MenuItemType[] // For submenus
    onClick?: () => void
    node?: React.ReactNode // Allow embedding a React node
    external?: boolean // Whether the link should open in a new window with external styling
    active?: boolean
    mobileDestination?: string | false // Mobile-specific destination URL or false to omit from mobile menu
}

export type MenuType = {
    trigger: React.ReactNode
    bold?: boolean
    items: MenuItemType[]
    mobileLink?: string // Direct link for the menu trigger on mobile
}

const RootClasses = 'flex gap-px py-0.5 h-full'
const TriggerClasses =
    'group flex select-none items-center justify-between gap-0.5 rounded px-1.5 py-0.5 text-[13px] leading-none text-primary outline-none data-[highlighted]:bg-accent hover:bg-accent-2 data-[state=open]:bg-accent'
const ItemClasses =
    'hover:bg-accent group relative flex h-[25px] select-none justify-between items-center rounded text-[13px] leading-none text-primary bg-primary outline-none data-[disabled]:pointer-events-none data-[disabled]:text-muted [&>span]:inline-flex [&>span]:w-full'
const SubTriggerClasses =
    'hover:bg-accent group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-primary bg-primary outline-none data-[disabled]:pointer-events-none data-[disabled]:text-muted'
const ContentClasses =
    'bg-primary min-w-[180px] md:min-w-[220px] rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]'
const SeparatorClasses = 'm-[5px] h-px bg-border'
const ShortcutClasses =
    'ml-auto pl-5 group-hover:text-secondary group-data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary group-data-[highlighted]:text-secondary'

// Helper to generate stable IDs
const generateStableId = (baseId: string, ...parts: (string | number)[]): string => {
    return `${baseId}-${parts.join('-')}`
}

// Process menu items for mobile display - truncate nesting to 2 levels max
const processMobileMenuItem = (item: MenuItemType): MenuItemType | null => {
    // Skip items marked for mobile omission
    if (item.mobileDestination === false) {
        return null
    }

    // If item has a mobile destination, convert submenu to simple link
    if (item.mobileDestination && item.type === 'submenu') {
        return {
            ...item,
            type: 'item' as const,
            link: item.mobileDestination,
            items: undefined, // Remove nested items on mobile
        }
    }

    // For submenus without explicit mobile destination, limit depth
    if (item.type === 'submenu' && item.items) {
        // If the submenu has a link, make it a simple link on mobile
        if (item.link) {
            return {
                ...item,
                type: 'item' as const,
                items: undefined,
            }
        }

        // Otherwise, process children but make them all leaf nodes
        if (Array.isArray(item.items)) {
            const processedItems = item.items
                .map((subItem: MenuItemType) => {
                    // Convert all nested submenus to simple items
                    if (subItem.type === 'submenu') {
                        return {
                            ...subItem,
                            type: 'item' as const,
                            link: subItem.link || subItem.mobileDestination || '#',
                            items: undefined,
                        }
                    }
                    return subItem
                })
                .filter(Boolean) as MenuItemType[]

            return {
                ...item,
                items: processedItems,
            }
        }
    }

    return item
}

const processMobileMenuItems = (items: MenuItemType[]): MenuItemType[] => {
    const processedItems: MenuItemType[] = []

    for (let i = 0; i < items.length; i++) {
        const item = items[i]

        // Skip items marked for mobile omission
        if (item.mobileDestination === false) {
            // Also skip the preceding separator if it exists
            if (processedItems.length > 0 && processedItems[processedItems.length - 1].type === 'separator') {
                processedItems.pop()
            }
            continue
        }

        const processed = processMobileMenuItem(item)
        if (processed) {
            processedItems.push(processed)
        }
    }

    return processedItems
}

// Components
const MenuItem: React.FC<{
    item: MenuItemType
    forceIconIndent?: boolean
    menuIndex: number
    itemIndex: number
    baseId: string
}> = ({ item, forceIconIndent, menuIndex, itemIndex, baseId }) => {
    const itemId = generateStableId(baseId, 'item', menuIndex, itemIndex)

    if (item.type === 'separator') {
        return <RadixMenubar.Separator className={SeparatorClasses} />
    }

    if (item.node) {
        return (
            <RadixMenubar.Item className={ItemClasses} disabled={item.disabled} onClick={item.onClick} id={itemId}>
                {item.node}
            </RadixMenubar.Item>
        )
    }

    if (item.type === 'submenu' && item.items) {
        // If items is an array, render as before
        if (Array.isArray(item.items)) {
            const anyChildHasIcon = item.items.some((subItem) => !!subItem.icon)
            const subTriggerId = generateStableId(baseId, 'sub-trigger', menuIndex, itemIndex)
            const subContentId = generateStableId(baseId, 'sub-content', menuIndex, itemIndex)
            return (
                <RadixMenubar.Sub key={itemId}>
                    <RadixMenubar.SubTrigger className={SubTriggerClasses} id={subTriggerId}>
                        {item.icon ? (
                            <span className="mr-2 flex items-center">{item.icon}</span>
                        ) : forceIconIndent ? (
                            <span style={{ display: 'inline-block', width: 16, minWidth: 16 }} className="mr-2" />
                        ) : null}
                        {item.label}
                        <div className={ShortcutClasses}>
                            <IconChevronRight className="size-4" />
                        </div>
                    </RadixMenubar.SubTrigger>
                    <RadixMenubar.Portal>
                        <RadixMenubar.SubContent
                            className={ContentClasses}
                            alignOffset={-5}
                            data-scheme="primary"
                            id={subContentId}
                        >
                            <ScrollArea className="max-h-screen !overflow-y-auto">
                                {item.items.map((subItem, subIndex) => (
                                    <MenuItem
                                        key={generateStableId(baseId, 'sub', menuIndex, itemIndex, subIndex)}
                                        item={subItem}
                                        forceIconIndent={anyChildHasIcon}
                                        menuIndex={menuIndex}
                                        itemIndex={subIndex}
                                        baseId={`${baseId}-sub-${menuIndex}-${itemIndex}`}
                                    />
                                ))}
                            </ScrollArea>
                        </RadixMenubar.SubContent>
                    </RadixMenubar.Portal>
                </RadixMenubar.Sub>
            )
        }
        // If items is a React element, render it directly
        if (React.isValidElement(item.items)) {
            const subTriggerId = generateStableId(baseId, 'sub-trigger-element', menuIndex, itemIndex)
            const subContentId = generateStableId(baseId, 'sub-content-element', menuIndex, itemIndex)
            return (
                <RadixMenubar.Sub key={itemId}>
                    <RadixMenubar.SubTrigger className={SubTriggerClasses} id={subTriggerId}>
                        {item.icon ? (
                            <span className="mr-2 flex items-center">{item.icon}</span>
                        ) : forceIconIndent ? (
                            <span style={{ display: 'inline-block', width: 16, minWidth: 16 }} className="mr-2" />
                        ) : null}
                        {item.label}
                        <div className={ShortcutClasses}>
                            <IconChevronRight className="size-4" />
                        </div>
                    </RadixMenubar.SubTrigger>
                    <RadixMenubar.Portal>
                        <RadixMenubar.SubContent
                            className={ContentClasses}
                            alignOffset={-5}
                            data-scheme="primary"
                            id={subContentId}
                        >
                            {item.items}
                        </RadixMenubar.SubContent>
                    </RadixMenubar.Portal>
                </RadixMenubar.Sub>
            )
        }
    }

    return (
        <RadixMenubar.Item
            className={`${ItemClasses} ${item.active ? 'bg-accent' : ''}`}
            disabled={item.disabled}
            onClick={item.onClick}
            id={itemId}
        >
            {item.link ? (
                <Link
                    to={item.link}
                    state={{ newWindow: true }}
                    externalNoIcon={item.external}
                    className="w-full min-h-[25px] h-full px-2.5 flex items-center gap-2 no-underline text-primary"
                >
                    {item.icon ? (
                        item.icon
                    ) : forceIconIndent ? (
                        <span style={{ display: 'inline-block', width: 16, minWidth: 16 }} />
                    ) : null}
                    <span>{item.label}</span>
                </Link>
            ) : (
                <span className="px-2.5 flex w-full justify-between items-center gap-2">
                    <span className="flex-1 flex items-center gap-2">
                        {item.icon ? (
                            item.icon
                        ) : forceIconIndent ? (
                            <span style={{ display: 'inline-block', width: 16, minWidth: 16 }} />
                        ) : null}
                        <span>{item.label}</span>
                    </span>
                    {item.shortcut && (
                        <div className={`${ShortcutClasses} hidden md:block`}>
                            {Array.isArray(item.shortcut) ? (
                                <div className="flex items-center">
                                    {item.shortcut.map((key, index) => (
                                        <React.Fragment key={index}>
                                            <KeyboardShortcut text={key} size="xs" />
                                            {/* 
                                            {index < item.shortcut!.length - 1 && (
                                                <span className="text-muted text-xs">+</span>
                                            )}
                                             */}
                                        </React.Fragment>
                                    ))}
                                </div>
                            ) : (
                                <KeyboardShortcut text={item.shortcut} size="xs" />
                            )}
                        </div>
                    )}
                </span>
            )}
        </RadixMenubar.Item>
    )
}

export interface MenuBarProps {
    menus: MenuType[]
    className?: string
    customTriggerClasses?: string
    triggerAsChild?: boolean
    id?: string // Allow custom base ID
}

const MenuBar: React.FC<MenuBarProps> = ({
    menus,
    className,
    triggerAsChild,
    customTriggerClasses,
    id = 'menubar',
}) => {
    const { isMobile, isLoaded } = useResponsive()

    const baseId = React.useMemo(() => {
        // Generate a stable ID based on the menu structure
        const menuSignature = menus
            .map((menu) => `${typeof menu.trigger === 'string' ? menu.trigger : 'trigger'}-${menu.items.length}`)
            .join('-')
        return `${id}-${menuSignature}`
    }, [menus, id])

    // Process menus for mobile if needed
    const processedMenus = React.useMemo(() => {
        // Wait for responsive detection to load before processing
        if (!isLoaded) return menus
        if (!isMobile) return menus

        return menus.map((menu) => {
            // If menu has mobileLink, don't process items since they won't be shown
            if (menu.mobileLink) {
                return menu
            }

            return {
                ...menu,
                items: processMobileMenuItems(menu.items),
            }
        })
    }, [menus, isMobile, isLoaded])

    return (
        <RadixMenubar.Root data-scheme="tertiary" className={`${RootClasses} ${className || ''}`} id={baseId}>
            {processedMenus.map((menu, menuIndex) => {
                const menuId = generateStableId(baseId, 'menu', menuIndex)
                const triggerId = generateStableId(baseId, 'trigger', menuIndex)
                const contentId = generateStableId(baseId, 'content', menuIndex)

                // On mobile, if menu has mobileLink, make it a direct link
                if (isLoaded && isMobile && menu.mobileLink) {
                    return (
                        <Link
                            key={menuId}
                            to={menu.mobileLink}
                            state={{ newWindow: true }}
                            className={`${TriggerClasses} ${menu.bold ? 'font-bold' : 'font-medium'} ${
                                customTriggerClasses || ''
                            }`}
                        >
                            {menu.trigger}
                        </Link>
                    )
                }

                return (
                    <RadixMenubar.Menu key={menuId} data-scheme="primary">
                        <RadixMenubar.Trigger
                            asChild={triggerAsChild}
                            className={`${triggerAsChild ? '' : TriggerClasses} ${
                                menu.bold ? 'font-bold' : 'font-medium'
                            } ${customTriggerClasses}`}
                            id={triggerId}
                        >
                            {menu.trigger}
                        </RadixMenubar.Trigger>
                        <RadixMenubar.Portal>
                            <RadixMenubar.Content
                                className={ContentClasses}
                                align="start"
                                sideOffset={5}
                                alignOffset={-3}
                                data-scheme="primary"
                                id={contentId}
                            >
                                {menu.items.map((item, itemIndex) => (
                                    <MenuItem
                                        key={generateStableId(
                                            baseId,
                                            'menu',
                                            menuIndex,
                                            'item',
                                            itemIndex,
                                            item.label || item.type
                                        )}
                                        item={item}
                                        menuIndex={menuIndex}
                                        itemIndex={itemIndex}
                                        baseId={baseId}
                                    />
                                ))}
                            </RadixMenubar.Content>
                        </RadixMenubar.Portal>
                    </RadixMenubar.Menu>
                )
            })}
        </RadixMenubar.Root>
    )
}

export default MenuBar
