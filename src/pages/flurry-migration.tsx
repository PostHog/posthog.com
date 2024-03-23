import React, { useState } from 'react'
import Layout from '../components/Layout'
import Link from 'components/Link'
import SalesHogs from '../images/sales-hogs.png'
import { StaticImage } from 'gatsby-plugin-image'
import { Check2 } from 'components/Icons'
import { useValues } from 'kea'
import Contact from 'components/ContactSales/Contact'
import { layoutLogic } from 'logic/layoutLogic'

const features = [
    'Extended 2-month trial of premium features',
    'No data limits during 2-month trial period',
    'Premium support for a smooth transition',
    '20% discount on all monthly plans',
    '40% discount on all annual plans',
]

export const FlurryMigration = () => {
    const { websiteTheme } = useValues(layoutLogic)
    const darkMode = websiteTheme === 'dark'
    return (
        <Layout>
            <div className="lg:py-12 py-4 px-5">
                <section className="mb-12">
                    <div className="text-center">
                        <img src={SalesHogs} alt="A migrating hedgehog" className="max-w-full max-h-72 mx-auto mb-8" />

                        <h1 className="text-3xl md:text-5xl mt-4 mb-2">Move seamlessly from Flurry to PostHog</h1>
                        <p className="m-0 text-lg">
                            As a recommended successor to Flurry, we've got an exclusive offer for you!
                        </p>
                    </div>
                </section>
                <section className="grid md:grid-cols-2 max-w-5xl mx-auto md:gap-x-16 gap-y-12">
                    <div className="order-1 md:order-2">
                        <h3 className="mt-1 mb-4">Exclusive benefits for Flurry users</h3>
                        <ul className="list-none m-0 mb-8 p-0 mt-2 flex flex-col space-y-1">
                            {features.map((feature) => {
                                return (
                                    <li key={feature} className="flex space-x-2">
                                        <Check2 className="w-5 text-seagreen dark:text-white/40" />
                                        <span dangerouslySetInnerHTML={{ __html: feature }} />
                                    </li>
                                )
                            })}
                        </ul>
                        <div>
                            <h3>Want to see if PostHog is right for you?</h3>
                            <div className="video-container">
                                <iframe
                                    width="560"
                                    height="315"
                                    src="https://www.youtube-nocookie.com/embed/2jQco8hEvTI"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="order-2 md:order-2 mb-12">
                        <h3 className="mb-1">How to claim this offer</h3>
                        <ol className="mb-4">
                            <li>Complete the form below</li>
                            <li>
                                <Link to="https://app.posthog.com/signup" external>
                                    Sign up for PostHog Cloud
                                </Link>
                            </li>
                            <li>
                                <Link to="/docs/getting-started/install" external>
                                    Install the snippet
                                </Link>{' '}
                                in your product
                            </li>
                        </ol>
                        <Contact />
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default FlurryMigration
