import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useUser } from 'hooks/useUser'
import qs from 'qs'

export interface MediaFolder {
    id: number
    mediaCount: number
    attributes: {
        name: string
        parent?: {
            data: { id: number } | null
        }
        children?: {
            data: MediaFolder[]
        }
    }
}

export interface MediaTag {
    id: string
    attributes: {
        label: string
    }
}

interface MediaLibraryContextType {
    folders: MediaFolder[]
    tags: MediaTag[]
    foldersLoading: boolean
    tagsLoading: boolean
    fetchFolders: () => Promise<void>
    fetchTags: () => Promise<void>
    currentFolder: MediaFolder | null
    setCurrentFolder: React.Dispatch<React.SetStateAction<MediaFolder | null>>
    folderStack: MediaFolder[]
    setFolderStack: React.Dispatch<React.SetStateAction<MediaFolder[]>>
}

const MediaLibraryContext = createContext<MediaLibraryContextType | null>(null)

export function MediaLibraryProvider({ children }: { children: React.ReactNode }) {
    const { getJwt } = useUser()
    const [folders, setFolders] = useState<MediaFolder[]>([])
    const [tags, setTags] = useState<MediaTag[]>([])
    const [foldersLoading, setFoldersLoading] = useState(true)
    const [tagsLoading, setTagsLoading] = useState(true)
    const [currentFolder, setCurrentFolder] = useState<MediaFolder | null>(null)
    const [folderStack, setFolderStack] = useState<MediaFolder[]>([])

    const fetchFolders = useCallback(async () => {
        try {
            setFoldersLoading(true)
            const jwt = await getJwt()
            if (!jwt) return

            const query = qs.stringify(
                { populate: ['parent', 'children'], sort: ['name:asc'] },
                { encodeValuesOnly: true }
            )
            const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/media-folders?${query}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            const data = await response.json()
            setFolders(data.data || [])
        } catch (error) {
            console.error('Failed to fetch folders:', error)
        } finally {
            setFoldersLoading(false)
        }
    }, [getJwt])

    const fetchTags = useCallback(async () => {
        try {
            setTagsLoading(true)
            const jwt = await getJwt()
            if (!jwt) return

            const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/media-tags`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            const data = await response.json()
            setTags(data.data || [])
        } catch (error) {
            console.error('Failed to fetch tags:', error)
        } finally {
            setTagsLoading(false)
        }
    }, [getJwt])

    useEffect(() => {
        fetchFolders()
        fetchTags()
    }, [fetchFolders, fetchTags])

    return (
        <MediaLibraryContext.Provider
            value={{
                folders,
                tags,
                foldersLoading,
                tagsLoading,
                fetchFolders,
                fetchTags,
                currentFolder,
                setCurrentFolder,
                folderStack,
                setFolderStack,
            }}
        >
            {children}
        </MediaLibraryContext.Provider>
    )
}

export function useMediaLibraryContext() {
    const context = useContext(MediaLibraryContext)
    if (!context) {
        throw new Error('useMediaLibraryContext must be used within a MediaLibraryProvider')
    }
    return context
}
