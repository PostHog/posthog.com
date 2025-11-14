import React, { useEffect, useMemo, useState } from 'react'
import { useFormik } from 'formik'
import { MixtapeFormValues } from './types'
import { Fieldset } from 'components/OSFieldset'
import { OSInput, OSSelect } from 'components/OSForm'
import CassetteTape from './CassetteTape'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { IconSpinner, IconTrash } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Track } from './types'
import { cassetteLabelBackgrounds, CassetteLabelBackground } from '../../data/cassetteBackgrounds'
import SEO from 'components/seo'
import qs from 'qs'
import { useUser } from 'hooks/useUser'
import { useToast } from '../../context/Toast'

interface SortableTrackProps {
    track: Track
    index: number
    onRemove: () => void
    onChange: (e: React.ChangeEvent<any>) => void
}

const ProfileSelect = ({ value, onChange }: { value: any; onChange: (value: any) => void }) => {
    const [profiles, setProfiles] = useState<any[]>([])
    useEffect(() => {
        const query = qs.stringify({
            populate: ['avatar', 'teams'],
            pagination: {
                limit: 100,
            },
            filters: {
                teams: {
                    id: {
                        $notNull: true,
                    },
                },
            },
        })
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles?${query}`)
            .then((res) => res.json())
            .then(({ data }) => {
                setProfiles(data)
            })
    }, [])

    const sortedProfiles = useMemo(() => {
        return [...profiles]
            .sort((a, b) => {
                const nameA = [a.attributes.firstName, a.attributes.lastName].filter(Boolean).join(' ')
                const nameB = [b.attributes.firstName, b.attributes.lastName].filter(Boolean).join(' ')
                return nameA.localeCompare(nameB)
            })
            .map((profile) => {
                const name = [profile.attributes.firstName, profile.attributes.lastName].filter(Boolean).join(' ')
                return {
                    label: name,
                    value: profile,
                }
            })
    }, [profiles])

    return (
        <OSSelect
            label="Recipient"
            direction="column"
            placeholder="Recipient"
            options={sortedProfiles}
            value={(profiles.includes(value) ? value : profiles.find((profile) => profile.id === value?.id)) || {}}
            onChange={onChange}
            searchable={true}
            searchPlaceholder="Search..."
        />
    )
}

function SortableTrack({ track, index, onRemove, onChange }: SortableTrackProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: track.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div ref={setNodeRef} style={style} className="relative">
            <Fieldset
                legend={
                    <span {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
                        Track {index + 1}
                    </span>
                }
            >
                <button type="button" onClick={onRemove} className="absolute top-0 right-3 bg-primary z-10 group">
                    <IconTrash className="size-5 opacity-70 group-hover:opacity-100" />
                </button>
                <OSInput
                    label="Artist"
                    name={`tracks.${index}.artist`}
                    direction="column"
                    value={track.artist}
                    onChange={onChange}
                />
                <OSInput
                    label="Title"
                    name={`tracks.${index}.title`}
                    direction="column"
                    value={track.title}
                    onChange={onChange}
                />
                <OSInput
                    label="YouTube URL"
                    name={`tracks.${index}.youtubeUrl`}
                    direction="column"
                    value={track.youtubeUrl}
                    onChange={onChange}
                />
            </Fieldset>
        </div>
    )
}

export default function NewMixtape(): JSX.Element {
    const { addToast } = useToast()
    const { getJwt, user } = useUser()
    const [selectedLabelBackground, setSelectedLabelBackground] = useState<CassetteLabelBackground>(
        cassetteLabelBackgrounds[0]
    )

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const formik = useFormik<MixtapeFormValues>({
        initialValues: {
            recipient: null,
            tracks: [
                {
                    id: Date.now().toString(),
                    artist: '',
                    title: '',
                    youtubeUrl: '',
                },
            ],
            labelBackground: cassetteLabelBackgrounds[0],
        },
        onSubmit: async (values) => {
            try {
                // TODO: Submit to Strapi
                console.log('Submitting mixtape:', values)

                const jwt = await getJwt()
                const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/mixtapes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify({
                        data: {
                            creator: {
                                connect: [user?.profile?.id],
                            },
                            recipient: {
                                connect: [values.recipient?.id],
                            },
                            tracks: values.tracks.map((track) => ({
                                artist: track.artist,
                                title: track.title,
                                youtubeUrl: track.youtubeUrl,
                            })),
                            labelBackground: JSON.stringify(values.labelBackground),
                        },
                    }),
                })
                if (!response.ok) {
                    throw new Error('Failed to create mixtape')
                }
                const { data } = await response.json()
                console.log('Mixtape created:', data)
                addToast({
                    description: 'Mixtape created successfully',
                })
            } catch (error) {
                console.error('Error creating mixtape:', error)
            }
        },
        validate: (values) => {
            const errors: Record<string, any> = {}

            if (!values.recipient) {
                errors.recipient = 'Recipient is required'
            }

            if (!values.tracks || values.tracks.length === 0) {
                errors.tracks = 'At least one track is required'
            } else {
                const trackErrors: Record<number, any>[] = []
                values.tracks.forEach((track, index) => {
                    const trackError: Record<string, any> = {}

                    if (!track.artist) {
                        trackError.artist = 'Artist is required'
                    }

                    if (!track.title) {
                        trackError.title = 'Title is required'
                    }

                    if (!track.youtubeUrl) {
                        trackError.youtubeUrl = 'YouTube URL is required'
                    }

                    if (Object.keys(trackError).length > 0) {
                        trackErrors[index] = trackError
                    }
                })

                if (trackErrors.length > 0) {
                    errors.tracks = trackErrors
                }
            }

            return errors
        },
    })

    const addTrack = () => {
        formik.setFieldValue('tracks', [
            ...formik.values.tracks,
            { id: Date.now().toString(), artist: '', title: '', youtubeUrl: '' },
        ])
    }

    const removeTrack = (index: number) => {
        const newTracks = formik.values.tracks.filter((_, i) => i !== index)
        formik.setFieldValue('tracks', newTracks)
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event

        if (active.id !== over.id) {
            const oldIndex = formik.values.tracks.findIndex((track) => track.id === active.id)
            const newIndex = formik.values.tracks.findIndex((track) => track.id === over.id)
            formik.setFieldValue('tracks', arrayMove(formik.values.tracks, oldIndex, newIndex))
        }
    }

    return (
        <ScrollArea>
            <SEO title="New mixtape" />
            <div data-scheme="primary" className="p-4 grid grid-cols-2 gap-4 items-start">
                <div className="sticky top-4 space-y-4">
                    <CassetteTape labelBackground={selectedLabelBackground} />
                    <Fieldset legend="Label background">
                        <div className="grid grid-cols-3 gap-2">
                            {cassetteLabelBackgrounds.map((bg) => {
                                const isSelected = selectedLabelBackground?.name === bg.name
                                return (
                                    <button
                                        key={bg.name}
                                        type="button"
                                        onClick={() => setSelectedLabelBackground(bg)}
                                        className={`relative overflow-hidden rounded-md border-2 ${
                                            isSelected ? 'border-red dark:border-yellow' : 'border-input'
                                        } transition-all hover:scale-105`}
                                    >
                                        {bg.url ? (
                                            <div
                                                className="aspect-video w-full"
                                                style={{
                                                    backgroundImage: `url(${bg.url})`,
                                                    backgroundSize: bg.backgroundSize || 'auto',
                                                    backgroundRepeat: bg.backgroundRepeat || 'no-repeat',
                                                    backgroundPosition: bg.backgroundPosition || 'center',
                                                }}
                                            />
                                        ) : (
                                            <div className="aspect-video w-full bg-accent" />
                                        )}
                                        <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1">
                                            {bg.name}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </Fieldset>
                    <div>
                        <OSButton variant="primary" width="full" onClick={formik.submitForm}>
                            {formik.isSubmitting ? <IconSpinner className="size-6 animate-spin" /> : 'Publish'}
                        </OSButton>
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit} className="space-y-4 mb-0">
                    <ProfileSelect
                        value={formik.values.recipient}
                        onChange={(value) => formik.setFieldValue('recipient', value)}
                    />
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={formik.values.tracks} strategy={verticalListSortingStrategy}>
                            <div className="space-y-2">
                                {formik.values.tracks.map((track, index) => (
                                    <SortableTrack
                                        key={track.id}
                                        track={track}
                                        index={index}
                                        onRemove={() => removeTrack(index)}
                                        onChange={formik.handleChange}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>

                    <div className="flex justify-center mt-2 w-full">
                        <OSButton variant="secondary" width="full" onClick={addTrack}>
                            + Add a track
                        </OSButton>
                    </div>
                </form>
            </div>
        </ScrollArea>
    )
}
