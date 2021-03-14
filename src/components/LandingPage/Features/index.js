import React from 'react'

import oldWayImg from '../images/platform-old-way.svg'
import newWayImg from '../images/platform-new-way.svg'

export const Features = () => {
    return (
        <div className="features py-12 text-white text-center">
            <div className="w-11/12 max-w-4xl mx-auto">
                <h2>A single platform that does it all</h2>
                <p className="opacity-80 mt-1 text-center">
                    PostHog eliminates the need for multiple tools that weren’t built to work together.
                </p>

                <div className="mt-12 flex justify-between flex-col md:flex-row">
                    <div className="w-full md:w-1/2 md:mr-5">
                        <header className="gosha text-lg">The old way</header>
                        <img src={oldWayImg} alt="The old way" className="w-full" />
                    </div>

                    <div className="w-full mt-12 md:mt-0 md:w-1/2 md:ml-5">
                        <header className="gosha text-lg">The new way</header>
                        <img src={newWayImg} alt="The new way" className="w-full" />
                        <p className="opacity-80 mt-3">
                            Our all-in-one solution was built from the ground up to seamlessly work together.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
