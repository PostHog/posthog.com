import React, { useEffect, useState, useRef } from 'react'
import { DotLottiePlayer, PlayerEvents } from '@dotlottie/react-player'
import { IconMusicEighthNote } from 'components/OSIcons'
import { useIntersectionObserver } from 'hooks/useIntersectionObserver'

interface LottieAnimationProps {
    variant: 'kendrick' | 'different' | 'toy' | 'office'
    className?: string
}

export const LottieAnimation = ({ variant, className = '' }: LottieAnimationProps) => {
    const { elementRef, isInView } = useIntersectionObserver()
    const [fallbackInView, setFallbackInView] = useState(false)
    const [lottieReady, setLottieReady] = useState(false)
    const lottieRef = useRef<any>(null)

    // Fallback scroll-based approach in case intersection observer doesn't work
    useEffect(() => {
        const checkScrollPosition = () => {
            if (elementRef.current) {
                const rect = elementRef.current.getBoundingClientRect()
                const windowHeight = window.innerHeight
                const isVisible = rect.top < windowHeight * 0.8 && rect.bottom > 0

                if (isVisible && !fallbackInView) {
                    setFallbackInView(true)
                }
            }
        }

        // Check immediately
        checkScrollPosition()

        // Check on scroll
        window.addEventListener('scroll', checkScrollPosition)
        window.addEventListener('resize', checkScrollPosition)

        return () => {
            window.removeEventListener('scroll', checkScrollPosition)
            window.removeEventListener('resize', checkScrollPosition)
        }
    }, [elementRef.current, fallbackInView])

    // Use intersection observer result, fallback to scroll detection
    const shouldAutoplay = isInView || fallbackInView

    // Manually control Lottie playback when visibility changes
    useEffect(() => {
        if (lottieRef.current && lottieReady) {
            if (shouldAutoplay) {
                try {
                    // Reset to beginning and start playing
                    lottieRef.current.seek(0)
                    lottieRef.current.play()
                } catch (error) {
                    // Silently handle any playback errors
                }
            } else {
                try {
                    lottieRef.current.pause()
                } catch (error) {
                    // Silently handle any pause errors
                }
            }
        }
    }, [shouldAutoplay, lottieReady])

    // Configuration for each variant
    const variants = {
        kendrick: {
            src: '/lotties/kendrick.lottie',
            caption: (
                <>
                    There are other dev tool companies, <br />
                    but <em>they not like us</em> <IconMusicEighthNote className="inline-block size-4" />
                </>
            ),
            className: '@lg:float-right w-72 mx-auto @lg:mt-8',
            containerClasses: 'relative',
            backgroundClasses: 'absolute inset-4 bg-gradient-to-b from-[#AAD4F2] to-[#F2D8AA] rounded-full size-56 mx-auto',
            lottieClasses: 'size-64 mx-auto relative top-[8px] right-[-6px]',
            captionClasses: 'text-primary text-center text-[15px] -mt-2 text-balance',
        },
        different: {
            src: '/lotties/rainbow.lottie',
            className: 'mx-auto w-84 pt-4',
            containerClasses: 'relative',
            backgroundClasses: 'absolute bg-[#D9E8F2] inset-4 rounded-full size-60 mx-auto',
            lottieClasses: 'size-72 mx-auto relative mx-auto',
            // captionClasses: 'text-primary text-center text-[15px] -mt-2 text-balance',
        },
        toy: {
            src: '/lotties/toy.lottie',
            caption: 'Our pricing is sustainable because most customers use multiple products',
            className: 'mx-auto w-80',
            containerClasses: 'relative',
            backgroundClasses: 'absolute inset-4 bg-accent rounded-full size-60 mx-auto',
            lottieClasses: 'size-72 mx-auto relative -top-2',
            captionClasses: 'text-primary text-center text-[15px] -mt-2 text-balance',
        },
        office: {
            src: '/lotties/office.lottie',
            // caption: "We're intentional about building the kind of company we actually enjoy working at.",
            className: '@xl:float-right mx-auto w-80 @xl:mr-4',
            containerClasses: 'relative',
            backgroundClasses: 'absolute inset-4 bg-accent rounded-full size-60 mx-auto',
            lottieClasses: 'size-72 mx-auto relative',
            // captionClasses: 'text-primary text-center text-[15px] -mt-2 text-balance',
        },
    }

    const config = variants[variant]

    return (
        <div ref={elementRef} className={`${config.className} ${className}`}>
            <div className={config.containerClasses}>
                <div className={config.backgroundClasses} />
                <DotLottiePlayer
                    ref={lottieRef}
                    src={config.src}
                    autoplay={false}
                    onEvent={(event) => {
                        if (event === PlayerEvents.Ready) {
                            setLottieReady(true)
                        }
                    }}
                    className={config.lottieClasses}
                />
            </div>
            {config.caption && <figcaption className={config.captionClasses}>{config.caption}</figcaption>}
        </div>
    )
}
