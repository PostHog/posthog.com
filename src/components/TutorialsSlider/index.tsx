import ResourceItem from 'components/Docs/ResourceItem'
import React from 'react'
import tutorialsJson from '@data/content-tutorials.json'
import type { TutorialList } from '~/data-layer/queries/content'

export default function TutorialsSlider({ topic, slugs }: { topic?: string; slugs?: string[] }): any {
    const tutorials = (tutorialsJson as TutorialList).filter((tutorial) => {
        return slugs ? slugs.includes(tutorial.slug) : tutorial.tags?.some((tutorialTag) => tutorialTag === topic)
    })

    return (
        <ul className="">
            {tutorials.map(({ id, title, slug }) => {
                return <ResourceItem key={id} title={title} url={slug} />
            })}
        </ul>
    )
}
