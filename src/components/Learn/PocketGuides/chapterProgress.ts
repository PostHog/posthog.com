import React, { useMemo } from 'react'

import { pocketGuideDestination } from '../../../constants/pocketGuides'
import { useUser } from '../../../hooks/useUser'
import {
    READ_CHAPTERS_STORAGE_KEY,
    parseProgress,
    readChapterSlugs,
    readLocalProgress,
    readStoredProgress,
    writeLocalProgress,
} from '../../../lib/learnProgress'
import { learnChapterPath, learnChapterSlug, normalizeUrl, type BookPageEntry } from './bookModel'

type ChapterMove = {
    volumeId: string
    pages: BookPageEntry[]
    basePath: string
    currentSlug: string
    targetHref: string
}

function markChapterRead(volumeId: string, chapterSlug: string): void {
    const progress = readLocalProgress()
    const chapterSlugs = readChapterSlugs(progress, volumeId)
    if (chapterSlugs.includes(chapterSlug)) return
    writeLocalProgress({ ...progress, [volumeId]: [...chapterSlugs, chapterSlug] })
}

function markChapterReadOnMove({ volumeId, pages, basePath, currentSlug, targetHref }: ChapterMove): void {
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

export function useMarkChapterReadOnMove(): (move: ChapterMove) => void {
    const { user, syncLocalLearnProgress } = useUser()
    return (move) => {
        markChapterReadOnMove(move)
        if (user) syncLocalLearnProgress(user)
    }
}

function subscribeToProgressInOtherTabs(onProgressChange: () => void): () => void {
    const handleStorageChange = (event: StorageEvent) => {
        if (event.key === null || event.key === READ_CHAPTERS_STORAGE_KEY) onProgressChange()
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
}

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
    const storedProgress = useSyncExternalStore(subscribeToProgressInOtherTabs, readStoredProgress, () => null)
    const profileProgress = useUser().user?.learnProgress
    return useMemo(
        () =>
            new Set([
                ...readChapterSlugs(parseProgress(storedProgress), volumeId),
                ...readChapterSlugs(profileProgress, volumeId),
            ]),
        [storedProgress, profileProgress, volumeId]
    )
}
