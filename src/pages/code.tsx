import React, { useEffect, useRef, useState } from 'react'
import SEO, { buildProductStructuredData } from 'components/seo'
import Editor from 'components/Editor'
import {
    IconAI,
    IconArrowUpRight,
    IconBrackets,
    IconBrowser,
    IconCheck,
    IconColumns,
    IconDashboard,
    IconDocument,
    IconFlask,
    IconGitBranch,
    IconGraph,
    IconList,
    IconMessage,
    IconRewindPlay,
    IconToggle,
    IconTrends,
    IconWarning,
} from '@posthog/icons'
import OSButton from 'components/OSButton'
import { Accordion } from 'components/RadixUI/Accordion'
import Modal from 'components/RadixUI/Modal'
import Tooltip from 'components/RadixUI/Tooltip'
import SlotMachineText from 'components/SlotMachineText'
import posthogIcon from '../images/posthog-icon-white.svg'
import { LOGOS, type LogoKey } from 'constants/logos'
import TabbedCarousel from 'components/TabbedCarousel'
import type { TabbedCarouselTab } from 'components/TabbedCarousel'
import { ChoppyReveal } from 'components/Code/ChoppyReveal'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { IconPop } from 'components/Code/IconPop'
import { SignalsCallout } from 'components/Code/SignalsCallout'
import { SteerQueueDemo } from 'components/Code/SteerQueueDemo'
import { DottedConnection } from 'components/Code/DottedConnection'
import { StickerTombstone, StickerCoffee, StickerPullRequest } from 'components/Stickers/Stickers'
import CloudinaryImage from 'components/CloudinaryImage'
import WistiaEmbed from 'components/WistiaEmbed'
import Link from 'components/Link'
import { IconDiscord } from 'components/OSIcons/Icons'
import { WaitlistForm } from 'components/WaitlistForm'
import { DownloadContent } from 'components/Code/DownloadContent'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'

// ─────────────────────────────────────────────
// Section label ("The old way", "The PostHog way")
// ─────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
    return <h2 className="text-2xl mb-4">{children}</h2>
}

// ─────────────────────────────────────────────
// Inline icon helper (sits in text flow)
// ─────────────────────────────────────────────

function InlineIcon({
    icon: Icon,
    children,
    className = '',
}: {
    icon: React.ComponentType<{ className?: string }>
    children?: React.ReactNode
    className?: string
}) {
    return (
        <span className="inline-flex items-baseline gap-0.5 whitespace-nowrap">
            <IconPop>
                <Icon className={`size-7 inline-block align-middle relative top-1.5 ${className}`} />
            </IconPop>
            {children}
        </span>
    )
}

// ─────────────────────────────────────────────
// Keyboard shortcut / badge style
// ─────────────────────────────────────────────

function KeyBadge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-sans font-medium align-middle mx-0.5 relative -top-0.5 bg-[#1d1f27] text-white dark:bg-white dark:text-[#1d1f27]">
            {children}
        </span>
    )
}

// "Let [icon] PostHog {analyze|debug|…|code}" — the animated wordmark, reused as the
// header brand and as the punch line at the end of the opening narrative.
function LetPostHogScroller({ className = 'text-2xl @xl:text-3xl font-bold tracking-tight' }: { className?: string }) {
    return (
        <SlotMachineText
            className={className}
            words={['analyze', 'debug', 'instrument', 'ship', 'experiment', 'query', 'flag', 'code']}
            holdDuration={4000}
            wordClassName="text-red dark:text-yellow"
            prefix={
                <span className="inline-flex items-center gap-2">
                    <span>Let</span>
                    <img src={posthogIcon} alt="" aria-hidden className="size-6 rounded-md @xl:size-7" />
                    <span>PostHog</span>
                </span>
            }
        />
    )
}

function PostHogCodeLogomark({ className }) {
    return (
        <>
            <svg
                width="96"
                height="52"
                viewBox="0 0 96 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`inline-block dark:hidden ${className}`}
            >
                <g id="Logo 3001">
                    <g id="Primative/Logomark" clipPath="url(#clip0_49_523)">
                        <path
                            id="head"
                            d="M92.7587 43.2867L92.1324 43.2112C90.2645 42.9736 88.5262 42.1098 87.2089 40.7494L61.7383 14.361V51.9353H90.88C93.6225 51.9353 95.8359 49.7111 95.8359 46.9794V46.785C95.8359 45.0035 94.5078 43.5027 92.7479 43.2867H92.7587ZM72.7082 43.6754C70.8835 43.6754 69.4043 42.1962 69.4043 40.3715C69.4043 38.5468 70.8835 37.0675 72.7082 37.0675C74.533 37.0675 76.0122 38.5468 76.0122 40.3715C76.0122 42.1962 74.533 43.6754 72.7082 43.6754Z"
                            fill="#111111"
                        />
                        <path
                            id="yellow-3"
                            d="M40.7488 51.9352H57.5277L40.7488 34.6705V51.9352Z"
                            fill="url(#paint0_linear_49_523)"
                        />
                        <path
                            id="yellow-2"
                            d="M40.749 14.188V34.6704L57.5279 51.9351H61.7496V35.7792L40.749 14.188Z"
                            fill="url(#paint1_linear_49_523)"
                        />
                        <path
                            id="yellow-1"
                            d="M61.7496 35.7932V14.3607L49.2572 1.51204C46.1584 -1.68393 40.749 0.518698 40.749 4.96715V14.1893L61.7496 35.7824V35.7932Z"
                            fill="url(#paint2_linear_49_523)"
                        />
                        <path
                            id="red-3"
                            d="M19.9209 51.9352H36.3543L19.9209 34.746V51.9352Z"
                            fill="url(#paint3_linear_49_523)"
                        />
                        <path
                            id="red-2"
                            d="M19.9209 13.2488V34.7461L36.3543 51.9353H40.7487V34.6705L19.9209 13.2488Z"
                            fill="url(#paint4_linear_49_523)"
                        />
                        <path
                            id="red-1"
                            d="M40.7487 14.188L28.4291 1.51204C25.3303 -1.68393 19.9209 0.518698 19.9209 4.96715V13.2619L40.7487 34.6703V14.188Z"
                            fill="url(#paint5_linear_49_523)"
                        />
                        <path
                            id="blue-3"
                            d="M0.000244141 47.1301C0.000244141 49.7837 2.15141 51.9348 4.80501 51.9348H16.5921L0.000244141 33.7204V47.1301Z"
                            fill="url(#paint6_linear_49_523)"
                        />
                        <path
                            id="blue-2"
                            d="M19.9206 34.7313V51.9348H16.5846L0 33.7271V13.9286L19.9206 34.7313Z"
                            fill="url(#paint7_linear_49_523)"
                        />
                        <path
                            id="blue-1"
                            d="M19.9209 13.2488L8.50821 1.51219C5.40941 -1.68378 0 0.518851 0 4.9673V13.929L19.9209 34.746V13.2488Z"
                            fill="url(#paint8_linear_49_523)"
                        />
                    </g>
                </g>
                <defs>
                    <linearGradient
                        id="paint0_linear_49_523"
                        x1="40.9368"
                        y1="35.0753"
                        x2="57.4652"
                        y2="51.892"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#FF9500" />
                        <stop offset="1" stopColor="#F8AA00" />
                    </linearGradient>
                    <linearGradient
                        id="paint1_linear_49_523"
                        x1="40.6533"
                        y1="14.777"
                        x2="61.815"
                        y2="51.8099"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#FFB700" />
                        <stop offset="1" stopColor="#F9AA01" />
                    </linearGradient>
                    <linearGradient
                        id="paint2_linear_49_523"
                        x1="40.6533"
                        y1="3.63932"
                        x2="61.815"
                        y2="34.8249"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#FFD849" />
                        <stop offset="0.955762" stopColor="#FBAE01" />
                    </linearGradient>
                    <linearGradient
                        id="paint3_linear_49_523"
                        x1="19.2128"
                        y1="36.4955"
                        x2="30.8465"
                        y2="51.8921"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#C42C00" />
                        <stop offset="1" stopColor="#D63600" />
                    </linearGradient>
                    <linearGradient
                        id="paint4_linear_49_523"
                        x1="19.7697"
                        y1="13.6632"
                        x2="42.0451"
                        y2="52.3668"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#EF3C00" />
                        <stop offset="1" stopColor="#D63601" />
                    </linearGradient>
                    <linearGradient
                        id="paint5_linear_49_523"
                        x1="19.9877"
                        y1="13.4537"
                        x2="40.7443"
                        y2="34.5947"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#FF651E" />
                        <stop offset="1" stopColor="#E4400A" />
                    </linearGradient>
                    <linearGradient
                        id="paint6_linear_49_523"
                        x1="0.000245783"
                        y1="35.13"
                        x2="17.1052"
                        y2="52.4272"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0041C6" />
                        <stop offset="1" stopColor="#0045D0" />
                    </linearGradient>
                    <linearGradient
                        id="paint7_linear_49_523"
                        x1="-8.63173"
                        y1="25.6173"
                        x2="16.4323"
                        y2="51.8919"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0255FF" />
                        <stop offset="1" stopColor="#0145D2" />
                    </linearGradient>
                    <linearGradient
                        id="paint8_linear_49_523"
                        x1="-9.46706"
                        y1="3.342"
                        x2="20.0479"
                        y2="36.1983"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#3F80FF" />
                        <stop offset="1" stopColor="#084FE0" />
                    </linearGradient>
                    <clipPath id="clip0_49_523">
                        <rect width="95.8469" height="51.9346" fill="white" />
                    </clipPath>
                </defs>
            </svg>

            <svg
                width="52"
                height="28"
                viewBox="0 0 52 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`hidden dark:inline-block ${className}`}
            >
                <g id="Logo 3001">
                    <g id="Primative/Logomark" clipPath="url(#clip0_49_523)">
                        <path
                            id="head"
                            d="M50.0159 23.3375L49.6783 23.2967C48.6712 23.1687 47.734 22.703 47.0238 21.9695L35.5777 10.111C35.2654 9.7874 34.7179 10.0086 34.718 10.4583L34.7205 27.5003C34.7205 27.7764 34.9444 28.0003 35.2205 28.0003H49.003C50.4816 28.0003 51.6749 26.8011 51.6749 25.3283V25.2235C51.6749 24.263 50.9589 23.4539 50.0101 23.3375H50.0159ZM39.2059 23.547C38.2221 23.547 37.4246 22.7495 37.4246 21.7657C37.4246 20.782 38.2221 19.9845 39.2059 19.9845C40.1897 19.9845 40.9872 20.782 40.9872 21.7657C40.9872 22.7495 40.1897 23.547 39.2059 23.547Z"
                            fill="#FAFAFA"
                        />
                        <path
                            id="body-1"
                            d="M0 25.4097C0 26.8403 1.15978 28.0001 2.59044 28.0001H7.81351C8.24782 28.0001 8.47561 27.4845 8.18314 27.1634L0.869635 19.1347C0.562039 18.797 0 19.0146 0 19.4714V25.4097Z"
                            fill="#FAFAFA"
                        />
                        <path
                            id="body-2"
                            d="M18.8112 27.1542C19.1156 27.4722 18.8903 28 18.45 28H11.3645C11.2207 28 11.0838 27.9381 10.9889 27.83L8.94141 25.5L0.130295 15.8231C0.046462 15.731 0 15.611 0 15.4865V8.75485C0 8.30416 0.549419 8.08352 0.861129 8.40904L18.8112 27.1542Z"
                            fill="#FAFAFA"
                        />
                        <path
                            id="body-3"
                            d="M0 2.67783C3.31006e-05 0.279524 2.91624 -0.907535 4.58691 0.815527L30.1907 27.1515C30.4988 27.4684 30.2743 28 29.8322 28L22.0671 28.0001C21.9251 28.0001 21.7898 27.9398 21.695 27.8341L19.5996 25.5L0.277366 5.29997C0.0993537 5.11387 0 4.86627 0 4.60874V2.67783Z"
                            fill="#FAFAFA"
                        />
                        <path
                            id="body-4"
                            d="M10.7402 2.678C10.7402 0.279791 13.6564 -0.907946 15.3271 0.814714L32.5044 18.4803L33 18.99V19.29V26.2862C33 26.7326 32.4595 26.9552 32.1451 26.6383L31.0156 25.5L11.3064 5.23222C10.9434 4.85888 10.7402 4.35865 10.7402 3.8379V2.678Z"
                            fill="#FAFAFA"
                        />
                        <path
                            id="body-5"
                            d="M33.0078 7.45704V15.2688C33.0078 15.7176 32.4623 15.9391 32.1493 15.6174L22.5355 5.73224C22.1724 5.35889 21.9692 4.85863 21.9692 4.33784V2.67799C21.9692 0.279654 24.8857 -0.907872 26.5563 0.815205L33.0078 7.45704Z"
                            fill="#FAFAFA"
                        />
                    </g>
                </g>
                <defs>
                    <clipPath id="clip0_49_523">
                        <rect width="51.6748" height="28" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

// ─────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────

function HeroSection() {
    const [showDownload, setShowDownload] = useState(
        () => typeof window !== 'undefined' && window.location.hash === '#download'
    )
    const [contentVisible, setContentVisible] = useState(true)
    const prefersReducedMotion = usePrefersReducedMotion()

    const swapToDownload = () => {
        if (typeof window !== 'undefined') {
            window.history.replaceState(null, '', '#download')
        }
        if (showDownload) return
        if (prefersReducedMotion) {
            setShowDownload(true)
            return
        }
        setContentVisible(false)
        setTimeout(() => {
            setShowDownload(true)
            setContentVisible(true)
        }, 300)
    }

    return (
        <section className="my-6 @4xl/editor:mb-16 tracking-[-0.0125em] max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <LetPostHogScroller className="text-xl @xl:text-2xl font-bold tracking-tight" />
                </div>
                <div>
                    <Link
                        className="group flex items-center gap-1 text-sm font-semibold -mr-4 text-secondary hover:text-primary"
                        to="https://discord.com/invite/E9xV2WnR98"
                        externalNoIcon
                    >
                        <IconDiscord className="size-6 text-secondary group-hover:text-primary" />
                        <span className="group-hover:underline">Discord</span>
                        <IconArrowUpRight className="size-4 inline-block text-secondary invisible group-hover:visible" />
                    </Link>
                </div>
            </div>

            <div
                style={{
                    opacity: contentVisible ? 1 : 0,
                    transition: prefersReducedMotion ? undefined : 'opacity 0.3s ease',
                }}
            >
                {showDownload ? (
                    <DownloadContent className="w-full mx-auto py-8 text-center" />
                ) : (
                    <>
                        <h1 className="text-xl @xl:text-3xl font-bold leading-tight mb-4 @xl:mb-8 !mt-0">
                            Not just a code editor.{' '}
                            <RoughAnnotation
                                type="highlight"
                                color="rgba(48, 164, 108, 0.2)"
                                strokeWidth={1}
                                padding={2}
                                delay={300}
                            >
                                A product editor
                            </RoughAnnotation>
                            {' for '}
                            <RoughAnnotation type="underline" color="#F54E00" strokeWidth={2} delay={600}>
                                <span className="font-bold">your product</span>
                            </RoughAnnotation>
                        </h1>

                        <div className="@4xl/editor:gap-8 flex flex-col @4xl/editor:flex-row items-start">
                            <div className="@4xl/editor:flex-[0_0_280px]">
                                <p>
                                    PostHog Code is the desktop app for <strong>steering coding agents</strong> – and it
                                    edits your <strong>product</strong>, not just your <strong>codebase</strong>.
                                </p>
                                <ul className="list-none p-0 mb-4 text-[15px] space-y-0.5">
                                    <li className="relative pl-5">
                                        <IconCheck className="size-4 text-green absolute left-0 top-1" />
                                        Run and steer a fleet of agents
                                    </li>
                                    <li className="relative pl-5">
                                        <IconCheck className="size-4 text-green absolute left-0 top-1" />
                                        Instruments and configures PostHog as it builds
                                    </li>
                                    <li className="relative pl-5">
                                        <IconCheck className="size-4 text-green absolute left-0 top-1" />
                                        Ships pull requests you review
                                    </li>
                                </ul>

                                <div className="@container max-w-sm">
                                    <WaitlistForm />
                                    <p className="text-sm text-secondary mt-4">
                                        Have an invite code?{' '}
                                        <Link
                                            to="/code#download"
                                            className="font-bold underline"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                swapToDownload()
                                            }}
                                        >
                                            Get started
                                        </Link>
                                    </p>
                                </div>
                            </div>

                            <div className="@4xl/editor:flex-1 w-full min-w-0">
                                <div className="rounded-md overflow-hidden shadow-xl not-prose">
                                    <WistiaEmbed mediaId="vm9mn1m4dv" />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// "The old way" Section
// ─────────────────────────────────────────────

function OldWaySection() {
    const [p1Done, setP1Done] = useState(false)

    return (
        <section className="relative mb-8 @xl:mb-12 px-4 @xl:px-8">
            <SectionLabel>
                The{' '}
                <InlineIcon icon={StickerTombstone} className="!size-10 !top-3 -rotate-1">
                    old way
                </InlineIcon>{' '}
                to build with AI
            </SectionLabel>

            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/plague_doctor_beach_11580558c0.png"
                alt="A plague doctor relaxing on a beach"
                className="mb-5 hidden @xl:block float-right ml-8 w-44"
                imgClassName="w-full"
            />

            <p className="text-base leading-loose mb-5">
                <ChoppyReveal wordDelay={40} onComplete={() => setP1Done(true)}>
                    {'Most AI code editors '}
                    <em>lack context</em> and wait for{' '}
                    <RoughAnnotation type="underline" color="currentColor" strokeWidth={1.5}>
                        <em>you</em>
                    </RoughAnnotation>
                    {' to tell them what to '}
                    <KeyBadge>
                        Build <span className="relative top-px">↵</span>
                    </KeyBadge>
                    {'.'}
                </ChoppyReveal>
            </p>

            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/plague_doctor_beach_11580558c0.png"
                alt="A plague doctor relaxing on a beach"
                className="mb-5 @xl:hidden mx-auto w-40"
                imgClassName="w-full"
            />

            <p className="text-base leading-loose">
                <ChoppyReveal wordDelay={40} initialDelay={p1Done ? 0 : 999999}>
                    {'They use your '}{' '}
                    <strong className="font-mono bg-blue/10 border border-blue rounded-sm px-1 leading-normal inline-block">
                        &lt;codebase /&gt;
                    </strong>
                    {' as the source of truth, not how '}
                    humans (or agents){' '}
                    <RoughAnnotation type="underline" color="#30A46C" strokeWidth={2}>
                        <em>actually use your product</em>
                    </RoughAnnotation>
                    {'.'}
                </ChoppyReveal>
            </p>
        </section>
    )
}

// ─────────────────────────────────────────────
// "The PostHog way" Section
// ─────────────────────────────────────────────

function PostHogWaySection({ onComplete }: { onComplete?: () => void }) {
    const [p1Done, setP1Done] = useState(false)
    const [p2Done, setP2Done] = useState(false)
    const signalsWordRef = useRef<HTMLSpanElement>(null)
    const signalsBoxRef = useRef<HTMLDivElement>(null)
    const sectionRef = useRef<HTMLDivElement>(null)

    return (
        <section ref={sectionRef} className="relative mb-8 @xl:mb-12 px-4 @xl:px-8">
            <SectionLabel>
                The <PostHogCodeLogomark className="-rotate-2 w-12 relative -top-0.5" /> PostHog way
            </SectionLabel>

            <div className="relative">
                {/* Signals callout – in DOM before paragraph so float-right works on desktop.
                    On mobile (no float), it falls in normal flow above the paragraph,
                    but we use flex + order to push it below the first paragraph. */}
                <div className="flex flex-col @2xl/editor:block">
                    <div
                        ref={signalsBoxRef}
                        className="order-2 mb-5 @2xl/editor:order-none @2xl/editor:float-right @2xl/editor:ml-6 @2xl/editor:my-4 @2xl/editor:w-[300px] @4xl/editor:w-[350px]"
                    >
                        <SignalsCallout />
                    </div>

                    <p className="text-base leading-loose mb-5 order-1">
                        <ChoppyReveal wordDelay={40} onComplete={() => setP1Done(true)}>
                            <strong>{' PostHog Code'}</strong>
                            {' reads '}
                            <span ref={signalsWordRef}>
                                <RoughAnnotation
                                    type="highlight"
                                    color="rgba(48, 164, 108, 0.2)"
                                    strokeWidth={1}
                                    padding={2}
                                    multiline
                                >
                                    <strong>signals</strong>
                                </RoughAnnotation>
                            </span>
                            {' from '}
                            <span className="text-green text-sm">&#9679;</span> <strong>production data</strong> so it
                            builds the right thing – and edits your <strong>product</strong>, not just your{' '}
                            <strong>code</strong>.
                        </ChoppyReveal>
                    </p>
                </div>

                <p className="text-base leading-loose mb-5">
                    <ChoppyReveal wordDelay={25} initialDelay={p1Done ? 0 : 999999} onComplete={() => setP2Done(true)}>
                        {'Run '}
                        <RoughAnnotation type="box" color="currentColor" strokeWidth={1} padding={2}>
                            <strong className="inline-block">a fleet of agents</strong>
                        </RoughAnnotation>
                        {' on your machine or in an isolated '}
                        <strong>cloud sandbox</strong>
                        {' – '}
                        <strong>steer</strong> or <strong>queue</strong> them as they work.
                    </ChoppyReveal>
                </p>

                <p className="text-base leading-loose mb-5">
                    <ChoppyReveal wordDelay={25} initialDelay={p2Done ? 0 : 999999} onComplete={() => onComplete?.()}>
                        <strong>TL;DR:</strong> Plenty of AI tools edit your code, but{' '}
                        <RoughAnnotation type="underline" color="currentColor" strokeWidth={1.5} delay={400}>
                            <span className="inline-block">only one understands – and edits – your product</span>
                        </RoughAnnotation>{' '}
                        like <strong>PostHog Code</strong>.
                    </ChoppyReveal>
                </p>

                {/* Clear float */}
                <div className="clear-both" />

                {/* Dotted connection line */}
                <DottedConnection
                    sourceRef={signalsWordRef}
                    targetRef={signalsBoxRef}
                    containerRef={sectionRef}
                    desktopOnly
                />
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// "2026-shaped products" Section — table stakes,
// rendered as a $0.00 grocery receipt punchline.
// ─────────────────────────────────────────────

// Deliberate skeuomorphic object: fixed paper/ink colors (like KeyBadge) so the
// receipt reads as a physical receipt in both light and dark mode.
const RECEIPT_PAPER = '#f7f4ee'

// A torn/zigzag paper edge. Flush along the top, sawtooth teeth pointing down.
// preserveAspectRatio="none" stretches a fixed tooth count across the receipt width.
function TornEdge({ className = '' }: { className?: string }) {
    const width = 200
    const height = 12
    const teeth = 20
    const step = width / teeth
    let d = `M0 0 H${width}`
    for (let i = 0; i <= teeth; i++) {
        const x = (width - i * step).toFixed(1)
        const y = i % 2 === 0 ? height : 0
        d += ` L${x} ${y}`
    }
    d += ' Z'
    return (
        <svg
            className={className}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            aria-hidden
            focusable="false"
        >
            <path d={d} fill={RECEIPT_PAPER} />
        </svg>
    )
}

function ReceiptRow({ label, price = '$0.00' }: { label: string; price?: string }) {
    return (
        <div className="flex items-baseline justify-between gap-4">
            <span>{label}</span>
            <span>{price}</span>
        </div>
    )
}

function AgentMartReceipt() {
    return (
        <div className="mx-auto w-full max-w-xs rotate-1">
            <div
                className="font-code text-sm leading-relaxed shadow-2xl px-6 pt-6 pb-5 text-[#2b2b2b]"
                style={{ backgroundColor: RECEIPT_PAPER }}
            >
                <p className="m-0 mb-4 text-center font-bold tracking-widest">2026 AGENT MART</p>

                <div className="space-y-1">
                    <ReceiptRow label="parallel agents" />
                    <ReceiptRow label="isolated worktrees" />
                    <ReceiptRow label="diff review" />
                    <ReceiptRow label="checkpoints" />
                    <ReceiptRow label="MCP both ways" />
                    <ReceiptRow label="cmd palette" />
                </div>

                <div className="my-3 border-t border-dashed border-[#c9c2b4]" />

                <div className="flex items-baseline justify-between gap-4 font-bold">
                    <span>TOTAL</span>
                    <span>$0.00</span>
                </div>

                <p className="m-0 mt-4 text-center text-xs text-[#8a8272]">thank you for shopping at 2026</p>
            </div>
            <TornEdge className="w-full h-3" />
        </div>
    )
}

function TableStakesSection() {
    const items = [
        'Parallel agents in isolated worktrees',
        'Checkpoints and rollback',
        'MCP in both directions',
        'Permission modes',
        'Fast model switching',
        'A command center to micro manage your agents',
    ]

    return (
        <section className="relative mb-8 @xl:mb-24 px-4 @xl:px-8">
            <SectionLabel>Yes, it does all the stuff</SectionLabel>

            <div className="grid @2xl:grid-cols-2 gap-8 @2xl:gap-12 items-center">
                <div>
                    <p className="text-base leading-loose mb-5">
                        Every <em>2026-shaped</em> coding agent ships the same starter pack. So does PostHog Code – it's
                        table stakes, not the point.
                    </p>
                    <ul className="m-0 list-none p-0 space-y-2.5">
                        {items.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                                <IconCheck className="size-5 shrink-0 relative top-0.5 text-green" />
                                <span className="text-base">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="@2xl:pl-4">
                    <AgentMartReceipt />
                </div>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// "meep.mov" desktop notification → video popup
// A macOS-style notification toast (see reference). Clicking it opens the
// video in a modal, the same way demo.mov plays on the homepage.
// ─────────────────────────────────────────────

// The "meep" video – https://posthog.wistia.com/medias/v7t0y7ynmn
const MEEP_VIDEO_ID = 'v7t0y7ynmn'

// Notification copy — mimics a macOS "task finished" toast (see reference screenshot).
const MEEP_NOTIFICATION = {
    app: 'PostHog Code',
    body: 'meep.mov needs your input',
}

function MeepNotification({ className = 'my-10 flex justify-center px-4 @xl:px-8' }: { className?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)
    const prefersReducedMotion = usePrefersReducedMotion()

    // Play the entry animation only once the toast scrolls into view (it lives far down the page).
    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined' || !ref.current) {
            setInView(true)
            return
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.4 }
        )
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    const animate = inView && !prefersReducedMotion

    return (
        <div className={className}>
            <div
                ref={ref}
                className="w-full max-w-sm"
                style={{
                    opacity: prefersReducedMotion ? 1 : animate ? undefined : 0,
                    animation: animate ? 'meep-attention 0.6s ease-out both' : undefined,
                }}
            >
                <Modal
                    maxWidth={900}
                    autoHeight
                    trigger={
                        <button
                            type="button"
                            aria-label={`${MEEP_NOTIFICATION.app}: ${MEEP_NOTIFICATION.body} – play video`}
                            className="group block w-full cursor-pointer rounded-2xl border border-white/40 bg-white/80 p-3.5 text-left shadow-2xl backdrop-blur-xl transition hover:-translate-y-0.5 active:translate-y-0 dark:border-white/10 dark:bg-black/50"
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-[#1d1f27]">
                                    <PostHogCodeLogomark className="w-7" />
                                </span>
                                <div className="min-w-0">
                                    <p className="m-0 font-bold leading-tight text-primary">{MEEP_NOTIFICATION.app}</p>
                                    <p className="m-0 truncate leading-tight text-secondary">
                                        {MEEP_NOTIFICATION.body}
                                    </p>
                                </div>
                            </div>
                        </button>
                    }
                >
                    <div className="bg-primary p-2">
                        <WistiaEmbed mediaId={MEEP_VIDEO_ID} autoPlay />
                    </div>
                </Modal>
            </div>
            <style>{`
                @keyframes meep-attention {
                    0%   { opacity: 0; transform: translateY(-8px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}

// Shown on the "Instrumentation" carousel slide: what PostHog Code wires up as it builds.
const instrumentationItems = [
    {
        icon: IconTrends,
        color: 'text-blue',
        title: 'Event instrumentation',
        description: "Tracks new features and changes to existing features as they're built",
    },
    {
        icon: IconWarning,
        color: 'text-yellow',
        title: 'Error tracking',
        description: 'Configures exception capture so new code surfaces in PostHog with stack traces',
    },
    {
        icon: IconToggle,
        color: 'text-seagreen',
        title: 'Feature flags & rollout conditions',
        description: (
            <>
                Creates the flag, implements <code>isFeatureEnabled</code>, and configures staged rollout conditions
            </>
        ),
    },
    {
        icon: IconFlask,
        color: 'text-purple',
        title: 'Experiments',
        description: 'Scaffolds variants, split, and goal metrics',
    },
    {
        icon: IconDashboard,
        color: 'text-red',
        title: 'Dashboards & actions',
        description: 'Builds dashboards to track impact and defines actions – every write gated by your approval',
    },
    {
        icon: IconBrowser,
        color: 'text-orange',
        title: 'Live canvases',
        description: 'Spins up canvases – single-file apps and dashboards that render your real product data',
    },
]

// Carousel slide panel, à la the /slack and /self-driving carousels: title + body on
// a bg-primary card, with the screenshot bleeding flush to the card's bottom edge.
const FeaturePanel = ({
    title,
    imageLight,
    imageDark,
    imageAlt,
    children,
}: {
    title: string
    imageLight?: string
    imageDark?: string
    imageAlt?: string
    children: React.ReactNode
}) => (
    <div className="flex h-full flex-col rounded bg-primary p-4 @xl:p-6">
        <h3 className="mt-0 mb-2 text-2xl font-bold">{title}</h3>
        <div className="flex-1 text-[15px] text-secondary">{children}</div>
        {imageLight && imageDark && (
            <div className="-mx-4 -mb-4 mt-4 overflow-hidden rounded-b leading-[0] @xl:-mx-6 @xl:-mb-6">
                <CloudinaryImage
                    src={imageLight}
                    alt={imageAlt || title}
                    className="dark:hidden"
                    imgClassName="w-full block"
                />
                <CloudinaryImage
                    src={imageDark}
                    alt={imageAlt || title}
                    className="hidden dark:block"
                    imgClassName="w-full block"
                />
            </div>
        )}
    </div>
)

// Compact icon + label chips used to add substance to a carousel slide's copy.
const FeatureChips = ({
    items,
}: {
    items: { Icon: React.ComponentType<{ className?: string }>; color: string; label: string }[]
}) => (
    <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 @sm:grid-cols-3">
        {items.map(({ Icon, color, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                <Icon className={`size-4 shrink-0 ${color}`} />
                {label}
            </span>
        ))}
    </div>
)

const featureTabs: TabbedCarouselTab[] = [
    {
        value: 'command-center',
        label: 'Command center',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <FeaturePanel
                title="Manage multiple coding agents in parallel"
                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/command_center_dark_1_4295f77be1.png"
                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/command_center_dark_358aba9c5b.png"
                imageAlt="Manage multiple coding agents in parallel"
            >
                <p className="m-0">
                    Run a whole fleet at once. Split-screen presets let you watch agents side-by-side or in a 2x2 or 3x3
                    grid, each in its own isolated worktree – so nothing steps on anything else.
                </p>
                <FeatureChips
                    items={[
                        { Icon: IconColumns, color: 'text-blue', label: 'Split-screen presets' },
                        { Icon: IconGitBranch, color: 'text-green', label: 'Isolated worktrees' },
                        { Icon: IconRewindPlay, color: 'text-orange', label: 'Checkpoints & rollback' },
                        { Icon: IconBrackets, color: 'text-purple', label: 'Live diff review' },
                    ]}
                />
            </FeaturePanel>
        ),
    },
    {
        value: 'plan',
        label: 'Plan mode',
        color: 'bg-green',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <FeaturePanel
                title="Agree on the plan before any code"
                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/plan_light_b34b9ad492.png"
                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/plan_dark_d27c25debd.png"
                imageAlt="Plan mode: clarifying questions and an implementation plan to approve"
            >
                <p className="m-0">
                    Tasks can start in Plan mode: the agent explores your codebase and asks clarifying questions –
                    multiple choice or freeform – then writes an implementation plan you approve. Tweak it, send it back
                    with notes, or say go. Nothing gets written until you're happy.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm font-semibold">
                    {['Explore', 'Ask', 'Plan', 'Approve'].map((step, i) => (
                        <React.Fragment key={step}>
                            {i > 0 && <span className="text-secondary">→</span>}
                            <span className="rounded bg-accent px-2 py-1 text-primary">{step}</span>
                        </React.Fragment>
                    ))}
                </div>
            </FeaturePanel>
        ),
    },
    {
        value: 'tasks',
        label: 'Steer & queue',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        content: (
            <div className="flex h-full flex-col rounded bg-primary p-4 @xl:p-6">
                <h3 className="mt-0 mb-2 text-2xl font-bold">Steer it, or queue it up</h3>
                <p className="m-0 text-[15px] text-secondary">
                    An agent's already running – you don't have to wait. Jump in to{' '}
                    <strong className="text-primary">steer</strong> it mid-task, or{' '}
                    <strong className="text-primary">queue</strong> up what's next and walk away.
                </p>
                <div className="mt-6">
                    <SteerQueueDemo />
                </div>
            </div>
        ),
    },
    {
        value: 'instrument',
        label: 'Instrumentation',
        color: 'bg-purple',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <FeaturePanel title="It edits your product, not just your code">
                <p className="m-0">
                    As PostHog Code builds, it wires up the right PostHog instrumentation and configuration – so you can
                    progressively roll out changes and measure their impact without a second pass.
                </p>
                <ul className="mt-6 grid list-none grid-cols-1 gap-x-8 gap-y-4 p-0 @sm:grid-cols-2">
                    {instrumentationItems.map(({ icon: Icon, color, title, description }) => (
                        <li key={title} className="relative pl-8">
                            <Icon className={`absolute left-0 top-0.5 size-6 ${color}`} />
                            <h4 className="mb-0 text-base font-bold text-primary">{title}</h4>
                            <p className="mb-0 mt-1 text-sm text-secondary">{description}</p>
                        </li>
                    ))}
                </ul>
            </FeaturePanel>
        ),
    },
    {
        value: 'skills',
        label: 'Skills',
        color: 'bg-red',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <FeaturePanel
                title="Built-in skills library"
                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/skills_light_sidepanel_bae81ae8d5.png"
                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/skills_dark_sidepanel_8e104c098d.png"
                imageAlt="Built-in skills library"
            >
                <p className="m-0">
                    A library of built-in skills lets your agents do real PostHog work – not just write code, but query
                    your data and wire up the product features that measure it.
                </p>
                <FeatureChips
                    items={[
                        { Icon: IconGraph, color: 'text-blue', label: 'Query data' },
                        { Icon: IconTrends, color: 'text-red', label: 'Instrument events' },
                        { Icon: IconToggle, color: 'text-seagreen', label: 'Feature flags' },
                        { Icon: IconFlask, color: 'text-purple', label: 'Experiments' },
                        { Icon: IconRewindPlay, color: 'text-orange', label: 'Session replays' },
                        { Icon: IconDashboard, color: 'text-yellow', label: 'Dashboards' },
                    ]}
                />
            </FeaturePanel>
        ),
    },
]

const Features = () => {
    return (
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            <div className="px-4 @xl:px-8">
                <h2 className="text-2xl font-bold mb-2 text-center pb-12 relative">
                    Everything you'd expect in an AI coding tool,{' '}
                    <span className="block">
                        but <em className="text-gradient">way more...</em>
                    </span>
                </h2>
            </div>

            <TabbedCarousel tabs={featureTabs} />
        </section>
    )
}

// Small "Alpha" pill – marks the still-cooking features inside the (beta) product.
// Matches the inline beta tag used across the site (self-driving, slack pages).
const AlphaBadge = () => (
    <span className="shrink-0 rounded-sm bg-highlight px-1 py-0.5 text-xs font-bold text-red dark:text-yellow">
        Alpha
    </span>
)

// Highlighter span, same treatment as the self-driving page.
const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-highlight px-0.5 font-bold text-red dark:text-yellow">{children}</span>
)

// Shared card shell for the workspace section – coloured accent bar per card.
const WORKSPACE_CARD = 'relative flex flex-col overflow-hidden rounded-md border border-primary bg-accent'

// Traffic-light dots for the little window mockups.
const WindowDots = () => (
    <span className="flex gap-1.5" aria-hidden>
        <span className="size-2.5 rounded-full bg-red" />
        <span className="size-2.5 rounded-full bg-yellow" />
        <span className="size-2.5 rounded-full bg-green" />
    </span>
)

// Overlapping avatar stack: humans (initials) + agents (hedgehog), with a live "typing…" line.
const workspaceMembers: { kind: 'human' | 'agent'; label?: string; color: string }[] = [
    { kind: 'human', label: 'CL', color: 'bg-blue' },
    { kind: 'human', label: 'AB', color: 'bg-purple' },
    { kind: 'agent', color: 'bg-red' },
    { kind: 'agent', color: 'bg-green' },
]

const MultiplayerAvatars = () => (
    <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
            {workspaceMembers.map((m, i) => (
                <span
                    key={i}
                    className={`flex size-9 items-center justify-center rounded-full border-2 border-accent text-xs font-bold text-white ${m.color}`}
                >
                    {m.kind === 'human' ? m.label : <IconAI className="size-5" />}
                </span>
            ))}
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm text-secondary">
            <span className="font-semibold text-primary">agent-2</span> is typing
            <span className="inline-flex gap-0.5">
                {[0, 1, 2].map((d) => (
                    <span
                        key={d}
                        className="size-1 rounded-full bg-secondary"
                        style={{ animation: 'meep-typing 1s ease-in-out infinite', animationDelay: `${d * 0.15}s` }}
                    />
                ))}
            </span>
        </span>
    </div>
)

// What every channel keeps – the "memory" that chat windows lack.
const channelKeeps = [
    {
        Icon: IconDocument,
        color: 'text-blue',
        name: 'context.md',
        desc: 'The living brief. Agents read it, you edit it. It’s a file, because it should be.',
    },
    { Icon: IconAI, color: 'text-purple', name: 'Memory', desc: 'Decisions, past PRs, what got rejected and why.' },
    {
        Icon: IconList,
        color: 'text-green',
        name: 'To-do list',
        desc: 'Out-of-scope work lands here instead of evaporating.',
    },
    {
        Icon: IconMessage,
        color: 'text-red',
        name: 'Inbox',
        desc: 'Only this channel’s signals, not the company firehose.',
    },
]

// Oversized easter-egg sticker. On hover the kaiju hedgehog rampages.
const MiniHogzilla = ({ className = '' }: { className?: string }) => (
    <div className={`group pointer-events-auto ${className}`}>
        <img
            src="https://res.cloudinary.com/dmukukwp6/image/upload/min_hogzilla_sticker_456e11eede.png"
            alt="Hogzilla, PostHog's mascot as a city-stomping kaiju"
            className="w-full origin-bottom transition-transform duration-300 group-hover:motion-safe:animate-[hogzilla-rampage_0.6s_ease-in-out_infinite]"
        />
    </div>
)

// The three views of Home – click a chip to swap the screenshot.
const homeViews = [
    {
        key: 'list',
        Icon: IconList,
        color: 'text-yellow',
        label: 'List',
        desc: 'triage what needs you',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Home_list_e43dd0c2b5.png',
    },
    {
        key: 'board',
        Icon: IconColumns,
        color: 'text-blue',
        label: 'Board',
        desc: 'everything in flight',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Home_board_e9d7302c9e.png',
    },
    {
        key: 'config',
        Icon: IconGraph,
        color: 'text-purple',
        label: 'Config',
        desc: 'a visual workflow map',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Home_config_af49aa4881.png',
    },
]

const HomeViews = () => {
    const [active, setActive] = useState('list')
    const current = homeViews.find((v) => v.key === active) ?? homeViews[0]
    return (
        <div className="mt-auto">
            <div className="flex flex-wrap gap-2 px-6 @xl:px-8" role="tablist" aria-label="Home views">
                {homeViews.map(({ key, Icon, color, label, desc }) => {
                    const selected = key === active
                    return (
                        <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            onClick={() => setActive(key)}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                                selected
                                    ? 'border-primary bg-primary text-primary'
                                    : 'border-transparent bg-primary/50 text-secondary hover:text-primary'
                            }`}
                        >
                            <Icon className={`size-4 shrink-0 ${color}`} />
                            {label}
                            <span className="hidden font-normal text-secondary @sm:inline">– {desc}</span>
                        </button>
                    )
                })}
            </div>
            <div className="mt-5 overflow-hidden border-t border-primary leading-[0]">
                <CloudinaryImage
                    key={current.key}
                    src={current.src}
                    alt={`Home ${current.label} view`}
                    imgClassName="w-full block"
                />
            </div>
        </div>
    )
}

// "Alphas within the beta" – the shared, still-cooking workspace (channels, multiplayer, canvases, Home).
const AgenticWorkspaceSection = () => {
    return (
        <section className="relative mb-12 px-4 @xl:px-8">
            <SectionLabel>
                <span className="inline-flex flex-wrap items-center gap-2">
                    Alphas{' '}
                    <InlineIcon icon={StickerCoffee} className="!size-9 !top-2.5 -rotate-2">
                        within
                    </InlineIcon>{' '}
                    the beta
                </span>
            </SectionLabel>
            <p className="mb-8 max-w-3xl">
                PostHog Code is in beta. These bits are still <em>alpha inside it</em> – rough, changing weekly, and the
                most fun. It's where coding stops being a solo tool: your team and your agents share{' '}
                <RoughAnnotation type="underline" color="#F54E00" strokeWidth={2}>
                    one workspace
                </RoughAnnotation>
                .
            </p>

            <div className="grid gap-6 @2xl:grid-cols-2">
                {/* Channels that remember – spans both columns */}
                <div className={`@2xl:col-span-2 ${WORKSPACE_CARD}`}>
                    <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-1 bg-blue" />
                    <div className="p-6 @xl:p-8">
                        <h3 className="m-0 mb-4 flex items-center gap-2 text-xl font-bold">
                            Channels that remember <AlphaBadge />
                        </h3>
                        <p className="m-0 mb-6 max-w-2xl text-[15px] text-secondary">
                            Chat windows have amnesia. Channels don't – each one keeps its own working memory, so
                            kicking off a task means the agent already knows the history.{' '}
                            <Highlight>No re-briefing a goldfish.</Highlight>
                        </p>
                        {/* Channel window mockup */}
                        <div className="overflow-hidden rounded-md border border-primary">
                            <div className="flex items-center gap-2 border-b border-primary bg-primary px-3 py-2">
                                <WindowDots />
                                <code className="text-sm font-bold text-primary">#billing-service</code>
                                <span className="ml-auto inline-flex items-center gap-1 text-xs text-secondary">
                                    <IconMessage className="size-3.5" />
                                    remembers everything
                                </span>
                            </div>
                            <div className="grid gap-3 bg-primary p-3 @md:grid-cols-2">
                                {channelKeeps.map(({ Icon, color, name, desc }) => (
                                    <div
                                        key={name}
                                        className="flex items-start gap-3 rounded border border-primary bg-accent p-3"
                                    >
                                        <Icon className={`mt-0.5 size-5 shrink-0 ${color}`} />
                                        <div className="min-w-0">
                                            <code className="text-sm font-bold text-primary">{name}</code>
                                            <p className="m-0 mt-0.5 text-sm text-secondary">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Multiplayer */}
                <div className={WORKSPACE_CARD}>
                    <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-1 bg-purple" />
                    <div className="flex flex-1 flex-col p-6 @xl:p-8">
                        <h3 className="m-0 mb-4 flex items-center gap-2 text-xl font-bold">
                            Multiplayer, like work actually is <AlphaBadge />
                        </h3>
                        <p className="m-0 mb-6 text-[15px] text-secondary">
                            Agents are <Highlight>teammates with names.</Highlight> Your people and your agents work the
                            same threads, hand off tasks, and see the same context – in real time.
                        </p>
                        <div className="mt-auto rounded-md border border-primary bg-primary p-4">
                            <MultiplayerAvatars />
                        </div>
                    </div>
                </div>

                {/* Canvases */}
                <div className={WORKSPACE_CARD}>
                    <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-1 bg-orange" />
                    <div className="flex flex-1 flex-col p-6 @xl:p-8">
                        <h3 className="m-0 mb-4 flex items-center gap-2 text-xl font-bold">
                            Describe the tool. Get the tool. <AlphaBadge />
                        </h3>
                        <p className="m-0 mb-4 text-[15px] text-secondary">
                            Ask a channel for a report, a dashboard, or that internal refunds tool nobody ever builds –
                            and get a <Highlight>canvas</Highlight>: generative UI on PostHog's actual data model.
                        </p>
                        <div className="mt-auto">
                            <div className="mb-3 flex flex-wrap gap-2">
                                {['Build our internal refunds tool', 'Weekly revenue dashboard'].map((prompt) => (
                                    <span
                                        key={prompt}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-primary bg-primary px-3 py-1 text-xs font-medium text-primary"
                                    >
                                        <span className="text-orange">›</span>
                                        {prompt}
                                    </span>
                                ))}
                            </div>
                            {/* Generated canvas mockup */}
                            <div className="overflow-hidden rounded-md border border-primary bg-primary">
                                <div className="flex items-center gap-2 border-b border-primary px-3 py-2">
                                    <WindowDots />
                                    <span className="text-xs text-secondary">refunds-tool</span>
                                    <span className="ml-auto inline-flex items-center gap-1 rounded-sm bg-highlight px-1 py-0.5 text-[10px] font-bold text-red dark:text-yellow">
                                        <IconAI className="size-3" />
                                        canvas
                                    </span>
                                </div>
                                <div className="space-y-2.5 p-3">
                                    <div className="flex gap-2">
                                        <div className="h-7 flex-1 rounded border border-primary bg-accent" />
                                        <div className="h-7 w-16 rounded bg-orange" />
                                    </div>
                                    {[0, 1, 2].map((row) => (
                                        <div key={row} className="flex items-center gap-2">
                                            <div className="h-3 flex-1 rounded bg-accent" />
                                            <div className="h-3 w-14 rounded bg-accent" />
                                            <div className="h-5 w-12 rounded bg-green/30" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Home – moved in below the workspace features */}
                <div className={`@2xl:col-span-2 ${WORKSPACE_CARD}`}>
                    <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-1 bg-green" />
                    <div className="p-6 pb-0 @xl:p-8 @xl:pb-0">
                        <h3 className="m-0 mb-4 flex items-center gap-2 text-xl font-bold">
                            Stay in flow with Home <AlphaBadge />
                        </h3>
                        <p className="m-0 mb-5 max-w-2xl text-[15px] text-secondary">
                            Stop bouncing between GitHub, CI, and review tabs. Home pulls everything that needs you – PR
                            feedback, failing checks, review requests, stale branches – into one place, in three views
                            of the same work.
                        </p>
                    </div>
                    <HomeViews />
                </div>
            </div>

            {/* Kaiju hedgehog peeking in from the corner – hover to make it rampage */}
            <MiniHogzilla className="absolute -top-6 right-2 z-10 hidden w-24 @md:block @xl:right-6 @xl:w-32" />

            <style>{`
                @keyframes meep-typing {
                    0%, 100% { opacity: 0.25; transform: translateY(0); }
                    50% { opacity: 1; transform: translateY(-2px); }
                }
                @keyframes hogzilla-rampage {
                    0%, 100% { transform: scale(1.12) rotate(-4deg); }
                    25% { transform: scale(1.16) rotate(3deg); }
                    50% { transform: scale(1.12) rotate(-3deg); }
                    75% { transform: scale(1.16) rotate(2deg); }
                }
            `}</style>
        </section>
    )
}

// MCP marketplace: ~38 servers across six categories. Servers with a dedicated
// brand asset use a LOGOS key; the rest fall back to a favicon by domain (same
// pattern the `granola` logo already uses in constants/logos.ts).
interface MCPServer {
    name: string
    logoKey?: LogoKey
    domain?: string
}

const mcpServers: MCPServer[] = [
    { name: 'AirOps', domain: 'airops.com' },
    { name: 'Atlassian', domain: 'atlassian.com' },
    { name: 'Attio', logoKey: 'attio' },
    { name: 'Box', domain: 'box.com' },
    { name: 'Browserbase', domain: 'browserbase.com' },
    { name: 'Canva', domain: 'canva.com' },
    { name: 'Circle', domain: 'circle.so' },
    { name: 'Cisco ThousandEyes', domain: 'thousandeyes.com' },
    { name: 'Clerk', domain: 'clerk.com' },
    { name: 'ClickHouse', domain: 'clickhouse.com' },
    { name: 'Cloudflare', logoKey: 'cloudflare' },
    { name: 'Context7', domain: 'context7.com' },
    { name: 'Datadog', domain: 'datadoghq.com' },
    { name: 'Figma', domain: 'figma.com' },
    { name: 'Firetiger', domain: 'firetiger.com' },
    { name: 'GitHub', logoKey: 'github' },
    { name: 'GitLab', domain: 'gitlab.com' },
    { name: 'Granola', logoKey: 'granola' },
    { name: 'Hex', domain: 'hex.tech' },
    { name: 'HubSpot', logoKey: 'hubspot' },
    { name: 'LaunchDarkly', domain: 'launchdarkly.com' },
    { name: 'Linear', logoKey: 'linear' },
    { name: 'Mem0', domain: 'mem0.ai' },
    { name: 'Monday', domain: 'monday.com' },
    { name: 'Neon', domain: 'neon.tech' },
    { name: 'Notion', domain: 'notion.so' },
    { name: 'PagerDuty', domain: 'pagerduty.com' },
    { name: 'PlanetScale', domain: 'planetscale.com' },
    { name: 'Postman', domain: 'postman.com' },
    { name: 'Prisma', domain: 'prisma.io' },
    { name: 'Render', domain: 'render.com' },
    { name: 'Sanity', domain: 'sanity.io' },
    { name: 'Sentry', logoKey: 'sentry' },
    { name: 'Slack', logoKey: 'slack' },
    { name: 'Stripe', logoKey: 'stripe' },
    { name: 'Supabase', logoKey: 'supabase' },
    { name: 'Svelte', domain: 'svelte.dev' },
    { name: 'Wix', domain: 'wix.com' },
]

const mcpServerIcon = (server: MCPServer): string =>
    server.logoKey ? LOGOS[server.logoKey] : `https://www.google.com/s2/favicons?domain=${server.domain}&sz=64`

const SupportedLLMs = () => {
    return (
        <section className="relative mb-12 px-4 @xl:px-8">
            {/* One combined layout: supported-model chips under the title (left),
                the open-source story + cost annotation in the other column (right).
                Both headings live inside the grid so they sit in the same row. */}
            <div className="grid items-start gap-10 @xl:grid-cols-2 @xl:gap-12">
                {/* Left: supported models as compact chip rows, under the main title */}
                <div className="space-y-4">
                    <h2 className="text-2xl mb-3">Supported LLMs</h2>
                    <div>
                        <p className="m-0 mb-1.5 text-xs font-semibold uppercase tracking-wide text-secondary">
                            OpenAI
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <code className="text-sm font-bold text-primary">GPT-5.5</code>
                            <code className="text-sm font-bold text-primary">GPT-5.4</code>
                        </div>
                    </div>
                    <div>
                        <p className="m-0 mb-1.5 text-xs font-semibold uppercase tracking-wide text-secondary">
                            Anthropic
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <code className="text-sm font-bold text-primary">Claude Fable 5</code>
                            <code className="text-sm font-bold text-primary">Claude Sonnet 4.6</code>
                            <code className="text-sm font-bold text-primary">Claude Opus 4.8</code>
                            <code className="text-sm font-bold text-primary">Claude Opus 4.7</code>
                            <code className="text-sm font-bold text-primary">Claude Haiku 4.5</code>
                        </div>
                    </div>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog_fable_task_light_80d657b9d6.png"
                        alt="Picking a model for a task in PostHog Code"
                        className="dark:hidden pt-2"
                        imgClassName="w-full rounded border border-primary shadow-xl"
                    />
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog_fable_task_dark_e30ddc1938.png"
                        alt="Picking a model for a task in PostHog Code"
                        className="hidden dark:block pt-2"
                        imgClassName="w-full rounded border border-primary shadow-xl"
                    />
                </div>

                {/* Right: subheading (the open-source one), copy, and the hand-drawn cost stat */}
                <div>
                    <h3 className="text-xl mb-3">Open-source models got good? (awkward)</h3>
                    <p className="m-0 mb-1.5 text-xs font-semibold uppercase tracking-wide text-secondary">
                        We support
                    </p>
                    <div className="mb-4 flex flex-wrap items-baseline gap-2">
                        <code className="text-sm font-bold text-primary">GLM-5.2</code>
                        <span className="text-sm font-medium italic text-secondary">
                            …and more, if you have{' '}
                            <Link
                                to="https://discord.com/invite/E9xV2WnR98"
                                externalNoIcon
                                className="font-bold not-italic text-red dark:text-yellow"
                            >
                                requests
                                <IconArrowUpRight className="inline-block size-4 align-text-bottom" />
                            </Link>
                        </span>
                    </div>
                    <p className="mb-3 leading-relaxed">
                        The gap between open and frontier models went from “lol” to “wait…” real quick. For a big slice
                        of real coding work, open models now do the same job for a tenth of the price.
                    </p>
                    <p className="mb-6 leading-relaxed">
                        PostHog Code runs both. Pay token cost (with no markup) on the best tool for the job.
                    </p>

                    <div className="leading-none">
                        <p className="m-0 text-3xl font-bold">
                            <RoughAnnotation
                                type="circle"
                                color="#F54E00"
                                strokeWidth={3}
                                padding={[10, 18]}
                                iterations={3}
                                delay={200}
                            >
                                1/10th
                            </RoughAnnotation>
                        </p>
                        <p className="m-0 mt-1 text-2xl font-bold">
                            the price
                            <Tooltip
                                delay={0}
                                trigger={
                                    <sup className="ml-1 cursor-help text-base text-secondary hover:text-primary">
                                        *
                                    </sup>
                                }
                            >
                                Probably. You can run the numbers.
                            </Tooltip>
                        </p>
                        <p className="m-0 mt-3 text-xs font-semibold uppercase tracking-wide text-secondary">
                            For a lot of coding work
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const MCPMarketplace = () => {
    return (
        <section className="relative mb-12 px-4 @xl:px-8">
            <SectionLabel>MCP marketplace</SectionLabel>
            <p>Extend your agents with tools, data, and integrations.</p>

            {/* Cap the height and fade the bottom into the page bg so the list reads as "and more" */}
            <div className="relative mt-4 max-h-64 overflow-hidden">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 @sm:grid-cols-3 @lg:grid-cols-4 @2xl:grid-cols-6">
                    {mcpServers.map((server) => (
                        <div key={server.name} className="flex min-w-0 items-center gap-2">
                            <img
                                src={mcpServerIcon(server)}
                                alt=""
                                className="size-5 shrink-0 rounded object-contain"
                                loading="lazy"
                                aria-hidden
                            />
                            <p className="m-0 truncate text-sm font-semibold text-primary">{server.name}</p>
                        </div>
                    ))}
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-[rgb(var(--bg)/0)] to-[rgb(var(--bg))]" />
            </div>
        </section>
    )
}

// Third beat of the opening narrative (old way → PostHog way → this): the job abstracting up.
const BiggerPictureSection = () => {
    return (
        <section className="relative mb-8 @xl:mb-12 px-4 @xl:px-8">
            <SectionLabel>
                <InlineIcon icon={StickerCoffee} className="!size-10 !top-3 -rotate-1">
                    Congratulations
                </InlineIcon>{' '}
                on your promotion
            </SectionLabel>

            <p className="text-base leading-loose">
                <ChoppyReveal wordDelay={40}>
                    {'You used to write code. Then you '}
                    <em>prompted outputs</em>
                    {
                        ". Now you orchestrate outcomes. PostHog Code is built for the abstraction level you're moving to next – and the work that "
                    }
                    <RoughAnnotation type="underline" color="#F54E00" strokeWidth={2}>
                        <em>isn't quite possible yet</em>
                    </RoughAnnotation>
                    {", but you'll probably be doing soon."}
                </ChoppyReveal>
            </p>

            {/* The punch line at the end of the narrative */}
            <div className="mt-8 flex justify-center @xl:justify-start">
                <LetPostHogScroller />
            </div>
        </section>
    )
}

const InboxCallout = () => {
    return (
        <section className="relative mb-6 @2xl:mb-8 px-4 @xl:px-8">
            <div className="relative overflow-hidden rounded-md border border-primary bg-accent">
                <div className="grid gap-6 p-6 @2xl:grid-cols-2 @2xl:items-center @2xl:gap-10 @2xl:p-8">
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <StickerPullRequest className="size-8 -rotate-3" />
                            <h2 className="m-0 text-2xl">Part of the self-driving loop</h2>
                        </div>
                        <ul className="m-0 mb-6 list-none space-y-3 p-0">
                            <li>
                                <strong>Desktop</strong> is where you do the work – run and steer agents, solo or with
                                your team.
                            </li>
                            <li>
                                <Link
                                    to="/slack"
                                    state={{ newWindow: true }}
                                    className="font-bold text-red dark:text-yellow"
                                >
                                    Slack
                                </Link>{' '}
                                is where you talk it through – tag <code>@PostHog</code> to ship without leaving the
                                thread.
                            </li>
                            <li>
                                <Link
                                    to="/products"
                                    state={{ newWindow: true }}
                                    className="font-bold text-red dark:text-yellow"
                                >
                                    Web
                                </Link>{' '}
                                and{' '}
                                <Link
                                    to="/mcp"
                                    state={{ newWindow: true }}
                                    className="font-bold text-red dark:text-yellow"
                                >
                                    MCP
                                </Link>{' '}
                                are where you dig into what happened – analytics, replays, flags, queried however you
                                like.
                            </li>
                        </ul>
                        <OSButton asLink to="/self-driving" state={{ newWindow: true }} variant="primary" size="md">
                            How self-driving works
                        </OSButton>
                    </div>

                    <div className="relative">
                        <p className="mb-5 text-center text-sm text-muted">
                            Waking up to three PRs for papercuts that would have derailed your day? Ah, that's bliss.
                        </p>
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/inbox_light_9aa9eed335.png"
                            alt="The Inbox surfacing reports and pull requests in PostHog Code"
                            className="dark:hidden w-full rounded border border-primary shadow-2xl"
                        />
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/inbox_dark_216a157762.png"
                            alt="The Inbox surfacing reports and pull requests in PostHog Code"
                            className="hidden dark:block w-full rounded border border-primary shadow-2xl"
                        />
                    </div>
                </div>

                {/* Hogzilla banner anchored to the bottom-right of the box, on top of everything */}
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/self_driving_banner_fde531c7fb.png"
                    alt=""
                    className="absolute bottom-0 right-0 z-20 w-72 @lg:w-96 @2xl:w-[32rem]"
                    imgClassName="w-full"
                />
            </div>
        </section>
    )
}

const TLDR = () => {
    return (
        <section className="relative mb-8 @2xl:mb-12 px-4 @xl:px-8">
            <h2 className="text-2xl font-bold mb-2">Try it</h2>
            <p className="m-0">PostHog Code is launching in Summer 2026.</p>
            <div className="mt-2 grid items-center gap-8 @2xl:grid-cols-2 @2xl:gap-12">
                <div className="@container bg-blue/10 border border-blue rounded-md px-8 py-6 shadow-xl">
                    <WaitlistForm />
                </div>
                <div>
                    <MeepNotification className="mb-5 flex justify-center @2xl:justify-start" />
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/evolution_of_build_mode_0bdd109b00.png"
                        alt="The evolution of build mode"
                        className="w-full"
                        imgClassName="w-full"
                    />
                </div>
            </div>
        </section>
    )
}

const FAQ_ITEMS = [
    {
        trigger: 'What is PostHog Code?',
        content: (
            <div className="space-y-3">
                <p>
                    PostHog Code is a{' '}
                    <a href="/docs/posthog-code" className="underline">
                        desktop coding agent
                    </a>{' '}
                    that understands your product and business, not just your source code. It picks up work from product
                    signals – errors, support tickets, session replays, GitHub issues, Linear, Zendesk – researches the
                    causes, and ships pull requests for you to review.
                </p>
                <p>
                    You can also drive it manually like a regular coding agent: open a{' '}
                    <a href="/docs/posthog-code/tasks" className="underline">
                        task
                    </a>
                    , describe what you want, and watch it work. Run tasks locally, in an isolated{' '}
                    <a href="/docs/posthog-code/worktrees" className="underline">
                        worktree
                    </a>
                    , or in a{' '}
                    <a href="/docs/posthog-code/cloud-runs" className="underline">
                        PostHog-managed cloud sandbox
                    </a>
                    .
                </p>
            </div>
        ),
    },
    {
        trigger: "What's the difference between PostHog AI and PostHog Code?",
        content: (
            <div className="space-y-3">
                <p>
                    PostHog AI is the product assistant built into PostHog Cloud. It's deeply integrated with your data
                    and helps with things like writing SQL and analyzing user behavior through natural-language prompts.
                </p>
                <p>
                    PostHog Code is a desktop application focused on shipping code. It orchestrates multiple coding
                    agents from different providers (Anthropic, OpenAI) and turns product signals – errors, support
                    tickets, session replay trends – into PRs.
                </p>
                <p>
                    In a nutshell:{' '}
                    <strong>PostHog AI helps you understand your product. PostHog Code helps you build it.</strong>
                </p>
            </div>
        ),
    },
    {
        trigger: 'Why is PostHog building a coding agent?',
        content: (
            <div className="space-y-3">
                <p>
                    The latest generation of AI-powered coding agents are remarkably capable at writing code. But
                    there's a problem: they have <em>no idea what your product is or what your users need.</em>
                </p>
                <p>
                    <strong>That context already lives in PostHog</strong>. When your product data and AI agents work
                    together, agents can automatically run analysis, fix bugs, and write pull requests so you can focus
                    on more high-value work.
                </p>
            </div>
        ),
    },
    {
        trigger: 'Does it replace Cursor or Claude Code?',
        content: (
            <div className="space-y-3">
                <p>
                    Yep! PostHog Code is a full desktop coding agent – not just a plugin for another editor – so you can
                    use it as your primary tool for generating code.
                </p>
                <p>
                    If you'd rather keep your existing editor, you can still get the product-data layer: the PostHog MCP
                    server works with Cursor, Claude Code, Windsurf, and VS Code with Copilot.
                </p>
            </div>
        ),
    },
    {
        trigger: 'What models and editors does it work with?',
        content: (
            <div className="space-y-3">
                <p>
                    PostHog Code is built on top of two{' '}
                    <a href="/docs/posthog-code/use-any-model-and-harness" className="underline">
                        harnesses
                    </a>
                    : Claude Code and Codex. You can pick the harness, model, and reasoning effort per task.
                </p>
                <p>
                    If you'd rather keep your existing editor, the PostHog MCP server works with any MCP-compatible
                    agent, including Claude Code, Cursor, Windsurf, and VS Code with Copilot.
                </p>
            </div>
        ),
    },
    {
        trigger: "What if I don't use PostHog yet?",
        content: (
            <p>
                PostHog Code runs on top of PostHog, so you'll need to be on PostHog first. The good news: PostHog is
                free up to{' '}
                <a href="/pricing" className="underline">
                    generous limits
                </a>
                , and installation takes about 90 seconds with the wizard.
            </p>
        ),
    },
    {
        trigger: 'How does it decide what to work on?',
        content: (
            <div className="space-y-3">
                <p>
                    You can always just tell it what to do. But Code also has an Inbox: PostHog's{' '}
                    <a href="/self-driving" className="underline">
                        self-driving
                    </a>{' '}
                    layer watches your product, ranks what needs doing by importance, impact, and severity, and files it
                    as reports you can turn into a task in a click.
                </p>
                <p>
                    The full ranking, signal sources, and priority thresholds live in the{' '}
                    <a href="/docs/self-driving" className="underline">
                        self-driving docs
                    </a>{' '}
                    – Code is where you review and action what it surfaces.
                </p>
            </div>
        ),
    },
    {
        trigger: 'Where do tasks run – locally or in the cloud?',
        content: (
            <div className="space-y-3">
                <p>
                    <a href="/docs/posthog-code/tasks" className="underline">
                        Three modes
                    </a>
                    , picked per task:
                </p>
                <p>
                    <strong>Local</strong> runs in your current branch and working directory.{' '}
                    <a href="/docs/posthog-code/worktrees" className="underline">
                        <strong>Worktree</strong>
                    </a>{' '}
                    creates an isolated git worktree per task, so you can run several agents in parallel without
                    stepping on each other.{' '}
                    <a href="/docs/posthog-code/cloud-runs" className="underline">
                        <strong>Cloud</strong>
                    </a>{' '}
                    runs in a PostHog-managed sandbox that survives app restarts, sleeps, and network changes.
                </p>
                <p>
                    You can hand a task off mid-flight – start in the cloud and pull it down to local to finish, or vice
                    versa. The full conversation history and any uncommitted changes come with it.
                </p>
            </div>
        ),
    },
    {
        trigger: 'Is my code sent to PostHog?',
        content: (
            <div className="space-y-3">
                <p>
                    Your code stays in GitHub. PostHog Code agents access your repo to open PRs, much like any CI/CD
                    integration.
                </p>
                <p>
                    The local{' '}
                    <a href="/docs/posthog-code/posthog-integration" className="underline">
                        enricher
                    </a>{' '}
                    uses tree-sitter to detect PostHog SDK calls right on your machine – no source code is uploaded for
                    that.{' '}
                    <a href="/docs/posthog-code/cloud-runs" className="underline">
                        Cloud tasks
                    </a>{' '}
                    run in a PostHog-managed sandbox with configurable network rules (trusted allowlist, full internet,
                    or custom).
                </p>
            </div>
        ),
    },
    {
        trigger: 'Is my PostHog data safe?',
        content: (
            <p>
                Yes. PostHog Code queries your data through the PostHog API using your personal API key. Data is never
                stored, cached, or sent anywhere other than to PostHog&apos;s servers, and you control exactly what the
                agent can access through your API key&apos;s permissions.
            </p>
        ),
    },
    {
        trigger: 'Can it modify my PostHog configuration?',
        content: (
            <div className="space-y-3">
                <p>
                    Yes – PostHog Code can both read and write to PostHog, depending on your API key permissions. It can
                    create feature flags, set up experiments, build dashboards, and define actions.
                </p>
                <p>
                    Every write operation requires explicit approval from the agent's permission system – nothing
                    happens without your confirmation.
                </p>
            </div>
        ),
    },
    {
        trigger: 'How much does it cost?',
        content: (
            <div className="space-y-3">
                <p>
                    PostHog Code is usage-based – there's no fixed subscription. You spend AI credits as you go (100
                    credits = $1), and credits reflect the underlying model's cost exactly, with no markup on top.
                </p>
                <p>
                    Every organization gets a $20/month free tier to explore, plus a default $50 billing limit so you
                    don't rack up costs by accident (customize it anytime). Simple tasks use very few credits; larger,
                    multi-file work uses more. See the{' '}
                    <a href="/docs/posthog-code/pricing" className="underline">
                        pricing docs
                    </a>{' '}
                    for the full breakdown.
                </p>
                <p>
                    If your agents did nothing this month, you pay nothing this month. (Imagine Anthropic saying that.)
                </p>
            </div>
        ),
    },
    {
        trigger: 'Is it open source?',
        content: (
            <p>
                <a href="/docs/posthog-code/open-source" className="underline">
                    Yes – MIT licensed
                </a>
                , with the monorepo{' '}
                <a href="https://github.com/PostHog/code" className="underline">
                    on GitHub
                </a>
                . The desktop app, agent framework, enricher, and bundled skills all live there. macOS is officially
                supported; Windows is community-maintained.
            </p>
        ),
    },
]

function FAQ() {
    return (
        <section className="mb-8 px-4 @xl:px-8">
            <h2 className="text-2xl m-0 mb-6">Frequently asked questions</h2>

            <Accordion
                type="multiple"
                triggerClassName="!px-3 !py-2"
                contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                items={FAQ_ITEMS}
            />
        </section>
    )
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export function DownloadButton() {
    return (
        <div className="py-6">
            <WaitlistForm />
        </div>
    )
}

export default function CodePage() {
    const [postHogWayDone, setPostHogWayDone] = useState(false)

    return (
        <>
            <SEO
                title="PostHog Code"
                description="A desktop app for steering coding agents and editing your product"
                structuredData={buildProductStructuredData({
                    name: 'PostHog Code',
                    description: 'A desktop app for steering coding agents and editing your product',
                    slug: 'code',
                    operatingSystem: 'macOS, Windows, Linux',
                })}
            />
            <Editor slug="/code" maxWidth="100%" hasPadding={false} disableFormatting>
                <div className="@container not-prose font-rounded">
                    <header className="relative mb-12 border-b border-primary bg-primary shadow-xl">
                        <div className="relative flex flex-col items-center w-full px-4 @xl:px-8 py-6 @xl:py-8">
                            <HeroSection />
                        </div>
                    </header>

                    <div className="max-w-4xl mx-auto">
                        <OldWaySection />

                        <PostHogWaySection onComplete={() => setPostHogWayDone(true)} />

                        <BiggerPictureSection />

                        <TableStakesSection />

                        <Features />

                        <AgenticWorkspaceSection />

                        <SupportedLLMs />

                        <MCPMarketplace />

                        <InboxCallout />

                        <TLDR ready={postHogWayDone} />

                        <FAQ />
                    </div>
                </div>
            </Editor>
        </>
    )
}
