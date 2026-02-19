import React, { useEffect, useState } from 'react'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { IconChevronDown, IconSpinner } from '@posthog/icons'
import { useUser } from 'hooks/useUser'
import { useMediaLibrary } from 'hooks/useMediaLibrary'
import qs from 'qs'
import Image from './Image'
import OSButton from 'components/OSButton'

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

interface FolderProps {
    folderId: number | null
    search: string
    onFolderClick: (folder: MediaFolder) => void
}

export default function Folder({ folderId, search, onFolderClick }: FolderProps): JSX.Element {
    const { getJwt } = useUser()
    const [folders, setFolders] = useState<MediaFolder[]>([])
    const [tags, setTags] = useState<{ id: string; attributes: { label: string } }[]>([])
    const [foldersLoading, setFoldersLoading] = useState(true)
    const [foldersError, setFoldersError] = useState<string | null>(null)

    const {
        images,
        isLoading: imagesLoading,
        hasMore,
        fetchMore,
    } = useMediaLibrary({
        showAll: true,
        search,
        folderId,
    })

    const fetchTags = async () => {
        try {
            const jwt = await getJwt()
            const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/media-tags`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            const data = await response.json()
            setTags(data.data || [])
        } catch (err) {
            console.error('Failed to fetch tags:', err)
        }
    }

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                setFoldersLoading(true)
                setFoldersError(null)
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
                setFoldersError(err instanceof Error ? err.message : 'Failed to fetch folders')
            } finally {
                setFoldersLoading(false)
            }
        }

        fetchFolders()
        fetchTags()
    }, [folderId, getJwt])

    const getChildCount = (folder: MediaFolder): number => {
        return folder.attributes.children?.data?.length ?? 0
    }

    const filteredFolders = folders.filter((folder) =>
        folder.attributes.name.toLowerCase().includes(search.toLowerCase())
    )

    const isLoading = foldersLoading || (folderId !== null && imagesLoading && images.length === 0)

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <IconSpinner className="size-6 animate-spin text-secondary" />
            </div>
        )
    }

    if (foldersError) {
        return <div className="text-center text-red py-8">{foldersError}</div>
    }

    const hasContent = filteredFolders.length > 0 || images.length > 0

    if (!hasContent) {
        return (
            <div className="text-center text-secondary py-8">
                {folderId ? 'This folder is empty' : 'No folders found'}
            </div>
        )
    }

    return (
        <ScrollArea>
            {filteredFolders.length > 0 && (
                <ul className="list-none m-0 p-0 divide-y divide-border">
                    {filteredFolders.map((folder) => (
                        <li key={folder.id}>
                            <button
                                type="button"
                                onClick={() => onFolderClick(folder)}
                                className="w-full flex items-center justify-between p-2 hover:bg-accent transition-colors text-left rounded"
                            >
                                <div>
                                    <div className="font-semibold text-primary">{folder.attributes.name}</div>
                                    {getChildCount(folder) > 0 && (
                                        <div className="text-sm text-secondary">{getChildCount(folder)} subfolders</div>
                                    )}
                                </div>
                                <IconChevronDown className="size-8 text-secondary -rotate-90" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {folderId !== null && images.length > 0 && (
                <>
                    <ul className="list-none m-0 p-0 space-y-4 my-4">
                        {images.map((image: { id: string | number; [key: string]: unknown }) => (
                            <li key={image.id}>
                                <Image {...image} allTags={tags} fetchTags={fetchTags} />
                            </li>
                        ))}
                    </ul>
                    {hasMore && (
                        <div className="px-4 my-2">
                            <OSButton variant="primary" width="full" onClick={fetchMore} disabled={imagesLoading}>
                                {imagesLoading ? <IconSpinner className="size-5 mx-auto animate-spin" /> : 'Load more'}
                            </OSButton>
                        </div>
                    )}
                </>
            )}
        </ScrollArea>
    )
}
