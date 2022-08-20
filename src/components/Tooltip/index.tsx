import React, { useState } from 'react'
import { usePopper } from 'react-popper'
import { createPortal } from 'react-dom'

export default function Tooltip({
    children,
    content,
    offset = [0, 10],
    className = '',
}: {
    children: JSX.Element
    content: string | React.ReactNode
    offset?: [number, number]
    className?: string
}) {
    const [open, setOpen] = useState(false)
    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
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
                        role="tooltip"
                        ref={setPopperElement}
                        style={{ ...styles.popper, paddingTop: offset[1], paddingBottom: offset[1] }}
                        {...attributes.popper}
                    >
                        <div className="bg-primary dark:bg-gray-accent-light text-white dark:text-black rounded-md px-2 py-1 text-sm z-20">
                            {content}
                        </div>
                    </div>,
                    document.body
                )}
        </span>
    )
}
