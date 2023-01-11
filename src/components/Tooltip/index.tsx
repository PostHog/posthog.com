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
    tooltipWrapperClassName = '',
    placement = 'bottom',
}: {
    children: JSX.Element
    content: string | React.ReactNode
    offset?: [number, number]
    className?: string
    tooltipClassName?: string
    tooltipWrapperClassName?: string
    placement?: Placement
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
                        className={`z-50 ${tooltipWrapperClassName}`}
                        role="tooltip"
                        ref={setPopperElement}
                        style={{ ...styles.popper, paddingTop: offset[1], paddingBottom: offset[1] }}
                        {...attributes.popper}
                    >
                        <div
                            className={`bg-white dark:bg-[#484848] text-black dark:text-white rounded-md px-2 py-1 text-sm z-20 shadow-lg ${tooltipClassName}`}
                        >
                            {content}
                        </div>
                    </div>,
                    document.body
                )}
        </span>
    )
}
