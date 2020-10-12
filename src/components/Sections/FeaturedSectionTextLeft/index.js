import React from 'react'
import './style.scss'

export const FeaturedSectionTextLeft = ({ listItem, headerText, descriptionText, image, color = 'yellow' }) => {
    const styleMap = {
        yellow: ['yellowText', 'yellowLine'],
        red: ['redText', 'redLine'],
        blue: ['blueText', 'blueLine'],
        navy: ['darkBlueText', 'darkBlueLine'],
    }

    return (
        <div className="featured-section-left-wrapper">
            <div className="wrapper sizing feature-section">
                <div className="row">
                    <div className="section-banner-image" style={{ backgroundImage: `url(${image})` }} />
                    <div className="list-item number">
                        <h1 className={styleMap[color][0]} id="feature-header-01">
                            {listItem}
                        </h1>
                    </div>
                    <div className="col">
                        <h2 className="gosha">{headerText}</h2>
                        <br className="revHiddenBreak" />
                        <hr className={styleMap[color][1]} />
                        <br className="revHiddenBreak" />
                        <p>{descriptionText}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
