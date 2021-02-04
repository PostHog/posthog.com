import React from 'react'
import './style.scss'
import '../featured-section.scss'
import { Spacer } from '../../Spacer'

export const FeaturedSectionTextRight = ({
    listItem,
    headerText,
    descriptionText,
    image,
    color = 'yellow',
    imgDesktopHeight = 413,
    imgDesktopWidth = 621,
    mobileSpacerHeight = 50,
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
        backgroundSize: imgStyle.backgroundSize
            ? imgStyle.backgroundSize
            : `${imgDesktopWidth}px ${imgDesktopHeight}px`,
        height: imgDesktopHeight,
        width: imgDesktopWidth,
    }

    return (
        <div className="featured-section-right-wrapper featured-section-main">
            <div className="fs-wrapper feature-section">
                <div className="row">
                    <div className="section-banner-image" style={imageStyle} />
                    <div className="list-item number">
                        <h1 className={styleMap[color][0]} id="feature-header-01">
                            {listItem}
                        </h1>
                    </div>
                    <div className="col">
                        <h2 className="gosha fs-header-2">{headerText}</h2>
                        <br className="revHiddenBreak" />
                        <hr className={styleMap[color][1]} />
                        <br className="revHiddenBreak" />
                        <div className="fs-paragraph">{descriptionText}</div>
                    </div>
                </div>
            </div>
            <Spacer onlyMobile={true} height={mobileSpacerHeight} />
        </div>
    )
}
