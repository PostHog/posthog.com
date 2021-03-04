import React from 'react'

import { Header } from '../components/Header'
import { Hero } from '../components/LandingPage/Hero'
import { Features } from '../components/LandingPage/Features'
import { PrivateCloud } from '../components/LandingPage/PrivateCloud'
import { Roadmap } from '../components/LandingPage/Roadmap'
import { PrimaryCta } from '../components/LandingPage/Buttons/PrimaryCta'
import { SecondaryCta } from '../components/LandingPage/Buttons/SecondaryCta'
import { RecentBlogPosts } from '../components/LandingPage/RecentBlogPosts'
import { Footer } from '../components/Footer/Footer'
import featuresImg from '../components/LandingPage/images/safe-features.png'
import userBehaviorImg from '../components/LandingPage/images/user-behavior.png'
import funnelsImg from '../components/LandingPage/images/funnels.png'

import { SEO } from '../components/seo'

import '../components/LandingPage/styles/index.scss'

const IndexPage = () => {
    return (
        <div>
            <SEO
                title="PostHog - Open-Source Product Analytics"
                description="Self-hosted product analytics stack, to deploy on your infrastructure."
            />
            <Header onPostPage={false} isBlogArticlePage={false} isHomePage={true} menuActiveKey="active" />
            <Hero />
            <Features />
            <PrivateCloud />

            <Roadmap />

            <div className="bg-pipes py-24">
                <div className="w-11/12 max-w-3xl mx-auto">
                    <h3 className="text-white text-center">Hop aboard</h3>
                    <p className="text-white opacity-80 mt-1 text-center">
                        Don’t get left behind. Join 2,700 companies using PostHog.
                    </p>

                    <PrimaryCta>Get Started</PrimaryCta>
                    <SecondaryCta>Book a demo</SecondaryCta>
                </div>

                <div className="mt-24 text-center text-white w-11/12 max-w-4xl mx-auto">
                    <h3>Tutorials</h3>
                    <p className="opacity-80 mt-1">
                        Our developers highlight some of the functionality inside PostHog.
                    </p>

                    <p className="text-sm opacity-60 mt-8">Popular tutorials</p>

                    <div className="flex flex-col lg:flex-row justify-between items-stretch">
                        <div className="w-full lg:w-1/3 lg:mr-2 bg-purple-400 bg-opacity-30 rounded p-3">
                            <img src={featuresImg} className="w-full" alt="How to safely rollout new features" />

                            <strong className="block text-center text-white">How to Safely Rollout New Features</strong>
                            <span className="text-center text-white opacity-60 mt-2 block text-xs">8 min read</span>
                        </div>

                        <div className="w-full mt-8 lg:mt-0 lg:w-1/3 lg:mx-2 bg-purple-400 bg-opacity-30 rounded p-3">
                            <img src={userBehaviorImg} className="w-full" alt="How to safely rollout new features" />

                            <strong className="block text-center text-white">
                                Visualizing User Behavior - Toolbar
                            </strong>
                            <span className="text-center text-white opacity-60 mt-2 block text-xs">6 min read</span>
                        </div>

                        <div className="w-full mt-8 lg:mt-0 lg:w-1/3 lg:ml-2 bg-purple-400 bg-opacity-30 rounded p-3">
                            <img src={funnelsImg} className="w-full" alt="How to safely rollout new features" />

                            <strong className="block text-center text-white">
                                Analyzing Your Conversion with Funnels
                            </strong>
                            <span className="text-center text-white opacity-60 mt-2 block text-xs">8 min read</span>
                        </div>
                    </div>
                </div>
            </div>

            <RecentBlogPosts />
            <Footer showNewsletter={true} />
        </div>
    )
}

export default IndexPage
