import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { AppLibrary, EventPipelines, SQL } from 'components/ProductIcons'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import welderHog from '../../../static/lotties/welder-hog.json'
import Lottie from 'react-lottie'

const examples = [
    {
        title: 'Evaluate feature flags from anywhere',
        endpoint: 'feature_flags',
        description: (
            <>
                If you don't use one of our <Link to="/docs/getting-started/install?tab=sdks">SDKs</Link>, you can get a
                flag status for a user from the API on-the-fly.
            </>
        ),
    },
    {
        title: 'Pull basic site stats from saved insights',
        endpoint: 'insights',
        description: (
            <>
                Show stats like <em>active users</em>, <em>pageviews</em>, or <em>number of daily signups</em> (like we
                use near the bottom of this page!).
            </>
        ),
    },
    {
        title: 'User-facing analytics',
        endpoint: 'insights',
        description: 'Build your own visualizations of insights within your own app or internal dashboard.',
    },
    {
        title: 'Read/write user properties and display in your app',
        endpoint: 'persons',
        description:
            'Use PostHog as an external database by storing/reading user data and showing it in their user profile.',
    },
    {
        title: 'Add high-value users to a cohort',
        endpoint: 'cohorts',
        description:
            "If you're running Clearbit on new signups, you can automatically add them to a cohort based on criteria from enrichment services.",
    },
    {
        title: 'Notate when a feature is released',
        endpoint: 'annotations',
        description:
            'Annotations are useful for understanding inflection points in insights. You can programmatically create annotations like when a PR is merged.',
    },
]

export default function ApiExamples() {
    return (
        <section className="px-5 mb-20 max-w-6xl mx-auto">
            <h2 className="text-4xl lg:text-5xl mb-4">API</h2>
            <p className="text-lg md:font-semibold opacity-75 leading-tight">
                We built PostHog on our API. This means you get full access to anything you want with your event and
                customer data that's ingested by PostHog. Here are some examples<span className="md:hidden">.</span>
                <span className="hidden md:inline-block">:</span>
            </p>

            <div className="flex flex-col md:grid md:grid-cols-8">
                <div className="col-span-5 order-2 md:order-1">
                    <ul className="p-0 mb-4 md:mb-0">
                        {examples.map(({ title, endpoint, description }) => {
                            return (
                                <li
                                    className="list-none flex flex-col md:flex-row p-4 rounded odd:bg-accent dark:odd:bg-accent-dark"
                                    key={title}
                                >
                                    <div className="shrink md:basis-[200px] mb-2">
                                        <span className="font-code bg-red/10 text-red font-semibold rounded text-[13px] p-1">
                                            {endpoint}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="m-0 text-base font-bold">{title}</h4>
                                        <p className="text-primary/75 dark:text-primary-dark/75 text-sm m-0">
                                            {description}
                                        </p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <CallToAction to="/docs/api" type="secondary" className="">
                        Explore the API
                    </CallToAction>
                </div>
                <div className="col-span-3 order-1 md:order-2 text-center">
                    <div className="max-w-[371px] md:ml-8 relative after:bg-gradient-to-t after:from-tan after:via-tan/70 dark:after:from-dark dark:after:via-dark/70 after:to-transparent after:absolute after:bottom-0 after:left-0 after:h-10 after:w-full">
                        <Lottie
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: welderHog,
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
