import CloudinaryImage from 'components/CloudinaryImage'
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
            <strong className="text-[15px]">{title}</strong>
            <p className="mb-0 text-sm">{description}</p>
        </li>
    )
}

export default function Startups() {
    return (
        <section className="overflow-x-hidden pt-12 md:pt-20">
            <div className="max-w-5xl p-8 border border-light dark:border-dark bg-accent dark:bg-accent-dark rounded mb-12 lg:mb-20 xl:mb-24 mx-4 xl:mx-auto">
                <div className="-mt-28 -mx-12 mb-6 lg:float-right lg:ml-4 lg:-mt-40 lg:-mr-20 xl:-mr-32 lg:mb-0 lg:w-auto relative text-center">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/images/billboard.png"
                        alt="A billboard with Dalton Caldwell extolling how great PostHog is"
                        className="max-w-[654px]"
                        quality={100}
                        formats={['png']}
                    />
                </div>

                <p className="font-semibold mb-1 opacity-75">Startup program</p>
                <h3 className="text-3xl">
                    Get to product market-fit with the{' '}
                    <span className="text-red dark:text-yellow">most popular analytics toolkit</span> used by YC
                    startups
                </h3>

                <ul className="p-0 mb-8 grid md:grid-cols-2 lg:flex flex-col gap-3">
                    <Benefit
                        title="Huuuuge free tier"
                        description="30M events tracked + 50K recordings free, per month"
                    />
                    <Benefit title="Exclusive founder merch" description="Now you can look as lit as our engineers" />
                    <Benefit
                        title="Pre-product/market fit guides"
                        description="We literally wrote a book on how to get product-market fit"
                    />
                    <li className="list-none relative pl-10 flex flex-col md:flex-row md:justify-start gap-2">
                        <Check3 className="w-4 h-4 inline-block absolute left-2 top-0" />
                        <strong className="text-[15px]">Used and recommended by</strong>
                        <YC className="w-[115px]" />
                    </li>
                </ul>
                <CallToAction to="/startups" type="secondary">
                    Learn more
                </CallToAction>
            </div>
        </section>
    )
}
