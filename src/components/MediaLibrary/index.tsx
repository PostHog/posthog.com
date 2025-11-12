import { OSInput, OSSelect } from 'components/OSForm'
import { Checkbox } from 'components/RadixUI/Checkbox'
import React, { useEffect, useState } from 'react'
import Image from './Image'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { useMediaLibrary } from 'hooks/useMediaLibrary'

export default function MediaLibrary(): JSX.Element {
    const [showAll, setShowAll] = useState(false)
    const [tag, setTag] = useState('all-tags')
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState<{ id: string; attributes: { label: string } }[]>([])

    const { images, isLoading, hasMore, fetchMore } = useMediaLibrary({
        showAll,
        tag,
        search,
    })

    const fetchTags = async () => {
        try {
            const tags = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/media-tags`)
                .then((res) => res.json())
                .then((data) => data.data)
            setTags(tags)
        } catch (error) {
            console.error('Failed to fetch tags:', error)
        }
    }

    useEffect(() => {
        fetchTags()
    }, [])

    return (
        <div data-scheme="primary" className="h-full">
            <div className="h-full flex flex-col">
                <div className="flex space-x-2 flex-grow-0 flex-shrink-0 p-4">
                    <div className="flex-1">
                        <OSInput
                            size="md"
                            direction="column"
                            placeholder="Search..."
                            showLabel={false}
                            label="Search images"
                            value={search}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center space-x-1">
                        <Checkbox
                            id="mine-only"
                            checked={!showAll}
                            onCheckedChange={(checked) => setShowAll(!checked)}
                        />
                        <label htmlFor="mine-only" className="text-sm">
                            Only mine
                        </label>
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
                            onChange={setTag}
                            placeholder="Select tag..."
                        />
                    </div>
                </div>
                <div className="flex-grow-1 min-h-0">
                    <ScrollArea>
                        <ul className="list-none m-0 p-0 space-y-2 my-4 px-4">
                            {isLoading && images.length === 0 ? (
                                <li className="text-center text-secondary py-8">Loading images...</li>
                            ) : images.length === 0 ? (
                                <li className="text-center text-secondary py-8">No images found</li>
                            ) : (
                                images?.map((image: { id: string | number; [key: string]: unknown }) => (
                                    <li key={image.id}>
                                        <Image {...image} allTags={tags} />
                                    </li>
                                ))
                            )}
                        </ul>
                        {hasMore && (
                            <div className="text-center pb-4">
                                <button
                                    onClick={fetchMore}
                                    disabled={isLoading}
                                    className="px-4 py-2 bg-accent text-primary rounded font-semibold hover:opacity-80 disabled:opacity-50"
                                >
                                    {isLoading ? 'Loading...' : 'Load more'}
                                </button>
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}
