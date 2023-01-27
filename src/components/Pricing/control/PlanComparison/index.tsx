import { CallToAction } from 'components/CallToAction'
import InfoIcon from 'components/InfoIcon/Index'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import React, { Fragment, useEffect, useState } from 'react'
import { BillingProductV2Type, BillingV2FeatureType, BillingV2PlanType } from 'types'
import CheckIcon from '../../../../images/check.svg'
import WarnIcon from '../../../../images/warning.svg'
import MinusIcon from '../../../../images/x.svg'
import './styles/index.scss'

const tiers = [
    {
        name: 'Scale',
        href: '#',
        priceMonthly: 9,
        description: 'Quis suspendisse ut fermentum neque vivamus non tellus.',
    },
    {
        name: 'Scale Plus',
        href: '#',
        priceMonthly: 9,
        description: 'Quis suspendisse ut fermentum neque vivamus non tellus.',
    },
    {
        name: 'Enterprise',
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
                    Scale: 'Scales as needed, no infrastructure to manage',
                    'Scale Plus': '+ SSO, advanced permissions, priority support',
                    Enterprise: '+ SSO, advanced permissions, priority support',
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
                    Scale: 'Free – every month',
                    'Scale Plus': '$450 (flat fee)',
                    Enterprise: 'Custom',
                },
            },
            {
                name: '1-2 million',
                tiers: {
                    Scale: '$0.000450',
                    'Scale Plus': '$0.00056260',
                    Enterprise: 'Custom',
                },
            },
            {
                name: '2-10 million',
                tiers: {
                    Scale: '$0.000225',
                    'Scale Plus': '$0.00028125',
                    Enterprise: 'Custom',
                },
            },
            {
                name: '10-100 million',
                tiers: {
                    Scale: '$0.000075',
                    'Scale Plus': '$0.00009375',
                    Enterprise: 'Custom',
                },
            },
            {
                name: '100 million - 1 billion',
                tiers: {
                    Scale: '$0.000025',
                    'Scale Plus': '$0.00003125',
                    Enterprise: 'Custom',
                },
            },
        ],
    },
    {
        name: 'Session recording pricing breakdown',
        features: [
            {
                name: 'First 15,000 recordings/mo',
                tiers: {
                    Scale: 'Free – every month',
                    'Scale Plus': 'Free – every month',
                    Enterprise: 'Custom',
                },
            },
            {
                name: '15,001 - 50,000',
                tiers: {
                    Scale: '$0.0050',
                    'Scale Plus': '$0.00625',
                    Enterprise: 'Custom',
                },
            },
            {
                name: '50,001 - 150,000',
                tiers: {
                    Scale: '$0.0045',
                    'Scale Plus': '$0.005625',
                    Enterprise: 'Custom',
                },
            },
            {
                name: '150,001 to 500,000',
                tiers: {
                    Scale: '$0.0040',
                    'Scale Plus': '$0.00500',
                    Enterprise: 'Custom',
                },
            },
            {
                name: '500,000 +',
                tiers: {
                    Scale: '$0.0035',
                    'Scale Plus': '$0.004375',
                    Enterprise: 'Custom',
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
                    Scale: 'Unlimited',
                    Enterprise: 'Unlimited',
                    'Scale Plus': 'Unlimited',
                },
            },
            {
                name: 'Tracked users',
                tiers: {
                    Scale: 'Unlimited',
                    Enterprise: 'Unlimited',
                    'Scale Plus': 'Unlimited',
                },
            },
            {
                name: 'Projects',
                tiers: {
                    Scale: 'Multiple',
                    Enterprise: 'Multiple',
                    'Scale Plus': 'Multiple',
                },
            },
            {
                name: 'Data retention',
                tiers: {
                    Scale: '7 years',
                    Enterprise: 'Unlimited',
                    'Scale Plus': '7 years',
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
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Recordings',
                docsLink: 'docs/user-guides/recordings',
                tiers: {
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Feature Flags',
                docsLink: 'docs/user-guides/feature-flags',
                tiers: {
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Experimentation',
                docsLink: 'docs/user-guides/experimentation',
                tiers: {
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Apps',
                docsLink: 'docs/apps',
                tiers: {
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
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
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Group Analytics',
                docsLink: 'docs/user-guides/group-analytics',
                tiers: {
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Multivariate testing',
                docsLink: 'docs/user-guides/feature-flags#multivariate-feature-flags',
                tiers: {
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Advanced Paths',
                docsLink: 'docs/user-guides/paths',
                tiers: {
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Event & properties taxonomy',
                tiers: {
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Dashboard tagging',
                tiers: {
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
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
                    Scale: 'Unlimited',
                    Enterprise: 'Unlimited',
                    'Scale Plus': 'Unlimited',
                },
            },
            {
                name: 'SSO/SAML',
                docsLink: 'docs/user-guides/sso',
                tiers: {
                    Scale: false,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'API access',
                docsLink: 'docs/api',
                tiers: {
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Private projects',
                docsLink: 'docs/user-guides/organizations-and-projects#private-projects',
                tiers: {
                    Scale: false,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Basic user permissions',
                docsLink: 'docs/user-guides/organizations-and-projects#permissions',
                tiers: {
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Advanced user permissions',
                tiers: {
                    Scale: false,
                    'Scale Plus': false,
                    Enterprise: true,
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
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Microsoft Teams',
                docsLink: 'docs/integrate/webhooks/microsoft-teams',
                tiers: {
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Discord',
                docsLink: 'docs/integrate/webhooks/discord',
                tiers: {
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Zapier',
                docsLink: 'https://zapier.com/apps/posthog/integrations',
                tiers: {
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
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
                    Scale: true,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Slack (dedicated channel)',
                tiers: {
                    Scale: '$10k/month spend or above',
                    Enterprise: true,
                    'Scale Plus': '$10k/month spend or above',
                },
            },
            {
                name: 'Email',
                tiers: {
                    Scale: '$10k/month spend or above',
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Account manager',
                tiers: {
                    Scale: false,
                    Enterprise: true,
                    'Scale Plus': false,
                },
            },
            {
                name: 'Training sessions',
                tiers: {
                    Scale: false,
                    'Scale Plus': false,
                    Enterprise: true,
                },
            },
            {
                name: 'Dashboard configuration support',
                tiers: {
                    Scale: false,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Terms and conditions',
                tiers: {
                    Scale: 'Standard',
                    'Scale Plus': 'Standard',
                    Enterprise: 'Bespoke',
                },
            },
            {
                name: 'Security assessment',
                tiers: {
                    Scale: 'Standard assessment provided',
                    Enterprise: true,
                    'Scale Plus': 'Standard assessment provided',
                },
            },
            {
                name: 'Bespoke pricing',
                tiers: {
                    Scale: false,
                    'Scale Plus': false,
                    Enterprise: true,
                },
            },
            {
                name: 'Payment via invoicing',
                tiers: {
                    Scale: false,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
            {
                name: 'Support SLAs',
                tiers: {
                    Scale: false,
                    Enterprise: true,
                    'Scale Plus': true,
                },
            },
        ],
    },
]

export const PlanComparison = ({ className = '' }) => {
    const [expanded] = useState(true)

    const displaySections = expanded ? sections : sections.slice(0, 1)

    return (
        <>
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
                                    className={`border-gray-200 px-4 hidden ${
                                        tierIdx < tiers.length - 1 ? 'py-5 border-b' : 'pt-5'
                                    }`}
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
                                        className="py-2 px-3 text-[14px] font-medium text-almost-black border-white/10 sticky top-0 w-[200px] z-10 bg-opacity-50"
                                        scope="col"
                                    >
                                        <span className="sr-only">Feature by</span>
                                        <span className="sr-only">Plans</span>
                                    </th>
                                    {tiers.map((tier) => (
                                        <th
                                            key={tier.name}
                                            className="py-2 px-3 text-sm text-left font-bold text-almost-black leading-tight border-white/10 sticky top-0  z-10 bg-opacity-75 bg-tan w-full"
                                            scope="col"
                                        >
                                            {tier.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="">
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
        </>
    )
}
