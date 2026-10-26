import React from 'react'
import { Banner } from 'components/UI/Banner'
import { ButtonLink } from 'components/UI/Button'
export default function ContentOnly(): JSX.Element {
    return (
        <div className="space-y-3">
            <Banner.Root tone="success">
                <Banner.Icon />
                <Banner.Content>Your data export is ready.</Banner.Content>
            </Banner.Root>
            <Banner.Root tone="neutral">
                <Banner.Content>A short notice without a title or icon.</Banner.Content>
            </Banner.Root>
            <Banner.Root tone="info">
                <Banner.Icon />
                <Banner.Content>Read the migration guide before you update your SDK.</Banner.Content>
                <Banner.Action>
                    <ButtonLink to="/docs/libraries" size="sm" appearance="raised">
                        Read guide
                    </ButtonLink>
                </Banner.Action>
            </Banner.Root>
        </div>
    )
}
