import React from 'react'
import { Link } from 'gatsby'
import { CallToAction } from '../../CallToAction'
import featuresImg from '../images/safe-features.png'
import userBehaviorImg from '../images/user-behavior.png'
import funnelsImg from '../images/funnels.png'

export const Tutorials = () => {
    return (
        <div className="bg-pipes py-24 -my-1">
            <div className="w-11/12 max-w-3xl mx-auto">
                <h3 className="text-white text-center">Hop aboard</h3>
                <p className="text-white opacity-80 mt-1 text-center">
                    Don’t get left behind. Join 2,700 companies using PostHog.
                </p>

                <CallToAction icon="rocket" href="https://app.posthog.com/signup">
                    Get Started
                </CallToAction>
                <CallToAction icon="calendar" type="secondary" className="mt-3" to="/schedule-demo">
                    Book a demo
                </CallToAction>
            </div>

            <div className="mt-24 text-center text-white w-11/12 max-w-4xl mx-auto">
                <h3>Tutorials</h3>
                <p className="opacity-80 mt-1">Our developers highlight some of the functionality inside PostHog.</p>

                <p className="text-sm opacity-60 mt-8">Popular tutorials</p>

                <div className="flex flex-col lg:flex-row justify-between items-stretch">
                    <Link
                        to="/docs/tutorials/feature-flags"
                        className="w-full lg:w-1/3 lg:mr-2 bg-purple-400 bg-opacity-30 hover:bg-opacity-40 rounded p-3"
                    >
                        <img src={featuresImg} className="w-full" alt="How to safely rollout new features" />

                        <strong className="block text-center text-white">How to Safely Rollout New Features</strong>
                        <span className="text-center text-white opacity-60 mt-2 block text-xs">7 min read</span>
                    </Link>

                    <Link
                        to="/docs/tutorials/toolbar"
                        className="w-full mt-8 lg:mt-0 lg:w-1/3 lg:mx-2 bg-purple-400 bg-opacity-30 hover:bg-opacity-40 rounded p-3"
                    >
                        <img src={userBehaviorImg} className="w-full" alt="Visualizing User Behavior - Toolbar" />

                        <strong className="block text-center text-white">Visualizing User Behavior - Toolbar</strong>
                        <span className="text-center text-white opacity-60 mt-2 block text-xs">6 min read</span>
                    </Link>

                    <Link
                        to="/docs/tutorials/funnels"
                        className="w-full mt-8 lg:mt-0 lg:w-1/3 lg:ml-2 bg-purple-400 bg-opacity-30 hover:bg-opacity-40 rounded p-3"
                    >
                        <img src={funnelsImg} className="w-full" alt="Analyzing Your Conversion with Funnels" />

                        <strong className="block text-center text-white">Analyzing Your Conversion with Funnels</strong>
                        <span className="text-center text-white opacity-60 mt-2 block text-xs">8 min read</span>
                    </Link>
                </div>

                <CallToAction type="secondary" className="mt-8" to="/docs/tutorials" icon="book" width="72">
                    See all tutorials
                    <span className="text-xs text-white text-opacity-50 ml-1">13</span>
                </CallToAction>
            </div>
        </div>
    )
}
