import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { IconDrag, IconTrash } from '@posthog/icons'
import { OSInput, OSSelect, OSTextarea } from 'components/OSForm'
import OSButton from 'components/OSButton'
import Toggle from 'components/Toggle'
import CreatableMultiSelect from 'components/CreatableMultiSelect'
import ImageDrop, { type Image as UploadImage } from 'components/ImageDrop'
import uploadImage from 'components/Squeak/util/uploadImage'
import { useCreatorProfiles } from 'components/SideProjects'
import { museumRequest, useArtifacts, useExhibits } from 'hooks/useMuseum'
import type { MuseumArtifact, MuseumExhibit } from 'hooks/useMuseum'
import type { StrapiRecord } from 'lib/strapi'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../context/App'
import { useToast } from '../../context/Toast'
import { useWindow } from '../../context/Window'
import { uniqueSlug } from './utils'

type Exhibit = StrapiRecord<MuseumExhibit>
type Stop = { artifact: number; label: string }

const Stop = ({
    stop,
    index,
    artifact,
    onChange,
    onRemove,
}: {
    stop: Stop
    index: number
    artifact?: StrapiRecord<MuseumArtifact>
    onChange: (label: string) => void
    onRemove: () => void
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: stop.artifact })
    return (
        <li
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className="flex gap-2 rounded border border-primary bg-primary p-2"
        >
            <button
                type="button"
                {...attributes}
                {...listeners}
                className="cursor-grab text-muted"
                aria-label="Reorder"
            >
                <IconDrag className="size-4" />
            </button>
            <div className="flex-1 space-y-1">
                <p className="m-0 text-sm font-semibold">
                    {index + 1}. {artifact?.attributes.title}
                </p>
                <OSTextarea
                    label="Label"
                    showLabel={false}
                    rows={2}
                    placeholder="Why it's in this exhibit"
                    value={stop.label}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
                />
            </div>
            <button type="button" onClick={onRemove} className="text-muted" aria-label="Remove">
                <IconTrash className="size-4" />
            </button>
        </li>
    )
}

export const ExhibitForm = ({
    exhibit,
    onSuccess,
}: {
    exhibit?: Exhibit
    onSuccess: () => void
    location?: { pathname: string }
    newWindow?: boolean
}): JSX.Element => {
    const { getJwt, user } = useUser()
    const { addToast } = useToast()
    const { closeWindow } = useApp()
    const { appWindow } = useWindow()
    const { artifacts } = useArtifacts()
    const { exhibits, mutate: mutateExhibits } = useExhibits()
    const profiles = useCreatorProfiles()
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )
    const attributes = exhibit?.attributes

    const formik = useFormik({
        initialValues: {
            title: attributes?.title || '',
            summary: attributes?.summary || '',
            statement: attributes?.statement || '',
            openedAt: attributes?.openedAt || '',
            featured: !!attributes?.featured,
            curators: attributes?.curators?.data?.map(({ id }) => id) || [],
            stops: (attributes?.stops || []).flatMap(({ artifact, label }) =>
                artifact.data ? [{ artifact: artifact.data.id, label: label || '' }] : []
            ) as Stop[],
            // undefined keeps the current cover, null removes it
            coverImage: undefined as UploadImage | null | undefined,
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            stops: Yup.array().min(1, 'Add at least one artifact'),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const jwt = await getJwt()
                if (!jwt) throw new Error('Sign in first')
                const data = {
                    title: values.title,
                    slug:
                        attributes?.slug ||
                        uniqueSlug(
                            values.title,
                            exhibits.map((e) => e.attributes.slug)
                        ),
                    summary: values.summary,
                    statement: values.statement,
                    openedAt: values.openedAt || null,
                    featured: values.featured,
                    curators: values.curators,
                    stops: values.stops,
                    ...(values.coverImage !== undefined && {
                        // Attached to the uploader's profile so it shows under "My uploads" in the media library
                        coverImage:
                            values.coverImage &&
                            (
                                await uploadImage(
                                    values.coverImage.file,
                                    jwt,
                                    user?.profile?.id
                                        ? { id: user.profile.id, type: 'api::profile.profile', field: 'images' }
                                        : undefined
                                )
                            )?.id,
                    }),
                }
                await museumRequest(
                    exhibit ? `museum-exhibits/${exhibit.id}` : 'museum-exhibits',
                    jwt,
                    exhibit ? 'PUT' : 'POST',
                    data
                )
                mutateExhibits()
                onSuccess()
                if (appWindow) closeWindow(appWindow)
            } catch (error) {
                addToast({ title: 'Failed to save exhibit', description: (error as Error).message, error: true })
            }
        },
    })

    const { values, setFieldValue, touched, errors, getFieldProps, isSubmitting } = formik
    const available = artifacts.filter(({ id }) => !values.stops.some((stop) => stop.artifact === id))

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over || active.id === over.id) return
        const from = values.stops.findIndex((stop) => stop.artifact === active.id)
        const to = values.stops.findIndex((stop) => stop.artifact === over.id)
        setFieldValue('stops', arrayMove(values.stops, from, to))
    }

    return (
        <form onSubmit={formik.handleSubmit} data-scheme="secondary" className="space-y-4 bg-primary p-4">
            <OSInput
                label="Title"
                direction="column"
                required
                touched={touched.title}
                error={errors.title}
                {...getFieldProps('title')}
            />
            <OSTextarea label="Summary" direction="column" rows={2} {...getFieldProps('summary')} />
            <OSTextarea
                label="Curator's statement"
                direction="column"
                rows={5}
                description="Markdown"
                {...getFieldProps('statement')}
            />
            <div className="space-y-2">
                <label className="text-[15px]">
                    Artifacts <span className="text-red dark:text-yellow">*</span>
                </label>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext
                        items={values.stops.map((stop) => stop.artifact)}
                        strategy={verticalListSortingStrategy}
                    >
                        <ol className="m-0 list-none space-y-2 p-0">
                            {values.stops.map((stop, index) => (
                                <Stop
                                    key={stop.artifact}
                                    stop={stop}
                                    index={index}
                                    artifact={artifacts.find(({ id }) => id === stop.artifact)}
                                    onChange={(label) => setFieldValue(`stops.${index}.label`, label)}
                                    onRemove={() =>
                                        setFieldValue(
                                            'stops',
                                            values.stops.filter((_, i) => i !== index)
                                        )
                                    }
                                />
                            ))}
                        </ol>
                    </SortableContext>
                </DndContext>
                <OSSelect
                    label="Add artifact"
                    showLabel={false}
                    searchable
                    placeholder="Add an artifact…"
                    value=""
                    onChange={(id: number) => setFieldValue('stops', [...values.stops, { artifact: id, label: '' }])}
                    options={available.map(({ id, attributes }) => ({ label: attributes.title, value: id }))}
                />
                {touched.stops && typeof errors.stops === 'string' && (
                    <p className="m-0 text-sm text-red dark:text-yellow">{errors.stops}</p>
                )}
            </div>
            <div>
                <label className="text-[15px]">Cover image</label>
                <ImageDrop
                    image={
                        values.coverImage === undefined && attributes?.coverImage?.data
                            ? { id: attributes.coverImage.data.id, url: attributes.coverImage.data.attributes.url }
                            : values.coverImage || undefined
                    }
                    onDrop={(image) => setFieldValue('coverImage', image)}
                    onRemove={() => setFieldValue('coverImage', null)}
                    className="h-32"
                />
            </div>
            <OSInput label="Opened" type="date" direction="column" {...getFieldProps('openedAt')} />
            <CreatableMultiSelect
                label="Curators"
                required={false}
                allowCreate={false}
                options={profiles.map((profile) => ({
                    label: [profile.firstName, profile.lastName].filter(Boolean).join(' '),
                    value: Number(profile.squeakId),
                }))}
                value={values.curators}
                onChange={(next) => setFieldValue('curators', next)}
            />
            <Toggle
                checked={values.featured}
                onChange={(checked) => setFieldValue('featured', checked)}
                label="Featured"
            />
            <OSButton type="submit" variant="primary" size="md" disabled={isSubmitting}>
                {isSubmitting ? 'Saving…' : exhibit ? 'Save' : 'Create exhibit'}
            </OSButton>
        </form>
    )
}

export const useExhibitForm = () => {
    const { addWindow } = useApp()
    return (exhibit: Exhibit | undefined, onSuccess: () => void) =>
        addWindow(
            (
                <ExhibitForm
                    key="museum-exhibit-form"
                    location={{ pathname: `museum-exhibit-form-${exhibit?.id ?? 'new'}` }}
                    newWindow
                    exhibit={exhibit}
                    onSuccess={onSuccess}
                />
            ) as Parameters<typeof addWindow>[0]
        )
}
