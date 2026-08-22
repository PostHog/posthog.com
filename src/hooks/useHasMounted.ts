import { useEffect, useState } from 'react'

/**
 * Returns false during SSR and the initial client render, then true after the
 * component has mounted. Gate lazy/Suspense subtrees on this so the server and
 * the first client render produce the same tree — otherwise a boundary that
 * suspends only on the client triggers React error #421 and falls back to
 * client rendering.
 */
export const useHasMounted = (): boolean => {
    const [hasMounted, setHasMounted] = useState(false)
    useEffect(() => {
        setHasMounted(true)
    }, [])
    return hasMounted
}
