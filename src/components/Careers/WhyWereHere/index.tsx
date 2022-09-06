import React from 'react'
import { Structure } from '../../Structure'
import { StaticImage } from 'gatsby-plugin-image'
import { AnchorScrollNavbarTop } from './AnchorScrollNavbarTop'

const P = ({ children }) => {
    return (
        <p className="text-justify text-[17px] leading-relaxed">
            {children}
        </p>
    )
}

export const WhyWereHere = () => {
    return (
        <div id="introduction" className="mb-16">
            <div className="text-left">
                <Structure.Section width="5xl" className="text-lg">

                    <div className="lg:grid grid-cols-4 gap-8">
                        <div className="text-opacity-80 text-gray-100 bg-white/90 backdrop-blur shadow-xl py-12 px-12 md:px-20 rounded col-span-3">
                            <div className="before:bg-[url('/images/letterhead.svg')] before:left-0 before:w-[6px] before:top-0 before:h-full before:absolute">

                                <div className="flex space-between w-full pb-2 mb-8 border-b border-dashed border-gray-accent-light">
                                    <div className="flex-1">
                                        <em className="text-sm opacity-60">From the desk of</em>
                                        <h4 className="mb-0">James Hawkins</h4>
                                        <p className="text-gray-100 opacity-75 text-[15px]">CEO &amp; Co-Founder</p>
                                    </div>
                                    <figure>
                                        <StaticImage src="../../../../contents/images/team/james.png" alt="James Hawkins" className="w-20 h-20 rounded-full bg-yellow" placeholder="blurred" />
                                    </figure>
                                </div>
                                <div>
                                    <h3>An introduction</h3>
                                    <P>
                                    Until now, tools for building products have been fragmented. Product analytics,
                                        heatmaps, session recording, feature flags and A/B testing are all helpful, but no
                                        one wants to buy, send data to, and integrate multiple products.
                                    </P>
                                    <P>
                                        PostHog is different by offering these tools (and more) in a single platform that
                                        you can host yourself.
                                    </P>

                                    <P>
                                        We started PostHog during Y Combinator's W20 cohort  and had the most successful 

                                        <aside className="float-right w-36 md:w-64 mt-2 -mr-6 md:-mr-10 pl-4 md:pl-12">
                                            <StaticImage
                                                src="images/this-hog-ships.png"
                                                alt="This hog ships"
                                                height={390}
                                                width={410}
                                            />
                                        </aside> B2B software launch on Hacker News since 2012 - with a product that was just 4 weeks
                                        old.
                                    </P>
                                    <P>
                                        We now have over 10,000 customers, we're{' '}
                                        <a href="http://www.paulgraham.com/aord.html">default alive</a>, we grow 97% through
                                        word of mouth, and we have a{' '}
                                        <a href="https://github.com/posthog/posthog">very popular repo</a>.
                                    </P>
                                    <P>
                                        We believe in product-led growth, where we build something awesome and let our
                                        product bring the users, rather than an outbound sales team and regular cold calls.
                                    </P>
                                    <P>
                                        The company operates transparently - we've made our{' '}
                                        <a href="/handbook">entire handbook</a> public-facing (and{' '}
                                        <a href="https://github.com/posthog/posthog.com">world editable</a>!).
                                    </P>
                                    <P>
                                        What does this mean for you? We have a lot of capital (and from the world's best
                                        investors), but we're a lean, strong team - so you've got the opportunity to have a
                                        huge impact.
                                    </P>
                                    <StaticImage src="../../../images/initials-james.png" alt="by James Hawkins" width={60.5} height={57} quality={100} placeholder="none" />
                                </div>
                            </div>

                        </div>


                        <div className="px-5 mt-48 lg:px-8 lg:pb-4 lg:block hidden">
                            <h4 className="text-black dark:text-white font-semibold opacity-25 m-0 mb-1 text-sm">Jump to:</h4>
                            <ul className="list-none m-0 p-0 flex flex-col">
                                <li className="relative leading-none m-0 active-product">
                                    <span className="block">
                                        <a className="text-almost-black leading-tight font-medium hover:text-red dark:text-white dark:hover:text-red cursor-pointer hover:opacity-100 opacity-60 text-[14px] py-1 block relative active:top-[0.5px] active:scale-[.99]">Introduction</a>
                                    </span>
                                </li>
                                <AnchorScrollNavbarTop />
                            </ul>
                        </div>

                    </div>
                </Structure.Section>
            </div>
        </div>
    )
}
