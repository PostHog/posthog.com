export const READ_CHAPTERS_STORAGE_KEY = 'pocket-guide-chapters-read'

export type ReadChapterSlugsByVolume = Record<string, string[]>

export function readStoredProgress(): string | null {
    try {
        return window.localStorage.getItem(READ_CHAPTERS_STORAGE_KEY)
    } catch {
        return null
    }
}

export function parseProgress(storedProgress: string | null): ReadChapterSlugsByVolume {
    if (!storedProgress) return {}
    try {
        const parsedProgress = JSON.parse(storedProgress)
        return parsedProgress && typeof parsedProgress === 'object' ? parsedProgress : {}
    } catch {
        return {}
    }
}

export function readLocalProgress(): ReadChapterSlugsByVolume {
    return parseProgress(readStoredProgress())
}

export function writeLocalProgress(progress: ReadChapterSlugsByVolume): void {
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

export function readChapterSlugs(progress: ReadChapterSlugsByVolume | null | undefined, volumeId: string): string[] {
    const chapterSlugs = progress?.[volumeId]
    return Array.isArray(chapterSlugs) ? chapterSlugs : []
}

function chaptersMissingFrom(
    progress: ReadChapterSlugsByVolume,
    otherProgress: ReadChapterSlugsByVolume | null | undefined
): ReadChapterSlugsByVolume {
    const missingProgress: ReadChapterSlugsByVolume = {}
    for (const volumeId of Object.keys(progress)) {
        const otherChapterSlugs = new Set(readChapterSlugs(otherProgress, volumeId))
        const missingChapterSlugs = readChapterSlugs(progress, volumeId).filter(
            (chapterSlug) => !otherChapterSlugs.has(chapterSlug)
        )
        if (missingChapterSlugs.length > 0) missingProgress[volumeId] = missingChapterSlugs
    }
    return missingProgress
}

export function hasChaptersMissingFrom(
    progress: ReadChapterSlugsByVolume,
    otherProgress: ReadChapterSlugsByVolume | null | undefined
): boolean {
    return Object.keys(chaptersMissingFrom(progress, otherProgress)).length > 0
}

export function forgetLocalChaptersSavedIn(savedProgress: ReadChapterSlugsByVolume | null): void {
    const unsavedProgress = chaptersMissingFrom(readLocalProgress(), savedProgress)
    if (Object.keys(unsavedProgress).length === 0) return clearLocalProgress()
    writeLocalProgress(unsavedProgress)
}
