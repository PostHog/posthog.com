import { OSInput } from 'components/OSForm'
import React, { useState } from 'react'
import { IconArrowLeft, IconChevronDown, IconSpinner } from '@posthog/icons'
import OSButton from 'components/OSButton'
import Image from './Image'
import { MediaFolder, useMediaLibraryContext } from './context'
import { useMediaLibrary } from 'hooks/useMediaLibrary'
import { useUser } from 'hooks/useUser'

function FolderRow({ folder, onClick }: { folder: MediaFolder; onClick: () => void }) {
    const childCount = folder.attributes.children?.data?.length ?? 0
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full flex items-center justify-between px-2 py-1.5 my-0.5 hover:bg-accent transition-colors text-left rounded"
        >
            <div>
                <div className="font-semibold text-primary">{folder.attributes.name}</div>
                {childCount > 0 && <div className="text-sm text-secondary">{childCount} subfolders</div>}
            </div>
            <IconChevronDown className="size-8 text-secondary -rotate-90" />
        </button>
    )
}

export default function Libraries(): JSX.Element {
    const { fetchUser: refreshUser } = useUser()
    const [search, setSearch] = useState('')

    const {
        folders: allFolders,
        foldersLoading,
        currentFolder,
        setCurrentFolder,
        folderStack,
        setFolderStack,
    } = useMediaLibraryContext()
    const folders = allFolders.filter((f) =>
        currentFolder ? f.attributes.parent?.data?.id === currentFolder.id : !f.attributes.parent?.data
    )
    const {
        images,
        isLoading: imagesLoading,
        hasMore,
        fetchMore,
        refresh: refreshImages,
    } = useMediaLibrary({
        showAll: true,
        search,
        folderId: currentFolder?.id ?? null,
        revalidateOnFocus: true,
    })

    const isLoading = foldersLoading || imagesLoading
    const filteredFolders = folders.filter((f) => f.attributes.name.toLowerCase().includes(search.toLowerCase()))
    const hasContent = filteredFolders.length > 0 || images.length > 0
    const showLoading = isLoading && !hasContent

    const handleFolderClick = (folder: MediaFolder) => {
        if (currentFolder) setFolderStack((prev) => [...prev, currentFolder])
        setCurrentFolder(folder)
        setSearch('')
    }

    const handleBack = () => {
        setCurrentFolder(folderStack.at(-1) ?? null)
        setFolderStack((prev) => prev.slice(0, -1))
        setSearch('')
    }

    const handleImageMoved = () => {
        refreshImages()
        refreshUser()
    }

    return (
        <div className="h-full flex flex-col">
            <OSInput
                size="md"
                direction="column"
                placeholder="Search..."
                showLabel={false}
                label="Search libraries"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />

            {currentFolder && (
                <div className="flex items-center gap-2 mt-2 px-1">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center gap-1 text-sm text-secondary hover:text-primary transition-colors"
                    >
                        <IconArrowLeft className="size-4" />
                        Back
                    </button>
                    <span className="text-sm text-secondary">/</span>
                    <span className="text-sm font-medium text-primary">{currentFolder.attributes.name}</span>
                </div>
            )}

            <div className="flex-grow-1 min-h-0 mt-2">
                {showLoading && (
                    <div className="flex items-center justify-center py-8">
                        <IconSpinner className="size-6 animate-spin text-secondary" />
                    </div>
                )}

                {!showLoading && !hasContent && (
                    <div className="text-center text-secondary py-8">
                        {currentFolder ? 'This folder is empty' : 'No folders found'}
                    </div>
                )}

                {hasContent && (
                    <div>
                        {filteredFolders.length > 0 && (
                            <ul className="list-none m-0 p-0 divide-y divide-border">
                                {filteredFolders.map((folder) => (
                                    <li key={folder.id}>
                                        <FolderRow folder={folder} onClick={() => handleFolderClick(folder)} />
                                    </li>
                                ))}
                            </ul>
                        )}

                        {currentFolder && images.length > 0 && (
                            <>
                                <ul className="list-none m-0 p-0 space-y-4 my-4">
                                    {images.map((image: any) => (
                                        <li key={image.id}>
                                            <Image {...image} onMoved={handleImageMoved} />
                                        </li>
                                    ))}
                                </ul>
                                {hasMore && (
                                    <div className="px-4 my-2">
                                        <OSButton
                                            variant="primary"
                                            width="full"
                                            onClick={fetchMore}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <IconSpinner className="size-5 mx-auto animate-spin" />
                                            ) : (
                                                'Load more'
                                            )}
                                        </OSButton>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
