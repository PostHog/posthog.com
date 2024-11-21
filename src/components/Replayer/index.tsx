import React, { useRef, useEffect } from 'react'
import rrwebPlayer from 'rrweb-player'
import 'rrweb-player/dist/style.css'

export default function Replayer({ events, configProps }: { events: any[]; configProps: any }): JSX.Element {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const player = new rrwebPlayer({
            target: ref.current,
            props: {
                events,
                showController: false,
                ...configProps,
            },
        })

        player.play()

        player.addEventListener('finish', () => {
            player.goto(0)
            player.play()
        })
    }, [])

    return <div ref={ref} />
}
