import React from 'react'

import TestLayout from '../../TestLayout'
import { Header } from '../../Header'
import Hero from './Hero'
import SocialProof from './SocialProof'
import Features from './Features'
import PrivateCloud from './PrivateCloud'

import Roadmap from './Roadmap'
import ProductFeatureIcons from './ProductFeatureIcons'
import PrimaryCta from './Shared/Buttons/PrimaryCta'
import SecondaryCta from './Shared/Buttons/SecondaryCta'
import RecentBlogPosts from './RecentBlogPosts'
import { Footer } from '../../Footer/Footer'

import featuresImg from './images/safe-features.png'
import userBehaviorImg from './images/user-behavior.png'
import funnelsImg from './images/funnels.png'

import { SEO } from '../../seo'

import './styles/index.scss'

const TestLandingPage = () => {
    return (
        <TestLayout>
            <SEO
                title="PostHog - Open-Source Product Analytics"
                description="Self-hosted product analytics stack, to deploy on your infrastructure."
            />
            <Header onPostPage={false} isBlogArticlePage={false} isHomePage={true} menuActiveKey="active" />
            <Hero>
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-white mb-0 pb-0">More than product analytics</h1>
                    <p className="text-white opacity-70 mt-4 max-w-xl mx-auto">
                        PostHog is an <span className="text-yellow-300 opacity-90">open source platform</span> designed
                        to help you understand customers, quantify value, and ship new features faster.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <ProductFeatureIcons />
                </div>

                <PrimaryCta>Get Started</PrimaryCta>
                <SecondaryCta>Book a demo</SecondaryCta>

                <SocialProof />
            </Hero>

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

                        <div className="w-full lg:w-1/3 lg:mx-2 bg-purple-400 bg-opacity-30 rounded p-3">
                            <img src={userBehaviorImg} className="w-full" alt="How to safely rollout new features" />

                            <strong className="block text-center text-white">
                                Visualizing User Behavior - Toolbar
                            </strong>
                            <span className="text-center text-white opacity-60 mt-2 block text-xs">6 min read</span>
                        </div>

                        <div className="w-full lg:w-1/3 lg:ml-2 bg-purple-400 bg-opacity-30 rounded p-3">
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
        </TestLayout>
    )
}

export default TestLandingPage
