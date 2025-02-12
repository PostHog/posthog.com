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
    onUserReady,
    onWebcamReady,
}: {
    onCapture: (image: { src: string; overlay: string }) => void
    overlay?: string
    onUserReady: () => void
    onWebcamReady: () => void
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
        onWebcamReady()
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
                        <div className="mb-auto">
                            <CallToAction onClick={handleReady} type="outline" size="absurd">
                                <span>Ready?</span>
                            </CallToAction>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const PhotoStrip = ({
    images,
    onRetake,
    retaking,
    animate = true,
}: {
    images: { src?: string; overlay: string }[]
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
                                className={`size-full absolute inset-0 ${
                                    animate ? 'opacity-0 animate-develop duration-1000 animate-delay-1000' : ''
                                }`}
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
                        {image?.src && onRetake && retaking === undefined && (
                            <button
                                onClick={() => {
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

const VerticalPhotoStrip = ({
    images,
    template,
    selectedTemplate,
    onRetake,
    onSelect,
    disabled,
    active,
    retaking,
}: {
    images: { src?: string; overlay: string }[]
    template: string
    selectedTemplate: string
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
            className={`h-[70vh] snap-center flex-grow ${disabled && !active ? 'opacity-50' : ''} rounded-md`}
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
}: {
    onClose: () => void
    template: any
    onDone: (images: { src: string; overlay: string }[]) => void
}) => {
    const [step, setStep] = useState(0)
    const [capturing, setCapturing] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof templates>(template)
    const [overlayIndex, setOverlayIndex] = useState<number>()
    const [overlay, setOverlay] = useState<string>()
    const [retaking, setRetaking] = useState<number>()
    const photoStripRef = useRef<HTMLDivElement>(null)
    const [images, setImages] = useState<{ src: string; overlay: string }[]>(
        templates[selectedTemplate].map((overlay) => ({ overlay }))
    )

    const handleCapture = async (image: { src: string; overlay: string }) => {
        const newImages = [...images]
        const retaking = !!newImages[overlayIndex]?.src
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
            className="fixed size-full inset-0 bg-black/75 flex justify-center items-center z-[999999] py-10"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div onClick={(e) => e.stopPropagation()} className="h-[70vh]">
                <div className="flex space-x-2 items-center h-full">
                    <div className="relative size-full">
                        <Camera
                            onWebcamReady={handleWebcamReady}
                            onUserReady={() => setCapturing(true)}
                            onCapture={handleCapture}
                            overlay={overlay}
                        />
                        {images.every((image) => image.src) && (
                            <div className="absolute inset-0 flex flex-col items-center justify-end py-8 bg-black/50">
                                <div className="relative pb-4">
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
                                <CallToAction onClick={handleDone} type="outline" size="absurd">
                                    <span>Done</span>
                                </CallToAction>
                            </div>
                        )}
                    </div>
                    <div
                        className={`flex flex-col space-y-6 h-screen ${
                            capturing ? 'overflow-y-hidden' : 'overflow-y-auto'
                        } snap-y snap-mandatory py-[70vh] flex-shrink-0`}
                    >
                        {Object.keys(templates).map((key) => (
                            <div ref={selectedTemplate === key ? photoStripRef : null} key={key}>
                                <VerticalPhotoStrip
                                    active={selectedTemplate === key}
                                    disabled={capturing}
                                    images={images}
                                    template={key}
                                    selectedTemplate={selectedTemplate}
                                    onRetake={handleRetake}
                                    retaking={retaking}
                                    onSelect={(template) => setSelectedTemplate(template as keyof typeof templates)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const FinalPhotoStrip = ({ images }: { images: { src: string; overlay: string }[] }) => {
    console.log(images)
    const ref = useRef<HTMLDivElement>(null)
    const [dataURL, setDataURL] = useState<string>()

    return (
        <div ref={ref} className="flex space-x-4 items-center h-[80vh]">
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
                        setDataURL(dataURL)
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
                {dataURL ? (
                    <img src={dataURL} alt="Photobooth" className="size-full" />
                ) : (
                    <PhotoStrip animate={false} images={images} />
                )}
            </motion.div>
        </div>
    )
}

export default function Photobooth(): JSX.Element {
    const [modalOpen, setModalOpen] = useState(true)
    const [template, setTemplate] = useState<keyof typeof templates>('love')
    const [images, setImages] = useState<{ src: string; overlay: string }[]>([])

    const handleDone = (images: { src: string; overlay: string }[]) => {
        setImages(images)
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
                <div className="flex justify-center items-center">
                    {images.length > 0 && <FinalPhotoStrip images={images} />}
                </div>
            </section>
        </Layout>
    )
}
