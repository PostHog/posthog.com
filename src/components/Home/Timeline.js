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
            allSqueakRoadmap(filter: { milestone: { eq: true } }, sort: { fields: dateCompleted }) {
                nodes {
                    dateCompleted(formatString: "YYYY-MM-DD")
                    title
                    projectedCompletion(formatString: "YYYY-MM-DD")
                    category
                }
            }
        }
    `)

    const pastEvents = groupBy(
        nodes.filter((node) => {
            const date = node.dateCompleted || node.projectedCompletion
            return date && new Date(date) < new Date()
        }),
        (node) => {
            const date = new Date(node.dateCompleted || node.projectedCompletion)
            return date.getUTCFullYear()
        }
    )
    const futureEvents = groupBy(
        nodes.filter((node) => {
            const date = node.dateCompleted || node.projectedCompletion
            return date && new Date(date) > new Date()
        }),
        (node) => {
            const date = new Date(node.dateCompleted || node.projectedCompletion)
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

            <div className="-mx-4 px-4 overflow-x-auto flex flex-nowrap gap-4">
                {Object.keys(pastEvents).map((year) => {
                    const pastMonths = groupBy(pastEvents[year], (node) => {
                        const date = new Date(node.dateCompleted || node.projectedCompletion)
                        return months[date.getUTCMonth()]
                    })
                    const futureQuarters = groupBy(futureEvents[year], (node) => {
                        const date = node.dateCompleted || node.projectedCompletion
                        return Math.floor(new Date(date).getUTCMonth() / 3 + 1)
                    })
                    return (
                        <div key={year} className="w-[90vw] shrink-0 mb-4">
                            <h4 className="text-2xl py-1 font-bold text-center">{year}</h4>
                            <div className="p-4 bg-white dark:bg-dark border border-light dark:border-dark">
                                <ul role="list" className="py-1 px-0 grid grid-cols-4 gap-4">
                                    {Object.keys(pastMonths).map((month) => {
                                        return (
                                            <li
                                                key={month}
                                                className="timeline-entry bg-accent dark:bg-accent-dark list-none px-4 pb-4 text-center min-h-[10rem]"
                                            >
                                                <p className="text-lg font-bold border-b border-light dark:border-dark capitalize py-2 mb-2">
                                                    {month}
                                                </p>
                                                <ul className="m-0 p-0">
                                                    {pastMonths[month].map(({ title, category }) => {
                                                        return (
                                                            <li
                                                                key={title}
                                                                className="relative list-none text-sm text-left pl-4 content-none before:inline-block before:absolute before:w-[10px] before:h-[10px] before:left-0 before:top-[5px] before:rounded-full before:mr-2 mt-1 first:mt-0"
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
                                                className="timeline-entry list-none bg-accent dark:bg-accent-dark px-4 pb-4"
                                            >
                                                <p className="text-2xl font-bold border-b border-light dark:border-dark capitalize py-2 mb-2">
                                                    Q{quarter}
                                                </p>
                                                <ul className="list-none m-0 p-0">
                                                    {futureQuarters[quarter].map(({ title, category }) => {
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
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
