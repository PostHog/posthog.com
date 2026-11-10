import React from 'react'
import { ButtonGroup, ButtonLink } from 'components/UI/Button'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const productDocs = [
    { to: '/docs/product-analytics', label: 'Product analytics' },
    { to: '/docs/session-replay', label: 'Session replay' },
    { to: '/docs/feature-flags', label: 'Feature flags' },
]

const appearances = [
    { appearance: 'raised', label: 'raised · default' },
    { appearance: 'flat', label: 'flat · toolbars' },
] as const

export default function ButtonLinkInGroup(): JSX.Element {
    return (
        <DemoRows>
            {appearances.map(({ appearance, label }) => (
                <DemoRow key={appearance} label={label}>
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
