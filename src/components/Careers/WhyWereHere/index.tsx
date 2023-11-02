import React from 'react'
import { Structure } from '../../Structure'
import { StaticImage } from 'gatsby-plugin-image'
import { AnchorScrollNavbarTop } from './AnchorScrollNavbarTop'
import { James, Plus, Tim } from 'components/Signatures'

const P = ({ children }) => {
    return <p className="text-justify text-[15px] md:text-[17px] leading-relaxed">{children}</p>
}

export const WhyWereHere = () => {
    return (
        <div id="introduction" className="mb-16">
            <div className="text-left">
                <Structure.Section width="5xl" className="text-lg">
                    <div className="lg:grid grid-cols-4 gap-8">
                        <div className="relative text-opacity-80 text-gray-100 bg-accent dark:bg-accent-dark border border-light dark:border-dark backdrop-blur pt-6 pb-12 px-6 sm:px-12 md:px-20 rounded col-span-3">
                            <div className="before:bg-accent dark:before:bg-accent-dark before:left-0 before:w-[6px] before:top-0 before:h-full before:absolute">
                                <div className="flex items-center space-between w-full pb-4 mb-8 border-b border-light dark:border-dark">
                                    <div className="flex-1">
                                        <p className="opacity-50 text-[17px] font-semibold mb-0 leading-tight">
                                            A note from our co-founders...
                                        </p>
                                    </div>
                                    <figure className="mb-0">
                                        <StaticImage
                                            src="../../../../contents/images/team/james.png"
                                            alt="James Hawkins"
                                            className="w-14 h-14 rounded-full bg-yellow border-2 border-solid border-white"
                                            placeholder="blurred"
                                        />
                                        <StaticImage
                                            src="../../../../contents/images/team/tim.png"
                                            alt="Tim Glaser"
                                            className="w-14 h-14 rounded-full bg-red border-2 border-solid border-white -ml-4"
                                            placeholder="blurred"
                                        />
                                    </figure>
                                </div>
                                <div>
                                    <h3>An introduction</h3>
                                    <P>
                                        Until now, tools for building products have been fragmented. Product analytics,
                                        heatmaps, session recording, feature flags and A/B testing are all helpful, but
                                        no one wants to buy, send data to, and integrate multiple products.
                                    </P>
                                    <P>
                                        PostHog is different by offering these tools (and more) in a single platform
                                        that you can host yourself.
                                    </P>

                                    <P>
                                        We started PostHog during Y Combinator's W20 cohort and had the most successful
                                        <aside className="float-right w-36 md:w-64 mt-2 -mr-6 md:-mr-10 pl-4 md:pl-12">
                                            <StaticImage
                                                src="images/this-hog-ships.png"
                                                alt="This hog ships"
                                                height={390}
                                                width={410}
                                            />
                                        </aside>{' '}
                                        B2B software launch on Hacker News since 2012 - with a product that was just 4
                                        weeks old.
                                    </P>
                                    <P>
                                        We now have over 10,000 customers, we're{' '}
                                        <a href="http://www.paulgraham.com/aord.html">default alive</a>, we grow 97%
                                        through word of mouth, and we have a{' '}
                                        <a href="https://github.com/posthog/posthog">very popular repo</a>.
                                    </P>
                                    <P>
                                        We believe in product-led growth, where we build something awesome and let our
                                        product bring the users, rather than an outbound sales team and regular cold
                                        calls.
                                    </P>
                                    <P>
                                        The company operates transparently - we've made our{' '}
                                        <a href="/handbook">entire handbook</a> public-facing (and{' '}
                                        <a href="https://github.com/posthog/posthog.com">world editable</a>!).
                                    </P>
                                    <P>
                                        What does this mean for you? We have a lot of capital (and from the world's best
                                        investors), but we're a lean, strong team - so you've got the opportunity to
                                        have a huge impact.
                                    </P>

                                    <div className="flex items-center space-x-3">
                                        <James />
                                        <Plus />
                                        <Tim />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-5 mt-48 lg:px-8 lg:pb-4 lg:block hidden">
                            <h4 className="text-black dark:text-white font-semibold opacity-25 m-0 mb-1 text-sm">
                                Jump to:
                            </h4>
                            <ul className="list-none m-0 p-0 flex flex-col">
                                <li className="relative leading-none m-0 active-product">
                                    <span className="block">
                                        <a className="text-primary dark:text-primary-dark leading-tight font-medium hover:text-red dark:hover:text-red cursor-pointer hover:opacity-100 opacity-60 text-[14px] py-1 block relative active:top-[0.5px] active:scale-[.99]">
                                            Introduction
                                        </a>
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
