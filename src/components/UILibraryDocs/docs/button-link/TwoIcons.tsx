import React from 'react'
import { IconArrowUpRight, IconPlus } from '@posthog/icons'
import { ButtonLink } from 'components/UI/Button'

export default function TwoIcons(): JSX.Element {
    return (
        <ButtonLink to="/docs" icon={<IconPlus />} iconEnd={<IconArrowUpRight />}>
            Read the docs
        </ButtonLink>
    )
}
