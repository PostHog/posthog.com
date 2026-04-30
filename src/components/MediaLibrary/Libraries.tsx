import { OSInput, OSSelect } from 'components/OSForm'
import React, { useState } from 'react'
import { IconChevronDown, IconChevronLeft, IconSparkles, IconSpinner } from '@posthog/icons'
import OSButton from 'components/OSButton'
import Image from './Image'
import { MediaFolder, useMediaLibraryContext } from './context'
import { useMediaLibrary } from 'hooks/useMediaLibrary'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../context/App'
import HedgehogGenerator from 'components/HedgehogGenerator'

function FolderRow({ folder, onClick }: { folder: MediaFolder; onClick: () => void }) {
    const mediaCount = folder.mediaCount
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full flex items-center justify-between px-2 py-1.5 my-0.5 hover:bg-accent transition-colors text-left rounded"
        >
            <div>
                <div className="font-semibold text-primary">{folder.attributes.name}</div>
                <div className="text-sm text-secondary">
                    {mediaCount} asset{mediaCount === 1 ? '' : 's'}
                </div>
            </div>
            <IconChevronDown className="size-8 text-secondary -rotate-90" />
        </button>
    )
}

export default function Libraries(): JSX.Element {
    const { fetchUser: refreshUser, user } = useUser()
    const [search, setSearch] = useState('')
    const [tag, setTag] = useState('all-tags')
    const { addWindow } = useApp()

    const {
        folders: allFolders,
        foldersLoading,
        currentFolder,
        setCurrentFolder,
        folderStack,
        setFolderStack,
        tags,
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
        tag,
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

    const handleGenerated = () => {
        refreshImages()
        refreshUser()
    }

    const handleGenerateClick = () => {
        addWindow(
            <HedgehogGenerator
                newWindow
                location={{ pathname: `hedgehog-generator` }}
                key={`hedgehog-generator`}
                onGenerated={handleGenerated}
            />
        )
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex space-x-2 flex-grow-0 flex-shrink-0">
                <div className="flex-1">
                    <OSInput
                        size="md"
                        direction="column"
                        placeholder="Search..."
                        showLabel={false}
                        label="Search libraries"
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    />
                </div>
                <div className="w-[150px]">
                    <OSSelect
                        label="All tags"
                        showLabel={false}
                        options={[
                            { label: 'All tags', value: 'all-tags' },
                            ...tags.map((t) => ({ label: t.attributes.label, value: t.id })),
                        ]}
                        value={tag}
                        onChange={setTag}
                        placeholder="Select tag..."
                    />
                </div>
            </div>

            {currentFolder && (
                <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-1 leading-none">
                        <OSButton
                            size="sm"
                            icon={<IconChevronLeft className="text-secondary" />}
                            onClick={handleBack}
                        />
                        <span className="font-semibold text-primary text-base">{currentFolder.attributes.name}</span>
                        <span className="text-secondary text-sm">
                            {currentFolder.mediaCount} asset{currentFolder.mediaCount === 1 ? '' : 's'}
                        </span>
                    </div>
                    {currentFolder.attributes?.name === 'Hedgehogs' && user?.picasso && (
                        <OSButton icon={<IconSparkles />} onClick={handleGenerateClick}>
                            Generate
                        </OSButton>
                    )}
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
                        {currentFolder ? 'No assets found in this folder' : 'No folders found'}
                    </div>
                )}

                {hasContent && (
                    <div>
                        {tag === 'all-tags' && filteredFolders.length > 0 && (
                            <ul className="list-none m-0 p-0 divide-y divide-border">
                                {filteredFolders.map((folder) => (
                                    <li key={folder.id}>
                                        <FolderRow folder={folder} onClick={() => handleFolderClick(folder)} />
                                    </li>
                                ))}
                            </ul>
                        )}

                        {(currentFolder || !!search || tag !== 'all-tags') && images.length > 0 && (
                            <>
                                <ul className="list-none m-0 p-0 space-y-4 mb-4 mt-2">
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
