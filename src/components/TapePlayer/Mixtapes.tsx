import React from 'react'
import { IconPlusSquare } from '@posthog/icons'
import TapeButton from './TapeButton'
import CassetteTape from './CassetteTape'
import { Mixtape } from '../../hooks/useMixtapes'
import { navigate } from 'gatsby'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../context/App'
import MixtapeEditor from './MixtapeEditor'

interface MixtapesProps {
    mixtapes: Mixtape[]
    isLoading: boolean
    refresh: () => void
    currentMixtapeId: string | null
}

export default function Mixtapes({ mixtapes, isLoading, refresh, currentMixtapeId }: MixtapesProps): JSX.Element {
    const { addWindow } = useApp()
    const { user } = useUser()

    const handleAddMixtape = () => {
        addWindow(
            (
                <MixtapeEditor
                    key={`/fm/mixtapes/new`}
                    location={{ pathname: `/fm/mixtapes/new` }}
                    newWindow
                    onSubmit={refresh}
                />
            ) as any
        )
    }

    return (
        <div className="flex-grow p-4 flex items-start">
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
                <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="w-full aspect-[100/63]">
                        <TapeButton
                            icon={
                                <span className="flex items-center justify-center space-x-1">
                                    <IconPlusSquare className="size-5" />
                                    <p className="text-base m-0 font-bold underline">Create a mixtape</p>
                                </span>
                            }
                            onClick={handleAddMixtape}
                        />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 w-full">
                    {user && (
                        <TapeButton
                            icon={
                                <span className="flex items-center justify-center space-x-1">
                                    <IconPlusSquare className="size-5" />
                                    <p className="text-base m-0 font-bold underline">Create a mixtape</p>
                                </span>
                            }
                            onClick={handleAddMixtape}
                        />
                    )}
                    {mixtapes.map((mixtape) => {
                        const isCurrentMixtape = currentMixtapeId === String(mixtape.id)
                        const genres = mixtape.attributes.genres || []
                        const creator = mixtape.attributes.creator?.data?.[0]
                        return (
                            <div key={mixtape.id} className="space-y-2">
                                <button
                                    onClick={() => navigate(`/fm?mixtapeId=${mixtape.id}`)}
                                    className={`block w-full cursor-pointer transition-all rounded ${
                                        isCurrentMixtape
                                            ? 'ring-2 ring-yellow ring-offset-2 ring-offset-primary'
                                            : 'hover:opacity-80'
                                    }`}
                                >
                                    <CassetteTape
                                        title={mixtape.attributes.title}
                                        cassetteColor={mixtape.attributes.metadata?.cassetteColor}
                                        labelColor={mixtape.attributes.metadata?.labelColor}
                                        labelBackground={mixtape.attributes.metadata?.labelBackground}
                                    />
                                </button>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {genres.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {genres.slice(0, 3).map((genre: string, index: number) => (
                                                <span
                                                    key={index}
                                                    className="text-xs px-2 py-0.5 bg-accent border border-input rounded-full text-secondary"
                                                >
                                                    {genre}
                                                </span>
                                            ))}
                                            {genres.length > 3 && (
                                                <span className="text-xs px-2 py-0.5 text-muted">
                                                    +{genres.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
