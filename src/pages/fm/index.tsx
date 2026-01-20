import React from 'react'
import TapePlayer from 'components/TapePlayer'
import { useWindow } from '../../context/Window'

export default function FMPage(): JSX.Element {
    const { appWindow } = useWindow()
    const searchParams = new URLSearchParams(appWindow?.location?.search || '')
    const mixtapeId = searchParams.get('mixtape')

    return <TapePlayer id={mixtapeId || undefined} key={`fm?mixtape=${mixtapeId}`} />
}
