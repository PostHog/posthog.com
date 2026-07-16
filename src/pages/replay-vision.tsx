import React, { useState } from 'react'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import {
    IconCode,
    IconWarning,
    IconDocument,
    IconCursorClick,
    IconSort,
    IconTrending,
    IconCheckCircle,
    IconLlmPromptEvaluation,
} from '@posthog/icons'
import OSButton from 'components/OSButton'
import { WaitlistForm } from 'components/WaitlistForm'
import CloudinaryImage from 'components/CloudinaryImage'

const SURVEY_ID = '019e82bb-e78f-0000-7141-addb508840d4'

const scannerCards = [
    {
        icon: IconCode,
        color: 'text-purple',
        bgColor: 'bg-purple/10',
        title: 'Create from scratch',
        description: 'Build a fully custom scanner with your own prompt and configuration.',
    },
    {
        icon: IconWarning,
        color: 'text-red',
        bgColor: 'bg-red/10',
        title: 'Dead ends',
        description: 'Catch the moment someone hits a wall, stares at it, and rage-quits.',
    },
    {
        icon: IconDocument,
        color: 'text-seagreen',
        bgColor: 'bg-green/10',
        title: 'Session summary',
        description: "The TL;DR of the session, so you don't have to sit through 14 minutes of someone scrolling.",
    },
    {
        icon: IconCursorClick,
        color: 'text-blue',
        bgColor: 'bg-blue/10',
        title: 'User intent',
        description: 'Classify the session by what the user appeared to be trying to do.',
    },
    {
        icon: IconTrending,
        color: 'text-yellow',
        bgColor: 'bg-yellow/10',
        title: 'Frustration score',
        description: 'Rate how mad the page made someone, from mild sigh to keyboard-smash.',
    },
    {
        icon: IconCheckCircle,
        color: 'text-teal',
        bgColor: 'bg-teal/10',
        title: 'Session outcome',
        description: 'Tag each session with what actually happened - task completed, abandoned, errored, etc.',
    },
]

const useCaseCards = [
    {
        icon: IconWarning,
        color: 'text-red',
        title: 'Find the bugs that hurt',
        description: 'Surface errors that were actually visible to users and blocked them from finishing a task.',
    },
    {
        icon: IconTrending,
        color: 'text-yellow',
        title: 'Stop watching sessions at random',
        description:
            "The scorer ranks your sessions according to relevance, so you won't waste time watching sessions that don't matter.",
    },
    {
        icon: IconCursorClick,
        color: 'text-blue',
        title: 'Spot patterns without losing your afternoon',
        description:
            'Sessions get tagged automatically, so finding out where people get stuck on mobile checkout is just a search away.',
    },
]

function HeroSection() {
    const [showForm, setShowForm] = useState(false)

    return (
        <section className="my-6 @4xl/editor:mb-16 tracking-[-0.0125em] max-w-3xl mx-auto px-4 @xl:px-8">
            <div className="mb-8 ">
                <div className="mb-6 flex justify-center @2xl:hidden">
                    <CloudinaryImage
                        className="max-w-[350px] w-full"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/600898537_01bdccfb_7418_4248_8075_d00a62a810e3_06c543f11b.svg"
                    />
                </div>
                <div className="flex items-start gap-2 mb-3">
                    <IconLlmPromptEvaluation className="size-6 text-yellow" />
                    <span className="text-base font-semibold">Replay Vision</span>
                </div>
                <h1 className="text-xl @xl:text-3xl font-bold leading-tight mb-4 @xl:mb-6 !mt-0">
                    The fast-forward button for session replay.
                </h1>
                <div className="flex items-start gap-6">
                    <div className="flex-1">
                        <p className="text-base @xl:text-lg leading-relaxed mb-6">
                            Point an AI scanner at your recordings, and let it watch every session for you: flagging
                            bugs, scoring frustration, tagging behavior, and summarizing what happened. You get the
                            findings, while <strong>Replay Vision</strong> does the homework.
                        </p>
                        <div className="@container max-w-sm">
                            {showForm ? (
                                <WaitlistForm
                                    autoFocus
                                    showDiscord={false}
                                    productHandle="replay_vision"
                                    productName="Replay Vision"
                                    surveyId={SURVEY_ID}
                                />
                            ) : (
                                <div className="flex flex-wrap items-center gap-2">
                                    <OSButton variant="primary" size="lg" onClick={() => setShowForm(true)}>
                                        Join the waitlist
                                    </OSButton>
                                </div>
                            )}
                        </div>
                    </div>
                    <CloudinaryImage
                        className="max-w-[324px] w-full hidden @2xl:block"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/600898537_01bdccfb_7418_4248_8075_d00a62a810e3_06c543f11b.svg"
                    />
                </div>
            </div>
        </section>
    )
}

function HowItWorks() {
    return (
        <section className="relative mb-8 @xl:mb-16">
            <h2 className="text-2xl font-bold mb-2">How it works</h2>
            <p className="mb-6">
                Replay Vision runs scanners: AI agents you configure and point at your sessions. Set a trigger, pick
                what you want it to look for, and it runs across every matching recording automatically.
            </p>

            <div className="grid @md:grid-cols-2 @2xl:grid-cols-3 gap-4 mb-6">
                {scannerCards.map(({ icon: Icon, color, bgColor, title, description }) => (
                    <div key={title} className={`rounded-md border border-primary p-4 ${bgColor}`}>
                        <div className="flex items-center gap-2 mb-2">
                            <Icon className={`size-5 ${color}`} />
                            <h3 className="text-base font-bold m-0">{title}</h3>
                        </div>
                        <p className="text-sm m-0 text-secondary">{description}</p>
                    </div>
                ))}
            </div>

            <p className="text-sm text-secondary">
                Every observation comes with a confidence score and links straight to the exact moment in the recording,
                so you can verify it in one click.
            </p>
        </section>
    )
}

function UseCases() {
    return (
        <section className="relative mb-8 @xl:mb-16">
            <h2 className="text-2xl font-bold mb-6">What you'd actually use it for</h2>

            <ul className="divide-y divide-border">
                {useCaseCards.map(({ icon: Icon, color, title, description }, i) => (
                    <li
                        key={title}
                        className={`pl-8 relative ${
                            i === 0 ? 'pb-4' : i === useCaseCards.length - 1 ? 'pt-4' : 'py-4'
                        }`}
                    >
                        <Icon className={`size-6 absolute left-0 ${i === 0 ? 'top-0.5' : 'top-[1.125rem]'} ${color}`} />
                        <h3 className="text-base font-bold mb-0">{title}</h3>
                        <p className="text-sm mt-1 mb-0 text-secondary">{description}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}

function HonestBit() {
    return (
        <section className="relative mb-8 @xl:mb-16">
            <h2 className="text-2xl font-bold mb-2">The honest bit</h2>
            <p className="mb-6">
                It's early. Replay Vision is getting near a closed beta. We're rolling access out in batches so we can
                actually talk to the people using it and get the quality right before we go wide. Join the list and
                you'll be near the front.
            </p>
            <div className="max-w-lg @container bg-yellow/10 border border-yellow rounded-md px-8 py-6 shadow-xl">
                <WaitlistForm
                    productHandle="replay_vision"
                    productName="Replay Vision"
                    surveyId={SURVEY_ID}
                    showDiscord={false}
                />
            </div>
        </section>
    )
}

export default function ReplayVisionPage() {
    return (
        <>
            <SEO
                title="Replay Vision - PostHog"
                description="Point an AI scanner at your recordings, and let it watch every session for you: flagging bugs, scoring frustration, tagging behavior, and summarizing what happened."
                image="https://res.cloudinary.com/dmukukwp6/image/upload/doctor_hogs_sub_ff499630e0.jpg"
                imageType="absolute"
            />
            <Editor slug="/replay-vision" maxWidth="100%" hasPadding={false}>
                <div className="@container not-prose font-rounded">
                    <header className="relative mb-12">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_9608fcca70.png"
                            className="dark:hidden absolute inset-0"
                            imgClassName="h-full w-full"
                        />
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_dark_a92b0e022d.png"
                            className="hidden dark:block absolute inset-0"
                            imgClassName="h-full w-full"
                        />
                        <div className="relative flex flex-col items-center w-full py-4">
                            <HeroSection />
                        </div>
                    </header>

                    <div className="max-w-3xl mx-auto px-4 @xl:px-8">
                        <HowItWorks />
                        <UseCases />
                        <HonestBit />
                    </div>
                </div>
            </Editor>
        </>
    )
}
