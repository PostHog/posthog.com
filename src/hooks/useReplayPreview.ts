import { useContext } from 'react'
import { Context } from '../context/ReplayPreview'

export const useReplayPreview = () => {
    const replayPreviewData = useContext(Context)
    return replayPreviewData || {}
}
