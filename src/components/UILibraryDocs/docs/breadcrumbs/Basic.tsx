import React from 'react'
import { Breadcrumbs } from 'components/UI/Breadcrumbs'

export default function Basic(): JSX.Element {
    return (
        <Breadcrumbs.Root>
            <Breadcrumbs.Item>
                <Breadcrumbs.Link to="/">Home</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>
                <Breadcrumbs.Link to="/docs">Docs</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>
                <Breadcrumbs.Page>Product analytics</Breadcrumbs.Page>
            </Breadcrumbs.Item>
        </Breadcrumbs.Root>
    )
}
