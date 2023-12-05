import React, { useEffect, useState } from 'react'
import hogzilla from '../../../static/lotties/hogzilla.json'
import { useLottie } from 'lottie-react'
import { useInView } from 'react-intersection-observer'

const HogZilla = () => {
    const [ref, inView] = useInView({ threshold: 0, triggerOnce: true })

    const handleEnd = () => {
        goToAndPlay(3000)
    }

    const { View, goToAndPlay, play, pause } = useLottie({
        animationData: hogzilla,
        loop: false,
        autoPlay: false,
        onComplete: handleEnd,
    })

    useEffect(() => {
        if (inView) {
            play()
        } else {
            pause()
        }
    }, [inView])

    return <div ref={ref}>{View}</div>
}

export default function AllInOne() {
    return (
        <section className="relative mb-12">
            <div className="md:absolute top-0 left-0 lg:top-24 lg:left-0 xl:left-8 max-w-md mx-auto lg:mx-0 mt-12 lg:mt-0 lg:max-w-2xl z-50">
                <h2 className="m-0 text-4xl px-4 md:text-6xl text-center md:text-left leading-tight md:leading-none">
                    PostHog is 7+ tools <br className="xl:hidden" />
                    in one
                </h2>
                <p className="text-center md:text-left px-4 m-0 mt-1 font-semibold text-primary/75 dark:text-primary-dark/75 text-base sm:text-lg">
                    Product engineering has never been so lit.
                </p>
            </div>
            <HogZilla />
        </section>
    )
}
