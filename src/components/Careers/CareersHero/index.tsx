import React from 'react'
import scrollTo from 'gatsby-plugin-smoothscroll'

import { Header } from '../../Header'
import { CallToAction } from '../../CallToAction'

export const CareersHero = () => {
    return (
        <div className="careers-hero">
            <Header onPostPage={false} transparentBackground />

            <div className="w-11/12 pt-12 sm:py-24 mx-auto text-center relative z-10 rounded">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-white mb-0 pb-0 text-3xl">
                        We’re working to increase the number of successful products in the world
                    </h1>

                    <div className="w-full sm:w-72 mx-auto">
                        <CallToAction
                            icon="down-arrow"
                            onClick={() => scrollTo('#open-roles')}
                            type="primary"
                            width="72"
                            className="my-12"
                        >
                            View open roles
                        </CallToAction>
                    </div>
                </div>
            </div>
        </div>
    )
}
