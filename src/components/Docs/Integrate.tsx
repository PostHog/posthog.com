import React from 'react'
import List from 'components/List'
import integrateLibrariesJson from '@data/content-integrate-libraries.json'
import type { IntegrateLibraries } from '~/data-layer/queries/content'

const { sdks, frameworks } = integrateLibrariesJson as IntegrateLibraries

export const SDKs = (): JSX.Element => {
    return (
        <List
            className="grid @sm:grid-cols-2 @xl:grid-cols-3"
            items={sdks.map(({ slug, label, image }) => ({
                label,
                url: slug,
                image: image ?? undefined,
            }))}
        />
    )
}

export const Frameworks = (): JSX.Element => {
    return (
        <List
            className="grid @sm:grid-cols-2 @xl:grid-cols-3"
            items={frameworks.map(({ slug, label, image }) => ({
                label,
                url: slug,
                image: image ?? undefined,
            }))}
        />
    )
}
