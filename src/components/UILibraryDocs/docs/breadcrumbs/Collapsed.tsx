import React from 'react'
import { Breadcrumbs } from 'components/UI/Breadcrumbs'

export default function Collapsed(): JSX.Element {
    return (
        <Breadcrumbs.Root maxItems={3}>
            <Breadcrumbs.Item>
                <Breadcrumbs.Link to="/">Home</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>
                <Breadcrumbs.Link to="/docs">Docs</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>
                <Breadcrumbs.Link to="/docs/product-analytics">Product analytics</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>
                <Breadcrumbs.Link to="/docs/product-analytics/insights">Insights</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>
                <Breadcrumbs.Page>Trends</Breadcrumbs.Page>
            </Breadcrumbs.Item>
        </Breadcrumbs.Root>
    )
}
