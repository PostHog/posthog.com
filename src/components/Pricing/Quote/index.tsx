import React from 'react'
import quoteAvatar from '../../../images/jonathan-hyde@2x.png'

import { Structure } from '../../Structure'

export const Quote = () => {
    return (
        <div className="w-11/12 mx-auto relative">
            <div className="pricing-hero pricing-quote text-white text-center relative max-w-xl mx-auto md:mt-12 bg-white bg-opacity-10 rounded p-8 text-center text-white text-lg">
                Posthog is the first analytics platform where I can be 100% confident in the data. I've finally got the
                data insight platform I've always wanted as a Product person.
            </div>
            <div className="text-center text-white mt-10 relative">
                <img src={quoteAvatar} alt="Jonathan Hyde" width="91" height="91" className="mx-auto mb-2" />
                <div className="text-lg font-bold">Jonathan Hyde</div>
                <div className="text-sm text-opacity-75">Former Head of Product, Legl</div>
            </div>
        </div>
    )
}
