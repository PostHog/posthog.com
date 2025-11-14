import React from 'react'
import { useFormik } from 'formik'
import { MixtapeFormValues } from './types'
import { Fieldset } from 'components/OSFieldset'
import { OSInput } from 'components/OSForm'
import CassetteTape from './CassetteTape'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { IconTrash } from '@posthog/icons'
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
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const formik = useFormik<MixtapeFormValues>({
        initialValues: {
            creator: null,
            recipient: null,
            tracks: [
                {
                    id: Date.now().toString(),
                    artist: '',
                    title: '',
                    youtubeUrl: '',
                },
            ],
        },
        onSubmit: async (values) => {
            try {
                // TODO: Submit to Strapi
                console.log('Submitting mixtape:', values)

                // Example Strapi POST structure:
                // const response = await fetch('/api/mixtapes', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({
                //         data: {
                //             creator: values.creator,
                //             recipient: values.recipient,
                //             tracks: values.tracks
                //         }
                //     })
                // })
            } catch (error) {
                console.error('Error creating mixtape:', error)
            }
        },
        validate: (values) => {
            const errors: Record<string, any> = {}

            if (!values.creator) {
                errors.creator = 'Creator is required'
            }

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
            <div data-scheme="primary" className="p-4 grid grid-cols-2 gap-4 items-start">
                <div className="sticky top-4">
                    <CassetteTape />
                </div>
                <form onSubmit={formik.handleSubmit} className="space-y-4 mb-0">
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
                        <OSButton variant="primary" width="full" onClick={addTrack}>
                            + Add a track
                        </OSButton>
                    </div>
                </form>
            </div>
        </ScrollArea>
    )
}
