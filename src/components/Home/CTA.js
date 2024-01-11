import { CallToAction } from 'components/CallToAction'
import React, { useEffect, useState } from 'react'
import { heading, section } from './classes'
import Link from 'components/Link'
import { Bang, Eco, TrendUp } from 'components/Icons'
import { StaticImage } from 'gatsby-plugin-image'
import usePostHog from 'hooks/usePostHog'
import Modal from 'components/Modal'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const ProductDetails = () => (
    <>
        <span className="bg-green inline-flex items-center gap-1 px-2 py-1 rounded-sm">
            <span className="w-3 h-3">
                <Eco />
            </span>
            <span className="uppercase font-semibold text-xs text-white">Eco-friendly</span>
        </span>
        <p className="text-4xl font-bold m-0 md:mt-2">PostHog Cloud</p>
        <p className="opacity-50 m-0 mb-4 text-sm">Digital download*</p>
    </>
)

export default function CTA() {
    const posthog = usePostHog()
    const [version, setVersion] = useState('us')
    const [signupCountToday, setSignupCountToday] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true })

    useEffect(() => {
        if (posthog?.isFeatureEnabled('direct-to-eu-cloud')) {
            setVersion('eu')
        }
        fetch(`/api/signup-count`)
            .then((res) => res.json())
            .then((count) => setSignupCountToday(count))
            .catch((err) => console.error(err))
    }, [])

    return (
        <>
            <Modal open={modalOpen} setOpen={setModalOpen}>
                <div className="px-5">
                    <div className="max-w-4xl mx-auto mt-12 relative rounded-md overflow-hidden">
                        <iframe
                            className="m-0"
                            width="100%"
                            height="400"
                            src="https://app.posthog.com/embedded/gQMqaRP0ZH0V3P3XXrSDnNcqDGoe7Q?refresh=true"
                        />
                    </div>
                </div>
            </Modal>
            <section ref={ref} className="pt-8 md:pt-0 px-5 lg:px-0 overflow-hidden">
                {inView && (
                    <motion.div
                        transition={{ delay: 1, duration: 0.5 }}
                        initial={{ translateX: '100%', opacity: 0 }}
                        animate={{ translateX: '-2rem', opacity: 1 }}
                        className="absolute bottom-0 right-0 xl:block hidden -z-10"
                    >
                        <StaticImage loading="eager" placeholder="none" width={300} src="./images/conversion-hog.png" />
                    </motion.div>
                )}
                <h2 className={heading('lg')}>
                    This is the <span className="text-red inline-block">call to action.</span>
                </h2>
                <h3 className={heading('sm')}>
                    If nothing else has sold you on PostHog, hopefully these classic marketing tactics will.
                </h3>

                <div className="md:hidden py-12">
                    <ProductDetails />
                </div>

                <div className="md:grid grid-cols-2 gap-16 md:pt-24 pb-16 max-w-5xl mx-auto">
                    <div className="relative text-right">
                        <div className="mb-2">
                            <StaticImage src="./images/cloud-cd.jpg" alt="PostHog Cloud" className="max-w-[443px]" />
                        </div>
                        <div className="absolute -left-4 bottom-12 md:left-[-8px] md:bottom-24">
                            <StaticImage
                                src="./images/g2-badge.png"
                                alt="People on G2 think we're great"
                                className="w-[90px]"
                            />
                        </div>

                        {inView && (
                            <motion.div
                                transition={{ duration: 1, type: 'tween' }}
                                initial={{ translateX: '-100vw' }}
                                animate={{ translateX: 0 }}
                                className="bg-blue text-left leading-none px-4 py-2 absolute -top-12 md:-top-8 left-4 right-4 lg:-left-16 md:right-auto rounded md:rounded-none"
                            >
                                <span className="text-sm font-bold text-white">
                                    3 people <span className="text-xs text-normal">(would have)</span> added PostHog to
                                    their cart*
                                </span>
                                <br />
                                <span className="text-xs text-white">*if this were a real cart</span>
                            </motion.div>
                        )}
                        <div className="absolute top-4 md:-top-16 -right-12">
                            <div className="relative">
                                <Bang className="w-[189px] animate-grow" />
                                <p className="px-8 text-center m-0 absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center text-black uppercase leading-none font-bold text-lg rotate-6">
                                    <span className="text-xs">Not</span>
                                    endorsed <br />
                                    by Kim K
                                </p>
                            </div>
                        </div>
                        <p className="text-xs opacity-60 text-right">
                            *PostHog is a web product and cannot be installed by CD.
                            <br />
                            We <em>did</em> once send some customers a floppy disk but it was a Rickroll.
                        </p>
                    </div>
                    <div>
                        <div className="hidden md:block">
                            <ProductDetails />
                        </div>

                        <ul className="p-0 m-0 space-y-5">
                            <li className="list-none">
                                <strong className="text-lg block pb-1">Select your cloud</strong>
                                <ul className="flex gap-2 p-0 list-none">
                                    <li>
                                        <button
                                            onClick={() => setVersion('us')}
                                            className={`py-2 px-3 font-bold border ${
                                                version === 'us'
                                                    ? 'border-black dark:border-white'
                                                    : 'border-transparent dark:border-transparent'
                                            }  hover:border-black dark:hover:border-white`}
                                        >
                                            US (Virginia)
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setVersion('eu')}
                                            className={`py-2 px-3 font-bold border ${
                                                version === 'eu'
                                                    ? 'border-black dark:border-white'
                                                    : 'border-transparent dark:border-transparent'
                                            }  hover:border-black dark:hover:border-white`}
                                        >
                                            EU (Frankfurt)
                                        </button>
                                    </li>
                                </ul>
                            </li>
                            <li className="list-none">
                                <strong className="text-lg block">Starts at:</strong>
                                <div className="flex items-baseline gap-1">
                                    <s className="font-bold text-xl">$0</s>
                                    <span className="font-bold text-red text-xl uppercase">Free</span>
                                    <span className="text-xs opacity-50">
                                        &gt;<span className="text-sm">1 left at this price!!</span>
                                    </span>
                                </div>
                            </li>
                        </ul>

                        <div className="py-6">
                            <CallToAction
                                type="primary"
                                size="absurd"
                                width="64"
                                to={`https://${version === 'us' ? 'app' : 'eu'}.posthog.com/signup`}
                                className="animate-grow-sm"
                            >
                                Get started
                            </CallToAction>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="bg-accent dark:bg-accent-dark rounded h-8 w-8 p-1">
                                <TrendUp className="opacity-75" />
                            </span>
                            <p className="text-sm text-primary/50 dark:text-primary-dark/50 leading-tight mb-0">
                                <strong>Hurry:</strong> {signupCountToday || 'Tons of '} companies signed up{' '}
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="font-bold dark:text-yellow text-red"
                                >
                                    today
                                </button>
                                . <br className="hidden sm:block" />
                                Act now and get $0 off your first order.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
