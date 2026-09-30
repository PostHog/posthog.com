import { IconX } from '@posthog/icons'
import CreatableMultiSelect from 'components/CreatableMultiSelect'
import ImageDrop, { type Image as UploadImage } from 'components/ImageDrop'
import OSButton from 'components/OSButton'
import { OSInput, OSSelect, OSTextarea } from 'components/OSForm'
import { useCreatorProfiles } from 'components/SideProjects'
import RichText from 'components/Squeak/components/RichText'
import uploadImage from 'components/Squeak/util/uploadImage'
import {
    getRelatedExhibits,
    museumRequest,
    useMuseumExhibits,
    useMuseumTaxonomy,
    type DatePrecision,
    type MuseumExhibit,
    type MuseumMedia,
} from 'hooks/useMuseum'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import { useApp } from '../../context/App'
import { useToast } from '../../context/Toast'
import { useWindow } from '../../context/Window'
import { formatLinks, isValidUrl, parseLinks, uniqueSlug } from './utils'

const IMAGE_ACCEPT = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/webp': ['.webp'],
    'image/gif': ['.gif'],
}

type FormImage = UploadImage | MuseumMedia
type InlineImage = { fakeImagePath: string; file: File; objectURL: string }

type ExhibitFormValues = {
    title: string
    category: string
    // Existing ids, or the names of new entries to create on save (CreatableMultiSelect adds raw labels)
    type: (number | string)[]
    collections: (number | string)[]
    datePrecision: DatePrecision
    dateInput: string
    plaque: string
    context: string
    videos: string
    links: string
    related: number[]
    credits: number[]
    curatorNotes: string
}

// The date input's format follows the precision: 2025-05-14, 2025-05, or 2025
const toDateInput = (date: string | undefined, precision: DatePrecision): string =>
    date ? date.slice(0, precision === 'day' ? 10 : precision === 'month' ? 7 : 4) : ''

const fromDateInput = (value: string, precision: DatePrecision): string | null => {
    const patterns: Record<DatePrecision, [RegExp, string]> = {
        day: [/^\d{4}-\d{2}-\d{2}$/, ''],
        month: [/^\d{4}-\d{2}$/, '-01'],
        year: [/^\d{4}$/, '-01-01'],
    }
    const [pattern, suffix] = patterns[precision]
    return pattern.test(value) ? `${value}${suffix}` : null
}

const toFormValues = (exhibit?: MuseumExhibit): ExhibitFormValues => ({
    title: exhibit?.title || '',
    category: exhibit?.category ? String(exhibit.category.id) : '',
    type: exhibit?.type ? [exhibit.type.id] : [],
    collections: exhibit?.collections.map((collection) => collection.id) || [],
    datePrecision: exhibit?.datePrecision || 'month',
    dateInput: toDateInput(exhibit?.date, exhibit?.datePrecision || 'month'),
    plaque: exhibit?.plaque || '',
    context: exhibit?.context || '',
    videos: exhibit?.videos.map((video) => video.url).join('\n') || '',
    links: formatLinks(exhibit?.links || []),
    related: exhibit ? getRelatedExhibits(exhibit).map((related) => related.id) : [],
    credits: exhibit?.credits.map((credit) => credit.id) || [],
    curatorNotes: exhibit?.curatorNotes || '',
})

const isUpload = (image: FormImage): image is UploadImage => 'file' in image

// Add/edit form for logged-in PostHog team members, writing straight to the Strapi collections
// /museum reads from. Opened as a window via useExhibitForm (same pattern as SideProjectForm).
// location/newWindow are consumed by the window system.
export const ExhibitForm = ({
    exhibit,
    onSuccess,
}: {
    exhibit?: MuseumExhibit
    onSuccess: (slug: string) => void
    location?: { pathname: string }
    newWindow?: boolean
}): JSX.Element => {
    const { getJwt } = useUser()
    const { addToast } = useToast()
    const { closeWindow, setWindowTitle } = useApp()
    const { appWindow } = useWindow()
    const { categories, types, collections, refresh: refreshTaxonomy } = useMuseumTaxonomy()
    const { exhibits } = useMuseumExhibits()
    const profiles = useCreatorProfiles()
    const [values, setValues] = useState<ExhibitFormValues>(toFormValues(exhibit))
    const [heroImage, setHeroImage] = useState<FormImage | undefined>(exhibit?.heroImage || undefined)
    const [gallery, setGallery] = useState<FormImage[]>(exhibit?.gallery || [])
    const [inlineImages, setInlineImages] = useState<InlineImage[]>([])
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [imageError, setImageError] = useState<string | null>(null)

    // The element key must stay "museum-exhibit-form" so the window system resolves the fixed
    // modal's appSettings, so React reuses this instance when one exhibit's form replaces
    // another's – re-seed the state whenever the target exhibit changes
    useEffect(() => {
        setValues(toFormValues(exhibit))
        setHeroImage(exhibit?.heroImage || undefined)
        setGallery(exhibit?.gallery || [])
        setInlineImages([])
        setError(null)
        setImageError(null)
        if (appWindow) {
            setWindowTitle(appWindow, exhibit ? 'Edit exhibit' : 'Add an exhibit')
        }
    }, [exhibit?.id ?? ''])

    const setValue = (key: keyof ExhibitFormValues) => (value: ExhibitFormValues[typeof key]) =>
        setValues((prev) => ({ ...prev, [key]: value }))
    const setText =
        (key: keyof ExhibitFormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setValue(key)(event.target.value)

    const closeForm = () => {
        if (appWindow) {
            closeWindow(appWindow)
        }
    }

    const categoryTypes = types.filter((type) => String(type.category?.id) === values.category)
    const links = parseLinks(values.links)
    const videoUrls = values.videos
        .split('\n')
        .map((url) => url.trim())
        .filter(Boolean)
    const date = fromDateInput(values.dateInput.trim(), values.datePrecision)
    const invalidUrls = [...links.map((link) => link.url), ...videoUrls].filter((url) => !isValidUrl(url))

    const canSubmit = Boolean(values.title.trim() && values.category && date && invalidUrls.length === 0) && !submitting

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!canSubmit) {
            return
        }
        setSubmitting(true)
        setError(null)
        try {
            const jwt = await getJwt()
            if (!jwt) {
                throw new Error('Sign in to your community profile first')
            }

            const heroImageId = heroImage
                ? isUpload(heroImage)
                    ? (await uploadImage(heroImage.file, jwt))?.id
                    : heroImage.id
                : null
            const galleryIds: number[] = []
            for (const image of gallery) {
                const id = isUpload(image) ? (await uploadImage(image.file, jwt))?.id : image.id
                if (id) {
                    galleryIds.push(id)
                }
            }

            // RichText drops images into the body under a placeholder path until they're uploaded
            let context = values.context
            for (const { fakeImagePath, file, objectURL } of inlineImages) {
                if (context.includes(fakeImagePath)) {
                    const uploaded = await uploadImage(file, jwt)
                    if (uploaded?.url) {
                        context = context.replaceAll(fakeImagePath, uploaded.url)
                    }
                }
                URL.revokeObjectURL(objectURL)
            }

            const [typeValue] = values.type
            let typeId = typeof typeValue === 'number' ? typeValue : null
            if (typeof typeValue === 'string') {
                const created = await museumRequest('museum-types', jwt, 'POST', {
                    name: typeValue,
                    slug: uniqueSlug(
                        typeValue,
                        types.map((type) => type.slug)
                    ),
                    category: Number(values.category),
                })
                typeId = created.id
            }

            const collectionIds: number[] = []
            for (const value of values.collections) {
                if (typeof value === 'number') {
                    collectionIds.push(value)
                } else {
                    const created = await museumRequest('museum-collections', jwt, 'POST', {
                        name: value,
                        slug: uniqueSlug(
                            value,
                            collections.map((collection) => collection.slug)
                        ),
                    })
                    collectionIds.push(created.id)
                }
            }

            // Links live on one side (relatedExhibits) and show on both. Keep a link another exhibit
            // already stores where it is; only store the new ones here.
            const incomingIds = exhibit?.relatedBy.map((related) => related.id) || []
            const relatedExhibits = values.related.filter((id) => !incomingIds.includes(id))

            const data = {
                title: values.title.trim(),
                slug:
                    exhibit?.slug ||
                    uniqueSlug(
                        values.title,
                        exhibits.map((existing) => existing.slug)
                    ),
                date,
                datePrecision: values.datePrecision,
                plaque: values.plaque.trim() || null,
                context: context.trim() || null,
                heroImage: heroImageId || null,
                gallery: galleryIds,
                videos: videoUrls.map((url) => ({ url })),
                links,
                category: Number(values.category),
                type: typeId,
                collections: collectionIds,
                relatedExhibits,
                credits: values.credits,
                curatorNotes: values.curatorNotes.trim() || null,
            }
            const saved = await museumRequest(
                exhibit?.id ? `museum-exhibits/${exhibit.id}` : 'museum-exhibits',
                jwt,
                exhibit?.id ? 'PUT' : 'POST',
                data
            )

            // A removed link that the other exhibit stores has to be disconnected on that exhibit
            const removedIncoming = incomingIds.filter((id) => !values.related.includes(id))
            for (const id of removedIncoming) {
                await museumRequest(`museum-exhibits/${id}`, jwt, 'PUT', {
                    relatedExhibits: { disconnect: [saved.id] },
                })
            }

            refreshTaxonomy()
            addToast({ title: exhibit?.id ? 'Exhibit updated' : 'Exhibit added', description: data.title })
            onSuccess(saved.slug || data.slug)
            closeForm()
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : 'Something went wrong. Try again.')
        } finally {
            setSubmitting(false)
        }
    }

    const datePlaceholder = { day: '2025-05-14', month: '2025-05', year: '2025' }[values.datePrecision]

    return (
        <div data-scheme="secondary" className="bg-primary p-4 text-primary">
            <form onSubmit={handleSubmit} className="space-y-4">
                <OSInput
                    label="Title"
                    name="title"
                    direction="column"
                    required
                    value={values.title}
                    onChange={setText('title')}
                />
                <div className="grid gap-4 @md:grid-cols-2">
                    <OSSelect
                        label="Category"
                        direction="column"
                        required
                        placeholder="Choose a category…"
                        value={values.category}
                        onChange={(value: string) =>
                            setValues((prev) => ({
                                ...prev,
                                category: value,
                                // Types belong to one category, so a new category clears an existing type
                                type: prev.category === value ? prev.type : [],
                            }))
                        }
                        options={categories.map((category) => ({ label: category.name, value: String(category.id) }))}
                    />
                    <CreatableMultiSelect
                        label="Type"
                        required={false}
                        placeholder={values.category ? 'Pick or add a type…' : 'Choose a category first'}
                        description="Optional. Type a new name to add one to this category."
                        options={categoryTypes.map((type) => ({ label: type.name, value: type.id }))}
                        value={values.type}
                        // One type per exhibit: the newest pick replaces the last
                        onChange={(next) => setValue('type')(next.slice(-1))}
                        allowCreate={Boolean(values.category)}
                    />
                </div>
                <div className="grid gap-4 @md:grid-cols-2">
                    <OSSelect
                        label="Date precision"
                        direction="column"
                        value={values.datePrecision}
                        onChange={(precision: DatePrecision) =>
                            setValues((prev) => {
                                const current = fromDateInput(prev.dateInput, prev.datePrecision)
                                return {
                                    ...prev,
                                    datePrecision: precision,
                                    dateInput: current ? toDateInput(current, precision) : '',
                                }
                            })
                        }
                        options={[
                            { label: 'Day', value: 'day' },
                            { label: 'Month', value: 'month' },
                            { label: 'Year', value: 'year' },
                        ]}
                    />
                    <OSInput
                        label="Date"
                        name="date"
                        direction="column"
                        required
                        type={
                            values.datePrecision === 'day'
                                ? 'date'
                                : values.datePrecision === 'month'
                                ? 'month'
                                : 'text'
                        }
                        placeholder={datePlaceholder}
                        description="Use the month or year if you don't know the exact day"
                        value={values.dateInput}
                        onChange={setText('dateInput')}
                        error={values.dateInput && !date ? `Use the format ${datePlaceholder}` : undefined}
                        touched={Boolean(values.dateInput)}
                    />
                </div>
                <OSTextarea
                    label="Plaque"
                    name="plaque"
                    direction="column"
                    rows={2}
                    maxLength={300}
                    description="1–2 sentences shown next to the artwork"
                    value={values.plaque}
                    onChange={setText('plaque')}
                />
                <div>
                    <label className="text-[15px] font-semibold">The full story</label>
                    <p className="m-0 mb-2 text-sm text-secondary">
                        Why we made it, what happened, results, fun details. Markdown is supported.
                    </p>
                    <div className="rounded border border-primary">
                        <RichText
                            key={exhibit?.id ?? 'new'}
                            initialValue={exhibit?.context || ''}
                            bodyKey="context"
                            maxLength={10000}
                            values={{ images: inlineImages }}
                            setFieldValue={(key: string, value: any) =>
                                key === 'images' ? setInlineImages(value) : setValue('context')(value)
                            }
                        />
                    </div>
                </div>
                <div>
                    <label className="text-[15px] font-semibold">Hero image</label>
                    <p className="m-0 mb-2 text-sm text-secondary">The main artwork shown in the grid.</p>
                    <ImageDrop
                        image={heroImage}
                        onDrop={(image) => {
                            setHeroImage(image)
                            setImageError(null)
                        }}
                        onRemove={() => setHeroImage(undefined)}
                        accept={IMAGE_ACCEPT}
                        onDropRejected={() =>
                            setImageError("That file can't be used – upload a single PNG, JPG, WebP, or GIF.")
                        }
                        className="h-32"
                    />
                </div>
                <div>
                    <label className="text-[15px] font-semibold">Gallery</label>
                    <p className="m-0 mb-2 text-sm text-secondary">More photos. Drop one at a time.</p>
                    {gallery.length > 0 && (
                        <div className="mb-2 flex flex-wrap gap-2">
                            {gallery.map((image, index) => (
                                <div key={isUpload(image) ? image.objectURL : image.id} className="relative">
                                    <img
                                        src={isUpload(image) ? image.objectURL : image.url}
                                        alt=""
                                        className="size-20 rounded border border-primary object-cover"
                                    />
                                    <button
                                        type="button"
                                        aria-label="Remove image"
                                        onClick={() => setGallery((prev) => prev.filter((_, i) => i !== index))}
                                        className="absolute -right-1.5 -top-1.5 rounded-full border border-primary bg-primary p-0.5"
                                    >
                                        <IconX className="size-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <ImageDrop
                        onDrop={(image) => {
                            if (image) {
                                setGallery((prev) => [...prev, image])
                            }
                            setImageError(null)
                        }}
                        onRemove={() => undefined}
                        accept={IMAGE_ACCEPT}
                        onDropRejected={() =>
                            setImageError("That file can't be used – upload a PNG, JPG, WebP, or GIF.")
                        }
                        className="!h-20"
                    />
                    {imageError && <p className="m-0 mt-2 text-sm text-red">{imageError}</p>}
                </div>
                <OSTextarea
                    label="Videos"
                    name="videos"
                    direction="column"
                    rows={2}
                    description="One YouTube or Wistia URL per line"
                    value={values.videos}
                    onChange={setText('videos')}
                />
                <CreatableMultiSelect
                    label="Collections"
                    required={false}
                    placeholder="Pick or add collections…"
                    description="Special groupings like Do more weird. Type a new name to add one."
                    options={collections.map((collection) => ({ label: collection.name, value: collection.id }))}
                    value={values.collections}
                    onChange={setValue('collections')}
                />
                <CreatableMultiSelect
                    label="Related exhibits"
                    required={false}
                    allowCreate={false}
                    placeholder="Search exhibits…"
                    description="Linked both ways – the other exhibit shows this one too"
                    options={exhibits
                        .filter((other) => other.id !== exhibit?.id)
                        .map((other) => ({ label: other.title, value: other.id }))}
                    value={values.related}
                    onChange={setValue('related')}
                />
                <OSTextarea
                    label="Links"
                    name="links"
                    direction="column"
                    rows={2}
                    description="One per line as Label | URL. Use a relative path like /blog/... for posthog.com pages."
                    placeholder="Launch post | /blog/self-driving"
                    value={values.links}
                    onChange={setText('links')}
                    error={invalidUrls.length > 0 ? `Check these URLs: ${invalidUrls.join(', ')}` : undefined}
                    touched={invalidUrls.length > 0}
                />
                <CreatableMultiSelect
                    label="Credits"
                    required={false}
                    allowCreate={false}
                    placeholder="Search team members…"
                    options={profiles.map((profile) => ({
                        label: `${profile.firstName || ''} ${profile.lastName || ''}`.trim(),
                        value: Number(profile.squeakId),
                    }))}
                    value={values.credits}
                    onChange={setValue('credits')}
                />
                <OSTextarea
                    label="Notes from the curator"
                    name="curatorNotes"
                    direction="column"
                    rows={2}
                    value={values.curatorNotes}
                    onChange={setText('curatorNotes')}
                />
                <div className="flex items-center gap-2">
                    <OSButton type="submit" variant="primary" size="md" disabled={!canSubmit}>
                        {submitting ? 'Saving…' : exhibit?.id ? 'Save changes' : 'Add exhibit'}
                    </OSButton>
                    <OSButton type="button" size="md" onClick={closeForm}>
                        Cancel
                    </OSButton>
                </div>
                {error && <p className="m-0 text-sm text-red">{error}</p>}
            </form>
        </div>
    )
}

export const useExhibitForm = (): ((exhibit: MuseumExhibit | undefined, onSuccess: (slug: string) => void) => void) => {
    const { addWindow } = useApp()
    return (exhibit, onSuccess) =>
        addWindow(
            (
                <ExhibitForm
                    // The key must match the appSettings entry exactly or the window system
                    // won't apply the fixed-modal config
                    key="museum-exhibit-form"
                    location={{ pathname: exhibit ? `museum-exhibit-form-${exhibit.id}` : 'museum-exhibit-form' }}
                    newWindow
                    exhibit={exhibit}
                    onSuccess={onSuccess}
                />
            ) as Parameters<typeof addWindow>[0]
        )
}
