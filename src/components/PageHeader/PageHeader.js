import React from 'react'
import styles from './page-header.module.css'

const PageHeader = ({ title, tagline, styleKey, bgColor = 'navy' }) => {
    const backgroundColorClass = `bg-${bgColor}`
    return (
        <div className={`${styles.head} ${styles[styleKey]} ${backgroundColorClass}`}>
            <div className="headContents">
                <h1>{title}</h1>
                <p>{tagline}</p>
            </div>
        </div>
    )
}

export default PageHeader
