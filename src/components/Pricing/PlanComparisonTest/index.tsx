import { CallToAction } from 'components/CallToAction'
import React, { Fragment, useState } from 'react'
import CheckIcon from '../../../images/check.svg'
import MinusIcon from '../../../images/x.svg'
import './styles/index.scss'

const tiers = [
    {
        name: 'PostHog Cloud',
        href: '#',
        priceMonthly: 9,
        description: 'Quis suspendisse ut fermentum neque vivamus non tellus.',
    },
    {
        name: '+ Enterprise Cloud package',
        href: '#',
        priceMonthly: 9,
        description: 'Quis suspendisse ut fermentum neque vivamus non tellus.',
    },
    {
        name: 'Open Source',
        href: '#',
        priceMonthly: 59,
        description: 'Orci volutpat ut sed sed neque, dui eget. Quis tristique non.',
    },
    {
        name: 'Self-Hosted',
        href: '#',
        priceMonthly: 59,
        description: 'Orci volutpat ut sed sed neque, dui eget. Quis tristique non.',
    },
    {
        name: '+ Enterprise package',
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
                    'PostHog Cloud': 'Scales as needed, no infrastructure to manage',
                    '+ Enterprise Cloud package': '+ SSO, advanced permissions, priority support',
                    'Open Source': 'Great for small teams',
                    'Self-Hosted': 'Data never has to leave your infrastructure',
                    '+ Enterprise package': '+ SSO, advanced permissions, priority support',
                },
            },
        ],
    },
    {
        name: 'Event pricing breakdown',
        features: [
            {
                name: 'First 1 million events/mo',
                tiers: {
                    'Open Source': 'Free',
                    'PostHog Cloud': 'Free – every month',
                    '+ Enterprise Cloud package': '$450 (flat fee)',
                    'Self-Hosted': 'Free – every month',
                    '+ Enterprise package': '$450 (flat fee)',
                },
            },
            {
                name: '1-2 million',
                tiers: {
                    'Open Source': 'Free',
                    'PostHog Cloud': '$0.000450',
                    '+ Enterprise Cloud package': '$0.000450',
                    'Self-Hosted': '$0.000450',
                    '+ Enterprise package': '$0.000450',
                },
            },
            {
                name: '2-10 million',
                tiers: {
                    'Open Source': 'Free',
                    'PostHog Cloud': '$0.000225',
                    '+ Enterprise Cloud package': '$0.000450',
                    'Self-Hosted': '$0.000225',
                    '+ Enterprise package': '$0.000450',
                },
            },
            {
                name: '10-100 million',
                tiers: {
                    'Open Source': 'Free',
                    'PostHog Cloud': '$0.000075',
                    '+ Enterprise Cloud package': '$0.000090',
                    'Self-Hosted': '$0.000075',
                    '+ Enterprise package': '$0.000090',
                },
            },
            {
                name: '100 million - 1 billion',
                tiers: {
                    'Open Source': 'Free',
                    'PostHog Cloud': '$0.000025',
                    '+ Enterprise Cloud package': '$0.000025',
                    'Self-Hosted': '$0.000025',
                    '+ Enterprise package': '$0.000025',
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
                    'PostHog Cloud': true,
                    'Open Source': false,
                    'Self-Hosted': false,
                    '+ Enterprise package': false,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'User data stays on your infrastructure',
                tiers: {
                    'PostHog Cloud': false,
                    'Open Source': true,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': false,
                },
            },
            {
                name: 'Initial setup',
                tiers: {
                    'PostHog Cloud': 'Instant',
                    'Open Source': 'Instant',
                    'Self-Hosted': '1-3 days',
                    '+ Enterprise package': '1-3 days',
                    '+ Enterprise Cloud package': 'Instant',
                },
            },
            {
                name: 'Server management',
                tiers: {
                    'PostHog Cloud': 'Managed by PostHog',
                    'Open Source': 'Managed by you',
                    'Self-Hosted': 'Third-party support available',
                    '+ Enterprise package': 'Third-party support available',
                    '+ Enterprise Cloud package': 'Managed by PostHog',
                },
            },
            {
                name: 'Operate in air gapped environment',
                tiers: {
                    'PostHog Cloud': false,
                    'Open Source': true,
                    'Self-Hosted': false,
                    '+ Enterprise package': true,
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
                    'Open Source': 'Unlimited',
                    'Self-Hosted': 'Unlimited',
                    '+ Enterprise package': 'Unlimited',
                    '+ Enterprise Cloud package': 'Unlimited',
                },
            },
            {
                name: 'Tracked users',
                tiers: {
                    'PostHog Cloud': 'Unlimited',
                    'Open Source': '~1m (with default config)',
                    'Self-Hosted': 'Unlimited',
                    '+ Enterprise package': 'Unlimited',
                    '+ Enterprise Cloud package': 'Unlimited',
                },
            },
            {
                name: 'Projects',
                tiers: {
                    'PostHog Cloud': 'Multiple',
                    'Open Source': '1',
                    'Self-Hosted': 'Multiple',
                    '+ Enterprise package': 'Multiple',
                    '+ Enterprise Cloud package': 'Multiple',
                },
            },
            {
                name: 'Data retention',
                tiers: {
                    'PostHog Cloud': '7 years',
                    'Open Source': 'Unlimited',
                    'Self-Hosted': 'Unlimited',
                    '+ Enterprise package': 'Unlimited',
                    '+ Enterprise Cloud package': '7 years',
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
                    'PostHog Cloud': true,
                    'Open Source': true,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Recordings',
                docsLink: 'docs/user-guides/recordings',
                tiers: {
                    'PostHog Cloud': true,
                    'Open Source': true,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Feature Flags',
                docsLink: 'docs/user-guides/feature-flags',
                tiers: {
                    'PostHog Cloud': true,
                    'Open Source': true,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Experimentation',
                docsLink: 'docs/user-guides/experimentation',
                tiers: {
                    'PostHog Cloud': true,
                    'Open Source': false,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Apps',
                docsLink: 'docs/apps',
                tiers: {
                    'PostHog Cloud': true,
                    'Open Source': true,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
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
                    'PostHog Cloud': true,
                    'Open Source': false,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Group Analytics',
                docsLink: 'docs/user-guides/group-analytics',
                tiers: {
                    'PostHog Cloud': true,
                    'Open Source': false,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Multivariate testing',
                docsLink: 'docs/user-guides/feature-flags#multivariate-feature-flags',
                tiers: {
                    'PostHog Cloud': true,
                    'Open Source': false,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Advanced Paths',
                docsLink: 'docs/user-guides/paths',
                tiers: {
                    'PostHog Cloud': true,
                    'Open Source': false,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Event & properties taxonomy',
                tiers: {
                    'PostHog Cloud': true,
                    'Open Source': false,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Dashboard tagging',
                tiers: {
                    'PostHog Cloud': true,
                    'Open Source': false,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
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
                    'PostHog Cloud': 'Unlimited',
                    'Open Source': 'Unlimited',
                    'Self-Hosted': 'Unlimited',
                    '+ Enterprise package': 'Unlimited',
                    '+ Enterprise Cloud package': 'Unlimited',
                },
            },
            {
                name: 'SSO/SAML',
                docsLink: 'docs/user-guides/sso',
                tiers: {
                    'PostHog Cloud': false,
                    'Open Source': false,
                    'Self-Hosted': false,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'API access',
                docsLink: 'docs/api',
                tiers: {
                    'PostHog Cloud': true,
                    'Open Source': true,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'User permissions',
                docsLink: 'docs/user-guides/organizations-and-projects#permissions',
                tiers: {
                    'PostHog Cloud': true,
                    'Open Source': false,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Advanced user permissions',
                tiers: {
                    'PostHog Cloud': false,
                    'Open Source': false,
                    'Self-Hosted': false,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Private projects',
                docsLink: 'docs/user-guides/organizations-and-projects#private-projects',
                tiers: {
                    'PostHog Cloud': false,
                    'Open Source': false,
                    'Self-Hosted': false,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Backup configuration',
                tiers: {
                    'PostHog Cloud': false,
                    'Open Source': false,
                    'Self-Hosted': false,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': false,
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
                    'PostHog Cloud': true,
                    'Open Source': true,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Microsoft Teams',
                docsLink: 'docs/integrate/webhooks/microsoft-teams',
                tiers: {
                    'PostHog Cloud': true,
                    'Open Source': true,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Discord',
                docsLink: 'docs/integrate/webhooks/discord',
                tiers: {
                    'PostHog Cloud': true,
                    'Open Source': true,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Zapier',
                docsLink: 'https://zapier.com/apps/posthog/integrations',
                tiers: {
                    'PostHog Cloud': true,
                    'Open Source': false,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
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
                    'PostHog Cloud': true,
                    'Open Source': true,
                    'Self-Hosted': true,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Slack (dedicated channel)',
                tiers: {
                    'PostHog Cloud': '$10k/month spend or above',
                    'Open Source': false,
                    'Self-Hosted': '$10k/month spend or above',
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Email',
                tiers: {
                    'PostHog Cloud': '$10k/month spend or above',
                    'Open Source': false,
                    'Self-Hosted': '$10k/month spend or above',
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Account manager',
                tiers: {
                    'PostHog Cloud': false,
                    'Open Source': false,
                    'Self-Hosted': false,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Training sessions',
                tiers: {
                    'PostHog Cloud': false,
                    'Open Source': false,
                    'Self-Hosted': false,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Dashboard configuration support',
                tiers: {
                    'PostHog Cloud': false,
                    'Open Source': false,
                    'Self-Hosted': false,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Remote monitoring',
                tiers: {
                    'PostHog Cloud': false,
                    'Open Source': false,
                    'Self-Hosted': false,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': false,
                },
            },
            {
                name: 'Terms and conditions',
                tiers: {
                    'PostHog Cloud': 'Standard',
                    'Open Source': 'MIT Licence',
                    'Self-Hosted': 'Standard',
                    '+ Enterprise package': 'Bespoke',
                    '+ Enterprise Cloud package': 'Bespoke',
                },
            },
            {
                name: 'Security assessment',
                tiers: {
                    'PostHog Cloud': 'Standard assessment provided',
                    'Open Source': 'Standard assessment provided',
                    'Self-Hosted': 'Standard assessment provided',
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': 'Standard assessment provided',
                },
            },
            {
                name: 'Bespoke pricing',
                tiers: {
                    'PostHog Cloud': false,
                    'Open Source': false,
                    'Self-Hosted': false,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Payment via invoicing',
                tiers: {
                    'PostHog Cloud': false,
                    'Open Source': false,
                    'Self-Hosted': '$2k/month spend or above',
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
            {
                name: 'Support SLAs',
                tiers: {
                    'PostHog Cloud': false,
                    'Open Source': false,
                    'Self-Hosted': false,
                    '+ Enterprise package': true,
                    '+ Enterprise Cloud package': true,
                },
            },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const PlanComparisonTest = ({ className = '' }) => {
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
                                    <span className="text-lg font-medium text-gray-500">/mo</span>
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
                                        className="py-2 px-3 text-sm text-left font-bold text-almost-black leading-tight border-white/10 sticky top-0  z-10 bg-opacity-75 bg-tan"
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
                                                <span className="text-lg font-medium text-gray-500">/mo</span>
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
                                                className="bg-transparent pt-6 pb-3 pl-3 text-lg font-bold text-left text-almost-black border-white/10"
                                                colSpan={5}
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
                                        <tr className="align-top" key={feature.name}>
                                            <th
                                                className="py-2 px-3 text-sm font-medium text-almost-black text-left border-white/10 w-[180px]"
                                                scope="row"
                                            >
                                                {typeof feature.docsLink === 'string' ? (
                                                    <a href={feature.docsLink}>{feature.name}</a>
                                                ) : (
                                                    feature.name
                                                )}
                                            </th>
                                            {tiers.map((tier) => (
                                                <td key={tier.name} className="py-2 px-3 border-white/10 text-sm">
                                                    {typeof feature.tiers[tier.name] === 'string' ? (
                                                        <span className="block text-sm text-almost-black text-opacity-75">
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
