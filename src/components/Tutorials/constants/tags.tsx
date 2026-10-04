import { InlineCode } from 'components/InlineCode'
import React from 'react'
import tutorialTagsJson from '@data/content-tutorial-tags.json'
import type { TutorialTagList } from '~/data-layer/queries/content'

const tutorialTags = tutorialTagsJson as TutorialTagList

export const TutorialTags = (): JSX.Element => {
    return (
        <ul className="list-none m-0 p-0 mt-1">
            {tutorialTags.map((tag) => {
                return (
                    <li key={tag}>
                        <InlineCode>{tag}</InlineCode>
                    </li>
                )
            })}
        </ul>
    )
}
