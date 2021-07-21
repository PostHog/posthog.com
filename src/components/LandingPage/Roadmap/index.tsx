import React from 'react'
import mountainsImg from '../images/mountains.png'
import sunImg from '../images/sun.png'
import cityImg from '../images/city.png'
import timelineImg from '../images/timeline.png'
import { CallToAction } from '../../CallToAction'

export const Roadmap = () => (
    <div className="w-screen mt-24 relative">
        <div className="w-screen mt-24 relative city-wrapper">
            <div className="scene-wrapper">
                <div className="text-wrapper max-w-3xl mx-auto text-center text-white relative z-50">
                    <h2>Getting better every day</h2>
                    <p className="mt-1 text-opacity-80">
                        We built a ton in 2020. We’re going to build even more in 2021. <br />
                        Everything we build is based off your feedback.
                    </p>

                    <div className="max-w-xs mx-auto">
                        <CallToAction
                            icon="roadmap"
                            to="/handbook/strategy/roadmap"
                            type="custom"
                            width="72"
                            className="bg-purpleish text-white hover:bg-purpleish-dark hover:text-white border border-white mx-auto"
                        >
                            Explore Roadmap
                        </CallToAction>
                    </div>
                </div>
                <img src={mountainsImg} className="w-screen mx-auto relative z-10 mountains" />

                <img src={sunImg} className="sun absolute" />
            </div>

            <div className="timeline-wrapper">
                <img src={timelineImg} className="timeline" />
                <img src={cityImg} className="city" />
            </div>
        </div>
    </div>
)
