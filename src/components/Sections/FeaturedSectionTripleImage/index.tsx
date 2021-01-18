import React from 'react'
import { Spacer } from '../../Spacer'
import './style.scss'

interface FeaturedSectionTripleImageProps {
    mobileImg?: string
    img1: string
    img2: string
    img3: string
    listItem: string
    headerText: string
    descriptionText: string
    title1?: string
    title2?: string
    title3?: string
    color?: string
}

export const FeaturedSectionTripleImage = ({
    mobileImg,
    img1,
    img2,
    img3,
    listItem,
    headerText,
    descriptionText,
    title1 = '',
    title2 = '',
    title3 = '',
    color = 'red',
}: FeaturedSectionTripleImageProps) => {
    const styleMap = {
        yellow: ['yellowText', 'yellowLine'],
        red: ['redText', 'redLine'],
        blue: ['blueText', 'blueLine'],
        navy: ['darkBlueText', 'darkBlueLine'],
    }
    return (
        <div className="fs-triple-img-wrapper">
            <div className="wrapper bluebg featureSection">
                <div className="hidden">
                    <img src={mobileImg ? mobileImg : img1} loading="lazy" alt="improve-mobile" className="imageShow" />
                </div>
                <Spacer onlyMobile={true} />
                <div className="row1 row">
                    <div className="number">
                        <h1 className={styleMap[color][0]}>{listItem}</h1>
                    </div>
                    <div className="col">
                        <h2 className="gosha">{headerText}</h2>
                        <hr className={styleMap[color][1]} />
                        <div className="description-text">{descriptionText}</div>
                    </div>
                </div>
                <br className="hiddenBreak" />
                <div className="row2 row">
                    <div className="element">
                        <img alt={title1 + ' Image'} loading="lazy" src={img1} />
                        <br className="revHiddenBreak" />
                        <h4>{title1}</h4>
                    </div>
                    <div className="element">
                        <img alt={title2 + ' Image'} loading="lazy" src={img2} />
                        <br className="revHiddenBreak" />
                        <h4>{title2}</h4>
                    </div>
                    <div className="element">
                        <img alt={title3 + ' Image'} loading="lazy" src={img3} />
                        <br className="revHiddenBreak" />
                        <h4>{title3}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
