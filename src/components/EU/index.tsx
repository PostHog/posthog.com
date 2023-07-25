import AnimateIntoView from 'components/AnimateIntoView'
import { CallToAction, TrackedCTA } from 'components/CallToAction'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import ursulaApproves from './images/ursula-approves.svg'

export default function EU() {
    return (
        <Layout className="eu-cloud">
            <SEO title={`PostHog Cloud EU`} />
            <section className="grid md:grid-cols-2 md:gap-x-8 md:gap-y-0 gap-y-6 -mt-1 items-center bg-gradient-to-b from-[#DFDFCD] via-[#DFDFCD] to-accent dark:to-dark px-5 md:pb-24 pb-12 pt-12 text-primary">
                <div className="text-right order-last lg:order-first ">
                    <StaticImage placeholder="none" src="./images/eu-hog.png" alt="EU hog" className="max-w-2xl" />
                </div>
                <div className="max-w-[530px]">
                    <h1 className="text-xl sm:text-2xl m-0 mb-5 pb-5 inline-block">
                        Introducing PostHog Cloud{' '}
                        <span className="bg-[#003399] text-[#FFCC00] rounded-sm px-1">EU</span>
                    </h1>
                    <h2 className="text-3xl sm:text-5xl m-0 leading-[1.1]">
                        Same PostHog. <br />
                        <span className="text-red">Now GDPR-ready.</span>
                    </h2>
                    <p className="text-base sm:text-lg m-0 opacity-50 font-semibold mt-2">
                        Our new hosting option in Frankfurt means you no longer have to self-host to keep customer data
                        in the EU.
                    </p>
                    <TrackedCTA
                        event={{ name: `clicked Get started`, type: 'EU cloud' }}
                        className="mt-5"
                        to="https://eu.posthog.com/signup"
                    >
                        Get started
                    </TrackedCTA>
                    <p className="text-sm font-semibold mt-7 mb-0">
                        <span className="opacity-60">Current customer?</span>{' '}
                        <Link to="/tutorials/migrate-eu-cloud" className="text-red">
                            Learn about migrating
                        </Link>
                    </p>
                </div>
            </section>
            <section className="sm:py-0 py-12 bg-light dark:bg-dark text-primary dark:text-primary-dark px-5">
                <div className="flex sm:grid sm:grid-cols-2 max-w-5xl mx-auto items-end sm:items-center">
                    <div className="flex-grow">
                        <h2 className="text-3xl sm:text-5xl leading-[1.1]">
                            <span className="text-red">Better performance</span> <br /> in EMEA
                        </h2>
                        <p className="text-base sm:text-lg m-0 opacity-50 font-semibold mt-2">
                            EU hosting also means faster ping times for people centrally located to the EU - both for
                            your customers, and for team members using PostHog.
                        </p>
                    </div>
                    <div className="sm:-my-12 text-right max-w-[120px] sm:max-w-full flex-shrink-0">
                        <StaticImage placeholder="none" width={372} src="./images/france-hog.png" alt="France hog" />
                    </div>
                </div>
            </section>
            <section className="bg-[#2D2D2D] py-12 md:py-20 px-5">
                <div className="grid lg:grid-cols-2 max-w-7xl mx-auto items-center gap-x-12">
                    <div className="relative order-last lg:order-first md:mt-0 mt-6">
                        <AnimateIntoView
                            hidden={{ translateY: '100%', opacity: 0 }}
                            shown={{ translateY: 0, opacity: 1 }}
                            className="absolute right-0 sm:right-20 md:right-5 md:max-w-full max-w-[150px]"
                        >
                            <img src={ursulaApproves} />
                        </AnimateIntoView>
                        <StaticImage
                            placeholder="none"
                            className="-bottom-12 md:-bottom-20"
                            src="./images/ursula.png"
                            alt="Ursula von der Leyen"
                        />
                    </div>
                    <div>
                        <h2 className="m-0 text-3xl md:text-5xl leading-[1.1] text-yellow">
                            This makes Ursula von der Leyen very happy
                        </h2>
                        <p className="text-base md:text-lg font-semibold text-white m-0 mt-2">
                            European countries like{' '}
                            <Link to="https://isgoogleanalyticsillegal.com/austria">Austria</Link>,{' '}
                            <Link to="https://isgoogleanalyticsillegal.com/denmark">Denmark</Link>,{' '}
                            <Link to="https://isgoogleanalyticsillegal.com/france">France</Link>,{' '}
                            <Link to="https://isgoogleanalyticsillegal.com/italy">Italy</Link>, and{' '}
                            <Link to="https://isgoogleanalyticsillegal.com/netherlands">The Netherlands</Link> have
                            recently deemed Google Analytics to be illegal (in its default configuration) because of
                            personally-identifiable data being transmitted to the United States.
                        </p>
                    </div>
                </div>
            </section>
            <section className="px-5 py-12 -mb-10 relative">
                <div className="grid md:grid-cols-2 max-w-5xl mx-auto items-center">
                    <div className="z-10">
                        <h2 className="text-3xl md:text-5xl leading-[1.1]">Try PostHog Cloud EU</h2>
                        <p className="text-lg m-0 opacity-50 font-semibold mt-2">
                            It’s the same great PostHog Cloud, just without the need to send any data across the pond.
                        </p>
                        <TrackedCTA
                            event={{ name: `clicked Get started`, type: 'EU cloud' }}
                            className="mt-5"
                            to="https://eu.posthog.com/signup"
                        >
                            Get started
                        </TrackedCTA>
                        <p className="text-base md:text-sm font-semibold mt-7 mb-0">
                            <span className="opacity-60">Current customer?</span> <br className="sm:hidden" />
                            <Link to="/tutorials/migrate-eu-cloud">Learn about migrating</Link>
                        </p>
                    </div>
                    <div className="text-right md:relative absolute max-w-[150px] bottom-0 right-0 md:max-w-full">
                        <StaticImage placeholder="none" width={372} src="./images/mug-hog.png" alt="Mug hog" />
                    </div>
                </div>
            </section>
        </Layout>
    )
}
