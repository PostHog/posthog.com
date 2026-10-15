import { useEffect } from 'react'

let openGuides = 0

/** Keep the site opaque while any guide window is open, without changing the saved display setting. */
export default function usePocketGuideReading(active: boolean): void {
    useEffect(() => {
        if (!active) return

        openGuides += 1
        document.body.setAttribute('data-pocket-guide-reading', 'true')

        return () => {
            openGuides -= 1
            if (openGuides === 0) {
                document.body.removeAttribute('data-pocket-guide-reading')
            }
        }
    }, [active])
}
