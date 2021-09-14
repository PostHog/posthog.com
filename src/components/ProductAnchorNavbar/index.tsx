import React, { useState, useEffect } from 'react'
import downIcon from '../../images/icons/down-caret.svg'
import { scrollWithOffset } from 'lib/utils'
import Chip from 'components/Chip'

const ButtonLink = ({
    section,
    currentSection,
    children,
}: {
    section: string
    currentSection: string
    children: any
}) => {
    const sectionSelector = `#${section}`
    const clickHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        scrollWithOffset(sectionSelector, -90)
    }

    return (
        <Chip active={section == currentSection} onClick={clickHandler}>
            <span>{children}</span>
        </Chip>
    )
}

const inPageLinks: { label: string; section: string }[] = [
    {
        label: 'Platform',
        section: 'platform',
    },
    {
        label: 'Analytics',
        section: 'analytics',
    },
    {
        label: 'Insights',
        section: 'insights',
    },
    {
        label: 'Plugins',
        section: 'plugins',
    },
]

export const ProductAnchorNavbar = () => {
    const baseClasses = 'w-full space-x-2 mx-auto justify-center p-3 sticky top-2 mb-12 z-30 hidden lg:inline-flex'

    const [currentSection, setCurrentSection] = useState('platform')

    useEffect(() => {
        const scrollHandler = () => {
            const scrollThreshold = screen.height / 2
            const offset = window.scrollY
            const section = inPageLinks
                .map(({ section }: { section: string }) => {
                    const top: number = document.getElementById(section)?.getBoundingClientRect().top || 0
                    const distance = top - scrollThreshold <= 0 ? Math.abs(top - offset) : 10000000
                    return { label: section, value: distance }
                })
                .sort((a, b) => (a.value < b.value ? -1 : 1))[0]
            setCurrentSection(section.label)
        }

        document.addEventListener('scroll', scrollHandler)
        window.addEventListener('resize', scrollHandler)

        return () => {
            document.removeEventListener('scroll', scrollHandler)
            window.removeEventListener('resize', scrollHandler)
        }
    }, [])

    const positionStyles = {}

    const navbarLinks = inPageLinks.map(({ label, section }) => (
        <ButtonLink section={section} currentSection={currentSection} key={section}>
            {label}
        </ButtonLink>
    ))

    const selectOptions = inPageLinks.map(({ label, section }) => (
        <option value={section} key={section}>
            {label}
        </option>
    ))

    return (
        <>
            <div
                className={baseClasses}
                style={{
                    // border: 'solid 1px rgba(255,255,255,.25)',
                    ...positionStyles,
                }}
            >
                {navbarLinks}
            </div>

            {/* mobile-only menu */}

            <div className="w-11/12 sticky top-2 mx-auto block max-w-3xl lg:hidden z-30 mb-12" style={positionStyles}>
                <select
                    className="appearance-none text-white block p-3 w-full rounded border border-white border-half border-opacity-10 bg-primary font-bold"
                    value={currentSection}
                    onChange={(e) => scrollWithOffset(`#${e.target.value}`, -90)}
                >
                    {selectOptions}
                </select>

                <img src={downIcon} alt="expand menu" className="absolute top-2 right-2 mt-1" />
            </div>
        </>
    )
}
