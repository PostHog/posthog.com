import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useUser } from 'hooks/useUser'
import qs from 'qs'

export interface MediaFolder {
    id: number
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
}

const MediaLibraryContext = createContext<MediaLibraryContextType | null>(null)

export function MediaLibraryProvider({ children }: { children: React.ReactNode }) {
    const { getJwt } = useUser()
    const [folders, setFolders] = useState<MediaFolder[]>([])
    const [tags, setTags] = useState<MediaTag[]>([])
    const [foldersLoading, setFoldersLoading] = useState(true)
    const [tagsLoading, setTagsLoading] = useState(true)

    const fetchFolders = useCallback(async () => {
        try {
            setFoldersLoading(true)
            const jwt = await getJwt()
            if (!jwt) return

            const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/media-folders`, {
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
        <MediaLibraryContext.Provider value={{ folders, tags, foldersLoading, tagsLoading, fetchFolders, fetchTags }}>
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

interface UseFoldersResult {
    folders: MediaFolder[]
    isLoading: boolean
    error: string | null
    refresh: () => void
}

export function useFolders(folderId: number | null): UseFoldersResult {
    const { getJwt } = useUser()
    const [folders, setFolders] = useState<MediaFolder[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchFolders = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const jwt = await getJwt()

            const isRoot = folderId === null
            const query = qs.stringify(
                {
                    populate: ['children'],
                    ...(isRoot && {
                        filters: { parent: { id: { $null: true } } },
                    }),
                },
                { encodeValuesOnly: true }
            )

            const url = isRoot
                ? `${process.env.GATSBY_SQUEAK_API_HOST}/api/media-folders?${query}`
                : `${process.env.GATSBY_SQUEAK_API_HOST}/api/media-folders/${folderId}?${query}`

            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${jwt}` },
            })

            if (!response.ok) {
                throw new Error('Failed to fetch folders')
            }

            const data = await response.json()
            setFolders(isRoot ? data.data || [] : data.data?.attributes?.children?.data || [])
        } catch (err) {
            console.error('Failed to fetch folders:', err)
            setError(err instanceof Error ? err.message : 'Failed to fetch folders')
        } finally {
            setIsLoading(false)
        }
    }, [folderId, getJwt])

    useEffect(() => {
        fetchFolders()
    }, [fetchFolders])

    return { folders, isLoading, error, refresh: fetchFolders }
}
