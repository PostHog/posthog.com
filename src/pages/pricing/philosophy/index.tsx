import CloudinaryImage from 'components/CloudinaryImage'
import React, { useEffect, useState } from 'react'
import { pricingMenu } from '../../../navs'
import Layout from 'components/Layout'
import { SectionHeader } from 'components/Pricing/Test/Sections'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import { IconInfo } from '@posthog/icons'
import { CTA as PlanCTA } from 'components/Pricing/Plans'
import { StaticImage } from 'gatsby-plugin-image'

const PricingPhilosophy = (): JSX.Element => {
    return (
        <>
            <section
                id="philosophy"
                className="bg-light dark:bg-dark text-primary shadow-xl rounded pt-6 pb-2 @xl:md:py-8 px-4 @xl:px-8 @2xl:px-12 md:mx-auto mt-12 mb-20 w-[calc(100%_-_3rem)] @xl:w-full max-w-3xl border border-primary"
            >
                <SectionHeader>
                    <p className="opacity-60 text-[15px] mb-2">A note from our co-founder</p>
                    <h3 className="text-xl">Our pricing is designed to make you happy</h3>
                </SectionHeader>

                <p className="mt-4">Here's what you should know about our pricing:</p>
                <ul className="space-y-1 mb-4 [&_li]:leading-7 pl-4 md:pl-8">
                    <li>
                        <strong>We make a profit with every product.</strong> This means we don’t have loss-leader
                        products that will go up in pricing later or get retired.
                    </li>
                    <li>
                        <strong>We aim to be the cheapest for each product at every scale</strong> compared to every
                        major competitor.{' '}
                        <Link
                            iconClasses="!text-dark dark:!text-light"
                            href="https://twitter.com/intent/tweet?text=@posthog%20Your%20pricing%20is..."
                            external
                        >
                            <em>Tell us if we're not!</em>
                        </Link>{' '}
                        (Note: This doesn't include your buddy's two-person startup.)
                    </li>
                    <li>
                        The company in general has significant revenue, over 60,000 customers, runs{' '}
                        <Link
                            href="/newsletter/the-companies-that-shaped-posthog#our-takeaways-2"
                            state={{ newWindow: true }}
                        >
                            default alive
                        </Link>
                        , and aims to IPO rather than sell. This means{' '}
                        <strong>we don’t rely on investors to grow, and we’re stable.</strong> Of course we aren’t
                        perfect, but this goes a long way to avoiding the average dumb vc-backed company stuff in
                        general - like running out of money or selling to a lame bigger company who just kills off our
                        products.
                    </li>
                    <li>
                        We have an open source product too - so if you must, you can self host. It is MIT licensed if
                        you want to use it in a big organization that isn’t ready to move to PostHog Cloud yet.
                        <Tooltip
                            content={() => (
                                <div className="max-w-sm">
                                    <strong className="block">A disclaimer about self-hosting</strong>
                                    <p className="mb-2 text-sm">
                                        Being upfront, self-hosting PostHog has limitations and is usually a worse
                                        experience (and more expensive) than PostHog Cloud.
                                    </p>
                                    <p className="mb-0 text-sm">
                                        Main benefits of PostHog Cloud include our large, shared infrastructure and lack
                                        of separate hosting costs, required maintenance, and upgrades that come with
                                        self-hosting.
                                    </p>
                                </div>
                            )}
                        >
                            <IconInfo className="size-4 inline-block relative left-0.5 -top-0.5" />
                        </Tooltip>
                    </li>
                </ul>
                <p className="mb-4">If this makes you happy – like most people - just start here:</p>
                <p>
                    <span className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
                        <PlanCTA />
                        <em className="opacity-75 text-sm">No credit card required</em>
                    </span>
                </p>
                <p>
                    Or if you need more info,{' '}
                    <a
                        href="#faq"
                        onClick={(e) => {
                            e.preventDefault()
                            const faq = document.getElementById('faq')
                            if (faq) {
                                faq.scrollIntoView({ behavior: 'smooth' })
                            }
                            window.history.replaceState(null, '', '#faq')
                        }}
                    >
                        read our FAQ
                    </a>
                    ,{' '}
                    <Link href="/questions/topic/pricing" state={{ newWindow: true }}>
                        ask a question
                    </Link>
                    , or{' '}
                    <Link href="/talk-to-a-human" state={{ newWindow: true }}>
                        talk to a human
                    </Link>
                    .
                </p>

                <div className="flex gap-2 items-center">
                    <Link href="/community/profiles/27732" state={{ newWindow: true }}>
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/v1683655764/james_b841adce96.png"
                            quality={100}
                            alt="James Hawkins, CEO, Co-founder"
                            placeholder="none"
                            objectFit="contain"
                            className="bg-yellow rounded-full overflow-hidden size-12 border border-primary p-0.5 dark:bg-dark relative"
                            imgClassName="absolute inset-0 object-cover"
                        />
                    </Link>
                    <p className="leading-tight my-0">
                        <Link href="/community/profiles/27732" state={{ newWindow: true }} className="flex">
                            <strong>James Hawkins</strong>
                        </Link>
                        <span className="text-sm text-secondary">Co-founder</span>
                    </p>
                </div>
                <p className="pl-14 mt-0 text-sm text-muted italic">
                    When James isn't thinking about how to cut prices (again), you'll likely find him changing a diaper.
                </p>
            </section>
        </>
    )
}

export default PricingPhilosophy
