import React from 'react'
import { CallToAction } from 'components/CallToAction'

export const GDPRForm = () => (
    <>
        <br />
        <p className="px-4 font-bold text-center z-10 relative mb-0 text-sm md:text-lg">
            Need analytics hosted in the EU?
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 xl:gap-4">
            <CallToAction width="106" to="/eu">
                Signup now!
            </CallToAction>
        </div>
        <br />
    </>
)
