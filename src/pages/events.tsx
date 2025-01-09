import CloudinaryImage from 'components/CloudinaryImage'
import React, { useEffect, useState } from 'react'
import { pricingMenu } from '../navs'
import Layout from 'components/Layout'
import { SectionHeader } from 'components/Pricing/Test/Sections'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import { CTA as PlanCTA } from 'components/Pricing/Plans'
import { StaticImage } from 'gatsby-plugin-image'
import { IconCheck } from '@posthog/icons'

const Events = (): JSX.Element => {
    return (
        <Layout parent={pricingMenu}>
            <p className="mb-8 text-[15px]">
                Events are billed at different rates based on volume and if you choose to send custom user properties
                with the event.
            </p>

            <section className="grid md:grid-cols-5 gap-6 md:gap-12 pb-12">
                <div className="col-span-1 md:col-span-2 md:flex justify-center">
                    <h3 className="mb-4 md:hidden">Anonymous events</h3>
                    <div className="max-w-md">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Pricing/PricingCalculator/Tabs/event-anonymous.png"
                            alt="Anonymous event example"
                            className=""
                            placeholder="blurred"
                        />
                    </div>
                </div>
                <div className="col-span-1 md:col-span-3 max-w-xl">
                    <h3 className="hidden md:block mb-1">Anonymous events</h3>
                    <p className="opacity-70 mb-3">
                        No individually-identifiable info, analyzed in aggregate, don't use person profiles
                    </p>
                    <p className="mb-2">
                        By default, events are anonymous, meaning they don't have any personally-identifiable
                        information attached to them.
                    </p>
                    <p className="mb-2">
                        They come with info about the browser and device, visitor's location, and any UTM parameters.
                    </p>

                    <h4 className="text-base">With anonymous events, you can:</h4>
                    <ul className="list-none pl-0 mb-6 space-y-1">
                        <li className="relative pl-8">
                            <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                            See a Google Analytics-style dashboard
                        </li>
                        <li className="relative pl-8">
                            <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                            Access properties like UTMs, location, referrer, page views
                        </li>
                        <li className="relative pl-8">
                            <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                            <p className="mb-0">
                                Create{' '}
                                <strong>
                                    <em>aggregate</em>
                                </strong>{' '}
                                insights in <strong>Product analytics</strong>
                            </p>
                            <ul className="[&_li]:text-sm opacity-70 pl-4 pt-1">
                                <li>How many times users click an element on a page</li>
                                <li>Group visitors by device type or location</li>
                                <li>Filter to interactions on a specific page</li>
                                <li>Track anonymous users across sessions</li>
                            </ul>
                        </li>
                    </ul>

                    <p className="m-0 text-sm opacity-70">Pricing starts at </p>
                    <p className="m-0">
                        <strong>$0.00005</strong>
                        <span className="opacity-70 text-sm">/event</span>
                    </p>
                    <p className="text-green m-0 text-sm font-semibold">First 1 million events/mo free</p>
                </div>
            </section>

            <section className="grid md:grid-cols-5 gap-6 md:gap-12 pb-4">
                <div className="col-span-1 md:col-span-2 md:flex justify-center">
                    <h3 className="mb-4 md:hidden">Identified events</h3>
                    <div className="max-w-md">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Pricing/PricingCalculator/Tabs/event-identified.png"
                            alt="Identified event example"
                            placeholder="blurred"
                        />
                    </div>
                </div>
                <div className="col-span-1 md:col-span-3 max-w-xl">
                    <h3 className="hidden md:block mb-1">Identified events</h3>
                    <p className="opacity-70 mb-3">
                        Track usage of specific, logged in users by using{' '}
                        <Link to="/docs/data/persons" external>
                            person profiles
                        </Link>
                        .
                    </p>
                    <p className="mb-2">
                        Identify users by their email address or other unique identifier, and attach custom properties
                        to their person profiles.
                    </p>

                    <h4 className="text-base">In addition to anonymous event capabilities, you can:</h4>
                    <ul className="list-none pl-0 mb-6 space-y-1">
                        <li className="relative pl-8">
                            <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                            <p className="mb-0">Merge anonymous users with their eventual identified user</p>
                            <ul className="[&_li]:text-sm opacity-70 pl-2 pt-1 list-none">
                                <li>
                                    Like when they sign up for your product or use different devices - enables analyzing
                                    the user's path
                                </li>
                            </ul>
                        </li>
                        <li className="relative pl-8">
                            <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                            <p className="mb-0">Store custom properties on users</p>
                            <ul className="[&_li]:text-sm opacity-70 pl-2 pt-1 list-none">
                                <li>Use these properties in cohorts, session replay, experiments, and feature flags</li>
                            </ul>
                        </li>

                        <li className="relative pl-8">
                            <IconCheck className="size-5 inline-block text-green absolute top-1 left-1" />
                            <p className="mb-0">
                                Create{' '}
                                <strong>
                                    <em>user-specific</em>
                                </strong>{' '}
                                insights in <strong>Product analytics</strong>
                            </p>
                            <ul className="[&_li]:text-sm opacity-70 pl-4 pt-1">
                                <li>
                                    How many times <em>specific users</em> click an element on a page
                                </li>
                                <li>
                                    Group <em>cohorts of users</em> by device type, location, or property
                                </li>
                                <li>
                                    Filter to interactions on a specific page <em>by specific users</em>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div className="flex gap-8">
                        <div className="flex-1">
                            <p className="m-0 text-sm opacity-70">Pricing starts at</p>
                            <p className="m-0">
                                <strong>$0.000248</strong>
                                <span className="opacity-70 text-sm">/event</span>
                            </p>
                            <p className="text-green m-0 text-sm font-semibold">First 1 million events/mo free</p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Events
