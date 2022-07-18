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
        name: 'Cloud',
        href: '#',
        priceMonthly: 9,
        description: 'Quis suspendisse ut fermentum neque vivamus non tellus.',
    },
    {
        name: 'Cloud Enterprise',
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
                    Cloud: 'Scales as needed, Constant price',
                    'Cloud Enterprise': 'Advanced permissioning and SSO Integration, priority support',
                    'Open source': 'Great for small teams',
                    Scale: 'Power analytics features, basic permissioning',
                    Enterprise: 'Advanced permissioning and SSO Integration, priority support',
                },
            },
            {
                name: 'Pricing',
                tiers: {
                    Cloud: 'Free (up to 1 million events), then $0.000225/event to $0.000025/event depending on volume (see calculator)',
                    'Open source': 'Free',
                    Scale: 'Free (up to 1 million events), then $0.00045/event to $0.000009/event depending on volume (see calculator)',
                    Enterprise: '$4,500/mo for the first 10 million events, tiered pricing after (see calculator)',
                    'Cloud Enterprise':
                        '$3,000/mo for the first 10 million events, tiered pricing after (see calculator)',
                },
            },
            {
                name: 'Scales to...',
                tiers: {
                    Cloud: 'Millions of users/mo',
                    'Open source': '~100k users/mo (no hard limit, but we recommend support beyond this)',
                    Scale: 'Millions of users/mo',
                    Enterprise: 'Millions of users/mo',
                    'Cloud Enterprise': 'Millions of users/mo',
                },
            },
        ],
    },
    {
        name: 'Instance & deployment',
        features: [
            {
                name: 'Hosting',
                tiers: { Cloud: true, 'Open source': false, Scale: false, Enterprise: false, 'Cloud Enterprise': true },
            },
            {
                name: 'User data stays on your infrastructure',
                tiers: { Cloud: false, 'Open source': true, Scale: true, Enterprise: true, 'Cloud Enterprise': false },
            },
            {
                name: 'Initial setup',
                tiers: {
                    Cloud: 'Instant',
                    'Open source': 'Instant',
                    Scale: '1-3 days',
                    Enterprise: '1-3 days',
                    'Cloud Enterprise': 'Instant',
                },
            },
            {
                name: 'Server management',
                tiers: {
                    Cloud: 'Managed by PostHog',
                    'Open source': 'Managed by you',
                    Scale: 'We help you manage',
                    Enterprise: 'We help you manage',
                    'Cloud Enterprise': 'Managed by PostHog',
                },
            },
            {
                name: 'Operate in air gapped environment',
                tiers: {
                    'PostHog Cloud': false,
                    'Open source': true,
                    Scale: false,
                    Enterprise: true,
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
                    Cloud: 'Unlimited',
                    'Open source': 'Unlimited',
                    Scale: 'Unlimited',
                    Enterprise: 'Unlimited',
                    'Cloud Enterprise': 'Unlimited',
                },
            },
            {
                name: 'Tracked users',
                tiers: {
                    Cloud: 'Unlimited',
                    'Open source': '~1m (with default config)',
                    Scale: 'Unlimited',
                    Enterprise: 'Unlimited',
                    'Cloud Enterprise': 'Unlimited',
                },
            },
            {
                name: 'Projects',
                tiers: {
                    Cloud: 'Multiple',
                    'Open source': '1',
                    Scale: 'Multiple',
                    Enterprise: 'Multiple',
                    'Cloud Enterprise': 'Multiple',
                },
            },
            {
                name: 'Data retention',
                tiers: {
                    Cloud: '7 years',
                    'Open source': 'Unlimited',
                    Scale: 'Unlimited',
                    Enterprise: 'Unlimited',
                    'Cloud Enterprise': '7 years',
                },
            },
        ],
    },
    {
        name: 'Product',
        features: [
            {
                name: 'Analytics suite',
                tiers: { Cloud: true, 'Open source': true, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Recordings',
                docsLink: 'docs/user-guides/recordings',
                tiers: { Cloud: true, 'Open source': true, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Feature Flags',
                docsLink: 'docs/user-guides/feature-flags',
                tiers: { Cloud: true, 'Open source': true, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Experimentation',
                docsLink: 'docs/user-guides/experimentation',
                tiers: { Cloud: true, 'Open source': false, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Apps',
                docsLink: 'docs/apps',
                tiers: { Cloud: true, 'Open source': true, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
        ],
    },
    {
        name: 'Advanced features',
        features: [
            {
                name: 'Correlation Analysis',
                docsLink: 'docs/user-guides/correlation',
                tiers: { Cloud: true, 'Open source': false, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Group Analytics',
                docsLink: 'docs/user-guides/group-analytics',
                tiers: { Cloud: true, 'Open source': false, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Multivariate testing',
                docsLink: 'docs/user-guides/feature-flags#multivariate-feature-flags',
                tiers: { Cloud: true, 'Open source': false, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Advanced Paths',
                docsLink: 'docs/user-guides/paths',
                tiers: { Cloud: true, 'Open source': false, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Event & properties taxonomy',
                tiers: { Cloud: true, 'Open source': false, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Dashboard tagging',
                tiers: { Cloud: true, 'Open source': false, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
        ],
    },
    {
        name: 'Platform',
        features: [
            {
                name: 'Team members',
                tiers: {
                    Cloud: 'Unlimited',
                    'Open source': 'Unlimited',
                    Scale: 'Unlimited',
                    Enterprise: 'Unlimited',
                    'Cloud Enterprise': 'Unlimited',
                },
            },
            {
                name: 'SSO/SAML',
                docsLink: 'docs/user-guides/sso',
                tiers: { Cloud: false, 'Open source': false, Scale: false, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'API access',
                docsLink: 'docs/api',
                tiers: { Cloud: true, 'Open source': true, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'User permissions',
                docsLink: 'docs/user-guides/organizations-and-projects#permissions',
                tiers: { Cloud: true, 'Open source': false, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Advanced user permissions',
                tiers: { Cloud: false, 'Open source': false, Scale: false, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Private projects',
                docsLink: 'docs/user-guides/organizations-and-projects#private-projects',
                tiers: { Cloud: false, 'Open source': false, Scale: false, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Ad blocker-resistant',
                tiers: { Cloud: false, 'Open source': true, Scale: true, Enterprise: true, 'Cloud Enterprise': false },
            },
            {
                name: 'Backup configuration',
                tiers: {
                    Cloud: false,
                    'Open source': false,
                    Scale: false,
                    Enterprise: true,
                    'Cloud Enterprise': false,
                },
            },
            {
                name: 'Proactive security patch alerting',
                tiers: {
                    Cloud: false,
                    'Open source': false,
                    Scale: false,
                    Enterprise: true,
                    'Cloud Enterprise': false,
                },
            },
        ],
    },
    {
        name: 'Integrations',
        features: [
            {
                name: 'Slack',
                docsLink: 'docs/integrate/webhooks/slack#4-add-to-action',
                tiers: { Cloud: true, 'Open source': true, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Microsoft Teams',
                docsLink: 'docs/integrate/webhooks/microsoft-teams',
                tiers: { Cloud: true, 'Open source': true, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Discord',
                docsLink: 'docs/integrate/webhooks/discord',
                tiers: { Cloud: true, 'Open source': true, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Zapier',
                docsLink: 'https://zapier.com/apps/posthog/integrations',
                tiers: { Cloud: true, 'Open source': false, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
        ],
    },
    {
        name: 'Support',
        features: [
            {
                name: 'Slack (community)',
                docsLink: 'slack',
                tiers: { Cloud: true, 'Open source': true, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Slack (dedicated channel)',
                tiers: {
                    Cloud: '$10k/month spend or above',
                    'Open source': false,
                    Scale: '$10k/month spend or above',
                    Enterprise: true,
                    'Cloud Enterprise': true,
                },
            },
            {
                name: 'Email',
                tiers: {
                    Cloud: '$10k/month spend or above',
                    'Open source': false,
                    Scale: '$10k/month spend or above',
                    Enterprise: true,
                    'Cloud Enterprise': true,
                },
            },
            {
                name: 'Account manager',
                tiers: { Cloud: false, 'Open source': false, Scale: true, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Training sessions',
                tiers: { Cloud: false, 'Open source': false, Scale: false, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Deployment developer pairing',
                tiers: {
                    Cloud: false,
                    'Open source': false,
                    Scale: '$10k/month spend or above',
                    Enterprise: true,
                    'Cloud Enterprise': false,
                },
            },
            {
                name: 'Dashboard configuration support',
                tiers: { Cloud: false, 'Open source': false, Scale: false, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Monitoring configuration support',
                tiers: {
                    Cloud: false,
                    'Open source': false,
                    Scale: false,
                    Enterprise: true,
                    'Cloud Enterprise': false,
                },
            },
            {
                name: 'Remote monitoring',
                tiers: {
                    Cloud: false,
                    'Open source': false,
                    Scale: false,
                    Enterprise: true,
                    'Cloud Enterprise': false,
                },
            },
            {
                name: 'Terms and conditions',
                tiers: {
                    Cloud: 'Standard',
                    'Open source': 'MIT Licence',
                    Scale: 'Standard',
                    Enterprise: 'Bespoke',
                    'Cloud Enterprise': 'Bespoke',
                },
            },
            {
                name: 'Security assessment',
                tiers: {
                    Cloud: 'Standard assessment provided',
                    'Open source': 'Standard assessment provided',
                    Scale: 'Standard assessment provided',
                    Enterprise: true,
                    'Cloud Enterprise': 'Standard assessment provided',
                },
            },
            {
                name: 'Bespoke pricing',
                tiers: { Cloud: false, 'Open source': false, Scale: false, Enterprise: true, 'Cloud Enterprise': true },
            },
            {
                name: 'Payment via invoicing',
                tiers: {
                    Cloud: false,
                    'Open source': false,
                    Scale: '$2k/month spend or above',
                    Enterprise: true,
                    'Cloud Enterprise': true,
                },
            },
            {
                name: 'Downtime developer pairing',
                tiers: {
                    'PostHog Cloud': false,
                    'Open source': false,
                    Scale: false,
                    Enterprise: true,
                    'Cloud Enterprise': false,
                },
            },
            {
                name: 'Support SLAs',
                tiers: {
                    'PostHog Cloud': false,
                    'Open source': false,
                    Scale: true,
                    Enterprise: true,
                    'Cloud Enterprise': true,
                },
            },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const PlanComparison = ({ className = '' }) => {
    const [expanded] = useState(true)

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
                                            <tr key={feature.name} className="border-white/10">
                                                <th
                                                    className="py-5 px-4 text-sm font-normal text-gray-500 border-white/10 w-1/2"
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
                                <th colSpan="3" className="text-almost-black text-center border-white/10">
                                    Self-hosted options
                                </th>
                                <th colSpan="2" className="text-almost-black text-center border-white/10">
                                    Hosted solutions
                                </th>
                            </tr>
                            <tr>
                                <th
                                    className="pb-4 px-6 text-sm font-medium text-almost-black text-center border-white/10 sticky top-0  z-10 bg-opacity-50"
                                    scope="col"
                                >
                                    <span className="sr-only">Feature by</span>
                                    <span className="sr-only">Plans</span>
                                </th>
                                {tiers.map((tier) => (
                                    <th
                                        key={tier.name}
                                        className="w-1/5 pb-2 px-6 leading-6 text-base font-bold text-almost-black text-center border-white/10 sticky top-0  z-10 bg-opacity-75"
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
                                    className="py-8 px-6 text-sm font-medium text-almost-black text-left align-top border-white/10"
                                    scope="row"
                                >
                                    Pricing
                                </th>
                                {tiers.map((tier) => (
                                    <td
                                        key={tier.name}
                                        className="h-full py-8 px-6 align-top border-white/10"
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
                                                className="bg-transparent pt-6 pb-3 pl-6 text-lg font-bold text-almost-black border-white/10"
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
                                                className="py-5 px-6 text-sm font-normal text-almost-black text-left border-white/10"
                                                scope="row"
                                            >
                                                {typeof feature.docsLink === 'string' ? (
                                                    <a href={feature.docsLink}>{feature.name}</a>
                                                ) : (
                                                    feature.name
                                                )}
                                            </th>
                                            {tiers.map((tier) => (
                                                <td key={tier.name} className="py-5 px-6 border-white/10">
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
                                <tr className="border-t border-white/10">
                                    <th className="sr-only" scope="row">
                                        Choose your plan
                                    </th>
                                    {tiers.map((tier) => (
                                        <td key={tier.name} className="pt-5 px-6 border-white/10">
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
                </div>
            </div>
        </section>
    )
}
