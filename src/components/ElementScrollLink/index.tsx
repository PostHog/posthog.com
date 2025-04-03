import React, { ButtonHTMLAttributes, useEffect, useState, useContext, createContext } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    id: string
    label: string
    element: React.RefObject<HTMLElement>
    className?: string
}

const ScrollSpyContext = createContext<{
    activeSection: string | null
    setActiveSection: (id: string) => void
}>({
    activeSection: null,
    setActiveSection: () => {},
})

export function ScrollSpyProvider({ children }) {
    const [activeSection, setActiveSection] = useState<string | null>(null)
    return <ScrollSpyContext.Provider value={{ activeSection, setActiveSection }}>{children}</ScrollSpyContext.Provider>
}

export default function ElementScrollLink({ id, label, element, className = '', ...buttonProps }: Props): JSX.Element {
    const { activeSection, setActiveSection } = useContext(ScrollSpyContext)
    const isActive = activeSection === id

    useEffect(() => {
        if (!element.current) return

        const targetElement = element.current.querySelector(`#${CSS.escape(id)}`)
        if (!targetElement) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.intersectionRatio > 0.5) {
                            setActiveSection(id)
                        }
                    }
                })
            },
            {
                root: element.current.closest('[data-radix-scroll-area-viewport]'),
                threshold: [0, 0.5, 1],
                rootMargin: '-10% 0px',
            }
        )

        observer.observe(targetElement)
        return () => observer.disconnect()
    }, [id, element, setActiveSection])

    const handleClick = () => {
        if (!element.current) return

        const scrollViewport = element.current.closest('[data-radix-scroll-area-viewport]')
        const scrollParent = scrollViewport || element.current

        const targetElement = element.current.querySelector(`#${CSS.escape(id)}`)
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
        <button
            {...buttonProps}
            onClick={handleClick}
            className={`
                text-left 
                ${isActive ? 'font-semibold text-primary dark:text-primary-dark' : ''} 
                ${className}
            `}
        >
            {label}
        </button>
    )
}
