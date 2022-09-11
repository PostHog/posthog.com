import React, { useState, useEffect } from 'react'
import scrollTo from 'gatsby-plugin-smoothscroll'
import { mergeClassList } from '../../../lib/utils'
import downIcon from '../../../images/icons/down-caret.svg'
import Chip from 'components/Chip'

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
        <Chip active={section == currentSection} onClick={clickHandler}>
            {children}
        </Chip>
    )
}

const inPageLinks = [
    {
        label: 'Overview',
        section: 'overview',
    },
    {
        label: 'Our story',
        section: 'story',
    },
    {
        label: 'Transparency',
        section: 'transparency',
    },
    {
        label: 'Interview process',
        section: 'interview-process',
    },
    {
        label: 'Benefits',
        section: 'benefits',
    },
]

interface AboutAnchorScrollNavbarProps {
    className?: string
}

export const AboutAnchorScrollNavbar = ({ className = '' }: AboutAnchorScrollNavbarProps) => {
    const baseClasses =
        'space-x-2 w-full mx-auto justify-center p-3 sticky top-[-1px] bg-tan/80 backdrop-blur border-t border-b border-dashed border-gray-accent-light z-30 hidden md:inline-flex'
    const classList = mergeClassList(baseClasses, className)

    const [currentSection, setCurrentSection] = useState('why-were-here')

    useEffect(() => {
        const scrollThreshold = 100

        const scrollHandler = () => {
            const sections = {
                overview: document.getElementById('overview')!.offsetTop,
                story: document.getElementById('story')!.offsetTop,
                transparency: document.getElementById('transparency')!.offsetTop,
            }
            const offset = window.scrollY

            if (offset < sections.overview - scrollThreshold) {
                setCurrentSection('overview')
            } else if (offset < sections.story - scrollThreshold) {
                setCurrentSection('story')
            } else if (offset < sections.transparency - scrollThreshold) {
                setCurrentSection('transparency')
            } else {
                setCurrentSection('overview')
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
            <div className={classList}>{navbarLinks}</div>

            <div className="w-11/12 mb-8 sticky top-3 z-10 mx-auto block max-w-3xl md:hidden border border-1 border-tan/25 rounded">
                <select
                    className="appearance-none text-white bg-primary block p-3 w-full rounded font-bold"
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
