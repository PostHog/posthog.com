import React, { useState, useMemo } from 'react'
import CassetteTape from './CassetteTape'
import { useMixtapes } from '../../hooks/useMixtapes'
import { useUser } from 'hooks/useUser'
import Link from 'components/Link'
import { OSSelect } from 'components/OSForm'
import ScrollArea from 'components/RadixUI/ScrollArea'

export default function Mixtapes({
    onPlay,
    onTrackClick,
}: {
    onPlay: (id: number) => void
    onTrackClick: ({ mixtapeId, trackIndex }: { mixtapeId: number; trackIndex: number }) => void
}): JSX.Element {
    const { user } = useUser()
    const { mixtapes, isLoading } = useMixtapes()
    const [selectedGenre, setSelectedGenre] = useState<string>('all')
    const [selectedCreator, setSelectedCreator] = useState<string>('all')

    // Extract unique genres from all mixtapes
    const genreOptions = useMemo(() => {
        const genres = new Set<string>()
        mixtapes.forEach((mixtape) => {
            const mixtapeGenres = mixtape.attributes.genres || []
            mixtapeGenres.forEach((genre) => genres.add(genre))
        })
        return [
            { label: 'All genres', value: 'all' },
            ...Array.from(genres)
                .sort()
                .map((genre) => ({ label: genre, value: genre })),
        ]
    }, [mixtapes])

    // Extract unique creators from all mixtapes
    const creatorOptions = useMemo(() => {
        const creators = new Map<string, string>()
        mixtapes.forEach((mixtape) => {
            const creatorId = mixtape.attributes.creator?.data[0]?.id
            if (creatorId) {
                const firstName = mixtape.attributes.creator?.data[0]?.attributes.firstName || ''
                const lastName = mixtape.attributes.creator?.data[0]?.attributes.lastName || ''
                const fullName = [firstName, lastName].filter(Boolean).join(' ')
                if (fullName) {
                    creators.set(String(creatorId), fullName)
                }
            }
        })
        return [
            { label: 'All creators', value: 'all' },
            ...Array.from(creators.entries())
                .sort((a, b) => a[1].localeCompare(b[1]))
                .map(([id, name]) => ({ label: name, value: id })),
        ]
    }, [mixtapes])

    // Filter mixtapes based on selected genre and creator
    const filteredMixtapes = useMemo(() => {
        return mixtapes.filter((mixtape) => {
            // Filter by genre
            if (selectedGenre !== 'all') {
                const genres = mixtape.attributes.genres || []
                if (!genres.includes(selectedGenre)) {
                    return false
                }
            }

            // Filter by creator
            if (selectedCreator !== 'all') {
                const creatorId = mixtape.attributes.creator?.data[0]?.id
                if (String(creatorId) !== selectedCreator) {
                    return false
                }
            }

            return true
        })
    }, [mixtapes, selectedGenre, selectedCreator])

    const handlePlay = (id: number) => {
        onPlay(id)
    }

    return (
        <div data-scheme="secondary" className="flex flex-col bg-[#e4e3d8] dark:bg-primary h-full text-primary">
            {isLoading ? (
                <div className="grid grid-cols-2 gap-4 w-full p-4">
                    <div className="animate-pulse bg-accent border-2 border-primary rounded aspect-[100/63]" />
                    <div className="animate-pulse bg-accent border-2 border-primary rounded aspect-[100/63]" />
                    <div className="animate-pulse bg-accent border-2 border-primary rounded aspect-[100/63]" />
                </div>
            ) : mixtapes.length === 0 && !user ? (
                <div className="flex items-center justify-center w-full h-full text-center font-semibold p-4">
                    <p className="text-secondary">No mixtapes yet. Sign in to create one!</p>
                </div>
            ) : mixtapes.length === 0 ? (
                <div className="flex items-center justify-center w-full h-full text-center font-semibold p-4">
                    <p className="text-secondary">No mixtapes yet.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 gap-2 pb-4 border-b border-primary p-4">
                        <OSSelect
                            label="Filter by creator"
                            options={creatorOptions}
                            value={selectedCreator}
                            onChange={setSelectedCreator}
                            placeholder="Select a creator..."
                            direction="row"
                            size="sm"
                            width="auto"
                            showLabel={false}
                            searchable={true}
                            searchPlaceholder="Search creators..."
                            className="w-full"
                        />
                        <OSSelect
                            label="Filter by genre"
                            options={genreOptions}
                            value={selectedGenre}
                            onChange={setSelectedGenre}
                            placeholder="Select a genre..."
                            direction="row"
                            size="sm"
                            width="auto"
                            showLabel={false}
                            searchable={true}
                            searchPlaceholder="Search genres..."
                            className="w-full"
                        />
                    </div>
                    {filteredMixtapes.length === 0 ? (
                        <div className="flex items-center justify-center w-full flex-grow text-center p-4">
                            <p className="text-secondary">No mixtapes found matching the selected filters.</p>
                        </div>
                    ) : (
                        <ScrollArea>
                            <div className="grid grid-cols-2 gap-4 w-full p-4">
                                {filteredMixtapes.map((mixtape) => {
                                    const genres = mixtape.attributes.genres || []
                                    const tracks = mixtape.attributes.tracks || []
                                    return (
                                        <div key={mixtape.id}>
                                            <div className="relative group aspect-[100/63] rounded">
                                                {/* Tracklist card - starts at upper right, moves to front on hover */}
                                                <div className="absolute w-[90%] h-[90%] top-0 right-0 bg-primary border-2 border-primary rounded z-0 group-hover:z-20 transition-all duration-300 p-2 shadow-lg group-hover:translate-x-[-11%] group-hover:translate-y-[11%]">
                                                    <div className="text-left w-full h-full flex flex-col">
                                                        <div className="mb-1 pb-1 border-b border-input flex items-center justify-between space-x-1">
                                                            <h3 className="font-bold text-xs line-clamp-1">
                                                                {mixtape.attributes.title}
                                                            </h3>
                                                            {genres[0] && (
                                                                <span className="flex-shrink-0 text-xs px-2 py-0.5 bg-accent border border-input rounded-full text-secondary line-clamp-1">
                                                                    {genres[0]}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <ScrollArea>
                                                            <ul className="space-y-1 text-xs flex-grow">
                                                                {tracks.map((track, index) => (
                                                                    <li key={index}>
                                                                        <button
                                                                            onClick={() =>
                                                                                onTrackClick({
                                                                                    mixtapeId: mixtape.id,
                                                                                    trackIndex: index,
                                                                                })
                                                                            }
                                                                            className="line-clamp-1 text-left"
                                                                        >
                                                                            {index + 1}. {track.title}
                                                                        </button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </ScrollArea>
                                                    </div>
                                                </div>
                                                {/* Cassette - starts at front, moves to upper right on hover */}
                                                <div className="absolute w-[90%] h-[90%] bottom-0 left-0 z-10 group-hover:z-0 transition-all duration-300 rounded group-hover:translate-x-[11%] group-hover:translate-y-[-11%]">
                                                    <CassetteTape
                                                        cassetteColor={mixtape.attributes.metadata?.cassetteColor}
                                                        labelColor={mixtape.attributes.metadata?.labelColor}
                                                        labelBackground={mixtape.attributes.metadata?.labelBackground}
                                                        teeth={false}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between gap-2 mt-2">
                                                <div className="line-clamp-1">
                                                    <h3 className="text-sm font-semibold flex-grow truncate line-clamp-1">
                                                        {mixtape.attributes.title || 'Untitled Mixtape'}
                                                    </h3>
                                                    <p className="m-0 text-xs m-0">
                                                        By{' '}
                                                        <Link
                                                            state={{ newWindow: true }}
                                                            className="text-red dark:text-yellow font-semibold"
                                                            to={`/community/profiles/${mixtape.attributes.creator?.data[0]?.id}`}
                                                        >
                                                            {[
                                                                mixtape.attributes.creator?.data[0]?.attributes
                                                                    .firstName,
                                                                mixtape.attributes.creator?.data[0]?.attributes
                                                                    .lastName,
                                                            ]
                                                                .filter(Boolean)
                                                                .join(' ')}
                                                        </Link>
                                                    </p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <button
                                                        onClick={() => handlePlay(mixtape.id)}
                                                        className="px-2 py-0.5 text-xs font-bold bg-accent border-2 border-primary rounded hover:bg-primary transition-colors"
                                                    >
                                                        PLAY
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </ScrollArea>
                    )}
                </>
            )}
        </div>
    )
}
