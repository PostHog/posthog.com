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
        title: 'Why PostHog AI exists',
        children: (
            <>
                <div className="col-span-4 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-4 @3xl:pb-20">
                    <p>Humans can hold about 4–7 things in working memory.</p>
                    <p>Products generate trillions of data points per day.</p>
                    <p>Trying to hold all that context at once would cook your brain.</p>
                    <p>
                        PostHog AI widens your mental bandwidth. It carries the data load so you can focus on the parts
                        that matter: <strong>creativity, intuition, and deciding what to build next.</strong>
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
        title: 'Ask your question (anywhere)',
        children: (
            <>
                <div className="col-span-5 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-4 @3xl:pb-20">
                    <p>
                        You're already in PostHog looking at a dashboard or SQL query. PostHog AI sees what you see, so
                        you can just... ask.{' '}
                    </p>
                    <p>
                        Watching a session replay where someone's clearly stuck? Ask "are other users having this
                        problem?"
                    </p>
                    <p>
                        Wondering what happened with that feature flag? Ask "how did this rollout affect conversions?"
                    </p>
                    <p>
                        Instead of trying to figure out which events, properties, and filters to use, just ask PostHog
                        AI to run the analysis.
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
        title: 'Get answers you can investigate',
        children: (
            <>
                <div className="col-span-5 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-10">
                    <p>
                        PostHog AI doesn't run on hunches. It connects the dots across actual data — analytics, event
                        names, feature flags, session replays.
                    </p>
                    <p>
                        Chain of thought takes up space, but we show it anyway because sometimes AI gets things wrong.
                        See the exact queries being run. Click through to debug (or to be amazed by the wizard behind
                        the curtain).
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
        title: 'AI that gets out of your way',
        children: (
            <>
                <div className="col-span-5 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-4 @3xl:pb-20">
                    <p>Hopping between tabs and tools is the opposite of a workflow.</p>
                    <p>
                        Every time you jump from PostHog to ChatGPT to ask about your data, then back to PostHog to
                        verify it, you're burning half an hour of deep work.
                    </p>
                    <p>
                        When AI is native to the product, it keeps you in flow. Ask a question, get an answer,
                        investigate the data, ask a follow-up. Add it up, and that’s real time savings.
                    </p>
                </div>

                <div className="col-span-3 -mt-4 @3xl:-mt-8 @3xl:pb-8 text-center">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_10346_8043a91132.png"
                        width={220}
                    />
                    <p className="text-xs text-secondary mt-2 text-center">
                        Context switching takes about 23 minutes to recover from.
                    </p>
                </div>
            </>
        ),
    },
    {
        title: 'What makes this possible',
        children: (
            <>
                <div className="col-span-4 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-12 @3xl:pb-20">
                    <p>Simply put, we have more data. PostHog captures signals from:</p>
                    <p>
                        <span className="text-primary mr-2">•</span>Analytics (what users do)
                        <br />
                        <span className="text-primary mr-2">•</span>Session replays (how they do it)
                        <br />
                        <span className="text-primary mr-2">•</span>Feature flags (what changed)
                        <br />
                        <span className="text-primary mr-2">•</span>A/B tests (what worked)
                        <br />
                        <span className="text-primary mr-2">•</span>Error logs (what broke)
                        <br />
                        <span className="text-primary mr-2">•</span>Surveys (what they said)
                    </p>
                    <p>PostHog AI then connects the dots across your entire product to arrive at richer conclusions.</p>
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
                    <p>People who don't want their intuition to atrophy. People who like to see how things work.</p>
                    <p>People who want leverage without sacrificing understanding.</p>
                    <p>PostHog AI is a no-brainer for product teams that love to think.</p>
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
    {
        title: "How we're different",
        children: (
            <>
                <div className="col-span-5 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-4 @3xl:pb-20">
                    <p>
                        We're not married to one model. Other companies built their own AI or locked into partnerships.
                        We switch models to give you the best results for each use case.
                    </p>
                </div>

                <div className="col-span-3 -mt-4 @3xl:-mt-8 @3xl:pb-8 text-center">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/h_1000,c_limit,q_auto,f_auto/keyboard_garden_light_33abf319fe.png"
                        width={200}
                    />
                </div>
            </>
        ),
    },
    {
        title: 'The three laws of AI',
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

const us = [
    {
        title: '"I have a question about the product."',

        children: (
            <>
                <div className="col-span-6 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-8 @3xl:pb-20">
                    <p className="leading-relaxed">
                        <em>"How much does it cost?"</em> <Link href="/pricing">It's on our website.</Link>
                        <br />
                        <em>"How does it work?"</em>{' '}
                        <Link href="https://app.posthog.com/signup">
                            Just sign up and try it - no credit card required.
                        </Link>
                        <br />
                        <em>"Do you do discounts?"</em>{' '}
                        <Link href="/handbook/growth/sales/contracts">It's in our handbook.</Link>
                        <br />
                        <em>"Can I get a quick demo?"</em>{' '}
                        <Link href="/demo">Watch a pre-recorded demo on our website.</Link>
                    </p>
                    <p>
                        Still need a personalized demo after all that?{' '}
                        <Link href="/talk-to-a-human">Book a call with a technical account exec</Link> - no SDRs, no
                        qualifying calls, no BS.
                    </p>
                </div>

                <div className="col-span-2 -mt-6 pb-8 text-center">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        loading="eager"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/drake-hog-yes.png"
                        width={234}
                        imgClassName="max-w-full"
                    />
                </div>
            </>
        ),
    },
    {
        title: 'Personalized demo with technical person',

        children: (
            <>
                <div className="col-span-5 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl @3xl:pb-24">
                    <p>
                        Get booked on a demo call with a technical person who will spend 90% of the call in the PostHog
                        app, not chatting about our vision. They will use the info you've shared to customize the demo.
                    </p>
                    <p>
                        Yes, we'll even talk to you about how to manage your costs! If it turns out we can help you over
                        a couple of emails, we'll do that instead - less time in meetings for you, means more time
                        building.
                    </p>
                </div>

                <div className="col-span-3 text-center rotate-2 pb-4 pr-2">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/posthog-ae.png"
                        width={436}
                    />
                </div>
            </>
        ),
    },
    {
        title: 'Zero to implementation in a week',
        children: (
            <>
                <div className="col-span-4 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-4 @3xl:pb-20">
                    <p>
                        After the call, the same person will quickly follow up with targeted, useful information about
                        your specific use case.
                    </p>
                    <p>
                        If you're looking at spending $20k+ annually with us, we'll get you into a shared Slack channel
                        with our team. <strong>The goal is to get you into a short trial period</strong> where you're
                        implementing and seeing value from PostHog{' '}
                        <em>
                            <strong>within a week</strong>
                        </em>{' '}
                        - still free!
                    </p>
                    <p>If PostHog isn't the right fit for you, we'll let you know our honest opinion!</p>
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
        title: 'Choose your own discount',

        children: (
            <>
                <div className="col-span-4 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-4 @3xl:pb-20">
                    <p>
                        Want to negotiate a discount for longer commitment? Sure thing - take your pick{' '}
                        <Link href="/handbook/growth/sales/contracts">from our website</Link>! We believe this should be
                        transparent too.
                    </p>
                    <p className="text-xs text-secondary">
                        P.S. If you ask for free <Link href="/merch">merch</Link>, our team is legally obliged to say
                        yes.
                    </p>
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
        title: 'Besties forever?',
        children: (
            <>
                <div className="col-span-8 pl-1 @3xl:pl-9 [&_p]:mb-2">
                    <p>
                        Contract signed - now you get passed onto… wait is that still the same person who did the
                        initial demo and knows everything about me? And they will be my main point of contact for
                        anything support-related?!
                    </p>
                    <p>This is going to work out well.</p>

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
                            <h3>Put AI to work for you</h3>
                            <p>
                                Most AI products promise to automate everything and make you obsolete. PostHog AI works
                                differently. We're building tools that expand what you can think about, not replace your
                                thinking.
                            </p>

                            <p>
                                See how we think about AI at PostHog, and a get glimpse of the future we’re building
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
                description="Most companies want to feel out how much they can squeeze out of you with AI. PostHog operates differently."
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
