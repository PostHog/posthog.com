import { useEffect, useRef, useState } from 'react'
import './swap.css'

const OUT_MS = 160

export function useSwap<T>(value: T): { shown: T; swapClass: string } {
    const [shown, setShown] = useState(value)
    const latest = useRef(value)
    latest.current = value
    const leaving = value !== shown

    useEffect(() => {
        if (!leaving) {
            return
        }
        const id = window.setTimeout(() => setShown(latest.current), OUT_MS)
        return () => window.clearTimeout(id)
    }, [leaving])

    return { shown, swapClass: leaving ? 'scale-swap-out' : 'scale-swap-in' }
}
