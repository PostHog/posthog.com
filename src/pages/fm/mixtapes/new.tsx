import React, { useEffect } from 'react'
import MixtapeEditor from 'components/TapePlayer/MixtapeEditor'
import { useUser } from 'hooks/useUser'
import { navigate } from 'gatsby'
import { useApp } from '../../../context/App'
import { useWindow } from '../../../context/Window'

export default function NewMixtapePage(): JSX.Element | null {
    const { appWindow } = useWindow()
    const { closeWindow } = useApp()
    const { fetchUser } = useUser()

    useEffect(() => {
        fetchUser().then((user) => {
            if (user?.role?.type !== 'moderator') {
                closeWindow(appWindow)
                navigate('/fm')
            }
        })
    }, [])

    return <MixtapeEditor />
}
