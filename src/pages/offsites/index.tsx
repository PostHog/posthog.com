import React, { useState, useEffect } from 'react'
import SEO from 'components/seo'
import Explorer from 'components/Explorer'
import OSTable from 'components/OSTable'
import OSButton from 'components/OSButton'
import { OSInput } from 'components/OSForm'
import { TeamMemberMultiSelect, SelectedMember, TeamContext } from 'components/OSForm/TeamMemberMultiSelect'
import { IconPlus, IconMapPin, IconUpload } from '@posthog/icons'
import { navigate } from 'gatsby'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { useUser } from 'hooks/useUser'
import { useToast } from '../../context/Toast'
import dayjs from 'dayjs'
import { Place } from 'pages/place-reviews'
import { graphql, useStaticQuery } from 'gatsby'
import { useDropzone } from 'react-dropzone'
import { addEvent, getEvents } from 'components/HogMap/data'

interface MapboxFeature {
    place_name: string
    text: string
    mapbox_id?: string
}

interface MapboxSuggestion {
    mapbox_id?: string
    feature_id?: string
    id?: string
    name?: string
    full_address?: string
    place_formatted?: string
    place_name?: string
    description?: string
}

interface Lodging {
    location: string
    type: 'Hotel' | 'Airbnb'
}

interface RsvpProfile {
    id: string
    avatar?: { url: string }
    firstName?: string
    lastName?: string
    color?: string
}

export interface Event {
    id: number
    name: string
    type?: 'Small team(s)' | 'Whole company'
    lodging?: Lodging[]
    startDate?: string
    endDate?: string
    displayLocation?: string
    date: string // datetime from Strapi
    description?: string
    location?: Place
    private?: boolean
    internal?: boolean
    format?: string[] // JSON field from Strapi
    audience?: string[] // JSON field from Strapi
    speakers?: string[] // Resolved from relation
    speakerTopic?: string
    partners?: Array<{ name: string; url?: string }> // Component repeatable
    attendees?: number
    rsvps?: RsvpProfile[]
    internalTeams?: TeamContext[]
    vibeScore?: number // decimal in Strapi
    photos?: { id: number; url: string }[] // media multiple
    photoGalleryUrl?: string
    video?: string
    presentation?: string
    link?: string
    // Step 2 fields
    summary?: string
    hackathonPRs?: string[]
    slackChannel?: string
    schedule?: string
    notes?: string
    flightTracker?: Array<{
        name: string
        avatar?: string
        arrivalDate?: string
        arrivalTime?: string
        arrivalFlight?: string
        departureDate?: string
        departureTime?: string
        departureFlight?: string
    }>
}

const MapboxAutocomplete = ({
    value,
    onChange,
    placeholder,
}: {
    value: string
    onChange: (value: string) => void
    placeholder: string
}) => {
    const [query, setQuery] = React.useState(value)
    const [suggestions, setSuggestions] = React.useState<MapboxFeature[]>([])
    const [showSuggestions, setShowSuggestions] = React.useState(false)

    React.useEffect(() => {
        setQuery(value)
    }, [value])

    const handleSearch = async (searchText: string) => {
        setQuery(searchText)

        if (searchText.length < 3) {
            setSuggestions([])
            return
        }

        try {
            const url = new URL('https://api.mapbox.com/search/searchbox/v1/suggest')
            url.searchParams.set('q', searchText.trim())
            url.searchParams.set('limit', '5')
            url.searchParams.set('types', 'place,city,locality,neighborhood,street,address,poi')
            url.searchParams.set('language', 'en')
            url.searchParams.set('access_token', process.env.MAPBOX_TOKEN || '')
            const response = await fetch(url.toString())
            const data = await response.json()
            const suggestions = Array.isArray(data?.suggestions) ? data.suggestions : []
            setSuggestions(
                suggestions.map((s: MapboxSuggestion) => ({
                    mapbox_id: s.mapbox_id || s.feature_id || s.id,
                    place_name: s.place_formatted || s.full_address || s.place_name || s.description || '',
                    text: s.name || s.full_address || s.place_formatted || 'Unknown',
                }))
            )
            setShowSuggestions(true)
        } catch (error) {
            console.error('Mapbox search error:', error)
        }
    }

    const handleSelect = async (place: MapboxFeature) => {
        setQuery(place.text)
        setShowSuggestions(false)
        setSuggestions([])

        if (!place.mapbox_id) {
            onChange(place.place_name)
            return
        }

        try {
            const url = new URL(
                `https://api.mapbox.com/search/searchbox/v1/retrieve/${encodeURIComponent(place.mapbox_id)}`
            )
            url.searchParams.set('access_token', process.env.MAPBOX_TOKEN || '')
            const response = await fetch(url.toString())
            const data = await response.json()
            const feat = (Array.isArray(data?.features) && data.features[0]) || data?.feature || null
            const fullAddress =
                feat?.properties?.place_formatted || feat?.properties?.full_address || place.place_name || ''
            onChange(fullAddress)
        } catch (error) {
            console.error('Mapbox retrieve error:', error)
            onChange(place.place_name)
        }
    }

    return (
        <div className="relative">
            <OSInput
                label=""
                direction="column"
                placeholder={placeholder}
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            />
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-primary border border-primary rounded shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((place, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelect(place)}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-accent border-b border-border last:border-b-0"
                        >
                            <div className="font-medium">{place.text}</div>
                            <div className="text-xs text-secondary">{place.place_name}</div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

const OffsiteFormCard = ({
    formData,
    handleInputChange,
    handleRsvpChange,
    removeTeam,
    handleSubmit,
    handleCancelAdd,
    handleContinue,
    handleBack,
    formStep,
    submitting,
    teams,
}: {
    formData: Omit<Event, 'id'>
    handleInputChange: (field: keyof Omit<Event, 'id'>, value: unknown) => void
    handleRsvpChange: (selected: SelectedMember[]) => void
    removeTeam: (teamId: string) => void
    handleSubmit: (e: React.FormEvent) => void
    handleCancelAdd: () => void
    handleContinue: () => void
    handleBack: () => void
    formStep: 1 | 2
    submitting: boolean
    teams: Array<{
        id: string
        name: string
        slug: string
        profiles: {
            data: Array<{
                id: string
                attributes: {
                    firstName: string
                    lastName: string
                    color: string | null
                    avatar: { data: { attributes: { url: string } } } | null
                    squeakId: string
                }
            }>
        }
    }>
}) => {
    const { addToast } = useToast()
    const { getJwt } = useUser()
    const isHistorical = formData.startDate ? new Date(formData.startDate) < new Date() : false
    const [uploadedPhotos, setUploadedPhotos] = React.useState<Array<{ file: File; id?: number; url?: string }>>([])
    const [uploadingPhotos, setUploadingPhotos] = React.useState(false)

    const onPhotoDrop = async (acceptedFiles: File[]) => {
        setUploadingPhotos(true)
        try {
            const jwt = await getJwt()
            if (!jwt) {
                throw new Error('No JWT found')
            }

            // Upload each photo to Strapi/Cloudinary
            const uploadPromises = acceptedFiles.map(async (file) => {
                const formData = new FormData()
                formData.append('files', file)

                const uploadedImage = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/upload`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }).then((res) => res.json())

                if (uploadedImage?.length > 0) {
                    return {
                        file,
                        id: uploadedImage[0].id,
                        url: uploadedImage[0].url,
                    }
                }
                return { file }
            })

            const uploadedImages = await Promise.all(uploadPromises)
            setUploadedPhotos((prev) => [...prev, ...uploadedImages])

            // Update formData with photo IDs
            const newPhotos = uploadedImages
                .filter((img): img is { file: File; id: number; url?: string } => img.id !== undefined)
                .map((img) => ({ id: img.id, url: img.url || '' }))
            handleInputChange('photos', [...(formData.photos || []), ...newPhotos])

            addToast({
                description: `${acceptedFiles.length} photo${acceptedFiles.length > 1 ? 's' : ''} uploaded`,
            })
        } catch (error) {
            console.error('Error uploading photos:', error)
            addToast({
                description: 'Failed to upload photos',
            })
        } finally {
            setUploadingPhotos(false)
        }
    }

    const removePhoto = (index: number) => {
        setUploadedPhotos((prev) => {
            const updated = prev.filter((_, i) => i !== index)
            // Update formData to remove the photo ID
            const photoIds = updated
                .filter((img): img is { file: File; id: number; url?: string } => img.id !== undefined)
                .map((img) => ({ id: img.id, url: img.url || '' }))
            handleInputChange('photos', photoIds)
            return updated
        })
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onPhotoDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'],
        },
        multiple: true,
    })
    return (
        <div className="w-[768px] h-full bg-primary border-l border-primary flex flex-col">
            <button
                onClick={handleCancelAdd}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded hover:bg-accent text-primary hover:text-primary text-xl leading-none"
            >
                ✕
            </button>

            <ScrollArea className="flex-1 h-full">
                <div className="p-6 h-full">
                    <h2 className="text-2xl font-bold m-0 mb-2 sticky bg-primary py-4 top-0 z-10">
                        {formStep === 1 ? 'New offsite' : 'Offsite details'}
                    </h2>
                    <form
                        onSubmit={
                            formStep === 1
                                ? (e) => {
                                      e.preventDefault()
                                      handleContinue()
                                  }
                                : handleSubmit
                        }
                        className="space-y-6"
                    >
                        {formStep === 1 && (
                            <>
                                <div className="flex flex-col space-y-2">
                                    <label className="text-[15px] font-semibold">Type</label>
                                    <div className="flex gap-0 border border-border rounded overflow-hidden">
                                        {(['Small team(s)', 'Whole company'] as const).map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => handleInputChange('type', type)}
                                                className={`flex-1 px-4 py-2.5 text-sm transition-colors ${
                                                    formData.type === type
                                                        ? 'bg-accent font-semibold'
                                                        : 'bg-primary hover:bg-accent/50'
                                                }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {(formData.lodging || [{ location: '', type: 'Hotel' }]).map((lodging, index) => (
                                    <div key={index} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col space-y-2">
                                                <label className="text-[15px] font-semibold">
                                                    {index === 0 ? 'Lodging' : `Lodging ${index + 1}`}
                                                </label>
                                                <MapboxAutocomplete
                                                    value={lodging.location}
                                                    onChange={(location) => {
                                                        const newLodging = [...(formData.lodging || [])]
                                                        newLodging[index] = { ...newLodging[index], location }
                                                        handleInputChange('lodging', newLodging)
                                                    }}
                                                    placeholder="Hotel name or address..."
                                                />
                                            </div>
                                            <div className="flex flex-col space-y-2">
                                                <label className="text-[15px] font-semibold">Type</label>
                                                <div className="flex gap-0 border border-border rounded overflow-hidden h-[42px]">
                                                    {(['Hotel', 'Airbnb'] as const).map((type) => (
                                                        <button
                                                            key={type}
                                                            type="button"
                                                            onClick={() => {
                                                                const newLodging = [...(formData.lodging || [])]
                                                                newLodging[index] = { ...newLodging[index], type }
                                                                handleInputChange('lodging', newLodging)
                                                            }}
                                                            className={`flex-1 px-4 py-2.5 text-sm transition-colors ${
                                                                lodging.type === type
                                                                    ? 'bg-accent font-semibold'
                                                                    : 'bg-primary hover:bg-accent/50'
                                                            }`}
                                                        >
                                                            {type}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newLodging =
                                                        formData.lodging?.filter((_, i) => i !== index) || []
                                                    handleInputChange('lodging', newLodging)
                                                }}
                                                className="text-sm text-red hover:underline"
                                            >
                                                Remove location
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => {
                                        handleInputChange('lodging', [
                                            ...(formData.lodging || []),
                                            { location: '', type: 'Hotel' },
                                        ])
                                    }}
                                    className="text-sm font-semibold underline hover:no-underline"
                                >
                                    add another location
                                </button>

                                <div className="grid grid-cols-2 gap-4">
                                    <OSInput
                                        label="Start date"
                                        direction="column"
                                        type="date"
                                        value={formData.startDate || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange('startDate', e.target.value)
                                        }
                                        required
                                    />
                                    <OSInput
                                        label="End date"
                                        direction="column"
                                        type="date"
                                        value={formData.endDate || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange('endDate', e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <TeamMemberMultiSelect
                                    label="Attendees"
                                    description=""
                                    placeholder="Robbie Coomer"
                                    teams={teams as Parameters<typeof TeamMemberMultiSelect>[0]['teams']}
                                    value={(formData.rsvps || []).map(
                                        (rsvp): SelectedMember => ({
                                            firstName: rsvp.firstName || '',
                                            lastName: rsvp.lastName || '',
                                            avatar: rsvp.avatar,
                                            color: rsvp.color,
                                            squeakId: rsvp.id,
                                            teams: [],
                                        })
                                    )}
                                    onChange={handleRsvpChange}
                                />

                                {formData.internalTeams && formData.internalTeams.length > 0 && (
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-[15px] font-semibold">Team(s)</label>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.internalTeams.map((team) => (
                                                <span
                                                    key={team.id}
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary text-sm bg-accent"
                                                >
                                                    {team.miniCrest && (
                                                        <img src={team.miniCrest} alt="" className="size-4 shrink-0" />
                                                    )}
                                                    <span>{team.name}</span>
                                                    <button
                                                        type="button"
                                                        aria-label={`Remove ${team.name}`}
                                                        onClick={() => removeTeam(team.id)}
                                                        className="text-secondary hover:text-primary size-4 flex items-center justify-center"
                                                    >
                                                        ✕
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <OSInput
                                    label="Display location"
                                    direction="column"
                                    value={formData.displayLocation || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleInputChange('displayLocation', e.target.value)
                                    }
                                    hint="eg: Phoenix, Arizona"
                                />

                                <OSInput
                                    label="Name"
                                    direction="column"
                                    value={formData.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleInputChange('name', e.target.value)
                                    }
                                    hint="eg: GTM Offsite - 2025"
                                    required
                                />

                                <div className="flex gap-2 sticky bottom-0 bg-primary py-4">
                                    <OSButton variant="primary" size="md" type="submit">
                                        Continue
                                    </OSButton>
                                </div>
                            </>
                        )}

                        {formStep === 2 && isHistorical && (
                            // Historical offsite form (Step 2)
                            <>
                                <div className="flex flex-col space-y-2">
                                    <label className="text-[15px] font-semibold">Summary</label>
                                    <textarea
                                        className="w-full px-3 py-2 border border-border rounded bg-primary text-primary min-h-[100px]"
                                        placeholder="How did the offsite go? What did you do and what did you build?"
                                        value={formData.summary || ''}
                                        onChange={(e) => handleInputChange('summary', e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className="text-[15px] font-semibold">Hackathon project pull requests</label>
                                    {(formData.hackathonPRs || ['']).map((pr, index) => (
                                        <div key={index} className="flex gap-2 items-center">
                                            <OSInput
                                                label=""
                                                direction="column"
                                                placeholder="https://github.com/..."
                                                value={pr}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const newPRs = [...(formData.hackathonPRs || [''])]
                                                    newPRs[index] = e.target.value
                                                    handleInputChange('hackathonPRs', newPRs)
                                                }}
                                            />
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newPRs = formData.hackathonPRs?.filter(
                                                            (_, i) => i !== index
                                                        )
                                                        handleInputChange('hackathonPRs', newPRs)
                                                    }}
                                                    className="text-sm text-red hover:underline"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {formData.hackathonPRs && formData.hackathonPRs[0] && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                handleInputChange('hackathonPRs', [
                                                    ...(formData.hackathonPRs || ['']),
                                                    '',
                                                ])
                                            }}
                                            className="text-sm font-semibold underline hover:no-underline self-start"
                                        >
                                            add another
                                        </button>
                                    )}
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className="text-[15px] font-semibold">Photos</label>
                                    <div
                                        {...getRootProps()}
                                        className={`w-full px-6 py-12 border-2 border-dashed rounded transition-colors cursor-pointer ${
                                            isDragActive
                                                ? 'border-primary bg-accent'
                                                : 'border-border bg-accent/50 hover:bg-accent'
                                        }`}
                                    >
                                        <input {...getInputProps()} />
                                        <div className="flex flex-col items-center justify-center text-center">
                                            {uploadingPhotos ? (
                                                <div className="animate-spin size-8 mb-2">
                                                    <IconUpload className="size-8" />
                                                </div>
                                            ) : (
                                                <IconUpload className="size-8 mb-2 opacity-50" />
                                            )}
                                            <p className="text-sm text-secondary m-0">
                                                {uploadingPhotos
                                                    ? 'Processing photos...'
                                                    : isDragActive
                                                    ? 'Drop photos here'
                                                    : 'Click here or drag and drop photos'}
                                            </p>
                                            <p className="text-xs text-secondary mt-1 m-0">PNG, JPG, WEBP, GIF</p>
                                        </div>
                                    </div>
                                    {uploadedPhotos.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {uploadedPhotos.map((photo, index) => (
                                                <div
                                                    key={index}
                                                    className="relative group border border-border rounded overflow-hidden"
                                                >
                                                    <img
                                                        src={photo.url || URL.createObjectURL(photo.file)}
                                                        alt={photo.file.name}
                                                        className="size-20 object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removePhoto(index)}
                                                        className="absolute top-1 right-1 size-5 bg-red text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                                                    >
                                                        ✕
                                                    </button>
                                                    {!photo.id && (
                                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">
                                                            Uploading...
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <p className="text-xs text-secondary">
                                        These photos will be publicly visible on PostHog.com
                                    </p>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className="text-[15px] font-semibold flex items-center gap-2">
                                        <span className="text-lg">🔒</span> Photo album URL
                                    </label>
                                    <OSInput
                                        label=""
                                        direction="column"
                                        placeholder="https://photos.google.com/..."
                                        value={formData.photoGalleryUrl || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange('photoGalleryUrl', e.target.value)
                                        }
                                    />
                                    <p className="text-xs text-secondary">
                                        This link is only available to PostHog.com team members
                                    </p>
                                </div>

                                <div className="flex gap-2 sticky bottom-0 bg-primary py-4">
                                    <OSButton variant="secondary" size="md" type="button" onClick={handleBack}>
                                        Back
                                    </OSButton>
                                    <OSButton variant="primary" size="md" type="submit" disabled={submitting}>
                                        {submitting ? 'Saving...' : 'Save'}
                                    </OSButton>
                                </div>
                            </>
                        )}

                        {formStep === 2 && !isHistorical && (
                            // Future offsite form (Step 2)
                            <>
                                <div className="flex flex-col space-y-2">
                                    <label className="text-[15px] font-semibold">Slack channel</label>
                                    <OSInput
                                        label=""
                                        direction="column"
                                        placeholder="#offsite-channel-name"
                                        value={formData.slackChannel || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange('slackChannel', e.target.value)
                                        }
                                    />
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className="text-[15px] font-semibold">Schedule</label>
                                    <textarea
                                        className="w-full px-3 py-2 border border-border rounded bg-primary text-primary min-h-[180px] font-mono text-sm"
                                        placeholder={`**Monday** 
• 7 PM: Opening dinner 

**Tuesday** 

**Wednesday** 

**Thursday**  
• 2 PM: Hackathon demos  
                                        
**Friday**  
• Departure flights`}
                                        value={formData.schedule || ''}
                                        onChange={(e) => handleInputChange('schedule', e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className="text-[15px] font-semibold">Notes</label>
                                    <textarea
                                        className="w-full px-3 py-2 border border-border rounded bg-primary text-primary min-h-[100px]"
                                        placeholder="Important reminders..."
                                        value={formData.notes || ''}
                                        onChange={(e) => handleInputChange('notes', e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className="text-[15px] font-semibold">Flight tracker</label>
                                    <div className="border border-border rounded">
                                        <div className="grid grid-cols-[200px,1fr,1fr,1fr] gap-4 px-4 py-2 border-b border-border bg-accent font-semibold text-xs">
                                            <div>Attendee</div>
                                            <div>Arrival</div>
                                            <div></div>
                                            <div>Departure</div>
                                        </div>
                                        {(formData.rsvps || []).map((member, index) => (
                                            <div
                                                key={member.id}
                                                className="grid grid-cols-[200px,1fr,1fr,1fr] gap-4 px-4 py-3 border-b border-border last:border-b-0 items-center text-sm"
                                            >
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <img
                                                        src={member.avatar?.url}
                                                        alt=""
                                                        className={`size-8 rounded-full border border-primary object-cover bg-${
                                                            member.color || 'accent'
                                                        } shrink-0`}
                                                    />
                                                    <span className="font-medium truncate">
                                                        {member.firstName} {member.lastName}
                                                    </span>
                                                </div>
                                                <div className="text-xs">
                                                    <OSInput
                                                        label=""
                                                        direction="column"
                                                        placeholder="Sun, Oct 3  2:35 PM  AA 248"
                                                        value={formData.flightTracker?.[index]?.arrivalDate || ''}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            const newTracker = [...(formData.flightTracker || [])]
                                                            if (!newTracker[index]) {
                                                                newTracker[index] = {
                                                                    name: `${member.firstName} ${member.lastName}`,
                                                                    avatar: member.avatar?.url,
                                                                }
                                                            }
                                                            newTracker[index].arrivalDate = e.target.value
                                                            handleInputChange('flightTracker', newTracker)
                                                        }}
                                                    />
                                                </div>
                                                <div></div>
                                                <div className="text-xs">
                                                    <OSInput
                                                        label=""
                                                        direction="column"
                                                        placeholder="Sun, Oct 10  2:35 PM  AA 248"
                                                        value={formData.flightTracker?.[index]?.departureDate || ''}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            const newTracker = [...(formData.flightTracker || [])]
                                                            if (!newTracker[index]) {
                                                                newTracker[index] = {
                                                                    name: `${member.firstName} ${member.lastName}`,
                                                                    avatar: member.avatar?.url,
                                                                }
                                                            }
                                                            newTracker[index].departureDate = e.target.value
                                                            handleInputChange('flightTracker', newTracker)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2 sticky bottom-0 bg-primary py-4">
                                    <OSButton variant="secondary" size="md" type="button" onClick={handleBack}>
                                        Back
                                    </OSButton>
                                    <OSButton variant="primary" size="md" type="submit" disabled={submitting}>
                                        {submitting ? 'Saving...' : 'Save'}
                                    </OSButton>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </ScrollArea>
        </div>
    )
}

export default function Offsites(): JSX.Element {
    const { getJwt } = useUser()
    const { addToast } = useToast()
    const [offsites, setOffsites] = useState<Event[]>([])
    const [isAddingOffsite, setIsAddingOffsite] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [loading, setLoading] = useState(true)
    const [formStep, setFormStep] = useState<1 | 2>(1)
    const [formData, setFormData] = useState<Omit<Event, 'id'>>({
        name: '',
        type: 'Small team(s)',
        lodging: [{ location: '', type: 'Hotel' }],
        startDate: '',
        endDate: '',
        displayLocation: '',
        date: '',
        description: '',
        location: undefined,
        private: false,
        internal: false,
        format: [],
        audience: [],
        speakers: [],
        speakerTopic: '',
        partners: [],
        attendees: 0,
        rsvps: [],
        internalTeams: [],
        vibeScore: 0,
        photos: [],
        video: '',
        presentation: '',
        link: '',
        summary: '',
        hackathonPRs: [],
        photoGalleryUrl: '',
        slackChannel: '',
        schedule: '',
        notes: '',
        flightTracker: [],
    })

    // Fetch teams data for TeamMemberMultiSelect
    interface GraphQLProfile {
        id: string
        squeakId: string
    }

    interface GraphQLTeamProfileData {
        id: string
        attributes: {
            firstName: string
            lastName: string
            color?: string
            avatar?: { data: { attributes: { url: string } } }
        }
    }

    interface GraphQLTeam {
        id: string
        name: string
        slug: string
        attributes: { name: string }
        profiles: { data: GraphQLTeamProfileData[] }
    }

    const teamsData = useStaticQuery(graphql`
        {
            allTeams: allSqueakTeam(
                filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }
                sort: { fields: name, order: ASC }
            ) {
                nodes {
                    id
                    name
                    slug
                    miniCrest {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    profiles {
                        data {
                            id
                            attributes {
                                firstName
                                lastName
                                color
                                avatar {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            allProfiles: allSqueakProfile(filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }) {
                nodes {
                    id
                    squeakId
                }
            }
        }
    `)

    // Build a map of profile id -> squeakId
    const profileIdToSqueakId = React.useMemo(() => {
        const map = new Map<string, string>()
        teamsData.allProfiles.nodes.forEach((profile: GraphQLProfile) => {
            map.set(profile.id, profile.squeakId)
        })
        return map
    }, [teamsData.allProfiles.nodes])

    // Use teams with squeakId added to each profile
    const teams = React.useMemo(() => {
        return teamsData.allTeams.nodes.map((team: GraphQLTeam) => ({
            id: team.id,
            name: team.name,
            slug: team.slug,
            profiles: {
                data: team.profiles.data.map((profile: GraphQLTeamProfileData) => ({
                    ...profile,
                    attributes: {
                        firstName: profile.attributes.firstName,
                        lastName: profile.attributes.lastName,
                        color: profile.attributes.color || undefined,
                        avatar: profile.attributes.avatar || undefined,
                        squeakId: profileIdToSqueakId.get(profile.id) || profile.id,
                    },
                })),
            },
        }))
    }, [teamsData.allTeams.nodes, profileIdToSqueakId])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jwt = await getJwt()
                if (!jwt) {
                    throw new Error('No JWT found')
                }

                const formattedOffsites = await getEvents(jwt)
                setOffsites(formattedOffsites as unknown as Event[])
            } catch (err) {
                console.error('Error fetching data:', err)
                addToast({
                    description: 'Failed to load offsites',
                })
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleInputChange = (field: keyof Omit<Event, 'id'>, value: unknown) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    // Helper to extract city and state/province from Mapbox place_name
    const extractDisplayLocation = (placeName: string): string => {
        // Mapbox format: "Hotel Name, Street, City, State/Province, Country"
        // We want: "City, State/Province"
        const parts = placeName.split(', ')
        if (parts.length >= 3) {
            // Get the last 3 parts and take the middle two (City, State)
            const relevant = parts.slice(-3, -1)
            return relevant.join(', ')
        }
        return placeName
    }

    // Helper to generate offsite name from teams and year
    const generateOffsiteName = (teams: TeamContext[]): string => {
        if (teams.length === 0) return ''
        const currentYear = new Date().getFullYear()
        if (teams.length === 1) {
            return `${teams[0].name} Offsite - ${currentYear}`
        }
        const teamNames = teams.map((t) => t.name).join(' & ')
        return `${teamNames} Offsite - ${currentYear}`
    }

    const handleRsvpChange = (selected: SelectedMember[]) => {
        // Extract unique teams from selected members
        const teamContexts = new Map<string, TeamContext>()
        selected.forEach((member) => {
            const memberData = member as SelectedMember & { teamContext?: TeamContext }
            if (memberData.teamContext) {
                teamContexts.set(memberData.teamContext.id, memberData.teamContext)
            }
        })

        const newInternalTeams = Array.from(teamContexts.values())
        setFormData((prev) => ({
            ...prev,
            rsvps: selected.map((member) => ({ id: member.squeakId })),
            internalTeams: newInternalTeams,
        }))
    }

    // Auto-populate displayLocation from first lodging
    useEffect(() => {
        const firstLodging = formData.lodging?.[0]?.location
        if (firstLodging && firstLodging.trim()) {
            const displayLoc = extractDisplayLocation(firstLodging)
            setFormData((prev) => ({ ...prev, displayLocation: displayLoc }))
        }
    }, [formData.lodging?.[0]?.location])

    // Auto-populate name from internalTeams
    useEffect(() => {
        if (formData.internalTeams && formData.internalTeams.length > 0) {
            const generatedName = generateOffsiteName(formData.internalTeams)
            setFormData((prev) => ({ ...prev, name: generatedName }))
        }
    }, [formData.internalTeams])

    const removeTeam = (teamId: string) => {
        setFormData((prev) => ({
            ...prev,
            internalTeams: prev.internalTeams?.filter((team) => team.id !== teamId) || [],
        }))
    }

    const handleContinue = () => {
        // Auto-populate slack channel for future offsites
        if (formData.startDate && new Date(formData.startDate) >= new Date()) {
            const year = new Date(formData.startDate).getFullYear()
            // Extract city and state/province from displayLocation
            const locationParts = formData.displayLocation?.split(',').map((s) => s.trim()) || []
            const city = locationParts[0]?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'city'
            const stateProvince = locationParts[1]?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'state'
            const teams =
                formData.internalTeams?.map((t) => t.name.toLowerCase().replace(/[^a-z0-9]/g, '-')).join('-') || 'team'
            const channelName = `offsite-${teams}-${city}-${stateProvince}-${year}`
            setFormData((prev) => ({ ...prev, slackChannel: channelName }))
        }
        setFormStep(2)
    }

    const handleBack = () => {
        setFormStep(1)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const jwt = await getJwt()
            if (!jwt) {
                throw new Error('No JWT found')
            }

            const offsitePayload = {
                name: formData.name,
                date: formData.startDate ? new Date(formData.startDate).toISOString() : new Date().toISOString(),
                description: formData.description || undefined,
                private: formData.private || false,
                internal: formData.internal || false,
                vibeScore: formData.vibeScore || undefined,
                attendees: formData.attendees || undefined,
                rsvps: formData.rsvps || [],
                internalTeams: formData.internalTeams?.map((team) => team.id) || [],
                video: formData.video || undefined,
                lodging: formData.lodging || undefined,
                photos: formData.photos?.map((photo) => photo.id) || undefined,
                photoGalleryUrl: formData.photoGalleryUrl || undefined,
                summary: formData.summary || undefined,
                hackathonPRs: formData.hackathonPRs || undefined,
                slackChannel: formData.slackChannel || undefined,
                schedule: formData.schedule || undefined,
                notes: formData.notes || undefined,
                flightTracker: formData.flightTracker || undefined,
            }

            const result = await addEvent(jwt, offsitePayload)
            const resultData = result as { data: { id: number; attributes: Record<string, unknown> } }
            const newOffsite: Event = {
                id: resultData.data.id,
                name: resultData.data.attributes.name as string,
                date: resultData.data.attributes.date as string,
                description: (resultData.data.attributes.description as string) || '',
                location: resultData.data.attributes.location as Place | undefined,
                private: (resultData.data.attributes.private as boolean) || false,
                internal: (resultData.data.attributes.internal as boolean) || false,
                format: (resultData.data.attributes.format as string[]) || [],
                audience: (resultData.data.attributes.audience as string[]) || [],
                speakers: [],
                speakerTopic: (resultData.data.attributes.speakerTopic as string) || '',
                partners: [],
                attendees: (resultData.data.attributes.attendees as number) || 0,
                rsvps: formData.rsvps,
                vibeScore: (resultData.data.attributes.vibeScore as number) || 0,
                photos: [],
                video: (resultData.data.attributes.video as string) || '',
                presentation: (resultData.data.attributes.presentation as string) || '',
                link: (resultData.data.attributes.link as string) || '',
            }

            setOffsites([newOffsite, ...offsites])
            setFormStep(1)
            setFormData({
                name: '',
                type: 'Small team(s)',
                lodging: [{ location: '', type: 'Hotel' }],
                startDate: '',
                endDate: '',
                displayLocation: '',
                date: '',
                description: '',
                location: undefined,
                private: false,
                internal: false,
                format: [],
                audience: [],
                speakers: [],
                speakerTopic: '',
                partners: [],
                attendees: 0,
                rsvps: [],
                internalTeams: [],
                vibeScore: 0,
                photos: [],
                video: '',
                presentation: '',
                link: '',
            })
            setIsAddingOffsite(false)
            addToast({
                description: 'Offsite created successfully',
            })
        } catch (error) {
            console.error('Error creating offsite:', error)
            addToast({
                description: 'Failed to create offsite',
            })
        } finally {
            setSubmitting(false)
        }
    }

    const handleCancelAdd = () => {
        setIsAddingOffsite(false)
        setFormStep(1)
        setFormData({
            name: '',
            type: 'Small team(s)',
            lodging: [{ location: '', type: 'Hotel' }],
            startDate: '',
            endDate: '',
            displayLocation: '',
            date: '',
            description: '',
            location: undefined,
            private: false,
            internal: false,
            format: [],
            audience: [],
            speakers: [],
            speakerTopic: '',
            partners: [],
            attendees: 0,
            rsvps: [],
            internalTeams: [],
            vibeScore: 0,
            photos: [],
            video: '',
            presentation: '',
            link: '',
        })
    }

    const handleRowClick = (offsiteId: number) => {
        navigate(`/offsites/${offsiteId}`, { state: { offsite: offsites.find((o) => o.id === offsiteId) } })
    }

    const columns = [
        { name: 'Name', align: 'left' as const, width: '300px' },
        { name: 'Location', align: 'left' as const, width: '200px' },
        { name: 'Date', align: 'center' as const, width: '150px' },
        { name: 'Vibe', align: 'center' as const, width: '100px' },
    ]

    const rows = offsites.map((offsite) => ({
        key: String(offsite.id),
        cells: [
            {
                content: (
                    <button
                        onClick={() => handleRowClick(offsite.id)}
                        className="text-left font-semibold text-red dark:text-yellow hover:underline"
                    >
                        {offsite.name}
                    </button>
                ),
            },
            { content: offsite.location?.name || '-' },
            { content: dayjs(offsite.date).format('MMM D, YYYY') },
            { content: offsite.vibeScore ? '🔥'.repeat(offsite.vibeScore) : '-' },
        ],
    }))

    return (
        <>
            <SEO title="Offsites - PostHog" />
            <Explorer template="generic" slug="offsites" title="Offsites" fullScreen>
                <div data-scheme="primary" className="flex h-full text-primary relative">
                    <div className="flex-1 p-8 overflow-auto">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center justify-between mb-8">
                                <h1 className="text-4xl font-bold m-0">Offsites</h1>
                                <OSButton
                                    variant="primary"
                                    size="md"
                                    icon={<IconPlus />}
                                    onClick={() => setIsAddingOffsite(true)}
                                >
                                    Add offsite
                                </OSButton>
                            </div>

                            {loading ? (
                                <div className="text-center py-12">
                                    <p className="text-lg opacity-75">Loading offsites...</p>
                                </div>
                            ) : offsites.length === 0 ? (
                                <div className="text-center py-12 border border-primary rounded-md bg-accent">
                                    <IconMapPin className="size-12 mx-auto mb-4 text-muted" />
                                    <p className="text-lg opacity-75 mb-4">No offsites added yet</p>
                                    <OSButton
                                        variant="secondary"
                                        size="sm"
                                        icon={<IconPlus />}
                                        onClick={() => setIsAddingOffsite(true)}
                                    >
                                        Add your first offsite
                                    </OSButton>
                                </div>
                            ) : (
                                <OSTable columns={columns} rows={rows} />
                            )}
                        </div>
                    </div>

                    {isAddingOffsite && (
                        <OffsiteFormCard
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleRsvpChange={handleRsvpChange}
                            removeTeam={removeTeam}
                            handleSubmit={handleSubmit}
                            handleCancelAdd={handleCancelAdd}
                            handleContinue={handleContinue}
                            handleBack={handleBack}
                            formStep={formStep}
                            submitting={submitting}
                            teams={teams}
                        />
                    )}
                </div>
            </Explorer>
        </>
    )
}
