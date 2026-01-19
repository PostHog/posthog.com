import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Link from 'components/Link'
import { IconWrench, IconCode2, IconPlug, IconFolderMove, IconMessage } from '@posthog/icons'

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
        title: 'Help migrating your data',
        description: "Ready to ditch legacy tools like Amplitude or Mixpanel? We'll migrate you in a flash.",
        icon: <IconFolderMove />,
    },
    {
        title: 'Help instrumenting events',
        description: "Complex tracking needs? Privacy requirements? We'll get you setup with the right tools.",
        icon: <IconCode2 />,
    },
    {
        title: 'Help training your team',
        description: "We'll make sure your team knows their analytics from their elbows with minimal meetings.",
        icon: <IconMessage />,
    },
    {
        title: 'Help integrating your stack',
        description: "Stripe? Snowflake? Supabase? Whatever tools you use, we'll get them talking to PostHog.",
        icon: <IconPlug />,
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
                <div className="flex gap-1.5 justify-center items-center mb-3">
                    <span className="w-6 h-6 text-blue">
                        <IconWrench />
                    </span>
                    <span className="text-[15px] font-semibold text-opacity-60">Professional Services</span>
                </div>
                <Hero
                    title='<span class="text-red dark:text-yellow">Hire a PostHog expert</span> <br/>to get up and running'
                    subtitle="We'll do the heavy lifting. You do the fun stuff."
                />
                <div className="flex justify-center gap-2 mb-6">
                    <CallToAction href="/talk-to-a-human" type="primary">
                        Talk to us about custom options
                    </CallToAction>
                    <CallToAction
                        href="https://posthog.com/merch?product=30-min-onboarding-consultation"
                        type="secondary"
                    >
                        <>Or get a 30-minute consultation</>
                    </CallToAction>
                </div>
            </div>

            <div id="features">
                <section className="max-w-7xl mx-auto px-4 sm:px-5 pb-6">
                    <div className="mb-2">
                        <ul
                            className={`list-none p-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${subfeaturesItemCount} gap-4`}
                        >
                            {subfeatures.map((subfeature, index) => {
                                return <Subfeature {...subfeature} key={index} />
                            })}
                        </ul>
                    </div>

                    <div className="flex flex-col-reverse items-center md:flex-row gap-6 md:gap-8 pt-6 sm:pt-8 md:pt-10 mb-6 sm:mb-8 md:mb-10">
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4">
                                Want to show off your office?
                                <br />
                                <span className="text-red dark:text-yellow">We can do on-site training.</span>
                            </h2>
                            <p>
                                Most people don't want to sit through a video call for hours on end, including us. So,
                                we can come to you for a few days of face-to-face training. Our engineers can handle all
                                your technical questions, and they'll bring some merch with them too.
                            </p>
                            <p className="text-sm mb-4 border-l-4 border-primary pl-2 py-1">
                                <strong>Work remotely?</strong> Same. Let's just do it on Google Meet instead. Don't
                                worry, we'll still send merch.
                            </p>
                        </div>
                        <aside className="shrink-0 w-full md:w-auto md:basis-[500px] flex justify-center">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/school_92f4d92503.png"
                                alt="So starteth the lessoneth"
                                className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[470px]"
                            />
                        </aside>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl text-center mb-2 px-2">
                        Some of the things we can help with...
                    </h2>
                    <div className="grid @xl:grid-cols-2 gap-y-4 @xl:gap-y-8 pb-8 mt-4 sm:mt-6">
                        <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                            1. See how people use your product
                        </h3>
                        <div className="@xl:border-b border-primary pb-8">
                            <strong className="flex items-center gap-1.5 mb-2 text-[17px] @xl:text-lg">
                                <span>Set up</span>
                            </strong>
                            <p className="m-0">
                                It's like watching a screen recording of someone using your product. Just add{' '}
                                <Link to="/docs/getting-started/install">PostHog.js</Link> and enable session replay.
                            </p>
                            <p className="mt-2">
                                Mobile app? <Link to="/docs/libraries/react-native">We've got you, too.</Link>
                            </p>
                        </div>

                        <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                            2. Get some user numbers and data
                        </h3>
                        <div className="@xl:border-b border-primary pb-8">
                            <strong className="flex items-center gap-1.5 mb-2 text-[17px] @xl:text-lg">
                                <span>Activate</span>
                            </strong>
                            <p className="m-0">
                                This will tell you how many users you have, which features they use, who they are and if
                                they're coming back. Product analytics comes with auto capture, so you don't need to
                                waste time instrumenting tracking.
                            </p>
                            <p className="mt-2">
                                Optionally <Link to="/docs/libraries">add a back-end library</Link> to send server-side
                                events.
                            </p>
                        </div>

                        <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                            3. Discover how people find your product
                        </h3>
                        <div className="@xl:border-b border-primary pb-8">
                            <strong className="flex items-center gap-1.5 mb-2 text-[17px] @xl:text-lg">
                                <span>Enable</span>
                            </strong>
                            <p className="m-0">
                                Since PostHog.js is already installed, just activate your new Google Analytics
                                replacement to see traffic sources and trends.
                            </p>
                        </div>

                        <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                            4. Get feedback
                        </h3>
                        <div className="@xl:border-b border-primary pb-8">
                            <strong className="flex items-center gap-1.5 mb-2 text-[17px] @xl:text-lg">
                                <span>Add</span>
                            </strong>
                            <p className="m-0">
                                Trigger on-page surveys based on product activity – like people who use a feature or
                                visit a certain page.
                            </p>
                        </div>

                        <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                            5. Apply for our startup program
                        </h3>
                        <div className="@xl:border-b border-primary pb-8">
                            <p className="m-0">
                                Now that you're outgrowing our free tier, it's time to{' '}
                                <Link to="/startups">apply for our startup program</Link> that gets you $50k in PostHog
                                credit, free merch, and even more credits through our partners.
                            </p>
                        </div>

                        <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary mb-0">
                            6. Learn from our journey
                        </h3>
                        <div className="@xl:border-b border-primary pb-8">
                            <div className="flex flex-col gap-2">
                                <p className="m-0">
                                    Co-founder James Hawkins wrote a book about how to get to product-market fit. (Get a
                                    free copy when you're accepted into our startup program!)
                                </p>
                                <p className="m-0">
                                    Don't have time to read the book?{' '}
                                    <Link to="/founders/product-market-fit-game">Play the product-market fit game</Link>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                    <h3 className="text-lg sm:text-xl text-center font-medium mb-4 sm:mb-6 px-4">AKA Scope of Work</h3>
                    <div className="grid gap-4 sm:gap-6 md:gap-8 mb-3">
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
                    <div className="flex flex-col-reverse items-center md:flex-row gap-6 md:gap-8 pt-6 sm:pt-8 md:pt-10 mb-6 sm:mb-8 md:mb-10">
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
                    <div className="flex justify-center gap-2 mb-6">
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
