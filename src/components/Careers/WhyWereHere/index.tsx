import React from 'react'
import { Structure } from '../../Structure'
import { StaticImage } from 'gatsby-plugin-image'

export const WhyWereHere = () => {
    return (
        <div className="careers-why-were-here" id="why-were-here">
            <div className="text-left">
                <Structure.Section width="2xl" className="text-base">
                    <div className="text-opacity-80 text-gray-100">
                        <div className="mb-8 flex flex-col md:flex-row">
                            <div>
                                <p>
                                    Until now, tools for building products have been fragmented. Product analytics,
                                    heatmaps, session recording and A/B testing all provide immense value, but existing
                                    tools weren’t natively built to work together.
                                </p>
                                <p>
                                    PostHog is different by offering these tools (and more) in a single platform that
                                    you can host yourself.
                                </p>
                                <p>
                                    We started PostHog as part of Y Combinator's W20 cohort and had the most successful
                                    B2B software launch on HackerNews since 2012 - with a product that was just 4 weeks
                                    old.
                                </p>
                            </div>

                            <aside className="py-4 px-8 md:ml-8 md:-mr-16 w-full flex justify-center items-center">
                                <StaticImage
                                    src="images/office-hogs-1.png"
                                    alt="Just some office hogs"
                                    height={264}
                                    width={390}
                                />
                            </aside>
                        </div>

                        <div className="mb-8 flex flex-col md:flex-row-reverse">
                            <div>
                                <p>
                                    We're proudly backed by some of the world's top investors and believe in product-led
                                    growth, where we build something awesome and let our product bring the users, rather
                                    than an outbound sales team and regular cold calls.
                                </p>
                                <p className="mb-0">
                                    What does this mean for you? We have a lot of capital, but we're a lean, strong team
                                    - so you've got the opportunity to have a huge impact.
                                </p>
                            </div>

                            <aside className="py-4 px-8 md:mr-8 mt-4 md:mt-0 md:-ml-16 w-full flex justify-center items-center">
                                <StaticImage
                                    src="images/office-hogs-2.png"
                                    alt="Just some office hogs"
                                    height={353}
                                    width={349}
                                />
                            </aside>
                        </div>
                    </div>
                </Structure.Section>
            </div>
        </div>
    )
}
