import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { AppLibrary, EventPipelines, SQL } from 'components/ProductIcons'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import { IconChevronDown } from '@posthog/icons'

const examples = [
    {
        title: 'Double (or even triple?) breakdowns',
        example: <>concat(properties.name,' ; ',properties.$current_url)</>,
    },
    {
        title: (
            <>
                <Link to="/tutorials/hogql-date-time-filters">Advanced date filtering</Link>, relative times,
                weekly/monthly reports
            </>
        ),
    },
    {
        title: 'Custom SQL insights directly accessing data',
    },
    {
        title: 'Custom scoring or "group/bin" events',
    },
    {
        title: 'NPS score, superhuman score calculations',
    },
    {
        title: 'Access JSON, object, list data',
    },
]

export default function HogQL() {
    return (
        <section className="px-5 mb-20 md:mb-0 max-w-6xl mx-auto">
            <h2 className="text-4xl lg:text-5xl mb-4">HogQL</h2>
            <p className="text-lg md:font-semibold opacity-75">
                HogQL is our translation layer over ClickHouse SQL. Use HogQL expressions to use JOINs and subqueries,
                filter event lists, and write complex queries (that aren't supported by the PostHog UI) to analyze data
                in any way you want.
            </p>

            <div className="md:grid grid-cols-2 gap-8 pt-8">
                <div className="mb-8 md:mb-0">
                    <StaticImage
                        src="./images/mission-control-hog.png"
                        alt="A hog standing in front of mission control controls"
                        className="max-w-[494px] md:ml-8"
                    />
                </div>
                <div>
                    <p className="mb-4">
                        <strong>For example...</strong>
                    </p>
                    <ul className="p-0 mb-8 flex flex-col gap-2">
                        {examples.map(({ title, example }) => {
                            return (
                                <li className="list-none relative pl-8" key={title}>
                                    <span className="inline-block w-6 h-6 -rotate-90 absolute top-0 left-0 opacity-60">
                                        <IconChevronDown />
                                    </span>
                                    <p className="m-0 text-base">{title}</p>
                                    {example ? (
                                        <>
                                            <code>{example}</code>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                    <CallToAction to="/blog/introducing-hogql" type="secondary" className="">
                        Learn more about HogQL
                    </CallToAction>
                </div>
            </div>
        </section>
    )
}
