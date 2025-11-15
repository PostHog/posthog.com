import React, { useEffect } from 'react'
import CassetteTape from './CassetteTape'
import { useMixtapes } from '../../hooks/useMixtapes'
import { navigate } from 'gatsby'
import { useUser } from 'hooks/useUser'
import Link from 'components/Link'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'

export default function Mixtapes(): JSX.Element {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()
    const { user } = useUser()
    const { mixtapes, isLoading } = useMixtapes()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'Mixtapes')
        }
    }, [])

    return (
        <div data-scheme="secondary" className="p-4 flex items-start bg-primary h-full">
            {isLoading ? (
                <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="animate-pulse bg-accent border-2 border-primary rounded aspect-[100/63]" />
                    <div className="animate-pulse bg-accent border-2 border-primary rounded aspect-[100/63]" />
                    <div className="animate-pulse bg-accent border-2 border-primary rounded aspect-[100/63]" />
                </div>
            ) : mixtapes.length === 0 && !user ? (
                <div className="flex items-center justify-center w-full h-full text-center">
                    <p className="text-secondary">No mixtapes yet. Sign in to create one!</p>
                </div>
            ) : mixtapes.length === 0 ? (
                <div className="flex items-center justify-center w-full h-full text-center">
                    <p className="text-secondary">No mixtapes yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 w-full">
                    {mixtapes.map((mixtape) => {
                        const genres = mixtape.attributes.genres || []
                        const tracks = mixtape.attributes.tracks || []
                        return (
                            <div key={mixtape.id}>
                                <div className="relative group aspect-[100/63] rounded">
                                    {/* Tracklist card - starts at upper right, moves to front on hover */}
                                    <div className="absolute w-[90%] h-[90%] top-0 right-0 bg-primary border-2 border-primary rounded z-0 group-hover:z-20 transition-all duration-300 p-2 shadow-lg group-hover:translate-x-[-11%] group-hover:translate-y-[11%]">
                                        <div className="text-left w-full h-full flex flex-col">
                                            <div className="mb-1 pb-1 border-b border-input flex items-center justify-between space-x-1">
                                                <h3 className="font-bold text-xs flex-shrink-0">A SIDE</h3>
                                                {genres[0] && (
                                                    <span className="text-xs px-2 py-0.5 bg-accent border border-input rounded-full text-secondary line-clamp-1">
                                                        {genres[0]}
                                                    </span>
                                                )}
                                            </div>
                                            <ul className="space-y-1 text-xs overflow-auto flex-grow">
                                                {tracks.map((track, index) => (
                                                    <li key={index} className="truncate">
                                                        {index + 1}. {track.title}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    {/* Cassette - starts at front, moves to upper right on hover */}
                                    <div className="absolute w-[90%] h-[90%] bottom-0 left-0 z-10 group-hover:z-0 transition-all duration-300 rounded group-hover:translate-x-[11%] group-hover:translate-y-[-11%]">
                                        <CassetteTape
                                            cassetteColor={mixtape.attributes.metadata?.cassetteColor}
                                            labelColor={mixtape.attributes.metadata?.labelColor}
                                            labelBackground={mixtape.attributes.metadata?.labelBackground}
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
                                                    mixtape.attributes.creator?.data[0]?.attributes.firstName,
                                                    mixtape.attributes.creator?.data[0]?.attributes.lastName,
                                                ]
                                                    .filter(Boolean)
                                                    .join(' ')}
                                            </Link>
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <button
                                            onClick={() =>
                                                navigate(`/fm?mixtapeId=${mixtape.id}`, { state: { newWindow: true } })
                                            }
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
            )}
        </div>
    )
}
