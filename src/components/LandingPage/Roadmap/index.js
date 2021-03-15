import React from 'react'
import roadmapImg from '../images/mountains.svg'
import sunImg from '../images/sun.svg'
import timelineImg from '../images/timeline.svg'
import subwayImg from '../images/subway.svg'
import { CallToAction } from '../../CallToAction'

export const Roadmap = () => (
    <div className="w-screen mt-24 relative">
        <div className="w-screen mt-24 relative city-wrapper">
            <div className="max-w-3xl mx-auto text-center text-white relative z-50">
                <h2>Getting better every day</h2>
                <p className="mt-1 text-opacity-80">
                    We built a ton in 2020. We’re going to build even more in 2021. <br />
                    Everything we build is based off your feedback.
                </p>

                <CallToAction
                    icon="roadmap"
                    to="/handbook/strategy/roadmap"
                    type="custom"
                    width="72"
                    className="bg-purpleish text-white hover:bg-purpleish-dark hover:text-white border-purpleish-dark mx-auto"
                >
                    Explore Roadmap
                </CallToAction>
            </div>

            <object
                data={roadmapImg}
                type="image/svg+xml"
                className="w-screen mx-auto relative z-10 mountains"
            ></object>

            <object data={sunImg} type="image/svg+xml" className="sun absolute"></object>

            <div className="timeline-wrapper overflow-x-scroll w-full relative lg:absolute z-40 lg:max-w-full lg:w-full lg:overflow-x-hidden lg:bottom-0">
                <object data={timelineImg} type="image/svg+xml" className="timeline lg:w-full lg:max-w-full"></object>
            </div>

            <div className="subway-wrapper w-full relative z-40 lg:max-w-full lg:w-full">
                <object data={subwayImg} type="image/svg+xml" className="subway "></object>
            </div>
        </div>
    </div>
)
