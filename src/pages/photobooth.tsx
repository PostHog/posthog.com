import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import Layout from 'components/Layout'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { useInView } from 'react-intersection-observer'
import { toJpeg } from 'html-to-image'
import { IconDownload } from '@posthog/icons'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import Explorer from 'components/Explorer'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { AppIcon } from 'components/OSIcons'
import { useWindow } from '../context/Window'

const numImages = 4
const initialCount = 3

const BasicOverlay = ({ src, className = '' }: { src: any; className?: string }) => {
    return <CloudinaryImage src={src} className={`absolute inset-0 size-full ${className}`} imgClassName="size-full" />
}

const BasicPreview = ({ src, className = '' }: { src: any; className?: string }) => {
    return (
        <CloudinaryImage
            src={src}
            className={`absolute inset-0 size-full pointer-events-none ${className}`}
            imgClassName="size-full object-contain"
        />
    )
}

const cardTypes = [
    {
        logo: 'https://res.cloudinary.com/dmukukwp6/image/upload/Logo_9de16e50ae.png',
        className: 'bg-accent text-primary',
    },
    {
        logo: 'https://res.cloudinary.com/dmukukwp6/image/upload/Logo_1_dd78611ddb.png',
        className: 'bg-[#EC1111] text-white',
    },
    {
        logo: 'https://res.cloudinary.com/dmukukwp6/image/upload/Logo_1_dd78611ddb.png',
        className: 'bg-dark text-white',
    },
]

const cardImages = {
    love: 'https://res.cloudinary.com/dmukukwp6/image/upload/Untitled_Artwork_821_077d3abca8.png',
    love2: 'https://res.cloudinary.com/dmukukwp6/image/upload/Untitled_Artwork_821_077d3abca8.png',
    vince: 'https://res.cloudinary.com/dmukukwp6/image/upload/Untitled_Artwork_811_fc96a8e723.png',
    clipart: 'https://res.cloudinary.com/dmukukwp6/image/upload/Untitled_Artwork_821_077d3abca8.png',
}

const templates: Record<string, Overlay[]> = {
    love: [
        {
            previewComponent: (
                <BasicPreview src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_13_01edf38d9a.png" />
            ),
            stripComponent: (
                <BasicOverlay src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_13_01edf38d9a.png" />
            ),
        },
        {
            previewComponent: (
                <BasicPreview src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_11_23c7f086da.png" />
            ),
            stripComponent: (
                <BasicOverlay src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_11_23c7f086da.png" />
            ),
        },
        {
            previewComponent: (
                <BasicPreview src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_14_ab070af9e7.png" />
            ),
            stripComponent: (
                <BasicOverlay src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_14_ab070af9e7.png" />
            ),
        },
        {
            previewComponent: (
                <BasicPreview src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_12_1c1178e761.png" />
            ),
            stripComponent: (
                <BasicOverlay src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_12_1c1178e761.png" />
            ),
        },
    ],
    love2: [
        {
            stripComponent: (
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/Group_12_65315f7c08.png"
                    className="absolute inset-0 size-full"
                    imgClassName="absolute -bottom-2 w-full"
                />
            ),
        },
        {
            stripComponent: (
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/Group_17_6d2499a7d1.png"
                    className="absolute inset-0 size-full"
                    imgClassName="absolute top-0 right-0 -translate-x-[20%] translate-y-[40%] w-1/2"
                />
            ),
        },
        {
            stripComponent: (
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/Group_16_e28a6a688c.png"
                    className="absolute inset-0 size-full z-10"
                    imgClassName="absolute bottom-0 translate-y-1/2 w-full"
                />
            ),
        },
        {
            stripComponent: (
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/Group_15_33efd70659.png"
                    className="absolute inset-0 size-full z-10"
                    imgClassName="absolute -bottom-2 -right-2 w-1/2"
                />
            ),
        },
    ],
    vince: [
        {
            previewComponent: (
                <BasicPreview src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_13_69ad22caa6.png" />
            ),
            stripComponent: (
                <BasicOverlay src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_13_69ad22caa6.png" />
            ),
        },
        {
            previewComponent: (
                <BasicPreview src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_11_261551b354.png" />
            ),
            stripComponent: (
                <BasicOverlay src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_11_261551b354.png" />
            ),
        },
        {
            previewComponent: (
                <BasicPreview src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_12_2a1882e191.png" />
            ),
            stripComponent: (
                <BasicOverlay src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_12_2a1882e191.png" />
            ),
        },
        {
            previewComponent: (
                <BasicPreview
                    className="bg-[#FF0000]/30"
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_14_74e168672c.png"
                />
            ),
            stripComponent: (
                <BasicOverlay
                    className="bg-[#FF0000]/30"
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_14_74e168672c.png"
                />
            ),
        },
    ],
    clipart: [
        {
            previewComponent: (
                <BasicPreview src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_13_1_ef16644fc4.png" />
            ),
            stripComponent: (
                <BasicOverlay src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_13_1_ef16644fc4.png" />
            ),
        },
        {
            previewComponent: (
                <BasicPreview src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_12_0870369297.png" />
            ),
            stripComponent: (
                <BasicOverlay src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_12_0870369297.png" />
            ),
        },
        {
            previewComponent: (
                <BasicPreview src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_11_b69f777fc2.png" />
            ),
            stripComponent: (
                <BasicOverlay src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_11_b69f777fc2.png" />
            ),
        },
        {
            previewComponent: (
                <BasicPreview src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_14_ce48756999.png" />
            ),
            stripComponent: (
                <BasicOverlay src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_14_ce48756999.png" />
            ),
        },
    ],
}

type Overlay = {
    previewComponent?: React.ReactNode
    stripComponent?: React.ReactNode
}

interface PhotoBoothImage {
    src?: string
    overlay: Overlay
}

const Camera = ({
    onCapture,
    overlay,
    onUserReady,
    onWebcamReady,
    onNameChange,
    onVideoRef,
    startImmediately = false,
}: {
    onCapture: (image: PhotoBoothImage) => void
    overlay?: Overlay
    onUserReady: () => void
    onWebcamReady: () => void
    onNameChange: (name: string) => void
    onVideoRef?: (ref: HTMLVideoElement) => void
    startImmediately?: boolean
}) => {
    const [name, setName] = useState<string>()
    const webcamRef = React.useRef<Webcam>(null)
    const [count, setCount] = useState(initialCount)
    const [ready, setReady] = useState(false)
    const [permissionError, setPermissionError] = useState<string>()

    const startCountdown = () => {
        const interval = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount <= 1) {
                    clearInterval(interval)
                }
                return prevCount - 1
            })
        }, 1000)
    }

    const checkCameraPermission = async () => {
        try {
            // Try with minimal constraints for better Android compatibility
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' },
                audio: false,
            })
            // Stop the stream immediately as we're just checking permission
            stream.getTracks().forEach((track) => track.stop())
            setPermissionError(undefined)
            return true
        } catch (err) {
            if (err instanceof Error) {
                let errorMessage = 'Unable to access camera. Please make sure your camera is connected and try again.'

                if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                    errorMessage =
                        'Camera access was denied. Please enable camera permissions in your browser settings and try again.'
                } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                    errorMessage = 'No camera found. Please connect a camera and try again.'
                } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
                    errorMessage =
                        'Camera is already in use by another application. Please close other apps using the camera and try again.'
                } else if (err.name === 'OverconstrainedError' || err.name === 'ConstraintNotSatisfiedError') {
                    errorMessage = 'Camera does not support required settings. Please try a different camera.'
                }

                setPermissionError(errorMessage)
            }
            return false
        }
    }

    useEffect(() => {
        checkCameraPermission()
    }, [])

    useEffect(() => {
        if (startImmediately) {
            handleReady()
        }
    }, [startImmediately])

    const onUserMedia = (stream: MediaStream) => {
        onWebcamReady()
        const video = webcamRef.current?.video
        if (video && onVideoRef) {
            onVideoRef(video)
        }
    }

    const onUserMediaError = (err: string | DOMException) => {
        if (err instanceof DOMException) {
            setPermissionError(
                err.name === 'NotAllowedError'
                    ? 'Camera access was denied. Please enable camera access to use the photobooth.'
                    : 'Unable to access camera. Please make sure your camera is connected and try again.'
            )
        }
    }

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot()
        if (imageSrc && overlay) {
            onCapture({ src: imageSrc, overlay })
        }
    }, [webcamRef, overlay])

    const handleReady = () => {
        onUserReady()
        setReady(true)
    }

    useEffect(() => {
        if (count === 0) {
            setTimeout(() => {
                capture()
            }, 500)
        }
    }, [count])

    useEffect(() => {
        if (ready && overlay) {
            setCount(initialCount)
            startCountdown()
        }
    }, [overlay, ready])

    return (
        <div className="relative bg-black size-full flex items-center justify-center transition-opacity">
            {permissionError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white p-8 text-center">
                    <p className="text-xl mb-4">{permissionError}</p>
                    <CallToAction
                        onClick={async () => {
                            const success = await checkCameraPermission()
                            if (success) {
                                setPermissionError(undefined)
                            }
                        }}
                        type="outline"
                        size="absurd"
                    >
                        <span>Try Again</span>
                    </CallToAction>
                </div>
            ) : (
                <>
                    {ready && count > 0 && (
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[50vh] font-bold z-50 opacity-50">
                            {count}
                        </div>
                    )}
                    <div className="relative w-full h-full overflow-hidden">
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            mirrored
                            forceScreenshotSourceSize
                            screenshotQuality={1}
                            imageSmoothing={false}
                            videoConstraints={{
                                facingMode: 'user',
                            }}
                            className="absolute h-full w-full object-cover [transform:scale(1.8)]"
                            onUserMedia={onUserMedia}
                            onUserMediaError={onUserMediaError}
                        />
                        {overlay?.previewComponent && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                {overlay.previewComponent}
                            </div>
                        )}
                        {count <= 0 && (
                            <div className="absolute size-full bg-white inset-0 opacity-0 animate-fade animate-duration-700" />
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

const PhotoStrip = ({
    images,
    onRetake,
    retaking,
    animate = true,
    videoRef,
    showLivePreview = false,
}: {
    images: PhotoBoothImage[]
    onRetake?: (index: number) => void
    retaking?: number
    animate?: boolean
    videoRef?: HTMLVideoElement
    showLivePreview?: boolean
}) => {
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

    useEffect(() => {
        if (showLivePreview && videoRef) {
            videoRefs.current.forEach((el) => {
                if (el && videoRef.srcObject) {
                    el.srcObject = videoRef.srcObject
                    el.play().catch(console.error)
                }
            })
        }
    }, [videoRef, showLivePreview])

    return (
        <div className="grid grid-rows-4 gap-2 bg-white p-2 h-full rounded shadow-xl w-[170px]">
            {Array.from({ length: numImages }).map((_, index) => {
                const image = images[index]
                return (
                    <div key={index} className="relative aspect-[3/4] w-full bg-accent">
                        {showLivePreview && (
                            <video
                                ref={(el) => (videoRefs.current[index] = el)}
                                className="absolute inset-0 size-full object-cover [transform:scaleX(-1)]"
                                autoPlay
                                playsInline
                                muted
                            />
                        )}
                        {retaking !== index && image?.src && (
                            <img
                                src={image.src}
                                alt="Photobooth"
                                className={`size-full absolute object-cover inset-0 ${
                                    animate ? 'opacity-0 animate-develop duration-1000 animate-delay-1000' : ''
                                }`}
                            />
                        )}
                        {image?.overlay?.stripComponent && (
                            <div className="absolute inset-0">{image.overlay.stripComponent}</div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

const VerticalPhotoStrip = ({
    images,
    template,
    onRetake,
    onSelect,
    disabled,
    active,
    retaking,
    videoRef,
    showLivePreview,
}: {
    images: PhotoBoothImage[]
    template: string
    onRetake?: (index: number) => void
    onSelect: (template: string) => void
    disabled: boolean
    active: boolean
    retaking?: number
    videoRef?: HTMLVideoElement
    showLivePreview?: boolean
}) => {
    const [ref, inView] = useInView({ threshold: 1 })
    const overlays = templates[template]
    const templateIndex = Object.keys(templates).indexOf(template) + 1
    const totalTemplates = Object.keys(templates).length

    useEffect(() => {
        if (inView) {
            onSelect(template)
        }
    }, [inView])

    return (
        <div
            ref={ref}
            className={`h-[70vh] snap-center flex-grow border-2 relative ${disabled && !active ? 'opacity-50' : ''} ${
                active ? 'border-green' : 'border-transparent'
            } transition-all rounded-md`}
        >
            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm z-10">
                {templateIndex} of {totalTemplates}
            </div>
            <div className="shrink">
                <PhotoStrip
                    images={images.map((image, index) => ({
                        src: active ? image.src : undefined,
                        overlay: overlays[index],
                    }))}
                    onRetake={onRetake}
                    retaking={retaking}
                    videoRef={videoRef}
                    showLivePreview={showLivePreview}
                />
            </div>
        </div>
    )
}

const TemplateSelector = ({
    onSelect,
    videoRef,
}: {
    onSelect: (template: string) => void
    videoRef?: HTMLVideoElement
}) => {
    return (
        <div className="flex justify-center items-stretch gap-4 @3xl:gap-8 p-4 max-w-7xl mx-auto">
            {Object.keys(templates).map((key) => (
                <button
                    key={key}
                    onClick={() => onSelect(key)}
                    className="hover:scale-105 transition-transform cursor-pointer"
                >
                    <PhotoStrip
                        images={templates[key].map((overlay) => ({ overlay }))}
                        videoRef={videoRef}
                        showLivePreview={true}
                    />
                </button>
            ))}
        </div>
    )
}

const NameInput = ({ onSubmit, onBack }: { onSubmit: (name: string) => void; onBack: () => void }) => {
    const [name, setName] = useState('')

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (name.trim()) {
            onSubmit(name.trim())
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && name.trim()) {
            handleSubmit()
        }
    }

    return (
        <div className="flex flex-col items-center justify-center py-4">
            <h2 className="text-xl mb-4">What's your name?</h2>
            <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="bg-white dark:bg-accent-dark rounded border border-primary outline-none focus:ring-0 text-center w-full"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
                <div className="flex gap-4">
                    <CallToAction onClick={onBack} type="outline">
                        <span>Back</span>
                    </CallToAction>
                    <CallToAction disabled={!name.trim()} type="primary" onClick={() => handleSubmit()}>
                        <span>Let's take some photos</span>
                    </CallToAction>
                </div>
            </form>
        </div>
    )
}

const PhotoModal = ({
    template: initialTemplate,
    onDone,
    onSelectTemplate,
    onNameChange,
}: {
    template: string
    onDone: (images: PhotoBoothImage[]) => void
    onSelectTemplate: (template: string) => void
    onNameChange: (name: string) => void
}) => {
    const { appWindow } = useWindow()
    const [step, setStep] = useState<'select' | 'name' | 'capture'>('select')
    const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof templates>(initialTemplate)
    const [capturing, setCapturing] = useState(false)
    const [overlayIndex, setOverlayIndex] = useState<number>()
    const [overlay, setOverlay] = useState<Overlay>()
    const [retaking, setRetaking] = useState<number>()
    const [cameraPermission, setCameraPermission] = useState<boolean>()
    const [videoRef, setVideoRef] = useState<HTMLVideoElement>()
    const [images, setImages] = useState<PhotoBoothImage[]>([])
    const [cameraReady, setCameraReady] = useState(false)

    useEffect(() => {
        setImages(templates[selectedTemplate].map((overlay) => ({ overlay })))
    }, [selectedTemplate])

    const checkCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            // Stop the stream immediately as we're just checking permission
            stream.getTracks().forEach((track) => track.stop())
            setCameraPermission(true)
            return true
        } catch (err) {
            setCameraPermission(false)
            return false
        }
    }

    useEffect(() => {
        checkCameraPermission()
    }, [])

    const handleCapture = async (image: PhotoBoothImage) => {
        const newImages = [...images]
        const retaking = overlayIndex !== undefined && !!newImages[overlayIndex]?.src
        newImages[overlayIndex] = image
        setImages(newImages)
        const nextIndex = overlayIndex !== undefined ? overlayIndex + 1 : 0

        if (retaking || nextIndex >= templates[selectedTemplate].length) {
            setOverlayIndex(undefined)
            setOverlay(undefined)
            setRetaking(undefined)
            if (!retaking) {
                setTimeout(() => {
                    onDone(newImages)
                }, 2500)
            }
        } else {
            setOverlayIndex(nextIndex)
        }
    }

    const handleWebcamReady = () => {
        setOverlayIndex(0)
    }

    const handleRetake = (index: number) => {
        setRetaking(index)
        setOverlayIndex(index)
    }

    useEffect(() => {
        if (overlayIndex !== undefined && templates[selectedTemplate][overlayIndex]) {
            setOverlay(templates[selectedTemplate][overlayIndex])
        }
    }, [overlayIndex])

    useEffect(() => {
        if (selectedTemplate) {
            setOverlayIndex(0)
            setOverlay(templates[selectedTemplate][0])
        }
    }, [selectedTemplate])

    const handleTemplateSelect = (template: string) => {
        setSelectedTemplate(template as keyof typeof templates)
        onSelectTemplate(template)
        setStep('name')
    }

    const startCountdown = () => {
        setOverlayIndex(0)
        setOverlay(templates[selectedTemplate][0])
        setCapturing(true)
    }

    const handleNameSubmit = (name: string) => {
        onNameChange(name)
        setStep('capture')
        startCountdown()
    }

    const handleVideoRef = (ref: HTMLVideoElement) => {
        setVideoRef(ref)
        setCameraReady(true)
    }

    const handleHiddenCameraCapture = () => {
        // This camera is only used for preview, so we ignore capture events
        setCameraReady(true)
    }

    const handleHiddenCameraReady = () => {
        // When the hidden camera is ready, we can show the template selector
        setCameraReady(true)
    }

    return (
        <motion.div
            className="not-prose flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {cameraPermission === false ? (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="text-center bg-accent p-4 rounded border border-primary max-w-xl"
                >
                    <h2 className="text-2xl font-bold mb-4">Camera access required</h2>
                    <p className="mb-6">Please enable camera access to use the photobooth.</p>
                    <CallToAction
                        onClick={async () => {
                            const success = await checkCameraPermission()
                            if (success) {
                                setCameraPermission(true)
                            }
                        }}
                        type="outline"
                    >
                        <span>Try again</span>
                    </CallToAction>
                </div>
            ) : cameraPermission === true ? (
                <div onClick={(e) => e.stopPropagation()} className="w-full">
                    {step === 'select' && (
                        <>
                            <div className="hidden">
                                <Camera
                                    onWebcamReady={handleWebcamReady}
                                    onUserReady={handleHiddenCameraReady}
                                    onCapture={handleHiddenCameraCapture}
                                    onVideoRef={handleVideoRef}
                                />
                            </div>
                            {cameraReady && <TemplateSelector onSelect={handleTemplateSelect} videoRef={videoRef} />}
                        </>
                    )}

                    {step === 'name' && <NameInput onSubmit={handleNameSubmit} onBack={() => setStep('select')} />}

                    {step === 'capture' && (
                        <div
                            style={{ maxWidth: (appWindow?.size?.width || 0) / 2 }}
                            className="flex gap-8 items-center justify-center h-full w-full mx-auto px-4"
                        >
                            <div className="aspect-[3/4] w-[645px] flex-1">
                                <Camera
                                    onWebcamReady={handleWebcamReady}
                                    onUserReady={() => setCapturing(true)}
                                    onCapture={handleCapture}
                                    overlay={overlay}
                                    onVideoRef={setVideoRef}
                                    onNameChange={onNameChange}
                                    startImmediately={true}
                                />
                            </div>
                            <PhotoStrip
                                images={images}
                                onRetake={handleRetake}
                                retaking={retaking}
                                videoRef={videoRef}
                                showLivePreview={!capturing}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-accent pt-4 px-8 rounded border border-primary max-w-xl flex flex-col items-center">
                    <h3 className="text-xl font-bold mt-2 mb-0">Is this thing on?!</h3>
                    <p className="text-[15px]">Please enable camera access to continue.</p>

                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/binoculars_de6c3b3595.png"
                        className="-mb-1.5"
                        imgClassName="max-h-44 w-auto"
                    />
                </div>
            )}
        </motion.div>
    )
}

const FinalPhotoStrip = ({
    images,
    dataURL,
    onImageReady,
}: {
    images: PhotoBoothImage[]
    dataURL?: string
    onImageReady: (dataURL: string) => void
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [downloading, setDownloading] = useState(false)

    const handleDownload = async () => {
        setDownloading(true)
        const dataURL = await toJpeg(ref.current, {
            quality: 1,
            backgroundColor: 'white',
        })
        const link = document.createElement('a')
        link.download = `posthog_photobooth.jpeg`
        link.href = dataURL
        link.click()
        link.remove()
        setDownloading(false)
    }
    return (
        <div className="relative">
            <button
                disabled={downloading}
                onClick={handleDownload}
                className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-1.5 shadow-lg hover:scale-[1.1] transition-transform active:scale-100 text-primary"
            >
                <IconDownload className="size-5" />
            </button>
            <div ref={ref}>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50,
                        rotate: -10,
                        scale: 0.9,
                    }}
                    onAnimationComplete={() => {
                        toJpeg(ref.current, {
                            quality: 1,
                            backgroundColor: 'white',
                        }).then((dataURL) => {
                            onImageReady(dataURL)
                        })
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        transition: {
                            type: 'spring',
                            duration: 0.7,
                            delay: 0.2,
                            y: {
                                type: 'spring',
                                stiffness: 300,
                                damping: 15,
                            },
                        },
                    }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                >
                    <PhotoStrip animate={false} images={images} />
                </motion.div>
            </div>
        </div>
    )
}

const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = reject
        img.src = src
    })
}

const Card = ({
    stripDataURL,
    template,
    logo,
    className,
    name,
    index,
}: {
    stripDataURL: string
    template: string
    logo: string
    className: string
    name: string
    index: number
}) => {
    const [downloading, setDownloading] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    const handleDownload = async () => {
        setDownloading(true)
        const dataURL = await toJpeg(cardRef.current, {
            quality: 1,
            backgroundColor: 'white',
        })
        const link = document.createElement('a')
        link.download = `${name}.jpeg`
        link.href = dataURL
        link.click()
        link.remove()
        setDownloading(false)
    }

    return (
        <motion.div
            className="relative"
            initial={{
                opacity: 0,
                x: -20,
                scale: 0.95,
                rotate: -2,
            }}
            animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                rotate: 0,
                transition: {
                    type: 'spring',
                    bounce: 0.2,
                    duration: 0.4,
                    delay: index * 0.1,
                },
            }}
        >
            <button
                disabled={downloading}
                onClick={handleDownload}
                className={`absolute -top-3 -right-3 z-10 bg-white rounded-full p-1.5 shadow-lg hover:scale-[1.1] transition-transform active:scale-100 text-primary dark:text-primary`}
            >
                <IconDownload className="w-6 h-6" />
            </button>
            <div
                ref={cardRef}
                className="relative w-[800px] aspect-video flex-shrink-0 flex snap-center border border-primary shadow-xl rounded overflow-hidden"
            >
                <div className={`absolute inset-0 bg-accent overflow-hidden ${className}`}>
                    <img
                        src={stripDataURL}
                        alt="Photobooth"
                        className="absolute w-1/5 rotate-[3deg] left-0 bottom-[5%] translate-x-[122%]"
                    />
                    <img
                        src={stripDataURL}
                        alt="Photobooth"
                        className="absolute w-1/5 rotate-[355deg] left-[7%] top-[5%]"
                    />
                </div>
                <div
                    className={`w-1/2 absolute right-0 px-12 pb-4 pt-12 h-full flex flex-col justify-between items-center ${className}`}
                >
                    <CloudinaryImage src={logo} className="w-[90%] relative" />
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Vector_3_08d92bba48.png"
                        className="w-1/6"
                    />
                    <p className="text-6xl font-bold p-0 text-center m-0 leading-none">{name}</p>
                    <div className="w-1/2 relative">
                        <CloudinaryImage src={cardImages[template]} className="w-full !block" />
                        <div className="w-full h-1 bg-black rounded-full absolute bottom-0" />
                    </div>

                    <p className="text-sm text-center opacity-90 m-0 !text-inherit">
                        Get yours at posthog.com/photobooth
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

export default function Photobooth(): JSX.Element {
    const [template, setTemplate] = useState<keyof typeof templates>('love')
    const [images, setImages] = useState<PhotoBoothImage[]>([])
    const [dataURL, setDataURL] = useState<string>()
    const [name, setName] = useState<string>('')
    const [mobile, setMobile] = useState(false)
    const [templateSelected, setTemplateSelected] = useState<boolean>(false)

    useEffect(() => {
        const preloadAllImages = async () => {
            try {
                await Promise.all([
                    ...Object.values(cardImages).map(preloadImage),
                    ...cardTypes.map(({ logo }) => preloadImage(logo)),
                ])
            } catch (error) {
                console.error('Error preloading images:', error)
            }
        }

        preloadAllImages()
    }, [])

    const handleDone = (images: PhotoBoothImage[]) => {
        setImages(images)
    }

    useEffect(() => {
        setMobile(typeof window !== 'undefined' && window.innerWidth < 7.68)
    }, [])

    const handleSelectTemplate = (template: string) => {
        setTemplate(template as keyof typeof templates)
        setTemplateSelected(true)
    }

    return (
        <ScrollArea>
            <SEO
                title="Photo booth - PostHog"
                description="A photo booth with Max the hedgehog"
                image={`/images/og/photobooth.png`}
            />
            <div className="pt-4 pb-12">
                {!templateSelected && (
                    <div className="flex flex-col items-center">
                        {/* <h2 className="text-3xl font-bold inline-flex bg-red-2-dark text-white rounded-sm py-1 px-2 -rotate-2 mb-0">
                        Valentine's Day edition
                    </h2> */}
                        <AppIcon name="photobooth" className="!size-10" />

                        <h1 className="text-2xl @3xl:text-4xl font-bold md:px-4 mb-3 mt-3 text-center">
                            Welcome to the <span className="text-red dark:text-yellow">PostHog photo booth</span>
                        </h1>
                        <p className="font-medium opacity-80 text-center md:px-4">
                            We've assembled four photo booth templates for your enjoyment. Click your favorite and get
                            to snappin'.
                        </p>
                    </div>
                )}
                <AnimatePresence>
                    {mobile ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="bg-accent p-4 rounded border border-primary max-w-xl mx-auto mt-4">
                                <h1 className="text-3xl font-bold text-center">Mobile devices not supported</h1>
                                <p className="text-center text-[15px] max-w-md mx-auto mt-4">
                                    Sorry! The PostHog photo booth is designed for desktop use only. Please visit this
                                    page on your computer for the best experience.
                                </p>
                            </div>
                        </motion.div>
                    ) : images.length > 0 ? (
                        <>
                            <h2 className="text-5xl font-bold px-4 text-center mb-2">Share with your friends</h2>
                            <p className="text-center text-[15px] text-opacity-75">
                                Ideally on X would be cool. (Don't forget to tag{' '}
                                <Link href="@posthog" externalNoIcon to="https://x.com/posthog">
                                    @posthog
                                </Link>
                                !)
                            </p>
                            <p>
                                <div className="flex justify-center mt-4 mb-8">
                                    <CallToAction
                                        onClick={() => {
                                            setImages([])
                                            setDataURL(undefined)
                                            setTemplateSelected(false)
                                        }}
                                        type="secondary"
                                        size="sm"
                                    >
                                        <span>Start over</span>
                                    </CallToAction>
                                </div>
                            </p>
                            <div className="flex justify-center items-start gap-8">
                                <div className="flex flex-col snap-y snap-mandatory flex-shrink-0 gap-8">
                                    {dataURL ? (
                                        cardTypes.map((cardType, index) => (
                                            <Card
                                                key={index}
                                                stripDataURL={dataURL}
                                                template={template}
                                                name={name}
                                                index={index}
                                                {...cardType}
                                            />
                                        ))
                                    ) : (
                                        <div className="w-[800px] aspect-video flex-shrink-0" />
                                    )}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex justify-center items-center flex-shrink-0"
                                >
                                    <FinalPhotoStrip dataURL={dataURL} onImageReady={setDataURL} images={images} />
                                </motion.div>
                            </div>
                        </>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <PhotoModal
                                template={template}
                                onDone={handleDone}
                                onSelectTemplate={handleSelectTemplate}
                                onNameChange={setName}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </ScrollArea>
    )
}
