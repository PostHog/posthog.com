import React from 'react'
import { useLocation } from '@reach/router'

import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import { TreeMenu } from 'components/TreeMenu'
import { docsMenu } from '../../navs'
import { pocketGuideUrl, volumeById } from '../../constants/pocketGuides'
import { learnChapterSlug, useBookPages } from './bookModel'
import LearnSurface from './LearnSurface'

/** A guide in the regular docs sidebar, without product surface tabs or book controls. */
export default function DocsPocketGuide({
    volumeId,
    chapter,
    description,
}: {
    volumeId: string
    chapter: string
    description?: string
}): JSX.Element | null {
    const location = useLocation()
    const pages = useBookPages(volumeId)
    const volume = volumeById(volumeId)
    if (!volume) return null

    const basePath = pocketGuideUrl(volume)
    const entry = pages.find((page) => learnChapterSlug(page) === chapter) ?? pages[0]
    const section = docsMenu.children.find(({ url }) => url === `/docs/${volume.docsProduct}`)

    return (
        <>
            <SEO
                title={`${entry?.title ?? volume.title} – ${volume.title} pocket guide`}
                description={description ?? volume.description}
                image="/images/og/default.png"
            />
            <ReaderView
                leftSidebar={<TreeMenu items={section?.children ?? []} activeUrl={location.pathname} />}
                hideRightSidebar
                hideTitle
                showQuestions={false}
            >
                <LearnSurface volumeId={volumeId} chapter={chapter} basePath={basePath} />
            </ReaderView>
        </>
    )
}
