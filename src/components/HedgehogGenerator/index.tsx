import { useUser } from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import ScrollArea from 'components/RadixUI/ScrollArea'
import SEO from 'components/seo'
import { IconArrowRightDown, IconCheck } from '@posthog/icons'
import { useToast } from '../../context/Toast'
import { OSInput } from 'components/OSForm'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

interface GeneratedImage {
    uid: string
    url: string
    status: string
}

const DUMMY_IMAGE: GeneratedImage = {
    uid: '114cf27f-3fdf-4bd0-bf61-36a238696ca0',
    url: 'https://image.exactly.ai/generations/114cf27f-3fdf-4bd0-bf61-36a238696ca0.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRoIjoiL2dlbmVyYXRpb25zLzExNGNmMjdmLTNmZGYtNGJkMC1iZjYxLTM2YTIzODY5NmNhMC5qcGciLCJleHAiOjE3NzE3MDE2MjYsImlhdCI6MTc3MTY5ODAyNn0.JkupNRXsQYjGFSsHW-2MT2CtciOkR0487smszbVnlac',
    status: 'completed',
}

const USE_DUMMY_DATA = false

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

function useRateLimitCountdown(resetTime: string | null, rateLimitDurationMs = 60 * 60 * 1000) {
    const [timeRemaining, setTimeRemaining] = useState<string | null>(null)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (!resetTime) {
            setTimeRemaining(null)
            setProgress(0)
            return
        }

        const updateCountdown = () => {
            const now = dayjs()
            const reset = dayjs(resetTime)
            const diff = reset.diff(now)

            if (diff <= 0) {
                setTimeRemaining(null)
                setProgress(100)
                return false
            }

            const elapsed = rateLimitDurationMs - diff
            setProgress(Math.min(100, Math.max(0, (elapsed / rateLimitDurationMs) * 100)))

            const dur = dayjs.duration(diff)
            const hours = Math.floor(dur.asHours())
            const minutes = dur.minutes()
            const seconds = dur.seconds()

            if (hours > 0) {
                setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
            } else if (minutes > 0) {
                setTimeRemaining(`${minutes}m ${seconds}s`)
            } else {
                setTimeRemaining(`${seconds}s`)
            }
            return true
        }

        if (!updateCountdown()) return

        const interval = setInterval(() => {
            if (!updateCountdown()) {
                clearInterval(interval)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [resetTime, rateLimitDurationMs])

    return { timeRemaining, progress }
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

function ProgressRing({
    progress,
    size = 120,
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

export default function HedgehogGenerator() {
    const { isModerator, getJwt, user, fetchUser } = useUser()
    const [prompt, setPrompt] = useState('')
    const [image, setImage] = useState<GeneratedImage | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const rateLimit = user?.imageGenerationRateLimit
    const isRateLimited = rateLimit?.remaining === 0 && !!rateLimit?.resetTime
    const { timeRemaining, progress } = useRateLimitCountdown(
        isRateLimited ? rateLimit.resetTime : null,
        rateLimit?.windowMs
    )

    const generateImage = async (promptText: string) => {
        setLoading(true)
        setError(null)
        setImage(null)

        try {
            if (USE_DUMMY_DATA) {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                setImage(DUMMY_IMAGE)
                return
            }

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
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData?.error?.message || `Failed to generate image (${response.status})`)
            }

            const data = await response.json()
            setImage(data.images?.[0] || null)
            fetchUser()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate image')
        } finally {
            setLoading(false)
        }
    }

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
                    {isRateLimited && timeRemaining && !image ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                            <div className="relative size-[100px] mb-4">
                                <ProgressRing progress={progress} size={100} strokeWidth={5} />
                                <div className="absolute inset-0 flex items-center justify-center p-3">
                                    <img
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1724378609/hogs/sleeping.png"
                                        alt="Sleeping hedgehog"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <FloatingZs />
                            </div>
                            <p className="text-primary font-semibold mb-0.5 text-lg">The hedgehogs are resting</p>
                            <p className="text-secondary text-sm mb-4">You've reached your limit for now</p>
                            <div className="inline-flex items-baseline gap-1.5">
                                <span className="text-sm text-secondary">Try again in</span>
                                <span className="font-mono font-semibold text-xl text-primary">{timeRemaining}</span>
                            </div>
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
                            {isRateLimited && timeRemaining && (
                                <p className="mt-2 text-sm m-0 p-2 bg-yellow/15 border border-yellow/60 rounded">
                                    Limit reached. Try again in{' '}
                                    <span className="font-mono font-bold">{timeRemaining}</span>
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
                                    <div className="aspect-square border-2 border-primary/20 rounded flex items-center justify-center bg-primary/5 animate-pulse">
                                        <div className="text-primary/30">Generating...</div>
                                    </div>
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
                </div>
            </ScrollArea>
        </div>
    ) : null
}
