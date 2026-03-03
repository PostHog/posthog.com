import { IconUpload } from '@posthog/icons'
import uploadImage from 'components/Squeak/util/uploadImage'
import { useApp } from '../../context/App'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useWindow } from '../../context/Window'
import { useToast } from '../../context/Toast'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Tabs from 'components/RadixUI/Tabs'
import Libraries from 'components/MediaLibrary/Libraries'
import Uploads from 'components/MediaLibrary/Uploads'
import { useMediaLibraryContext } from 'components/MediaLibrary/context'

export default function MediaLibrary() {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()
    const { getJwt, user, fetchUser } = useUser()
    const [loading, setLoading] = useState(0)
    const [activeTab, setActiveTab] = useState('libraries')
    const { addToast } = useToast()
    const { currentFolder, setCurrentFolder } = useMediaLibraryContext()
    const isModerator = user?.role?.type === 'moderator'

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        setCurrentFolder(null)
    }

    const onDrop = async (acceptedFiles: File[]) => {
        const profileID = user?.profile?.id
        const jwt = await getJwt()
        if (isModerator && profileID && jwt) {
            setActiveTab('uploads')
            console.log('currentFolder', currentFolder)
            await Promise.all(
                acceptedFiles.map(async (file: File) => {
                    setLoading((loadingNumber) => loadingNumber + 1)
                    await uploadImage(file, jwt, {
                        field: 'images',
                        id: profileID,
                        type: 'api::profile.profile',
                        folderId: currentFolder?.id,
                    })
                    setLoading((loadingNumber) => loadingNumber - 1)
                })
            ).catch((err) => console.error(err))
            await fetchUser()
        }
    }

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ onDrop, noClick: true })

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'Upload media')
        }
    }, [])

    useEffect(() => {
        const handlePaste = async (e: ClipboardEvent) => {
            const items = e.clipboardData?.items
            if (!items) return

            const imageItems = Array.from(items).filter((item) => item.type.startsWith('image/'))
            if (imageItems.length === 0) return

            e.preventDefault()

            try {
                const files = await Promise.all(
                    imageItems.map(async (item) => {
                        const blob = item.getAsFile()
                        if (!blob) return null

                        const extension = blob.type.split('/')[1] || 'png'
                        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
                        const fileName = `pasted-image-${timestamp}.${extension}`

                        return new File([blob], fileName, { type: blob.type })
                    })
                )

                const validFiles = files.filter((f): f is File => f !== null)
                if (validFiles.length > 0) {
                    await onDrop(validFiles)
                    addToast({
                        description: `Pasted ${validFiles.length} image${
                            validFiles.length > 1 ? 's' : ''
                        } from clipboard`,
                        duration: 3000,
                    })
                }
            } catch (err) {
                console.error('Error pasting image:', err)
                addToast({
                    description: 'Failed to paste image from clipboard',
                    error: true,
                    duration: 3000,
                })
            }
        }

        window.addEventListener('paste', handlePaste)
        return () => {
            window.removeEventListener('paste', handlePaste)
        }
    }, [onDrop, addToast])

    return isModerator ? (
        <div {...getRootProps()} className="size-full outline-none">
            <input {...getInputProps()} />
            <ScrollArea className="w-full" dataScheme="primary" viewportClasses="bg-primary">
                <div data-scheme="primary" className="bg-primary text-primary size-full">
                    <div className="p-4 relative w-full">
                        <div data-scheme="primary" className="h-full">
                            <Tabs.Root
                                value={activeTab}
                                onValueChange={handleTabChange}
                                orientation="horizontal"
                                className="h-full flex-col w-full"
                            >
                                <div className="flex justify-center w-full rounded-md border border-primary mb-4">
                                    <Tabs.List className="grid grid-cols-2 w-full" aria-label="Media library tabs">
                                        <Tabs.Trigger
                                            value="libraries"
                                            className="justify-center cursor-pointer !h-[40px]"
                                        >
                                            Libraries
                                        </Tabs.Trigger>
                                        <Tabs.Trigger
                                            value="uploads"
                                            className="justify-center cursor-pointer !h-[40px]"
                                        >
                                            Uploads
                                        </Tabs.Trigger>
                                    </Tabs.List>
                                </div>
                                <Tabs.Content value="libraries" className="w-full">
                                    <Libraries />
                                </Tabs.Content>
                                <Tabs.Content value="uploads" className="w-full">
                                    <Uploads mediaUploading={loading} onUploadClick={open} />
                                </Tabs.Content>
                            </Tabs.Root>
                        </div>
                    </div>
                </div>
            </ScrollArea>
            {isDragActive && (
                <div className="absolute inset-0 bg-accent/70 flex items-center justify-center z-50 pointer-events-none">
                    <div className="flex flex-col items-center gap-2 text-primary">
                        <IconUpload className="size-12" />
                        <span className="text-lg font-semibold">Drop files to upload</span>
                    </div>
                </div>
            )}
        </div>
    ) : null
}
