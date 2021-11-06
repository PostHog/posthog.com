import React, { useState } from 'react'
import { usePopper } from 'react-popper'

export default function Tooltip({ children, title }: { children: JSX.Element; title: string }) {
    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement)

    return (
        <span className="group">
            {React.cloneElement(children, {
                ref: setReferenceElement,
            })}
            <span
                role="tooltip"
                className="bg-primary text-white rounded-md px-2 py-1 group-hover:visible invisible text-xs"
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
            >
                {title}
            </span>
        </span>
    )
}
