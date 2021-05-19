import React from 'react'

import { Structure } from '../../Structure'

import checkIcon from '../../../images/check.svg'

export const CloudVsSelfHost = () => {
    return (
        <div className="pricing-hero text-white text-center">
            <Structure.Section width="4xl" className="py-12">
                <h3 className="text-center text-white">PostHog Cloud vs. self-hosting</h3>
                <div className="bg-deep-blue bg-opacity-20 border border-white border-opacity-10 py-4 px-10 mx-auto mt-4 mb-10 max-w-4xl rounded-lg items-baseline text-left text-white">
                    <dl className="flex flex-col md:flex-row flex-wrap">
                        <dt style={{ flex: '0 0 33%' }}>
                            <h4>PostHog Cloud</h4>
                        </dt>
                        <dd className="text-base" style={{ flexBasis: '67%' }}>
                            <strong className="block mb-2 pt-2">Hosted and managed by PostHog.</strong>
                            Start using immediately and receive automatic upgrades as we release new features.
                        </dd>
                        <dt style={{ flex: '0 0 33%' }}>
                            <h4>Self-hosting</h4>
                        </dt>
                        <dd className="text-base mb-0" style={{ flexBasis: '67%' }}>
                            <strong className="block mb-2 pt-2">User data stays on your infrastructure.</strong>
                            Get full access to your production instance. This is a great option if you’re concerned
                            missing customer data due to browser privacy features, ad blockers or third-party cookies.
                        </dd>
                    </dl>
                </div>
            </Structure.Section>
        </div>
    )
}
