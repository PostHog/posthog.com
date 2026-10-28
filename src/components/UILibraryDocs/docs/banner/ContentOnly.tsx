import React from 'react'
import { Banner } from 'components/UI/Banner'
export default function ContentOnly(): JSX.Element {
    return (
        <div className="space-y-3">
            <Banner.Root color="success">
                <Banner.Icon />
                <Banner.Content>Your data export is ready.</Banner.Content>
            </Banner.Root>
            <Banner.Root color="neutral">
                <Banner.Content>A short notice without a title or icon.</Banner.Content>
            </Banner.Root>
        </div>
    )
}
