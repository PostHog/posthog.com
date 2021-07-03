import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import scrollTo from 'gatsby-plugin-smoothscroll'
import downIcon from '../../images/icons/down-caret.svg'

const ButtonLink = ({
    section,
    currentSection,
    children,
}: {
    section: string
    currentSection: string
    children: any
}) => {
    const baseClasses = 'px-3 py-2 rounded'
    const classList =
        section == currentSection
            ? baseClasses.concat(' bg-primary text-white hover:text-white')
            : baseClasses.concat(' text-white text-opacity-80 hover:bg-gray-100 hover:bg-opacity-10 hover:text-white')
    const sectionSelector = `#${section}`

    const clickHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        scrollTo(sectionSelector)
    }

    return (
        <Link to={sectionSelector} className={classList} onClick={clickHandler}>
            {children}
        </Link>
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
        label: 'Plugin',
        section: 'plugin',
    },
]

export const ProductAnchorNavbar = () => {
    const baseClasses = 'rounded w-11/12 max-w-3xl mx-auto justify-between items-stetch p-3 fixed z-20 hidden lg:flex'

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

    const positionStyles = {
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 50,
    }

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
                    backgroundColor: '#202038',
                    ...positionStyles,
                }}
            >
                {navbarLinks}
            </div>

            <div className="w-11/12 fixed mx-auto block max-w-3xl lg:hidden z-20" style={positionStyles}>
                <select
                    className="appearance-none text-white block p-3 w-full rounded"
                    style={{ backgroundColor: '#202038' }}
                    value={currentSection}
                    onChange={(e) => scrollTo(`#${e.target.value}`)}
                >
                    {selectOptions}
                </select>

                <img src={downIcon} alt="expand menu" className="absolute top-2 right-2 mt-1" />
            </div>
        </>
    )
}
