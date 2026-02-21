import { useUser } from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import ScrollArea from 'components/RadixUI/ScrollArea'
import SEO from 'components/seo'
import { IconArrowRightDown, IconCheck } from '@posthog/icons'
import { useToast } from '../../context/Toast'
import { OSInput } from 'components/OSForm'

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

const USE_DUMMY_DATA = true

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

export default function HedgehogGenerator() {
    const { isModerator, getJwt } = useUser()
    const [prompt, setPrompt] = useState('')
    const [image, setImage] = useState<GeneratedImage | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

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
            setImage(data.image || null)
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
                    <h2 className="text-lg font-semibold mb-3">Generate a hedgehog that...</h2>
                    <form onSubmit={handleSubmit} className="relative">
                        <OSInput
                            size="md"
                            direction="column"
                            placeholder="Type a prompt..."
                            showLabel={false}
                            label="Prompt"
                            value={prompt}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
                            className="pr-12"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !prompt.trim()}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary disabled:hover:text-primary/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Submit"
                        >
                            <IconArrowRightDown className="size-5 rotate-90" />
                        </button>
                    </form>

                    {error && <p className="mt-3 text-sm text-red dark:text-yellow">{error}</p>}

                    {(image || loading) && (
                        <div className="mt-4">
                            {image && !loading && (
                                <div className="flex items-center justify-between mb-3 text-primary">
                                    <p className="text-sm m-0">Click the image to save it.</p>
                                    <p className="m-0 flex items-center gap-1 text-sm">
                                        <span className="text-primary/60">Don't like this result?</span>
                                        <button
                                            type="button"
                                            onClick={handleRegenerate}
                                            disabled={!prompt.trim()}
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

                    {!image && !loading && (
                        <p className="m-0 mt-3 text-secondary text-sm">
                            Example: is holding a phone while sitting on a toilet pondering something
                        </p>
                    )}
                </div>
            </ScrollArea>
        </div>
    ) : null
}
