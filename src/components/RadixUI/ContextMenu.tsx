import * as React from 'react'
import { ContextMenu as RadixContextMenu } from 'radix-ui'
import KeyboardShortcut from 'components/KeyboardShortcut'

export interface ContextMenuItemProps {
    type: 'item' | 'separator'
    label?: string
    onClick?: () => void
    disabled?: boolean
    children?: React.ReactNode
    shortcut?: string[]
}

export interface ContextMenuProps {
    children: React.ReactNode
    menuItems: ContextMenuItemProps[]
    className?: string
}

const ContextMenu = ({ children, menuItems, className }: ContextMenuProps) => {
    // Style classes matching MenuBar patterns
    const TriggerClasses = className || ''
    const ContentClasses =
        'bg-primary min-w-[220px] rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity]'
    const ItemClasses =
        'group relative flex h-[25px] select-none items-center rounded-[3px] text-[13px] leading-none text-primary outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-input-bg data-[disabled]:text-muted data-[highlighted]:text-primary data-[highlighted]:bg-accent'
    // A link or button in `children` is only as big as its own text, so the row's padding is
    // dead space. Stretch the child over the row and move the padding onto it, as MenuBar does.
    const ChildClasses = '[&>*]:flex [&>*]:h-full [&>*]:w-full [&>*]:items-center [&>*]:px-2.5'
    const SeparatorClasses = 'm-[5px] h-px bg-border'

    return (
        <RadixContextMenu.Root>
            <RadixContextMenu.Trigger className={TriggerClasses}>{children}</RadixContextMenu.Trigger>
            <RadixContextMenu.Portal>
                <RadixContextMenu.Content className={ContentClasses} data-scheme="primary">
                    {menuItems.map((item, index) => {
                        if (item.type === 'separator') {
                            return <RadixContextMenu.Separator key={index} className={SeparatorClasses} />
                        }

                        return (
                            <RadixContextMenu.Item
                                key={index}
                                className={ItemClasses}
                                disabled={item.disabled}
                                onSelect={(e) => {
                                    // Execute any onClick handlers
                                    item.onClick?.()
                                }}
                            >
                                <div
                                    onClick={(e) => {
                                        // Force close the context menu by dispatching Escape key
                                        setTimeout(() => {
                                            const escapeEvent = new KeyboardEvent('keydown', {
                                                key: 'Escape',
                                                bubbles: true,
                                            })
                                            document.dispatchEvent(escapeEvent)
                                        }, 0)
                                    }}
                                    className="w-full h-full flex justify-between items-center gap-1"
                                >
                                    <span
                                        className={`flex-1 h-full flex items-center ${
                                            item.children ? ChildClasses : 'px-2.5'
                                        }`}
                                    >
                                        {item.children || item.label}
                                    </span>
                                    {item.shortcut && (
                                        <span className="pr-2.5">
                                            <KeyboardShortcut text={item.shortcut.join(' ')} size="sm" />
                                        </span>
                                    )}
                                </div>
                            </RadixContextMenu.Item>
                        )
                    })}
                </RadixContextMenu.Content>
            </RadixContextMenu.Portal>
        </RadixContextMenu.Root>
    )
}

export default ContextMenu
