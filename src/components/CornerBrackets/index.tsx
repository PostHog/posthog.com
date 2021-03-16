import React from 'react'

import buttonBracketImg from '../LandingPage/images/rounded-corner.svg'

export const CornerBrackets = () => {
    return (
        <>
            <img src={buttonBracketImg} alt="button bracket" className="absolute top-0 left-0 -mt-2 -ml-2 opacity-30" />
            <img
                src={buttonBracketImg}
                alt="button bracket"
                className="absolute top-0 right-0 -mt-2 -mr-2 opacity-30 transform rotate-90"
            />
            <img
                src={buttonBracketImg}
                alt="button bracket"
                className="absolute bottom-0 left-0 -mb-2 -ml-2 opacity-30 transform -rotate-90"
            />
            <img
                src={buttonBracketImg}
                alt="button bracket"
                className="absolute bottom-0 right-0 -mb-2 -mr-2 opacity-30 transform rotate-180"
            />
        </>
    )
}
