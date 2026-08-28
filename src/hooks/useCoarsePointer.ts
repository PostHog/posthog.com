import { useEffect, useState } from 'react'

/**
 * True when the primary input cannot hover – a phone or a tablet.
 *
 * Gates anything whose only affordance is hover. `(hover: none)` names that capability
 * directly; `(pointer: coarse)` would also catch a touchscreen laptop, where hover works
 * fine and the hover affordance is still the better control.
 *
 * Returns `false` on the server and on the first client render, so the markup Gatsby builds
 * and the markup React hydrates agree – the real value arrives in an effect straight after.
 * Whatever this gates therefore needs a hover-device fallback that is correct on its own,
 * not one that is broken until the effect runs.
 */
export default function useCoarsePointer(): boolean {
    const [coarse, setCoarse] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) {
            return
        }
        const query = window.matchMedia('(hover: none)')
        setCoarse(query.matches)

        // Re-evaluated on change, so plugging a mouse into a tablet hands hover back.
        const onChange = (event: MediaQueryListEvent): void => setCoarse(event.matches)
        query.addEventListener('change', onChange)
        return () => query.removeEventListener('change', onChange)
    }, [])

    return coarse
}
