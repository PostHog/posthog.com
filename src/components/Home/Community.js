import { CallToAction } from 'components/CallToAction'
import React from 'react'
import { heading, section } from './classes'
import { StaticImage } from 'gatsby-plugin-image'

const CommunityStat = ({ title, description }) => {
    return (
        <li className="p-6">
            <div className="text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-primary to-white">
                {title}
            </div>
            <div className="text-17px mt-2 font-semibold">{description}</div>
        </li>
    )
}

export default function Community() {
    return (
        <>
            <section className="relative">
                <StaticImage
                    src="./images/community-light.png"
                    className="w-full transition-opacity opacity-100 dark:hidden dark:opacity-0"
                />
                <StaticImage
                    src="./images/community-dark.png"
                    className="w-full transition-opacity hidden opacity-0 dark:block dark:opacity-100"
                />
                <div className="absolute border-white left-[21.5vw] top-[30vw] xl:left-[19.5vw] xl:top-[31vw] text-center -rotate-[4deg] text-[#392116] dark:text-[#E7F1FF]">
                    <h4 className="text-[2.5vw] lg:text-[2.75vw] xl:text-[3vw] leading-none mb-0">81k+</h4>
                    <p className="text-[1.5vw] lg:text-[1vw] xl:text-[1vw] leading-tight m-0">
                        Developer <br className="xl:hidden" />
                        community
                    </p>
                </div>
                <div className="absolute border-white left-[43.5vw] top-[40.75vw] text-center -rotate-[1.5deg] text-[#392116] dark:text-[#E7F1FF]">
                    <h4 className="text-[2.5vw] lg:text-[2.75vw] xl:text-[3vw] leading-none mb-0">411</h4>
                    <p className="text-[1.5vw] lg:text-[1vw] xl:text-[1vw] m-0">Contributors</p>
                </div>
                <div className="absolute border-white left-[63.5vw] top-[50.75vw] text-center -rotate-1 text-[#392116] dark:text-[#E7F1FF]">
                    <h4 className="text-[2.5vw] lg:text-[2.75vw] xl:text-[3vw] leading-none mb-0">50b+</h4>
                    <p className="text-[1.5vw] lg:text-[1vw] xl:text-[1vw] m-0">Events tracked</p>
                </div>
            </section>
            <section className={section('text-center')}>
                <h2 className={heading('md', 'white')}>
                    Join our <span className="text-red">huuuuge*</span> open source community
                </h2>
                <h3 className={heading('sm', 'tan')}>*12K+ stars on GitHub across our repos</h3>
                <ul className="grid sm:grid-cols-3 text-white m-0 p-0 list-none my-8 sm:my-20 divide-light dark:divide-dark divide-y-1 sm:divide-y-0 sm:divide-x-1 divide">
                    <CommunityStat title="81k+" description="Developer community" />
                    <CommunityStat title="411+" description="Contributors" />
                    <CommunityStat title="50b+" description="Events tracked" />
                </ul>
                <CallToAction type="outline" width="56" href="https://github.com/PostHog/posthog">
                    Browse on GitHub
                </CallToAction>
            </section>
        </>
    )
}
