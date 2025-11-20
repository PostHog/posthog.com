import React, { useCallback } from 'react'

interface ScrollToElementProps {
    targetId: string
    offset?: number
    children: React.ReactNode
    as?: keyof JSX.IntrinsicElements
    className?: string
    onClick?: (e: React.MouseEvent) => void
    behavior?: 'auto' | 'smooth'
    [key: string]: any
}

export const scrollToElement = (targetId: string, offset = 0, behavior: 'auto' | 'smooth' = 'smooth'): void => {
    const targetElement = document.getElementById(targetId)
    if (!targetElement) {
        return
    }

    // Check for Radix ScrollArea container
    const scrollViewport = targetElement.closest('[data-radix-scroll-area-viewport]') as HTMLElement

    if (scrollViewport) {
        // Radix ScrollArea scrolling (same logic as ElementScrollLink)
        const parentRect = scrollViewport.getBoundingClientRect()
        const targetRect = targetElement.getBoundingClientRect()
        const relativeTop = targetRect.top - parentRect.top + scrollViewport.scrollTop + offset

        scrollViewport.scrollTo({
            top: relativeTop,
            behavior,
        })
    } else {
        // Standard window scrolling fallback
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset

        window.scrollTo({
            top: targetPosition,
            behavior,
        })
    }
}

/**
 * A component that scrolls to a target element by ID when clicked.
 * Works with both Radix ScrollArea containers and standard window scrolling.
 * Can render as any HTML element (div, button, span, etc.)
 *
 * @param targetId - The ID of the element to scroll to
 * @param offset - Optional offset in pixels (default: 0)
 * @param as - HTML element to render as (default: 'div')
 * @param behavior - Scroll behavior 'smooth' or 'auto' (default: 'smooth')
 * @param children - Content
 */
export const ScrollToElement: React.FC<ScrollToElementProps> = ({
    targetId,
    offset = 0,
    children,
    onClick,
    as: Component = 'div',
    className,
    behavior = 'smooth',
    ...props
}) => {
    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            scrollToElement(targetId, offset, behavior)

            // Call original onClick if provided
            if (onClick) {
                onClick(e)
            }
        },
        [targetId, offset, onClick, behavior]
    )

    return (
        <Component {...props} className={className} onClick={handleClick}>
            {children}
        </Component>
    )
}

export default ScrollToElement
