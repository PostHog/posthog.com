import React from 'react'

import buttonBracketImg from '../LandingPage/images/rounded-corner.svg'
import purpleishButtonBracketImg from '../LandingPage/images/rounded-corner-purpleish.svg'

const supportedColors = {
    white: buttonBracketImg,
    purpleish: purpleishButtonBracketImg,
}

const spacingClasses = {
    md: 2,
    lg: 4,
}

export const CornerBrackets = ({ spacing = 'md', color = 'white' }: { spacing?: string; color?: string }) => {
    const img = supportedColors[color]
    const spacingClass = spacingClasses[spacing]

    return (
        <>
            <img
                src={img}
                alt="button bracket"
                className={`absolute top-0 left-0 -mt-${spacingClass} -ml-${spacingClass} opacity-30`}
            />
            <img
                src={img}
                alt="button bracket"
                className={`absolute top-0 right-0 -mt-${spacingClass} -mr-${spacingClass} opacity-30 transform rotate-90`}
            />
            <img
                src={img}
                alt="button bracket"
                className={`absolute bottom-0 left-0 -mb-${spacingClass} -ml-${spacingClass} opacity-30 transform -rotate-90`}
            />
            <img
                src={img}
                alt="button bracket"
                className={`absolute bottom-0 right-0 -mb-${spacingClass} -mr-${spacingClass} opacity-30 transform rotate-180`}
            />
        </>
    )
}
