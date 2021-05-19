import React from 'react'
import { Fragment } from 'react'
//import { CheckIcon, MinusIcon } from '@heroicons/react/solid'

import { Structure } from '../../Structure'

import checkIcon from '../../../images/check.svg'
import CheckIcon from '../../../images/check.svg'
import MinusIcon from '../../../images/x.svg'

const tiers = [
    {
        name: 'PostHog Cloud',
        href: '#',
        priceMonthly: 9,
        description: 'Quis suspendisse ut fermentum neque vivamus non tellus.',
    },
    {
        name: 'Open source',
        href: '#',
        priceMonthly: 29,
        description: 'Quis eleifend a tincidunt pellentesque. A tempor in sed.',
    },
    {
        name: 'Free',
        href: '#',
        priceMonthly: 59,
        description: 'Orci volutpat ut sed sed neque, dui eget. Quis tristique non.',
    },
    {
        name: 'Scale',
        href: '#',
        priceMonthly: 59,
        description: 'Orci volutpat ut sed sed neque, dui eget. Quis tristique non.',
    },
]
const sections = [
    {
        features: [
            {
                name: 'Plan benefits',
                tiers: { 'PostHog Cloud': true, 'Open source': false, Free: false, Scale: false },
            },
            {
                name: 'Pricing',
                tiers: {
                    'PostHog Cloud': 'Free (up to 1 million events), then $0.000225/event',
                    'Open source': 'Free',
                    Free: 'Free',
                    Scale: '$0.000225/event, $2k/mo minimum. (Discounts after 10 mil events)',
                },
            },
            {
                name: 'Scales to...',
                tiers: {
                    'PostHog Cloud': 'Millions of users/mo',
                    'Open source': '~10k users/mo (limited by database) ',
                    Free: '1 million users/mo',
                    Scale: 'Millions of users/mo',
                },
            },
        ],
    },
    {
        name: 'Instance & deployment',
        features: [
            {
                name: 'Hosting',
                tiers: { 'PostHog Cloud': true, 'Open source': false, Free: false, Scale: false },
            },
            {
                name: 'User data stays on your infrastructure',
                tiers: { 'PostHog Cloud': false, 'Open source': true, Free: true, Scale: true },
            },
            {
                name: 'Initial setup',
                tiers: { 'PostHog Cloud': 'Instant', 'Open source': 'Instant', Free: '1-3 days', Scale: '1-3 days' },
            },
            {
                name: 'Automatic updates',
                tiers: { 'PostHog Cloud': true, 'Open source': false, Free: true, Scale: true },
            },
            {
                name: 'Self-hosting database',
                tiers: { 'PostHog Cloud': 'n/a', 'Open source': 'Postgres', Free: 'ClickHouse', Scale: 'ClickHouse' },
            },
            {
                name: 'Server management',
                tiers: {
                    'PostHog Cloud': 'Managed by PostHog',
                    'Open source': 'Managed by you',
                    Free: 'Managed by you',
                    Scale: 'We help you manage',
                },
            },
        ],
    },
    {
        name: 'Plan allowances',
        features: [
            {
                name: 'Events',
                tiers: {
                    'PostHog Cloud': 'Unlimited',
                    'Open source': 'Unlimited',
                    Free: 'Unlimited',
                    Scale: 'Unlimited',
                },
            },
            {
                name: 'Tracked users',
                tiers: {
                    'PostHog Cloud': 'Unlimited',
                    'Open source': '~10k (limited by database)',
                    Free: '1 million<sup>1</sup>',
                    Scale: 'Unlimited',
                },
            },
            {
                name: 'Projects',
                tiers: { 'PostHog Cloud': 'Multiple', 'Open source': '1', Free: '1', Scale: 'Multiple' },
            },
            {
                name: 'Data retention',
                tiers: {
                    'PostHog Cloud': '7 years',
                    'Open source': 'Unlimited',
                    Free: 'Unlimited',
                    Scale: 'Unlimited',
                },
            },
        ],
    },
    {
        name: 'Product',
        features: [
            {
                name: 'Analytics suite',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Free: true, Scale: true },
            },
            {
                name: 'Session recordings',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Free: true, Scale: true },
            },
            {
                name: 'Feature flags',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Free: true, Scale: true },
            },
            {
                name: 'Plugins',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Free: true, Scale: true },
            },
        ],
    },
    {
        name: 'Platform',
        features: [
            {
                name: 'Team members',
                tiers: { 'PostHog Cloud': 'Unlimited', 'Open source': 'Unlimited', Free: '3', Scale: 'Unlimited' },
            },
            {
                name: 'SSO',
                tiers: { 'PostHog Cloud': 'Limited (??)', 'Open source': false, Free: false, Scale: true },
            },
            {
                name: 'API access',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Free: true, Scale: true },
            },
            {
                name: 'User permissions',
                tiers: { 'PostHog Cloud': true, 'Open source': false, Free: false, Scale: true },
            },
            {
                name: 'Ad blocker-resistant',
                tiers: { 'PostHog Cloud': false, 'Open source': true, Free: true, Scale: true },
            },
            {
                name: 'HIPAA, SOC2 compliant',
                tiers: { 'PostHog Cloud': false, 'Open source': '??', Free: '??', Scale: true },
            },
            {
                name: 'Uptime & scalability SLAs',
                tiers: { 'PostHog Cloud': '??', 'Open source': 'n/a', Free: '??', Scale: true },
            },
        ],
    },
    {
        name: 'Integrations',
        features: [
            {
                name: 'Slack',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Free: true, Scale: true },
            },
            {
                name: 'Teams',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Free: true, Scale: true },
            },
            {
                name: 'Discord',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Free: true, Scale: true },
            },
            {
                name: 'Zapier',
                tiers: { 'PostHog Cloud': true, 'Open source': false, Free: '??', Scale: true },
            },
        ],
    },
    {
        name: 'Support',
        features: [
            {
                name: 'Slack (commnunity)',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Free: true, Scale: true },
            },
            {
                name: 'Slack (dedicated channel)',
                tiers: { 'PostHog Cloud': false, 'Open source': false, Free: false, Scale: true },
            },
            {
                name: 'Account manager',
                tiers: { 'PostHog Cloud': false, 'Open source': false, Free: false, Scale: true },
            },
            {
                name: 'Email',
                tiers: { 'PostHog Cloud': true, 'Open source': false, Free: true, Scale: true },
            },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const PlanComparison = () => {
    return (
        <div className="max-w-7xl mx-auto bg-royal-blue bg-opacity-50 py-8 rounded-lg sm:py-8 sm:px-6 lg:px-8">
            {/* xs to lg */}
            <div className="max-w-2xl mx-auto space-y-16 lg:hidden">
                {tiers.map((tier, tierIdx) => (
                    <section key={tier.name}>
                        <div className="px-4 mb-8">
                            <h2 className="text-lg leading-6 font-medium text-white text-opacity-50">{tier.name}</h2>
                            <p className="mt-4">
                                <span className="text-4xl font-extrabold text-white text-opacity-50">
                                    ${tier.priceMonthly}
                                </span>{' '}
                                <span className="text-base font-medium text-gray-500">/mo</span>
                            </p>
                            <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                            <a
                                href={tier.href}
                                className="mt-6 block border border-gray-800 rounded-md bg-gray-800 w-full py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                            >
                                Buy {tier.name}
                            </a>
                        </div>

                        {sections.map((section) => (
                            <table key={section.name} className="w-full">
                                <caption className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-white text-opacity-50 text-center">
                                    {section.name}
                                </caption>
                                <thead>
                                    <tr>
                                        <th className="sr-only" scope="col">
                                            Feature
                                        </th>
                                        <th className="sr-only" scope="col">
                                            Included
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {section.features.map((feature) => (
                                        <tr key={feature.name} className="border-t border-gray-200">
                                            <th
                                                className="py-5 px-4 text-sm font-normal text-gray-500 text-center border-white border-opacity-10"
                                                scope="row"
                                            >
                                                {feature.name}
                                            </th>
                                            <td className="py-5 pr-4">
                                                {typeof feature.tiers[tier.name] === 'string' ? (
                                                    <span className="block text-sm text-white text-opacity-75 text-right">
                                                        {feature.tiers[tier.name]}
                                                    </span>
                                                ) : (
                                                    <>
                                                        {feature.tiers[tier.name] === true ? (
                                                            <img
                                                                src={CheckIcon}
                                                                alt="Checked"
                                                                width="18"
                                                                height="18"
                                                                className="m-auto h-5 w-5 text-green-500"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <img
                                                                src={MinusIcon}
                                                                alt="Checked"
                                                                width="18"
                                                                height="18"
                                                                className="m-auto h-5 w-5 text-red-500"
                                                                aria-hidden="true"
                                                            />
                                                        )}

                                                        <span className="sr-only">
                                                            {feature.tiers[tier.name] === true ? 'Yes' : 'No'}
                                                        </span>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ))}

                        <div
                            className={classNames(
                                tierIdx < tiers.length - 1 ? 'py-5 border-b' : 'pt-5',
                                'border-t border-gray-200 px-4'
                            )}
                        >
                            <a
                                href={tier.href}
                                className="block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                            >
                                Buy {tier.name}
                            </a>
                        </div>
                    </section>
                ))}
            </div>

            {/* lg+ */}
            <div className="hidden lg:block">
                <table className="w-full h-px table-fixed">
                    <caption className="sr-only">Pricing plan comparison</caption>
                    <thead>
                        <tr>
                            <th
                                className="pb-4 px-6 text-sm font-medium text-white text-opacity-50 text-center border-white border-opacity-10"
                                scope="col"
                            >
                                <span className="sr-only">Feature by</span>
                                <span>Plans</span>
                            </th>
                            {tiers.map((tier) => (
                                <th
                                    key={tier.name}
                                    className="w-1/5 pb-4 px-6 text-lg leading-6 font-medium text-white text-opacity-50 text-center border-white border-opacity-10"
                                    scope="col"
                                >
                                    {tier.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="border-t border-gray-200 divide-y divide-gray-200">
                        <tr>
                            <th
                                className="py-8 px-6 text-sm font-medium text-white text-opacity-50 text-center align-top border-white border-opacity-10"
                                scope="row"
                            >
                                Pricing
                            </th>
                            {tiers.map((tier) => (
                                <td
                                    key={tier.name}
                                    className="h-full py-8 px-6 align-top border-white border-opacity-10"
                                >
                                    <div className="relative h-full table">
                                        <p>
                                            <span className="text-4xl font-extrabold text-white text-opacity-50">
                                                ${tier.priceMonthly}
                                            </span>{' '}
                                            <span className="text-base font-medium text-gray-500">/mo</span>
                                        </p>
                                        <p className="mt-4 mb-16 text-sm text-gray-500">{tier.description}</p>
                                        <a
                                            href={tier.href}
                                            className="absolute bottom-0 flex-grow block w-full bg-gray-800 border border-gray-800 rounded-md 5 py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                                        >
                                            Buy {tier.name}
                                        </a>
                                    </div>
                                </td>
                            ))}
                        </tr>
                        {sections.map((section) => (
                            <Fragment key={section.name}>
                                <tr>
                                    <th
                                        className="bg-transparent pt-6 pb-3 pl-6 text-sm font-bold text-white border-white border-opacity-10"
                                        colSpan={5}
                                        scope="colgroup"
                                        style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
                                    >
                                        {section.name}
                                    </th>
                                </tr>
                                {section.features.map((feature) => (
                                    <tr key={feature.name}>
                                        <th
                                            className="py-5 px-6 text-sm font-bold text-white text-left border-white border-opacity-10"
                                            scope="row"
                                        >
                                            {feature.name}
                                        </th>
                                        {tiers.map((tier) => (
                                            <td key={tier.name} className="py-5 px-6 border-white border-opacity-10">
                                                {typeof feature.tiers[tier.name] === 'string' ? (
                                                    <span className="block text-sm text-center text-white text-opacity-75">
                                                        {feature.tiers[tier.name]}
                                                    </span>
                                                ) : (
                                                    <>
                                                        {feature.tiers[tier.name] === true ? (
                                                            <img
                                                                src={CheckIcon}
                                                                alt="Checked"
                                                                width="18"
                                                                height="18"
                                                                className="m-auto h-5 w-5 text-green-500"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <img
                                                                src={MinusIcon}
                                                                alt="Checked"
                                                                width="18"
                                                                height="18"
                                                                className="m-auto h-5 w-5 text-red-500"
                                                                aria-hidden="true"
                                                            />
                                                        )}

                                                        <span className="sr-only">
                                                            {feature.tiers[tier.name] === true
                                                                ? 'Included'
                                                                : 'Not included'}{' '}
                                                            in {tier.name}
                                                        </span>
                                                    </>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </Fragment>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="border-t border-gray-200">
                            <th className="sr-only" scope="row">
                                Choose your plan
                            </th>
                            {tiers.map((tier) => (
                                <td key={tier.name} className="pt-5 px-6">
                                    <a
                                        href={tier.href}
                                        className="block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                                    >
                                        Buy {tier.name}
                                    </a>
                                </td>
                            ))}
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}
