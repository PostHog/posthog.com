export const READ_CHAPTERS_STORAGE_KEY = 'pocket-guide-chapters-read'

export type ReadChapterIdsByGuide = Record<string, string[]>

export function readStoredProgress(): string | null {
    try {
        return window.localStorage.getItem(READ_CHAPTERS_STORAGE_KEY)
    } catch {
        return null
    }
}

export function parseProgress(storedProgress: string | null): ReadChapterIdsByGuide {
    if (!storedProgress) return {}
    try {
        const parsedProgress = JSON.parse(storedProgress)
        return parsedProgress && typeof parsedProgress === 'object' ? parsedProgress : {}
    } catch {
        return {}
    }
}

export function readLocalProgress(): ReadChapterIdsByGuide {
    return parseProgress(readStoredProgress())
}

export function writeLocalProgress(progress: ReadChapterIdsByGuide): void {
    try {
        window.localStorage.setItem(READ_CHAPTERS_STORAGE_KEY, JSON.stringify(progress))
    } catch {
        return
    }
}

export function clearLocalProgress(): void {
    try {
        window.localStorage.removeItem(READ_CHAPTERS_STORAGE_KEY)
    } catch {
        return
    }
}

export function readChapterIds(progress: ReadChapterIdsByGuide | null | undefined, progressKey: string): string[] {
    const chapterIds = progress?.[progressKey]
    return Array.isArray(chapterIds) ? chapterIds : []
}

function chaptersMissingFrom(
    progress: ReadChapterIdsByGuide,
    otherProgress: ReadChapterIdsByGuide | null | undefined
): ReadChapterIdsByGuide {
    const missingProgress: ReadChapterIdsByGuide = {}
    for (const progressKey of Object.keys(progress)) {
        const otherChapterIds = new Set(readChapterIds(otherProgress, progressKey))
        const missingChapterIds = readChapterIds(progress, progressKey).filter(
            (chapterId) => !otherChapterIds.has(chapterId)
        )
        if (missingChapterIds.length > 0) missingProgress[progressKey] = missingChapterIds
    }
    return missingProgress
}

export function hasChaptersMissingFrom(
    progress: ReadChapterIdsByGuide,
    otherProgress: ReadChapterIdsByGuide | null | undefined
): boolean {
    return Object.keys(chaptersMissingFrom(progress, otherProgress)).length > 0
}

export function forgetLocalChaptersSavedIn(savedProgress: ReadChapterIdsByGuide | null): void {
    const unsavedProgress = chaptersMissingFrom(readLocalProgress(), savedProgress)
    if (Object.keys(unsavedProgress).length === 0) return clearLocalProgress()
    writeLocalProgress(unsavedProgress)
}
