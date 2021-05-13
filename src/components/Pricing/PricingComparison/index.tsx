import React from 'react'

import { Structure } from '../../Structure'

import checkIcon from '../../../images/check.svg'

export const PricingComparison = () => {
    return (
        <div className="pricing-hero text-white text-center">
            <Structure.Section width="4xl" className="py-12">
                <Structure.SectionHeader titleTag="h3" title="Compare PostHog editions" />

                <table className="table">
                    <thead>
                        <tr>
                            <th className="border-0"></th>
                            <th className="bg-gray-100 bg-opacity-10 p-8 rounded-tl border-0">
                                <header className="text-lg">PostHog Cloud</header>
                                <p className="text-xs text-white text-opacity-70">Turnkey hosted solution</p>
                            </th>
                            <th className="bg-gray-100 bg-opacity-10 p-8 rounded-tr border-0">
                                <header className="text-lg">
                                    VPC <span className="opacity-70">(Virtual Private Cloud)</span>
                                </header>
                                <p className="text-xs text-white text-opacity-70">
                                    You host, we manage. User data stays on your servers.
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="bg-gray-100 bg-opacity-10 p-8 rounded-tl rounded-bl border-0">
                                Price per event
                            </th>
                            <td className="bg-gray-100 bg-opacity-20 p-8 border-0">$0.000225/event</td>
                            <td className="bg-gray-100 bg-opacity-20 p-8 border-0">$0.000225/event</td>
                        </tr>

                        <tr>
                            <td className="border-0"></td>
                            <td colSpan={2} className="border-0 bg-gray-100 bg-opacity-10"></td>
                        </tr>

                        <tr className="mt-4">
                            <th className="mt-4 bg-gray-100 bg-opacity-10 p-8 rounded-tl rounded-bl border-0">
                                Benefits
                            </th>
                            <td className="mt-4 bg-gray-100 bg-opacity-20 p-8 border-0">
                                <div className="flex items-center">
                                    <img src={checkIcon} alt="checkmark" className="block mb-0 mr-2 h-4" />
                                    <span className="block">Hosted by PostHog</span>
                                </div>
                                <div className="flex items-center">
                                    <img src={checkIcon} alt="checkmark" className="block mb-0 mr-2 h-4" />
                                    <span className="block">Automatic upgrades</span>
                                </div>
                                <div className="flex items-center">
                                    <img src={checkIcon} alt="checkmark" className="block mb-0 mr-2 h-4" />
                                    <span className="block">Start using immediately</span>
                                </div>
                            </td>
                            <td className="mt-4 bg-gray-100 bg-opacity-20 p-8 border-0">
                                <div className="flex items-center">
                                    <img src={checkIcon} alt="checkmark" className="block mb-0 mr-2 h-4" />
                                    <span className="block">Data stays on your infrastructure</span>
                                </div>
                                <div className="flex items-center">
                                    <img src={checkIcon} alt="checkmark" className="block mb-0 mr-2 h-4" />
                                    <span className="block">Direct database access</span>
                                </div>
                                <div className="flex items-center">
                                    <img src={checkIcon} alt="checkmark" className="block mb-0 mr-2 h-4" />
                                    <span className="block">Cheaper at scale</span>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="border-0"></td>
                            <td colSpan={2} className="border-0 bg-gray-100 bg-opacity-10"></td>
                        </tr>

                        <tr>
                            <th className="bg-gray-100 bg-opacity-10 p-8 rounded-tl rounded-bl border-0">
                                Monthly estimate
                            </th>
                            <td colSpan={2} className="p-8 border-0 bg-gray-100 bg-opacity-20">
                                {/* <PricingSlider /> */}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Structure.Section>
        </div>
    )
}
