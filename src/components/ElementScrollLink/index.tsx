import React, { ButtonHTMLAttributes, useEffect, useState, useContext, createContext, useMemo } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    id: string
    label: string
    element: React.RefObject<HTMLElement>
    className?: string
}

interface SectionData {
    id: string
    isIntersecting: boolean
    distance: number
}

interface ScrollSpyContextType {
    sections: Record<string, SectionData>
    setSectionData: (id: string, data: SectionData) => void
    activeSection: string | null
}

const ScrollSpyContext = createContext<ScrollSpyContextType>({
    sections: {},
    setSectionData: () => { },
    activeSection: null,
})

export function ScrollSpyProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [sections, setSections] = useState<Record<string, SectionData>>({})

    const setSectionData = (id: string, data: SectionData) => {
        setSections((prev) => ({
            ...prev,
            [id]: data,
        }))
    }

    const activeSection = useMemo(() => {
        const visibleSections = Object.values(sections).filter((section) => section.isIntersecting)

        if (visibleSections.length === 0) return null

        return visibleSections.reduce((closest, current) => (current.distance < closest.distance ? current : closest))
            .id
    }, [sections])

    return (
        <ScrollSpyContext.Provider value={{ sections, setSectionData, activeSection }}>
            {children}
        </ScrollSpyContext.Provider>
    )
}

export default function ElementScrollLink({ id, label, element, className = '', ...buttonProps }: Props): JSX.Element {
    const { setSectionData, activeSection } = useContext(ScrollSpyContext)
    const isActive = activeSection === id

    useEffect(() => {
        if (!element.current) return

        const targetElement = element.current.querySelector(`#${CSS.escape(id)}`)
        if (!targetElement) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setSectionData(id, {
                        id,
                        isIntersecting: entry.isIntersecting,
                        distance: entry.boundingClientRect.top - (entry.rootBounds?.top ?? 0),
                    })
                })
            },
            {
                root: element.current.closest('[data-radix-scroll-area-viewport]'),
                threshold: [0, 0.1],
            }
        )
        observer.observe(targetElement)
        return () => observer.disconnect()
    }, [id, element, setSectionData])

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
            className={` [overflow-wrap:anywhere]
                text-left text-sm py-0.5 block relative active:top-px active:scale-[.99]
                ${isActive ? 'font-semibold text-primary' : 'text-secondary hover:text-primary '} 
                ${className}
            `}
        >
            {label}
        </button>
    )
}
