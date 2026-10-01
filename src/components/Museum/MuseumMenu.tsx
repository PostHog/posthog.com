import React from 'react'
import { TreeMenu } from 'components/TreeMenu'
import { useArtifacts, useExhibits, useMuseumTaxonomy } from 'hooks/useMuseum'

// Exhibits that are pages in this repo rather than Strapi entries
const PERMANENT_EXHIBITS = [{ name: 'The Evolution of Marketing', url: '/museum/exhibits/evolution' }]

export default function MuseumMenu({ activeUrl }: { activeUrl: string }): JSX.Element {
    const { artifacts } = useArtifacts()
    const { exhibits } = useExhibits()
    const { categories } = useMuseumTaxonomy()

    const items = [
        { name: 'Museum', url: '/museum' },
        { name: 'Exhibits' },
        ...PERMANENT_EXHIBITS,
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
