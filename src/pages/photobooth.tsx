import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import Layout from 'components/Layout'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

const imageWidth = 250
const imageHeight = 300
const numImages = 4
const initialCount = 3
const videoConstraints = {
    width: imageWidth,
    height: imageHeight,
    facingMode: 'user',
}

const Camera = ({ onCapture }: { onCapture: (image: string) => void }) => {
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
        startCountdown()
        setReady(true)
    }

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot()
        if (imageSrc) {
            onCapture(imageSrc)
        }
    }, [webcamRef])

    useEffect(() => {
        if (count === 0) {
            capture()
        }
    }, [count])

    return (
        <div style={{ width: imageWidth, height: imageHeight }} className="relative bg-black">
            {ready && count > 0 && (
                <div className="bg-red border border-white shadow-lg text-white size-6 rounded-full flex items-center justify-center absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 text-base font-bold">
                    {count}
                </div>
            )}
            <Webcam
                ref={webcamRef}
                audio={false}
                height={imageHeight}
                screenshotFormat="image/jpeg"
                width={imageWidth}
                videoConstraints={videoConstraints}
                onUserMedia={onUserMedia}
            />
        </div>
    )
}

const PhotoStrip = ({ onClose }: { onClose: () => void }) => {
    const [images, setImages] = useState<string[]>([])
    const [activeIndex, setActiveIndex] = useState(0)

    const handleSetImages = (newImage: string) => {
        setImages((prev) => [...prev, newImage])
        setActiveIndex((prev) => prev + 1)
    }

    return (
        <div
            className="flex items-start justify-center fixed overflow-auto inset-0 bg-black/80 size-full z-[999999] p-5"
            onClick={() => onClose()}
        >
            <div
                className="flex flex-col items-center justify-center bg-white rounded-md p-4 space-y-4"
                onClick={(e) => e.stopPropagation()}
            >
                {Array.from({ length: numImages }).map((_, index) => {
                    const image = images[index]
                    return image ? (
                        <img key={index} src={image} alt="Photobooth" />
                    ) : index === activeIndex ? (
                        <Camera onCapture={handleSetImages} key={index} />
                    ) : (
                        <div
                            key={index}
                            className="bg-black text-white text-lg font-bold"
                            style={{ width: imageWidth, height: imageHeight }}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default function Photobooth(): JSX.Element {
    const [ready, setReady] = useState(false)

    return (
        <Layout>
            <section className="my-12 flex justify-center items-center">
                {ready && <PhotoStrip onClose={() => setReady(false)} />}
                <div className="flex items-center justify-center space-x-12">
                    <CloudinaryImage
                        width={300}
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Upper_screen_7e4e3d6569.jpg"
                    />
                    <div>
                        <h1 className="text-4xl font-bold">The PostHog Photobooth ™</h1>
                        <CallToAction onClick={() => setReady(true)}>Get started</CallToAction>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
