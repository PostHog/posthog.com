import { Placement, reference } from '@popperjs/core'
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
    contentContainerClassName = '',
}: {
    children: JSX.Element
    content: string | ((setOpen: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode)
    offset?: [number, number]
    className?: string
    tooltipClassName?: string
    placement?: Placement
    title?: string
    contentContainerClassName?: string
}): JSX.Element {
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
                        <div className="tooltip">
                            <div
                                className={`
                            bg-accent dark:bg-accent-dark border border-border dark:border-dark
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
                                placement === 'left'
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
                                    
                            ${tooltipClassName}
                        `}
                            >
                                <div className="bg-white dark:bg-dark border border-light dark:border-dark rounded px-2 py-1">
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
                                        {content && (typeof content === 'string' ? content : content(setOpen))}
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
