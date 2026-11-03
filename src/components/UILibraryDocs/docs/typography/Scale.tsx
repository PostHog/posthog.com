import React from 'react'

const roles = [
    { token: 'text-display', metrics: '40/44 · 700', sample: 'Ship faster' },
    { token: 'text-title', metrics: '30/36 · 700', sample: 'Product analytics' },
    { token: 'text-heading-lg', metrics: '24/32 · 700', sample: 'Create your first insight' },
    { token: 'text-heading-md', metrics: '20/28 · 700', sample: 'Filter by property' },
    { token: 'text-heading-sm', metrics: '15/20 · 600', sample: 'Breakdown settings' },
    {
        token: 'text-body-lg',
        metrics: '18/28 · 500',
        sample: 'PostHog is the single platform to analyze, test, and ship.',
    },
    { token: 'text-body', metrics: '15/24 · 500', sample: 'Capture events, then build funnels and trends from them.' },
    { token: 'text-body-sm', metrics: '14/20 · 500', sample: 'Applies to all environments in this project.' },
    { token: 'text-caption', metrics: '13/18 · 500', sample: 'Updated 3 minutes ago' },
    { token: 'text-caption-sm', metrics: '12/16 · 500', sample: 'BETA' },
    { token: 'text-label', metrics: '14/20 · 600', sample: 'Project name' },
    { token: 'text-mono', metrics: '13/20 · 500', sample: "posthog.capture('signed_up')" },
]

export default function Scale(): JSX.Element {
    return (
        <div className="flex flex-col divide-y divide-[rgb(var(--text-primary)/0.1)]">
            {roles.map((role) => (
                <div
                    key={role.token}
                    className="grid gap-1 py-2 first:pt-0 last:pb-0 @md:grid-cols-[14rem_minmax(0,1fr)] @md:items-baseline @md:gap-4"
                >
                    <span className="flex items-baseline gap-2 text-caption">
                        <span className="font-code text-primary">{role.token}</span>
                        <span className="text-secondary">{role.metrics}</span>
                    </span>
                    <span
                        className={`${role.token} min-w-0 truncate text-primary ${
                            role.token === 'text-mono' ? 'font-code' : 'font-body'
                        }`}
                    >
                        {role.sample}
                    </span>
                </div>
            ))}
        </div>
    )
}
