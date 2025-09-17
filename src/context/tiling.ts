import { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { AppWindow } from './Window'

type Experience = 'posthog' | 'boring' | 'tiling'

interface ContainerDimensions {
    width: number
    height: number
}

interface LayoutEntry {
    position: { x: number; y: number }
    size: { width: number; height: number }
}

type LayoutMap = Map<string, LayoutEntry>

interface UseTilingLayoutParams {
    experience: Experience
    windows: AppWindow[]
    setWindows: Dispatch<SetStateAction<AppWindow[]>>
    constraintsRef: RefObject<HTMLDivElement>
}

interface UseTilingLayoutResult {
    tilingMasterRatio: number
    setTilingMasterRatio: Dispatch<SetStateAction<number>>
    tilingMasterKey: string | undefined
    setTilingMasterKey: Dispatch<SetStateAction<string | undefined>>
    tileWindows: () => boolean
}

const GAP = 8

const getContainerDimensions = (constraintsRef: RefObject<HTMLDivElement>): ContainerDimensions | null => {
    const container = constraintsRef.current
    if (!container) {
        return null
    }

    const bounds = container.getBoundingClientRect()
    return {
        width: Math.floor(bounds.width),
        height: Math.floor(bounds.height),
    }
}

const getActiveWindows = (windows: AppWindow[]): AppWindow[] => windows.filter((window) => !window.minimized)

const resolveMasterWindow = (
    activeWindows: AppWindow[],
    desiredMasterKey: string | undefined
): { master: AppWindow | undefined; resolvedKey: string | undefined } => {
    if (desiredMasterKey) {
        const existingMaster = activeWindows.find((window) => window.key === desiredMasterKey)
        if (existingMaster) {
            return { master: existingMaster, resolvedKey: desiredMasterKey }
        }
    }

    const fallback = [...activeWindows].sort((a, b) => b.zIndex - a.zIndex)[0]
    return { master: fallback, resolvedKey: fallback?.key }
}

const buildLayoutMap = (
    dimensions: ContainerDimensions,
    master: AppWindow,
    stack: AppWindow[],
    masterRatio: number
): LayoutMap => {
    const layout: LayoutMap = new Map()

    const effectiveMasterRatio = stack.length > 0 ? masterRatio : 1
    const masterWidth = Math.min(Math.max(Math.floor(dimensions.width * effectiveMasterRatio), 0), dimensions.width)
    const stackWidth = stack.length > 0 ? Math.max(dimensions.width - masterWidth - GAP, 0) : 0
    const stackX = masterWidth + (stackWidth > 0 ? GAP : 0)
    const stackSlotHeight = stack.length
        ? Math.max(0, Math.floor((dimensions.height - GAP * Math.max(stack.length - 1, 0)) / stack.length))
        : 0

    layout.set(master.key, {
        position: { x: 0, y: 0 },
        size: { width: masterWidth, height: dimensions.height },
    })

    stack.forEach((window, index) => {
        const y = index * (stackSlotHeight + GAP)
        const height = Math.min(Math.max(stackSlotHeight, 0), Math.max(dimensions.height - y, 0))
        layout.set(window.key, {
            position: { x: stackX, y },
            size: {
                width: Math.min(stackWidth, Math.max(dimensions.width - stackX, 0)),
                height,
            },
        })
    })

    return layout
}

const applyLayoutMap = (windows: AppWindow[], layout: LayoutMap): { changed: boolean; windows: AppWindow[] } => {
    let changed = false

    const nextWindows = windows.map((window) => {
        const next = layout.get(window.key)
        if (!next) {
            return window
        }

        const samePosition = window.position.x === next.position.x && window.position.y === next.position.y
        const sameSize = window.size.width === next.size.width && window.size.height === next.size.height

        if (samePosition && sameSize) {
            return window
        }

        changed = true
        return {
            ...window,
            position: {
                ...window.position,
                ...next.position,
            },
            size: {
                ...window.size,
                ...next.size,
            },
        }
    })

    return { changed, windows: nextWindows }
}

export function useTilingLayout({
    experience,
    windows,
    setWindows,
    constraintsRef,
}: UseTilingLayoutParams): UseTilingLayoutResult {
    const [tilingMasterRatio, setTilingMasterRatio] = useState(0.6)
    const [tilingMasterKey, setTilingMasterKey] = useState<string | undefined>(undefined)
    const tilingPrevSnapshotRef = useRef<string>('')
    const tilingRetryHandleRef = useRef<number | null>(null)

    const tileWindows = useCallback(() => {
        if (experience !== 'tiling') {
            return false
        }

        const dimensions = getContainerDimensions(constraintsRef)
        if (!dimensions || dimensions.width <= 0 || dimensions.height <= 0) {
            if (typeof window !== 'undefined' && tilingRetryHandleRef.current === null) {
                tilingRetryHandleRef.current = window.requestAnimationFrame(() => {
                    tilingRetryHandleRef.current = null
                    tileWindows()
                })
            }
            return false
        }

        if (tilingRetryHandleRef.current !== null && typeof window !== 'undefined') {
            window.cancelAnimationFrame(tilingRetryHandleRef.current)
            tilingRetryHandleRef.current = null
        }

        const activeWindows = getActiveWindows(windows)
        if (!activeWindows.length) {
            return false
        }

        const { master, resolvedKey } = resolveMasterWindow(activeWindows, tilingMasterKey)
        if (!master) {
            return false
        }
        if (resolvedKey && resolvedKey !== tilingMasterKey) {
            setTilingMasterKey(resolvedKey)
        }

        const stack = activeWindows.filter((window) => window !== master)
        const layout = buildLayoutMap(dimensions, master, stack, tilingMasterRatio)
        const { changed, windows: nextWindows } = applyLayoutMap(windows, layout)

        if (changed) {
            setWindows(nextWindows)
        }

        return true
    }, [constraintsRef, experience, setWindows, setTilingMasterKey, tilingMasterKey, tilingMasterRatio, windows])

    useEffect(() => {
        if (experience !== 'tiling') {
            return
        }

        if (tilingMasterKey && !windows.find((w) => w.key === tilingMasterKey && !w.minimized)) {
            const fallback = windows.filter((w) => !w.minimized).sort((a, b) => b.zIndex - a.zIndex)[0]
            if (fallback) {
                setTilingMasterKey(fallback.key)
            }
        }

        const snapshot = JSON.stringify(
            windows.map((w) => ({ key: w.key, minimized: w.minimized })).sort((a, b) => a.key.localeCompare(b.key))
        )
        if (snapshot === tilingPrevSnapshotRef.current) {
            return
        }

        const applied = tileWindows()
        if (applied) {
            tilingPrevSnapshotRef.current = snapshot
        }
    }, [experience, tileWindows, tilingMasterKey, windows])

    useEffect(() => {
        if (experience === 'tiling') {
            tileWindows()
        }
    }, [experience, tileWindows])

    useEffect(() => {
        const onResize = () => {
            if (experience === 'tiling') {
                tileWindows()
            }
        }
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', onResize)
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', onResize)
            }
        }
    }, [experience, tileWindows])

    useEffect(() => {
        return () => {
            if (typeof window !== 'undefined' && tilingRetryHandleRef.current !== null) {
                window.cancelAnimationFrame(tilingRetryHandleRef.current)
                tilingRetryHandleRef.current = null
            }
        }
    }, [])

    return {
        tilingMasterRatio,
        setTilingMasterRatio,
        tilingMasterKey,
        setTilingMasterKey,
        tileWindows,
    }
}
