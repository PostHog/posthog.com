import { useAppWindows } from '../context/App'

export function useWindowLayoutAttributes() {
    const { windows } = useAppWindows()

    const hasExpandedWindow = windows.some((w) => w.expanded && !w.minimized)
    const hasSnappedLeftWindow = !hasExpandedWindow && windows.some((w) => w.snapped === 'left' && !w.minimized)
    const hasSnappedRightWindow = !hasExpandedWindow && windows.some((w) => w.snapped === 'right' && !w.minimized)

    return {
        hasExpandedWindow,
        hasSnappedLeftWindow,
        hasSnappedRightWindow,
    }
}
