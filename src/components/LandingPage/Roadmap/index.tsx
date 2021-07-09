import React from 'react'
import { CallToAction } from '../../CallToAction'
import { StaticImage } from 'gatsby-plugin-image'

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
                <StaticImage
                    alt="mountains"
                    src={'../images/mountains.png'}
                    quality={100}
                    className="w-screen mx-auto relative z-10 mountains"
                />

                <StaticImage alt="sun" src={'../images/sun.png'} quality={100} className="sun absolute" />
            </div>

            <div className="timeline-wrapper">
                <StaticImage src={'../images/timeline.png'} alt="timeline" className="timeline" quality={100} />
                <StaticImage src={'../images/city.png'} alt="city" className="city" quality={100} />
            </div>
        </div>
    </div>
)
