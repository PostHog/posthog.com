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
                                number: { value: 200 },
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

                    <div className="flex flex-col my-16 text-center">
                        <p className="font-semibold">Even engineers need hugs every now and again. 🥺</p>

                        <p>Seeing as how we can't literally give you a hug, here is the next best thing:</p>

                        <img
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/max_hug_animated_e7732738d5.gif"
                            alt="Hugging hedgehogs"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PostHugPage
