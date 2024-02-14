import { graphql, useStaticQuery } from 'gatsby'
import { heading } from './classes'
import groupBy from 'lodash.groupby'
import React, { useEffect, useRef, useState } from 'react'
import { IconChevronDown } from '@posthog/icons'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const categories = {
    'Major new feature': 'feature',
    'Company news': 'news',
    'Something cool happened': 'milestone',
}

export const Items = ({ items }) => {
    const ref = useRef(null)
    const [isOverflowing, setIsOverflowing] = useState(false)

    useEffect(() => {
        setIsOverflowing(ref?.current?.scrollHeight > ref?.current?.getBoundingClientRect()?.height)
    }, [])

    return (
        <div
            className={`relative ${
                isOverflowing
                    ? 'after:absolute after:h-[30px] after:w-full after:bottom-0 after:left-0 after:bg-gradient-to-t after:from-accent dark:after:from-accent-dark after:to-transparent'
                    : ''
            }`}
        >
            <ul ref={ref} className={`m-0 p-0 h-[110px] overflow-auto ${isOverflowing ? 'pb-[30px]' : ''}`}>
                {items?.map(({ title, category, cta }) => {
                    return (
                        <li
                            key={title}
                            className="relative list-none text-sm text-left pl-4 content-none before:inline-block before:absolute before:w-[10px] before:h-[10px] before:left-0 before:top-[5px] before:rounded-full before:mr-2 mt-1 first:mt-0"
                            data-type={categories[category]}
                        >
                            {cta ? (
                                <a href={cta.url} className="hover:underline">
                                    {title}
                                </a>
                            ) : (
                                title
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default function Timeline() {
    const breakpoints = useBreakpoint()
    const listRef = useRef(null)
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
                    cta {
                        url
                    }
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

    useEffect(() => {
        listRef?.current?.scrollBy({ left: listRef?.current?.scrollWidth })
    }, [])

    return (
        <section className="px-4 mb-12 md:mb-20 overflow-hidden">
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
            <div className="relative -mx-4 pr-4">
                <div className="md:block hidden absolute z-20 top-1/2 left-0 -translate-y-1/2">
                    <button
                        onClick={() => listRef?.current?.scrollBy({ left: -50, behavior: 'smooth' })}
                        className="relative hover:scale-[1.01] hover:top-[-1px] active:top-[.5px] active:scale-[.99] md:z-30 p-8"
                    >
                        <IconChevronDown className="w-12 h-12 rounded-sm text-primary/60 hover:text-primary/100 dark:text-primary-dark/60 dark:hover:text-primary-dark/100 hover:bg-accent/25 dark:hover:bg-accent-dark/25 hover:backdrop-blur-sm active:backdrop-blur-sm border-transparent hover:border hover:border-light dark:hover:border-dark rotate-90" />
                    </button>
                </div>
                <div
                    ref={listRef}
                    className="-mr-4 px-4 md:px-16 snap-x snap-mandatory flex flex-nowrap gap-4 overflow-auto relative"
                >
                    {Object.keys(pastEvents).map((year, index) => {
                        const pastMonths = groupBy(pastEvents[year], (node) => {
                            const date = new Date(node.dateCompleted || node.projectedCompletion)
                            return months[date.getUTCMonth()]
                        })
                        const futureQuarters = groupBy(futureEvents[year], (node) => {
                            const date = node.dateCompleted || node.projectedCompletion
                            return Math.floor(new Date(date).getUTCMonth() / 3 + 1)
                        })
                        return (
                            <div key={year} className="w-[80vw] md:w-[90vw] max-w-5xl shrink-0 mb-4 snap-center">
                                <h4 className="text-2xl py-1 font-bold text-center">{year}</h4>
                                <div className="p-4 bg-white dark:bg-dark border border-light dark:border-dark sm:h-auto h-96 overflow-auto snap-x">
                                    <ul role="list" className="py-1 px-0 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                                        {months.map((month) => {
                                            const items = pastMonths[month]
                                            if (breakpoints.sm && !items) return null
                                            return (
                                                <li
                                                    key={month}
                                                    className="timeline-entry bg-accent dark:bg-accent-dark list-none px-4 pb-4 text-center min-h-[6rem] md:min-h-[8rem] lg:min-h-[10rem]"
                                                >
                                                    <p
                                                        className={`text-lg font-bold border-b border-light dark:border-dark capitalize py-2 mb-2`}
                                                    >
                                                        {month}
                                                    </p>
                                                    <Items items={items} />
                                                </li>
                                            )
                                        })}
                                        {Object.keys(futureQuarters).map((quarter) => {
                                            return (
                                                <li
                                                    key={quarter}
                                                    className="timeline-entry list-none bg-accent dark:bg-accent-dark px-4 pb-4"
                                                >
                                                    <p className="text-lg font-bold border-b border-light dark:border-dark capitalize py-2 mb-2 text-center">
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
                <div className="absolute top-1/2 right-0 -translate-y-1/2">
                    <button
                        onClick={() => listRef?.current?.scrollBy({ left: 50, behavior: 'smooth' })}
                        className="md:block hidden relative hover:scale-[1.01] hover:top-[-1px] active:top-[.5px] active:scale-[.99] md:z-30 p-8"
                    >
                        <IconChevronDown className="w-12 h-12 rounded-sm text-primary/60 hover:text-primary/100 dark:text-primary-dark/60 dark:hover:text-primary-dark/100 hover:bg-accent/25 dark:hover:bg-accent-dark/25 hover:backdrop-blur-sm active:backdrop-blur-sm border-transparent hover:border hover:border-light dark:hover:border-dark -rotate-90" />
                    </button>
                </div>
            </div>
        </section>
    )
}
