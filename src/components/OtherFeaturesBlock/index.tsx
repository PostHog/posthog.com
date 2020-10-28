import React from 'react'
import { Link } from 'gatsby'
import featuresPageData from './features'
import './other-features.scss'
import { Spacer } from '../Spacer'

interface OtherFeaturesBlockProps {
    currentPageKey: string
}

export const OtherFeaturesBlock = ({ currentPageKey }: OtherFeaturesBlockProps) => {
    const pagesToDisplay = featuresPageData.filter((page) => page.key !== currentPageKey)
    return (
        <div className="other-features-container">
            <div className="other-features-wrapper">
                <h2>Other features</h2>
                <div className="features">
                    <div className="two-features">
                        {pagesToDisplay.slice(0, 2).map((page) => (
                            <Link key={page.title.toLowerCase()} className="feature-link" to={page.href}>
                                <img className="feature-image" src={page.icon} />
                                <h4 className="header-4">{page.title}</h4>
                            </Link>
                        ))}
                    </div>
                    <div className="two-features">
                        {pagesToDisplay.slice(2, 4).map((page) => (
                            <Link key={page.title.toLowerCase()} className="feature-link" to={page.href}>
                                <img className="feature-image" src={page.icon} />
                                <h4 className="header-4">{page.title}</h4>
                            </Link>
                        ))}
                    </div>
                    <Link className="feature-link" to={pagesToDisplay[4].href}>
                        <img className="feature-image" src={pagesToDisplay[4].icon} />
                        <h4 className="header-4">{pagesToDisplay[4].title}</h4>
                    </Link>
                </div>
                <Spacer onlyDesktop={true} />
            </div>
        </div>
    )
}
