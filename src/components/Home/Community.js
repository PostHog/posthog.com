import { CallToAction } from 'components/CallToAction'
import React from 'react'
import { heading, section } from './classes'
import { StaticImage } from 'gatsby-plugin-image'
import Link from 'components/Link'

const CommunityStat = ({ count, label, className }) => {
    return (
        <div className={`absolute text-center text-[#392116] dark:text-[#E7F1FF] ${className}`}>
            <h4 className="text-[2.5vw] lg:text-[2.75vw] xl:text-[3vw] leading-none mb-0.5">{count}</h4>
            <p className="text-[1.5vw] lg:text-[1.25vw] xl:text-[1vw] m-0 leading-tight whitespace-nowrap">{label}</p>
        </div>
    )
}

export default function Community() {
    return (
        <>
            <div className="w-full overflow-x-hidden">
                <div className="relative top-28 sm:top-44 md:top-12 lg:top-12 xl:top-24 px-12 md:px-0 z-40">
                    <h2 className="m-0 pb-2 text-4xl md:text-6xl text-center leading-0 md:leading-none">
                        Join our open source community
                    </h2>
                    <p className="text-center md:text-lg max-w-lg leading-tight mx-auto my-0 p-0">
                        We work in the open. Check out our{' '}
                        <Link to="/handbook/strategy/overview">company strategy</Link>,{' '}
                        <Link to="/handbook/strategy/business-model">business model</Link>, or even our{' '}
                        <Link to="http://github.com/posthog/posthog" external>
                            source code
                        </Link>
                        .
                    </p>
                </div>
                <section className="relative [zoom:1.5] left-[-20%] md:left-0 md:mt-0 md:[zoom:1]">
                    <StaticImage
                        src="./images/community-light.png"
                        className="w-[150%] md:w-full transition-opacity opacity-100 dark:hidden dark:opacity-0"
                    />
                    <StaticImage
                        src="./images/community-dark.png"
                        className="w-[150%] md:w-full transition-opacity hidden opacity-0 dark:block dark:opacity-100"
                    />
                    <CommunityStat
                        count="81k+"
                        label={
                            <>
                                Developer <br className="xl:hidden" />
                                community
                            </>
                        }
                        className="left-[20.75vw] sm:left-[20.75vw] md:left-[21vw] lg:left-[21.5vw] xl:left-[20vw] 2xl:left-[19.75vw] top-[29.5vw] sm:top-[29.5vw] md:top-[30vw] lg:top-[30vw] xl:top-[31vw] -rotate-[4deg]"
                    />
                    <CommunityStat
                        count="411"
                        label="Contributors"
                        className="left-[41.75vw] sm:left-[41.5vw] md:left-[42vw] lg:left-[42.75vw] xl:left-[43.5vw] 2xl:left-[43.5vw] top-[40vw] sm:top-[40vw] md:top-[40vw] mdlg:top-[40.5vw] lg:top-[40.5vw] xl:top-[41vw] -rotate-[1.5deg]"
                    />
                    <CommunityStat
                        count="50b+"
                        label="Events tracked"
                        className="left-[61.5vw] sm:left-[61.5vw] md:left-[62vw] lg:left-[63vw] xl:left-[63.75vw] 2xl:left-[63.75vw] top-[50vw] sm:top-[50vw] md:top-[50.5vw] lg:top-[51vw] 2xl:top-[51vw] -rotate-1"
                    />
                </section>
            </div>
        </>
    )
}
