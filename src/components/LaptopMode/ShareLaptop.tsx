import React, { useEffect, useRef, useState } from 'react'
import { Dialog } from 'radix-ui'
import { IconX } from '@posthog/icons'
import OSButton from 'components/OSButton'

export default function ShareLaptop({ profileId }: { profileId: number }): JSX.Element {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState('')
    const [url, setUrl] = useState('')
    const [error, setError] = useState('')
    const [status, setStatus] = useState('')
    const [attempt, setAttempt] = useState(0)
    const trigger = useRef<HTMLElement | null>(null)

    useEffect(() => {
        if (!open) return
        const controller = new AbortController()
        let objectURL = ''
        const theme = document.body.classList.contains('dark') ? 'dark' : 'light'
        setUrl(`${window.location.origin}/community/laptops/${profileId}?theme=${theme}`)
        setFile(null)
        setPreview('')
        setError('')
        setStatus('')
        void fetch(`/api/laptop-share?profileId=${profileId}&format=png&theme=${theme}&v=${Date.now()}`, {
            signal: controller.signal,
        })
            .then(async (response) => {
                if (!response.ok || !response.headers.get('content-type')?.includes('image/png')) {
                    throw new Error('Could not prepare the image. Please try again.')
                }
                const blob = await response.blob()
                if (controller.signal.aborted) return
                const image = new File([blob], `posthog-laptop-${profileId}.png`, { type: 'image/png' })
                objectURL = URL.createObjectURL(image)
                setFile(image)
                setPreview(objectURL)
            })
            .catch((error) => {
                if (!controller.signal.aborted) setError(error.message)
            })
        return () => {
            controller.abort()
            if (objectURL) URL.revokeObjectURL(objectURL)
        }
    }, [open, profileId, attempt])

    const shareImage = async () => {
        if (!file) return
        try {
            await navigator.share({ files: [file], title: 'PostHog laptop' })
        } catch (error) {
            if (error instanceof Error && error.name !== 'AbortError') {
                setError('Could not open sharing. You can download the PNG instead.')
            }
        }
    }
    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setStatus('Link copied')
        } catch {
            setStatus('Select the link below to copy it.')
        }
    }
    const canShareImage =
        file &&
        typeof navigator !== 'undefined' &&
        typeof navigator.share === 'function' &&
        navigator.canShare?.({ files: [file] })

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <OSButton
                size="md"
                variant="secondary"
                aria-haspopup="dialog"
                aria-expanded={open}
                onClick={(event) => {
                    trigger.current = event.currentTarget
                    setOpen(true)
                }}
            >
                Share laptop
            </OSButton>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 z-[2147483646]" />
                <Dialog.Content
                    data-scheme="primary"
                    onCloseAutoFocus={(event) => {
                        event.preventDefault()
                        trigger.current?.focus()
                    }}
                    className="fixed z-[2147483647] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-xl max-h-[90dvh] overflow-y-auto bg-primary text-primary border border-primary rounded p-5 shadow-xl"
                >
                    <Dialog.Title className="text-lg mb-1 pr-8">Share laptop</Dialog.Title>
                    <Dialog.Description className="text-sm text-secondary mb-4">
                        Share an image or send a link with a laptop preview.
                    </Dialog.Description>
                    <Dialog.Close asChild>
                        <button type="button" aria-label="Close sharing" className="absolute right-3 top-3 p-1">
                            <IconX className="size-5" />
                        </button>
                    </Dialog.Close>
                    <div className="aspect-[1200/630] flex items-center justify-center bg-accent rounded overflow-hidden mb-4">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Laptop image ready to share"
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <p role="status" className="text-sm text-secondary m-0">
                                {error ? 'Image unavailable' : 'Preparing laptop image…'}
                            </p>
                        )}
                    </div>
                    {error && (
                        <p role="alert" className="text-sm">
                            {error}{' '}
                            {!file && (
                                <button
                                    type="button"
                                    className="underline"
                                    onClick={() => setAttempt((value) => value + 1)}
                                >
                                    Try again
                                </button>
                            )}
                        </p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {canShareImage && (
                            <OSButton size="md" variant="primary" onClick={shareImage}>
                                Share image
                            </OSButton>
                        )}
                        <OSButton
                            size="md"
                            variant="secondary"
                            disabled={!file}
                            onClick={() => {
                                if (!preview || !file) return
                                const link = document.createElement('a')
                                link.href = preview
                                link.download = file.name
                                document.body.appendChild(link)
                                link.click()
                                link.remove()
                            }}
                        >
                            Download PNG
                        </OSButton>
                        <OSButton size="md" variant="secondary" disabled={!url} onClick={copyLink}>
                            Copy link
                        </OSButton>
                    </div>
                    <label className="block text-xs font-semibold mb-1" htmlFor={`laptop-share-${profileId}`}>
                        Share link
                    </label>
                    <input
                        id={`laptop-share-${profileId}`}
                        className="w-full text-sm bg-accent border border-primary rounded px-2 py-1"
                        value={url}
                        readOnly
                        onFocus={(event) => event.currentTarget.select()}
                    />
                    <p role="status" className="text-xs text-secondary mt-2 mb-0 min-h-[1rem]">
                        {status}
                    </p>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
