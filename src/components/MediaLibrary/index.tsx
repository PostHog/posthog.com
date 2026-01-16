import { OSInput, OSSelect } from 'components/OSForm'
import { Checkbox } from 'components/RadixUI/Checkbox'
import React, { useEffect, useMemo, useState } from 'react'
import Image from './Image'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { useMediaLibrary } from 'hooks/useMediaLibrary'
import { useUser } from 'hooks/useUser'
import OSButton from 'components/OSButton'
import { IconSpinner } from '@posthog/icons'
import debounce from 'lodash/debounce'

export default function MediaLibrary({ mediaUploading }: { mediaUploading: number }): JSX.Element {
    const { getJwt } = useUser()
    const [showAll, setShowAll] = useState(false)
    const [tag, setTag] = useState('all-tags')
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [tags, setTags] = useState<{ id: string; attributes: { label: string } }[]>([])

    const debouncedSetSearch = useMemo(
        () =>
            debounce((value: string) => {
                setDebouncedSearch(value)
            }, 500),
        []
    )

    useEffect(() => {
        debouncedSetSearch(search)
    }, [search, debouncedSetSearch])

    useEffect(() => {
        return () => debouncedSetSearch.cancel()
    }, [debouncedSetSearch])

    const { images, isLoading, hasMore, fetchMore } = useMediaLibrary({
        showAll,
        tag,
        search: debouncedSearch,
    })

    const fetchTags = async () => {
        try {
            const jwt = await getJwt()
            const tags = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/media-tags`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
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
                <div className="flex space-x-2 flex-grow-0 flex-shrink-0">
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
                        <ul className="list-none m-0 p-0 space-y-4 my-4">
                            {mediaUploading > 0 &&
                                Array.from({ length: mediaUploading }).map((_, index) => (
                                    <li key={index} className="w-full h-20 bg-accent rounded-md animate-pulse mt-2" />
                                ))}
                            {isLoading && images.length === 0 ? (
                                <li className="text-center text-secondary py-8">Loading images...</li>
                            ) : images.length === 0 ? (
                                <li className="text-center text-secondary py-8">No images found</li>
                            ) : (
                                images?.map((image: { id: string | number; [key: string]: unknown }) => (
                                    <li key={image.id}>
                                        <Image {...image} allTags={tags} fetchTags={fetchTags} />
                                    </li>
                                ))
                            )}
                        </ul>
                        {hasMore && (
                            <div className="px-4 my-2">
                                <OSButton variant="primary" width="full" onClick={fetchMore} disabled={isLoading}>
                                    {isLoading ? <IconSpinner className="size-5 mx-auto animate-spin" /> : 'Load more'}
                                </OSButton>
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}
