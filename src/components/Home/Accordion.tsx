import React, { useEffect, useRef, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { slideButtons } from './Slider/slideButtons'
import { AnimatePresence, motion } from 'framer-motion'
import {
    FeatureFlags,
    ProductAnalytics,
    SessionReplay,
    ABTesting,
    Surveys,
    DataPipeline,
    DataWarehouse,
    WebAnalytics,
    LLMObservability,
} from './Slider/Slides'
import { Chevron } from 'components/Icons'
import { DotLottiePlayer, PlayerEvents } from '@dotlottie/react-player'
import * as Icons from '@posthog/icons'

const slideContents = [
    ProductAnalytics,
    WebAnalytics,
    SessionReplay,
    FeatureFlags,
    ABTesting,
    Surveys,
    DataPipeline,
    DataWarehouse,
    LLMObservability,
]

type SlideButton = {
    lottieSrc: string
    color: string
    colorDark?: string
    title: string
    index: number
    activeIndex: number | null
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>
    placeholderIcon: string
}

const SlideButton = ({
    lottieSrc,
    color,
    colorDark,
    title,
    index,
    activeIndex,
    setActiveIndex,
    placeholderIcon,
}: SlideButton) => {
    const lottieRef = useRef<null>()
    const [lottieReady, setLottieReady] = useState(false)
    const Icon = Icons[placeholderIcon]

    useEffect(() => {
        if (active) {
            lottieRef?.current?.seek(0)
            lottieRef?.current?.play(0)
        } else {
            lottieRef?.current?.pause()
            lottieRef?.current?.seek(0)
        }
    }, [activeIndex])

    const Slide = slideContents[index]
    const active = index === activeIndex

    return (
        <div key={title} className="border-t border-border dark:border-dark first:border-0">
            <Disclosure>
                <Disclosure.Button
                    onClick={() => setActiveIndex(active ? null : index)}
                    className="flex justify-between items-center px-4 py-3 w-full group"
                >
                    <span className="flex space-x-4 items-center group-active:top-[0.5px] group-active:scale-[.98] transition-all">
                        <span
                            className={`w-6 h-6 text-${color} dark:text-${colorDark} flex justify-center items-center`}
                        >
                            {lottieSrc && (
                                <DotLottiePlayer
                                    style={{ display: lottieReady ? 'inline-block' : 'none' }}
                                    lottieRef={lottieRef}
                                    src={lottieSrc}
                                    autoplay={active}
                                    onEvent={(event) => {
                                        if (event === PlayerEvents.Ready) {
                                            setLottieReady(true)
                                        }
                                    }}
                                />
                            )}
                            {!lottieReady && <Icon />}
                        </span>
                        <p className={`leading-tight text-sm m-0 ${active ? 'font-bold' : 'font-medium opacity/75'}`}>
                            {title}
                        </p>
                    </span>
                    <Chevron
                        className={`w-3 h-3 transition-all group-active:top-[0.5px] group-active:scale-[.98] ${
                            active ? 'rotate-180' : 'opacity-60'
                        }`}
                    />
                </Disclosure.Button>
                <AnimatePresence initial={false}>
                    {active && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ type: 'tween' }}
                            className="overflow-hidden"
                        >
                            <Disclosure.Panel static>
                                <Slide />
                            </Disclosure.Panel>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Disclosure>
        </div>
    )
}

export default function Accordion(): JSX.Element {
    const [activeIndex, setActiveIndex] = useState<number | null>(0)

    return (
        <div className="border-border border dark:border-dark bg-accent dark:bg-accent-dark mx-5 rounded-sm md:hidden mb-6">
            {slideButtons.map((slideButton, index) => (
                <SlideButton
                    key={index}
                    {...slideButton}
                    index={index}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                />
            ))}
        </div>
    )
}
