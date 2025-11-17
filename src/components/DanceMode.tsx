import React, { useEffect, useMemo, useState } from 'react'
import { useApp } from '../context/App'
import { useWindow } from '../context/Window'

const DEFAULT_GIFS: string[] = [
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG9jYTd3bmpoZ2xsbHk2YjhxOWx2aW42aDRyMjFldDI3ZWVtbjV3MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/blSTtZehjAZ8I/giphy.gif',
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW93bGRlM3N1b3JkbHg0YXVlN3FuZTd4MjlxNWE3NXhhZXg1aXZmayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iOz3p2txHIo4U/giphy.gif',
]

const AUTOPLAY_DELAY_MS = 5000

type DanceModeProps = {
    gifs?: string[]
    width?: number | string
}

export default function DanceMode({ gifs = DEFAULT_GIFS }: DanceModeProps): JSX.Element | null {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()
    const playlist = useMemo(() => gifs.filter(Boolean), [gifs])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    useEffect(() => {
        setCurrentIndex(0)
    }, [playlist])

    useEffect(() => {
        if (!playlist.length) {
            return
        }

        const timer = setTimeout(() => {
            setCurrentIndex((previousIndex) => (previousIndex + 1) % playlist.length)
        }, AUTOPLAY_DELAY_MS)

        return () => clearTimeout(timer)
    }, [playlist, currentIndex])

    useEffect(() => {
        if (typeof window === 'undefined' || !playlist.length) {
            return
        }

        const nextGif = playlist[(currentIndex + 1) % playlist.length]
        if (!nextGif) {
            return
        }

        const image = new Image()
        image.src = nextGif

        return () => {
            image.src = ''
        }
    }, [playlist, currentIndex])

    useEffect(() => {
        setIsImageLoaded(false)
    }, [currentIndex])

    useEffect(() => {
        if (!appWindow) return
        setWindowTitle(appWindow, 'Dance Mode - ♫ PostHog FM')
    }, [])

    if (!playlist.length) {
        return null
    }

    const activeGif = playlist[currentIndex]

    return (
        <button
            type="button"
            onClick={() => setCurrentIndex((previousIndex) => (previousIndex + 1) % playlist.length)}
            className={` relative block overflow-hidden bg-black p-0 size-full`}
            aria-label="Show another dance gif"
        >
            <img
                key={activeGif}
                src={activeGif}
                alt=""
                className={`h-full w-full object-cover transition-opacity duration-500 ${
                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                onLoad={() => setIsImageLoaded(true)}
            />
            {!isImageLoaded && <div className="absolute inset-0 animate-pulse bg-primary" aria-hidden="true" />}
        </button>
    )
}
