import * as React from 'react'
import { Menubar as RadixMenubar } from 'radix-ui'
import { IconChevronDown, IconChevronRight } from '@posthog/icons'
import Link from 'components/Link'
import ScrollArea from './ScrollArea'
import KeyboardShortcut from 'components/KeyboardShortcut'
import { useAppSettings } from '../../context/App'

// Types
export type MenuItemType = {
    type: 'item' | 'submenu' | 'separator' | 'label'
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
    hideChevron?: boolean // Hide the chevron down icon for this menu in website mode
}

const RootClasses = 'flex gap-px py-0.5 h-full'
const TriggerClasses = `group flex select-none items-center justify-between gap-0.5 rounded px-1.5 py-0.5 text-[13px] leading-none text-primary outline-none data-[highlighted]:bg-accent hover:bg-accent-2 data-[state=open]:bg-accent`
const ItemClasses =
    'hover:bg-accent group relative flex h-[25px] select-none justify-between items-center rounded text-[13px] leading-none text-primary bg-primary outline-none data-[disabled]:pointer-events-none data-[disabled]:text-muted [&>span]:inline-flex [&>span]:w-full'
const LabelClasses =
    'select-none px-2.5 pt-1.5 pb-1 text-[11px] font-semibold uppercase tracking-wide leading-none text-muted'
const SubTriggerClasses =
    'hover:bg-accent group relative flex h-[25px] select-none items-center rounded px-2.5 text-[13px] leading-none text-primary bg-primary outline-none data-[disabled]:pointer-events-none data-[disabled]:text-muted'
const ContentClasses =
    'bg-primary min-w-[180px] md:min-w-[220px] rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]'
const SeparatorClasses = 'm-[5px] h-px bg-border'
const ShortcutClasses =
    'ml-auto pl-5 group-hover:text-secondary group-data-[disabled]:text-muted data-[highlighted]:data-[state=open]:text-secondary group-data-[highlighted]:text-secondary'

// Helper to render menu item content (icon + label + chevron)
const MenuItemContent = (item: MenuItemType, forceIconIndent?: boolean) => {
    const iconContent = item.icon ? (
        <span className="mr-2 flex items-center">{item.icon}</span>
    ) : forceIconIndent ? (
        <span style={{ display: 'inline-block', width: 16, minWidth: 16 }} className="mr-2" />
    ) : null

    return (
        <>
            {iconContent}
            {item.label}
            <div className={ShortcutClasses}>
                <IconChevronRight className="size-4" />
            </div>
        </>
    )
}

// Mobile keeps the full tree — submenus expand in place rather than opening a flyout, so
// nothing is dropped. Only omission is honoured here.
const processMobileMenuItem = (item: MenuItemType): MenuItemType | null =>
    item.mobileDestination === false ? null : item

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

type MenuItemProps = {
    portalContainer: HTMLElement | null
    appContainer: HTMLElement | null
    item: MenuItemType
    forceIconIndent?: boolean
    menuIndex: number
    onCloseMenu?: () => void
}

// Mobile has no room for a sideways flyout, so a submenu expands underneath itself instead.
// Chevron rotates 90° when open, matching the docs sidebar (TreeMenu).
const MobileSubmenuItem: React.FC<MenuItemProps> = (props) => {
    const { item, forceIconIndent } = props
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <RadixMenubar.Item
                className={ItemClasses}
                onSelect={(e) => {
                    // Keep the menu open — this row toggles rather than navigates
                    e.preventDefault()
                    setOpen((wasOpen) => !wasOpen)
                }}
            >
                <span className="px-2.5 flex w-full items-center gap-2">
                    {item.icon ? (
                        item.icon
                    ) : forceIconIndent ? (
                        <span style={{ display: 'inline-block', width: 16, minWidth: 16 }} />
                    ) : null}
                    <span className="flex-1 text-left">{item.label}</span>
                    <IconChevronRight
                        className={`size-4 shrink-0 transition-transform duration-150 ${open ? 'rotate-90' : ''}`}
                        aria-hidden
                    />
                </span>
            </RadixMenubar.Item>
            {open && Array.isArray(item.items) && (
                <div className="ml-4 border-l border-primary pl-1">
                    {item.items.map((child, index) => (
                        <MenuItem {...props} key={index} item={child} forceIconIndent={false} />
                    ))}
                </div>
            )}
        </>
    )
}

// Components
const MenuItem: React.FC<MenuItemProps> = (props) => {
    const { item, forceIconIndent, menuIndex, portalContainer, appContainer, onCloseMenu } = props
    const { isMobile } = useAppSettings()

    if (item.type === 'separator') {
        return <RadixMenubar.Separator className={SeparatorClasses} />
    }

    if (isMobile && item.type === 'submenu' && Array.isArray(item.items) && item.items.length > 0) {
        return <MobileSubmenuItem {...props} />
    }

    if (item.type === 'label') {
        return <RadixMenubar.Label className={LabelClasses}>{item.label}</RadixMenubar.Label>
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
                    {item.link ? (
                        <Link
                            to={item.link}
                            state={{ newWindow: true }}
                            externalNoIcon={item.external}
                            className="no-underline"
                            onClick={(e) => {
                                e.stopPropagation()
                                onCloseMenu?.()
                            }}
                        >
                            <RadixMenubar.SubTrigger className={SubTriggerClasses}>
                                {MenuItemContent(item, forceIconIndent)}
                            </RadixMenubar.SubTrigger>
                        </Link>
                    ) : (
                        <RadixMenubar.SubTrigger className={SubTriggerClasses}>
                            {MenuItemContent(item, forceIconIndent)}
                        </RadixMenubar.SubTrigger>
                    )}
                    <RadixMenubar.Portal container={portalContainer || undefined}>
                        <RadixMenubar.SubContent
                            collisionBoundary={appContainer}
                            className={`${ContentClasses} max-h-[calc(var(--radix-menubar-content-available-height)-0.75rem)] overflow-hidden flex flex-col`}
                            alignOffset={-5}
                            data-scheme="primary"
                        >
                            <ScrollArea className="min-h-0 !overflow-y-auto overscroll-contain">
                                {item.items.map((subItem, subIndex) => (
                                    <MenuItem
                                        key={`${subItem.link}-${subIndex}`}
                                        item={subItem}
                                        forceIconIndent={anyChildHasIcon}
                                        menuIndex={menuIndex}
                                        portalContainer={portalContainer}
                                        appContainer={appContainer}
                                        onCloseMenu={onCloseMenu}
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
            return (
                <RadixMenubar.Sub>
                    <RadixMenubar.SubTrigger className={SubTriggerClasses}>
                        {item.icon ? (
                            <span className="mr-2 flex items-center">{item.icon}</span>
                        ) : forceIconIndent ? (
                            <span style={{ display: 'inline-block', width: 16, minWidth: 16 }} className="mr-2" />
                        ) : null}
                        <span>{item.label}</span>
                        <div className={ShortcutClasses}>
                            <IconChevronRight className="size-4" />
                        </div>
                    </RadixMenubar.SubTrigger>
                    <RadixMenubar.Portal container={portalContainer || undefined}>
                        <RadixMenubar.SubContent
                            collisionBoundary={appContainer}
                            className={ContentClasses}
                            alignOffset={-5}
                            data-scheme="primary"
                        >
                            {React.cloneElement(item.items as unknown as React.ReactElement, { onCloseMenu })}
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
                    className="w-full min-h-[25px] h-full px-2.5 flex items-center gap-2 no-underline text-primary"
                    onClick={() => onCloseMenu?.()}
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
}

const MenuBar: React.FC<MenuBarProps> = ({ menus, className, triggerAsChild, customTriggerClasses }) => {
    const { isMobile } = useAppSettings()

    const [openMenuIndex, setOpenMenuIndex] = React.useState<number | null>(null)
    const rootRef = React.useRef<HTMLDivElement | null>(null)
    const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null)
    const appContainer: HTMLElement | null = null

    React.useEffect(() => {
        if (!rootRef.current) {
            setPortalContainer(null)
            return
        }
        const container = rootRef.current.closest('[data-menu-container]')
        setPortalContainer(container instanceof HTMLElement ? container : null)
    }, [])

    // Process menus for mobile if needed
    const processedMenus = React.useMemo(() => {
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
    }, [menus, isMobile])

    const closeMenu = React.useCallback(() => {
        setOpenMenuIndex(null)
    }, [])

    return (
        <RadixMenubar.Root
            ref={rootRef}
            data-scheme="tertiary"
            className={`${RootClasses} ${className || ''}`}
            value={openMenuIndex !== null ? String(openMenuIndex) : ''}
            onValueChange={(value) => setOpenMenuIndex(value ? Number(value) : null)}
        >
            {processedMenus.map((menu, menuIndex) => {
                // On mobile, if menu has mobileLink, make it a direct link
                if (isMobile && menu.mobileLink) {
                    return (
                        <Link
                            key={menuIndex}
                            to={menu.mobileLink}
                            state={{ newWindow: true }}
                            className={`${TriggerClasses} ${menu.bold ? 'font-bold' : 'font-medium'} ${
                                customTriggerClasses || ''
                            }`}
                        >
                            {menu.trigger}
                            {!menu.hideChevron && <IconChevronDown className="size-5 opacity-60 -mr-2 hidden" />}
                        </Link>
                    )
                }

                return (
                    <RadixMenubar.Menu key={menuIndex} value={String(menuIndex)} data-scheme="primary">
                        <RadixMenubar.Trigger
                            asChild={triggerAsChild}
                            className={`${triggerAsChild ? '' : TriggerClasses} ${
                                menu.bold ? 'font-bold' : 'font-medium'
                            } ${customTriggerClasses}`}
                        >
                            {menu.trigger}
                            {!menu.hideChevron && <IconChevronDown className="size-5 opacity-60 -mr-2 hidden" />}
                        </RadixMenubar.Trigger>
                        <RadixMenubar.Portal container={portalContainer || undefined}>
                            <RadixMenubar.Content
                                collisionBoundary={appContainer}
                                className={`${ContentClasses} max-h-[calc(var(--radix-menubar-content-available-height)-0.75rem)] overflow-hidden flex flex-col`}
                                align="start"
                                sideOffset={5}
                                alignOffset={-3}
                                data-scheme="primary"
                            >
                                <ScrollArea className="min-h-0 !overflow-y-auto overscroll-contain">
                                    {menu.items.map((item, itemIndex) => (
                                        <MenuItem
                                            key={`${menuIndex}-${itemIndex}`}
                                            item={item}
                                            menuIndex={menuIndex}
                                            portalContainer={portalContainer}
                                            appContainer={appContainer}
                                            onCloseMenu={closeMenu}
                                        />
                                    ))}
                                </ScrollArea>
                            </RadixMenubar.Content>
                        </RadixMenubar.Portal>
                    </RadixMenubar.Menu>
                )
            })}
        </RadixMenubar.Root>
    )
}

export default MenuBar
