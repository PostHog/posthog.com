import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import scrollTo from 'gatsby-plugin-smoothscroll'

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

interface AnchorScrollNavbarProps {
    className?: string
}

export const AnchorScrollNavbar = ({ className = '' }: AnchorScrollNavbarProps) => {
    const baseClasses =
        'rounded w-11/12 max-w-3xl mx-auto justify-between items-stetch p-3 sticky top-3 z-10 hidden lg:flex'
    const classList = [baseClasses, className].join(' ')

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

        document.addEventListener('scroll', () => {
            let offset = window.scrollY

            if (offset < sections.culture) {
                setCurrentSection('why-were-here')
            } else if (offset < sections.interviewProcess) {
                setCurrentSection('culture')
            } else if (offset < sections.benefits) {
                setCurrentSection('interview-process')
            } else if (offset < sections.workingAtPosthog) {
                setCurrentSection('benefits')
            } else if (offset < sections.openRoles) {
                setCurrentSection('working-at-posthog')
            } else {
                setCurrentSection('open-roles')
            }
        })
    }, [])

    return (
        <>
            <div className={classList} style={{ backgroundColor: '#202038' }}>
                <ButtonLink section="why-were-here" currentSection={currentSection}>
                    Why we're here
                </ButtonLink>
                <ButtonLink section="culture" currentSection={currentSection}>
                    Our culture
                </ButtonLink>
                <ButtonLink section="interview-process" currentSection={currentSection}>
                    Interview process
                </ButtonLink>
                <ButtonLink section="benefits" currentSection={currentSection}>
                    Benefits
                </ButtonLink>
                <ButtonLink section="working-at-posthog" currentSection={currentSection}>
                    Working at PostHog
                </ButtonLink>
                <ButtonLink section="open-roles" currentSection={currentSection}>
                    Open roles
                </ButtonLink>
            </div>

            <select
                className="appearance-none text-white w-11/12 p-3 sticky top-3 z-10 mx-auto block max-w-3xl rounded lg:hidden"
                style={{ backgroundColor: '#202038' }}
                value={currentSection}
                onChange={(e) => scrollTo(`#${e.target.value}`)}
            >
                <option value="why-were-here">Why we're here</option>
                <option value="culture">Our culture</option>
                <option value="interview-process">Interview process</option>
                <option value="benefits">Benefits</option>
                <option value="working-at-posthog">Working at PostHog</option>
                <option value="open-roles">Open roles</option>
            </select>
        </>
    )
}
