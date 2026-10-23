import React from 'react'
import { ButtonGroup, ButtonLink } from 'components/UI/Button'

const productDocs = [
    { to: '/docs/product-analytics', label: 'Product analytics' },
    { to: '/docs/session-replay', label: 'Session replay' },
    { to: '/docs/feature-flags', label: 'Feature flags' },
]

export default function ButtonLinkInGroup(): JSX.Element {
    return (
        <div className="flex flex-col items-start gap-3">
            {(['default', 'secondary'] as const).map((variant) => (
                <ButtonGroup key={variant} aria-label="Product docs" variant={variant}>
                    {productDocs.map(({ to, label }) => (
                        <ButtonLink key={to} to={to}>
                            {label}
                        </ButtonLink>
                    ))}
                </ButtonGroup>
            ))}
        </div>
    )
}
