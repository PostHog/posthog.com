import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const HogZilla = () => {
    const [ready, setReady] = useState(false)
    const [containerRef, inView] = useInView({ threshold: 0 })
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (inView) {
            videoRef?.current?.play()
        } else {
            videoRef?.current?.pause()
        }
    }, [inView, ready])

    return (
        <div ref={containerRef}>
            <video
                ref={videoRef}
                onCanPlay={() => {
                    setReady(true)
                }}
                onEnded={() => {
                    if (videoRef?.current) {
                        videoRef.current.currentTime = 3
                        videoRef?.current?.play()
                    }
                }}
                playsInline
                muted
                className="w-full"
                poster="/images/hogzilla.jpg"
                preload="none"
            >
                <source src={`${process.env.GATSBY_CLOUDFRONT_URL}/hogzilla.webm`} type="video/webm" />
                <source src={`${process.env.GATSBY_CLOUDFRONT_URL}/hogzilla.mp4`} type="video/mp4" />
            </video>
        </div>
    )
}

export default function AllInOne() {
    return (
        <section className="bg-[#13161B] relative mb-12">
            <div className="md:absolute top-0 left-0 md:top-0 lg:top-4 xl:top-12 lg:left-0 xl:left-8 max-w-md mx-auto md:mt-4 lg:mx-0 lg:mt-0 lg:max-w-2xl z-50 md:mb-0 mb-8">
                <h2 className="mb-2 text-4xl px-4 lg:text-6xl text-center md:text-left leading-tight md:leading-none text-primary-dark">
                    8+ products in one
                </h2>
                <p className="text-center md:text-left px-4 m-0 mt-1 md:font-semibold text-primary-dark/90 text-sm sm:text-lg">
                    Trade in your product &amp; data stack for a single platform –<br className="hidden lg:block" />{' '}
                    where everything is built to work together.
                </p>
                <p className="text-center md:text-left px-4 m-0 mt-1 md:font-semibold text-primary-dark/90 text-sm sm:text-lg">
                    Product engineering has never been so lit.
                </p>
            </div>
            <HogZilla />
        </section>
    )
}
