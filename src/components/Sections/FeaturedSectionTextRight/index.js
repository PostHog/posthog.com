import React from 'react'
import './style.scss'

export const FeaturedSectionTextRight = ({
    listItem,
    headerText,
    descriptionText,
    image,
    color = 'yellow',
    imgDesktopHeight = '413px',
    imgDesktopWidth = '621px',
    imgStyle = {},
}) => {
    const styleMap = {
        yellow: ['yellowText', 'yellowLine'],
        red: ['redText', 'redLine'],
        blue: ['blueText', 'blueLine'],
        navy: ['darkBlueText', 'darkBlueLine'],
    }

    const imageStyle = {
        ...imgStyle,
        backgroundImage: `url(${image})`,
        backgroundSize: imgStyle.backgroundSize ? imgStyle.backgroundSize : `${imgDesktopWidth} ${imgDesktopHeight}`,
        height: imgDesktopHeight,
        width: imgDesktopWidth,
    }

    return (
        <div className="featured-section-right-wrapper">
            <div className="fs-wrapper feature-section">
                <div className="row">
                    <div className="section-banner-image" style={imageStyle} />
                    <div className="list-item number">
                        <h1 className={styleMap[color][0]} id="feature-header-01">
                            {listItem}
                        </h1>
                    </div>
                    <div className="col">
                        <h2 className="gosha fs-right-header-2">{headerText}</h2>
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
