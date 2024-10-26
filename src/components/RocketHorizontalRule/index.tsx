import React from 'react'
const rocket =
    'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/RocketHorizontalRule/images/rocket.svg'

export const RocketHorizontalRule = () => {
    return (
        <div className="w-11/12 max-w-6xl mx-auto">
            <img src={rocket} className="max-w-full" alt="rocket as horizontal rule" />
        </div>
    )
}
