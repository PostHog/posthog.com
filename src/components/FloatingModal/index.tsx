import React, { useState, useEffect, useRef } from 'react'
import { Dialog as RadixDialog } from 'radix-ui'
import { IconChevronDown, IconX } from '@posthog/icons'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import OSButton from 'components/OSButton'
import { Popover } from 'components/RadixUI/Popover'
import Link from 'components/Link'
import { MenuItemType } from 'components/RadixUI/MenuBar'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { motion, useDragControls } from 'framer-motion'

const MenuItems = ({ items }: { items: MenuItemType[] }) => {
    const itemClassName =
        'flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-accent rounded transition-colors text-left w-full'

    return (
        <>
            {items.map((item, index) => {
                if (item.type === 'separator') {
                    return <div key={`separator-${index}`} className="my-1 h-px bg-border" />
                }

                if (item.type === 'submenu' && item.items) {
                    return (
                        <div key={`submenu-${index}`}>
                            {item.label && (
                                <p className="px-3 py-1 text-xs text-secondary font-semibold uppercase tracking-wide m-0">
                                    {item.label}
                                </p>
                            )}
                            <MenuItems items={item.items} />
                        </div>
                    )
                }

                if (item.link) {
                    return (
                        <Link key={`${item.label}-${index}`} to={item.link} className={itemClassName}>
                            {item.icon}
                            {item.label}
                        </Link>
                    )
                }

                if (item.onClick || item.label) {
                    return (
                        <button
                            key={`${item.label}-${index}`}
                            onClick={item.onClick}
                            className={itemClassName}
                            disabled={item.disabled}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    )
                }

                return null
            })}
        </>
    )
}

const FloatingModal = ({ children }: { children: React.ReactNode }): JSX.Element | null => {
    const [open, setOpen] = useState(true)
    const { appWindow, pageOptions } = useWindow()
    const { closeWindow } = useApp()
    const title = appWindow?.meta?.title
    const hasMenuItems = pageOptions && pageOptions.length > 0
    const dragControls = useDragControls()
    const constraintsRef = useRef<HTMLDivElement>(null)
    const [hasDragged, setHasDragged] = useState(false)

    useEffect(() => {
        if (!open && appWindow) {
            closeWindow(appWindow)
        }
    }, [open])

    return (
        <RadixDialog.Root open={open} onOpenChange={setOpen} modal={false}>
            <RadixDialog.Portal>
                <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[9998]" aria-hidden="true" />
                <RadixDialog.Content
                    aria-label="Floating window"
                    className="data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed z-[9999] w-[380px] h-[500px]"
                    onInteractOutside={(e) => e.preventDefault()}
                    asChild
                >
                    <motion.div
                        drag
                        dragControls={dragControls}
                        dragListener={false}
                        dragMomentum={false}
                        dragConstraints={constraintsRef}
                        onDrag={() => setHasDragged(true)}
                        initial={{ bottom: 0, right: 24 }}
                        style={{ position: 'fixed', bottom: 0, right: 24 }}
                    >
                        <div
                            data-scheme="primary"
                            className="bg-primary text-primary shadow-2xl overflow-hidden size-full flex flex-col"
                        >
                            <div
                                className={`rounded border border-primary overflow-hidden size-full flex flex-col ${
                                    hasDragged ? '' : 'rounded-br-none rounded-bl-none'
                                }`}
                            >
                                <div
                                    className="bg-accent flex items-center justify-between p-1 border-b border-primary cursor-grab active:cursor-grabbing"
                                    onPointerDown={(e) => dragControls.start(e)}
                                >
                                    {hasMenuItems ? (
                                        <Popover
                                            dataScheme="primary"
                                            side="top"
                                            trigger={
                                                <button
                                                    className="flex items-center gap-1 text-primary text-left text-sm font-semibold ml-2 hover:opacity-75 transition-opacity"
                                                    onPointerDown={(e) => e.stopPropagation()}
                                                >
                                                    {title}
                                                    <IconChevronDown className="size-4" />
                                                </button>
                                            }
                                        >
                                            <ScrollArea className="h-full">
                                                <div className="flex flex-col min-w-[200px] max-h-[300px]">
                                                    <MenuItems items={pageOptions} />
                                                </div>
                                            </ScrollArea>
                                        </Popover>
                                    ) : (
                                        <p className="text-primary text-left text-sm font-semibold ml-2 my-0">
                                            {title}
                                        </p>
                                    )}
                                    <RadixDialog.Close asChild>
                                        <OSButton
                                            icon={<IconX />}
                                            size="md"
                                            onPointerDown={(e: React.PointerEvent) => e.stopPropagation()}
                                        />
                                    </RadixDialog.Close>
                                </div>
                                <div className="overflow-hidden size-full">{children}</div>
                            </div>
                        </div>
                    </motion.div>
                </RadixDialog.Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    )
}

export default FloatingModal
