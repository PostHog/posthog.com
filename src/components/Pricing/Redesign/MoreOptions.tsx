import React from 'react'
import { IconHandMoney, IconRocket, IconShield } from '@posthog/icons'
import Link from 'components/Link'

/**
 * The three escape hatches for people the standard flow doesn't fit: startups
 * who want credits, larger teams who need platform features, and anyone big
 * enough to want a human on the phone.
 *
 * These replace the cut Enterprise plan column. Kept as quiet cards rather than
 * plan tiers so they don't compete with the single signup CTA above.
 */
const options = [
    {
        icon: <IconRocket className="size-6 text-blue" />,
        title: 'PostHog for Startups',
        description:
            'Raised less than $5M and under 2 years old? Get $50,000 in credits, plus free tickets to events and merch.',
        cta: 'Check eligibility',
        url: '/startups',
    },
    {
        icon: <IconShield className="size-6 text-purple" />,
        title: 'Platform packages',
        description:
            'SSO, audit logs, custom roles, and project permissions for teams that need to manage access as they grow.',
        cta: "See what's included",
        url: '/platform-packages',
    },
    {
        icon: <IconHandMoney className="size-6 text-green" />,
        title: 'Doing serious volume?',
        description:
            'Annual plans and volume discounts are available. Talk to a technical account exec – no SDRs, no discovery calls.',
        cta: 'Talk to a human',
        url: '/talk-to-a-human',
    },
]

export default function MoreOptions(): JSX.Element {
    return (
        <div className="@container not-prose">
            <div className="grid @2xl:grid-cols-3 gap-4">
                {options.map(({ icon, title, description, cta, url }) => (
                    <div
                        key={title}
                        className="flex flex-col border border-primary rounded-md p-5 bg-light dark:bg-accent hover:border-input transition-colors"
                    >
                        <div className="mb-3">{icon}</div>
                        <h3 className="text-base mb-1">{title}</h3>
                        <p className="text-sm text-secondary mb-4">{description}</p>
                        <div className="mt-auto">
                            <Link
                                to={url}
                                state={{ newWindow: true }}
                                className="text-[15px] font-semibold text-red dark:text-yellow"
                            >
                                {cta}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
