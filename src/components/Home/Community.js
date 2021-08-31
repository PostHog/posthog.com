import React from 'react'
import { CallToAction } from 'components/CallToAction'
import { section, heading } from './classes'

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
        <section className={section('text-center')}>
            <div className="bg-primary w-full rounded-lg px-4 py-16">
                <h2 className={heading('md', 'white')}>
                    Join our <span className="text-red">huuuuge*</span> open source community
                </h2>
                <h3 className={heading('sm', 'tan')}>*4,600+ stars on GitHub</h3>
                <ul className="grid sm:grid-cols-3 text-white m-0 p-0 list-none my-8 sm:my-20 divide-gray-accent-light divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-dashed">
                    <CommunityStat title="15k+" description="Developer community" />
                    <CommunityStat title="140" description="Contributors" />
                    <CommunityStat title="10b" description="Events tracked" />
                </ul>
                <CallToAction outline className="bg-primary text-white" href="https://github.com/PostHog/posthog">
                    Browse on GitHub
                </CallToAction>
            </div>
        </section>
    )
}
