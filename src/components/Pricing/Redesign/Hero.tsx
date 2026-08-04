import React from 'react'
import { CTA as PlanCTA } from 'components/Pricing/Plans'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import HeroDesk from '../../../images/pricing-hero-desk.png'

/**
 * Page-level hero for the pricing redesign.
 *
 * The headline is the whole pitch: you start free, and paying is something you
 * opt into later. Everything else on the page is evidence for that sentence, so
 * this is deliberately the only place with display-sized type.
 *
 * The dotted backdrop comes from `.paper-desk` in global.css, ported from the
 * PostHog app's login screen so the first thing you see here matches the first
 * thing you see after signing up.
 */
export default function Hero(): JSX.Element {
    return (
        <div className="@container not-prose mb-8 @3xl:mb-12">
            <div className="paper-desk border border-primary rounded-lg overflow-hidden">
                <div className="flex flex-col @2xl:flex-row @2xl:items-center gap-6 @2xl:gap-8 p-6 @2xl:p-8 @4xl:p-10">
                    <div className="flex-1">
                        <h1 className="text-3xl @lg:text-4xl @2xl:text-5xl @4xl:text-6xl font-bold tracking-tight leading-[1.05] text-balance mb-4 @2xl:mb-5">
                            Start free, scale{' '}
                            <span className="bg-green/25 text-green-dark dark:text-lime-green rounded-sm px-1.5 box-decoration-clone">
                                when you need.
                            </span>
                        </h1>

                        <p className="text-[15px] @lg:text-base max-w-xl mb-5">
                            <RoughAnnotation
                                type="underline"
                                color="currentColor"
                                strokeWidth={1}
                                delay={400}
                                multiline
                            >
                                <strong>97% of companies use PostHog for free.</strong>
                            </RoughAnnotation>{' '}
                            Only add a card if you need more than the free tier limits, advanced features, or want more
                            projects. You still keep the same monthly free volume, even after upgrading.
                        </p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            <PlanCTA intent="free" size="lg" />
                            <span className="text-sm text-secondary">No credit card required</span>
                        </div>
                    </div>

                    {/* TEMPORARY placeholder art – see README "Open items" before shipping.
                        Plain <img> with a direct import: this repo has gatsby-plugin-image but
                        NOT gatsby-plugin-sharp, so StaticImage/GatsbyImage will fail the build. */}
                    <div className="shrink-0 self-center w-56 @2xl:w-64 @4xl:w-80">
                        <img
                            src={HeroDesk}
                            alt="PostHog running on a beige desktop computer, next to a hedgehog and a PostHog mug"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
