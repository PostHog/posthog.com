import { createContext, useContext } from 'react'
import type { DataLineEngine } from './engine'

export const DataLineContext = createContext<DataLineEngine | null>(null)

export function useDataLine(): DataLineEngine {
    const engine = useContext(DataLineContext)
    if (!engine) {
        throw new Error('DataLine parts must render inside a DataLineProvider')
    }
    return engine
}
