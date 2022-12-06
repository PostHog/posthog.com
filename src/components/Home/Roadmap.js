import { CallToAction } from 'components/CallToAction'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import { heading, section } from './classes'
import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const RoadmapColumn = ({ children }) => {
    return <div className="md:border-r last:border-r-0 border-dashed border-gray-accent-light">{children}</div>
}

const RoadmapItem = ({ children }) => {
    return (
        <li className="list-none m-0 pt-2 px-1 pb-3 text-[15px] text-black/70 w-full font-semibold border-gray-accent-light/50 border-solid border-b last:border-b-0">
            {children}
        </li>
    )
}

const Roadmap = () => {
    return (
        <div className="px-4 mb-20 max-w-7xl mx-auto md:grid md:grid-cols-3 md:gap-12">
            <figure className="w-64 mx-auto md:w-auto">
                <StaticImage
                    width={367}
                    height={348}
                    imgClassName=""
                    placeholder="blurred"
                    alt={`Here's what's cookin', good lookin'`}
                    src="./images/experiment-hog.png"
                />
            </figure>
            <div className="col-span-2">
                <h2 className="m-0 text-5xl md:text-7xl text-primary text-center md:text-left">
                    The future of PostHog <span className="text-red">depends on you</span>
                </h2>
                <h3 className="m-0 text-lg md:text-[20px] leading-tight md:text-xl text-center md:text-left font-semibold mt-2 md:mt-3 opacity-75 text-primary">
                    Tell us what we should build next – and get early access.
                </h3>

                <div className="mt-4 mb-12 text-center md:text-left">
                    <CallToAction type="outline" to="/roadmap">
                        Explore our roadmap
                    </CallToAction>
                </div>

                <div className="grid md:grid-cols-2 relative after:bg-gradient-to-b after:from-tan/0 after:to-white/70 md:after:to-white/90  after:bottom-0 after:left-0 after:w-full after:h-36 after:absolute">
                    <RoadmapColumn>
                        <div className="text-base py-1 font-bold text-center bg-gray-accent-light">
                            Under consideration
                        </div>
                        <ul className="m-0 px-4 pt-1 bg-white">
                            <RoadmapItem>Feature flags for iOS, Android, Flutter</RoadmapItem>
                            <RoadmapItem>Interlinking session recording & analytics</RoadmapItem>
                            <RoadmapItem>Session recording playlists</RoadmapItem>
                            <RoadmapItem>Mobile session recordings</RoadmapItem>
                            <RoadmapItem>Nail tutorials</RoadmapItem>
                        </ul>
                    </RoadmapColumn>
                    <RoadmapColumn>
                        <div className="text-base py-1 font-bold text-center bg-gray-accent-light">In progress</div>
                        <ul className="m-0 px-4 pt-1 bg-white">
                            <RoadmapItem>SQL insights</RoadmapItem>
                            <RoadmapItem>Users &amp; recordings linked to feature flags</RoadmapItem>
                            <RoadmapItem>SOC 2 compliance</RoadmapItem>
                            <RoadmapItem>Universal search</RoadmapItem>
                            <RoadmapItem>PostHog customer data platform</RoadmapItem>
                        </ul>
                    </RoadmapColumn>
                </div>
            </div>
        </div>
    )
}

export default Roadmap
