import { CallToAction } from 'components/CallToAction'
import React, { Fragment, useState } from 'react'
import CheckIcon from '../../../images/check.svg'
import MinusIcon from '../../../images/x.svg'
import './styles/index.scss'

const tiers = [
    {
        name: 'Cloud (Self-Serve)',
        href: '#',
        priceMonthly: 9,
        description: 'Quis suspendisse ut fermentum neque vivamus non tellus.',
    },
    {
        name: 'Cloud (Enterprise)',
        href: '#',
        priceMonthly: 9,
        description: 'Quis suspendisse ut fermentum neque vivamus non tellus.',
    },
    {
        name: 'Self-Hosted (Self-Serve)',
        href: '#',
        priceMonthly: 59,
        description: 'Orci volutpat ut sed sed neque, dui eget. Quis tristique non.',
    },
    {
        name: 'Self-Hosted (Enterprise)',
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
                tiers: {
                    'Cloud (Self-Serve)': 'Scales as needed, no infrastructure to manage',
                    'Cloud (Enterprise)': 'Advanced permissioning and SSO Integration, priority support',
                    'Open Source': 'Great for small teams',
                    'Self-Hosted (Self-Serve)': 'Power analytics features, basic permissioning',
                    'Self-Hosted (Enterprise)': 'Advanced permissioning and SSO Integration, priority support',
                },
            },
            {
                name: 'Base pricing',
                tiers: {
                    'Cloud (Self-Serve)': '$0/mo',
                    'Open Source': 'Free',
                    'Self-Hosted (Self-Serve)': '$0/mo',
                    'Self-Hosted (Enterprise)': '$450/mo',
                    'Cloud (Enterprise)': '$300/mo',
                },
            },
            {
                name: 'Per-event pricing (starts at)',
                tiers: {
                    'Cloud (Self-Serve)': 'First 1 million events/mo free, then $0.00045/event',
                    'Open Source': 'Free',
                    'Self-Hosted (Self-Serve)': 'First 1 million events/mo free, then $0.00045/event',
                    'Self-Hosted (Enterprise)': 'First 1 million events/mo included, then $0.00045/event',
                    'Cloud (Enterprise)': 'First 1 million events/mo included, then $0.00045/event',
                },
            },
            {
                name: 'Volume discounts available - up to 90% off (see calculator above)',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
        ],
    },
    {
        name: 'Instance & deployment',
        features: [
            {
                name: 'Hosting',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': false,
                    'Self-Hosted (Enterprise)': false,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'User data stays on your infrastructure',
                tiers: {
                    'Cloud (Self-Serve)': false,
                    'Open Source': true,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': false,
                },
            },
            {
                name: 'Initial setup',
                tiers: {
                    'Cloud (Self-Serve)': 'Instant',
                    'Open Source': 'Instant',
                    'Self-Hosted (Self-Serve)': '1-3 days',
                    'Self-Hosted (Enterprise)': '1-3 days',
                    'Cloud (Enterprise)': 'Instant',
                },
            },
            {
                name: 'Server management',
                tiers: {
                    'Cloud (Self-Serve)': 'Managed by PostHog',
                    'Open Source': 'Managed by you',
                    'Self-Hosted (Self-Serve)': 'We help you manage',
                    'Self-Hosted (Enterprise)': 'We help you manage',
                    'Cloud (Enterprise)': 'Managed by PostHog',
                },
            },
            {
                name: 'Operate in air gapped environment',
                tiers: {
                    'PostHog Cloud': false,
                    'Open Source': true,
                    'Self-Hosted (Self-Serve)': false,
                    'Self-Hosted (Enterprise)': true,
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
                    'Cloud (Self-Serve)': 'Unlimited',
                    'Open Source': 'Unlimited',
                    'Self-Hosted (Self-Serve)': 'Unlimited',
                    'Self-Hosted (Enterprise)': 'Unlimited',
                    'Cloud (Enterprise)': 'Unlimited',
                },
            },
            {
                name: 'Tracked users',
                tiers: {
                    'Cloud (Self-Serve)': 'Unlimited',
                    'Open Source': '~1m (with default config)',
                    'Self-Hosted (Self-Serve)': 'Unlimited',
                    'Self-Hosted (Enterprise)': 'Unlimited',
                    'Cloud (Enterprise)': 'Unlimited',
                },
            },
            {
                name: 'Projects',
                tiers: {
                    'Cloud (Self-Serve)': 'Multiple',
                    'Open Source': '1',
                    'Self-Hosted (Self-Serve)': 'Multiple',
                    'Self-Hosted (Enterprise)': 'Multiple',
                    'Cloud (Enterprise)': 'Multiple',
                },
            },
            {
                name: 'Data retention',
                tiers: {
                    'Cloud (Self-Serve)': '7 years',
                    'Open Source': 'Unlimited',
                    'Self-Hosted (Self-Serve)': 'Unlimited',
                    'Self-Hosted (Enterprise)': 'Unlimited',
                    'Cloud (Enterprise)': '7 years',
                },
            },
        ],
    },
    {
        name: 'Product',
        features: [
            {
                name: 'Analytics suite',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': true,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Recordings',
                docsLink: 'docs/user-guides/recordings',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': true,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Feature Flags',
                docsLink: 'docs/user-guides/feature-flags',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': true,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Experimentation',
                docsLink: 'docs/user-guides/experimentation',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Apps',
                docsLink: 'docs/apps',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': true,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
        ],
    },
    {
        name: 'Advanced features',
        features: [
            {
                name: 'Correlation Analysis',
                docsLink: 'docs/user-guides/correlation',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Group Analytics',
                docsLink: 'docs/user-guides/group-analytics',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Multivariate testing',
                docsLink: 'docs/user-guides/feature-flags#multivariate-feature-flags',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Advanced Paths',
                docsLink: 'docs/user-guides/paths',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Event & properties taxonomy',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Dashboard tagging',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
        ],
    },
    {
        name: 'Platform',
        features: [
            {
                name: 'Team members',
                tiers: {
                    'Cloud (Self-Serve)': 'Unlimited',
                    'Open Source': 'Unlimited',
                    'Self-Hosted (Self-Serve)': 'Unlimited',
                    'Self-Hosted (Enterprise)': 'Unlimited',
                    'Cloud (Enterprise)': 'Unlimited',
                },
            },
            {
                name: 'SSO/SAML',
                docsLink: 'docs/user-guides/sso',
                tiers: {
                    'Cloud (Self-Serve)': false,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': false,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'API access',
                docsLink: 'docs/api',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': true,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'User permissions',
                docsLink: 'docs/user-guides/organizations-and-projects#permissions',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Advanced user permissions',
                tiers: {
                    'Cloud (Self-Serve)': false,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': false,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Private projects',
                docsLink: 'docs/user-guides/organizations-and-projects#private-projects',
                tiers: {
                    'Cloud (Self-Serve)': false,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': false,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Ad blocker-resistant',
                tiers: {
                    'Cloud (Self-Serve)': false,
                    'Open Source': true,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': false,
                },
            },
            {
                name: 'Backup configuration',
                tiers: {
                    'Cloud (Self-Serve)': false,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': false,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': false,
                },
            },
            {
                name: 'Proactive security patch alerting',
                tiers: {
                    'Cloud (Self-Serve)': false,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': false,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': false,
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
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': true,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Microsoft Teams',
                docsLink: 'docs/integrate/webhooks/microsoft-teams',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': true,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Discord',
                docsLink: 'docs/integrate/webhooks/discord',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': true,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Zapier',
                docsLink: 'https://zapier.com/apps/posthog/integrations',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
        ],
    },
    {
        name: 'Support',
        features: [
            {
                name: 'Slack (community)',
                docsLink: 'slack',
                tiers: {
                    'Cloud (Self-Serve)': true,
                    'Open Source': true,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Slack (dedicated channel)',
                tiers: {
                    'Cloud (Self-Serve)': '$10k/month spend or above',
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': '$10k/month spend or above',
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Email',
                tiers: {
                    'Cloud (Self-Serve)': '$10k/month spend or above',
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': '$10k/month spend or above',
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Account manager',
                tiers: {
                    'Cloud (Self-Serve)': false,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Training sessions',
                tiers: {
                    'Cloud (Self-Serve)': false,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': false,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Deployment developer pairing',
                tiers: {
                    'Cloud (Self-Serve)': false,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': '$10k/month spend or above',
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': false,
                },
            },
            {
                name: 'Dashboard configuration support',
                tiers: {
                    'Cloud (Self-Serve)': false,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': false,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Monitoring configuration support',
                tiers: {
                    'Cloud (Self-Serve)': false,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': false,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': false,
                },
            },
            {
                name: 'Remote monitoring',
                tiers: {
                    'Cloud (Self-Serve)': false,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': false,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': false,
                },
            },
            {
                name: 'Terms and conditions',
                tiers: {
                    'Cloud (Self-Serve)': 'Standard',
                    'Open Source': 'MIT Licence',
                    'Self-Hosted (Self-Serve)': 'Standard',
                    'Self-Hosted (Enterprise)': 'Bespoke',
                    'Cloud (Enterprise)': 'Bespoke',
                },
            },
            {
                name: 'Security assessment',
                tiers: {
                    'Cloud (Self-Serve)': 'Standard assessment provided',
                    'Open Source': 'Standard assessment provided',
                    'Self-Hosted (Self-Serve)': 'Standard assessment provided',
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': 'Standard assessment provided',
                },
            },
            {
                name: 'Bespoke pricing',
                tiers: {
                    'Cloud (Self-Serve)': false,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': false,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Payment via invoicing',
                tiers: {
                    'Cloud (Self-Serve)': false,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': '$2k/month spend or above',
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
                },
            },
            {
                name: 'Downtime developer pairing',
                tiers: {
                    'PostHog Cloud': false,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': false,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': false,
                },
            },
            {
                name: 'Support SLAs',
                tiers: {
                    'PostHog Cloud': false,
                    'Open Source': false,
                    'Self-Hosted (Self-Serve)': true,
                    'Self-Hosted (Enterprise)': true,
                    'Cloud (Enterprise)': true,
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
            <div className="plans-comparison-table max-w-7xl mx-auto pt-2 md:pt-0 relative ">
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
                                    className="mt-6 block border border-gray-800 rounded-md bg-gray-800 w-full py-2 text-sm font-semibold text-almost-black hover:bg-gray-900 hidden"
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
                                                        <span className="block text-sm text-almost-black">
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
                                    className="block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-almost-black hover:bg-gray-900"
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
                        className={`w-full h-px table-fixed relative mb-0 rounded-lg ${
                            expanded ? 'pricing-table-expanded' : 'pricing-table-collapsed'
                        }`}
                    >
                        <caption className="sr-only">Pricing plan comparison</caption>
                        <thead>
                            <tr>
                                <th
                                    className="py-2 px-3 text-[14px] font-medium text-almost-black border-white/10 sticky top-0 w-[180px] z-10 bg-opacity-50"
                                    scope="col"
                                >
                                    <span className="sr-only">Feature by</span>
                                    <span className="sr-only">Plans</span>
                                </th>
                                {tiers.map((tier) => (
                                    <th
                                        key={tier.name}
                                        className="py-2 px-3 text-[14px] leading-6 text-base font-bold text-almost-black border-white/10 sticky top-0  z-10 bg-opacity-75 bg-tan"
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
                                                className="absolute bottom-0 flex-grow block w-full bg-gray-800 border border-gray-800 rounded-md 5 py-2 text-sm font-semibold text-almost-black hover:bg-gray-900"
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
                                                className="py-2 px-3 text-xs font-medium text-almost-black text-left border-white/10 w-[180px]"
                                                scope="row"
                                            >
                                                {typeof feature.docsLink === 'string' ? (
                                                    <a href={feature.docsLink}>{feature.name}</a>
                                                ) : (
                                                    feature.name
                                                )}
                                            </th>
                                            {tiers.map((tier) => (
                                                <td key={tier.name} className="py-2 px-3 border-white/10 text-xs">
                                                    {typeof feature.tiers[tier.name] === 'string' ? (
                                                        <span className="block text-xs text-almost-black text-opacity-75">
                                                            {feature.tiers[tier.name]}
                                                        </span>
                                                    ) : (
                                                        <>
                                                            {feature.tiers[tier.name] === true ? (
                                                                <img
                                                                    src={CheckIcon}
                                                                    alt="Checked"
                                                                    className="h-4 w-4 text-green-500"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={MinusIcon}
                                                                    alt="Checked"
                                                                    className="h-4 w-4 text-red-500"
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
                                                className="block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-almost-black hover:bg-gray-900"
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
