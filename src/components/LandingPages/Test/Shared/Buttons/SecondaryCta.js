import React from 'react'

import calendarImg from '../../images/calendar.svg'

const SecondaryCta = ({ children }) => {
    return (
        <button className="bg-transparent border-white border-opacity-20 border-2 p-2 uppercase rounded-sm text-white mt-2 flex items-center justify-between mx-auto">
            <div className="bg-opacity-10 bg-yellow-100 rounded rounded-sm p-1 mr-8">
                <img src={calendarImg} className="h-4 w-4 mb-0" alt="Get started with PostHog" />
            </div>
            <div className="mr-8">{children}</div>
        </button>
    )
}

export default SecondaryCta
