import React from 'react'
import MixtapeEditor from 'components/TapePlayer/MixtapeEditor'

interface EditMixtapePageProps {
    params: {
        id: string
    }
}

export default function EditMixtapePage({ params }: EditMixtapePageProps): JSX.Element {
    return <MixtapeEditor id={params.id} />
}
