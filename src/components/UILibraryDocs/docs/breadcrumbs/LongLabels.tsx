import React from 'react'
import { Breadcrumbs } from 'components/UI/Breadcrumbs'

export default function LongLabels(): JSX.Element {
    return (
        <div className="w-full max-w-sm">
            <Breadcrumbs.Root>
                <Breadcrumbs.Item>
                    <Breadcrumbs.Link to="/handbook">PostHog company handbook</Breadcrumbs.Link>
                </Breadcrumbs.Item>
                <Breadcrumbs.Separator />
                <Breadcrumbs.Item>
                    <Breadcrumbs.Link to="/handbook/engineering">Engineering practices and processes</Breadcrumbs.Link>
                </Breadcrumbs.Item>
                <Breadcrumbs.Separator />
                <Breadcrumbs.Item>
                    <Breadcrumbs.Page>Website technical architecture</Breadcrumbs.Page>
                </Breadcrumbs.Item>
            </Breadcrumbs.Root>
        </div>
    )
}
