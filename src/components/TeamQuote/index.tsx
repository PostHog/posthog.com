import React from 'react'
import { Link } from 'gatsby'

import { mergeClassList } from '../../lib/utils'

import charlesImg from './images/Charles.png'
import eltjeImg from './images/Eltje.png'
import ericImg from './images/Eric.png'
import kunalImg from './images/Kunal.png'

interface CallToActionProps {
    backgroundColor?: string
    textColor?: string
    fontSize?: string
    width: string
    value: string
    author: string
    role: string
    img: string
    imgBackground: string
}

export const TeamQuote = ({ backgroundColor, textColor, fontSize, width, value, author, role, img, imgBackground }) => {
    return (
        <div className={`${backgroundColor}`}>
            <blockquote className={`${backgroundColor} ${width} mx-auto px-8 xl:px-0 py-16`}>
                <h4 className={`${textColor} ${fontSize} leading-snug`} dangerouslySetInnerHTML={{ __html: value }} />
                <footer className="flex mt-4">
                    <div className="flex-0 mr-4">
                        <img
                            src={img}
                            width="100"
                            height="100"
                            alt="{author}, {role}"
                            className={`${imgBackground} rounded-full`}
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <h4 className={`${textColor} mb-0 leading-tight`}>{author}</h4>
                        <h4 className={`${textColor} text-opacity-50 mb-0 leading-tight`}>{role}</h4>
                    </div>
                </footer>
            </blockquote>
        </div>
    )
}
