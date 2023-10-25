import { CallToAction } from 'components/CallToAction/index.tsx'
import { SEO } from 'components/seo'
import React from 'react'
import Layout from 'components/Layout'
import { SignupCTA } from 'components/SignupCTA'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { useState } from 'react'
import Recorder from 'components/Recorder'

export default function BookADemo() {
    const [recorderOpen, setRecorderOpen] = useState(false)
    const [step, setStep] = useState('pre')

    const handleClose = () => {
        if (step === 'pre') setRecorderOpen(false)
    }

    return (
        <Layout>
            <SEO title="Book a demo – PostHog" />
            <section className="px-4 lg:pb-8 py-4 max-w-6xl mx-auto flex flex-col">
                <header className="flex flex-col md:flex-row justify-between md:items-center pb-4 order-1">
                    <div>
                        <h1 className="text-4xl mt-0 mb-2">Watch a demo</h1>
                        <p className="md:m-0 p-0">
                            PostHog Cloud is 100% self-serve. Check out the demo below and sign up to kick the tires.
                        </p>
                    </div>
                    <aside className="flex space-x-4">
                        <SignupCTA>Get started - free</SignupCTA>
                        {/* <CallToAction type="secondary" to="/contact-sales">
                            Talk to sales
                        </CallToAction> */}
                    </aside>
                </header>
                <div className="border border-light dark:border-dark bg-accent dark:bg-accent-dark rounded p-4 flex space-x-4 mb-4 order-3 md:order-2">
                    <span className="bg-blue rounded-full leading-none flex h-12 w-12 overflow-hidden shrink-0 basis-12">
                        <StaticImage
                            src="../images/simon.png"
                            width={60}
                            height={60}
                            alt="Simon"
                            className="h-full w-full"
                        />
                    </span>

                    <div className="md:flex items-center md:space-x-4">
                        <p className="mb-2 md:mb-0 text-[15px]">
                            <Link to="/community/profiles/49">Simon Fisher</Link>, our Customer Success Lead, made this
                            demo video. If you have bespoke needs that aren't covered here, he's happy to chat.
                        </p>

                        <CallToAction type="secondary" to="/contact-sales" className="whitespace-nowrap">
                            Request a call
                        </CallToAction>
                    </div>
                </div>
                <div className="border border-light dark:border-dark bg-accent dark:bg-accent-dark rounded p-4 flex space-x-4 mb-4 order-3 md:order-2">
                    <div className="md:flex items-center md:space-x-4">
                        <p className="mb-2 md:mb-0 text-[15px]">
                            Have a quick question? Record a video with your question and we'll get back to you.
                        </p>
                        <CallToAction type="secondary" size="sm" to="/record-question">
                            Record a video question
                        </CallToAction>
                        {recorderOpen && (
                            <div className="absolute w-screen h-screen">
                                <div className="fixed inset-0 overflow-y-auto z-[5000000]">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                                        <div className="w-fit transform rounded bg-white p-6 text-left align-middle shadow-xl transition-all z-[5000001]">
                                            <Recorder
                                                step={step}
                                                setStep={setStep}
                                                open={recorderOpen}
                                                setOpen={setRecorderOpen}
                                            />
                                        </div>
                                        <div
                                            className="fixed inset-0 bg-black bg-opacity-25 z-[5000000]"
                                            onClick={handleClose}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <iframe
                    src="https://www.youtube-nocookie.com/embed/BPDmpepEwSY"
                    className="rounded shadow-xl order-2 md:order-3"
                />
            </section>

            <section className="px-4 lg:pb-12 py-4 max-w-6xl mx-auto flex flex-col">
                <div className="lg:border border-light dark:border-dark lg:bg-accent dark:lg:bg-accent-dark rounded lg:py-6 lg:px-8 flex items-center mb-12 lg:mb-8">
                    <div className="w-full md:flex items-center md:space-x-4">
                        <div className="flex-1">
                            <h4 className="text-2xl mb-0">PostHog for startups</h4>
                            <p className="p-0 mb-3 lg:mb-0 text-sm lg:text-base">
                                Our startup program offers $50,000 in credits, plus other great benefits.
                            </p>
                        </div>
                        <CallToAction type="secondary" to="/startups" className="whitespace-nowrap">
                            Learn more
                        </CallToAction>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
