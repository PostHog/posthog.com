import { useSyncExternalStore } from 'react'
import type { DataLineEngine } from './engine'

const serverReducedMotion = (): boolean => false

export const useReducedMotion = (engine: DataLineEngine): boolean =>
    useSyncExternalStore(engine.subscribeMotion, engine.isReducedMotion, serverReducedMotion)
