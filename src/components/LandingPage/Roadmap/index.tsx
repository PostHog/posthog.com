import React from 'react'
import mountainsImg from '../images/mountains.svg'
import sunImg from '../images/sun-min.png'
import cityImg from '../images/city-min.png'
import timelineImg from '../images/timeline.svg'
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
                <img
                    src={mountainsImg}
                    className="w-screen mx-auto relative z-10 mountains"
                    alt="Mountains"
                    loading="lazy"
                    width="1440"
                    height="838"
                />

                <img src={sunImg} className="sun absolute" alt="Sun" loading="lazy" width="2518" height="2517" />
            </div>

            <div className="timeline-wrapper">
                <img src={timelineImg} className="timeline" alt="Timeline" loading="lazy" width="1440" height="499" />
                <img src={cityImg} className="city" alt="City" loading="lazy" width="2881" height="1160" />
            </div>
        </div>
    </div>
)
