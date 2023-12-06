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
        <section className="bg-[#13161B] relative mb-12">
            <div className="md:absolute top-0 left-0 md:top-0 lg:top-4 xl:top-12 lg:left-0 xl:left-8 max-w-md mx-auto md:mt-4 lg:mx-0 lg:mt-0 lg:max-w-2xl z-50 md:mb-0 mb-8">
                <h2 className="mb-2 text-4xl px-4 lg:text-6xl text-center md:text-left leading-tight md:leading-none text-primary-dark">
                    8+ products in one
                </h2>
                <p className="text-center md:text-left px-4 m-0 mt-1 md:font-semibold text-primary-dark/90 text-base sm:text-lg">
                    Trade in your product &amp; data stack for a single platform –<br className="hidden lg:block" />{' '}
                    where everything is built to work together.
                </p>
                <p className="text-center md:text-left px-4 m-0 mt-1 md:font-semibold text-primary-dark/90 text-base sm:text-lg">
                    Product engineering has never been so lit.
                </p>
            </div>
            <HogZilla />
        </section>
    )
}
