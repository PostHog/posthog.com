import React, { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    id: string
    label: string
    element: React.RefObject<HTMLElement>
    className?: string
}

export default function ElementScrollLink({ id, label, element, className = '', ...buttonProps }: Props): JSX.Element {
    const handleClick = () => {
        if (!element.current) return

        const scrollViewport = element.current.closest('[data-radix-scroll-area-viewport]')
        const scrollParent = scrollViewport || element.current

        const targetElement = element.current.querySelector(`#${id}`)
        if (targetElement && scrollParent) {
            const parentRect = scrollParent.getBoundingClientRect()
            const targetRect = targetElement.getBoundingClientRect()
            const relativeTop = targetRect.top - parentRect.top + scrollParent.scrollTop
            scrollParent.scrollTo({
                top: relativeTop,
                behavior: 'smooth',
            })
        }
    }

    return (
        <button {...buttonProps} onClick={handleClick} className={`text-left ${className}`}>
            {label}
        </button>
    )
}
