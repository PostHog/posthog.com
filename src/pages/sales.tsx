import CloudinaryImage from 'components/CloudinaryImage'
import React, { useEffect, useRef, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import Tooltip from 'components/RadixUI/Tooltip'
import { IconArrowRight, IconMinus, IconPlus, IconRedo } from '@posthog/icons'
import { CSSTransition } from 'react-transition-group'
import { CallToAction } from 'components/CallToAction'
import Logo from 'components/Logo'
import { motion } from 'framer-motion'
import Wizard from 'components/Wizard'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import SuggestedLinksBlock from 'components/SuggestedLinksBlock'

const them = [
    {
        title: 'Extract more info than a stalker',
        children: (
            <>
                <div className="col-span-5 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-10">
                    <p>
                        You click 'contact us' and type in a bunch of personal information that has nothing to do with
                        your use of the product.
                    </p>
                    <p>Often times, there's no place to even ask your question.</p>
                    <p>Your phone number is required, even though they'll respond by email.</p>
                </div>

                <div className="col-span-3 rotate-2 -mt-6 mb-6 relative left-3 @3xl:left-0">
                    <div className="dark:hidden">
                        <CloudinaryImage
                            quality={100}
                            placeholder="blurred"
                            loading="eager"
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/demo-form-light.png"
                            width={270}
                        />
                    </div>
                    <div className="hidden dark:block">
                        <CloudinaryImage
                            quality={100}
                            placeholder="blurred"
                            loading="eager"
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/demo-form-dark.png"
                            width={270}
                        />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: 'The discovery call of shame',
        children: (
            <>
                <div className="col-span-5 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-10">
                    <p>Get booked with a junior rep who decides if you are a worthy human being.</p>
                    <p>They will ask you the same questions you already filled out on the form.</p>
                </div>

                <div className="col-span-3 -mt-12">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/sdr.png"
                        width={338}
                    />
                </div>
            </>
        ),
    },
    {
        title: 'Finally, a generic demo!',
        children: (
            <>
                <div className="col-span-4 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-4 @3xl:pb-20">
                    <p>
                        Deemed worthy? They will book you into a further call for a demo with a different person, five
                        minutes of which will cover what you are specifically interested in.
                    </p>
                    <p>No pricing will be revealed. You will be asked the same questions for a third time.</p>
                </div>

                <div className="col-span-4 -mt-4 pb-6 rotate-2">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/sdr-on-zoom.png"
                        width={436}
                    />
                </div>
            </>
        ),
    },
    {
        title: 'The follow up meeting of no hope',
        children: (
            <>
                <div className="col-span-5 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-4 @3xl:pb-20">
                    <p>It's now time to talk about your usage so they can put together a commercial proposal.</p>
                    <p>
                        A quote will be provided at a later date because they need to "circle back with the team" to
                        "see what they can do for you."
                    </p>
                </div>

                <div className="col-span-3 -mt-6 @3xl:-mt-12 pb-4">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/no-hope.png"
                        width={352}
                    />
                </div>
            </>
        ),
    },
    {
        title: 'Sticker shock',
        children: (
            <>
                <div className="col-span-3 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-12 @3xl:pb-20">
                    <p>
                        There will be a long period of commercial wrangling because they massively inflated the price so
                        they can then discount it heavily.
                    </p>
                    <p>They will bundle a bunch of value add-stuff you don't need. 3 year contract is standard.</p>
                </div>

                <div className="col-span-5 text-center -mt-12">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/receipt.png"
                        width={613}
                    />
                </div>
            </>
        ),
    },
    {
        title: '"We don\'t usually do this, but..."',
        children: (
            <>
                <div className="col-span-4 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-12 @3xl:pb-20">
                    <p>
                        Any legal questions require a ton of time seeking 'approval' and coming back with amazing
                        special exceptions they made that were 'really painful' when you know it's all BS.
                    </p>
                </div>

                <div className="col-span-4 -mt-12 pb-4 text-center">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/decision-makers.png"
                        width={286}
                    />
                </div>
            </>
        ),
    },
    {
        title: 'SaaS contract or War and Peace?',
        children: (
            <>
                <div className="col-span-5 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-8 @3xl:pb-20">
                    <p>
                        Eventually sign the contract - hopefully you saw the auto-renewal and mandatory price increases
                        in there! 'Professional services'? Yeah that's just a fancy word for onboarding, but they'll
                        charge you $$$ for it.
                    </p>
                </div>

                <div className="col-span-3 -mt-6">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/contract-negotiation.png"
                        width={369}
                    />
                </div>
            </>
        ),
    },
    {
        title: 'The implementation phase of regret',
        children: (
            <>
                <div className="col-span-4 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-12 @3xl:pb-20">
                    <p>
                        Spend <strong>a few months (!!)</strong> on implementation with yet another person on their
                        team, because the person who demoed isn't technical but has to be the person through whom all
                        comms must flow.
                    </p>
                </div>

                <div className="col-span-4 -mt-8 pb-8 -mx-2 @3xl:mx-0">
                    <div className="dark:hidden">
                        <CloudinaryImage
                            quality={90}
                            placeholder="blurred"
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/gantt-chart-light.png"
                            width={555}
                        />
                    </div>
                    <div className="hidden dark:block">
                        <CloudinaryImage
                            quality={90}
                            placeholder="blurred"
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/gantt-chart-dark.png"
                            width={555}
                        />
                    </div>
                </div>
            </>
        ),
    },
    {
        title: '"Wait, who\'s my point of contact now??"',
        children: (
            <>
                <div className="col-span-5 pl-1 @3xl:pl-9 [&_p]:mb-2 max-w-2xl pb-4 @3xl:pb-20">
                    <p>
                        All the sales people who got you on board immediately disappear and you are passed onto yet
                        another team who ask you the same questions again...
                    </p>
                </div>

                <div className="col-span-3 -mt-4 @3xl:-mt-8 @3xl:pb-8 text-center">
                    <CloudinaryImage
                        quality={90}
                        placeholder="blurred"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/shocked-hog.png"
                        width={200}
                    />
                </div>
            </>
        ),
        cta: (
            <div className="flex flex-col @3xl:flex-row gap-3 my-4">
                <CallToAction href="/start" size="md" state={{ newWindow: true }}>
                    Ew, take me to PostHog, please!
                </CallToAction>
                <CallToAction href="/talk-to-a-human" type="secondary" size="md" state={{ newWindow: true }}>
                    Get a demo (but not like this one!)
                </CallToAction>
            </div>
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

export default function Sales() {
    const [slideIndex, setSlideIndex] = useState(0)
    const keyboardContainerRef = useRef(null)
    const [closing, setClosing] = useState(false)

    const companies = [
        'BureaucraticSoft Inc.',
        'Monolith Enterprises',
        'RigidWorks Technologies',
        'StuffyCorp Solutions',
        'TopDown Tech',
        'Antiquated Systems Inc.',
        'DinosaurTech Industries',
        'HierarchiSoft',
        'CommandAndControl Systems',
        'RedTape Solutions',
    ]

    const [companyName, setCompanyName] = useState('')
    const [show, setShow] = useState(false)
    const companyNameRef = useRef(null)

    const updateCompanyName = () => {
        setShow(false)
        setTimeout(() => {
            let newCompanyName
            do {
                const randomIndex = Math.floor(Math.random() * companies.length)
                newCompanyName = companies[randomIndex]
            } while (newCompanyName === companyName)
            setCompanyName(newCompanyName)
            setShow(true)
        }, 100)
    }

    useEffect(() => {
        updateCompanyName()
    }, [])

    const totalSlides = 4
    const isFirst = slideIndex === 0
    const isLast = slideIndex === totalSlides - 1

    const slides = [
        // Slide 1: Intro
        {
            content: (
                <div className="prose dark:prose-invert text-primary flex-1 p-8">
                    <h1 className="m-0 p-0 text-2xl text-secondary">Compare the sales process:</h1>
                    <h2 className="text-4xl !m-0 p-0">
                        <span className="text-red dark:text-yellow">[Everyone else]</span> vs.{' '}
                        <span className="inline-flex items-center gap-2 whitespace-nowrap relative top-3">
                            <Logo noText className="h-12 inline-block" /> PostHog
                        </span>
                    </h2>
                    <div className="grid @3xl:grid-cols-2 @3xl:gap-8 items-center @3xl:items-start">
                        <div className="order-2 @3xl:order-1">
                            <h3>
                                Call us unhinged, but we believe pricing pages should have actual, um, <em>pricing?</em>
                            </h3>
                            <p>
                                Most SaaS companies want to feel out how much money they can squeeze out of you.{' '}
                                <strong>PostHog operates differently.</strong> We're more like a utility where you pay
                                for what you use. No extra markup - everyone pays the same rates (unless you{' '}
                                <Tooltip
                                    trigger={
                                        <span className="relative cursor-help border-b border-dashed border-primary">
                                            qualify for a discount
                                        </span>
                                    }
                                    delay={0}
                                >
                                    <p className="max-w-xs leading-normal pb-0 mb-0">
                                        Discounts available to early-stage startups, non-profits, and customers who pay
                                        annually.
                                    </p>
                                </Tooltip>
                                )!
                            </p>

                            <p>
                                Go with us on a short journey to compare the sales process that most companies follow
                                with how we do things 'round here.
                            </p>

                            <p className="text-sm text-secondary">
                                <strong>Next up:</strong> <em>How [everyone else] does sales</em>
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
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/phone-hog-light.png"
                                    loading="eager"
                                    objectPosition="left top"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="hidden dark:block">
                                <CloudinaryImage
                                    quality={100}
                                    placeholder="none"
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/phone-hog-dark.png"
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
        // Slide 2: How sales works at typical companies
        {
            content: (
                <div className="flex-1 px-8 py-8">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="mb-6 text-center text-2xl font-bold">
                            How the sales process works at{' '}
                            <div className="inline-block relative after:absolute after:-bottom-5 after:left-0 after:right-8 after:content-['[Typical_bland_enterprise_SaaS_company]'] after:text-xs after:text-secondary after:font-normal after:tracking-normal">
                                <button
                                    onClick={updateCompanyName}
                                    className="absolute right-0.5 bottom-[.15rem] hover:bottom-[0.2rem] active:bottom-[.1rem] z-10 bg-red/15 dark:bg-white/20 p-1 rounded inline-flex cursor-pointer group hover:bg-red/20 dark:hover:bg-white/30 hover:scale-[1.02] active:scale-[.99] transition-transform"
                                >
                                    <IconRedo className="size-5 inline-block text-red/90 hover:text-red/100 dark:text-white/70 dark:group-hover:text-white/100" />
                                </button>
                                <span className="border-b-2 border-black/50 dark:border-white/50 text-red dark:text-yellow px-0.5 mr-8 w-[calc(100vw_-_6rem)] xs:max-w-sm inline-flex gap-2 justify-center relative overflow-hidden">
                                    <CSSTransition
                                        in={show}
                                        timeout={500}
                                        classNames="company-name"
                                        unmountOnExit
                                        nodeRef={companyNameRef}
                                    >
                                        <span ref={companyNameRef} className="cursor-default">
                                            {companyName}
                                        </span>
                                    </CSSTransition>
                                </span>
                            </div>
                        </h2>
                        <div className="not-prose">
                            <Accordion key="them-accordion" items={them} keyboardContainerRef={keyboardContainerRef} />
                        </div>
                    </div>
                </div>
            ),
        },
        // Slide 3: How PostHog does sales
        {
            content: (
                <div className="flex-1 px-8 py-8">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="flex justify-center items-center mb-6 text-2xl font-bold">
                            How <Logo noText className="inline-block mt-[-2px] ml-2 mr-1.5" /> PostHog does sales
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
                            <h2 className="text-4xl font-bold mb-6">And that's how we do sales</h2>
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
                title="How we do sales"
                description="Most SaaS companies want to feel out how much money they can squeeze out of you. PostHog operates differently."
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
                                    ? 'See how [everyone else] does sales'
                                    : slideIndex === 1
                                    ? 'See how PostHog does sales'
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
