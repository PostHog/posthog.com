import React from 'react'
import MediaLibrary from 'components/MediaLibrary'
import { MediaLibraryProvider } from 'components/MediaLibrary/context'

export default function MediaUploadModal() {
    return (
        <MediaLibraryProvider>
            <MediaLibrary />
        </MediaLibraryProvider>
    )
}
