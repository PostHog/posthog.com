import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import Layout from 'components/Layout'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { useInView } from 'react-intersection-observer'
import { toJpeg } from 'html-to-image'

const aspectRatio = 3 / 4
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
        className: 'bg-[#FFF6EC] text-primary',
    },
    {
        logo: 'https://res.cloudinary.com/dmukukwp6/image/upload/Logo_1_dd78611ddb.png',
        className: 'bg-[#EC1111] text-white',
    },
    {
        logo: 'https://res.cloudinary.com/dmukukwp6/image/upload/Logo_1_dd78611ddb.png',
        className: 'bg-dark text-primary-dark',
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
}: {
    onCapture: (image: PhotoBoothImage) => void
    overlay?: Overlay
    onUserReady: () => void
    onWebcamReady: () => void
    onNameChange: (name: string) => void
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
            await navigator.mediaDevices.getUserMedia({ video: true })
            setPermissionError(undefined)
        } catch (err) {
            if (err instanceof Error) {
                setPermissionError(
                    err.name === 'NotAllowedError'
                        ? 'Camera access was denied. Please enable camera access to use the photobooth.'
                        : 'Unable to access camera. Please make sure your camera is connected and try again.'
                )
            }
        }
    }

    useEffect(() => {
        checkCameraPermission()
    }, [])

    const onUserMedia = () => {
        onWebcamReady()
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
        <div className={`relative bg-black size-full flex items-center justify-center transition-opacity`}>
            {permissionError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white p-8 text-center">
                    <p className="text-xl mb-4">{permissionError}</p>
                    <CallToAction onClick={checkCameraPermission} type="outline" size="absurd">
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
                    <div className="relative w-auto h-full" style={{ aspectRatio }}>
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
                                aspectRatio: 0.75,
                                width: { min: 640, ideal: 810, max: 1920 },
                                height: { min: 480, ideal: 1080, max: 1920 },
                            }}
                            className="size-full object-contain"
                            onUserMedia={onUserMedia}
                            onUserMediaError={onUserMediaError}
                        />
                        {overlay?.previewComponent && overlay.previewComponent}
                        {count <= 0 && (
                            <div className="absolute size-full bg-white inset-0 opacity-0 animate-fade animate-duration-700" />
                        )}
                        {!ready && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center py-8 bg-black/50">
                                <div className="relative mb-auto pb-4">
                                    <h1 className="m-0 text-white text-2xl">Scroll to select a template</h1>
                                    <svg
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 170 64"
                                        className="absolute top-0 right-0 translate-x-[38%] translate-y-[-47%] rotate-[28deg]"
                                    >
                                        <g clipPath="url(#a)">
                                            <path
                                                d="M162.96 28.09c.646-1.39 1.299-2.8 1.806-4.246.102-.287.194-.6.259-.915a.99.99 0 0 0 .036-.205c.118-.717.073-1.45-.358-2.055-.688-.958-2.019-1.094-3.089-1.233a93.837 93.837 0 0 0-4.517-.48 93.874 93.874 0 0 0-9.336-.308c-.808.013-2.149.351-2.366 1.283-.217.93.994 1.275 1.681 1.266a93.537 93.537 0 0 1 7.569.176c1.173.08 2.344.186 3.513.318.5.056 1.004.114 1.501.18l1.004.136c.327-.07.443.036.351.312.02.048.033.097.046.155-15.284 8.622-31.794 15-48.933 18.802-.703.156-1.995.62-1.832 1.57.152.898 1.57 1.028 2.25.88 16.44-3.648 32.331-9.496 47.171-17.428a56.745 56.745 0 0 1-1.087 2.4 68.137 68.137 0 0 1-3.755 6.706c-1.129 1.785 2.9 1.957 3.732.641a70.072 70.072 0 0 0 4.354-7.955Z"
                                                fill="#F1A82C"
                                            />
                                        </g>

                                        <defs>
                                            <clipPath id="a">
                                                <path
                                                    fill="#fff"
                                                    transform="matrix(.9415 .337 .337 -.9415 106 47.075)"
                                                    d="M0 0h50v50H0z"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <form
                                    className="mb-auto flex flex-col items-center space-y-2 m-0"
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        if (name?.trim()) {
                                            handleReady()
                                        }
                                    }}
                                >
                                    <input
                                        type="text"
                                        className="bg-transparent border-none outline-none focus:ring-0 text-white text-5xl text-center placeholder:text-white/30 mb-1"
                                        placeholder="Enter your name"
                                        onChange={(e) => {
                                            setName(e.target.value)
                                            onNameChange(e.target.value)
                                        }}
                                        value={name}
                                    />
                                    <CallToAction
                                        disabled={!name?.trim()}
                                        onClick={handleReady}
                                        type="outline"
                                        size="absurd"
                                    >
                                        <span>Ready?</span>
                                    </CallToAction>
                                </form>
                            </div>
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
}: {
    images: PhotoBoothImage[]
    onRetake?: (index: number) => void
    retaking?: number
    animate?: boolean
}) => {
    return (
        <div className={`grid items-center gap-2 bg-white rounded-md p-2 h-full`}>
            {Array.from({ length: numImages }).map((_, index) => {
                const image = images[index]
                return (
                    <div key={index} className="relative aspect-[3/4] size-full group bg-accent dark:bg-accent-dark">
                        {retaking !== index && image?.src && (
                            <img
                                src={image.src}
                                alt="Photobooth"
                                className={`size-full absolute object-cover inset-0 ${
                                    animate ? 'opacity-0 animate-develop duration-1000 animate-delay-1000' : ''
                                }`}
                            />
                        )}
                        {image?.overlay?.stripComponent && image.overlay.stripComponent}
                        {image?.src && onRetake && retaking === undefined && images.every((image) => image.src) && (
                            <button
                                onClick={() => {
                                    onRetake(index)
                                }}
                                className="absolute inset-0 size-full bg-black/50 text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                            >
                                Retake
                            </button>
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
}: {
    images: PhotoBoothImage[]
    template: string
    onRetake?: (index: number) => void
    onSelect: (template: string) => void
    disabled: boolean
    active: boolean
    retaking?: number
}) => {
    const [ref, inView] = useInView({ threshold: 1 })
    const overlays = templates[template]

    useEffect(() => {
        if (inView) {
            onSelect(template)
        }
    }, [inView])

    return (
        <div
            ref={ref}
            className={`h-[70vh] snap-center flex-grow border-2 ${disabled && !active ? 'opacity-50' : ''} ${
                active ? 'border-green' : 'border-transparent'
            } transition-all rounded-md`}
        >
            <PhotoStrip
                images={images.map((image, index) => ({
                    src: active ? image.src : undefined,
                    overlay: overlays[index],
                }))}
                onRetake={onRetake}
                retaking={retaking}
            />
        </div>
    )
}

const PhotoModal = ({
    onClose,
    template,
    onDone,
    onSelectTemplate,
    onNameChange,
}: {
    onClose: () => void
    template: any
    onDone: (images: PhotoBoothImage[]) => void
    onSelectTemplate: (template: string) => void
    onNameChange: (name: string) => void
}) => {
    const [step, setStep] = useState(0)
    const [capturing, setCapturing] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof templates>(template)
    const [overlayIndex, setOverlayIndex] = useState<number>()
    const [overlay, setOverlay] = useState<Overlay>()
    const [retaking, setRetaking] = useState<number>()
    const [cameraPermission, setCameraPermission] = useState<boolean>()
    const photoStripRef = useRef<HTMLDivElement>(null)
    const [images, setImages] = useState<PhotoBoothImage[]>(templates[selectedTemplate].map((overlay) => ({ overlay })))

    const checkCameraPermission = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true })
            setCameraPermission(true)
        } catch (err) {
            setCameraPermission(false)
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

    const handleDone = async () => {
        onDone(images)
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

    return (
        <motion.div
            className="flex justify-center items-center py-12 overflow-hidden"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {cameraPermission === false ? (
                <div onClick={(e) => e.stopPropagation()} className="text-center bg-white p-8 rounded-lg max-w-xl">
                    <h2 className="text-2xl font-bold mb-4">Camera Access Required</h2>
                    <p className="mb-6">
                        Please enable camera access to use the photobooth. Once enabled, click the button below to try
                        again.
                    </p>
                    <CallToAction onClick={checkCameraPermission} type="outline" size="absurd">
                        <span>Try Again</span>
                    </CallToAction>
                </div>
            ) : cameraPermission === true ? (
                <div onClick={(e) => e.stopPropagation()} className="h-[70vh]">
                    <div className="flex space-x-2 items-center h-full">
                        <div className="relative size-full">
                            <Camera
                                onWebcamReady={handleWebcamReady}
                                onUserReady={() => setCapturing(true)}
                                onCapture={handleCapture}
                                overlay={overlay}
                                onNameChange={onNameChange}
                            />
                            {!retaking && images.every((image) => image.src) && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center py-8 bg-black/50">
                                    <div className="relative pb-4 mb-auto">
                                        <h1 className="m-0 text-white text-2xl">Click a photo to retake</h1>
                                        <svg
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 170 64"
                                            className="absolute top-0 right-0 translate-x-[38%] translate-y-[-47%] rotate-[28deg]"
                                        >
                                            <g clipPath="url(#a)">
                                                <path
                                                    d="M162.96 28.09c.646-1.39 1.299-2.8 1.806-4.246.102-.287.194-.6.259-.915a.99.99 0 0 0 .036-.205c.118-.717.073-1.45-.358-2.055-.688-.958-2.019-1.094-3.089-1.233a93.837 93.837 0 0 0-4.517-.48 93.874 93.874 0 0 0-9.336-.308c-.808.013-2.149.351-2.366 1.283-.217.93.994 1.275 1.681 1.266a93.537 93.537 0 0 1 7.569.176c1.173.08 2.344.186 3.513.318.5.056 1.004.114 1.501.18l1.004.136c.327-.07.443.036.351.312.02.048.033.097.046.155-15.284 8.622-31.794 15-48.933 18.802-.703.156-1.995.62-1.832 1.57.152.898 1.57 1.028 2.25.88 16.44-3.648 32.331-9.496 47.171-17.428a56.745 56.745 0 0 1-1.087 2.4 68.137 68.137 0 0 1-3.755 6.706c-1.129 1.785 2.9 1.957 3.732.641a70.072 70.072 0 0 0 4.354-7.955Z"
                                                    fill="#F1A82C"
                                                />
                                            </g>

                                            <defs>
                                                <clipPath id="a">
                                                    <path
                                                        fill="#fff"
                                                        transform="matrix(.9415 .337 .337 -.9415 106 47.075)"
                                                        d="M0 0h50v50H0z"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div className="mt-auto">
                                        <CallToAction onClick={handleDone} type="outline" size="absurd">
                                            <span>Done</span>
                                        </CallToAction>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div
                            className={`flex flex-col space-y-4 h-screen ${
                                capturing ? 'overflow-y-hidden' : 'overflow-y-auto'
                            } snap-y snap-mandatory py-[70vh] flex-shrink-0 z-[999999]`}
                        >
                            {Object.keys(templates).map((key) => (
                                <div ref={selectedTemplate === key ? photoStripRef : null} key={key}>
                                    <VerticalPhotoStrip
                                        active={selectedTemplate === key}
                                        disabled={capturing}
                                        images={images}
                                        template={key}
                                        onRetake={handleRetake}
                                        retaking={retaking}
                                        onSelect={(template) => {
                                            setSelectedTemplate(template as keyof typeof templates)
                                            onSelectTemplate(template)
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="animate-pulse">Loading...</div>
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

    return (
        <div ref={ref} className="flex space-x-4 items-center h-[800px]">
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
    const [dataURL, setDataURL] = useState<string>()
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (cardRef.current) {
            toJpeg(cardRef.current, {
                quality: 1,
                backgroundColor: 'white',
            }).then((dataURL) => {
                setDataURL(dataURL)
            })
        }
    }, [])

    return (
        <div className="relative">
            <div ref={cardRef} className="relative w-[800px] aspect-video flex-shrink-0 flex snap-center">
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
                    <p className="text-6xl font-bold p-0 text-center m-0">{name}</p>
                    <div className="w-1/2 relative">
                        <CloudinaryImage src={cardImages[template]} className="w-full !block" />
                        <div className="w-full h-1 bg-black rounded-full absolute bottom-0" />
                    </div>

                    <p className="text-sm text-center opacity-90 m-0 !text-inherit">Get yours at posthog.com/love</p>
                </div>
            </div>
        </div>
    )
}

export default function Photobooth(): JSX.Element {
    const [modalOpen, setModalOpen] = useState(true)
    const [template, setTemplate] = useState<keyof typeof templates>('love')
    const [images, setImages] = useState<PhotoBoothImage[]>([])
    const [dataURL, setDataURL] = useState<string>()
    const [name, setName] = useState<string>('')

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
        setModalOpen(false)
    }

    return (
        <Layout>
            <AnimatePresence>
                {images.length > 0 ? (
                    <div className="py-12 flex justify-center items-center space-x-2">
                        <div className="flex flex-col h-[800px] overflow-y-auto snap-y snap-mandatory flex-shrink-0">
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
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <PhotoModal
                            onClose={() => setModalOpen(false)}
                            template={template}
                            onDone={handleDone}
                            onSelectTemplate={setTemplate}
                            onNameChange={setName}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout>
    )
}
