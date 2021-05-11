import React from 'react'
import { CallToAction } from '../../CallToAction'
import { Roadmap } from '../Roadmap'
import { ContributorAvatars } from '../../ContributorAvatars'

import checkImg from '../images/green-check.svg'

const FeatureBenefit = ({ feature, benefit }: { feature: string; benefit: string }) => {
    return (
        <div className="w-full md:w-1/3 px-3 text-left my-5 flex items-start">
            <img src={checkImg} className="mr-2 h-4 mt-1" alt={feature} />
            <div>
                <header className="text-green-300 font-bold mt-0">{feature}</header>
                <main className="text-white opacity-80">{benefit}</main>
            </div>
        </div>
    )
}

export const PrivateCloud = () => {
    return (
        <div className="private-cloud text-white text-center">
            <div className="w-11/12 max-w-5xl mx-auto">
                <h2>Host on your own private cloud</h2>
                <p className="opacity-80 mt-1 text-center max-w-4xl mx-auto">
                    Optionally host PostHog yourself with a private cloud deployment - a great solution for
                    privacy-conscious and compliance-oriented companies.
                </p>

                <div className="flex justify-between items-stretch flex-col md:flex-row flex-wrap">
                    <FeatureBenefit
                        feature="Built to scale"
                        benefit="Private cloud deployments are capable of supporting hundreds of millions of users"
                    />
                    <FeatureBenefit
                        feature="Unlimited usage, no surprises"
                        benefit="No limits or overages with a flat fee licensing model for our largest customers"
                    />
                    <FeatureBenefit
                        feature="Managed deployments"
                        benefit="Get PostHog updates automatically, without giving us access to your data"
                    />
                    <FeatureBenefit
                        feature="Ad blocker-resistant"
                        benefit="Eliminate dependencies on 3rd party solutions that are flagged for tracking"
                    />
                    <FeatureBenefit
                        feature="Compliance comes standard"
                        benefit="Makes HIPAA and SOC2 audits a breeze when you host on your own stack"
                    />
                    <FeatureBenefit
                        feature="Dedicated support"
                        benefit="Connect with our team for getting the best value or regular touch points"
                    />
                </div>

                <div className="mt-24">
                    <div
                        style={{ background: 'rgba(255,255,255,.6)' }}
                        className="rounded-lg p-12 pb-20 flex flex-col md:flex-row justify-between items-start"
                    >
                        <div className="w-full md:w-1/2 md:mr-4 lg:w-5/12 relative z-30">
                            <h3 className="text-purpleish text-3xl font-semibold">Open-source to our core</h3>
                            <p className="text-purpleish text-center">
                                Our workflow, strategy, internal policies, handbook, and brand book are public and open
                                source.
                            </p>

                            <CallToAction
                                type="custom"
                                className="bg-purpleish border-3 text-white hover:text-white hover:bg-purpleish-dark border-purpleish-dark"
                                icon="github"
                                width="full"
                                href="https://github.com/posthog"
                            >
                                Browse GitHub
                            </CallToAction>
                            <CallToAction
                                type="custom"
                                icon="handbook"
                                width="full"
                                className="text-purpleish border-purpleish border-2 mt-2 hover:bg-white hover:bg-opacity-20 hover:text-purpleish"
                                to="/handbook"
                            >
                                Explore Handbook
                            </CallToAction>
                        </div>

                        <div className="w-full mt-12 md:mt-0 md:w-1/2 md:ml-4 lg:w-7/12 relative z-20">
                            <ContributorAvatars />

                            <div className="mt-6 text-purpleish text-center">
                                <p className="text-sm mb-1">
                                    Here’s a handful of the <strong>263 people</strong> we have to thank for our success
                                </p>
                                <p className="text-xs opacity-80">
                                    based on contributions to PostHog GitHub libraries.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Roadmap />
        </div>
    )
}
