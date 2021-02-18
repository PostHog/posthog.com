import React from 'react'

import TestLayout from '../../TestLayout'
import Header from '../../Header'
import Hero from './Hero'

import ProductFeatureIcons from './ProductFeatureIcons'
import PrimaryCta from './Shared/Buttons/PrimaryCta'
import SecondaryCta from './Shared/Buttons/SecondaryCta'
import Footer from '../../Footer/Footer'

import SEO from '../../seo'

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
            </Hero>

            <div className="spotlight py-24 font-lg text-center text-white">Future content here</div>

            <Footer />
        </TestLayout>
    )
}

export default TestLandingPage
