import { useUser } from 'hooks/useUser'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ScrollArea from 'components/RadixUI/ScrollArea'
import SEO from 'components/seo'
import { IconArrowRightDown, IconCheck } from '@posthog/icons'
import { useToast } from '../../context/Toast'
import { OSInput } from 'components/OSForm'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import CloudinaryImage from 'components/CloudinaryImage'

dayjs.extend(duration)

const POLL_INTERVAL_MS = 2000

interface GeneratedImage {
    uid: string
    url: string
    status: string
}

function ImageResult({ image }: { image: GeneratedImage }) {
    const { addToast } = useToast()
    const [downloaded, setDownloaded] = useState(false)

    const handleClick = async () => {
        try {
            const response = await fetch(image.url)
            const blob = await response.blob()
            const blobUrl = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = blobUrl
            link.download = `hedgehog-${image.uid}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(blobUrl)
            setDownloaded(true)
            addToast({
                description: 'Image downloaded',
                duration: 2000,
            })
        } catch (err) {
            console.error('Failed to download image:', err)
            addToast({
                description: 'Failed to download image',
                error: true,
                duration: 2000,
            })
        }
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`relative aspect-square border-2 rounded overflow-hidden transition-colors cursor-pointer relative ${
                downloaded ? 'border-green' : 'border-primary/20 hover:border-primary/60'
            }`}
        >
            <img src={image.url} alt="Generated hedgehog" className="w-full h-full object-cover" />
            {downloaded && (
                <div className="absolute bottom-2 right-2 bg-green rounded-full p-1.5 shadow-lg">
                    <IconCheck className="size-4 text-white" />
                </div>
            )}
        </button>
    )
}

interface RateLimit {
    remaining?: number
    resetTime?: string | null
    windowMs?: number
}

function useRateLimit(rateLimit: RateLimit | undefined) {
    const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null)
    const [progress, setProgress] = useState(0)

    const resetTime = rateLimit?.remaining === 0 ? rateLimit?.resetTime : null
    const windowMs = rateLimit?.windowMs ?? 60 * 60 * 1000

    useEffect(() => {
        if (!resetTime) {
            setTimeLeft(null)
            setProgress(0)
            return
        }

        const updateCountdown = () => {
            const now = dayjs()
            const reset = dayjs(resetTime)
            const diff = reset.diff(now)

            if (diff <= 0) {
                setTimeLeft(null)
                setProgress(100)
                return false
            }

            const elapsed = windowMs - diff
            setProgress(Math.min(100, Math.max(0, (elapsed / windowMs) * 100)))

            const dur = dayjs.duration(diff)
            setTimeLeft({
                hours: Math.floor(dur.asHours()),
                minutes: dur.minutes(),
                seconds: dur.seconds(),
            })
            return true
        }

        if (!updateCountdown()) return

        const interval = setInterval(() => {
            if (!updateCountdown()) {
                clearInterval(interval)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [resetTime, windowMs])

    const isActive = timeLeft !== null

    const formattedTime = React.useMemo(() => {
        if (!timeLeft) return null
        if (timeLeft.hours > 0) return `${timeLeft.hours}h ${timeLeft.minutes}m`
        if (timeLeft.minutes > 0) return `${timeLeft.minutes}m ${timeLeft.seconds}s`
        return `${timeLeft.seconds}s`
    }, [timeLeft])

    return { isActive, progress, formattedTime }
}

function FloatingZs() {
    return (
        <div className="absolute -top-2 left-4 flex flex-col-reverse items-start text-primary/80 font-medium">
            <span className="text-[10px] animate-float ml-3">z</span>
            <span className="text-xs animate-float ml-1.5" style={{ animationDelay: '0.2s' }}>
                z
            </span>
            <span className="text-sm animate-float" style={{ animationDelay: '0.4s' }}>
                Z
            </span>
        </div>
    )
}

const EXPECTED_DURATION_MS = 120000

const STATUS_MESSAGES = [
    'Warming up the studio',
    'Sharpening the pencils',
    'Mixing the perfect colors',
    'Channeling the muse',
    'Adding extra spikiness',
    'Perfecting the snoot',
    'Fluffing the quills',
    'Consulting the hog gods',
    'Applying artistic flair',
    'Making it extra cute',
]

function GeneratingLoader({ jobStatus }: { jobStatus: 'pending' | 'processing' | null }) {
    const [elapsedMs, setElapsedMs] = useState(0)
    const [messageIndex, setMessageIndex] = useState(0)
    const startTimeRef = useRef<number>(Date.now())

    useEffect(() => {
        startTimeRef.current = Date.now()
        setElapsedMs(0)
        setMessageIndex(0)
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedMs(Date.now() - startTimeRef.current)
        }, 100)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const messageInterval = EXPECTED_DURATION_MS / STATUS_MESSAGES.length
        const messageTimer = setInterval(() => {
            setMessageIndex((prev) => Math.min(prev + 1, STATUS_MESSAGES.length - 1))
        }, messageInterval)
        return () => clearInterval(messageTimer)
    }, [])

    const progress = Math.min(95, (elapsedMs / EXPECTED_DURATION_MS) * 100)

    const formatTime = (ms: number) => {
        const dur = dayjs.duration(ms)
        return dur.format('m:ss')
    }

    return (
        <div className="aspect-square border-2 border-primary/40 rounded flex flex-col items-center justify-center relative overflow-hidden">
            <div className="text-center px-4">
                <div className="flex items-center justify-center gap-3 text-xs text-secondary">
                    <span className="font-mono">{formatTime(elapsedMs)}</span>
                    <span>•</span>
                    <span key={messageIndex} className="animate-slide-up-fade-in">
                        {STATUS_MESSAGES[messageIndex]}
                    </span>
                </div>

                <div className="mt-3 w-48 mx-auto">
                    <div className="h-1 rounded-full overflow-hidden bg-accent">
                        <div
                            className="h-full bg-gradient-to-r from-yellow to-orange rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <p className="text-primary/70 text-xs mt-3 m-0">Usually takes about 2 minutes</p>
            </div>
        </div>
    )
}

function ProgressRing({
    progress,
    size = 100,
    strokeWidth = 6,
}: {
    progress: number
    size?: number
    strokeWidth?: number
}) {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (progress / 100) * circumference

    return (
        <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
            <circle
                className="text-primary/10"
                strokeWidth={strokeWidth}
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                className="text-green transition-all duration-1000 ease-linear"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
        </svg>
    )
}

export default function HedgehogGenerator({ onGenerated }: { onGenerated?: () => void }) {
    const { isModerator, getJwt, user } = useUser()
    const [prompt, setPrompt] = useState('')
    const [image, setImage] = useState<GeneratedImage | null>(null)
    const [loading, setLoading] = useState(false)
    const [jobStatus, setJobStatus] = useState<'pending' | 'processing' | null>(null)
    const [error, setError] = useState<string | null>(null)
    const abortControllerRef = useRef<AbortController | null>(null)

    const { isActive: isRateLimited, progress, formattedTime } = useRateLimit(user?.imageGenerationRateLimit)

    const pollJobStatus = useCallback(
        async (jobId: string, jwt: string, signal: AbortSignal): Promise<GeneratedImage | null> => {
            while (!signal.aborted) {
                const statusResponse = await fetch(
                    `${process.env.GATSBY_SQUEAK_API_HOST}/api/generate/status/${jobId}`,
                    {
                        headers: { Authorization: `Bearer ${jwt}` },
                        signal,
                    }
                )

                if (!statusResponse.ok) {
                    throw new Error(`Failed to check job status (${statusResponse.status})`)
                }

                const statusData = await statusResponse.json()

                switch (statusData.status) {
                    case 'completed':
                        return statusData.result?.images?.[0] || null
                    case 'failed':
                        throw new Error(statusData.error || 'Image generation failed')
                    case 'processing':
                        setJobStatus('processing')
                        break
                    case 'pending':
                        setJobStatus('pending')
                        break
                }

                await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS))
            }
            return null
        },
        []
    )

    const generateImage = async (promptText: string) => {
        abortControllerRef.current?.abort()
        const abortController = new AbortController()
        abortControllerRef.current = abortController

        setLoading(true)
        setJobStatus('pending')
        setError(null)
        setImage(null)

        try {
            const jwt = await getJwt()
            if (!jwt) {
                throw new Error('You must be logged in to generate images')
            }

            const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/generate/image`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify({ prompt: `generate a hedgehog that ${promptText}` }),
                signal: abortController.signal,
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData?.error?.message || `Failed to generate image (${response.status})`)
            }

            const data = await response.json()
            const { jobId } = data

            if (!jobId) {
                throw new Error('No job ID returned from server')
            }

            const generatedImage = await pollJobStatus(jobId, jwt, abortController.signal)
            if (generatedImage) {
                setImage(generatedImage)
                onGenerated?.()
            }
        } catch (err) {
            if (err instanceof Error && err.name === 'AbortError') {
                return
            }
            setError(err instanceof Error ? err.message : 'Failed to generate image')
        } finally {
            if (!abortController.signal.aborted) {
                setLoading(false)
                setJobStatus(null)
            }
        }
    }

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort()
        }
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!prompt.trim() || loading) return
        generateImage(prompt)
    }

    const handleRegenerate = () => {
        if (!prompt.trim() || loading) return
        generateImage(prompt)
    }

    return isModerator ? (
        <div data-scheme="primary" className="bg-primary text-primary size-full">
            <ScrollArea className="w-full" viewportClasses="bg-primary">
                <SEO title="Hedgehog generator" />
                <div className="p-6 mx-auto">
                    {isRateLimited && !image ? (
                        <div className="flex flex-col items-center justify-center py-4 text-center">
                            <div className="relative size-[100px] mb-4">
                                <ProgressRing progress={progress} size={100} strokeWidth={6} />
                                <div className="absolute inset-0 flex items-center justify-center p-3">
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1724378609/hogs/sleeping.png"
                                        alt="Sleeping hedgehog"
                                        className="w-full h-full object-contain animate-breathe"
                                    />
                                </div>
                                <FloatingZs />
                            </div>
                            <h3 className="text-primary font-bold mb-1 text-lg">The hedgehogs are resting</h3>
                            <p className="text-secondary text-sm m-0">
                                Try again in{' '}
                                <span className="font-mono font-semibold text-primary">{formattedTime}</span>
                            </p>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-lg font-semibold mb-4 leading-none">Generate a hedgehog that...</h2>
                            <form onSubmit={handleSubmit} className="relative">
                                <OSInput
                                    size="md"
                                    direction="column"
                                    placeholder="Type a prompt..."
                                    showLabel={false}
                                    label="Prompt"
                                    value={prompt}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
                                    className="pr-12 disabled:cursor-not-allowed disabled:opacity-60"
                                    disabled={loading || isRateLimited}
                                />
                                <button
                                    type="submit"
                                    disabled={loading || !prompt.trim() || isRateLimited}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary disabled:hover:text-primary/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                    aria-label="Submit"
                                >
                                    <IconArrowRightDown className="size-5 rotate-90" />
                                </button>
                            </form>
                            {isRateLimited && (
                                <p className="mt-2 text-sm m-0 p-2 bg-yellow/15 border border-yellow/60 rounded">
                                    Limit reached. Try again in{' '}
                                    <span className="font-mono font-bold">{formattedTime}</span>
                                </p>
                            )}
                        </>
                    )}

                    {error && <p className="mt-3 text-sm text-red dark:text-yellow">{error}</p>}

                    {(image || loading) && (
                        <div className="mt-4">
                            {image && !loading && (
                                <div className="flex items-center justify-between mb-2 text-primary">
                                    <p className="text-sm m-0">Click the image to save it.</p>
                                    <p className="m-0 flex items-center gap-1 text-sm">
                                        <span className="text-primary/60">Don't like this result?</span>
                                        <button
                                            type="button"
                                            onClick={handleRegenerate}
                                            disabled={!prompt.trim() || isRateLimited}
                                            className="underline disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            Regenerate
                                        </button>
                                    </p>
                                </div>
                            )}

                            <div className="">
                                {loading ? (
                                    <GeneratingLoader jobStatus={jobStatus} />
                                ) : (
                                    image && <ImageResult key={image.uid} image={image} />
                                )}
                            </div>
                        </div>
                    )}

                    {!image && !loading && !isRateLimited && (
                        <p className="m-0 mt-3 text-secondary text-sm">
                            Example: is holding a phone while sitting on a toilet pondering something
                        </p>
                    )}

                    {user?.imageGenerationRateLimit?.monthlyCount !== undefined && (
                        <p className="m-0 mt-4 pt-4 border-t border-primary text-secondary text-xs">
                            {user.imageGenerationRateLimit.monthlyCount} image
                            {user.imageGenerationRateLimit.monthlyCount === 1 ? '' : 's'} generated this month
                        </p>
                    )}
                </div>
            </ScrollArea>
        </div>
    ) : null
}
