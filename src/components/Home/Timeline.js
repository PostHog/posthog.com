import { graphql, useStaticQuery } from 'gatsby'
import groupBy from 'lodash.groupby'
import React from 'react'

// Until this gets refactored...
//
// Month: Only set for first result that month (so we don't repeat )
// Types: feature   | something new in the product
//        news      | company announcements
//        milestone | github star count, fundraising round, hosted event, etc
// Name: Short description
//
// - Leave (at least) one entry for each month
// - For multiple events in a month, leave off the month after the first result (so it doesn't look like multiple months) - until someone build this correctly =]
//

export default function Timeline() {
    const {
        allTimelineJson: { nodes },
    } = useStaticQuery(graphql`
        query {
            allTimelineJson {
                nodes {
                    year: date(formatString: "YYYY")
                    month: date(formatString: "MMM")
                    description
                    type
                }
            }
        }
    `)

    const events = groupBy(nodes, ({ year }) => year)

    return (
        <section className="px-4">
            <h2 className="text-center">We're just getting started</h2>
            <p className="my-6 mx-auto text-center text-base md:text-xl font-semibold mt-2 lg:mt-4 text-primary max-w-2xl opacity-75">
                We've shipped a lot in just a couple years. Because our talent compounds, this will continue to increase
                exponentially.
            </p>

            <div className="text-center flex justify-center pb-12 space-x-6">
                <div className="flex items-center text-[15px]">
                    <span className="block w-[10px] h-[10px] rounded-full mr-1 bg-[#43AF79]"></span>
                    <div>New feature</div>
                </div>
                <div className="flex items-center text-[15px]">
                    <span className="block w-[10px] h-[10px] rounded-full mr-1 bg-[#0080FF]"></span>
                    <div>Company news</div>
                </div>
                <div className="flex items-center text-[15px]">
                    <span className="block w-[10px] h-[10px] rounded-full mr-1 bg-[#C849F4]"></span>
                    <div>Milestone</div>
                </div>
            </div>

            <div className="max-w-screen-2xl mx-auto mdlg:grid grid-cols-3 gap-8 space-2 lg:space-4">
                {Object.keys(events).map((year) => {
                    const months = groupBy(events[year], (event) => event.month)
                    return (
                        <div key={year} className="w-full max-w-md mx-auto lg:max-w-auto mb-4 lg:mb-0">
                            <h4 className="text-lg font-bold text-center">{year}</h4>
                            <div className="bg-gray-accent-light px-4 rounded">
                                <ul role="list" className="py-1 px-0">
                                    {Object.keys(months).map((month) => {
                                        return (
                                            <li
                                                key={month}
                                                className="timeline-entry list-none border-gray-accent-light border-dashed border-b last:border-none flex py-2 gap-3 items-start"
                                            >
                                                <p className="text-[14px] text-gray capitalize w-[30px] flex-shrink-0 m-0">
                                                    {month}
                                                </p>
                                                <ul className="list-none m-0 p-0">
                                                    {months[month].map(({ description, type }) => {
                                                        return (
                                                            <li
                                                                key={description}
                                                                className="flex-auto relative text-[14px] pl-4 content-none before:inline-block before:absolute before:w-[10px] before:h-[10px] before:left-0 before:top-[5px] before:rounded-full before:mr-2 even:mt-1"
                                                                data-type={type}
                                                            >
                                                                {description}
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
