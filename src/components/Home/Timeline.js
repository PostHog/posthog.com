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

const calendar = {
    year2020: [
        { month: 'jan', type: 'news', name: 'PostHog joins YC W20 batch' },
        { month: 'feb', type: 'news', name: 'Launched open source analytics on HackerNews' },
        { month: 'mar', type: 'milestone', name: '1,000 stars on GitHub' },
        { month: 'apr', type: 'feature', name: 'iOS, Android libraries' },
        { month: 'may', type: 'feature', name: 'React native library' },
        { month: 'jun', type: 'feature', name: 'Feature flags' },
        { month: ' ', type: 'feature', name: 'Heatmaps' },
        { month: 'jul', type: 'feature', name: 'Segment destination' },
        { month: 'aug', type: 'milestone', name: '3,000 stars on GitHub' },
        { month: 'sep', type: '', name: '' },
        { month: 'oct', type: 'feature', name: 'ClickHouse support' },
        { month: 'nov', type: 'feature', name: 'Session recording' },
        { month: 'dec', type: 'feature', name: 'Lifecycle analysis' },
    ],
    year2021: [
        { month: 'jan', type: 'feature', name: 'Plugins' },
        { month: 'feb', type: '', name: '' },
        { month: 'mar', type: '', name: '' },
        { month: 'apr', type: '', name: '' },
        { month: 'may', type: '', name: '' },
        { month: 'jun', type: 'feature', name: 'Multivariate testing' },
        { month: 'jul', type: '', name: '' },
        { month: 'aug', type: '', name: '' },
        { month: 'sep', type: '', name: '' },
        { month: 'oct', type: '', name: '' },
        { month: 'nov', type: '', name: '' },
        { month: 'dec', type: '', name: '' },
    ],
    year2022: [
        { month: 'jan', type: '', name: '' },
        { month: 'feb', type: '', name: '' },
        { month: 'mar', type: '', name: '' },
        { month: 'apr', type: '', name: '' },
        { month: 'may', type: '', name: '' },
        { month: 'jun', type: '', name: '' },
        { month: 'jul', type: '', name: '' },
        { month: 'aug', type: '', name: '' },
        { month: 'sep', type: '', name: '' },
        { month: 'oct', type: '', name: '' },
        { month: 'nov', type: '', name: '' },
        { month: 'dec', type: '', name: '' },
    ],
}

export default function Timeline() {
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
                <div className="w-full max-w-md mx-auto lg:max-w-auto mb-4 lg:mb-0">
                    <h4 className="text-lg font-bold text-center">2020</h4>
                    <div className="bg-gray-accent-light px-4 rounded">
                        <ul role="list" className="pt-1 px-0 pb-4">
                            {calendar.year2020.map((item) => (
                                <li
                                    key={item.name}
                                    className="timeline-entry list-none border-gray-accent-light border-dashed border-b last:border-none flex py-2 gap-3 items-center"
                                >
                                    <div className="text-[14px] text-gray capitalize" style={{ flex: '0 0 40px' }}>
                                        {item.month}
                                    </div>
                                    <div
                                        className="flex-auto relative text-[14px] pl-4 content-none before:inline-block before:absolute before:w-[10px] before:h-[10px] before:left-0 before:top-[5px] before:rounded-full before:mr-2"
                                        data-type={item.type}
                                    >
                                        {item.name}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="w-full max-w-md mx-auto lg:max-w-auto mb-4 lg:mb-0">
                    <h4 className="text-lg font-bold text-center">2021</h4>
                    <div className="bg-gray-accent-light px-4 rounded">
                        <ul role="list" className="pt-1 px-0 pb-4">
                            {calendar.year2021.map((item) => (
                                <li
                                    key={item.name}
                                    className="timeline-entry list-none border-gray-accent-light border-dashed border-b last:border-none flex py-2 gap-3 items-center"
                                >
                                    <div className="text-[14px] text-gray capitalize" style={{ flex: '0 0 40px' }}>
                                        {item.month}
                                    </div>
                                    <div
                                        className="flex-auto relative text-[14px] pl-4 content-none before:inline-block before:absolute before:w-[10px] before:h-[10px] before:left-0 before:top-[5px] before:rounded-full before:mr-2"
                                        data-type={item.type}
                                    >
                                        {item.name}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="w-full max-w-md mx-auto lg:max-w-auto mb-4 lg:mb-0">
                    <h4 className="text-lg font-bold text-center">2022</h4>
                    <div className="bg-gray-accent-light px-4 rounded">
                        <ul role="list" className="pt-1 px-0 pb-4">
                            {calendar.year2022.map((item) => (
                                <li
                                    key={item.name}
                                    className="timeline-entry list-none border-gray-accent-light border-dashed border-b last:border-none flex py-2 gap-3 items-center"
                                >
                                    <div className="text-[14px] text-gray capitalize" style={{ flex: '0 0 40px' }}>
                                        {item.month}
                                    </div>
                                    <div
                                        className="flex-auto relative text-[14px] pl-4 content-none before:inline-block before:absolute before:w-[10px] before:h-[10px] before:left-0 before:top-[5px] before:rounded-full before:mr-2"
                                        data-type={item.type}
                                    >
                                        {item.name}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
