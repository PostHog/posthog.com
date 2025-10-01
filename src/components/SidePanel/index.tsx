import React, { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import * as Portal from '@radix-ui/react-portal'
import { IconChevronRight } from '@posthog/icons'
import Tooltip from 'components/RadixUI/Tooltip'
import OSButton from 'components/OSButton'

interface SidePanelProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    headerAside?: React.ReactNode
    children: React.ReactNode
    className?: string
    width?: string
    showCloseButton?: boolean
}

export default function SidePanel({
    isOpen,
    onClose,
    title,
    headerAside,
    children,
    className = '',
    width = 'w-96',
    showCloseButton = true,
}: SidePanelProps) {
    const panelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <Portal.Root>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Side panel */}
                        <motion.div
                            ref={panelRef}
                            data-scheme="primary"
                            initial={{ translateX: '100%' }}
                            animate={{
                                translateX: 0,
                            }}
                            exit={{
                                translateX: '100%',
                            }}
                            transition={{ duration: 0.3, type: 'tween' }}
                            className={`fixed top-[calc(37px+1rem)] right-4 h-[calc(100vh-2rem-37px)] ${width} bg-primary border border-primary rounded shadow-xl z-50 text-primary ${className}`}
                        >
                            <div className="h-full flex flex-col">
                                {title && (
                                    <div className="flex items-center justify-between px-4 py-2 border-b border-primary">
                                        <h2 className="text-base font-semibold">{title}</h2>
                                        <div className="flex items-center gap-1">
                                            {headerAside && <div>{headerAside}</div>}
                                            {showCloseButton && (
                                                <span className="contents">
                                                    <Tooltip trigger={<OSButton icon={<IconChevronRight />} onClick={onClose} size="md" />}>
                                                        Hide sidebar
                                                    </Tooltip>
                                                </span>
                                            )}

                                        </div>
                                    </div>
                                )}

                                <div className="flex-1 overflow-hidden">{children}</div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </Portal.Root>
    )
}
