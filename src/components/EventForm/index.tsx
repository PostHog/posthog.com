import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { OSInput, OSTextarea } from 'components/OSForm'
import OSButton from 'components/OSButton'
import { graphql, useStaticQuery } from 'gatsby'
import dayjs from 'dayjs'
import { useUser } from 'hooks/useUser'
import { IconSpinner } from '@posthog/icons'
import Toggle from 'components/Toggle'
import ImageDrop, { type Image as UploadImage } from 'components/ImageDrop'
import uploadImage from 'components/Squeak/util/uploadImage'
import { useToast } from '../../context/Toast'
import { Event } from '../../pages/events'
import CreatableMultiSelect from 'components/CreatableMultiSelect'

type EventFormValues = {
    name: string
    date: string
    startTime: string
    description: string
    link: string
    locationLabel: string
    locationLat?: number
    locationLng?: number
    venueName?: string
    format: string[]
    audience: string[]
    speakers: string[]
    private: boolean
    speakerTopic?: string
    partners: Array<{ name: string; url?: string }>
    attendees?: number
    vibeScore?: number
    photosLocal: UploadImage[] | { id: number; url: string }[]
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

const transformEventToFormValues = (event: Event, speakerOptions?: SelectOption[]): EventFormValues => {
    const parsed = dayjs(event?.date)
    const dateStr = parsed.isValid() ? parsed.format('YYYY-MM-DD') : ''
    const timeFromDate = parsed.isValid() ? parsed.format('HH:mm') : ''
    const startTime = event?.startTime || (timeFromDate !== '00:00' ? timeFromDate : '')

    const speakersValues = (event?.speakers || [])
        .map((name) => speakerOptions?.find((o) => o.label === name)?.value)
        .filter(Boolean) as string[]

    return {
        name: event?.name || '',
        date: dateStr,
        startTime: startTime || '',
        description: event?.description || '',
        link: event?.link || '',
        locationLabel: event?.location?.label || '',
        locationLat: event?.location?.lat || undefined,
        locationLng: event?.location?.lng || undefined,
        venueName: event?.location?.venue?.name || '',
        format: event?.format || [],
        audience: event?.audience || [],
        speakers: speakersValues,
        private: Boolean(event?.private),
        speakerTopic: event?.speakerTopic || '',
        partners: (event?.partners && event.partners.length > 0
            ? event.partners.map((p) => ({ name: p.name, url: p.url || '' }))
            : [{ name: '', url: '' }]) || [{ name: '', url: '' }],
        attendees: event?.attendees || undefined,
        vibeScore: event?.vibeScore || undefined,
        photosLocal: event?.photos?.map((p) => ({ id: p.id, url: p.url })) || [],
        video: event?.video || '',
        presentation: event?.presentation || '',
    }
}

export default function EventForm({ onSuccess, event }: { onSuccess?: () => void; event?: Event }): React.ReactElement {
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
        initialValues: event
            ? transformEventToFormValues(event, speakers)
            : {
                  name: '',
                  date: '',
                  startTime: '',
                  description: '',
                  link: '',
                  locationLabel: '',
                  locationLat: undefined,
                  locationLng: undefined,
                  venueName: '',
                  format: [],
                  audience: [],
                  speakers: [],
                  private: false,
                  speakerTopic: '',
                  partners: [{ name: '', url: '' }],
                  attendees: undefined,
                  vibeScore: undefined,
                  photosLocal: [],
                  video: '',
                  presentation: '',
              },
        validationSchema,
        onSubmit: async (values) => {
            setSubmitting(true)
            try {
                const jwt = await getJwt()
                if (!jwt) {
                    throw new Error('No JWT found')
                }
                const uploadedPhotos = await Promise.all(
                    values.photosLocal
                        .filter((image) => 'file' in image)
                        .map(async (img) => {
                            return await uploadImage(img.file, jwt)
                        })
                )
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
                    photos: [
                        ...uploadedPhotos.map((photo) => photo.id),
                        ...values.photosLocal.filter((image) => 'id' in image && image.id).map((image) => image.id),
                    ],
                }
                if (event) {
                    await updateEvent(event.id, eventPayload)
                } else {
                    await createEvent(eventPayload)
                }
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
            addToast({
                description: 'Event created successfully',
            })
            return response.json()
        } catch (error) {
            console.error('Error creating event:', error)
            addToast({
                description: 'Failed to create event',
            })
            throw error
        }
    }

    const updateEvent = async (eventId: number, eventPayload: Record<string, unknown>): Promise<any> => {
        try {
            const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/events/${eventId}`, {
                method: 'PUT',
                body: JSON.stringify({ data: eventPayload }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await getJwt()}`,
                },
            })
            if (!response.ok) {
                throw new Error(`Failed to update event: ${response.statusText}`)
            }
            addToast({
                description: 'Event updated successfully',
            })
            return response.json()
        } catch (error) {
            console.error('Error updating event:', error)
            addToast({
                description: 'Failed to update event',
            })
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
                                className="!h-auto aspect-square overflow-hidden"
                            />
                        ))}
                        <ImageDrop
                            onDrop={(image) =>
                                image && formik.setFieldValue('photosLocal', [...formik.values.photosLocal, image])
                            }
                            onRemove={() => null}
                            className="!h-auto aspect-square overflow-hidden"
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
                        {submitting ? (
                            <IconSpinner className="animate-spin size-4" />
                        ) : event ? (
                            'Update event'
                        ) : (
                            'Add event'
                        )}
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
