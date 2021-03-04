import React from 'react'

import rocketImg from '../images/rocket.svg'

export const PrimaryCta = ({ children }) => {
    return (
        <button className="bg-primary p-2 uppercase rounded-sm text-white mt-8 flex items-center justify-between mx-auto">
            <div className="bg-opacity-10 bg-yellow-100 rounded rounded-sm p-1 mr-8">
                <img src={rocketImg} className="h-4 w-4 mb-0" alt="Get started with PostHog" />
            </div>
            <div className="mr-8">{children}</div>
        </button>
    )
}
