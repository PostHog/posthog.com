import React, { useState } from 'react'
import './style.scss'

interface HiddenSectionProps {
    headingType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    title: any
    children: any
    endWithDivider?: boolean
}

export const HiddenSection = ({ headingType, title, children, endWithDivider = true }: HiddenSectionProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const isLargeHeading = ['h1', 'h2', 'h3'].includes(headingType)

    const arrowIcon = (
        <span
            style={{
                fontSize: isLargeHeading ? 20 : 15,
                display: 'inline-block',
                position: 'relative',
                transform: isLargeHeading ? 'translateY(-15%)' : 'translateY(-10%)',
            }}
        >
            {isOpen ? '▼' : '▶'}
        </span>
    )

    return (
        <div className="hidden-section-wrapper">
            <div onClick={() => setIsOpen(!isOpen)} className="hidden-section-title">
                {headingType === 'h1' ? (
                    <h1>
                        {arrowIcon} {title}
                    </h1>
                ) : headingType === 'h2' ? (
                    <h2>
                        {arrowIcon} {title}
                    </h2>
                ) : headingType === 'h3' ? (
                    <h3>
                        {arrowIcon} {title}
                    </h3>
                ) : headingType === 'h4' ? (
                    <h4>
                        {arrowIcon} {title}
                    </h4>
                ) : headingType === 'h5' ? (
                    <h5>
                        {arrowIcon} {title}
                    </h5>
                ) : (
                    <h6>
                        {arrowIcon} {title}
                    </h6>
                )}
            </div>

            <span style={{ display: isOpen ? 'block' : 'none' }}>{children}</span>
            {isOpen && endWithDivider ? <hr /> : null}
        </div>
    )
}
