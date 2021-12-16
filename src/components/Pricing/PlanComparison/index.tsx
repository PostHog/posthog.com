import { CallToAction } from 'components/CallToAction'
import React, { Fragment, useState } from 'react'
import CheckIcon from '../../../images/check.svg'
import MinusIcon from '../../../images/x.svg'
import './styles/index.scss'

const tiers = [
    {
        name: 'Open source',
        href: '#',
        priceMonthly: 29,
        description: 'Quis eleifend a tincidunt pellentesque. A tempor in sed.',
    },
    {
        name: 'Scale',
        href: '#',
        priceMonthly: 59,
        description: 'Orci volutpat ut sed sed neque, dui eget. Quis tristique non.',
    },
    {
        name: 'Enterprise',
        href: '#',
        priceMonthly: 59,
        description: 'Orci volutpat ut sed sed neque, dui eget. Quis tristique non.',
    },
    {
        name: 'PostHog Cloud',
        href: '#',
        priceMonthly: 9,
        description: 'Quis suspendisse ut fermentum neque vivamus non tellus.',
    },
]
const sections = [
    {
        features: [
            {
                name: 'Plan benefits',
                tiers: {
                    'PostHog Cloud': 'Scales as needed, Constant price',
                    'Open source': 'Great for small teams',
                    Scale: 'Power analytics features, basic permissioning and priority support',
                    Enterprise: 'Advanced permissioning and data controls',
                },
            },
            {
                name: 'Pricing',
                tiers: {
                    'PostHog Cloud': 'Free (up to 1 million events), then $0.000225/event',
                    'Open source': 'Free',
                    Scale: '$0.000225/event, $1.5k/mo minimum. (Discounts after 10 mil events)',
                    Enterprise: 'Contact us',
                },
            },
            {
                name: 'Scales to...',
                tiers: {
                    'PostHog Cloud': 'Millions of users/mo',
                    'Open source': '~1m users/mo',
                    Scale: 'Millions of users/mo',
                    Enterprise: 'Millions of users/mo',
                },
            },
        ],
    },
    {
        name: 'Instance & deployment',
        features: [
            {
                name: 'Hosting',
                tiers: { 'PostHog Cloud': true, 'Open source': false, Scale: false, Enterprise: false },
            },
            {
                name: 'User data stays on your infrastructure',
                tiers: { 'PostHog Cloud': false, 'Open source': true, Scale: true, Enterprise: false },
            },
            {
                name: 'Initial setup',
                tiers: {
                    'PostHog Cloud': 'Instant',
                    'Open source': 'Instant',
                    Scale: '1-3 days',
                    Enterprise: '1-3 days',
                },
            },
            {
                name: 'Updates on schedule',
                tiers: { 'PostHog Cloud': true, 'Open source': false, Scale: true, Enterprise: true },
            },
            {
                name: 'Server management',
                tiers: {
                    'PostHog Cloud': 'Managed by PostHog',
                    'Open source': 'Managed by you',
                    Scale: 'We help you manage',
                    Enterprise: 'We help you manage',
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
                    Scale: 'Unlimited',
                    Enterprise: 'Unlimited',
                },
            },
            {
                name: 'Tracked users',
                tiers: {
                    'PostHog Cloud': 'Unlimited',
                    'Open source': '~1m (limited by database)',
                    Scale: 'Unlimited',
                    Enterprise: 'Unlimited',
                },
            },
            {
                name: 'Projects',
                tiers: { 'PostHog Cloud': 'Multiple', 'Open source': '1', Scale: 'Multiple', Enterprise: 'Multiple' },
            },
            {
                name: 'Data retention',
                tiers: {
                    'PostHog Cloud': '7 years',
                    'Open source': 'Unlimited',
                    Scale: 'Unlimited',
                    Enterprise: 'Unlimited',
                },
            },
        ],
    },
    {
        name: 'Product',
        features: [
            {
                name: 'Analytics suite',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Scale: true, Enterprise: true },
            },
            {
                name: 'Session Recording',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Scale: true, Enterprise: true },
            },
            {
                name: 'Feature Flags',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Scale: true, Enterprise: true },
            },
            {
                name: 'Plugins',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Scale: true, Enterprise: true },
            },
        ],
    },
    {
        name: 'Advanced features',
        features: [
            {
                name: 'Correlation Analysis',
                tiers: { 'PostHog Cloud': true, 'Open source': false, Scale: true, Enterprise: true },
            },
            {
                name: 'Group Analytics',
                tiers: { 'PostHog Cloud': true, 'Open source': false, Scale: true, Enterprise: true },
            },
            {
                name: 'Multivariate testing',
                tiers: { 'PostHog Cloud': true, 'Open source': false, Scale: true, Enterprise: true },
            },
        ],
    },
    {
        name: 'Platform',
        features: [
            {
                name: 'Team members',
                tiers: {
                    'PostHog Cloud': 'Unlimited',
                    'Open source': 'Unlimited',
                    Scale: 'Unlimited',
                    Enterprise: 'Unlimited',
                },
            },
            {
                name: 'SSO/SAML',
                tiers: { 'PostHog Cloud': true, 'Open source': false, Scale: false, Enterprise: true },
            },
            {
                name: 'API access',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Scale: true, Enterprise: true },
            },
            {
                name: 'User permissions',
                tiers: { 'PostHog Cloud': true, 'Open source': false, Scale: true, Enterprise: true },
            },
            {
                name: 'Advanced user permissions',
                tiers: { 'PostHog Cloud': false, 'Open source': false, Scale: false, Enterprise: true },
            },
            {
                name: 'Ad blocker-resistant',
                tiers: { 'PostHog Cloud': false, 'Open source': true, Scale: true, Enterprise: true },
            },
            {
                name: 'Backup configuration',
                tiers: { 'PostHog Cloud': false, 'Open source': false, Scale: false, Enterprise: true },
            },
        ],
    },
    {
        name: 'Integrations',
        features: [
            {
                name: 'Slack',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Scale: true, Enterprise: true },
            },
            {
                name: 'Microsoft Teams',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Scale: true, Enterprise: true },
            },
            {
                name: 'Discord',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Scale: true, Enterprise: true },
            },
            {
                name: 'Zapier',
                tiers: { 'PostHog Cloud': true, 'Open source': false, Scale: true, Enterprise: true },
            },
        ],
    },
    {
        name: 'Support',
        features: [
            {
                name: 'Slack (community)',
                tiers: { 'PostHog Cloud': true, 'Open source': true, Scale: true, Enterprise: true },
            },
            {
                name: 'Slack (dedicated channel)',
                tiers: {
                    'PostHog Cloud': '$2k/month spend or above',
                    'Open source': false,
                    Scale: true,
                    Enterprise: true,
                },
            },
            {
                name: 'Email',
                tiers: { 'PostHog Cloud': true, 'Open source': false, Scale: true, Enterprise: true },
            },
            {
                name: 'Account manager',
                tiers: { 'PostHog Cloud': false, 'Open source': false, Scale: true, Enterprise: true },
            },
            {
                name: 'Training sessions',
                tiers: { 'PostHog Cloud': false, 'Open source': false, Scale: false, Enterprise: true },
            },
            {
                name: 'Deployment developer pairing',
                tiers: { 'PostHog Cloud': false, 'Open source': false, Scale: true, Enterprise: true },
            },
            {
                name: 'Dashboard configuration support',
                tiers: { 'PostHog Cloud': false, 'Open source': false, Scale: false, Enterprise: true },
            },
            {
                name: 'Monitoring configuration support',
                tiers: { 'PostHog Cloud': false, 'Open source': false, Scale: false, Enterprise: true },
            },
            {
                name: 'Remote monitoring',
                tiers: { 'PostHog Cloud': false, 'Open source': false, Scale: false, Enterprise: true },
            },
            {
                name: 'Terms and conditions',
                tiers: {
                    'PostHog Cloud': 'Standard',
                    'Open source': 'MIT Licence',
                    Scale: 'Standard',
                    Enterprise: 'Bespoke',
                },
            },
            {
                name: 'Security assessment',
                tiers: {
                    'PostHog Cloud': 'Standard assessment provided',
                    'Open source': 'Standard assessment provided',
                    Scale: 'Standard assessment provided',
                    Enterprise: true,
                },
            },
            {
                name: 'Bespoke pricing',
                tiers: { 'PostHog Cloud': false, 'Open source': false, Scale: false, Enterprise: true },
            },
            {
                name: 'Payment via invoicing',
                tiers: {
                    'PostHog Cloud': false,
                    'Open source': false,
                    Scale: 'Minimum $2k/month spend',
                    Enterprise: true,
                },
            },
            {
                name: 'Downtime developer pairing',
                tiers: { 'PostHog Cloud': false, 'Open source': false, Scale: false, Enterprise: true },
            },
            {
                name: 'Support SLAs',
                tiers: { 'PostHog Cloud': false, 'Open source': false, Scale: true, Enterprise: true },
            },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const PlanComparison = ({ className = '' }) => {
    const [expanded, setExpanded] = useState(false)

    const displaySections = expanded ? sections : sections.slice(0, 1)

    return (
        <section className={className}>
            <div className="plans-comparison-table max-w-7xl mx-auto pt-2 md:pt-0 overflow-hidden relative ">
                {/* xs to lg */}
                <div className="max-w-2xl mx-auto space-y-16 lg:hidden">
                    {tiers.map((tier, tierIdx) => (
                        <section key={tier.name}>
                            <div className="px-3 mb-2 lg:hidden">
                                <div className="text-lg pt-2 leading-6 text-almost-black text-large font-bold text-opacity-50">
                                    {tier.name}
                                </div>
                                <p className="mt-4 hidden">
                                    <span className="text-4xl font-extrabold text-almost-black text-opacity-50">
                                        ${tier.priceMonthly}
                                    </span>{' '}
                                    <span className="text-base font-medium text-gray-500">/mo</span>
                                </p>
                                <p className="mt-4 text-sm text-gray-500 hidden">{tier.description}</p>
                                <a
                                    href={tier.href}
                                    className="mt-6 block border border-gray-800 rounded-md bg-gray-800 w-full py-2 text-sm font-semibold text-almost-black text-center hover:bg-gray-900 hidden"
                                >
                                    Buy {tier.name}
                                </a>
                            </div>

                            {sections.map((section) => (
                                <table key={section.name} className="w-full mb-0">
                                    <caption
                                        style={{ captionSide: 'top' }}
                                        className="p-3 mt-4 text-sm font-medium text-almost-black font-bold"
                                    >
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
                                            <tr key={feature.name} className="border-white border-opacity-10">
                                                <th
                                                    className="py-5 px-4 text-sm font-normal text-gray-500 border-white border-opacity-10 w-1/2"
                                                    scope="row"
                                                >
                                                    {feature.name}
                                                </th>
                                                <td className="py-5 pr-4">
                                                    {typeof feature.tiers[tier.name] === 'string' ? (
                                                        <span className="block text-sm text-almost-black text-center">
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
                                    'border-gray-200 px-4 hidden'
                                )}
                            >
                                <a
                                    href={tier.href}
                                    className="block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-almost-black text-center hover:bg-gray-900"
                                >
                                    Buy {tier.name}
                                </a>
                            </div>
                        </section>
                    ))}
                </div>

                {/* lg+ */}
                <div className="hidden lg:block">
                    <table
                        className={`w-full h-px table-fixed relative mb-0 rounded-lg overflow-hidden ${
                            expanded ? 'pricing-table-expanded' : 'pricing-table-collapsed'
                        }`}
                    >
                        <caption className="sr-only">Pricing plan comparison</caption>
                        <thead>
                            <tr>
                                <th style={{ border: 0 }} className="text-almost-black text-center">
                                    &nbsp;
                                </th>
                                <th
                                    colSpan="3"
                                    className="text-almost-black text-center border-white border-opacity-10"
                                >
                                    Self-hosted options
                                </th>
                                <th className="text-almost-black text-center border-white border-opacity-10">
                                    Hosted solution
                                </th>
                            </tr>
                            <tr>
                                <th
                                    className="pb-4 px-6 text-sm font-medium text-almost-black text-center border-white border-opacity-10 sticky top-0  z-10 bg-opacity-50"
                                    scope="col"
                                >
                                    <span className="sr-only">Feature by</span>
                                    <span className="sr-only">Plans</span>
                                </th>
                                {tiers.map((tier) => (
                                    <th
                                        key={tier.name}
                                        className="w-1/5 pb-2 px-6 leading-6 text-base font-bold text-almost-black text-center border-white border-opacity-10 sticky top-0  z-10 bg-opacity-75"
                                        scope="col"
                                    >
                                        {tier.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="">
                            {/* 
                            <tr>
                                <th
                                    className="py-8 px-6 text-sm font-medium text-almost-black text-left align-top border-white border-opacity-10"
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
                                                <span className="text-4xl font-extrabold text-almost-black text-opacity-50">
                                                    ${tier.priceMonthly}
                                                </span>{' '}
                                                <span className="text-base font-medium text-gray-500">/mo</span>
                                            </p>
                                            <p className="mt-4 mb-16 text-sm text-gray-500">{tier.description}</p>
                                            <a
                                                href={tier.href}
                                                className="absolute bottom-0 flex-grow block w-full bg-gray-800 border border-gray-800 rounded-md 5 py-2 text-sm font-semibold text-almost-black text-center hover:bg-gray-900"
                                            >
                                                Buy {tier.name}
                                            </a>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            */}
                            {displaySections.map((section) => (
                                <Fragment key={section.name}>
                                    {section.name && (
                                        <tr>
                                            <th
                                                className="bg-transparent pt-6 pb-3 pl-6 text-lg font-bold text-almost-black border-white border-opacity-10"
                                                colSpan={4}
                                                scope="colgroup"
                                                style={{
                                                    borderLeftColor: 'transparent',
                                                    borderRightColor: 'transparent',
                                                }}
                                            >
                                                {section.name}
                                            </th>
                                        </tr>
                                    )}
                                    {section.features.map((feature) => (
                                        <tr key={feature.name}>
                                            <th
                                                className="py-5 px-6 text-sm font-normal text-almost-black text-left border-white border-opacity-10"
                                                scope="row"
                                            >
                                                {feature.name}
                                            </th>
                                            {tiers.map((tier) => (
                                                <td
                                                    key={tier.name}
                                                    className="py-5 px-6 border-white border-opacity-10"
                                                >
                                                    {typeof feature.tiers[tier.name] === 'string' ? (
                                                        <span className="block text-sm text-center text-almost-black text-opacity-75">
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
                        {expanded ? (
                            <tfoot className="hidden">
                                <tr className="border-t border-white border-opacity-10">
                                    <th className="sr-only" scope="row">
                                        Choose your plan
                                    </th>
                                    {tiers.map((tier) => (
                                        <td key={tier.name} className="pt-5 px-6 border-white border-opacity-10">
                                            <a
                                                href={tier.href}
                                                className="block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-almost-black text-center hover:bg-gray-900"
                                            >
                                                Buy {tier.name}
                                            </a>
                                        </td>
                                    ))}
                                </tr>
                            </tfoot>
                        ) : null}
                    </table>
                    {!expanded ? (
                        <div className="absolute bottom-4 left-0 w-full text-center">
                            <CallToAction type="primary" width="56" onClick={(_) => setExpanded(true)}>
                                See full comparison
                            </CallToAction>
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    )
}
