import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Quote } from 'components/Pricing/Quote'
import { section } from './classes'
import { Check3, YC } from 'components/Icons'
import { CallToAction } from 'components/CallToAction'

const Benefit = ({ title, description }) => {
    return (
        <li className="list-none relative pl-10 p-0">
            <Check3 className="w-5 h-5 inline-block absolute left-2 top-1" />
            <strong className="">{title}</strong>
            <p className="mb-0">{description}</p>
        </li>
    )
}

export default function Startups() {
    return (
        <section className="max-w-6xl p-8 border border-light dark:border-dark bg-accent dark:bg-accent-dark rounded mb-12 md:mb-16 lg:mb-20 xl:mb-24 mx-4 xl:mx-auto">
            <div className="grid md:grid-cols-12">
                <div className="col-span-5 order-2 md:order-1">
                    <p className="font-semibold mb-1 opacity-75">Startup program</p>
                    <h3 className="text-3xl">
                        Get to product market-fit with the{' '}
                        <span className="text-red dark:text-yellow">most popular analytics toolkit</span> used by YC
                        startups
                    </h3>

                    <ul className="p-0 mb-8 flex flex-col gap-3">
                        <Benefit
                            title="Huuuuge free tier"
                            description="30M events tracked + 50K recordings free, per month"
                        />
                        <Benefit
                            title="Office hours with the team"
                            description="Every week we explain how to run a company - from marketing to accountancy."
                        />
                        <Benefit
                            title="Y Combinator application review"
                            description="Get direct feedback from a team that got in"
                        />
                        <Benefit
                            title="Pre-product/market fit guides"
                            description="We literally wrote a book on how to get product market fit."
                        />
                        <li className="list-none relative pl-10 flex flex-col md:flex-row md:justify-start gap-2">
                            <Check3 className="w-4 h-4 inline-block absolute left-2 top-0" />
                            <strong>Used and recommended by</strong>
                            <YC className="w-[115px]" />
                        </li>
                    </ul>
                    <CallToAction to="/startups" type="secondary">
                        Learn more
                    </CallToAction>
                </div>
                <div className="col-span-7 order-1 md:order-2">
                    <div className="w-[160%] ml-[-30%] mt-[-20%] mb-[-10%] md:ml-0 md:my-0 relative flex md:w-full justify-center">
                        <StaticImage
                            src="./images/billboard.png"
                            alt="A billboard with Dalton Caldwell extolling how great PostHog is"
                            className="max-w-[660px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
