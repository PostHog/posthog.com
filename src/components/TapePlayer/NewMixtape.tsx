import React from 'react'
import { useFormik } from 'formik'
import { MixtapeFormValues } from './types'
import { Fieldset } from 'components/OSFieldset'
import { OSInput, OSTextarea } from 'components/OSForm'
import CassetteTape from './CassetteTape'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { IconSpinner, IconTrash } from '@posthog/icons'
import OSButton from 'components/OSButton'
import CreatableMultiSelect from 'components/CreatableMultiSelect'
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
import { cassetteLabelBackgrounds } from '../../data/cassetteBackgrounds'
import SEO from 'components/seo'
import { useUser } from 'hooks/useUser'
import { useToast } from '../../context/Toast'
import { navigate } from 'gatsby'

interface SortableTrackProps {
    track: Track
    index: number
    onRemove: () => void
    onChange: (e: React.ChangeEvent<any>) => void
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
                className="mb-2"
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
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const formik = useFormik<MixtapeFormValues>({
        initialValues: {
            notes: '',
            genres: [],
            tracks: [],
            labelBackground: cassetteLabelBackgrounds[0],
            cassetteColor: '#d2d3cc',
            labelColor: '#eeefea',
        },
        onSubmit: async (values) => {
            try {
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
                            notes: values.notes,
                            genres: values.genres,
                            tracks: values.tracks.map((track) => ({
                                artist: track.artist,
                                title: track.title,
                                youtubeUrl: track.youtubeUrl,
                            })),
                            metadata: {
                                labelBackground: values.labelBackground,
                                cassetteColor: values.cassetteColor,
                                labelColor: values.labelColor,
                            },
                        },
                    }),
                })
                if (!response.ok) {
                    throw new Error('Failed to create mixtape')
                }
                const { data } = await response.json()
                navigate(`/fm?id=${data.id}`, { state: { newWindow: true } })
                addToast({
                    description: 'Mixtape created successfully',
                })
            } catch (error) {
                console.error('Error creating mixtape:', error)
            }
        },
        validate: (values) => {
            const errors: Record<string, any> = {}

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
                <div className="sticky top-4 space-y-2">
                    <CassetteTape
                        labelBackground={formik.values.labelBackground}
                        cassetteColor={formik.values.cassetteColor}
                        labelColor={formik.values.labelColor}
                    />
                    <div className="flex space-x-2">
                        <Fieldset legend="Cassette color" className="mb-0">
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={formik.values.cassetteColor}
                                    onChange={(e) => formik.setFieldValue('cassetteColor', e.target.value)}
                                    className="size-7 cursor-pointer rounded border-2 border-input"
                                />
                                <OSInput
                                    containerClassName="flex-1"
                                    showLabel={false}
                                    size="sm"
                                    label=""
                                    value={formik.values.cassetteColor}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        formik.setFieldValue('cassetteColor', e.target.value)
                                    }
                                    placeholder="#000000"
                                    className="flex-1"
                                />
                            </div>
                        </Fieldset>
                        <Fieldset legend="Label color" className="mb-0">
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={formik.values.labelColor}
                                    onChange={(e) => formik.setFieldValue('labelColor', e.target.value)}
                                    className="size-7 cursor-pointer rounded border-2 border-input"
                                />
                                <OSInput
                                    containerClassName="flex-1"
                                    showLabel={false}
                                    size="sm"
                                    label=""
                                    value={formik.values.labelColor}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        formik.setFieldValue('labelColor', e.target.value)
                                    }
                                    placeholder="#000000"
                                    className="flex-1"
                                />
                            </div>
                        </Fieldset>
                    </div>
                    <Fieldset legend="Label background">
                        <div className="grid grid-cols-3 gap-2">
                            {cassetteLabelBackgrounds.map((bg) => {
                                const isSelected = formik.values.labelBackground?.name === bg.name
                                return (
                                    <button
                                        key={bg.name}
                                        type="button"
                                        onClick={() => formik.setFieldValue('labelBackground', bg)}
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
                </div>
                <form onSubmit={formik.handleSubmit} className="space-y-2 mb-0">
                    <Fieldset legend="Tracklist" className="mb-0">
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
                        <div className="flex justify-center w-full">
                            <OSButton variant="secondary" width="full" onClick={addTrack}>
                                + Add a track
                            </OSButton>
                        </div>
                    </Fieldset>
                    <div>
                        <CreatableMultiSelect
                            label={<span className="font-medium">Genres</span>}
                            placeholder="Add genres..."
                            options={formik.values.genres.map((genre) => ({ label: genre, value: genre }))}
                            value={formik.values.genres}
                            onChange={(genres) => formik.setFieldValue('genres', genres)}
                            hideLabel={false}
                            required={false}
                        />
                    </div>
                    <div className="!m-0">
                        <OSTextarea
                            direction="column"
                            label="Notes"
                            name="notes"
                            value={formik.values.notes}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className="!mt-4">
                        <OSButton type="button" variant="primary" width="full" onClick={formik.submitForm}>
                            {formik.isSubmitting ? <IconSpinner className="size-6 animate-spin" /> : 'Publish'}
                        </OSButton>
                    </div>
                </form>
            </div>
        </ScrollArea>
    )
}
