import React from 'react'
import { CallToAction } from '../CallToAction'
import Icon from './Icon'
import Link from '../Link'
import { heading, section } from './classes'
import { StaticImage } from 'gatsby-plugin-image'

const Feature = ({ title, icon }) => {
    return (
        <li className="flex px-6 md:px-6 py-4 md:py-6 space-x-1 md:space-x-4 font-bold items-center justify-start md:justify-center">
            <Icon className="w-6 h-6 mr-4 md:mr-0" name={icon} />
            <span className="lg:text-[16px] leading-tight">{title}</span>
        </li>
    )
}

export default function Hero() {
    return (
        <section className="flex flex-col justify-center items-center">
            <div className="relative w-full z-10">
                <div className={section('z-10 relative')}>
                    <h1 className={heading()}>
                        Host your own
                        <br /> product analytics suite
                    </h1>
                    <h2 className={heading('sm', 'primary', 'my-6', 'max-w-xl', 'mx-auto')}>
                        With our open source platform, customer data never has to leave your infrastructure
                    </h2>
                    <div className="flex flex-col justify-center items-center space-y-2 md:space-y-3">
                        <CallToAction type="primary" width="56" to="/docs/self-host/">
                            Get started
                        </CallToAction>
                        <CallToAction type="outline" width="56" to="/schedule-demo">
                            Schedule a demo
                        </CallToAction>
                    </div>
                </div>
                <div className="absolute w-full h-full flex justify-end bottom-[-6.8rem] sm:-bottom-24 left-0 right-0 max-w-screen-2xl mx-auto overflow-x-hidden 2xl:overflow-x-visible">
                    <StaticImage
                        objectPosition="bottom"
                        loading="eager"
                        placeholder="none"
                        width={357}
                        imgClassName="h-auto"
                        className="h-full max-w-[200px] md:max-w-[310px] xl:max-w-none mr-[-60px] md:mr-[-75px]"
                        objectFit="contain"
                        src="./images/hero-right.png"
                    />
                </div>
            </div>
            <p className="w-full mt-20 sm:mt-auto mb-0 py-6 sm:py-10 px-4 font-semibold text-center bg-gradient-to-t from-tan to-[#E4E5DF]">
                Don't need to self host? Try <Link to="//app.posthog.com/signup">PostHog Cloud</Link>
            </p>
            <ul className="bg-[#DFE0DA] bg-opacity-70 w-full list-none m-0 p-0 grid md:grid-cols-5 md:divide-x divide-y-1 md:divide-y-0 divide-gray-accent-light divide-dashed border-gray-accent-light border-dashed border-t border-b">
                <Feature icon="event-pipelines" title="Event pipelines" />
                <Feature icon="analytics" title="Analytics" />
                <Feature icon="session-recordings" title="Session recordings" />
                <Feature icon="feature-flags" title="Feature flags" />
                <Feature icon="data-warehouse" title="Export to data warehouse" />
            </ul>
        </section>
    )
}
