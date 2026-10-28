import React from 'react'
import { ButtonGroup, ButtonLink } from 'components/UI/Button'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const productDocs = [
    { to: '/docs/product-analytics', label: 'Product analytics' },
    { to: '/docs/session-replay', label: 'Session replay' },
    { to: '/docs/feature-flags', label: 'Feature flags' },
]

export default function ButtonLinkInGroup(): JSX.Element {
    return (
        <DemoRows>
            {(['raised', 'flat'] as const).map((appearance) => (
                <DemoRow key={appearance} label={appearance}>
                    <ButtonGroup aria-label="Product docs" appearance={appearance}>
                        {productDocs.map(({ to, label }) => (
                            <ButtonLink key={to} to={to}>
                                {label}
                            </ButtonLink>
                        ))}
                    </ButtonGroup>
                </DemoRow>
            ))}
        </DemoRows>
    )
}
