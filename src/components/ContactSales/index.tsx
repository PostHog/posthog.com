import { Check2 } from 'components/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import SEO from 'components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import ing from '../Home/images/ing.svg'
import airbus from '../Home/images/airbus.svg'
import phantom from '../Home/images/phantom.svg'
import Contact from './Contact'

const features = [
    'SSO SAML',
    'Advanced permissions',
    'B2C discounts',
    'Team training',
    'Dedicated support',
    'Custom data retention',
]

export default function ContactSales() {
    return (
        <Layout>
            <SEO title="Contact Sales - PostHog" />
            <div className="lg:py-12 py-4 px-5">
                <section className="mb-12">
                    <div className="text-center">
                        <StaticImage width={750} alt="Sales hedgehogs" src="./images/sales-hogs.png" />
                        <h1 className="text-3xl md:text-5xl mt-4 mb-2">Let's chat</h1>
                        <p className="m-0">
                            PostHog Cloud is self-serve (
                            <Link to="https://app.posthog.com/signup">get started here</Link>), but we’re here to chat
                            if you have bespoke needs.
                        </p>
                    </div>
                </section>
                <section className="grid md:grid-cols-2 max-w-5xl mx-auto md:gap-x-16 gap-y-12">
                    <div>
                        <p className="m-0">
                            Here are some things we can offer that don’t come with PostHog Cloud Self-Serve.
                        </p>
                        <ul className="list-none m-0 p-0 mt-2 grid sm:grid-flow-col sm:grid-rows-3">
                            {features.map((feature) => {
                                return (
                                    <li key={feature} className="flex space-x-2">
                                        <Check2 className="w-4 opacity-60" />
                                        <span>{feature}</span>
                                    </li>
                                )
                            })}
                        </ul>
                        <h3 className="text-lg mt-14 mb-12">Who’s using PostHog’s Enterprise Cloud?</h3>

                        <div className="grid sm:grid-cols-2 sm:gap-x-12 gap-y-12">
                            <div>
                                <div className="text-center bg-[#2D2D2D] p-2 sm:p-4 rounded-md relative sm:rotate-6 sm:-mr-8 flex-shrink-0 sm:max-w-full max-w-[200px]">
                                    <p className="text-white m-0 text-xs sm:text-[18px] font-bold font-comic">
                                        Whoa, industry leaders!
                                    </p>
                                    <svg
                                        className="absolute right-6 -bottom-5 -scale-x-1"
                                        width="35"
                                        height="29"
                                        viewBox="0 0 35 29"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M34.0329 28.7305L28.9422 2.03952L0.169405 0.617765C0.169405 0.617765 12.4378 8.50347 18.738 13.9774C25.0381 19.4513 34.0329 28.7305 34.0329 28.7305Z"
                                            fill="#2D2D2D"
                                        />
                                    </svg>
                                </div>
                                <StaticImage
                                    src="../Pricing/images/vacation-hog.png"
                                    alt="Vacation Hog"
                                    width={252}
                                    placeholder="none"
                                />
                            </div>
                            <div className="flex flex-col space-y-12 sm:order-last order-first">
                                <img src={airbus} />
                                <img src={ing} />
                                <img src={phantom} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Contact sales</h3>
                        <Contact />
                    </div>
                </section>
            </div>
        </Layout>
    )
}
