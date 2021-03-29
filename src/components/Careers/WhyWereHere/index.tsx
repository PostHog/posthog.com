import React from 'react'
import { Structure } from '../../Structure'
import newWayImg from '../../LandingPage/images/platform-new-way.svg'

export const WhyWereHere = () => {
    return (
        <div className="careers-why-were-here pt-12" id="why-were-here">
            <div className="mt-12 text-left">
                <Structure.Section width="2xl" className="text-base">
                    <h2 className="text-center text-white">Why we’re here</h2>
                    <p className=" mt-1 text-left text-white text-lg">
                        We’re a small (but growing) team building an open source platform that empowers customers to
                        create successful products.
                    </p>

                    <img src={newWayImg} className="float-right ml-8 mt-8 mb-8 w-1/2" />
                    <div className="text-opacity-80 text-gray-100">
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
                        <p className="mb-0">
                            What does this mean for you? We have a lot of capital, but we're a lean, strong team - so
                            you've got the opportunity to have a huge impact.
                        </p>
                    </div>
                </Structure.Section>
            </div>
        </div>
    )
}
