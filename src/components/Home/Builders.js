import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { API, AppLibrary, EventPipelines, SQL } from 'components/ProductIcons'
import Link from 'components/Link'

const features = [
    {
        feature: 'API',
        icon: <API />,
        description: 'Build custom apps, augment or transform data, automate actions based on customer activity',
        cta: {
            text: 'Explore the API',
            url: '/docs/api',
        },
    },
    {
        feature: 'Event pipelines',
        icon: <EventPipelines />,
        description: (
            <>
                Connect all your data to PostHog. (And if it doesn’t exist yet,{' '}
                <Link to="/docs/apps/build" className="text-yellow">
                    you can build it!
                </Link>
                )
            </>
        ),
        cta: {
            text: 'Browse libraries',
            url: '/apps?filter=type&value=data-in',
        },
    },
    {
        feature: 'SQL-like syntax',
        icon: <SQL />,
        description: 'Query your data directly if your complex data question can’t be answered in the PostHog UI',
        cta: {
            text: 'Request beta access',
            url: '/roadmap',
        },
    },
    {
        feature: 'App platform',
        icon: <AppLibrary />,
        description:
            'Extend functionality with custom apps for your business or build an app for the PostHog community',
        cta: {
            text: 'Browse apps',
            url: '/apps',
        },
    },
]

export default function Builders() {
    return (
        <section className="px-5">
            <div className="max-w-screen-2xl mx-auto my-16 py-8 sm:py-12 px-8 sm:px-14 bg-primary rounded-lg text-white">
                <div className="max-w-[1090px] mx-auto">
                    <div className="lg:hidden flex justify-end -mr-[16px] sm:-mr-[28px]">
                        <StaticImage quality={100} className="max-w-[320px]" src="./images/builder-hog-mobile.png" />
                    </div>
                    <div className="relative after:h-[calc(100%+2rem)] sm:after:h-[calc(100%+3rem)] after:absolute after:-right-4 sm:after:-right-7 after:top-0 after:w-[2px] after:bg-[#dd512b] lg:after:hidden">
                        <h2 className="text-6xl pb-4 sm:text-8xl m-0 lg:text-right text-white leading-none">
                            Built for <span className="text-yellow">builders</span>
                        </h2>
                        <div className="flex">
                            <div className="relative max-w-[508px] w-full flex-shrink-0 lg:block hidden">
                                <div className="absolute bottom-[-145px] transform -left-[50px] w-full">
                                    <StaticImage src="./images/builder-hog.png" />
                                </div>
                            </div>
                            <div className="pt-6">
                                <ul className="list-none m-0 p-0">
                                    {features.map(({ feature, icon, description, cta }) => {
                                        return (
                                            <li
                                                className="sm:grid grid-cols-5 mb-6 pb-6 border-b border-white/30 border-dashed last:pb-0 last:mb-0 last:border-b-0"
                                                key={feature}
                                            >
                                                <div className="flex space-x-2 sm:space-x-4 col-span-2">
                                                    <span className="w-8">{icon}</span>
                                                    <p className="m-0 text-lg font-bold">{feature}</p>
                                                </div>
                                                <div className="col-span-3 ml-10 sm:ml-0">
                                                    <p className="text-[15px] m-0 mb-2 sm:mt-0 mt-2">{description}</p>
                                                    <Link className="text-[15px] text-yellow" to={cta?.url}>
                                                        {cta?.text}
                                                    </Link>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
