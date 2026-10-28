import React from 'react'
import { IconBook } from '@posthog/icons'
import { ButtonLink } from 'components/UI/Button'

export default function ButtonLinkInternal(): JSX.Element {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <ButtonLink to="/pricing" variant="primary">
                See pricing
            </ButtonLink>
            <ButtonLink to="/docs" icon={<IconBook />}>
                Read the docs
            </ButtonLink>
            <ButtonLink to="/changelog" appearance="flat" size="sm">
                Changelog
            </ButtonLink>
        </div>
    )
}
