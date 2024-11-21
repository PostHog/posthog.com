import React, { createContext, useEffect, useState } from 'react'
import { record } from 'rrweb'

export interface IProps {
    children: React.ReactNode
}

export const Context = createContext<any>(undefined)

export const ReplayPreviewProvider = ({ children }: IProps) => {
    const [replayReady, setReplayReady] = useState<boolean>(false)
    const [replayEvents, setReplayEvents] = useState<any[]>([])

    useEffect(() => {
        const eventBuffer: any[] = []
        const stopRecording = record({
            emit: (event) => {
                eventBuffer.push(event)
            },
        })

        setTimeout(() => {
            stopRecording?.()
            setReplayEvents(eventBuffer)
        }, 10000)

        return () => stopRecording?.()
    }, [])

    useEffect(() => {
        if (replayEvents.length > 0 && !replayReady) {
            setReplayReady(true)
        }
    }, [replayEvents])

    return <Context.Provider value={{ replayReady, replayEvents }}>{children}</Context.Provider>
}
