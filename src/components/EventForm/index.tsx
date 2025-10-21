import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { OSInput, OSTextarea } from 'components/OSForm'
import OSButton from 'components/OSButton'
import { graphql, useStaticQuery } from 'gatsby'
import dayjs from 'dayjs'
import { useUser } from 'hooks/useUser'
import { IconSpinner, IconCheck, IconX } from '@posthog/icons'
import Toggle from 'components/Toggle'
import ImageDrop, { type Image as UploadImage } from 'components/ImageDrop'
import uploadImage from 'components/Squeak/util/uploadImage'
import { useToast } from '../../context/Toast'

type EventFormValues = {
    name: string
    date: string
    startTime: string
    description: string
    link: string
    locationLabel: string
    locationLat?: string
    locationLng?: string
    venueName?: string
    format: string[]
    audience: string[]
    speakers: string[]
    private: boolean
    speakerTopic?: string
    partners: Array<{ name: string; url?: string }>
    attendees?: string
    vibeScore?: string
    photosLocal: UploadImage[]
    video?: string
    presentation?: string
}

type SelectOption = {
    label: string
    value: any
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    date: Yup.string().required('Date is required'),
    startTime: Yup.string().optional(),
    description: Yup.string().optional(),
    link: Yup.string().url('Enter a valid URL').optional(),
    locationLabel: Yup.string().required('Location is required'),
    format: Yup.array().of(Yup.string()).min(1, 'Select at least one format'),
    audience: Yup.array().of(Yup.string()).min(1, 'Select at least one audience'),
    speakers: Yup.array().of(Yup.string()).optional(),
    speakerTopic: Yup.string().optional(),
    attendees: Yup.string().optional(),
    vibeScore: Yup.number().integer().min(0).max(5).optional(),
    video: Yup.string().url('Enter a valid URL').optional(),
    presentation: Yup.string().url('Enter a valid URL').optional(),
})

function CreatableMultiSelect({
    label,
    placeholder,
    description,
    options,
    value,
    onChange,
    onBlur,
    touched,
    error,
    allowCreate = true,
}: {
    label: string
    placeholder?: string
    description?: string
    options: SelectOption[]
    value: any[]
    onChange: (next: any[]) => void
    onBlur?: () => void
    touched?: boolean
    error?: string
    allowCreate?: boolean
}) {
    const [availableOptions, setAvailableOptions] = React.useState<SelectOption[]>(options)
    const [query, setQuery] = React.useState<string>('')
    const [focused, setFocused] = React.useState<boolean>(false)
    const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1)
    const listRef = React.useRef<HTMLDivElement | null>(null)

    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return availableOptions
        return availableOptions.filter((opt) => opt.label.toLowerCase().includes(q))
    }, [query, availableOptions])

    React.useEffect(() => {
        // Clamp or reset highlighted index when the filtered list changes or focus toggles
        if (!focused || filtered.length === 0) {
            setHighlightedIndex(-1)
            return
        }
        setHighlightedIndex((prev) => (prev >= 0 && prev < filtered.length ? prev : -1))
    }, [filtered, focused])

    React.useEffect(() => {
        if (!listRef.current) return
        if (highlightedIndex < 0) return
        const child = listRef.current.children[highlightedIndex] as HTMLElement | undefined
        child?.scrollIntoView({ block: 'nearest' })
    }, [highlightedIndex])

    const addValueByValue = (valueToAdd: any) => {
        if (!valueToAdd) return
        const next = Array.from(new Set([...(value || []), valueToAdd]))
        onChange(next)
        setQuery('')
    }

    const createAndAdd = (labelText: string) => {
        const normalized = labelText.trim()
        if (!normalized) return
        const newOption: SelectOption = { label: normalized, value: normalized }
        setAvailableOptions((prev) => {
            if (prev.find((o) => o.value === newOption.value)) {
                return prev
            }
            return [...prev, newOption]
        })
        addValueByValue(newOption.value)
    }

    const removeValue = (item: any) => {
        onChange((value || []).filter((v) => v !== item))
    }

    return (
        <div className="flex flex-col space-y-1">
            <div className="w-full">
                <label className="text-[15px]">
                    <span>
                        {label}
                        <span className="text-red dark:text-yellow ml-0.5">*</span>
                    </span>
                </label>
                {description && <p className="text-sm text-secondary m-0 mt-0.5">{description}</p>}
            </div>
            <div
                className={`bg-primary border border-primary rounded ring-0 px-2.5 py-2 ${
                    touched && error ? 'border-red dark:border-yellow' : 'border-primary'
                }`}
                onMouseDown={(e) => {
                    if ((e.target as HTMLElement).tagName !== 'INPUT') {
                        e.preventDefault()
                    }
                }}
            >
                <div className="flex flex-wrap gap-1">
                    {(value || []).map((v) => {
                        const chip =
                            availableOptions.find((o) => o.value === v) ||
                            ({ label: String(v), value: v } as SelectOption)
                        return (
                            <span
                                key={String(v)}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-primary text-xs bg-accent h-[28px]"
                            >
                                <span>{chip.label}</span>
                                <button
                                    type="button"
                                    aria-label={`Remove ${String(v)}`}
                                    onClick={() => removeValue(v)}
                                    className="text-secondary hover:text-primary size-3"
                                >
                                    <IconX />
                                </button>
                            </span>
                        )
                    })}
                    <input
                        className="flex-1 min-w-[8rem] bg-transparent outline-none border-0 ring-0 focus:ring-0 text-[15px] px-0 py-0.5"
                        placeholder={placeholder || label}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => {
                            setTimeout(() => setFocused(false), 0)
                            onBlur?.()
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                const hasHighlighted = highlightedIndex >= 0 && highlightedIndex < filtered.length
                                if (hasHighlighted) {
                                    addValueByValue(filtered[highlightedIndex].value)
                                } else {
                                    if (allowCreate) {
                                        createAndAdd(query)
                                    } else {
                                        const candidate =
                                            filtered.find(
                                                (opt) => opt.label.toLowerCase() === query.trim().toLowerCase()
                                            ) || filtered[0]
                                        if (candidate) {
                                            addValueByValue(candidate.value)
                                        }
                                    }
                                }
                            } else if (e.key === 'Backspace' && !query && value.length > 0) {
                                removeValue(value[value.length - 1])
                            } else if (e.key === 'ArrowDown') {
                                e.preventDefault()
                                if (!focused) setFocused(true)
                                setHighlightedIndex((prev) => {
                                    const next = prev + 1
                                    if (filtered.length === 0) return -1
                                    return next >= filtered.length ? 0 : next
                                })
                            } else if (e.key === 'ArrowUp') {
                                e.preventDefault()
                                if (!focused) setFocused(true)
                                setHighlightedIndex((prev) => {
                                    if (filtered.length === 0) return -1
                                    const next = prev - 1
                                    if (prev < 0) return filtered.length - 1
                                    return next < 0 ? filtered.length - 1 : next
                                })
                            } else if (e.key === 'Escape') {
                                e.preventDefault()
                                setFocused(false)
                                setHighlightedIndex(-1)
                            }
                        }}
                    />
                </div>
                {filtered.length > 0 && focused && (
                    <div
                        ref={listRef}
                        role="listbox"
                        className="mt-1 max-h-40 overflow-auto rounded border border-primary bg-primary focus:outline-none"
                    >
                        {filtered.map((opt, idx) => (
                            <button
                                type="button"
                                role="option"
                                aria-selected={idx === highlightedIndex}
                                key={`${String(opt.value)}-${opt.label}`}
                                className={`block w-full text-left px-2.5 py-1 text-sm focus:outline-none ${
                                    idx === highlightedIndex ? 'bg-accent' : 'hover:bg-accent'
                                }`}
                                onMouseEnter={() => setHighlightedIndex(idx)}
                                onMouseDown={(e) => {
                                    e.preventDefault()
                                    addValueByValue(opt.value)
                                }}
                            >
                                <span className="flex items-center justify-between gap-2">
                                    <span>{opt.label}</span>
                                    {(value || []).includes(opt.value) && (
                                        <span
                                            className="inline-flex items-center justify-center"
                                            onMouseDown={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                removeValue(opt.value)
                                            }}
                                            aria-label="Deselect"
                                            title="Deselect"
                                            role="button"
                                        >
                                            <IconCheck className="size-4 text-primary opacity-80 cursor-pointer" />
                                        </span>
                                    )}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
                {allowCreate &&
                    query &&
                    !availableOptions.some((o) => o.label === query.trim() || String(o.value) === query.trim()) && (
                        <div className="mt-1">
                            <OSButton
                                size="sm"
                                variant="default"
                                onMouseDown={(e) => {
                                    e.preventDefault()
                                    createAndAdd(query)
                                }}
                            >
                                Add "{query.trim()}"
                            </OSButton>
                        </div>
                    )}
            </div>
            {touched && error && <p className="text-sm text-red dark:text-yellow m-0 mt-1">{error}</p>}
        </div>
    )
}

export default function EventForm({ onSuccess }: { onSuccess?: () => void }): React.ReactElement {
    const { getJwt } = useUser()
    const { addToast } = useToast()
    const [submitting, setSubmitting] = React.useState<boolean>(false)
    const data = useStaticQuery(graphql`
        query {
            allEvent {
                format: group(field: attributes___format) {
                    fieldValue
                }
                audience: group(field: attributes___audience) {
                    fieldValue
                }
            }
            allSqueakProfile(
                sort: { fields: firstName }
                filter: { firstName: { ne: "" }, avatar: {}, teams: { data: { elemMatch: { id: { ne: null } } } } }
            ) {
                nodes {
                    squeakId
                    firstName
                    lastName
                }
            }
        }
    `)

    const format: SelectOption[] = data.allEvent.format
        .map((f: { fieldValue: string }) => f.fieldValue)
        .filter(Boolean)
        .map((v: string) => ({ label: v, value: v }))

    const audience: SelectOption[] = data.allEvent.audience
        .map((a: { fieldValue: string }) => a.fieldValue)
        .filter(Boolean)
        .map((v: string) => ({ label: v, value: v }))

    const speakers: SelectOption[] = data.allSqueakProfile.nodes
        .map((speaker: { squeakId: string; firstName: string; lastName: string }) => ({
            value: speaker.squeakId,
            label: [speaker.firstName, speaker.lastName].filter(Boolean).join(' '),
        }))
        .filter((s: SelectOption) => s.label)

    const formik = useFormik<EventFormValues>({
        initialValues: {
            name: '',
            date: '',
            startTime: '',
            description: '',
            link: '',
            locationLabel: '',
            locationLat: '',
            locationLng: '',
            venueName: '',
            format: [],
            audience: [],
            speakers: [],
            private: false,
            speakerTopic: '',
            partners: [{ name: '', url: '' }],
            attendees: '',
            vibeScore: '',
            photosLocal: [],
            video: '',
            presentation: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setSubmitting(true)
            try {
                const dateTime = dayjs(`${values.date} ${values.startTime || '00:00'}`).toISOString()
                const eventPayload: any = {
                    name: values.name,
                    description: values.description || undefined,
                    date: dateTime,
                    private: values.private || false,
                    format: values.format,
                    audience: values.audience,
                    speakerTopic: values.speakerTopic || undefined,
                    partners: values.partners
                        ?.filter((p) => p.name)
                        ?.map((p) => ({ name: p.name, url: p.url || undefined })),
                    attendees: values.attendees ? Number(values.attendees) : undefined,
                    vibeScore: values.vibeScore
                        ? Math.max(0, Math.min(5, Math.round(Number(values.vibeScore))))
                        : undefined,
                    video: values.video || undefined,
                    presentation: values.presentation || undefined,
                    link: values.link || undefined,
                    speakers: { connect: values.speakers },
                    location: {
                        label: values.locationLabel,
                        lat: values.locationLat ? Number(values.locationLat) : undefined,
                        lng: values.locationLng ? Number(values.locationLng) : undefined,
                        venue: values.venueName ? { name: values.venueName } : undefined,
                    },
                }
                // Create event first
                const created = await createEvent(eventPayload)
                const createdId = (created?.data?.id ?? created?.id) as string | number | undefined
                // Upload photos (if any) and relate to the event
                if (createdId && values.photosLocal?.length > 0) {
                    const jwt = await getJwt()
                    if (!jwt) {
                        console.warn('Skipping photo upload - missing JWT')
                    } else {
                        for (const img of values.photosLocal) {
                            try {
                                await uploadImage(img.file, jwt, {
                                    id: Number(createdId),
                                    type: 'api::event.event',
                                    field: 'photos',
                                })
                            } catch (e) {
                                console.error('Error uploading photo', e)
                            }
                        }
                    }
                }
                addToast({
                    title: 'Event created',
                    description: 'Event will appear on the next build',
                })
                onSuccess?.()
            } catch (error) {
                console.error('Error creating event:', error)
            } finally {
                setSubmitting(false)
            }
        },
    })

    const createEvent = async (eventPayload: Record<string, unknown>): Promise<any> => {
        try {
            const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/events`, {
                method: 'POST',
                body: JSON.stringify({ data: eventPayload }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await getJwt()}`,
                },
            })
            if (!response.ok) {
                throw new Error(`Failed to create event: ${response.statusText}`)
            }
            return response.json()
        } catch (error) {
            console.error('Error creating event:', error)
            throw error
        }
    }

    const baseOptions = React.useMemo(
        () => ({
            format,
            audience,
            speakers,
        }),
        []
    )

    return (
        <div>
            <h2 className="text-xl font-bold mb-1">Add a new event</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-3">
                <OSInput
                    label="Name"
                    required
                    direction="column"
                    touched={formik.touched.name}
                    error={formik.errors.name}
                    {...formik.getFieldProps('name')}
                />
                <div className="grid grid-cols-2 gap-3">
                    <OSInput
                        label="Date"
                        type="date"
                        required
                        direction="column"
                        touched={formik.touched.date}
                        error={formik.errors.date}
                        {...formik.getFieldProps('date')}
                    />
                    <OSInput
                        label="Start time"
                        type="time"
                        direction="column"
                        touched={formik.touched.startTime}
                        error={typeof formik.errors.startTime === 'string' ? formik.errors.startTime : undefined}
                        {...formik.getFieldProps('startTime')}
                    />
                </div>
                <OSInput
                    label="Location"
                    required
                    direction="column"
                    placeholder="e.g. Dublin, Ireland"
                    touched={formik.touched.locationLabel}
                    error={formik.errors.locationLabel}
                    {...formik.getFieldProps('locationLabel')}
                />
                <div className="grid grid-cols-2 gap-3">
                    <OSInput
                        label="Latitude"
                        type="number"
                        direction="column"
                        placeholder="e.g. 39.0968"
                        {...formik.getFieldProps('locationLat')}
                    />
                    <OSInput
                        label="Longitude"
                        type="number"
                        direction="column"
                        placeholder="e.g. 120.0324"
                        {...formik.getFieldProps('locationLng')}
                    />
                </div>
                <OSInput
                    label="Venue name"
                    direction="column"
                    placeholder="e.g. Madison Square Garden"
                    {...formik.getFieldProps('venueName')}
                />
                <CreatableMultiSelect
                    label="Format"
                    options={baseOptions.format}
                    value={formik.values.format}
                    onChange={(next) => formik.setFieldValue('format', next)}
                    onBlur={() => formik.setFieldTouched('format', true, true)}
                    touched={formik.touched.format as unknown as boolean}
                    error={formik.errors.format as unknown as string}
                    description="How will this event be run?"
                />
                <CreatableMultiSelect
                    label="Audience"
                    options={baseOptions.audience}
                    value={formik.values.audience}
                    onChange={(next) => formik.setFieldValue('audience', next)}
                    onBlur={() => formik.setFieldTouched('audience', true, true)}
                    touched={formik.touched.audience as unknown as boolean}
                    error={formik.errors.audience as unknown as string}
                    description="Who is this event for?"
                />
                <CreatableMultiSelect
                    label="Speakers"
                    options={baseOptions.speakers}
                    value={formik.values.speakers}
                    onChange={(next) => formik.setFieldValue('speakers', next)}
                    onBlur={() => formik.setFieldTouched('speakers', true, true)}
                    touched={formik.touched.speakers as unknown as boolean}
                    error={formik.errors.speakers as unknown as string}
                    description="Select speakers"
                    allowCreate={false}
                />
                <OSInput
                    label="Speaker topic"
                    direction="column"
                    placeholder="Topic for the speaker(s)"
                    {...formik.getFieldProps('speakerTopic')}
                />
                <div className="grid grid-cols-2 gap-3">
                    <OSInput
                        label="Attendees"
                        type="number"
                        direction="column"
                        placeholder="Total attendees"
                        {...formik.getFieldProps('attendees')}
                    />
                    <OSInput
                        label="Vibe score (0–5)"
                        type="number"
                        direction="column"
                        placeholder="e.g. 4"
                        min={0}
                        max={5}
                        step={1}
                        {...formik.getFieldProps('vibeScore')}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Toggle
                        checked={formik.values.private}
                        onChange={(checked) => formik.setFieldValue('private', checked)}
                        label="Private event"
                        position="left"
                    />
                </div>
                <div>
                    <label className="text-[15px]">Partners</label>
                    <div className="space-y-2 mt-1">
                        {formik.values.partners.map((p, idx) => (
                            <div
                                key={idx}
                                className="grid grid-cols-2 gap-2 [&_label]:text-sm [&_label]:text-secondary"
                            >
                                <OSInput
                                    label="Name"
                                    direction="column"
                                    value={p.name}
                                    onChange={(e: any) => {
                                        const next = [...formik.values.partners]
                                        next[idx] = { ...next[idx], name: e.target.value }
                                        formik.setFieldValue('partners', next)
                                    }}
                                />
                                <OSInput
                                    label="URL"
                                    direction="column"
                                    value={p.url}
                                    onChange={(e: any) => {
                                        const next = [...formik.values.partners]
                                        next[idx] = { ...next[idx], url: e.target.value }
                                        formik.setFieldValue('partners', next)
                                    }}
                                />
                            </div>
                        ))}
                        <OSButton
                            size="sm"
                            variant="secondary"
                            type="button"
                            onClick={() =>
                                formik.setFieldValue('partners', [...formik.values.partners, { name: '', url: '' }])
                            }
                        >
                            Add partner
                        </OSButton>
                    </div>
                </div>
                <div>
                    <label className="text-[15px] block mb-1">Photos</label>
                    <div className="grid grid-cols-2 gap-3">
                        {formik.values.photosLocal.map((img, idx) => (
                            <ImageDrop
                                key={idx}
                                image={img}
                                onDrop={(image) => {
                                    const next = [...formik.values.photosLocal]
                                    next[idx] = (image as UploadImage) || next[idx]
                                    formik.setFieldValue('photosLocal', next)
                                }}
                                onRemove={() => {
                                    const next = [...formik.values.photosLocal]
                                    next.splice(idx, 1)
                                    formik.setFieldValue('photosLocal', next)
                                }}
                                className="!h-auto aspect-square"
                            />
                        ))}
                        <ImageDrop
                            onDrop={(image) =>
                                image && formik.setFieldValue('photosLocal', [...formik.values.photosLocal, image])
                            }
                            onRemove={() => null}
                            className="!h-auto aspect-square"
                        />
                    </div>
                </div>
                <OSTextarea
                    label="Description"
                    rows={4}
                    direction="column"
                    touched={formik.touched.description}
                    error={formik.errors.description}
                    placeholder="What is this event about?"
                    {...formik.getFieldProps('description')}
                />
                <OSInput
                    label="Link"
                    type="url"
                    direction="column"
                    placeholder="https://example.com/event"
                    touched={formik.touched.link}
                    error={formik.errors.link}
                    {...formik.getFieldProps('link')}
                />
                <div className="grid grid-cols-2 gap-3">
                    <OSInput label="Video URL" type="url" direction="column" {...formik.getFieldProps('video')} />
                    <OSInput
                        label="Presentation URL"
                        type="url"
                        direction="column"
                        {...formik.getFieldProps('presentation')}
                    />
                </div>
                <div className="flex items-center gap-2 pt-1">
                    <OSButton disabled={submitting} variant="primary" size="md" type="submit">
                        {submitting ? <IconSpinner className="animate-spin size-4" /> : 'Add event'}
                    </OSButton>
                    <OSButton
                        disabled={submitting}
                        variant="default"
                        size="md"
                        type="button"
                        onClick={() => formik.resetForm()}
                    >
                        Reset
                    </OSButton>
                </div>
            </form>
        </div>
    )
}
