import React from 'react'
import { IconArrowUpRight } from '@posthog/icons'
import { ButtonLink } from 'components/UI/Button'

export default function ButtonLinkExternal(): JSX.Element {
    return (
        <ButtonLink
            to="https://app.posthog.com/signup"
            external
            appearance="raised"
            variant="primary"
            icon={<IconArrowUpRight />}
            iconPosition="end"
        >
            Get started – free
        </ButtonLink>
    )
}
