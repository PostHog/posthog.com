import React from 'react'

import { Header } from '../components/Header'
import { CallToAction } from '../components/CallToAction'
import { AnchorScrollNavbar } from '../components/AnchorScrollNavbar'
import { Culture } from '../components/Careers/Culture'
import { InterviewProcess } from '../components/Careers/InterviewProcess'
import { Benefits } from '../components/Careers/Benefits'

import { Footer } from '../components/Footer/Footer'
import { GetStartedModal } from 'components/GetStartedModal'

import { SEO } from '../components/seo'

import newWayImg from '../components/LandingPage/images/platform-new-way.svg'
import '../components/LandingPage/styles/index.scss'

const IndexPage = () => {
    return (
        <div>
            {/* @todo update SEO */}
            <SEO
                title="PostHog - Open-Source Product Analytics"
                description="Self-hosted product analytics stack, to deploy on your infrastructure."
            />
            <Header onPostPage={false} isBlogArticlePage={false} isHomePage={true} menuActiveKey="active" />

            <div className="hero py-12 sm:py-24">
                <div className="w-11/12 mx-auto text-center relative z-10 rounded">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-white mb-0 pb-0 text-3xl">
                            We’re working to increase the number of successful products in the world
                        </h1>

                        <CallToAction icon="down-arrow" to="#positions" type="primary" width="72" className="mt-12">
                            View open roles
                        </CallToAction>
                    </div>
                </div>

                <AnchorScrollNavbar className="mt-12" />

                <div className="mt-12 text-white text-left">
                    <div className="w-11/12 max-w-xl mx-auto">
                        <h2 className="text-center">Why we’re here</h2>
                        <p className="opacity-80 mt-1 text-left">
                            We’re a small (but growing) team building an open source platform that empowers customers to
                            create successful products.
                        </p>

                        <img src={newWayImg} className="float-right ml-8 mt-8 mb-8 w-1/2" />
                        <p>
                            Until now, tools for building products have been fragmented. Product analytics, heatmaps,
                            session recording and A/B testing all provide immense value, but existing tools weren’t
                            natively built to work together.
                        </p>
                        <p>
                            PostHog is different by offering these tools (and more) in a single platform that you can
                            host yourself.
                        </p>
                        <p>
                            We started PostHog as part of Y Combinator's W20 cohort and had the most successful B2B
                            software launch on HackerNews since 2012 - with a product that was just 4 weeks old.
                        </p>
                        <p>
                            We're proudly backed by some of the world's top investors and believe in product-led growth,
                            where we build something awesome and let our product bring the users, rather than an
                            outbound sales team and regular cold calls.
                        </p>
                        <p>
                            What does this mean for you? We have a lot of capital, but we're a lean, strong team - so
                            you've got the opportunity to have a huge impact.
                        </p>
                    </div>
                </div>

                <Culture />
                <InterviewProcess />
                <Benefits />
            </div>

            <Footer showNewsletter={true} />
            <GetStartedModal />
        </div>
    )
}

export default IndexPage
