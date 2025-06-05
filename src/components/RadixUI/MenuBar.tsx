import * as React from 'react'
import { Menubar as RadixMenubar } from 'radix-ui'
import { IconChevronRight } from '@posthog/icons'
import Link from 'components/Link'
import ScrollArea from './ScrollArea'

// Types
export type MenuItemType = {
    type: 'item' | 'submenu' | 'separator'
    label?: string
    link?: string
    shortcut?: string
    disabled?: boolean
    icon?: React.ReactNode
    items?: MenuItemType[] // For submenus
    onClick?: () => void
    node?: React.ReactNode // Allow embedding a React node
    external?: boolean // Whether the link should open in a new window with external styling
    active?: boolean
}

export type MenuType = {
    trigger: React.ReactNode
    bold?: boolean
    items: MenuItemType[]
}

const RootClasses = 'flex gap-px py-0.5 h-full'
const TriggerClasses =
    'group flex select-none items-center justify-between gap-0.5 rounded px-1.5 py-0.5 text-[13px] leading-none text-primary outline-none data-[highlighted]:bg-accent hover:bg-accent-2 data-[state=open]:bg-accent'
const ItemClasses =
    'hover-invert group relative flex h-[25px] select-none justify-between items-center rounded text-[13px] leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accent data-[highlighted]:bg-input-bg data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary data-[highlighted]:bg-text-secondary data-[state=open]:text-secondary'
const SubTriggerClasses =
    'hover-invert group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-primary data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary data-[highlighted]:bg-text-secondary data-[state=open]:text-secondary'
const ContentClasses =
    'bg-primary min-w-[220px] rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]'
const SeparatorClasses = 'm-[5px] h-px bg-border'
const ShortcutClasses =
    'ml-auto pl-5 text-secondary group-data-[disabled]:text-muted group-data-[highlighted]:text-primary'

// Components
const MenuItem: React.FC<{ item: MenuItemType; forceIconIndent?: boolean }> = ({ item, forceIconIndent }) => {
    if (item.type === 'separator') {
        return <RadixMenubar.Separator className={SeparatorClasses} />
    }

    if (item.node) {
        return (
            <RadixMenubar.Item className={ItemClasses} disabled={item.disabled} onClick={item.onClick}>
                {item.node}
            </RadixMenubar.Item>
        )
    }

    if (item.type === 'submenu' && item.items) {
        // If items is an array, render as before
        if (Array.isArray(item.items)) {
            const anyChildHasIcon = item.items.some((subItem) => !!subItem.icon)
            return (
                <RadixMenubar.Sub>
                    <RadixMenubar.SubTrigger className={SubTriggerClasses}>
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
                        <RadixMenubar.SubContent className={ContentClasses} alignOffset={-5} data-scheme="primary">
                            <ScrollArea className="max-h-screen !overflow-y-auto">
                                {item.items.map((subItem, index) => (
                                    <MenuItem key={index} item={subItem} forceIconIndent={anyChildHasIcon} />
                                ))}
                            </ScrollArea>
                        </RadixMenubar.SubContent>
                    </RadixMenubar.Portal>
                </RadixMenubar.Sub>
            )
        }
        // If items is a React element, render it directly
        if (React.isValidElement(item.items)) {
            return (
                <RadixMenubar.Sub>
                    <RadixMenubar.SubTrigger className={SubTriggerClasses}>
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
                        <RadixMenubar.SubContent className={ContentClasses} alignOffset={-5} data-scheme="primary">
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
        >
            {item.link ? (
                <Link
                    to={item.link}
                    state={{ newWindow: true }}
                    externalNoIcon={item.external}
                    className="w-full h-full px-2.5 flex items-center gap-2 no-underline text-primary"
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
                    {item.shortcut && <div className={ShortcutClasses}>{item.shortcut}</div>}
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
}

const MenuBar: React.FC<MenuBarProps> = ({ menus, className, triggerAsChild, customTriggerClasses }) => {
    return (
        <RadixMenubar.Root data-scheme="tertiary" className={`${RootClasses} ${className || ''}`}>
            {menus.map((menu, menuIndex) => (
                <RadixMenubar.Menu key={`menu-${menuIndex}`} data-scheme="primary">
                    <RadixMenubar.Trigger
                        asChild={triggerAsChild}
                        className={`${triggerAsChild ? '' : TriggerClasses} ${
                            menu.bold ? 'font-bold' : 'font-medium'
                        } ${customTriggerClasses}`}
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
                        >
                            {menu.items.map((item, itemIndex) => (
                                <MenuItem
                                    key={`menu-${menuIndex}-item-${itemIndex}-${item.label || item.type}`}
                                    item={item}
                                    data-scheme="primary"
                                />
                            ))}
                        </RadixMenubar.Content>
                    </RadixMenubar.Portal>
                </RadixMenubar.Menu>
            ))}
        </RadixMenubar.Root>
    )
}

export default MenuBar
