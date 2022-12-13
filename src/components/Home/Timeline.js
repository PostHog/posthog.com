import { CallToAction } from 'components/CallToAction'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import { heading, section } from './classes'
import groupBy from 'lodash.groupby'
import React from 'react'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const categories = {
    'Major new feature': 'feature',
    'Company news': 'news',
    'Something cool happened': 'milestone',
}

export default function Timeline() {
    const {
        allSqueakRoadmap: { nodes },
    } = useStaticQuery(graphql`
        query {
            allSqueakRoadmap(filter: { milestone: { eq: true } }, sort: { fields: date_completed }) {
                nodes {
                    date_completed(formatString: "YYYY-MM-DD")
                    title
                    projected_completion_date(formatString: "YYYY-MM-DD")
                    category
                }
            }
        }
    `)

    const pastEvents = groupBy(
        nodes.filter((node) => {
            const date = node.date_completed || node.projected_completion_date
            return date && new Date(date) < new Date()
        }),
        (node) => {
            const date = new Date(node.date_completed || node.projected_completion_date)
            return date.getUTCFullYear()
        }
    )
    const futureEvents = groupBy(
        nodes.filter((node) => {
            const date = node.date_completed || node.projected_completion_date
            return date && new Date(date) > new Date()
        }),
        (node) => {
            const date = new Date(node.date_completed || node.projected_completion_date)
            return date.getUTCFullYear()
        }
    )

    return (
        <section className="px-4 mb-12 md:mb-20">
            <h2 className={heading()}>
                We ship <br className="sm:hidden" />
                <span className="text-orange">weirdly fast</span>
            </h2>
            <h3 className={heading('sm')}>(How else could we have done all this?)</h3>

            <div className="text-center py-8 md:pb-12">
                <div className="inline-flex flex-col md:flex-row gap-y-2 md:gap-x-6">
                    <div className="flex items-center text-[15px] text-left gap-2">
                        <span className="block w-[10px] h-[10px] rounded-full bg-[#43AF79]"></span>
                        <div>Major new feature</div>
                    </div>
                    <div className="flex items-center text-[15px] text-left gap-2">
                        <span className="block w-[10px] h-[10px] rounded-full bg-[#0080FF]"></span>
                        <div>Company news</div>
                    </div>
                    <div className="flex items-center text-[15px] text-left gap-2">
                        <span className="block w-[10px] h-[10px] rounded-full bg-[#C849F4]"></span>
                        <div>Something cool happened</div>
                    </div>
                </div>
            </div>

            <div className="max-w-screen-2xl mx-auto mdlg:grid grid-cols-3 shadow-xl">
                {Object.keys(pastEvents).map((year) => {
                    const pastMonths = groupBy(pastEvents[year], (node) => {
                        const date = new Date(node.date_completed || node.projected_completion_date)
                        return months[date.getUTCMonth()]
                    })
                    const futureQuarters = groupBy(futureEvents[year], (node) => {
                        const date = node.date_completed || node.projected_completion_date
                        return Math.floor(new Date(date).getUTCMonth() / 3 + 1)
                    })
                    return (
                        <div
                            key={year}
                            className="bg-white rounded w-full mb-4 lg:mb-0 border-gray-accent-light border-dashed border-r last:border-r-0"
                        >
                            <h4 className="text-base py-1 font-bold text-center bg-gray-accent-light ">{year}</h4>
                            <div className="px-8">
                                <ul role="list" className="py-1 px-0">
                                    {Object.keys(pastMonths).map((month) => {
                                        return (
                                            <li
                                                key={month}
                                                className="timeline-entry list-none border-gray-accent-light/50 border-solid border-b last:border-none flex py-2 gap-3 items-start"
                                            >
                                                <p className="text-[14px] text-gray capitalize w-[30px] flex-shrink-0 m-0">
                                                    {month}
                                                </p>
                                                <ul className="list-none m-0 p-0">
                                                    {pastMonths[month].map(({ title, category }) => {
                                                        return (
                                                            <li
                                                                key={title}
                                                                className="flex-auto relative text-[14px] text-left pl-4 content-none before:inline-block before:absolute before:w-[10px] before:h-[10px] before:left-0 before:top-[5px] before:rounded-full before:mr-2 mt-1 first:mt-0"
                                                                data-type={categories[category]}
                                                            >
                                                                {title}
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </li>
                                        )
                                    })}
                                    {Object.keys(futureQuarters).map((quarter) => {
                                        return (
                                            <li
                                                key={quarter}
                                                className="timeline-entry list-none  flex py-2 gap-3 items-start"
                                            >
                                                <p className="text-[14px] text-gray capitalize w-[30px] flex-shrink-0 m-0">
                                                    Q{quarter}
                                                </p>
                                                <ul className="list-none m-0 p-0">
                                                    {futureQuarters[quarter].map(({ title, category }) => {
                                                        return (
                                                            <li
                                                                key={title}
                                                                className="flex-auto relative text-[14px] text-left pl-4 text-gray content-none before:inline-block before:absolute before:w-[10px] before:h-[10px] before:left-0 before:top-[5px] before:rounded-full before:mr-2 mt-1 first:mt-0"
                                                                data-type={categories[category]}
                                                            >
                                                                {title}
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
