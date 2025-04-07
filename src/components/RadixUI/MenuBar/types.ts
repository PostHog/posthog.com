export type MenuItemType = {
    type: 'item' | 'submenu' | 'separator'
    label?: string
    shortcut?: string
    disabled?: boolean
    items?: MenuItemType[] // For submenus
}

export type MenuType = {
    label: string
    items: MenuItemType[]
}
