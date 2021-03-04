import React from 'react'

const Hero = ({ children }) => {
    return (
        <div className="hero py-24">
            <div className="w-11/12 mx-auto text-center">{children}</div>
        </div>
    )
}

export default Hero
