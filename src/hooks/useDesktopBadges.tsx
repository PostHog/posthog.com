import React, { useEffect, useMemo, useState } from 'react'
import NotificationBadge from 'components/NotificationBadge'
import { useCartStore } from '../templates/merch/store'

/** Rendered badges keyed by an `AppItem`'s `url`. */
export type DesktopBadges = Record<string, React.ReactNode>

const EMPTY: DesktopBadges = {}

export default function useDesktopBadges(): DesktopBadges {
    const cartCount = useCartStore((state) => state.count)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return useMemo(() => {
        if (!mounted) return EMPTY

        // The Store badge stays mounted at `count={0}`, where it renders nothing.
        // Dropping the entry instead would unmount the element outright and skip
        // NotificationBadge's exit animation when the cart empties.
        const badges: DesktopBadges = {
            '/merch': <NotificationBadge count={cartCount ?? 0} />,
        }
        return badges
    }, [mounted, cartCount])
}
