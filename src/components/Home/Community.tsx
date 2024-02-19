import React, { useCallback } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import Particles from 'react-tsparticles'
import { loadStarsPreset } from 'tsparticles-preset-stars'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'

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
        <div ref={ref} className="relative">
            {inView && (websiteTheme === 'dark' ? <Stars /> : null)}
            <div className="w-full overflow-x-hidden">
                <div className="relative -mt-28 md:mt-0 top-28 sm:top-44 md:top-12 lg:top-12 lg:mt-12 xl:top-16 px-4 md:px-0 z-40">
                    <h2 className="m-0 pb-2 px-4 text-4xl md:text-6xl text-center leading-0 md:leading-none">
                        Join our <span className="text-red dark:text-yellow">open source</span> community
                    </h2>
                    <p className="text-center md:text-lg max-w-lg lg:max-w-xl leading-tight mx-auto my-0 p-0">
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
                <section className="relative [zoom:1.5] left-[-20%] md:left-0 md:mt-0 md:[zoom:1]">
                    <div className="transition-opacity opacity-100 dark:hidden dark:opacity-0">
                        <StaticImage src="./images/community-light.png" className="w-[150%] md:w-full" />
                    </div>
                    <div className="transition-opacity hidden opacity-0 dark:block dark:opacity-100">
                        <StaticImage src="./images/community-dark.png" className="w-[150%] md:w-full" />
                    </div>
                    <CommunityStat
                        count="110k+"
                        label={
                            <>
                                Developer <br className="xl:hidden" />
                                community
                            </>
                        }
                        className="left-[20.75vw] sm:left-[20.75vw] md:left-[21vw] mdlg:left-[20.75vw] lg:left-[21.5vw] xl:left-[20vw] 2xl:left-[19.75vw] top-[29.5vw] sm:top-[30vw] md:top-[30vw] lg:top-[30vw] xl:top-[31vw] -rotate-[4deg]"
                    />
                    <CommunityStat
                        count="411"
                        label="Contributors"
                        className="left-[42.5vw] sm:left-[42.5vw] md:left-[42vw] lg:left-[42.75vw] xl:left-[43.5vw] 2xl:left-[43.5vw] top-[40.5vw] sm:top-[41vw] md:top-[40vw] mdlg:top-[40.5vw] lg:top-[40.5vw] xl:top-[41vw] -rotate-[1.5deg]"
                    />
                    <CommunityStat
                        count="100b+"
                        label="Events tracked"
                        className="left-[62.75vw] sm:left-[62.75vw] md:left-[62vw] lg:left-[63vw] xl:left-[63.75vw] 2xl:left-[63.75vw] top-[51vw] sm:top-[51vw] md:top-[50.5vw] lg:top-[51vw] 2xl:top-[51vw] -rotate-1"
                    />
                </section>
            </div>
        </div>
    )
}
