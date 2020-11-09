import React from 'react'
import { Link } from 'gatsby'
import featuresPageData from './features'
import './other-features.scss'
import { Spacer } from '../Spacer'
import { FeaturesPageData } from '../../types'

interface OtherFeaturesBlockProps {
    currentPageKey: string
}

export const OtherFeaturesBlock = ({ currentPageKey }: OtherFeaturesBlockProps) => {
    const pagesToDisplay = featuresPageData.filter((page) => page.key !== currentPageKey)

    const generatePageBlock = (page: FeaturesPageData) => {
        return (
            <Link key={page.title.toLowerCase()} className="feature-link" to={page.href}>
                <img className="feature-image" src={page.icon} />
                <h4 className="header-4">{page.title}</h4>
            </Link>
        )
    }

    // TO-DO: Full dynamic generation
    return (
        <div className="other-features-container">
            <div className="other-features-wrapper">
                <h2>Other features</h2>
                <div className="features">
                    <div className="two-features">
                        {pagesToDisplay.slice(0, 2).map((page) => generatePageBlock(page))}
                    </div>
                    <div className="two-features">
                        {pagesToDisplay.slice(2, 4).map((page) => generatePageBlock(page))}
                    </div>
                    <div className="two-features">
                        {pagesToDisplay.slice(4, 6).map((page) => generatePageBlock(page))}
                    </div>
                    {generatePageBlock(pagesToDisplay[6])}
                </div>
                <Spacer onlyDesktop={true} />
            </div>
        </div>
    )
}
