import React, { useState } from 'react'
import { usePopper } from 'react-popper'

export default function Tooltip({
    children,
    title,
    offset,
    className = '',
}: {
    children: JSX.Element
    title: string
    offset?: [number, number]
    className?: string
}) {
    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: offset ? offset : [0, 10],
                },
            },
        ],
    })

    return (
        <span className={`group ${className}`}>
            {React.cloneElement(children, {
                ref: setReferenceElement,
            })}
            <span
                role="tooltip"
                className="bg-primary dark:bg-gray-accent-light text-white dark:text-black rounded-md px-2 py-1 group-hover:visible invisible text-sm z-50"
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
            >
                {title}
            </span>
        </span>
    )
}
