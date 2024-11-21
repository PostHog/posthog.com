import React, { useCallback, useState } from 'react'
import HugHog from 'components/HugHog'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { motion } from 'framer-motion'
import Particles from 'react-tsparticles'
import { loadStarsPreset } from 'tsparticles-preset-stars'

const PostHugPage = () => {
    const [active, setActive] = useState(false)
    const particlesInit = useCallback(async (engine) => {
        await loadStarsPreset(engine)
    }, [])

    return (
        <Layout>
            <SEO title="PostHug" description="Free hedgehugs." image={`/images/about.png`} />

            <div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Particles
                        init={particlesInit}
                        className="w-full h-full absolute inset-0 -z-10"
                        options={{
                            preset: 'stars',
                            fullScreen: false,
                            background: { color: 'transparent' },
                            interactivity: { enable: false },
                            particles: {
                                color: { value: '#FF0000' },
                                move: { speed: 5 },
                            },
                        }}
                    />
                </motion.div>

                <div className="max-w-2xl mx-auto py-8 px-4 md:px-8 z-10">
                    <h1 className="text-4xl text-center">
                        You were probably looking for
                        <a href="/">
                            <div className="text-center my-8">
                                <img src="/brand/posthog-logo.svg" className="dark:hidden w-full" />
                                <img src="/brand/posthog-logo-white.svg" className="hidden dark:block w-full" />
                            </div>
                        </a>
                    </h1>

                    <div className="my-16 space-y-2 text-balance text-center">
                        <p className="font-semibold">Even engineers need hugs every now and again. 🥺</p>

                        <p>Seeing as how we can't literally give you a hug, here is the next best thing:</p>

                        <HugHog onClick={() => setActive(!active)} active={active} className="py-16 w-full" />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PostHugPage
