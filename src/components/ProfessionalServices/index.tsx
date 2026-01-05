import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Link from 'components/Link'
import { IconWrench, IconCode2, IconGraph, IconPlay } from '@posthog/icons'

import { CallToAction } from 'components/CallToAction'
import { Hero } from 'components/Hero'
import { Subfeature } from 'components/Products/Subfeature'
import CTA from 'components/Home/CTA'
import { FAQ } from 'components/Products/FAQ'
import Tooltip from 'components/Tooltip'
import { TextCard } from 'components/Products/TextCard'
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import { PRODUCT_COUNT } from '../../../constants'
import { Bang } from 'components/Icons'
import { motion } from 'framer-motion'

const subfeaturesItemCount = 4
const subfeatures = [
    {
        title: 'Migration',
        description: 'Ditch the legacy tools in double quick time with our fully-managed migration services.',
        icon: <IconPlay />,
    },
    {
        title: 'Instrumentation',
        description:
            'Ensure that PostHog is instrumented correctly with your product in line with your tracking and privacy requirements, guided by our experts.',
        icon: <IconCode2 />,
    },
    {
        title: 'Onboarding',
        description:
            "We'll define and build the dashboards that you need to measure your product and then train you to use them effectively.",
        icon: <IconGraph />,
    },
    {
        title: 'Integration',
        description: 'Our team will get PostHog integrated into your existing data stack via sources and destinations.',
        icon: <IconWrench />,
    },
]

export const ProfessionalServices = () => {
    const { fullWidthContent } = useLayoutData()
    return (
        <>
            <SEO
                title="Professional Services - From SDK to Data Yay!"
                description="Forward-deployed engineers to get you up and running with PostHog in no time at all."
                image={`/images/og/deskhog.jpg`}
            />
            <div
                className={`${
                    fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'
                } px-4 sm:px-5 pt-6 sm:pt-10 pb-10`}
            >
                <Hero
                    title="Hire a PostHog human to get your team up and running."
                    subtitle="We do the heavy lifting so that you can get on with delighting your users."
                />
                <div className="flex justify-center gap-2 mb-12">
                    <CallToAction href="/talk-to-a-human" type="primary">
                        Talk to a human
                    </CallToAction>
                </div>
            </div>

            <div id="features">
                <section className="max-w-7xl mx-auto px-4 sm:px-5 pb-6">
                    <div className="mb-4">
                        <ul
                            className={`list-none p-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${subfeaturesItemCount} gap-4`}
                        >
                            {subfeatures.map((subfeature, index) => {
                                return <Subfeature {...subfeature} key={index} />
                            })}
                        </ul>
                    </div>

                    <div className="flex flex-col-reverse items-center md:flex-row gap-6 md:gap-8 pt-12 sm:pt-16 md:pt-20 mb-12 sm:mb-16 md:mb-20">
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4">
                                Onsite, fully remote, or hybrid?
                                <br />
                                <span className="text-red dark:text-yellow">You choose.</span>
                            </h2>
                            <p>
                                Whilst we are a fully remote company, we understand the value of working face-to-face
                                with our customers. A typical project with our forward-deployed engineers starts with a
                                few days of intense in-person work, and then moves to remote days of work in subsequent
                                weeks. We are flexible though and will happily work the way you do.
                            </p>
                        </div>
                        <aside className="shrink-0 w-full md:w-auto md:basis-[500px] flex justify-center">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/0d38287aac5596b1a7e59998d61f341b92893db0_3a6af62939.png"
                                alt="Hogs around the world"
                                className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[470px]"
                            />
                        </aside>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl text-center mb-2 px-2">
                        Here are the details of what we can do for you.
                    </h2>
                    <h3 className="text-lg sm:text-xl text-center font-medium mb-8 sm:mb-12 px-4">AKA Scope of Work</h3>
                    <div className="grid gap-4 sm:gap-6 md:gap-8 mb-6">
                        <h3>Migration</h3>
                        <p>
                            If you're coming to us from an existing provider, you'll want to bring along your historical
                            data, and we make that easy.
                            <ul className={`list-disc m-4`}>
                                <li>
                                    We can orchestrate the import of historic analytics data using our automated
                                    migrators from common vendors
                                </li>
                                <li>
                                    We'll implement the dashboards you have defined already in PostHog, optimising them
                                    in line with your needs where required
                                </li>
                                <li>
                                    We can also switch feature flags you have already implemented to use PostHog's
                                    library
                                </li>
                            </ul>
                        </p>
                        <p>
                            Here's a non-exhaustive list of the tools we typically migrate users from:
                            <ul className={`list-disc m-4`}>
                                <li>Amplitude</li>
                                <li>Mixpanel</li>
                                <li>Heap</li>
                                <li>Fullstory</li>
                                <li>Hotjar</li>
                                <li>Pendo</li>
                                <li>LaunchDarkly</li>
                                <li>Statsig</li>
                            </ul>
                            If your current tool isn't listed - that's not a problem! We can figure out the best
                            approach for you here.
                        </p>
                        <h3>Instrumentation</h3>
                        <p>
                            Here, we make sure that PostHog is correctly integrated into your app using one or more of
                            our SDKs. We can also:
                            <ul className={`list-disc m-4`}>
                                <li>
                                    Implement any user identification or privacy controls that you need based on your
                                    privacy requirements.
                                </li>
                                <li>
                                    Ensure that event capture is tuned so that you are only tracking the events which
                                    you need to (including implementing custom events where necessary).
                                </li>
                                <li>Integrate the first set of feature flags into your application.</li>
                                <li>Ensure that everything is set up according to our best practice guidance.</li>
                            </ul>
                        </p>

                        <h3>Onboarding</h3>
                        <p>
                            This is where we create the relevant dashboards, reports and other key items in PostHog to
                            allow you to see value quickly. First, we will help you define what you need here, and then
                            can also:
                            <ul className={`list-disc m-4`}>
                                <li>Build initial reports and dashboards for you</li>
                                <li>Define and implement a feature flag and a/b testing strategy</li>
                                <li>
                                    Create the right cohorts to allow you to gain a deeper understanding of certain
                                    segments of your user base
                                </li>
                                <li>Implement no-code surveys and ensure the results are available in the right way</li>
                            </ul>
                        </p>

                        <h3>Integration</h3>
                        <p>
                            PostHog exists in a wider data ecosystem, and we can help you integrate it into your current
                            data stack. Our team will first of all define your current and desired data architecture and
                            then the plumbing required for PostHog to integrate into it. We can then also:
                            <ul className={`list-disc m-4`}>
                                <li>Implement sources, pulling data into PostHog to be used in the platform</li>
                                <li>Define views which will make it easier for you to work with data at scale</li>
                                <li>
                                    Ensure that data is flowing from PostHog into downstream tools such as CRM systems
                                    or a warehouse
                                </li>
                                <li>Implement workflows to take real-time actions in response to data in PostHog</li>
                            </ul>
                        </p>
                    </div>
                    <div className="flex flex-col-reverse items-center md:flex-row gap-6 md:gap-8 pt-12 sm:pt-16 md:pt-20 mb-12 sm:mb-16 md:mb-20">
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4">
                                How much, though?
                                <br />
                                <span className="text-red dark:text-yellow">Transparent pricing.</span>
                            </h2>
                            <p>
                                Whilst the final amount is dependent on how much help you need from us, you should
                                expect to add around 20% of your first year credit purchase on top, with a $5k minimum
                                spend. If this is too much for your budget, you can also{' '}
                                <Link
                                    to="/merch?product=30-min-onboarding-consultation"
                                    className="underline font-medium"
                                >
                                    get help from our onboarding specialist team.
                                </Link>
                            </p>
                        </div>
                        <aside className="shrink-0 w-full md:w-auto md:basis-[500px] flex justify-center">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/9aa7587cac5d4a105afaf5b34358207fa05c7d1f_202edb1ddc.png"
                                alt="Thinking hog"
                                className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[470px]"
                            />
                        </aside>
                    </div>
                    <div className="flex justify-center gap-2 mb-12">
                        <CallToAction href="/talk-to-a-human" type="primary">
                            Talk to a human
                        </CallToAction>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ProfessionalServices
