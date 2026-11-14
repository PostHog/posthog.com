import { useState } from 'react'
import { stops } from '../data'

export function useStepper(initial = 0): { index: number; go: (index: number) => void } {
    const [index, setIndex] = useState(initial)
    return { index, go: (next) => setIndex(Math.min(stops.length - 1, Math.max(0, next))) }
}
