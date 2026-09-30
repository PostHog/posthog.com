import React from 'react'
import { TreeMenu } from 'components/TreeMenu'
import { useArtifacts, useExhibits, useMuseumTaxonomy } from 'hooks/useMuseum'

export default function MuseumMenu({ activeUrl }: { activeUrl: string }): JSX.Element {
    const { artifacts } = useArtifacts()
    const { exhibits } = useExhibits()
    const { categories } = useMuseumTaxonomy()

    const items = [
        { name: 'Museum', url: '/museum' },
        ...(exhibits.length > 0 ? [{ name: 'Exhibits' }] : []),
        ...exhibits.map(({ attributes }) => ({
            name: attributes.title,
            url: `/museum/exhibits/${attributes.slug}`,
        })),
        ...categories.flatMap(({ attributes: category }) => {
            const inCategory = artifacts.filter(
                ({ attributes }) => attributes.category?.data?.attributes.slug === category.slug
            )
            return inCategory.length > 0
                ? [
                      { name: category.name },
                      ...inCategory.map(({ attributes }) => ({
                          name: attributes.title,
                          url: `/museum/artifacts/${attributes.slug}`,
                      })),
                  ]
                : []
        }),
    ]

    return (
        <div className="pb-6">
            <TreeMenu items={items} activeUrl={activeUrl} />
        </div>
    )
}
