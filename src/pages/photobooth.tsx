import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import Layout from 'components/Layout'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

const aspectRatio = 3 / 4
const numImages = 4
const initialCount = 3

const templates = {
    love: [
        'https://res.cloudinary.com/dmukukwp6/image/upload/Frame_13_01edf38d9a.png',
        'https://res.cloudinary.com/dmukukwp6/image/upload/Frame_11_23c7f086da.png',
        'https://res.cloudinary.com/dmukukwp6/image/upload/Frame_14_ab070af9e7.png',
        'https://res.cloudinary.com/dmukukwp6/image/upload/Frame_12_1c1178e761.png',
    ],
    vince: [
        'https://res.cloudinary.com/dmukukwp6/image/upload/Frame_13_69ad22caa6.png',
        'https://res.cloudinary.com/dmukukwp6/image/upload/Frame_11_261551b354.png',
        'https://res.cloudinary.com/dmukukwp6/image/upload/Frame_12_2a1882e191.png',
        'https://res.cloudinary.com/dmukukwp6/image/upload/Frame_14_74e168672c.png',
    ],
    clipart: [
        'https://res.cloudinary.com/dmukukwp6/image/upload/Frame_13_1_ef16644fc4.png',
        'https://res.cloudinary.com/dmukukwp6/image/upload/Frame_12_0870369297.png',
        'https://res.cloudinary.com/dmukukwp6/image/upload/Frame_11_b69f777fc2.png',
        'https://res.cloudinary.com/dmukukwp6/image/upload/Frame_14_ce48756999.png',
    ],
}

const Camera = ({
    onCapture,
    overlay,
    onReady,
}: {
    onCapture: (image: { src: string; overlay: string }) => void
    overlay?: string
    onReady: () => void
}) => {
    const webcamRef = React.useRef<Webcam>(null)
    const [count, setCount] = useState(initialCount)
    const [ready, setReady] = useState(false)

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

    const onUserMedia = () => {
        setReady(true)
        onReady()
    }

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot()
        if (imageSrc && overlay) {
            onCapture({ src: imageSrc, overlay })
        }
    }, [webcamRef, overlay])

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
    }, [overlay])

    return (
        <div
            className={`relative bg-black size-full flex items-center justify-center transition-opacity ${
                ready ? 'opacity-100' : 'opacity-0'
            }`}
        >
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
                        aspectRatio,
                        width: { min: 640, ideal: 810, max: 1920 },
                        height: { min: 480, ideal: 1080, max: 1920 },
                    }}
                    className="size-full object-contain"
                    onUserMedia={onUserMedia}
                />
                {overlay && (
                    <CloudinaryImage
                        src={overlay}
                        alt="Overlay"
                        className="absolute inset-0 size-full pointer-events-none"
                        imgClassName="size-full object-contain"
                    />
                )}
                {count <= 0 && (
                    <div className="absolute size-full bg-white inset-0 opacity-0 animate-fade animate-duration-700" />
                )}
            </div>
        </div>
    )
}

const PhotoStrip = ({
    images,
    onRetake,
}: {
    images: { src?: string; overlay: string }[]
    onRetake?: (index: number) => void
}) => {
    const [retaking, setRetaking] = useState()

    useEffect(() => {
        setRetaking(undefined)
    }, [images])

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
                                className="size-full absolute inset-0 opacity-0 animate-develop duration-1000 animate-delay-1000"
                            />
                        )}
                        {image?.overlay && (
                            <CloudinaryImage
                                src={image.overlay}
                                alt="Photobooth"
                                className="absolute inset-0 size-full"
                                imgClassName="size-full"
                            />
                        )}
                        {image?.src && onRetake && (
                            <button
                                onClick={() => {
                                    setRetaking(index)
                                    onRetake(index)
                                }}
                                className="absolute inset-0 size-full bg-black/50 text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

const PhotoModal = ({
    onClose,
    template,
    onDone,
}: {
    onClose: () => void
    template: any
    onDone: (images: { src: string; overlay: string }[]) => void
}) => {
    const [step, setStep] = useState(0)
    const [overlayIndex, setOverlayIndex] = useState<number>()
    const [overlay, setOverlay] = useState<string>()
    const [images, setImages] = useState<{ src: string; overlay: string }[]>(
        templates[template].map((overlay) => ({ overlay }))
    )

    const handleCapture = (image: { src: string; overlay: string }) => {
        const newImages = [...images]
        const retaking = !!newImages[overlayIndex]?.src
        newImages[overlayIndex] = image
        setImages(newImages)
        const nextIndex = overlayIndex !== undefined ? overlayIndex + 1 : 0
        if (retaking || nextIndex >= templates[template].length) {
            setOverlayIndex(undefined)
            setOverlay(undefined)
            onDone(newImages)
        } else {
            setOverlayIndex(nextIndex)
        }
    }

    const handleReady = () => {
        setOverlayIndex(0)
    }

    const handleRetake = (index: number) => {
        setOverlayIndex(index)
    }

    useEffect(() => {
        if (overlayIndex !== undefined && templates[template][overlayIndex]) {
            setOverlay(templates[template][overlayIndex])
        }
    }, [overlayIndex])

    return (
        <motion.div
            className="fixed size-full inset-0 bg-black/75 flex justify-center items-start z-[999999] py-10"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div onClick={(e) => e.stopPropagation()} className="h-full">
                {step === 0 && (
                    <div className="flex space-x-2 items-center h-full">
                        <Camera onReady={handleReady} onCapture={handleCapture} overlay={overlay} />
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default function Photobooth(): JSX.Element {
    const [modalOpen, setModalOpen] = useState(false)
    const [template, setTemplate] = useState<keyof typeof templates>('love')
    const [images, setImages] = useState<{ src: string; overlay: string }[][]>([])

    const handleDone = (capturedImages: { src: string; overlay: string }[]) => {
        const newImages = [...images, capturedImages]
        setImages(newImages)
        setModalOpen(false)
    }

    return (
        <Layout>
            <AnimatePresence>
                {modalOpen && (
                    <PhotoModal onClose={() => setModalOpen(false)} template={template} onDone={handleDone} />
                )}
            </AnimatePresence>

            <section className="px-5 py-12">
                <div className="flex">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Choose a template</h1>
                        <div className="flex space-x-4 items-center h-[80vh]">
                            {Object.entries(templates).map(([key, overlays]) => (
                                <button
                                    className="h-full hover:scale-[1.02] transition-transform duration-100 active:scale-100"
                                    key={key}
                                    onClick={() => {
                                        setTemplate(key as keyof typeof templates)
                                        setModalOpen(true)
                                    }}
                                >
                                    <PhotoStrip images={overlays.map((overlay) => ({ overlay }))} />
                                </button>
                            ))}
                        </div>
                    </div>
                    {images.length > 0 && (
                        <div className="pl-6 ml-6 border-l border-light dark:border-dark flex flex-col">
                            <h1 className="text-2xl font-bold">Your photos</h1>
                            <div className="flex space-x-4 items-center h-[80vh]">
                                {images.map((strip, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: -200, rotate: -15, scale: 1.2 }}
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
                                        <PhotoStrip images={strip} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}
