import { OSInput, OSSelect } from 'components/OSForm'
import React, { useState } from 'react'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { IconChevronDown } from '@posthog/icons'

interface Library {
    name: string
    folder: string
    assetCount: number
}

const libraries: Library[] = [{ name: 'Hedgehogs', folder: 'hogs', assetCount: 0 }]

export default function Libraries(): JSX.Element {
    const [search, setSearch] = useState('')
    const [tag, setTag] = useState('all-tags')
    const [tags] = useState<{ id: string; attributes: { label: string } }[]>([])

    const handleSearch = (value: string) => {
        setSearch(value)
        // TODO: Implement library search
    }

    const handleTagChange = (value: string) => {
        setTag(value)
        // TODO: Implement library tag filtering
    }

    const handleLibraryClick = (library: Library) => {
        // TODO: Implement library folder navigation
        console.log('Clicked library:', library)
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
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
            <div className="flex-grow-1 min-h-0 mt-2">
                <ScrollArea>
                    <ul className="list-none m-0 p-0 divide-y divide-border">
                        {libraries.map((library) => (
                            <li key={library.folder}>
                                <button
                                    type="button"
                                    onClick={() => handleLibraryClick(library)}
                                    className="w-full flex items-center justify-between p-2 hover:bg-accent transition-colors text-left rounded"
                                >
                                    <div>
                                        <div className="font-semibold text-primary">{library.name}</div>
                                        <div className="text-sm text-secondary">{library.assetCount} assets</div>
                                    </div>
                                    <IconChevronDown className="size-8 text-secondary -rotate-90" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </div>
        </div>
    )
}
