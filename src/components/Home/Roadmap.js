import { CallToAction } from 'components/CallToAction'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import { heading, section } from './classes'
import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const RoadmapColumn = ({ children }) => {
    return <div className="md:border-r last:border-r-0 border-light dark:border-dark">{children}</div>
}

const RoadmapItem = ({ children }) => {
    return (
        <li className="list-none m-0 pt-2 px-1 pb-3 text-[15px] text-primary/75 dark:text-primary-dark/75 w-full font-semibold border-light dark:border-dark border-b last:border-b-0">
            {children}
        </li>
    )
}

const Roadmap = () => {
    return (
        <div className="px-4 mb-12 max-w-7xl mx-auto md:grid md:grid-cols-3 md:gap-12">
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
                <h2 className="m-0 text-5xl md:text-6xl text-primary dark:text-primary-dark text-center md:text-left">
                    The future of PostHog <span className="text-red inline-block">depends on you</span>
                </h2>
                <h3 className="m-0 text-lg leading-tight md:text-xl text-center md:text-left font-semibold mt-2 md:mt-3 opacity-75 text-primary dark:text-primary-dark">
                    We publish our product roadmap. Tell us what we should build next – and get early access.
                </h3>

                <div className="mt-4 mb-12 text-center md:text-left">
                    <CallToAction type="outline" to="/roadmap">
                        Explore our roadmap
                    </CallToAction>
                </div>

                <div className="grid border border-light dark:border-dark text-primary dark:text-primary-dark md:grid-cols-2 relative after:bg-gradient-to-b after:from-light/0 after:to-light/70 md:after:to-light/90 dark:after:from-dark/0 dark:after:to-dark/70 dark:md:after:to-dark/90 after:bottom-0 after:left-0 after:w-full after:h-36 after:absolute">
                    <RoadmapColumn>
                        <div className="text-base py-1 font-bold text-center bg-accent dark:bg-accent-dark border-b border-light dark:border-dark">
                            Under consideration
                        </div>
                        <ul className="m-0 px-4 pt-1 bg-accent dark:bg-accent-dark">
                            <RoadmapItem>No-code A/B test visual editor</RoadmapItem>
                            <RoadmapItem>Feature flags for Java</RoadmapItem>
                            <RoadmapItem>Threshold-based alerting</RoadmapItem>
                            <RoadmapItem>PostHog Cloud SQL access</RoadmapItem>
                        </ul>
                    </RoadmapColumn>
                    <RoadmapColumn>
                        <div className="text-base py-1 font-bold text-center bg-accent dark:bg-accent-dark border-b border-light dark:border-dark">
                            In progress
                        </div>
                        <ul className="m-0 px-4 pt-1 bg-accent dark:bg-accent-dark">
                            <RoadmapItem>Session replay for Android</RoadmapItem>
                            <RoadmapItem>PostHog CDP</RoadmapItem>
                            <RoadmapItem>Data warehouse</RoadmapItem>
                            <RoadmapItem>Replays linked to feature flags</RoadmapItem>
                        </ul>
                    </RoadmapColumn>
                </div>
            </div>
        </div>
    )
}

export default Roadmap
