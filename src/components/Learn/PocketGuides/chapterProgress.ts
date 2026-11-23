import React, { useMemo } from 'react'

import { pocketGuideDestination } from '../../../constants/pocketGuides'
import { learnChapterPath, learnChapterSlug, normalizeUrl, type BookPageEntry } from './bookModel'

const READ_CHAPTERS_STORAGE_KEY = 'pocket-guide-chapters-read'

type ReadChapterSlugsByVolume = Record<string, string[]>

function readStoredProgress(): string | null {
    try {
        return window.localStorage.getItem(READ_CHAPTERS_STORAGE_KEY)
    } catch {
        return null
    }
}

function parseProgress(storedProgress: string | null): ReadChapterSlugsByVolume {
    if (!storedProgress) return {}
    try {
        const parsedProgress = JSON.parse(storedProgress)
        return parsedProgress && typeof parsedProgress === 'object' ? parsedProgress : {}
    } catch {
        return {}
    }
}

function readChapterSlugs(progress: ReadChapterSlugsByVolume, volumeId: string): string[] {
    const chapterSlugs = progress[volumeId]
    return Array.isArray(chapterSlugs) ? chapterSlugs : []
}

function markChapterRead(volumeId: string, chapterSlug: string): void {
    const progress = parseProgress(readStoredProgress())
    const chapterSlugs = readChapterSlugs(progress, volumeId)
    if (chapterSlugs.includes(chapterSlug)) return
    try {
        window.localStorage.setItem(
            READ_CHAPTERS_STORAGE_KEY,
            JSON.stringify({ ...progress, [volumeId]: [...chapterSlugs, chapterSlug] })
        )
    } catch {
        return
    }
}

export function markChapterReadOnMove({
    volumeId,
    pages,
    basePath,
    currentSlug,
    targetHref,
}: {
    volumeId: string
    pages: BookPageEntry[]
    basePath: string
    currentSlug: string
    targetHref: string
}): void {
    const chapters = pages.filter((page) => page.page)
    const currentIndex = chapters.findIndex((page) => learnChapterSlug(page) === currentSlug)
    const nextChapter = currentIndex >= 0 ? chapters[currentIndex + 1] : undefined
    if (!nextChapter) return
    const targetPath = normalizeUrl(pocketGuideDestination(targetHref.split(/[?#]/)[0]))
    const isNextChapter =
        targetPath === learnChapterPath(basePath, nextChapter) || targetPath === normalizeUrl(nextChapter.url)
    if (!isNextChapter) return
    markChapterRead(volumeId, currentSlug)
}

// Ticks show only on the front matter and marking happens only on chapters, so nothing needs a live update.
const subscribeToNothing = () => () => undefined

// @types/react 16 lacks useSyncExternalStore; importing the components/UI/utils shim would cycle modules.
const useSyncExternalStore = (
    React as typeof React & {
        useSyncExternalStore: <Snapshot>(
            subscribe: (onChange: () => void) => () => void,
            getSnapshot: () => Snapshot,
            getServerSnapshot: () => Snapshot
        ) => Snapshot
    }
).useSyncExternalStore

export function useReadChapterSlugs(volumeId: string): Set<string> {
    const storedProgress = useSyncExternalStore(subscribeToNothing, readStoredProgress, () => null)
    return useMemo(() => new Set(readChapterSlugs(parseProgress(storedProgress), volumeId)), [storedProgress, volumeId])
}
