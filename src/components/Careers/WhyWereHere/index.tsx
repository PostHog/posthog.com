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
                                    heatmaps, session recording, feature flags and A/B testing are all helpful, but no
                                    one wants to buy, send data to, and integrate multiple products.
                                </p>
                                <p>
                                    PostHog is different by offering these tools (and more) in a single platform that
                                    you can host yourself.
                                </p>
                                <p>
                                    We started PostHog during YCombinator's W20 cohort and had the most successful B2B
                                    software launch on Hacker News since 2012 - with a product that was just 4 weeks
                                    old.
                                </p>
                            </div>

                            <aside className="py-4 px-8 md:ml-8 md:-mr-16 w-full flex justify-center items-center">
                                <StaticImage
                                    src="images/this-hog-ships.png"
                                    alt="This hog ships"
                                    height={390}
                                    width={410}
                                />
                            </aside>
                        </div>

                        <div className="mb-8 flex flex-col md:flex-row-reverse">
                            <div>
                                <p>
                                    We now have over 10K customers, we're{' '}
                                    <a href="http://www.paulgraham.com/aord.html">default alive</a>, we grow 97% through
                                    word of mouth, and we've a{' '}
                                    <a href="https://github.com/posthog/posthog">very popular repo</a>.
                                </p>
                                <p>
                                    We believe in product-led growth, where we build something awesome and let our
                                    product bring the users, rather than an outbound sales team and regular cold calls.
                                </p>
                                <p>
                                    The company operates transparently - we've made our{' '}
                                    <a href="/handbook">entire handbook</a> public-facing (and{' '}
                                    <a href="https://github.com/posthog/posthog.com">world editable</a>!).
                                </p>
                                <p className="mb-0">
                                    What does this mean for you? We have a lot of capital (and from the world's best
                                    investors), but we're a lean, strong team - so you've got the opportunity to have a
                                    huge impact.
                                </p>
                            </div>

                            <aside className="py-4 px-8 md:mr-8 mt-4 md:mt-0 md:-ml-16 w-full flex justify-center items-center">
                                <StaticImage
                                    src="images/this-hog-ships-too.png"
                                    alt="This hog ships too"
                                    height={365}
                                    width={370}
                                />
                            </aside>
                        </div>
                    </div>
                </Structure.Section>
            </div>
        </div>
    )
}
