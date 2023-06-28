import React from 'react'
import Link from 'components/Link'
import { IDocumentation } from './types'
import ContentViewer from 'components/ContentViewer'

export default function Tutorials({ tutorials }: IDocumentation) {
    return (
        <div id="tutorials">
            <ContentViewer
                title="Tutorials"
                content={tutorials.map((tutorial) => ({
                    title: tutorial.frontmatter.title,
                    body: tutorial.body,
                    tags: tutorial.frontmatter.tags,
                    author: tutorial.frontmatter.authorData[0].name,
                    video: tutorial.frontmatter.featuredVideo,
                }))}
            />
        </div>
    )
}
