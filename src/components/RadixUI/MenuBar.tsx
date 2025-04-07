import * as React from 'react'
import { Menubar as RadixMenubar } from 'radix-ui'
import { IconChevronRight } from '@posthog/icons'

// Types
export type MenuItemType = {
    type: 'item' | 'submenu' | 'separator'
    label?: string
    link?: string
    shortcut?: string
    disabled?: boolean
    icon?: React.ReactNode
    items?: MenuItemType[] // For submenus
}

export type MenuType = {
    trigger: React.ReactNode
    bold?: boolean
    items: MenuItemType[]
}

const TriggerClasses =
    'flex select-none items-center justify-between gap-0.5 rounded px-2.5 py-0.5 text-[13px] leading-none text-primary outline-none data-[highlighted]:bg-accent hover:bg-primary data-[state=open]:bg-accent'
const ItemClasses =
    'hover-invert group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-accent data-[highlighted]:bg-input-bg data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary data-[highlighted]:bg-text-secondary data-[state=open]:text-secondary'
const SubTriggerClasses =
    'hover-invert group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-primary data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary data-[highlighted]:bg-text-secondary data-[state=open]:text-secondary'
const ContentClasses =
    'min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]'
const SeparatorClasses = 'm-[5px] h-px bg-border'
const ShortcutClasses =
    'ml-auto pl-5 text-secondary group-data-[disabled]:text-muted group-data-[highlighted]:text-primary'

// Components
const MenuItem: React.FC<{ item: MenuItemType }> = ({ item }) => {
    if (item.type === 'separator') {
        return <RadixMenubar.Separator className={SeparatorClasses} />
    }

    if (item.type === 'submenu' && item.items) {
        return (
            <RadixMenubar.Sub>
                <RadixMenubar.SubTrigger className={SubTriggerClasses}>
                    {item.label}
                    <div className={ShortcutClasses}>
                        <IconChevronRight className="size-4" />
                    </div>
                </RadixMenubar.SubTrigger>
                <RadixMenubar.Portal>
                    <RadixMenubar.SubContent className={ContentClasses} alignOffset={-5} data-scheme="primary">
                        {item.items.map((subItem, index) => (
                            <MenuItem key={index} item={subItem} />
                        ))}
                    </RadixMenubar.SubContent>
                </RadixMenubar.Portal>
            </RadixMenubar.Sub>
        )
    }

    return (
        <RadixMenubar.Item className={ItemClasses} disabled={item.disabled}>
            <div className="flex items-center gap-2">
                {item.icon}
                {item.link ? (
                    <a href={item.link} className="no-underline text-primary">
                        {item.label}
                    </a>
                ) : (
                    <span>{item.label}</span>
                )}
            </div>
            {item.shortcut && <div className={ShortcutClasses}>{item.shortcut}</div>}
        </RadixMenubar.Item>
    )
}

export interface MenuBarProps {
    menus: MenuType[]
}

const MenuBar: React.FC<MenuBarProps> = ({ menus }) => {
    return (
        <RadixMenubar.Root data-scheme="tertiary" className="flex gap-px">
            {menus.map((menu, index) => (
                <RadixMenubar.Menu key={index}>
                    <RadixMenubar.Trigger className={`${TriggerClasses} ${menu.bold ? 'font-bold' : 'font-medium'}`}>
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
                                <MenuItem key={itemIndex} item={item} />
                            ))}
                        </RadixMenubar.Content>
                    </RadixMenubar.Portal>
                </RadixMenubar.Menu>
            ))}
        </RadixMenubar.Root>
    )
}

export default MenuBar
