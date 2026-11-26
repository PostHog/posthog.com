import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, Transition, useReducedMotion } from 'framer-motion'
import Explorer from 'components/Explorer'
import HoggieImage, { HoggieCrop } from 'components/HoggieImage'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import OSTable from 'components/OSTable'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { SEO } from 'components/seo'
import Particles from 'react-tsparticles'
import { loadStarsPreset } from 'tsparticles-preset-stars'
import { Logo } from '@posthog/brand/logo'
import { colors } from '@posthog/brand/colors'
import hedgehogHeartPng from 'hoggies/heart.png'

// The box around the art, so the two hogs touch when they hug
const HEART_CROP: HoggieCrop = [90, 58, 820, 916]
const HUG_DURATION_MS = 1400

// The colors of the PostHog logo, plus the heart
const STAR_COLORS = [colors.cobalt.core, colors.tangerine.core, colors.yellow.core, colors.coral.core]

const pricingColumns = [
    { name: 'Hugs', width: 'minmax(auto,1fr)', align: 'left' as const },
    { name: 'Price', width: 'minmax(auto,1fr)', align: 'left' as const },
]

const pricingRows = [
    ['First 1,000,000 hugs every month', 'Free'],
    ['Every hug after that', '$0.00 per hug'],
    ['Sales calls', 'None. Ever.'],
    ['Contract', 'None. Cancel your hugs at any time.'],
].map(([hugs, price]) => ({ cells: [{ content: hugs }, { content: <strong>{price}</strong> }] }))

const PostHugPage = (): JSX.Element => {
    const particlesInit = useCallback(async (engine) => {
        await loadStarsPreset(engine)
    }, [])
    const shouldReduceMotion = useReducedMotion()
    const [hugging, setHugging] = useState(false)
    const [hugsSent, setHugsSent] = useState(0)
    const hugTimeout = useRef<ReturnType<typeof setTimeout>>()

    useEffect(() => () => clearTimeout(hugTimeout.current), [])

    const sendHug = () => {
        if (hugging) return
        setHugging(true)
        setHugsSent((count) => count + 1)
        hugTimeout.current = setTimeout(() => setHugging(false), HUG_DURATION_MS)
    }

    const hugTransition: Transition = shouldReduceMotion
        ? { duration: 0 }
        : { type: 'spring', duration: 0.6, bounce: hugging ? 0.6 : 0.3 }

    return (
        <>
            <SEO title="PostHug" description="Free hedgehugs." image={`/images/about.png`} />
            <Explorer
                template="generic"
                slug="posthug"
                title="PostHug"
                showAddressBar={false}
                headerBarOptions={[]}
                fullScreen
            >
                {/* The stars fill the whole window, behind the content */}
                <Particles
                    id="posthug-stars"
                    init={particlesInit}
                    className="absolute inset-0"
                    options={{
                        preset: 'stars',
                        fullScreen: false,
                        background: { color: 'transparent' },
                        interactivity: { enable: false },
                        particles: {
                            color: { value: STAR_COLORS },
                            move: { speed: 5 },
                            number: { value: 200 },
                        },
                    }}
                />
                <ScrollArea className="relative h-full" viewportClasses="[&>div]:h-full">
                    <div className="mx-auto flex min-h-full max-w-xl flex-col items-center justify-center px-4 py-8 text-center text-primary">
                        <h1 className="m-0 text-2xl @md:text-3xl">You were probably looking for</h1>
                        <Link to="/" aria-label="PostHog home" className="my-6 block w-full max-w-xs @md:max-w-sm">
                            <Logo className="w-full dark:hidden" />
                            <Logo variant="mono" color="white" className="hidden w-full dark:block" />
                        </Link>
                        <p className="m-0 font-semibold">Even engineers need hugs every now and again. 🥺</p>
                        <p className="mt-1 mb-6">We can't literally give you a hug, so here is the next best thing.</p>

                        <button
                            type="button"
                            onClick={sendHug}
                            aria-label="Send a hug"
                            className="flex cursor-pointer items-end justify-center gap-8"
                        >
                            {/* Each hog moves a third of its width toward the other, so they meet in the middle */}
                            <motion.div
                                initial={false}
                                animate={{ x: hugging ? '33%' : '0%', rotate: hugging ? 6 : 0 }}
                                transition={hugTransition}
                            >
                                <HoggieImage src={hedgehogHeartPng} crop={HEART_CROP} className="w-28 @md:w-36" />
                            </motion.div>
                            <motion.div
                                initial={false}
                                animate={{ x: hugging ? '-33%' : '0%', rotate: hugging ? -6 : 0 }}
                                transition={hugTransition}
                            >
                                <HoggieImage
                                    src={hedgehogHeartPng}
                                    crop={HEART_CROP}
                                    mirror
                                    className="w-28 @md:w-36"
                                />
                            </motion.div>
                        </button>

                        <OSButton variant="primary" size="md" className="mt-6" onClick={sendHug}>
                            Send a hug
                        </OSButton>
                        <p className="mt-2 mb-0 text-sm text-secondary" aria-live="polite">
                            {hugsSent === 0
                                ? 'No hugs sent yet.'
                                : `You've sent ${hugsSent.toLocaleString()} ${hugsSent === 1 ? 'hug' : 'hugs'}. 🦔`}
                        </p>

                        <div className="mt-10 w-full text-left">
                            <h2 className="mt-0 mb-1 text-xl">Hug pricing</h2>
                            <p className="mt-0 mb-3 text-sm text-secondary">
                                Volume discounts apply automatically. The price is already $0.
                            </p>
                            <OSTable columns={pricingColumns} rows={pricingRows} size="sm" width="full" />
                        </div>
                    </div>
                </ScrollArea>
            </Explorer>
        </>
    )
}

export default PostHugPage
