import React from 'react'
import './page-header.scss'

interface PageHeaderProps {
    title: string
    tagline: string
    styleKey: string
    bgColor?: string
}

export const PageHeader = ({ title, tagline, styleKey, bgColor = 'navy' }: PageHeaderProps) => {
    const backgroundColorClass = `bg-${bgColor}`
    return (
        <div className="page-header-container">
            <div className={`head ${styleKey}`}>
                <div className="tagline">
                    <h1>{title}</h1>
                    <p>{tagline}</p>
                </div>
            </div>
        </div>
    )
}
