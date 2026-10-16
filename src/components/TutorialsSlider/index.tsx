import ResourceItem from 'components/Docs/ResourceItem'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

export default function TutorialsSlider({ topic, slugs }: { topic?: string; slugs?: string[] }): any {
    const nodes: any[] = []
    const tutorials = nodes.filter((tutorial) => {
        return slugs
            ? slugs.includes(tutorial.fields.slug)
            : tutorial?.frontmatter?.tags?.some((tutorialTag) => tutorialTag === topic)
    })

    return (
        <ul className="">
            {tutorials.map(({ id, frontmatter: { title, featuredImage }, fields: { slug } }) => {
                return <ResourceItem key={id} title={title} url={slug} gatsbyImage={featuredImage} />
            })}
        </ul>
    )
}

export const query = null
