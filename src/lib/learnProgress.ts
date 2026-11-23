const READ_CHAPTERS_STORAGE_KEY = 'pocket-guide-chapters-read'

export type ReadChapterIdsByVolume = Record<string, string[]>

export function readStoredProgress(): string | null {
    try {
        return window.localStorage.getItem(READ_CHAPTERS_STORAGE_KEY)
    } catch {
        return null
    }
}

export function parseProgress(storedProgress: string | null): ReadChapterIdsByVolume {
    if (!storedProgress) return {}
    try {
        const parsedProgress = JSON.parse(storedProgress)
        return parsedProgress && typeof parsedProgress === 'object' ? parsedProgress : {}
    } catch {
        return {}
    }
}

export function readLocalProgress(): ReadChapterIdsByVolume {
    return parseProgress(readStoredProgress())
}

export function writeLocalProgress(progress: ReadChapterIdsByVolume): void {
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

export function readChapterIds(progress: ReadChapterIdsByVolume | null | undefined, volumeId: string): string[] {
    const chapterIds = progress?.[volumeId]
    return Array.isArray(chapterIds) ? chapterIds : []
}

export function mergeProgress(
    ...progressSources: (ReadChapterIdsByVolume | null | undefined)[]
): ReadChapterIdsByVolume {
    const mergedProgress: ReadChapterIdsByVolume = {}
    for (const progress of progressSources) {
        for (const volumeId of Object.keys(progress ?? {})) {
            const chapterIds = new Set([
                ...readChapterIds(mergedProgress, volumeId),
                ...readChapterIds(progress, volumeId),
            ])
            mergedProgress[volumeId] = Array.from(chapterIds)
        }
    }
    return mergedProgress
}

export function hasChaptersMissingFrom(
    progress: ReadChapterIdsByVolume,
    otherProgress: ReadChapterIdsByVolume | null | undefined
): boolean {
    return Object.keys(progress).some((volumeId) => {
        const otherChapterIds = new Set(readChapterIds(otherProgress, volumeId))
        return readChapterIds(progress, volumeId).some((chapterId) => !otherChapterIds.has(chapterId))
    })
}
