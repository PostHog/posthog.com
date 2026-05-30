import CloudinaryImage from 'components/CloudinaryImage'
import React, { useEffect, useRef, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import Tooltip from 'components/RadixUI/Tooltip'
import { IconArrowRight, IconMinus, IconPlus } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import Logo from 'components/Logo'
import { motion } from 'framer-motion'
import Wizard from 'components/Wizard'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import SuggestedLinksBlock from 'components/SuggestedLinksBlock'

const them = [
    {
        title: 'The problem with product work today',
        children: (
            <>
                <div className="col-span-4 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-4 @3xl:pb-20">
                    <p>Even with AI everywhere, product teams still spend hours answering basic questions. </p>
                    <p>
                        Not because the answers are hard, but because the data is split across tools. Analytics,
                        replays, errors, flags, experiments, surveys - each shows a slice of reality, none show the
                        whole thing.
                    </p>
                    <p>
                        When AI is native to the product, it keeps you in flow. Ask a question, get an answer,
                        investigate the data, ask a follow-up. Add it up, and that’s real time savings.
                    </p>
                </div>

                <div className="col-span-4 -mt-4 pb-6 rotate-2">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Untitled_Artwork_560_a6b8f4f9a4.png"
                        width={436}
                    />
                </div>
            </>
        ),
    },
    {
        title: 'Our objective function (literally)',
        children: (
            <>
                <div className="col-span-5 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-4 @3xl:pb-20">
                    <p>PostHog is a developer platform that brings your product and customer data into one stack.</p>
                    <p>That includes:</p>
                    <p>
                        <span className="text-primary mr-2">•</span>Product and web analytics
                        <br />
                        <span className="text-primary mr-2">•</span>Session replay
                        <br />
                        <span className="text-primary mr-2">•</span>Error tracking
                        <br />
                        <span className="text-primary mr-2">•</span>Feature flags and experiments
                        <br />
                        <span className="text-primary mr-2">•</span>In-app surveys
                        <br />
                        <span className="text-primary mr-2">•</span>A data warehouse connecting other tools
                        <br />
                        <span className="text-primary mr-2">•</span>LLM analytics for AI products
                    </p>
                    <p>Each tool is useful on its own. Together, they form a complete picture.</p>
                    <p>
                        This matters because <strong>AI is only as good as the context you give it.</strong>
                    </p>
                </div>

                <div className="col-span-3 -mt-6 @3xl:-mt-12 pb-4">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Untitled_Artwork_420_3f6e1b29d1.png"
                        width={352}
                    />
                </div>
            </>
        ),
    },
    {
        title: 'Ask questions where the work already is',
        children: (
            <>
                <div className="col-span-5 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-10">
                    <p>
                        You're already in PostHog looking at a dashboard or SQL query. PostHog AI sees what you see, so
                        you can just... ask.
                    </p>
                    <p>
                        <span className="text-primary mr-2">•</span>“Are other users hitting this issue?”
                        <br />
                        <span className="text-primary mr-2">•</span>“What happened after this flag rollout?”
                        <br />
                        <span className="text-primary mr-2">•</span>“Where are users dropping off in onboarding?”
                    </p>
                    <p>
                        No guessing which events or properties to use. No rebuilding context in another tool. Just ask
                        PostHog AI to run the analysis.
                    </p>
                </div>

                <div className="col-span-3 -mt-12">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/wizard_hog_2_6e85a07ff1.png"
                        width={500}
                    />
                </div>
            </>
        ),
    },
    {
        title: 'What makes this possible',
        children: (
            <>
                <div className="col-span-3 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-xl pb-4 @3xl:pb-20">
                    <p>Simply put, we have more data. PostHog captures more signals than point solutions: </p>
                    <p>
                        <span className="text-primary mr-2">•</span>What users do (analytics)
                        <br />
                        <span className="text-primary mr-2">•</span>How they do it (session replays)
                        <br />
                        <span className="text-primary mr-2">•</span>How they feel about it (surveys)
                        <br />
                        <span className="text-primary mr-2">•</span>What changed (feature flags)
                        <br />
                        <span className="text-primary mr-2">•</span>What worked (A/B tests)
                        <br />
                        <span className="text-primary mr-2">•</span>What broke (error logs)
                        <br />
                        <span className="text-primary mr-2">•</span>AI output (LLM analytics)
                    </p>
                    <p>
                        PostHog AI then connects these into a single view of reality. And with 'modes' we're building
                        agentive systems that do specific things really well (not just general purpose AI).
                    </p>
                </div>

                <div className="col-span-5 -mt-6 pb-8 text-center">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_10346_8043a91132.png"
                        width={320}
                    />
                    <p className="text-xs text-secondary mt-2 text-center">
                        Context switching takes about 23 minutes to recover from.
                    </p>
                </div>
            </>
        ),
    },
    {
        title: 'Signal, solution, ship it',
        children: (
            <>
                <div className="col-span-4 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-12 @3xl:pb-20">
                    <p>
                        PostHog AI surfaces real signals about user engagement and product performance. From there, the
                        loop is simple:
                    </p>
                    <p>
                        <strong>1. Singal</strong>
                    </p>
                    <p>Something changes: an error spikes, users struggle, an experiment underperforms.</p>
                    <p>
                        <strong>2. Solution</strong>
                    </p>
                    <p>PostHog AI helps investigate, explains what’s happening, and proposes concrete fixes.</p>
                    <p>
                        <strong>3. Ship it</strong>
                    </p>
                    <p>You ship behind a flag, measure impact, and learn — all in the same system.</p>
                </div>

                <div className="col-span-4 -mt-12 pb-4 text-center">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Untitled_Artwork_8_4e700c89f4.png"
                        width={400}
                    />
                </div>
            </>
        ),
    },
    {
        title: 'Who this is for',
        children: (
            <>
                <div className="col-span-5 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-4 @3xl:pb-20">
                    <p>Builders, tinkerers, skeptics of hype.</p>
                    <p>People who:</p>
                    <p>
                        <span className="text-primary mr-2">•</span>Want leverage without losing understanding
                        <br />
                        <span className="text-primary mr-2">•</span>Like seeing how things work
                        <br />
                        <span className="text-primary mr-2">•</span>Don’t want their intuition to atrophy
                    </p>
                    <p>If you want AI to run on autopilot, we’re not your company. </p>
                    <p>
                        If you want systems that make you sharper, not redundant - you might be interested in what we’re
                        building next.{' '}
                    </p>
                </div>

                <div className="col-span-3 -mt-4 @3xl:-mt-8 @3xl:pb-8 text-center">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Group_9514_d562b785cc.png"
                        width={200}
                    />
                </div>
            </>
        ),
    },
]

const us = [
    {
        title: '"Not another IDE"',

        children: (
            <>
                <div className="col-span-3 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-xl pb-4 @3xl:pb-20">
                    <p>A lot of companies are building AI-powered integrated development environments.</p>
                    <p>Most of them are designed for:</p>
                    <p>
                        <span className="text-primary mr-2">•</span>Generating snippets
                        <br />
                        <span className="text-primary mr-2">•</span>Writing code faster
                        <br />
                        <span className="text-primary mr-2">•</span>Filling in gaps
                        <br />
                    </p>
                    <p>That’s not what we’re optimizing for (though it will do those things).</p>
                </div>

                <div className="col-span-5 -mt-6 pb-8 text-center">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        loading="eager"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Not_another_IDE_c791b29f48.png"
                        width={350}
                        imgClassName="max-w-full"
                    />
                </div>
            </>
        ),
    },
    {
        title: 'Speed without understanding is fragile',
        children: (
            <>
                <div className="col-span-5 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl @3xl:pb-24">
                    <p>
                        Engineers don’t want AI slop. They want the full context and reasoning behind a suggestion. But
                        they also want things to 'just work'.
                    </p>
                    <p>
                        <strong>Fragile AI:</strong>
                    </p>
                    <p>
                        <span className="text-primary mr-2">•</span>Depends on high quality inputs
                        <br />
                        <span className="text-primary mr-2">•</span>Hides uncertainty
                        <br />
                        <span className="text-primary mr-2">•</span>Forces humans to clean up after the fact
                        <br />
                    </p>
                    <p>
                        <strong>Antifragile AI:</strong>
                    </p>
                    <p>
                        <span className="text-primary mr-2">•</span>Expects things to go wrong
                        <br />
                        <span className="text-primary mr-2">•</span>Surfaces uncertainty early
                        <br />
                        <span className="text-primary mr-2">•</span>Fails in small, cheap ways
                        <br />
                        <span className="text-primary mr-2">•</span>Improves through friction
                    </p>
                </div>

                <div className="col-span-3 text-center rotate-2 pb-4 pr-2">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/posthog-ae.png"
                        width={436}
                    />
                    <p className="text-xs text-secondary mt-2 text-center">
                        Antifragile is a term coined by Nassim Nicholas Taleb. Unlike fragile systems, which break under
                        stress, or robust systems, which merely resist it, antifragile systems improve because of
                        stress. Errors, randomness, and volatility aren’t just tolerated — they actively improve the
                        system.
                    </p>
                </div>
            </>
        ),
    },
    {
        title: 'Product autonomy (without losing control)',
        children: (
            <>
                <div className="col-span-4 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-4 @3xl:pb-20">
                    <p>We believe in agentic AI that 'just works' (but not the theatrical kind). In our world:</p>
                    <p>
                        <span className="text-primary mr-2">•</span>AI observes your product data continuously
                        <br />
                        <span className="text-primary mr-2">•</span>It connects signals across data, behavior, and code
                        <br />
                        <span className="text-primary mr-2">•</span>It prepares concrete, well-formed proposals
                        <br />
                        <span className="text-primary mr-2">•</span>It opens pull requests with context and intent
                        <br />
                    </p>
                    <p>
                        Nothing ships without a human decision. <strong>You control the autonomy slider.</strong>
                    </p>
                </div>

                <div className="col-span-4">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/posthog-follow-up.png"
                        width={600}
                    />
                </div>
            </>
        ),
    },
    {
        title: 'Why it will get better over time',
        children: (
            <>
                <div className="col-span-4 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-4 @3xl:pb-20">
                    <p>An antifragile system improves because:</p>
                    <p>
                        <span className="text-primary mr-2">•</span>It sees more edge cases
                        <br />
                        <span className="text-primary mr-2">•</span>It gets corrected often
                        <br />
                        <span className="text-primary mr-2">•</span>It accumulates real-world context (failure mode in
                        this case would be playing it too safe)
                        <br />
                    </p>
                    <p>
                        This same philosophy should apply to every AI tool we build at PostHog. Every time a PR is
                        rejected, a suggestion is edited, a shortcut is not taken, AI should learn and adjust.{' '}
                    </p>
                </div>

                <div className="col-span-4">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/posthog-follow-up.png"
                        width={600}
                    />
                </div>
            </>
        ),
    },
    {
        title: 'The future (this is it)',
        children: (
            <>
                <div className="col-span-4 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-4 @3xl:pb-20">
                    <p>
                        If we get this right, PostHog AI will change how a product engineer starts their day. Right now,
                        it starts with hunting: errors, tickets, replays, traces. You scan everything and guess what
                        matters.
                    </p>
                    <p>That’s not product work. It’s prioritization.</p>
                    <p>
                        In the future, obvious fixes will happen automatically. Everything else will be presented with
                        context. The engineer’s job shifts from fixing problems to deciding what’s worth working on.
                    </p>
                    <p>That’s the direction we’re heading. And it’s already starting to work.</p>
                </div>

                <div className="col-span-4 -mt-8 @3xl:-mt-12 text-center">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/choose-discount.png"
                        width={433}
                    />
                </div>
            </>
        ),
    },
    {
        title: 'Why this future feels calm',
        children: (
            <>
                <div className="col-span-8 pl-1 @3xl:pl-9 [&_p]:mb-2">
                    <p>
                        Most serious thinkers about AGI agree on one thing: intelligence isn't just output. It's
                        judgment, context, values, and knowing when not to act. Systems that try to automate your
                        qualitative research are brittle as a result.
                    </p>
                    <p>How we think about the future of AI at PostHog is pleasingly simple:</p>
                    <p>
                        <strong>1. AI should do continuous, mechanical work: watching, summarizing, proposing.</strong>
                    </p>
                    <p>
                        <strong>
                            2. Humans should do irreducible work: choosing direction, weighing trade-offs, setting
                            taste.
                        </strong>
                    </p>
                    <div className="flex flex-col @3xl:flex-row gap-3 my-4">
                        <CallToAction href="/start" size="md" state={{ newWindow: true }}>
                            Get started - free
                        </CallToAction>
                        <CallToAction href="/demo" type="secondary" size="md" state={{ newWindow: true }}>
                            Watch a demo
                        </CallToAction>
                    </div>

                    <div className="-mx-4 @3xl:ml-[-3.25rem] @3xl:-mr-4">
                        <CloudinaryImage
                            quality={90}
                            placeholder="blurred"
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/celebration.png"
                            layout="fullWidth"
                        />
                    </div>
                </div>
            </>
        ),
        cta: <></>,
    },
    {
        title: 'Bonus: The three laws of AI',
        children: (
            <>
                <div className="col-span-5 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-10 @3xl:pb-20">
                    <p>
                        <strong>
                            1. PostHog AI must not obscure its reasoning or, through opacity, allow a user to trust
                            false outputs
                        </strong>
                    </p>
                    <p>
                        If you can't see how it works, you shouldn't trust it. Chain-of-thought takes up space, but we
                        show it because sometimes AI gets things wrong.
                    </p>
                    <p>
                        <strong>
                            2. PostHog AI must yield to human judgment, except where such judgment would conflict with
                            the First Law
                        </strong>
                    </p>
                    <p>
                        Treat it like a really smart intern, not your CTO. You're the expert on your product and users.
                    </p>
                    <p>
                        <strong>
                            3. PostHog AI must serve to expand human context, as long as such service does not conflict
                            with the First or Second Laws
                        </strong>
                    </p>
                    <p>
                        PostHog AI doesn't make decisions for you or act without permission. It exists as a tool to use
                        at your discretion.
                    </p>
                </div>

                <div className="col-span-3 -mt-4 @3xl:-mt-8 @3xl:pb-8 text-center">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/404_e01bb2c910.png"
                        width={300}
                    />
                    <p className="text-xs text-secondary mt-2 text-center">
                        Isaac Asimov was a science fiction writer a century ahead of his time. His Three Laws of
                        Robotics governed how robots should behave.
                    </p>
                </div>
            </>
        ),
    },
]

const AccordionItem = ({
    index,
    number,
    title,
    children,
    isOpen,
    onClick,
    onNext,
    hasNext,
    cta,
    onAnimationComplete,
}) => {
    const contentRef = useRef(null)

    return (
        <li
            className={`border-t border-primary first:border-transparent first:rounded-t last:rounded-b relative ${
                isOpen ? 'active bg-light dark:bg-dark shadow-lg z-10 overflow-hidden' : 'inactive '
            }`}
        >
            <button
                onClick={onClick}
                className={`text-left pl-3 pr-4 cursor-pointer w-full flex justify-between items-center transition-all rounded relative ${
                    isOpen
                        ? 'pt-4 pb-2 z-20'
                        : 'text-secondary hover:text-primary py-2 hover:bg-accent hover:scale-[1.0025] hover:top-[-.5px] active:scale-[.9999] active:top-[3px]'
                }`}
            >
                <span className="flex gap-2 items-center">
                    <span className="inline-flex w-8 h-8 [flex:0_0_2rem] justify-center items-center p-1 font-semibold rounded-full bg-accent">
                        {number}
                    </span>
                    <span
                        className={`transition-all leading-tight ${
                            isOpen ? 'font-bold text-lg @3xl:text-xl' : 'font-semibold text-[17px]'
                        }`}
                    >
                        {title}
                    </span>
                </span>
                <span>
                    {isOpen ? (
                        <IconMinus className="size-4 inline-block transform rotate-180" />
                    ) : (
                        <IconPlus className="size-4 inline-block transform rotate-0" />
                    )}
                </span>
            </button>
            <motion.div
                onAnimationComplete={onAnimationComplete}
                ref={contentRef}
                animate={{ height: isOpen ? 'auto' : 0, transition: { duration: 0.3, type: 'tween' } }}
                className={isOpen ? '' : 'overflow-hidden'}
            >
                <div className="px-4">
                    <div className="flex flex-col @3xl:grid grid-cols-8 gap-2 justify-between relative">
                        {children}

                        <div className="pb-4 @3xl:pb-0 @3xl:absolute left-9 bottom-6">
                            {hasNext ? (
                                <CallToAction
                                    onClick={onNext}
                                    size="sm"
                                    type="secondary"
                                    className="w-full @3xl:w-auto"
                                >
                                    Next step
                                    <IconArrowRight className="size-4 inline-block ml-1" />
                                </CallToAction>
                            ) : (
                                cta
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </li>
    )
}

const Accordion = ({ items, type, keyboardContainerRef }) => {
    const ref = useRef<HTMLOListElement>(null)
    const [openIndex, setOpenIndex] = useState(0)

    const openNext = () => setOpenIndex((index) => (index === items.length - 1 || index === null ? 0 : index + 1))

    const openPrev = () => setOpenIndex((index) => (index === 0 || index === null ? items.length - 1 : index - 1))

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (keyboardContainerRef?.current?.contains(ref.current)) {
                if (event.key === 'n') {
                    event.preventDefault()
                    openNext()
                }
                if (event.key === 'p') {
                    event.preventDefault()
                    openPrev()
                }
            }
        }
        window.addEventListener('keydown', handler)

        return () => {
            window.removeEventListener('keydown', handler)
        }
    }, [])

    const scrollToIndex = (index) => {
        if (ref.current && window.innerWidth <= 639) {
            const element = ref.current.children[index]
            const y = element.getBoundingClientRect().top + window.scrollY - 56
            window.scrollTo({ top: y, behavior: 'smooth' })
        }
    }

    return (
        <ol ref={ref} className="space-y-px p-0 list-none border border-primary rounded">
            {items.map((item, index) => (
                <AccordionItem
                    onAnimationComplete={({ height }) => {
                        if (height === 'auto') {
                            scrollToIndex(index)
                        }
                    }}
                    key={index}
                    number={index + 1}
                    title={item.title}
                    isOpen={openIndex === index}
                    onClick={() => {
                        if (openIndex !== index) {
                            setOpenIndex(openIndex === index ? null : index)
                        }
                    }}
                    onNext={openNext}
                    hasNext={index < items.length - 1}
                    cta={item.cta}
                >
                    {item.children}
                </AccordionItem>
            ))}
        </ol>
    )
}

export default function HowWeAI() {
    const [slideIndex, setSlideIndex] = useState(0)
    const keyboardContainerRef = useRef(null)
    const [closing, setClosing] = useState(false)

    const totalSlides = 4
    const isFirst = slideIndex === 0
    const isLast = slideIndex === totalSlides - 1

    const slides = [
        // Slide 1: Intro
        {
            content: (
                <div className="prose dark:prose-invert text-primary flex-1 p-8">
                    <h2 className="text-4xl !m-0 p-0">
                        {' '}
                        How we do AI at{' '}
                        <span className="inline-flex items-center gap-2 whitespace-nowrap relative top-3">
                            <Logo noText className="h-12 inline-block" /> PostHog
                        </span>
                    </h2>
                    <div className="grid @3xl:grid-cols-2 @3xl:gap-8 items-center @3xl:items-start">
                        <div className="order-2 @3xl:order-1">
                            <h3>Confused by AI marketing? Same.</h3>
                            <p>
                                Most AI products promise to automate everything and make you obsolete. PostHog AI works
                                differently. We're building tools that expand what you can think about, not replace your
                                thinking.
                            </p>

                            <p>
                                See how we think about AI at PostHog, and get a glimpse of the future we’re building
                                towards.
                            </p>

                            <p className="text-sm text-secondary">
                                <strong>Next up:</strong> <em>How PostHog does AI</em>
                            </p>

                            <OSButton variant="primary" onClick={() => setSlideIndex(1)}>
                                Let's go!
                            </OSButton>
                        </div>
                        <div className="bg-tan rounded-md relative order-1 @3xl:order-2 mt-8 pt-4 pl-8">
                            <div className="dark:hidden">
                                <CloudinaryImage
                                    quality={100}
                                    placeholder="none"
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/hog_laptop_f21eabc727.png"
                                    loading="eager"
                                    objectPosition="left top"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="hidden dark:block">
                                <CloudinaryImage
                                    quality={100}
                                    placeholder="none"
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/hog_laptop_f21eabc727.png"
                                    loading="eager"
                                    objectPosition="left top"
                                    objectFit="cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        // Slide 2: How we think about AI
        {
            content: (
                <div className="flex-1 px-8 py-8">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="mb-6 text-center text-2xl font-bold">How we think about AI at PostHog</h2>
                        <div className="not-prose">
                            <Accordion key="them-accordion" items={them} keyboardContainerRef={keyboardContainerRef} />
                        </div>
                    </div>
                </div>
            ),
        },
        // Slide 3: The future we're building towards
        {
            content: (
                <div className="flex-1 px-8 py-8">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="flex justify-center items-center mb-6 text-2xl font-bold">
                            The future we're building towards
                        </h2>
                        <div className="not-prose">
                            <Accordion key="us-accordion" items={us} keyboardContainerRef={keyboardContainerRef} />
                        </div>
                    </div>
                </div>
            ),
        },
        // Slide 4: Final message
        {
            content: (
                <>
                    <div className="prose dark:prose-invert prose-sm px-8">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-4xl font-bold mb-6">And that's how we do AI</h2>
                            <p className="mb-8 text-balance">
                                This presentation has been brought to you by the same people who thought{' '}
                                <Link to="/terms" state={{ newWindow: true }}>
                                    making the terms and conditions fun
                                </Link>{' '}
                                was a good idea...
                            </p>
                        </div>
                    </div>
                    <div className="w-full max-w-2xl mx-auto">
                        <SuggestedLinksBlock links={['hate', 'pricing', 'careers']} />
                    </div>
                </>
            ),
        },
    ]

    return (
        <>
            <SEO
                title="How we do AI"
                description="Most companies promise to automate everything and make you obsolete. PostHog operates differently."
                image={`/images/og/sales.jpg`}
            />
            <Wizard
                leftNavigation={
                    <>
                        {!isFirst ? (
                            <CallToAction type="secondary" size="sm" onClick={() => setSlideIndex(slideIndex - 1)}>
                                Previous
                            </CallToAction>
                        ) : (
                            <span />
                        )}
                    </>
                }
                rightNavigation={
                    <>
                        {!isLast ? (
                            <CallToAction type="primary" size="sm" onClick={() => setSlideIndex(slideIndex + 1)}>
                                {slideIndex === 0
                                    ? 'See how PostHog does AI'
                                    : slideIndex === 1
                                    ? "See the future we're building towards"
                                    : 'Next'}
                            </CallToAction>
                        ) : (
                            <OSButton onClick={() => setClosing(true)} size="md" variant="primary">
                                Done
                            </OSButton>
                        )}
                    </>
                }
            >
                <ScrollArea className="flex-1 w-full [&>div>div]:h-full [&>div>div]:!flex [&>div>div]:flex-col">
                    {slides[slideIndex].content}
                </ScrollArea>
            </Wizard>
        </>
    )
}
