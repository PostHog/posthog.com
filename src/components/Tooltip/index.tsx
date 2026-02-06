import { Placement } from '@popperjs/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { createPortal } from 'react-dom'

interface TooltipProps {
    children: JSX.Element
    content: string | ((setOpen: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode)
    offset?: [number, number]
    className?: string
    tooltipClassName?: string
    placement?: Placement
    title?: string
    contentContainerClassName?: string
    open?: boolean
    controlled?: boolean
}

const TOUCH_TIMEOUT_MS = 500

export default function Tooltip({
    children,
    content,
    offset = [0, 10],
    className = '',
    tooltipClassName = '',
    placement = 'bottom',
    title,
    contentContainerClassName = '',
    controlled,
    open: openProp,
}: TooltipProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(openProp ?? false)
    const [referenceElement, setReferenceElement] = useState<Element | null>(null)
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
    const wrapperRef = useRef<HTMLSpanElement>(null)
    const recentlyTouchedRef = useRef<boolean>(false)
    const touchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement,
        modifiers: [
            {
                name: 'offset',
            },
        ],
    })

    // Sync with controlled prop
    useEffect(() => {
        if (controlled && openProp !== undefined) {
            setIsOpen(openProp)
        }
    }, [controlled, openProp])

    // Clean up touch timeout on unmount
    useEffect(() => {
        return () => {
            if (touchTimeoutRef.current) {
                clearTimeout(touchTimeoutRef.current)
            }
        }
    }, [])

    // Click outside handler
    useEffect(() => {
        if (!isOpen || controlled) return

        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            const target = e.target
            if (!(target instanceof Node)) return

            const isInsideWrapper = wrapperRef.current?.contains(target) ?? false
            const isInsidePopper = popperElement?.contains(target) ?? false

            if (!isInsideWrapper && !isInsidePopper) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [isOpen, controlled, popperElement])

    const handleTouchStart = useCallback(() => {
        recentlyTouchedRef.current = true
        if (touchTimeoutRef.current) {
            clearTimeout(touchTimeoutRef.current)
        }
        touchTimeoutRef.current = setTimeout(() => {
            recentlyTouchedRef.current = false
        }, TOUCH_TIMEOUT_MS)
    }, [])

    const handleMouseEnter = useCallback(() => {
        if (recentlyTouchedRef.current || controlled) return
        setIsOpen(true)
    }, [controlled])

    const handleMouseLeave = useCallback(() => {
        if (recentlyTouchedRef.current || controlled) return
        setIsOpen(false)
    }, [controlled])

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            if (controlled) return
            e.stopPropagation()
            setIsOpen((prev) => !prev)
        },
        [controlled]
    )

    return (
        <span
            ref={wrapperRef}
            onTouchStart={handleTouchStart}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={className}
            onClick={handleClick}
        >
            {React.cloneElement(children, {
                ref: setReferenceElement,
            })}
            {isOpen &&
                createPortal(
                    <div
                        id="portal-tooltip"
                        className="z-[9999999999] print:hidden"
                        role="tooltip"
                        ref={setPopperElement}
                        style={{ ...styles.popper, paddingTop: offset[1], paddingBottom: offset[1] }}
                        {...attributes.popper}
                    >
                        <div className="tooltip" data-scheme="secondary">
                            <div
                                className={`
                            bg-primary border border-primary
                            relative
                            shadow-lg
                            rounded-sm 
                            placement-${placement} 
                            relative
                            p-2

                            ${
                                placement === 'top' ||
                                placement === 'right' ||
                                placement === 'bottom' ||
                                placement === 'left' ||
                                placement === 'right-start'
                                    ? 'before:bg-accent dark:before:bg-accent-dark before:border-light dark:before:border-dark before:block before:h-3 before:w-3 before:absolute before:rotate-45'
                                    : ''
                            }

                            ${
                                placement === 'top'
                                    ? 'before:rounded-br-sm before:-bottom-1.5 before:left-[calc(50%_-_5.5px)] before:border-b before:border-r'
                                    : ''
                            }
                            ${
                                placement === 'right'
                                    ? 'before:rounded-bl-sm before:top-[calc(50%_-_4px)] before:-left-1.5 before:border-b before:border-l ml-2'
                                    : ''
                            }
                            ${
                                placement === 'bottom'
                                    ? 'before:rounded-tl-sm before:-top-1.5 before:left-[calc(50%_-_5.5px)] before:border-t before:border-l'
                                    : ''
                            }
                            ${
                                placement === 'left'
                                    ? 'before:rounded-tr-sm before:top-[calc(50%_-_4px)] before:-right-1.5 before:border-t before:border-r mr-2'
                                    : ''
                            }
                            ${
                                placement === 'right-start'
                                    ? 'before:rounded-tl-sm before:top-[calc(0%_+_5px)] before:-right-1.5 before:border-t before:border-r mr-2 -top-1'
                                    : ''
                            }
                                    
                            ${tooltipClassName}
                        `}
                            >
                                <div
                                    data-scheme="primary"
                                    className="bg-primary border border-primary rounded px-2 py-1"
                                >
                                    {title && (
                                        <h5
                                            className={`bg-white text-sm dark:bg-[#484848] text-black dark:text-white px-4 py-2 z-20 m-0 font-semibold`}
                                        >
                                            {title}
                                        </h5>
                                    )}
                                    <div
                                        className={`text-primary dark:text-primary-dark px-2 py-2 text-sm z-20 ${contentContainerClassName}`}
                                    >
                                        {content && (typeof content === 'string' ? content : content(setIsOpen))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </span>
    )
}
