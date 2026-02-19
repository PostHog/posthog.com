import { OSInput, OSSelect } from 'components/OSForm'
import React, { useState } from 'react'
import { IconArrowLeft } from '@posthog/icons'
import Folder, { MediaFolder } from './Folder'

export default function Libraries(): JSX.Element {
    const [search, setSearch] = useState('')
    const [tag, setTag] = useState('all-tags')
    const [tags] = useState<{ id: string; attributes: { label: string } }[]>([])
    const [currentFolder, setCurrentFolder] = useState<MediaFolder | null>(null)
    const [folderStack, setFolderStack] = useState<MediaFolder[]>([])

    const handleFolderClick = (folder: MediaFolder) => {
        if (currentFolder) {
            setFolderStack((prev) => [...prev, currentFolder])
        }
        setCurrentFolder(folder)
        setSearch('')
    }

    const handleBack = () => {
        setCurrentFolder(folderStack.at(-1) ?? null)
        setFolderStack((prev) => prev.slice(0, -1))
        setSearch('')
    }

    const handleTagChange = (value: string) => {
        setTag(value)
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
                            ...tags.map((tag) => ({ label: tag.attributes.label, value: tag.id })),
                        ]}
                        value={tag}
                        onChange={handleTagChange}
                        placeholder="Select tag..."
                    />
                </div>
            </div>

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
                <Folder folderId={currentFolder?.id ?? null} search={search} onFolderClick={handleFolderClick} />
            </div>
        </div>
    )
}
