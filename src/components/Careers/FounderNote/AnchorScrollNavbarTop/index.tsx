import React, { useState, useEffect } from 'react'
import scrollTo from 'gatsby-plugin-smoothscroll'
import { mergeClassList } from '../../../../lib/utils'

const ButtonLink = ({
    section,
    currentSection,
    children,
}: {
    section: string
    currentSection: string
    children: React.ReactNode
}) => {
    const sectionSelector = `#${section}`
    const clickHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        scrollTo(sectionSelector)
    }

    return (
        <button
            aria-selected={section == currentSection}
            onClick={clickHandler}
            className="block text-primary dark:text-primary-dark leading-tight font-medium hover:text-red dark:text-white dark:hover:text-red cursor-pointer hover:opacity-100 opacity-60 text-[14px] py-1 block relative active:top-[0.5px] active:scale-[.99]"
        >
            {children}
        </button>
    )
}

const inPageLinks = [
    {
        label: 'Transparency',
        section: 'transparency',
    },
    {
        label: 'Who we hire',
        section: 'who-we-hire',
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
        label: 'Working here',
        section: 'working-at-posthog',
    },
    {
        label: 'Open roles',
        section: 'open-roles',
    },
]

interface AnchorScrollNavbarTopProps {
    className?: string
}

export const AnchorScrollNavbarTop = ({ className = '' }: AnchorScrollNavbarTopProps) => {
    const baseClasses = ''
    const classList = mergeClassList(baseClasses, className)

    const [currentSection, setCurrentSection] = useState('transparency')

    useEffect(() => {
        const scrollThreshold = 100

        const scrollHandler = () => {
            const sections = {
                introduction: document.getElementById('introduction')!.offsetTop,
                transparency: document.getElementById('transparency')!.offsetTop,
                whoWeHire: document.getElementById('who-we-hire')!.offsetTop,
                interviewProcess: document.getElementById('interview-process')!.offsetTop,
                benefits: document.getElementById('benefits')!.offsetTop,
                workingAtPosthog: document.getElementById('working-at-posthog')!.offsetTop,
                openRoles: document.getElementById('open-roles')!.offsetTop,
            }
            const offset = window.scrollY

            if (offset < sections.introduction - scrollThreshold) {
                setCurrentSection('introduction')
            } else if (offset < sections.transparency - scrollThreshold) {
                setCurrentSection('transparency')
            } else if (offset < sections.whoWeHire - scrollThreshold) {
                setCurrentSection('who-we-hire')
            } else if (offset < sections.interviewProcess - scrollThreshold) {
                setCurrentSection('interview-process')
            } else if (offset < sections.benefits - scrollThreshold) {
                setCurrentSection('benefits')
            } else if (offset < sections.workingAtPosthog - scrollThreshold) {
                setCurrentSection('working-at-posthog')
            } else {
                setCurrentSection('open-roles')
            }
        }

        document.addEventListener('scroll', scrollHandler)
        window.addEventListener('resize', scrollHandler)

        return () => {
            document.removeEventListener('scroll', scrollHandler)
            window.removeEventListener('resize', scrollHandler)
        }
    }, [])

    const navbarLinks = inPageLinks.map(({ label, section }) => (
        <li key={label} className="relative leading-none m-0">
            <ButtonLink section={section} currentSection={currentSection} key={section}>
                {label}
            </ButtonLink>
        </li>
    ))

    const selectOptions = inPageLinks.map(({ label, section }) => (
        <option value={section} key={section}>
            {label}
        </option>
    ))

    return (
        <>
            <div className={classList}>{navbarLinks}</div>

            <div className="w-11/12 sticky top-3 z-10 mx-auto block max-w-3xl md:hidden border border-1 border-tan/25 rounded">
                <select
                    className="appearance-none text-white bg-primary block p-3 w-full rounded font-bold"
                    value={currentSection}
                    onChange={(e) => scrollTo(`#${e.target.value}`)}
                >
                    {selectOptions}
                </select>
            </div>
        </>
    )
}
