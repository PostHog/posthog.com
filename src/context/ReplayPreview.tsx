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
        const replayEvents = localStorage.getItem('replayEvents')
        if (replayEvents) {
            setReplayEvents(JSON.parse(replayEvents))
            return
        }
        const eventBuffer: any[] = []
        const stopRecording = record({
            emit: (event) => {
                eventBuffer.push(event)
            },
        })

        setTimeout(() => {
            stopRecording?.()
            setReplayEvents(eventBuffer)
            setReplayReady(true)
            try {
                localStorage.setItem('replayEvents', JSON.stringify(eventBuffer))
            } catch (e) {
                console.warn('Failed to save replay events to localStorage:', e)
            }
        }, 8500)

        return () => stopRecording?.()
    }, [])

    return <Context.Provider value={{ replayReady, replayEvents }}>{children}</Context.Provider>
}
