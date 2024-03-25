import React from 'react'
import { Popover as HeadlessPopover } from '@headlessui/react'
import { useState } from 'react'
import { usePopper } from 'react-popper'
export function Popover({ children, button }: { children: React.ReactNode; button: string | React.ReactNode }) {
    const [referenceElement, setReferenceElement] = useState()
    const [popperElement, setPopperElement] = useState()
    const [arrowElement, setArrowElement] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [
            { name: 'arrow', options: { element: arrowElement } },
            {
                name: 'offset',
                options: {
                    offset: [0, 10],
                },
            },
        ],
    })

    return (
        <HeadlessPopover className="z-[50] flex">
            <HeadlessPopover.Button ref={setReferenceElement}>{button}</HeadlessPopover.Button>

            <HeadlessPopover.Panel ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                <div className="px-4 py-2 bg-white dark:bg-gray-accent-dark shadow-lg rounded-md max-h-[85vh] overflow-auto">
                    {children}
                </div>
                <div ref={setArrowElement} style={styles.arrow} />
            </HeadlessPopover.Panel>
        </HeadlessPopover>
    )
}
