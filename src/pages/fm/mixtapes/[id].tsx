import React from 'react'
import TapePlayer from 'components/TapePlayer'

interface MixtapePlayerPageProps {
    params: {
        id: string
    }
}

export default function MixtapePlayerPage({ params }: MixtapePlayerPageProps): JSX.Element {
    return <TapePlayer id={params.id} />
}
