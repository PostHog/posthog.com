import { Check2 } from 'components/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import SEO from 'components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import airbus from '../Home/images/airbus.svg'
import airbusDark from '../Home/images/airbus_dark.svg'
import phantom from '../Home/images/phantom.svg'
import phantomDark from '../Home/images/phantom_dark.svg'
import landmark from '../Home/images/landmark.svg'
import landmarkDark from '../Home/images/landmark_dark.svg'
import Contact from './Contact'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'

const features = [
    'SSO SAML',
    'Advanced permissions',
    'B2C discounts',
    'Team training',
    'Dedicated support',
    'Custom data retention',
]

export default function ContactSales({ location }) {
    const search = location?.search
    const params = new URLSearchParams(search)
    const { websiteTheme } = useValues(layoutLogic)
    const darkMode = websiteTheme === 'dark'
    return (
        <Layout>
            <SEO title="Contact Sales - PostHog" />
            <div className="lg:py-12 py-4 px-5">
                <section className="mb-12">
                    <div className="text-center">
                        <StaticImage
                            loading="eager"
                            placeholder="none"
                            width={750}
                            alt="Sales hedgehogs"
                            src="./images/sales-hogs.png"
                        />
                        <h1 className="text-3xl md:text-5xl mt-4 mb-2">Let's chat</h1>
                        <p className="m-0">
                            PostHog Cloud is self-serve (
                            <Link to="https://app.posthog.com/signup">get started here</Link>), but we’re here to chat
                            if you have bespoke needs.
                        </p>
                    </div>
                </section>
                <section className="grid md:grid-cols-2 max-w-5xl mx-auto md:gap-x-16 gap-y-12">
                    <div className="order-2 md:order-1">
                        <h3 className="text-lg mt-1 mb-4">Benefits of a PostHog Enterprise plan:</h3>
                        <ul className="list-none m-0 p-0 mt-2 grid sm:grid-flow-col sm:grid-rows-3 space-y-1">
                            {features.map((feature) => {
                                return (
                                    <li key={feature} className="flex space-x-2">
                                        <Check2 className="w-4 opacity-60" />
                                        <span>{feature}</span>
                                    </li>
                                )
                            })}
                        </ul>
                        <h3 className="text-lg mt-14 mb-12">Who's using PostHog Cloud?</h3>

                        <div className="grid sm:grid-cols-2 sm:gap-x-12 gap-y-12">
                            <div>
                                <div className="text-center bg-[#2D2D2D] p-2 sm:p-3 rounded-md relative sm:rotate-6 sm:-mr-8 flex-shrink-0 sm:max-w-full max-w-[200px]">
                                    <p className="text-white leading-tight m-0 text-xs sm:text-base font-bold font-comic">
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
                            <div className="flex flex-wrap md:flex-col gap-4 md:gap-0  md:space-y-12 justify-center md:justify-start sm:order-last order-first">
                                <img src={darkMode ? airbusDark : airbus} className="max-w-[150px] md:max-w-auto" />
                                <img src={darkMode ? phantomDark : phantom} className="max-w-[150px] md:max-w-auto" />
                                <img src={darkMode ? landmarkDark : landmark} className="max-w-[150px] md:max-w-auto" />
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <h3 className="mb-1">Contact us</h3>
                        <Contact
                            initialValues={{
                                product: params.has('edition')
                                    ? params.get('edition') === 'enterprise' && 'PostHog Cloud Enterprise'
                                    : undefined,
                            }}
                        />
                    </div>
                </section>
            </div>
        </Layout>
    )
}
