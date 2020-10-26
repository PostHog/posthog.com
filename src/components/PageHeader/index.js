import React from 'react'
import './page-header.scss'

export const PageHeader = ({ title, tagline, styleKey, bgColor = 'navy' }) => {
    const backgroundColorClass = `bg-${bgColor}`
    return (
        <div className="page-header-container">
            <div className={`head ${styleKey} ${backgroundColorClass}`}>
                <div className="tagline">
                    <h1>{title}</h1>
                    <p>{tagline}</p>
                </div>
            </div>
        </div>
    )
}
