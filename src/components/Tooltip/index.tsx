import { Placement } from '@popperjs/core'
import React, { useState } from 'react'
import { usePopper } from 'react-popper'
import { createPortal } from 'react-dom'

export default function Tooltip({
    children,
    content,
    offset = [0, 10],
    className = '',
    tooltipClassName = '',
    placement = 'bottom',
    title,
}: {
    children: JSX.Element
    content: string | ((setOpen: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode)
    offset?: [number, number]
    className?: string
    tooltipClassName?: string
    placement?: Placement
    title?: string
}) {
    const [open, setOpen] = useState(false)
    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement,
        modifiers: [
            {
                name: 'offset',
            },
        ],
    })

    return (
        <span onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className={className}>
            {React.cloneElement(children, {
                ref: setReferenceElement,
            })}
            {open &&
                createPortal(
                    <div
                        className="z-[9999999999]"
                        role="tooltip"
                        ref={setPopperElement}
                        style={{ ...styles.popper, paddingTop: offset[1], paddingBottom: offset[1] }}
                        {...attributes.popper}
                    >
                        <div className={`rounded-sm overflow-hidden ${tooltipClassName}`}>
                            {title && (
                                <h5
                                    className={`bg-white text-sm dark:bg-[#484848] text-black dark:text-white px-4 py-2 z-20 m-0 font-semibold`}
                                >
                                    {title}
                                </h5>
                            )}
                            <div
                                className={`bg-accent dark:bg-accent-dark border border-light dark:border-dark text-primary dark:text-primary-dark px-2 py-2 text-sm z-20`}
                            >
                                {content && (typeof content === 'string' ? content : content(setOpen))}
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </span>
    )
}
