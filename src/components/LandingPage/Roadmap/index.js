import React from 'react'
import roadmapImg from '../images/roadmap.svg'
import { CallToAction } from '../../CallToAction'

export const Roadmap = () => (
    <div className="w-screen mt-24 relative">
        <div className="w-11/12 max-w-3xl mx-auto text-center text-white">
            <h2>Getting better every day</h2>
            <p className="mt-1 text-opacity-80">
                We built a ton in 2020. We’re going to build even more in 2021. Everything we build is based off your
                feedback.
            </p>

            <CallToAction
                icon="roadmap"
                to="/handbook/strategy/roadmap"
                type="custom"
                width="72"
                className="mt-8 bg-purpleish text-white hover:bg-purpleish-dark hover:text-white border-purpleish-dark mx-auto"
            >
                Explore Roadmap
            </CallToAction>
        </div>

        <div className="w-screen mt-24">
            <img src={roadmapImg} className="w-screen mx-auto" />
        </div>
    </div>
)
