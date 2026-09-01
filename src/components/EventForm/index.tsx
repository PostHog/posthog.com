import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { OSInput, OSTextarea } from 'components/OSForm'
import OSButton from 'components/OSButton'
import { graphql, useStaticQuery } from 'gatsby'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { useUser } from 'hooks/useUser'
import { IconSpinner } from '@posthog/icons'
import Toggle from 'components/Toggle'
import ImageDrop, { type Image as UploadImage } from 'components/ImageDrop'
import uploadImage from 'components/Squeak/util/uploadImage'
import { toBlob, toPng } from 'html-to-image'
import EventGraphic, { type EventGraphicFormat, type EventGraphicSpeaker } from 'components/EventGraphic'
import { EVENT_GRAPHIC_STYLE_COUNT, eventGraphicStyleIndex } from 'constants/eventGraphicPalette'
import { useToast } from '../../context/Toast'
import { Event } from '../../pages/events'
import CreatableMultiSelect from 'components/CreatableMultiSelect'
import SuggestionDropdown, { suggestionOptionId } from './SuggestionDropdown'

dayjs.extend(utc)
dayjs.extend(timezone)

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
    online: boolean
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

// Shared shape from both /api proxies: Luma has coordinates, Notion the editorial fields
type SuggestedEvent = {
    id: string
    source: string
    name: string
    startAt: string | null
    endAt: string | null
    allDay?: boolean
    timezone: string | null
    url: string | null
    lat: number | null
    lng: number | null
    city: string | null
    cityState: string | null
    country: string | null
    venue: string | null
    fullAddress: string | null
    online: boolean
    description?: string | null
    category?: string | null
    primaryPurpose?: string | null
    attendees?: number | null
    speakerNames?: string[]
}

const DEFAULT_AUDIENCE = 'Builders'

// Notion's Category is mostly a format signal and Primary purpose a business goal, so only
// the values that imply who an event is for are mapped; the rest fall back to the default.
const AUDIENCE_BY_NOTION_VALUE: Record<string, string> = {
    students: 'Students',
    'community building': 'Builders',
    'brand awareness': 'Builders',
}

// Reuse an existing option's casing so prefilling can't add near-duplicate values
const canonicalAudience = (value: string, options: SelectOption[]): string =>
    options.find((option) => option.label.toLowerCase() === value.toLowerCase())?.value ?? value

const audienceFromNotion = (suggestion: SuggestedEvent, options: SelectOption[]): string[] => {
    const mapped = [suggestion.category, suggestion.primaryPurpose]
        .map((value) => (value ? AUDIENCE_BY_NOTION_VALUE[value.trim().toLowerCase()] : undefined))
        .filter((value): value is string => Boolean(value))
    return [...new Set((mapped.length > 0 ? mapped : [DEFAULT_AUDIENCE]).map((v) => canonicalAudience(v, options)))]
}

const normalizeName = (name: string): string => name.toLowerCase().replace(/[.'’]/g, '').replace(/\s+/g, ' ').trim()

// Notion speakers are free text ("Andy M") but the form stores squeakIds. Only an
// unambiguous single match is accepted — the wrong person is worse than none.
const matchSpeakerOption = (name: string, options: SelectOption[]): string | null => {
    const target = normalizeName(name)
    if (!target) return null
    const unique = (matches: SelectOption[]) => (matches.length === 1 ? matches[0].value : null)

    const exact = unique(options.filter((option) => normalizeName(option.label) === target))
    if (exact) return exact

    // "Andy M" — first name plus a last-name initial
    const initial = target.match(/^(\S+)\s+(\S)$/)
    if (initial) {
        const [, first, letter] = initial
        return unique(
            options.filter((option) => {
                const [optionFirst, ...rest] = normalizeName(option.label).split(' ')
                return optionFirst === first && rest.join(' ').startsWith(letter)
            })
        )
    }

    // Bare first name — only when it's unambiguous across profiles
    return unique(options.filter((option) => normalizeName(option.label).split(' ')[0] === target))
}

const SOURCE_LABELS: Record<string, string> = { luma: 'Luma', notion: 'Notion' }

const sourceLabel = (source: string): string =>
    source
        .split('+')
        .map((part) => SOURCE_LABELS[part.trim()] || part.trim())
        .join(' + ')

// Collapse the same event from both systems on name + day, preferring the copy with coordinates
const mergeSuggestedEvents = (lists: SuggestedEvent[][]): SuggestedEvent[] => {
    const byKey = new Map<string, SuggestedEvent>()
    for (const suggestion of lists.flat()) {
        const key = `${suggestion.name.trim().toLowerCase()}|${(suggestion.startAt || '').slice(0, 10)}`
        const existing = byKey.get(key)
        if (!existing) {
            byKey.set(key, suggestion)
            continue
        }
        const [primary, secondary] = existing.lat != null ? [existing, suggestion] : [suggestion, existing]
        byKey.set(key, {
            ...secondary,
            ...primary,
            venue: primary.venue || secondary.venue,
            url: primary.url || secondary.url,
            description: primary.description || secondary.description,
            category: primary.category || secondary.category,
            // Spelled out so they survive if the other source starts sending the key as null
            primaryPurpose: primary.primaryPurpose || secondary.primaryPurpose,
            speakerNames: primary.speakerNames?.length ? primary.speakerNames : secondary.speakerNames,
            attendees: primary.attendees ?? secondary.attendees,
            source: [...new Set([existing.source, suggestion.source])].join(' + '),
        })
    }
    return [...byKey.values()]
}

// Luma sends UTC instants with a timezone; Notion sends the wall clock as typed. Decide
// from the value's shape so merged suggestions work either way.
const suggestedDateTime = (suggestion: SuggestedEvent): { date: string; startTime: string } | null => {
    const { startAt, timezone } = suggestion
    if (!startAt) return null
    if (!startAt.includes('T')) return { date: startAt.slice(0, 10), startTime: '' }
    if (timezone) {
        try {
            const zoned = dayjs(startAt).tz(timezone)
            if (zoned.isValid()) return { date: zoned.format('YYYY-MM-DD'), startTime: zoned.format('HH:mm') }
        } catch {
            // Unknown zone — fall through to the literal wall clock
        }
    }
    return { date: startAt.slice(0, 10), startTime: startAt.slice(11, 16) }
}

type CitySuggestion = {
    id: string
    name: string
    placeFormatted: string
}

// Notion has no coordinates. Geocoding API rather than Search Box — no interactive session here.
const geocodeLocation = async (query: string): Promise<{ lat: number; lng: number } | null> => {
    const token = process.env.GATSBY_MAPBOX_TOKEN
    if (!token || !query.trim()) return null
    try {
        const url = new URL('https://api.mapbox.com/search/geocode/v6/forward')
        url.searchParams.set('q', query.trim())
        url.searchParams.set('limit', '1')
        url.searchParams.set('access_token', token)
        const response = await fetch(url.toString())
        const json = await response.json()
        const coords = json?.features?.[0]?.geometry?.coordinates
        return Array.isArray(coords) && coords.length >= 2 ? { lng: coords[0], lat: coords[1] } : null
    } catch {
        return null
    }
}

// Session token for Mapbox Search Box API billing semantics
const newSessionToken = (): string =>
    typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36)

const validationSchema = Yup.object().shape({
    name: Yup.string().max(60, 'Max 60 characters').required('Name is required'),
    date: Yup.string().required('Date is required'),
    startTime: Yup.string().optional(),
    description: Yup.string().optional(),
    link: Yup.string().url('Enter a valid URL').optional(),
    online: Yup.boolean().optional(),
    locationLabel: Yup.string().when('online', {
        is: true,
        then: (schema) => schema.optional(),
        otherwise: (schema) => schema.required('Location is required'),
    }),
    format: Yup.array().of(Yup.string()).min(1, 'Select at least one format'),
    audience: Yup.array().of(Yup.string()).min(1, 'Select at least one audience'),
    speakers: Yup.array().of(Yup.string()).optional(),
    speakerTopic: Yup.string().optional(),
    attendees: Yup.string().optional(),
    vibeScore: Yup.number().integer().min(0).max(5).optional(),
    video: Yup.string().url('Enter a valid URL').optional(),
    presentation: Yup.string().url('Enter a valid URL').optional(),
})

const graphicFileName = (eventName?: string, format: EventGraphicFormat = 'square'): string =>
    `${(eventName || 'posthog-event').toLowerCase().replace(/[^a-z0-9]+/g, '-')}${
        format === 'landscape' ? '-landscape' : ''
    }.png`

// Export sizes: a square social graphic, and the standard Open Graph ratio for link previews.
const GRAPHIC_EXPORT_SIZES: Record<EventGraphicFormat, { width: number; height: number }> = {
    square: { width: 1080, height: 1080 },
    landscape: { width: 1200, height: 630 },
}

// The landscape title auto-fits, but its wide/short canvas can leave the type looking small, so the
// organizer can nudge it up or down in fixed steps. Each step is 15% off the format's default; the range
// is clamped so a press can't run past a sensible size (the graphic itself still width-clamps every word).
// It's steps rather than a slider deliberately — no drag thumb to style across browsers, nothing to break.
const TITLE_SCALE_STEP = 0.15
const TITLE_SCALE_MIN_STEP = -2
const TITLE_SCALE_MAX_STEP = 2

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
        online: Boolean(event?.online),
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
    const [downloadingGraphic, setDownloadingGraphic] = React.useState<EventGraphicFormat | null>(null)
    // Null means "follow the event name"; shuffling pins an explicit hue + light/dark combo.
    const [graphicStyleOverride, setGraphicStyleOverride] = React.useState<number | null>(null)
    // Landscape-only title-size nudge. 0 = the format default; each step is ±15%. Since the landscape
    // graphic is download-only (only the square is auto-uploaded), this only ever needs to drive the live
    // preview and the downloaded PNG — no persisted field.
    const [landscapeTitleStep, setLandscapeTitleStep] = React.useState<number>(0)
    const graphicRef = React.useRef<HTMLDivElement>(null)
    const landscapeGraphicRef = React.useRef<HTMLDivElement>(null)
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
                    companyRole
                    color
                    avatar {
                        url
                    }
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
                  online: false,
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
                let photoIds = [
                    ...uploadedPhotos.map((photo) => photo.id),
                    ...values.photosLocal.filter((image) => 'id' in image && image.id).map((image) => image.id),
                ]
                // No photos provided — upload the generated graphic so the event has art everywhere
                if (photoIds.length === 0 && graphicRef.current) {
                    try {
                        const blob = await toBlob(graphicRef.current, {
                            canvasWidth: 1080,
                            canvasHeight: 1080,
                            pixelRatio: 1,
                        })
                        if (blob) {
                            const graphic = await uploadImage(
                                new File([blob], graphicFileName(values.name), { type: 'image/png' }),
                                jwt
                            )
                            if (graphic?.id) {
                                photoIds = [graphic.id]
                            }
                        }
                    } catch (error) {
                        // Don't block event creation if the graphic can't be generated
                        console.error('Error uploading event graphic:', error)
                    }
                }
                const dateTime = dayjs(`${values.date} ${values.startTime || '00:00'}`).toISOString()
                const eventPayload: any = {
                    name: values.name,
                    description: values.description || undefined,
                    date: dateTime,
                    private: values.private || false,
                    online: values.online || false,
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
                    speakers: { set: values.speakers },
                    location: {
                        label: values.locationLabel,
                        lat: values.locationLat ? Number(values.locationLat) : undefined,
                        lng: values.locationLng ? Number(values.locationLng) : undefined,
                        venue: values.venueName ? { name: values.venueName } : undefined,
                    },
                    photos: photoIds,
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

    // Auto-suggest (create mode only) — via /api proxies; neither API allows browser calls
    const [lumaEvents, setLumaEvents] = React.useState<SuggestedEvent[]>([])
    const [lumaOpen, setLumaOpen] = React.useState(false)
    const [lumaHighlight, setLumaHighlight] = React.useState(-1)
    const lumaContainerRef = React.useRef<HTMLDivElement>(null)

    // Mapbox city autocomplete on the location field
    const [cityQuery, setCityQuery] = React.useState('')
    const [citySuggestions, setCitySuggestions] = React.useState<CitySuggestion[]>([])
    const [cityOpen, setCityOpen] = React.useState(false)
    const [cityHighlight, setCityHighlight] = React.useState(-1)
    const [citySessionToken, setCitySessionToken] = React.useState(newSessionToken)
    const cityAbortRef = React.useRef<AbortController | null>(null)
    const cityContainerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (event) return
        const controller = new AbortController()
        // Sources fail independently — one unavailable proxy doesn't lose the other's results
        const load = (path: string, source: string): Promise<SuggestedEvent[]> =>
            fetch(path, { signal: controller.signal })
                .then((response) => (response.ok ? response.json() : null))
                .then((json) =>
                    Array.isArray(json?.events)
                        ? json.events.map((suggestion: SuggestedEvent) => ({ ...suggestion, source }))
                        : []
                )
                .catch(() => [])

        Promise.all([load('/api/luma-events', 'luma'), load('/api/notion-events', 'notion')]).then((lists) =>
            setLumaEvents(mergeSuggestedEvents(lists))
        )
        return () => controller.abort()
    }, [event])

    const lumaMatches = React.useMemo(() => {
        const query = formik.values.name.trim().toLowerCase()
        if (event || query.length < 3 || lumaEvents.length === 0) return []
        const today = dayjs().format('YYYY-MM-DD')
        // Upcoming soonest-first, then recent past. Must sort before slicing, or the cap
        // keeps an arbitrary five.
        const bucket = (date: string) => (!date ? 2 : date >= today ? 0 : 1)
        return lumaEvents
            .filter((suggestion) => suggestion.name.toLowerCase().includes(query))
            .map((suggestion) => ({ suggestion, date: suggestedDateTime(suggestion)?.date || '' }))
            .sort((a, b) =>
                bucket(a.date) !== bucket(b.date)
                    ? bucket(a.date) - bucket(b.date)
                    : bucket(a.date) === 1
                    ? b.date.localeCompare(a.date)
                    : a.date.localeCompare(b.date)
            )
            .slice(0, 5)
            .map(({ suggestion }) => suggestion)
    }, [lumaEvents, formik.values.name, event])

    const handleLumaSelect = async (suggestion: SuggestedEvent) => {
        const when = suggestedDateTime(suggestion)
        const locationLabel =
            suggestion.cityState ||
            [suggestion.city, suggestion.country].filter(Boolean).join(', ') ||
            formik.values.locationLabel

        // External speakers, and profiles missing a team/avatar, are dropped
        const matchedSpeakers = [
            ...new Set(
                (suggestion.speakerNames || [])
                    .map((speakerName) => matchSpeakerOption(speakerName, speakers))
                    .filter((squeakId): squeakId is string => Boolean(squeakId))
            ),
        ]

        formik.setValues({
            ...formik.values,
            name: suggestion.name,
            date: when?.date || formik.values.date,
            startTime: when?.startTime || formik.values.startTime,
            link: suggestion.url || formik.values.link,
            online: suggestion.online,
            description: suggestion.description || formik.values.description,
            // Category maps onto Format; seeded only while empty, never overwriting a selection
            format:
                suggestion.category && formik.values.format.length === 0 ? [suggestion.category] : formik.values.format,
            attendees: suggestion.attendees ?? formik.values.attendees,
            speakers: formik.values.speakers.length === 0 ? matchedSpeakers : formik.values.speakers,
            // Required field, so this always resolves to at least the default
            audience:
                formik.values.audience.length === 0 ? audienceFromNotion(suggestion, audience) : formik.values.audience,
            ...(suggestion.online
                ? { locationLabel: '', locationLat: undefined, locationLng: undefined, venueName: '' }
                : {
                      locationLabel,
                      venueName: suggestion.venue || '',
                      locationLat: suggestion.lat ?? undefined,
                      locationLng: suggestion.lng ?? undefined,
                  }),
        })
        setLumaOpen(false)
        setLumaHighlight(-1)

        // Notion carries no coordinates — resolve them from the venue/city text
        if (!suggestion.online && suggestion.lat == null) {
            const coords = await geocodeLocation([suggestion.venue, locationLabel].filter(Boolean).join(', '))
            if (coords) {
                formik.setFieldValue('locationLat', coords.lat)
                formik.setFieldValue('locationLng', coords.lng)
            }
        }
    }

    // Debounced Mapbox suggest — only fires while the user is typing (cityQuery
    // is set in onChange, not when the field is populated programmatically)
    React.useEffect(() => {
        const token = process.env.GATSBY_MAPBOX_TOKEN
        const query = cityQuery.trim()
        if (typeof window === 'undefined' || !token || query.length <= 3) {
            cityAbortRef.current?.abort()
            cityAbortRef.current = null
            setCitySuggestions([])
            setCityOpen(false)
            setCityHighlight(-1)
            return
        }
        const controller = new AbortController()
        cityAbortRef.current = controller
        const handle = setTimeout(async () => {
            try {
                const url = new URL('https://api.mapbox.com/search/searchbox/v1/suggest')
                url.searchParams.set('q', query)
                url.searchParams.set('limit', '2')
                url.searchParams.set('types', 'place')
                url.searchParams.set('language', 'en')
                url.searchParams.set('session_token', citySessionToken)
                url.searchParams.set('access_token', token)
                const response = await fetch(url.toString(), { signal: controller.signal })
                const json = await response.json()
                const suggestions = Array.isArray(json?.suggestions) ? json.suggestions : []
                setCitySuggestions(
                    suggestions.map((s: { mapbox_id: string; name: string; place_formatted?: string }) => ({
                        id: s.mapbox_id,
                        name: s.name,
                        placeFormatted: s.place_formatted || '',
                    }))
                )
                setCityOpen(suggestions.length > 0)
                setCityHighlight(-1)
            } catch {
                // Aborted or network error — ignore
            }
        }, 200)
        return () => {
            clearTimeout(handle)
            controller.abort()
        }
    }, [cityQuery, citySessionToken])

    const handleCitySelect = async (item: CitySuggestion) => {
        setCityOpen(false)
        setCityHighlight(-1)
        setCityQuery('')
        formik.setFieldValue('locationLabel', [item.name, item.placeFormatted].filter(Boolean).join(', '))
        const token = process.env.GATSBY_MAPBOX_TOKEN
        try {
            if (!token || !item.id) return
            const url = new URL(`https://api.mapbox.com/search/searchbox/v1/retrieve/${encodeURIComponent(item.id)}`)
            url.searchParams.set('session_token', citySessionToken)
            url.searchParams.set('access_token', token)
            const response = await fetch(url.toString())
            const json = await response.json()
            const feature = (Array.isArray(json?.features) && json.features[0]) || null
            const coords = feature?.geometry?.coordinates || feature?.properties?.coordinates || null
            let longitude: number | null = null
            let latitude: number | null = null
            if (Array.isArray(coords) && coords.length >= 2) {
                longitude = coords[0]
                latitude = coords[1]
            } else if (typeof coords?.longitude === 'number' && typeof coords?.latitude === 'number') {
                longitude = coords.longitude
                latitude = coords.latitude
            }
            if (longitude != null && latitude != null) {
                formik.setFieldValue('locationLat', latitude)
                formik.setFieldValue('locationLng', longitude)
            }
        } catch (error) {
            console.error('Error retrieving city coordinates:', error)
        } finally {
            // Start a new session token after selection as per Mapbox session semantics
            setCitySessionToken(newSessionToken())
        }
    }

    // Close suggestion dropdowns on outside click
    React.useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (lumaContainerRef.current && !lumaContainerRef.current.contains(e.target as Node)) {
                setLumaOpen(false)
            }
            if (cityContainerRef.current && !cityContainerRef.current.contains(e.target as Node)) {
                setCityOpen(false)
            }
        }
        window.addEventListener('click', onClick)
        return () => window.removeEventListener('click', onClick)
    }, [])

    const suggestionKeyDown =
        (
            isOpen: boolean,
            count: number,
            highlight: number,
            setHighlight: React.Dispatch<React.SetStateAction<number>>,
            selectAt: (index: number) => void,
            close: () => void
        ) =>
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!isOpen || count === 0) return
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setHighlight((idx) => (idx + 1) % count)
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setHighlight((idx) => (idx - 1 + count) % count)
            } else if (e.key === 'Enter') {
                e.preventDefault()
                selectAt(highlight >= 0 ? highlight : 0)
            } else if (e.key === 'Escape') {
                close()
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

    const firstSpeakerProfile: EventGraphicSpeaker | undefined = React.useMemo(() => {
        const squeakId = formik.values.speakers[0]
        if (!squeakId) return undefined
        const profile = data.allSqueakProfile.nodes.find((node: { squeakId: string }) => node.squeakId === squeakId)
        if (!profile) return undefined
        return {
            name: [profile.firstName, profile.lastName].filter(Boolean).join(' '),
            color: profile.color || undefined,
            avatarUrl: profile.avatar?.url || undefined,
            companyRole: profile.companyRole || undefined,
        }
    }, [formik.values.speakers, data.allSqueakProfile.nodes])

    // Falls back to a stable hash of the event name so the same event always starts on the same style.
    const graphicStyleIndex = graphicStyleOverride ?? eventGraphicStyleIndex(formik.values.name)

    // Step by a random non-zero offset so every press lands on a different hue/variant combination.
    const shuffleGraphicStyle = () =>
        setGraphicStyleOverride(
            (graphicStyleIndex + 1 + Math.floor(Math.random() * (EVENT_GRAPHIC_STYLE_COUNT - 1))) %
                EVENT_GRAPHIC_STYLE_COUNT
        )

    const graphicProps = {
        title: formik.values.name || 'Your event name',
        date: formik.values.date,
        startTime: formik.values.startTime,
        venue: formik.values.venueName,
        location: formik.values.locationLabel,
        online: formik.values.online,
        speaker: firstSpeakerProfile,
        partners: formik.values.partners.filter((partner) => partner.name),
        styleIndex: graphicStyleIndex,
    }

    const landscapeTitleScale = 1 + landscapeTitleStep * TITLE_SCALE_STEP

    const handleDownloadGraphic = async (format: EventGraphicFormat) => {
        const node = format === 'landscape' ? landscapeGraphicRef.current : graphicRef.current
        if (!node) return
        setDownloadingGraphic(format)
        try {
            const { width, height } = GRAPHIC_EXPORT_SIZES[format]
            const dataUrl = await toPng(node, {
                canvasWidth: width,
                canvasHeight: height,
                pixelRatio: 1,
            })
            const link = document.createElement('a')
            link.download = graphicFileName(formik.values.name, format)
            link.href = dataUrl
            link.click()
            link.remove()
        } catch (error) {
            console.error('Error generating event graphic:', error)
            addToast({ description: 'Failed to generate the event graphic' })
        } finally {
            setDownloadingGraphic(null)
        }
    }

    // resetForm() alone leaves a stale city query that re-opens its dropdown. In edit mode
    // this reverts to the saved event rather than emptying the form.
    const clearForm = () => {
        formik.resetForm()
        setLandscapeTitleStep(0)
        setCityQuery('')
        setCitySuggestions([])
        setCityOpen(false)
        setCityHighlight(-1)
        setCitySessionToken(newSessionToken())
        setLumaOpen(false)
        setLumaHighlight(-1)
    }

    return (
        <div>
            {/* pr-10 keeps this clear of the card's absolutely-positioned close button */}
            <div className="flex items-center justify-between gap-2 mb-1 pr-10">
                <h2 className="text-xl font-bold mb-0">Add a new event</h2>
                <OSButton
                    size="sm"
                    variant="secondary"
                    type="button"
                    disabled={submitting}
                    tooltip={event ? 'Revert to the saved event' : 'Clear all fields'}
                    onClick={clearForm}
                >
                    {event ? 'Revert' : 'Clear'}
                </OSButton>
            </div>
            <form onSubmit={formik.handleSubmit} className="space-y-3">
                <div ref={lumaContainerRef} className="relative">
                    <OSInput
                        label="Name"
                        required
                        direction="column"
                        autoComplete="off"
                        touched={formik.touched.name}
                        error={formik.errors.name}
                        aria-autocomplete={event ? undefined : 'list'}
                        aria-expanded={lumaOpen && lumaMatches.length > 0}
                        aria-controls="luma-event-suggestions"
                        aria-activedescendant={
                            lumaOpen && lumaHighlight >= 0
                                ? suggestionOptionId('luma-event-suggestions', lumaHighlight)
                                : undefined
                        }
                        {...formik.getFieldProps('name')}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            formik.handleChange(e)
                            if (!event) {
                                setLumaOpen(e.target.value.trim().length >= 3)
                                setLumaHighlight(-1)
                            }
                        }}
                        onKeyDown={suggestionKeyDown(
                            lumaOpen,
                            lumaMatches.length,
                            lumaHighlight,
                            setLumaHighlight,
                            (idx) => lumaMatches[idx] && handleLumaSelect(lumaMatches[idx]),
                            () => setLumaOpen(false)
                        )}
                    />
                    {!event && lumaOpen && (
                        <SuggestionDropdown
                            id="luma-event-suggestions"
                            items={lumaMatches.map((suggestion) => ({
                                id: suggestion.id,
                                label: suggestion.name,
                                sublabel: [
                                    suggestedDateTime(suggestion)
                                        ? dayjs(suggestedDateTime(suggestion)!.date).format('MMM D, YYYY')
                                        : null,
                                    suggestion.online ? 'Online' : suggestion.cityState || suggestion.city,
                                    sourceLabel(suggestion.source),
                                ]
                                    .filter(Boolean)
                                    .join(' · '),
                            }))}
                            highlightIndex={lumaHighlight}
                            onHighlight={setLumaHighlight}
                            onSelect={(idx) => lumaMatches[idx] && handleLumaSelect(lumaMatches[idx])}
                        />
                    )}
                </div>
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
                <div className="flex items-center gap-3">
                    <Toggle
                        checked={formik.values.online}
                        onChange={(checked) => {
                            formik.setFieldValue('online', checked)
                            if (checked) {
                                formik.setFieldValue('locationLabel', '')
                                formik.setFieldValue('locationLat', undefined)
                                formik.setFieldValue('locationLng', undefined)
                                formik.setFieldValue('venueName', '')
                            }
                        }}
                        label="Online only"
                        position="left"
                    />
                </div>
                {!formik.values.online && (
                    <>
                        <div ref={cityContainerRef} className="relative">
                            <OSInput
                                label="Location"
                                required
                                direction="column"
                                placeholder="e.g. Dublin, Ireland"
                                autoComplete="off"
                                touched={formik.touched.locationLabel}
                                error={formik.errors.locationLabel}
                                aria-autocomplete="list"
                                aria-expanded={cityOpen && citySuggestions.length > 0}
                                aria-controls="city-suggestions"
                                aria-activedescendant={
                                    cityOpen && cityHighlight >= 0
                                        ? suggestionOptionId('city-suggestions', cityHighlight)
                                        : undefined
                                }
                                {...formik.getFieldProps('locationLabel')}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    formik.handleChange(e)
                                    setCityQuery(e.target.value)
                                }}
                                onKeyDown={suggestionKeyDown(
                                    cityOpen,
                                    citySuggestions.length,
                                    cityHighlight,
                                    setCityHighlight,
                                    (idx) => citySuggestions[idx] && handleCitySelect(citySuggestions[idx]),
                                    () => setCityOpen(false)
                                )}
                            />
                            {cityOpen && (
                                <SuggestionDropdown
                                    id="city-suggestions"
                                    items={citySuggestions.map((city) => ({
                                        id: city.id,
                                        label: city.name,
                                        sublabel: city.placeFormatted,
                                    }))}
                                    highlightIndex={cityHighlight}
                                    onHighlight={setCityHighlight}
                                    onSelect={(idx) => citySuggestions[idx] && handleCitySelect(citySuggestions[idx])}
                                />
                            )}
                        </div>
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
                    </>
                )}
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
                <div>
                    <label className="text-[15px] block mb-1">Default event graphic</label>
                    <p className="text-sm text-secondary mb-2">
                        These graphics are generated from the details above. If you don't upload a photo, the square one
                        is saved automatically and used as the event's photo everywhere on the site. Shuffle to try a
                        different color and light/dark treatment — whatever is showing when you save is what gets used.
                        The landscape (link preview) graphic has its own title-size control below.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <EventGraphic
                            ref={graphicRef}
                            {...graphicProps}
                            format="square"
                            className="rounded border border-primary"
                        />
                        <EventGraphic
                            ref={landscapeGraphicRef}
                            {...graphicProps}
                            format="landscape"
                            titleScale={landscapeTitleScale}
                            className="rounded border border-primary self-start"
                        />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <OSButton size="sm" variant="secondary" type="button" onClick={shuffleGraphicStyle}>
                            Shuffle style
                        </OSButton>
                        <OSButton
                            size="sm"
                            variant="secondary"
                            type="button"
                            disabled={downloadingGraphic !== null}
                            onClick={() => handleDownloadGraphic('square')}
                        >
                            {downloadingGraphic === 'square' ? (
                                <IconSpinner className="animate-spin size-4" />
                            ) : (
                                'Download square (1080×1080)'
                            )}
                        </OSButton>
                        <OSButton
                            size="sm"
                            variant="secondary"
                            type="button"
                            disabled={downloadingGraphic !== null}
                            onClick={() => handleDownloadGraphic('landscape')}
                        >
                            {downloadingGraphic === 'landscape' ? (
                                <IconSpinner className="animate-spin size-4" />
                            ) : (
                                'Download landscape (1200×630)'
                            )}
                        </OSButton>
                        <div className="flex items-center gap-1 sm:ml-auto">
                            <span className="text-sm text-secondary mr-1">Landscape title size</span>
                            <OSButton
                                size="sm"
                                variant="secondary"
                                type="button"
                                aria-label="Make the landscape title smaller"
                                tooltip="Smaller landscape title"
                                disabled={landscapeTitleStep <= TITLE_SCALE_MIN_STEP}
                                onClick={() =>
                                    setLandscapeTitleStep((step) => Math.max(TITLE_SCALE_MIN_STEP, step - 1))
                                }
                            >
                                A-
                            </OSButton>
                            <OSButton
                                size="sm"
                                variant="secondary"
                                type="button"
                                aria-label="Make the landscape title bigger"
                                tooltip="Bigger landscape title"
                                disabled={landscapeTitleStep >= TITLE_SCALE_MAX_STEP}
                                onClick={() =>
                                    setLandscapeTitleStep((step) => Math.min(TITLE_SCALE_MAX_STEP, step + 1))
                                }
                            >
                                A+
                            </OSButton>
                        </div>
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
                    <OSButton disabled={submitting} variant="default" size="md" type="button" onClick={clearForm}>
                        Reset
                    </OSButton>
                </div>
            </form>
        </div>
    )
}
