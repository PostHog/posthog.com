import React from 'react'
import { ButtonLink } from 'components/UI/Button'

export default function ButtonLinkInternal(): JSX.Element {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <ButtonLink to="/pricing">Pricing</ButtonLink>
            <ButtonLink to="/docs" appearance="raised">
                Read the docs
            </ButtonLink>
        </div>
    )
}
