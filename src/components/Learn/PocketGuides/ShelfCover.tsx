import React from 'react'

import { type PocketGuideVolume } from '../../../constants/pocketGuides'

import Cover from './Cover'
import { useBookPages } from './bookModel'

/** A shelf cover opens its book on the first chapter, skipping the introduction. */
export default function ShelfCover({ volume, count }: { volume: PocketGuideVolume; count: number }): JSX.Element {
    const firstChapter = useBookPages(volume.id).find((page) => !page.isFrontMatter)
    return <Cover placement="shelf" volume={volume} count={count} to={firstChapter?.url} />
}
