import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import scrollTo from 'gatsby-plugin-smoothscroll'
import { mergeClassList } from '../../lib/utils'

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

    const clickHandler = (e) => {
        e.preventDefault()
        scrollTo(sectionSelector)
    }

    return (
        <Link to={sectionSelector} className={classList} onClick={clickHandler}>
            {children}
        </Link>
    )
}

const inPageLinks = [
    {
        label: "Why we're here",
        section: 'why-were-here',
    },
    {
        label: 'Our culture',
        section: 'culture',
    },
    {
        label: 'Interview process',
        section: 'interview-process',
    },
    {
        label: 'Benefits',
        section: 'benefits',
    },
    {
        label: 'Working at PostHog',
        section: 'working-at-posthog',
    },
    {
        label: 'Open roles',
        section: 'open-roles',
    },
]

interface AnchorScrollNavbarProps {
    className?: string
}

export const AnchorScrollNavbar = ({ className = '' }: AnchorScrollNavbarProps) => {
    const baseClasses =
        'rounded w-11/12 max-w-3xl mx-auto justify-between items-stetch p-3 sticky top-3 z-10 hidden lg:flex'
    const classList = mergeClassList(baseClasses, className)

    const [currentSection, setCurrentSection] = useState('why-were-here')

    useEffect(() => {
        // @todo - throttle this
        const sections = {
            culture: document.getElementById('culture')?.offsetTop,
            interviewProcess: document.getElementById('interview-process')?.offsetTop,
            benefits: document.getElementById('benefits')?.offsetTop,
            workingAtPosthog: document.getElementById('working-at-posthog')?.offsetTop,
            openRoles: document.getElementById('open-roles')?.offsetTop,
        }

        const scrollThreshold = 50

        document.addEventListener('scroll', () => {
            let offset = window.scrollY

            if (offset < sections.culture - scrollThreshold) {
                setCurrentSection('why-were-here')
            } else if (offset < sections.interviewProcess - scrollThreshold) {
                setCurrentSection('culture')
            } else if (offset < sections.benefits - scrollThreshold) {
                setCurrentSection('interview-process')
            } else if (offset < sections.workingAtPosthog - scrollThreshold) {
                setCurrentSection('benefits')
            } else if (offset < sections.openRoles - scrollThreshold) {
                setCurrentSection('working-at-posthog')
            } else {
                setCurrentSection('open-roles')
            }
        })
    }, [])

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
            <div className={classList} style={{ backgroundColor: '#202038' }}>
                {navbarLinks}
            </div>

            <select
                className="appearance-none text-white w-11/12 p-3 sticky top-3 z-10 mx-auto block max-w-3xl rounded lg:hidden"
                style={{ backgroundColor: '#202038' }}
                value={currentSection}
                onChange={(e) => scrollTo(`#${e.target.value}`)}
            >
                {selectOptions}
            </select>
        </>
    )
}
