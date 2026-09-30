import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { OSInput, OSSelect, OSTextarea } from 'components/OSForm'
import OSButton from 'components/OSButton'
import CreatableMultiSelect from 'components/CreatableMultiSelect'
import ImageDrop, { type Image as UploadImage } from 'components/ImageDrop'
import uploadImage from 'components/Squeak/util/uploadImage'
import { useCreatorProfiles } from 'components/SideProjects'
import { getRelatedArtifacts, museumRequest, useArtifacts, useMuseumTaxonomy } from 'hooks/useMuseum'
import type { DatePrecision, MuseumArtifact, MuseumImage } from 'hooks/useMuseum'
import type { StrapiRecord } from 'lib/strapi'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../context/App'
import { useToast } from '../../context/Toast'
import { useWindow } from '../../context/Window'
import { uniqueSlug } from './utils'

type Artifact = StrapiRecord<MuseumArtifact>
type FormImage = UploadImage | StrapiRecord<MuseumImage>

const isUpload = (image: FormImage): image is UploadImage => 'file' in image
const upload = async (image: FormImage, jwt: string) =>
    isUpload(image) ? (await uploadImage(image.file, jwt))?.id : image.id
const preview = (image: FormImage) => (isUpload(image) ? image.objectURL : image.attributes.url)

const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    date: Yup.string()
        .required('Required')
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Enter a full date, month, or year'),
})

// Types and collections are existing ids, or names of new ones to create on save
const createMissing = async (values: (number | string)[], collection: string, jwt: string, extra = {}) =>
    Promise.all(
        values.map(async (value) =>
            typeof value === 'number'
                ? value
                : (await museumRequest(collection, jwt, 'POST', { name: value, slug: uniqueSlug(value, []), ...extra }))
                      .id
        )
    )

export const ArtifactForm = ({
    artifact,
    onSuccess,
}: {
    artifact?: Artifact
    onSuccess: () => void
    location?: { pathname: string }
    newWindow?: boolean
}): JSX.Element => {
    const { getJwt } = useUser()
    const { addToast } = useToast()
    const { closeWindow } = useApp()
    const { appWindow } = useWindow()
    const { artifacts, mutate: mutateArtifacts } = useArtifacts()
    const { categories, types, collections, mutate: mutateTaxonomy } = useMuseumTaxonomy()
    const profiles = useCreatorProfiles()
    const attributes = artifact?.attributes
    const incoming = attributes?.relatedBy?.data?.map(({ id }) => id) || []

    const formik = useFormik({
        initialValues: {
            title: attributes?.title || '',
            category: attributes?.category?.data ? String(attributes.category.data.id) : '',
            type: attributes?.type?.data ? [attributes.type.data.id] : ([] as (number | string)[]),
            date: attributes?.date || '',
            datePrecision: attributes?.datePrecision || ('month' as DatePrecision),
            plaque: attributes?.plaque || '',
            context: attributes?.context || '',
            curatorNotes: attributes?.curatorNotes || '',
            videos: attributes?.videos?.map(({ url }) => url).join('\n') || '',
            links: attributes?.links?.map(({ label, url }) => `${label} | ${url}`).join('\n') || '',
            collections: attributes?.collections?.data?.map(({ id }) => id) || ([] as (number | string)[]),
            related: artifact ? getRelatedArtifacts(artifact).map(({ id }) => id) : [],
            credits: attributes?.credits?.data?.map(({ id }) => id) || [],
            heroImage: attributes?.heroImage?.data || (undefined as FormImage | undefined),
            gallery: (attributes?.gallery?.data || []) as FormImage[],
        },
        validationSchema,
        // The window is reused when another artifact's form opens
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const jwt = await getJwt()
                if (!jwt) throw new Error('Sign in first')
                const [type] = await createMissing(values.type, 'museum-types', jwt, {
                    category: Number(values.category),
                })
                const data = {
                    title: values.title,
                    slug:
                        attributes?.slug ||
                        uniqueSlug(
                            values.title,
                            artifacts.map((a) => a.attributes.slug)
                        ),
                    category: Number(values.category),
                    type: type || null,
                    date: values.date,
                    datePrecision: values.datePrecision,
                    plaque: values.plaque,
                    context: values.context,
                    curatorNotes: values.curatorNotes,
                    videos: values.videos
                        .split('\n')
                        .filter(Boolean)
                        .map((url) => ({ url: url.trim() })),
                    links: values.links
                        .split('\n')
                        .filter(Boolean)
                        .map((line) => {
                            const [label, url] = line.split('|').map((part) => part.trim())
                            return { label: url ? label : '', url: url || label }
                        }),
                    collections: await createMissing(values.collections, 'museum-collections', jwt),
                    // Links another artifact already stores stay on that artifact
                    relatedArtifacts: values.related.filter((id) => !incoming.includes(id)),
                    credits: values.credits,
                    heroImage: values.heroImage ? await upload(values.heroImage, jwt) : null,
                    gallery: await Promise.all(values.gallery.map((image) => upload(image, jwt))),
                }
                const saved = await museumRequest(
                    artifact ? `museum-artifacts/${artifact.id}` : 'museum-artifacts',
                    jwt,
                    artifact ? 'PUT' : 'POST',
                    data
                )
                for (const id of incoming.filter((id) => !values.related.includes(id))) {
                    await museumRequest(`museum-artifacts/${id}`, jwt, 'PUT', {
                        relatedArtifacts: { disconnect: [saved.id] },
                    })
                }
                mutateArtifacts()
                mutateTaxonomy()
                onSuccess()
                if (appWindow) closeWindow(appWindow)
            } catch (error) {
                addToast({ title: 'Failed to save artifact', description: (error as Error).message, error: true })
            }
        },
    })

    const { values, setFieldValue, touched, errors, getFieldProps, isSubmitting } = formik
    const dateType = { day: 'date', month: 'month', year: 'number' }[values.datePrecision]

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
            <OSSelect
                label="Category"
                direction="column"
                required
                value={values.category}
                onChange={(value: string) => {
                    setFieldValue('category', value)
                    setFieldValue('type', [])
                }}
                options={categories.map(({ id, attributes }) => ({ label: attributes.name, value: String(id) }))}
            />
            <CreatableMultiSelect
                label="Type"
                required={false}
                allowCreate={!!values.category}
                options={types
                    .filter((type) => String(type.attributes.category?.data?.id) === values.category)
                    .map(({ id, attributes }) => ({ label: attributes.name, value: id }))}
                value={values.type}
                onChange={(next) => setFieldValue('type', next.slice(-1))}
            />
            <div className="grid grid-cols-2 gap-4">
                <OSSelect
                    label="Date precision"
                    direction="column"
                    value={values.datePrecision}
                    onChange={(value: DatePrecision) => setFieldValue('datePrecision', value)}
                    options={[
                        { label: 'Day', value: 'day' },
                        { label: 'Month', value: 'month' },
                        { label: 'Year', value: 'year' },
                    ]}
                />
                <OSInput
                    label="Date"
                    direction="column"
                    required
                    type={dateType}
                    touched={touched.date}
                    error={errors.date}
                    value={
                        values.datePrecision === 'day'
                            ? values.date
                            : values.date.slice(0, values.datePrecision === 'month' ? 7 : 4)
                    }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = event.target.value
                        setFieldValue(
                            'date',
                            values.datePrecision === 'month'
                                ? `${value}-01`
                                : values.datePrecision === 'year'
                                ? `${value}-01-01`
                                : value
                        )
                    }}
                />
            </div>
            <OSTextarea
                label="Plaque"
                direction="column"
                rows={2}
                description="1–2 sentences"
                {...getFieldProps('plaque')}
            />
            <OSTextarea
                label="The story"
                direction="column"
                rows={6}
                description="Markdown"
                {...getFieldProps('context')}
            />
            <div>
                <label className="text-[15px]">Hero image</label>
                <ImageDrop
                    image={values.heroImage && { id: 0, url: preview(values.heroImage) }}
                    onDrop={(image) => setFieldValue('heroImage', image)}
                    onRemove={() => setFieldValue('heroImage', undefined)}
                    className="h-32"
                />
            </div>
            <div>
                <label className="text-[15px]">Gallery</label>
                <div className="flex flex-wrap gap-2">
                    {values.gallery.map((image, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() =>
                                setFieldValue(
                                    'gallery',
                                    values.gallery.filter((_, i) => i !== index)
                                )
                            }
                            title="Remove"
                        >
                            <img
                                src={preview(image)}
                                alt=""
                                className="size-16 rounded border border-primary object-cover"
                            />
                        </button>
                    ))}
                </div>
                <ImageDrop
                    onDrop={(image) => image && setFieldValue('gallery', [...values.gallery, image])}
                    onRemove={() => null}
                    className="!h-16"
                />
            </div>
            <OSTextarea
                label="Videos"
                direction="column"
                rows={2}
                description="YouTube or Wistia URLs, one per line"
                {...getFieldProps('videos')}
            />
            <OSTextarea
                label="Links"
                direction="column"
                rows={2}
                description="One per line: Label | URL"
                {...getFieldProps('links')}
            />
            <CreatableMultiSelect
                label="Collections"
                required={false}
                options={collections.map(({ id, attributes }) => ({ label: attributes.name, value: id }))}
                value={values.collections}
                onChange={(next) => setFieldValue('collections', next)}
            />
            <CreatableMultiSelect
                label="Related artifacts"
                required={false}
                allowCreate={false}
                options={artifacts
                    .filter(({ id }) => id !== artifact?.id)
                    .map(({ id, attributes }) => ({ label: attributes.title, value: id }))}
                value={values.related}
                onChange={(next) => setFieldValue('related', next)}
            />
            <CreatableMultiSelect
                label="Credits"
                required={false}
                allowCreate={false}
                options={profiles.map((profile) => ({
                    label: [profile.firstName, profile.lastName].filter(Boolean).join(' '),
                    value: Number(profile.squeakId),
                }))}
                value={values.credits}
                onChange={(next) => setFieldValue('credits', next)}
            />
            <OSTextarea label="Notes from the curator" direction="column" rows={2} {...getFieldProps('curatorNotes')} />
            <OSButton type="submit" variant="primary" size="md" disabled={isSubmitting}>
                {isSubmitting ? 'Saving…' : artifact ? 'Save' : 'Add artifact'}
            </OSButton>
        </form>
    )
}

export const useArtifactForm = () => {
    const { addWindow } = useApp()
    return (artifact: Artifact | undefined, onSuccess: () => void) =>
        addWindow(
            (
                <ArtifactForm
                    key="museum-artifact-form"
                    location={{ pathname: `museum-artifact-form-${artifact?.id ?? 'new'}` }}
                    newWindow
                    artifact={artifact}
                    onSuccess={onSuccess}
                />
            ) as Parameters<typeof addWindow>[0]
        )
}
