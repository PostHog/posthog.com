import { MdxHeader } from 'components/MdxAnchorHeaders'
import React, { useState } from 'react'
import { Heading } from 'types'
import './style.css'

interface HiddenSectionProps {
    headingType: Heading
    title: string
    children: React.ReactNode
    endWithDivider?: boolean
    defaultIsOpen?: boolean
}

export const HiddenSection = ({
    headingType,
    title,
    children,
    endWithDivider = true,
    defaultIsOpen = false,
}: HiddenSectionProps) => {
    const [isOpen, setIsOpen] = useState(defaultIsOpen)

    const isLargeHeading = ['h1', 'h2', 'h3'].includes(headingType)
    const isSupportedHeading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

    if (!isSupportedHeading.includes(headingType)) {
        throw new Error(`Unsupported HiddenSection headingType of ${headingType}`)
    }

    const arrowIcon = (
        <span
            style={{
                fontSize: isLargeHeading ? 20 : 15,
                display: 'inline-block',
                position: 'relative',
                transform: isLargeHeading ? 'translateY(-15%)' : 'translateY(-10%)',
            }}
            className={isOpen ? 'hidden-section-open' : 'hidden-section-closed'}
        ></span>
    )

    return (
        <div className="hidden-section-wrapper">
            <div onClick={() => setIsOpen(!isOpen)} className="hidden-section-title">
                <MdxHeader headingType={headingType}>
                    <span style={{ paddingRight: '10px' }}>{arrowIcon}</span>
                    {title}
                </MdxHeader>
            </div>

            <span style={{ display: isOpen ? 'block' : 'none' }}>{children}</span>
            {isOpen && endWithDivider ? <hr /> : null}
        </div>
    )
}
