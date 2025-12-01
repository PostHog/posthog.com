import React from 'react'
import { useFormik } from 'formik'
import { MixtapeFormValues, YTPlayer, Track } from './types'
import { Fieldset } from 'components/OSFieldset'
import { OSInput } from 'components/OSForm'
import CassetteTape from './CassetteTape'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { IconArrowUpRight, IconCheck, IconSpinner, IconTrash } from '@posthog/icons'
import OSButton from 'components/OSButton'
import CreatableMultiSelect from 'components/CreatableMultiSelect'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cassetteLabelBackgrounds } from '../../data/cassetteBackgrounds'
import SEO from 'components/seo'
import { useUser } from 'hooks/useUser'
import { useToast } from '../../context/Toast'
import { Link, navigate } from 'gatsby'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import { extractVideoId } from './utils'
import { debounce } from 'lodash'

interface SortableTrackProps {
    track: Track
    index: number
    onRemove: () => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onTitleFetch: (title: string) => void
}

function SortableTrack({ track, index, onRemove, onChange, onTitleFetch }: SortableTrackProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: track.id })
    const [isFetchingTitle, setIsFetchingTitle] = React.useState(false)
    const [fetchedTitle, setFetchedTitle] = React.useState(!!track.title)
    const playerRef = React.useRef<YTPlayer | null>(null)

    const fetchYouTubeTitle = React.useCallback(
        async (youtubeUrl: string) => {
            if (!youtubeUrl || isFetchingTitle) return

            const videoId = extractVideoId(youtubeUrl)
            if (!videoId || videoId === youtubeUrl.trim()) return

            setIsFetchingTitle(true)

            try {
                // Ensure YouTube API is loaded
                if (typeof window === 'undefined' || !window.YT) {
                    // Load the API if not already loaded
                    const tag = document.createElement('script')
                    tag.src = 'https://www.youtube.com/iframe_api'
                    const firstScriptTag = document.getElementsByTagName('script')[0]
                    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

                    // Wait for API to load
                    await new Promise<void>((resolve) => {
                        window.onYouTubeIframeAPIReady = () => resolve()
                        // Timeout after 5 seconds
                        setTimeout(() => resolve(), 5000)
                    })
                }

                // Create a hidden container for the player
                const container = document.createElement('div')
                container.id = `yt-title-fetcher-${track.id}`
                container.style.display = 'none'
                document.body.appendChild(container)

                // Create player to fetch video data
                playerRef.current = new window.YT.Player(container.id, {
                    height: '0',
                    width: '0',
                    videoId: videoId,
                    host: 'https://www.youtube-nocookie.com',
                    events: {
                        onReady: (event: { target: YTPlayer }) => {
                            try {
                                const videoData = event.target.getVideoData()
                                if (videoData && videoData.title) {
                                    onTitleFetch(videoData.title)
                                }
                            } catch (error) {
                                console.error('Error fetching YouTube title:', error)
                            } finally {
                                // Clean up
                                if (playerRef.current) {
                                    playerRef.current.destroy?.()
                                    playerRef.current = null
                                }
                                container.remove()
                                setIsFetchingTitle(false)
                            }
                        },
                        onError: () => {
                            if (playerRef.current) {
                                playerRef.current.destroy?.()
                                playerRef.current = null
                            }
                            container.remove()
                            setIsFetchingTitle(false)
                        },
                    },
                })
            } catch (error) {
                console.error('Error loading YouTube API:', error)
                setIsFetchingTitle(false)
            } finally {
                setFetchedTitle(true)
            }
        },
        [track.id, onTitleFetch, isFetchingTitle]
    )

    // Create debounced version of fetchYouTubeTitle
    const debouncedFetchTitle = React.useMemo(
        () => debounce((url: string) => fetchYouTubeTitle(url), 1000),
        [fetchYouTubeTitle]
    )

    // Fetch title when YouTube URL changes
    React.useEffect(() => {
        // Only fetch if we have a URL and no title
        if (!fetchedTitle && track.youtubeUrl && !track.title) {
            debouncedFetchTitle(track.youtubeUrl)
        }

        return () => {
            debouncedFetchTitle.cancel()
        }
    }, [track.youtubeUrl, track.title, debouncedFetchTitle])

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            if (playerRef.current) {
                try {
                    playerRef.current.destroy?.()
                } catch (error) {
                    // Ignore cleanup errors
                }
                playerRef.current = null
            }
        }
    }, [])

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
                <button
                    type="button"
                    onClick={onRemove}
                    className="absolute top-0 right-3 bg-[#e4e3d8] dark:bg-primary z-10 group"
                >
                    <IconTrash className="size-5 opacity-70 group-hover:opacity-100" />
                </button>
                <OSInput
                    label="YouTube URL"
                    name={`tracks.${index}.youtubeUrl`}
                    direction="column"
                    value={track.youtubeUrl}
                    onChange={onChange}
                />
                <OSInput
                    label="Label"
                    name={`tracks.${index}.title`}
                    direction="column"
                    value={track.title}
                    onChange={onChange}
                    placeholder={isFetchingTitle ? 'Fetching title...' : 'The Beatles - Come Together'}
                    disabled={isFetchingTitle}
                    actionButton={
                        fetchedTitle
                            ? {
                                  label: isFetchingTitle ? 'Fetching...' : 'Fetch from YouTube',
                                  onClick: () => {
                                      setFetchedTitle(false)
                                      fetchYouTubeTitle(track.youtubeUrl)
                                  },
                                  disabled: isFetchingTitle || !track.youtubeUrl,
                              }
                            : undefined
                    }
                />
            </Fieldset>
        </div>
    )
}

interface MixtapeEditorProps {
    id?: number
    onSubmit?: () => void
    location?: { pathname: string }
    newWindow?: boolean
    key?: string
}

export default function MixtapeEditor({ id, onSubmit }: MixtapeEditorProps): JSX.Element {
    const { addToast } = useToast()
    const { getJwt, user } = useUser()
    const { appWindow } = useWindow()
    const { closeWindow } = useApp()
    const isEditMode = !!id
    const [isLoading, setIsLoading] = React.useState(isEditMode)
    const [showErrors, setShowErrors] = React.useState(false)
    const [copiedShareUrl, setCopiedShareUrl] = React.useState(false)
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const formik = useFormik<MixtapeFormValues>({
        initialValues: {
            title: '',
            genres: [],
            tracks: [],
            labelBackground: cassetteLabelBackgrounds[0],
            cassetteColor: '#d2d3cc',
            labelColor: '#eeefea',
        },
        onSubmit: async (values) => {
            try {
                const jwt = await getJwt()
                const url = isEditMode
                    ? `${process.env.GATSBY_SQUEAK_API_HOST}/api/mixtapes/${id}`
                    : `${process.env.GATSBY_SQUEAK_API_HOST}/api/mixtapes`
                const method = isEditMode ? 'PUT' : 'POST'

                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify({
                        data: {
                            ...(!isEditMode ? { creator: { connect: [user?.profile?.id] } } : {}),
                            title: values.title,
                            genres: values.genres,
                            tracks: values.tracks.map((track) => ({
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
                    throw new Error(`Failed to ${isEditMode ? 'update' : 'create'} mixtape`)
                }

                const { data } = await response.json()

                if (isEditMode) {
                    addToast({
                        description: 'Mixtape updated successfully',
                    })
                } else {
                    addToast({
                        description: 'Mixtape published successfully',
                    })
                }
                if (onSubmit) {
                    onSubmit()
                }
                if (appWindow) {
                    closeWindow(appWindow)
                }
                navigate(`/fm?mixtape=${data.id}`, { state: { newWindow: true } })
            } catch (error) {
                console.error('Error saving mixtape:', error)
                addToast({
                    description: `Failed to ${isEditMode ? 'update' : 'publish'} mixtape`,
                })
            }
        },
        validate: (values) => {
            const errors: Record<string, string | Record<number, Record<string, string>>> = {}

            if (!values.title || values.title.trim() === '') {
                errors.title = 'Title is required'
            }

            if (!values.tracks || values.tracks.length === 0) {
                errors.tracks = 'At least one track is required'
            } else {
                const trackErrors: Record<number, Record<string, string>> = {}
                values.tracks.forEach((track, index) => {
                    const trackError: Record<string, string> = {}

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

                if (Object.keys(trackErrors).length > 0) {
                    errors.tracks = trackErrors
                }
            }

            return errors
        },
    })

    // Reset errors when form values change
    React.useEffect(() => {
        if (showErrors) {
            setShowErrors(false)
        }
    }, [formik.values])

    // Load existing mixtape if in edit mode
    React.useEffect(() => {
        if (!isEditMode) {
            setIsLoading(false)
            return
        }

        const loadMixtape = async () => {
            try {
                const jwt = await getJwt()
                const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/mixtapes/${id}?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                })

                if (!response.ok) {
                    throw new Error('Failed to load mixtape')
                }

                const { data } = await response.json()
                const attributes = data.attributes

                // Populate form with existing data
                formik.setValues({
                    title: attributes.title || '',
                    genres: attributes.genres || [],
                    tracks: attributes.tracks.map((track: { title: string; youtubeUrl: string }, index: number) => ({
                        id: `${Date.now()}-${index}`,
                        title: track.title || '',
                        youtubeUrl: track.youtubeUrl || '',
                    })),
                    labelBackground: attributes.metadata?.labelBackground || cassetteLabelBackgrounds[0],
                    cassetteColor: attributes.metadata?.cassetteColor || '#d2d3cc',
                    labelColor: attributes.metadata?.labelColor || '#eeefea',
                })
            } catch (error) {
                console.error('Error loading mixtape:', error)
                addToast({
                    description: 'Failed to load mixtape',
                })
            } finally {
                setIsLoading(false)
            }
        }

        loadMixtape()
    }, [id, isEditMode])

    const addTrack = () => {
        formik.setFieldValue('tracks', [
            ...formik.values.tracks,
            { id: Date.now().toString(), title: '', youtubeUrl: '' },
        ])
    }

    const removeTrack = (index: number) => {
        const newTracks = formik.values.tracks.filter((_, i) => i !== index)
        formik.setFieldValue('tracks', newTracks)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = formik.values.tracks.findIndex((track) => track.id === active.id)
            const newIndex = formik.values.tracks.findIndex((track) => track.id === over.id)
            formik.setFieldValue('tracks', arrayMove(formik.values.tracks, oldIndex, newIndex))
        }
    }

    if (isLoading) {
        return (
            <div data-scheme="secondary" className="flex items-center justify-center p-8 h-full bg-primary">
                <IconSpinner className="size-8 animate-spin" />
            </div>
        )
    }

    const shareUrl = isEditMode && typeof window !== 'undefined' ? `/fm?mixtape=${id}` : ''

    return (
        <ScrollArea>
            <SEO title={`${isEditMode ? 'Edit mixtape' : 'New mixtape'} - ♫ PostHog FM`} />
            <div
                data-scheme="secondary"
                className="p-4 grid grid-cols-2 gap-4 items-start bg-[#e4e3d8] dark:bg-primary text-primary [&_legend]:bg-[#e4e3d8] dark:[&_legend]:bg-primary"
            >
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
                    {isEditMode && shareUrl && (
                        <Fieldset
                            legend={
                                <Link to={shareUrl} state={{ newWindow: true }} className="flex items-center gap-1">
                                    <span>Share URL</span>
                                    <IconArrowUpRight className="size-3" />
                                </Link>
                            }
                            className="mb-0"
                        >
                            <div className="flex items-center gap-2">
                                <div className="flex-1 font-mono text-sm truncate line-clamp-1 p-2 bg-accent border border-input rounded w-0">
                                    {window.location.origin}
                                    {shareUrl}
                                </div>
                                <OSButton
                                    type="button"
                                    variant="secondary"
                                    onClick={() => {
                                        navigator.clipboard.writeText(`${window.location.origin}${shareUrl}`)
                                        addToast({
                                            description: 'Share URL copied to clipboard',
                                        })
                                        setCopiedShareUrl(true)
                                        setTimeout(() => {
                                            setCopiedShareUrl(false)
                                        }, 3000)
                                    }}
                                >
                                    <span className="relative flex items-center justify-center">
                                        <span className={copiedShareUrl ? 'invisible' : 'visible'}>Copy</span>
                                        <span className={`absolute ${copiedShareUrl ? '' : 'hidden'}`}>
                                            <IconCheck className="size-5" />
                                        </span>
                                    </span>
                                </OSButton>
                            </div>
                        </Fieldset>
                    )}

                    <Fieldset legend="Title" className="mb-0">
                        <OSInput
                            direction="column"
                            showLabel={false}
                            label="Title"
                            placeholder="Give your mixtape a name..."
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                    </Fieldset>

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
                                            onTitleFetch={(title) =>
                                                formik.setFieldValue(`tracks.${index}.title`, title)
                                            }
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
                    <Fieldset
                        legend={
                            <span className="flex items-baseline gap-1">
                                <span>Genres</span>
                                <span className="text-xs text-secondary">(Optional)</span>
                            </span>
                        }
                        className="mb-0"
                    >
                        <CreatableMultiSelect
                            label="Genres"
                            placeholder="Add genres..."
                            options={formik.values.genres.map((genre) => ({ label: genre, value: genre }))}
                            value={formik.values.genres}
                            onChange={(genres) => formik.setFieldValue('genres', genres)}
                            hideLabel={true}
                            required={false}
                        />
                    </Fieldset>

                    <div className="!mt-4">
                        <OSButton
                            type="button"
                            variant="primary"
                            width="full"
                            onClick={() => {
                                setShowErrors(true)
                                formik.submitForm()
                            }}
                        >
                            {formik.isSubmitting ? (
                                <IconSpinner className="size-6 animate-spin" />
                            ) : isEditMode ? (
                                'Update'
                            ) : (
                                'Publish'
                            )}
                        </OSButton>
                        {formik.errors && Object.keys(formik.errors).length > 0 && showErrors && (
                            <div className="mt-2 text-sm text-red font-semibold space-y-1">
                                {formik.errors.title && <div>{formik.errors.title}</div>}
                                {typeof formik.errors.tracks === 'string' && <div>{formik.errors.tracks}</div>}
                                {typeof formik.errors.tracks === 'object' && (
                                    <div>
                                        {Object.entries(
                                            formik.errors.tracks as Record<number, Record<string, string>>
                                        ).map(([trackIndex, trackErrors]) => (
                                            <div key={trackIndex}>
                                                Track {parseInt(trackIndex) + 1}:{' '}
                                                {Object.values(trackErrors).join(', ')}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </ScrollArea>
    )
}
