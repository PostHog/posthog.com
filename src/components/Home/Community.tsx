import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'components/Link'
import Particles from 'react-tsparticles'
import { loadStarsPreset } from 'tsparticles-preset-stars'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'

const CommunityHogs = ({ name, className = '' }) => {
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
        <div className="w-[70vw] mx-auto absolute bottom-0 left-1/2 -translate-x-1/2" ref={containerRef}>
            <video
                ref={videoRef}
                onCanPlay={() => {
                    setReady(true)
                }}
                loop
                playsInline
                muted
                preload="none"
                className={`w-full ${className}`}
            >
                <source
                    className="hidden"
                    src={`${process.env.GATSBY_CLOUDFRONT_URL}/${name}.webm`}
                    type="video/webm"
                />
                <source className="hidden" src={`${process.env.GATSBY_CLOUDFRONT_URL}/${name}.mp4`} type="video/mp4" />
            </video>
        </div>
    )
}

const CommunityStat = ({ count, label, className }) => {
    return (
        <div className={`absolute text-center text-[#392116] dark:text-[#E7F1FF] ${className}`}>
            <h4 className="text-[2.5vw] lg:text-[2.75vw] xl:text-[3vw] leading-none mb-0.5">{count}</h4>
            <p className="text-[1.5vw] lg:text-[1.25vw] xl:text-[1vw] m-0 leading-tight whitespace-nowrap">{label}</p>
        </div>
    )
}

const Stars = () => {
    const breakpoints = useBreakpoint()
    const particlesInit = useCallback(async (engine) => {
        await loadStarsPreset(engine)
    }, [])

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Particles
                init={particlesInit}
                className="w-full h-full absolute inset-0"
                options={{
                    preset: 'stars',
                    fullScreen: false,
                    background: {
                        color: 'transparent',
                    },
                    particles: {
                        number: {
                            value: breakpoints.sm ? 100 : 400,
                        },
                    },
                }}
            />
        </motion.div>
    )
}

export default function Community() {
    const { websiteTheme } = useValues(layoutLogic)
    const [ref, inView] = useInView({ threshold: 0 })
    return (
        <div
            ref={ref}
            className="relative after:bg-gradient-to-b dark:after:from-[#141A26]/0 dark:after:to-dark after:h-20 after:left-0 after:w-full after:absolute after:bottom-0"
        >
            {inView && (websiteTheme === 'dark' ? <Stars /> : null)}
            <div className="w-full overflow-hidden md:pt-0 before:bg-gradient-to-b dark:before:from-dark dark:before:to-[#141A26]/0 before:absolute before:left-0 before:h-48 before:w-full before:top-0">
                <div className="md:absolute relative w-full top-8 sm:top-12 md:-top-16 md:pt-8 lg:pt-0 xl:top-12 2xl:top-20 px-4 md:px-0 z-40">
                    <h2 className="m-0 pb-2 px-4 text-4xl md:text-5xl lg:text-7xl text-center leading-0 md:leading-none">
                        Join our <br className="hidden md:block" />
                        <span className="text-red dark:text-yellow">open source</span>{' '}
                        <br className="hidden md:block xl:hidden" />
                        community
                    </h2>
                    <p className="text-center md:text-lg max-w-lg lg:max-w-xl leading-tight mx-auto my-0 pb-4 md:pb-0 px-12 md:px-0">
                        We work in the open. Check out our{' '}
                        <Link to="/handbook/strategy/overview" className="inline-block">
                            company strategy
                        </Link>
                        ,{' '}
                        <Link to="/handbook/strategy/business-model" className="inline-block">
                            business model
                        </Link>
                        , or even our{' '}
                        <Link to="http://github.com/posthog/posthog" className="inline-block" external>
                            source code
                        </Link>
                        .
                    </p>
                </div>
                <section className="relative sm:scale-100 scale-[1.2] sm:origin-center origin-bottom">
                    <img src="/images/campfire-light.png" alt="campfire-light" className="dark:hidden block w-full" />
                    <img src="/images/campfire-dark.png" alt="campfire-dark" className="hidden dark:block w-full" />

                    <CommunityHogs name="campfire-light" className="dark:hidden block" />
                    <CommunityHogs name="campfire-dark" className="hidden dark:block" />
                </section>
            </div>
        </div>
    )
}
