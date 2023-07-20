import { CallToAction } from 'components/CallToAction'
import React from 'react'
import { heading, section } from './classes'
import Link from 'components/Link'
import { Bang, Eco, TrendUp } from 'components/Icons'
import { StaticImage } from 'gatsby-plugin-image'

const ProductDetails = () => (
    <>
        <span className="bg-green inline-flex items-center gap-1 px-2 py-1 rounded-sm">
            <span className="w-3 h-3">
                <Eco />
            </span>
            <span className="uppercase font-semibold text-xs text-white">Eco-friendly</span>
        </span>
        <p className="text-4xl font-bold m-0 md:mt-2">PostHog Cloud</p>
        <p className="opacity-50 m-0 mb-4 text-sm">Digital download*</p>
    </>
)

export default function CTA() {
    return (
        <section className="pt-8 md:pt-0 px-5 lg:px-0">
            <h2 className={heading('lg')}>This is your call to action.</h2>
            <h3 className={heading('sm')}>If nothing else has sold you on PostHog, hopefully these incentives will.</h3>

            <div className="md:hidden py-12">
                <ProductDetails />
            </div>

            <div className="md:grid grid-cols-2 gap-16 md:pt-24 pb-16 max-w-5xl mx-auto">
                <div className="relative text-right">
                    <StaticImage src="./images/cloud-cd.jpg" alt="PostHog Cloud" className="max-w-[443px] mb-2" />
                    <StaticImage
                        src="./images/g2-badge.png"
                        alt="People on G2 think we're great"
                        className="w-[90px] absolute -left-4 bottom-12 md:left-[-8px] md:bottom-24"
                    />

                    <div className="bg-blue text-left leading-none px-4 py-2 absolute -top-12 md:-top-8 left-4 right-4 lg:-left-16 md:right-auto rounded md:rounded-none">
                        <span className="text-sm font-bold text-white">
                            3 people <span className="text-xs text-normal">(would have)</span> added PostHog to their
                            cart*
                        </span>
                        <br />
                        <span className="text-xs text-white">*if this were a real cart</span>
                    </div>
                    <div className="hidden lg:block absolute top-4 md:-top-16 -right-12">
                        <div className="relative">
                            <Bang className="w-[189px]" />
                            <p className="px-8 text-center m-0 absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center text-black uppercase leading-none font-bold text-lg rotate-6">
                                <span className="text-xs">Not</span>
                                endorsed <br />
                                by Kim K
                            </p>
                        </div>
                    </div>
                    <p className="text-xs opacity-60 text-right">
                        *PostHog is a web product and cannot be installed by CD.
                        <br />
                        We <em>did</em> once send some customers a floppy disk but it was a Rickroll.
                    </p>
                </div>
                <div>
                    <div className="hidden md:block">
                        <ProductDetails />
                    </div>

                    <ul className="p-0 m-0 space-y-5">
                        <li className="list-none">
                            <strong className="text-xl block pb-1">Cloud</strong>
                            <ul className="flex gap-2 p-0">
                                <li className="list-none">
                                    <div className="py-2 px-3 font-bold border border-black dark:border-white">
                                        US (Virginia)
                                    </div>
                                </li>
                                <li className="list-none border border-transparent dark:border-transparent hover:border-black dark:hover:border-white">
                                    <div className="py-2 px-3 font-bold">EU (Frankfurt)</div>
                                </li>
                            </ul>
                        </li>
                        <li className="list-none">
                            <strong className="text-xl block pb-1">Size</strong>
                            <ul className="flex gap-2 p-0">
                                <li className="list-none">
                                    <div className="py-2 px-3 font-bold border border-black dark:border-white">
                                        One size
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li className="list-none">
                            <strong className="text-xl block pb-1">Starts at</strong>
                            <div className="flex items-baseline gap-1">
                                <strike className="font-bold text-xl">$0</strike>
                                <span className="font-bold text-red text-xl uppercase">Free</span>
                                <span className="text-xs opacity-50">
                                    &gt;<span className="text-sm">1 left at this price!!</span>
                                </span>
                            </div>
                        </li>
                    </ul>

                    <div className="py-6">
                        <CallToAction type="primary" width="56" className="" to="https://app.posthog.com/signup">
                            Get started
                        </CallToAction>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="bg-accent dark:bg-accent-dark rounded h-8 w-8 p-1">
                            <TrendUp className="opacity-75" />
                        </span>
                        <p className="text-sm text-primary/50 dark:text-primary-dark/50 leading-tight mb-0">
                            <strong>Hurry:</strong> 104 companies signed up{' '}
                            <Link
                                to="https://app.posthog.com/shared/gQMqaRP0ZH0V3P3XXrSDnNcqDGoe7Q"
                                external
                                className="font-bold"
                            >
                                today
                            </Link>
                            . <br className="hidden sm:block" />
                            Act now and get $0 off your first order.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
