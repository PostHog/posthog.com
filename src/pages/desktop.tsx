import React, { useEffect, useRef, useState } from 'react'
import SEO, { buildProductStructuredData } from 'components/seo'
import Editor from 'components/Editor'
import {
    IconAI,
    IconArrowUpRight,
    IconBolt,
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
    IconLive,
    IconMessage,
    IconPulse,
    IconRewindPlay,
    IconSparkles,
    IconStack,
    IconToggle,
    IconTrends,
    IconWarning,
    IconX,
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
import { DottedConnection } from 'components/Code/DottedConnection'
import { StickerTombstone, StickerMayor, StickerPullRequest, StickerAi } from 'components/Stickers/Stickers'
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
    return <h2 className="text-2xl font-bold mb-4">{children}</h2>
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
    const [showDownload, setShowDownload] = useState(false)
    const [contentVisible, setContentVisible] = useState(true)
    const prefersReducedMotion = usePrefersReducedMotion()

    // Read the #download hash after mount so SSR and first client render agree (no hydration mismatch).
    useEffect(() => {
        if (window.location.hash === '#download') setShowDownload(true)
    }, [])

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
        <section className="w-full tracking-[-0.0125em]">
            {/* Top header bar: the page's own title strip (scroller + Discord) with a divider line */}
            <div className="mb-8 flex items-center justify-between gap-4 border-b border-primary pb-3">
                <LetPostHogScroller className="text-xl @xl:text-2xl font-bold tracking-tight" />
                <Link
                    className="group flex shrink-0 items-center gap-1 text-sm font-semibold text-secondary hover:text-primary"
                    to="https://discord.com/invite/E9xV2WnR98"
                    externalNoIcon
                >
                    <IconDiscord className="size-6 text-secondary group-hover:text-primary" />
                    <span className="group-hover:underline">Discord</span>
                    <IconArrowUpRight className="size-4 inline-block text-secondary invisible group-hover:visible" />
                </Link>
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
                        <h1 className="!mt-0 mb-4 text-xl font-bold leading-tight @xl:mb-8 @xl:text-3xl">
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

                        <div className="flex flex-col items-start @4xl/editor:flex-row @4xl/editor:gap-8">
                            <div className="@4xl/editor:flex-[0_0_280px]">
                                <p>
                                    PostHog Desktop is the app for <strong>steering coding agents</strong> – and it
                                    edits your <strong>product</strong>, not just your <strong>codebase</strong>.
                                </p>
                                <ul className="mb-4 list-none space-y-0.5 p-0 text-[15px]">
                                    {[
                                        'Run and steer a fleet of agents',
                                        'Instruments and configures PostHog as it builds',
                                        'Ships pull requests you review',
                                    ].map((item) => (
                                        <li key={item} className="relative pl-5">
                                            <IconCheck className="absolute left-0 top-1 size-4 text-green" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <div className="@container max-w-sm">
                                    <WaitlistForm />
                                    <p className="mt-4 text-sm text-secondary">
                                        Have an invite code?{' '}
                                        <Link
                                            to="/desktop#download"
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

                            <div className="w-full min-w-0 @4xl/editor:flex-1">
                                <div className="overflow-hidden rounded-md shadow-xl not-prose">
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
    const tableStakes = [
        { text: "You're using Claude Code, Codex, or another agent to prompt real engineering work", checked: true },
        { text: "You've got the PostHog MCP wired into your editor, terminal, maybe your CI", checked: true },
        { text: "Running a handful of agents in parallel doesn't even feel like a flex anymore", checked: false },
        { text: 'Every session starts cold, no memory of the last decision or PR', checked: false },
        { text: "You're still the one watching the rollout and catching regressions", checked: false },
    ]

    return (
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
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
                className="-mt-14 mb-5 hidden w-44 float-right ml-8 @xl:block"
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

            {/* Table stakes + receipt: the standard starter pack every AI tool ships (also the "old way") */}
            <div className="clear-both mt-10 grid items-start gap-8 @2xl:grid-cols-2 @2xl:gap-12">
                <div>
                    <h3 className="mb-3 text-xl font-bold">Sound familiar?</h3>
                    <ul className="m-0 list-none space-y-2.5 p-0">
                        {tableStakes.map(({ text, checked }) => (
                            <li key={text} className="flex items-start gap-2.5">
                                {checked ? (
                                    <IconCheck className="relative top-0.5 size-5 shrink-0 text-green" />
                                ) : (
                                    <IconX className="relative top-0.5 size-5 shrink-0 text-red" />
                                )}
                                <span className="text-base">{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="@2xl:pl-4">
                    <div className="relative mx-auto w-full max-w-xs">
                        {/* Lemon hog tucked behind the receipt's upper-right corner, peeking out */}
                        <img
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/lemon_9cb7b3a156.png"
                            alt=""
                            aria-hidden
                            className="pointer-events-none absolute -right-20 top-8 z-0 w-28 rotate-12 @xl:w-32"
                        />
                        <div className="relative z-10">
                            <AgentMartReceipt />
                        </div>
                        {/* Banana hog lounging on top of the receipt's bottom-left */}
                        <img
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/banana_relax_83149feac6.png"
                            alt="A hedgehog relaxing with a banana"
                            className="pointer-events-none absolute -bottom-10 -left-14 z-20 w-32 @xl:w-36"
                        />
                    </div>
                </div>
            </div>
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
        <section ref={sectionRef} className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
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
                            <strong>{' PostHog Desktop'}</strong>
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
                            <span className="text-green text-sm">&#9679;</span> <strong>production data</strong> and
                            ships improvements while you sleep.
                        </ChoppyReveal>
                    </p>
                </div>

                <p className="text-base leading-loose mb-5">
                    <ChoppyReveal wordDelay={25} initialDelay={p1Done ? 0 : 999999} onComplete={() => setP2Done(true)}>
                        {'Bring the big idea. Run '}
                        <RoughAnnotation type="box" color="currentColor" strokeWidth={1} padding={2}>
                            <strong className="inline-block">a fleet of agents</strong>
                        </RoughAnnotation>
                        {'. Watch your product thinking become shaped, shippable work.'}
                    </ChoppyReveal>
                </p>

                <p className="text-base leading-loose mb-5">
                    <ChoppyReveal wordDelay={25} initialDelay={p2Done ? 0 : 999999} onComplete={() => onComplete?.()}>
                        <strong>TL;DR:</strong> Other AI tools edit your code.{' '}
                        <RoughAnnotation type="underline" color="currentColor" strokeWidth={1.5} delay={400}>
                            <span className="inline-block">
                                <strong>PostHog Desktop</strong> edits your product.
                            </span>
                        </RoughAnnotation>
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
                <p className="m-0 text-center font-bold tracking-widest">2026 AGENT MART</p>
                <p className="m-0 mb-4 text-center text-xs italic text-[#8a8272]">(yep, PostHog has that)</p>

                <div className="space-y-1">
                    <ReceiptRow label="parallel agents" />
                    <ReceiptRow label="multi model" />
                    <ReceiptRow label="MCP support" />
                    <ReceiptRow label="diff review" />
                    <ReceiptRow label="checkpoints & rollback" />
                    <ReceiptRow label="isolated worktrees" />
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

// ─────────────────────────────────────────────
// "meep.mov" desktop notification → video popup
// A macOS-style notification toast (see reference). Clicking it opens the
// video in a modal, the same way demo.mov plays on the homepage.
// ─────────────────────────────────────────────

// The "meep" video – https://posthog.wistia.com/medias/v7t0y7ynmn
const MEEP_VIDEO_ID = 'v7t0y7ynmn'

// Notification copy — mimics a macOS "task finished" toast (see reference screenshot).
const MEEP_NOTIFICATION = {
    app: 'PostHog Desktop',
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

// Shown on the "Instrumentation" carousel slide: what PostHog Desktop wires up as it builds.
const instrumentationItems = [
    {
        icon: IconPulse,
        color: 'text-pink',
        title: 'Capture logs',
        description: 'Adds structured logging as it writes the code, so you can see what actually ran in production.',
    },
    {
        icon: IconGraph,
        color: 'text-blue',
        title: 'Track events',
        description: 'Instruments the events for anything new it builds, so usage shows up in PostHog on its own.',
    },
    {
        icon: IconWarning,
        color: 'text-yellow',
        title: 'Track errors',
        description: 'Turns on exception capture so new code reports errors with full stack traces.',
    },
    {
        icon: IconLive,
        color: 'text-purple',
        title: 'Trace LLM calls',
        description: 'Wraps your AI features so every model call is traced with cost, latency, and output.',
    },
    {
        icon: IconToggle,
        color: 'text-teal',
        title: 'Add a feature flag',
        description: 'Ships the change behind a flag so you can roll it out slowly and kill it fast if needed.',
    },
    {
        icon: IconFlask,
        color: 'text-purple',
        title: 'Run an experiment',
        description: 'Scaffolds an A/B test with variants and a goal metric, then reads the result once data lands.',
    },
]

// Colour-chip emphasis for part of a carousel slide's title, à la the self-driving carousel
// (TabPanel's highlightedTitle) – ties the highlighted phrase to the tab's own accent colour.
type FeaturePanelHighlightColor = 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'fuchsia'
const featurePanelHighlightClasses: Record<FeaturePanelHighlightColor, string> = {
    blue: 'bg-blue/10 text-blue dark:bg-blue/20',
    green: 'bg-green/10 text-green dark:bg-green/20',
    yellow: 'bg-yellow/15 text-yellow dark:bg-yellow/20',
    red: 'bg-red/10 text-red dark:bg-red/20',
    purple: 'bg-purple/10 text-purple dark:bg-purple/20',
    fuchsia: 'bg-fuchsia/10 text-fuchsia dark:bg-fuchsia/20',
}

// Carousel slide panel, à la the /slack and /self-driving carousels: title + body on
// a bg-primary card, with the screenshot bleeding flush to the card's bottom edge.
const FeaturePanel = ({
    title,
    highlightedTitle,
    titleSuffix,
    highlightColor = 'blue',
    alpha = false,
    imageLight,
    imageDark,
    imageAlt,
    children,
}: {
    title: string
    highlightedTitle?: string
    titleSuffix?: string
    highlightColor?: FeaturePanelHighlightColor
    alpha?: boolean
    imageLight?: string
    imageDark?: string
    imageAlt?: string
    children: React.ReactNode
}) => {
    const fullTitle = [title, highlightedTitle, titleSuffix].filter(Boolean).join(' ')
    const heading = (
        <h3 className={`m-0 text-2xl font-bold ${alpha ? '' : 'mt-0 mb-2'}`}>
            {title}
            {highlightedTitle && (
                <>
                    {' '}
                    <span className={`rounded-sm px-0.5 ${featurePanelHighlightClasses[highlightColor]}`}>
                        {highlightedTitle}
                    </span>
                    {titleSuffix ? ` ${titleSuffix}` : null}
                </>
            )}
        </h3>
    )
    return (
        <div className="flex h-full flex-col rounded bg-primary p-4 @xl:p-6">
            {alpha ? (
                <div className="mb-2 flex items-center gap-2">
                    {heading}
                    <AlphaBadge />
                </div>
            ) : (
                heading
            )}
            <div className="flex-1 text-[15px] text-secondary">{children}</div>
            {imageLight && imageDark && (
                <div className="-mx-4 -mb-4 mt-4 overflow-hidden rounded-b leading-[0] @xl:-mx-6 @xl:-mb-6">
                    <CloudinaryImage
                        src={imageLight}
                        alt={imageAlt || fullTitle}
                        className="dark:hidden"
                        imgClassName="w-full block"
                    />
                    <CloudinaryImage
                        src={imageDark}
                        alt={imageAlt || fullTitle}
                        className="hidden dark:block"
                        imgClassName="w-full block"
                    />
                </div>
            )}
        </div>
    )
}

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

// Highlighted callout inside a carousel slide, à la the Slack app page carousel.
const SlideCallout = ({ children }: { children: React.ReactNode }) => (
    <div className="mt-5 rounded border border-yellow bg-yellow/10 px-3 py-2.5 text-sm text-secondary">{children}</div>
)

// Model name pill – same treatment as the <codebase /> tag in "The old way" section.
const ModelChip = ({ children }: { children: React.ReactNode }) => (
    <code className="inline-block rounded-sm border border-blue bg-blue/10 px-1 font-mono font-bold leading-normal not-italic">
        {children}
    </code>
)

// Titled columns of icon + example items, à la the self-driving "scouts" tab: a short group title
// and description, with a few concrete examples listed underneath each.
type IconGroup = {
    title: string
    description: string
    items: { Icon: React.ComponentType<{ className?: string }>; color: string; name: string }[]
}
const IconGroupColumns = ({ groups }: { groups: IconGroup[] }) => (
    <div className="mt-4 grid grid-cols-1 gap-6 @sm:grid-cols-2">
        {groups.map((group) => (
            <div key={group.title} className="@container flex flex-col gap-2">
                <div>
                    <p className="m-0 text-base font-bold text-primary">{group.title}</p>
                    <p className="m-0 text-sm text-secondary">{group.description}</p>
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-1.5 @xs:grid-cols-2">
                    {group.items.map(({ Icon, color, name }) => (
                        <span key={name} className="flex items-start gap-1.5 text-sm text-primary">
                            <Icon className={`mt-0.5 size-5 shrink-0 ${color}`} />
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        ))}
    </div>
)

const featureTabs: TabbedCarouselTab[] = [
    {
        value: 'plan',
        label: 'Plan',
        color: 'bg-green',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <FeaturePanel
                title="Agree on the"
                highlightedTitle="plan"
                titleSuffix="before any code"
                highlightColor="green"
                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/plan_mode_light_f271562e0c.png"
                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/plan_mode_dark_e8253c4a4e.png"
                imageAlt="Plan mode: clarifying questions and an implementation plan to approve"
            >
                <p className="m-0">
                    If dangerously skipping permissions isn't always your thing, coding tasks can start in Plan mode.
                    The agent explores your repo and product data, asks clarifying questions, then writes an
                    implementation plan you approve.
                </p>
                <div className="not-prose mt-4 grid grid-cols-1 gap-4 @sm:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconToggle className="size-5 shrink-0 text-green" />
                            <span className="text-base font-bold text-primary">Mode</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Accept Edits, Plan Mode, or Auto Mode (switch anytime, even mid-task)
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconAI className="size-5 shrink-0 text-purple" />
                            <span className="text-base font-bold text-primary">Model</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            The latest models from Anthropic and OpenAI, plus open source models like GLM
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconBolt className="size-5 shrink-0 text-orange" />
                            <span className="text-base font-bold text-primary">Effort level</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Low for quick edits, high when it actually needs to think.
                        </p>
                    </div>
                </div>
            </FeaturePanel>
        ),
    },
    {
        value: 'tasks',
        label: 'Prompt',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        content: (
            <FeaturePanel
                title="Describe the work,"
                highlightedTitle="not the diff"
                highlightColor="yellow"
                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/prompt_task_light_ad118d1efc.png"
                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/prompt_task_dark_6cb8a38596.png"
                imageAlt="Prompting a task in PostHog Desktop"
            >
                <p className="m-0">
                    Tell it what you want built, like you would a teammate. It plans the approach, writes the code, and
                    opens the PR – and you can still jump in while it works.
                </p>
                <IconGroupColumns
                    groups={[
                        {
                            title: 'Steer',
                            description: 'Redirect it mid-task, right now.',
                            items: [
                                { Icon: IconBolt, color: 'text-orange', name: '"Wait, that\'s out of scope"' },
                                { Icon: IconBolt, color: 'text-orange', name: '"No, edit the API route, not the UI"' },
                            ],
                        },
                        {
                            title: 'Queue',
                            description: "Line up what's next, then step away.",
                            items: [
                                { Icon: IconStack, color: 'text-purple', name: 'Three tickets before you leave' },
                                { Icon: IconStack, color: 'text-purple', name: 'This PR, then the next one' },
                            ],
                        },
                    ]}
                />
            </FeaturePanel>
        ),
    },
    {
        value: 'command-center',
        label: 'Orchestrate',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <FeaturePanel
                title="Manage multiple coding agents"
                highlightedTitle="in parallel"
                highlightColor="blue"
                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/command_center_dark_1_4295f77be1.png"
                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/command_center_dark_358aba9c5b.png"
                imageAlt="Manage multiple coding agents in parallel"
            >
                <p className="m-0">
                    Run a whole fleet at once from the command center. Split-screen presets let you watch agents
                    side-by-side or in a 2x2 or 3x3 grid, each in its own isolated worktree – so nothing steps on
                    anything else.
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
        value: 'instrument',
        label: 'Instrument',
        color: 'bg-purple',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <FeaturePanel title="Ship the change," highlightedTitle="measure what happened" highlightColor="purple">
                <p className="m-0">
                    Code that ships without instrumentation is a guess wearing a lab coat. PostHog Desktop wires up the
                    measurement in the same breath as the feature, so "did it work?" has an answer the moment it's live.
                </p>
                <SlideCallout>
                    <strong className="text-primary">"We'll add tracking later" is a lie you tell yourself.</strong>{' '}
                    PostHog Desktop just does it now, so there's no later to never get around to.
                </SlideCallout>
                <ul className="mt-5 grid list-none grid-cols-1 gap-x-8 gap-y-4 p-0 @sm:grid-cols-2">
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
                title="Built-in"
                highlightedTitle="skills library"
                highlightColor="red"
                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/skills_light_sidepanel_bae81ae8d5.png"
                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/skills_dark_sidepanel_8e104c098d.png"
                imageAlt="Built-in skills library"
            >
                <p className="m-0">
                    A library of built-in skills lets your agents do real PostHog work – not just write code, but query
                    your data and wire up the product features that measure it.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-3 @sm:grid-cols-3">
                    {['Personal skills', 'Team skills', 'Skills marketplace'].map((label) => (
                        <div key={label} className="flex items-center gap-1.5">
                            <IconSparkles className="size-5 shrink-0 text-purple" />
                            <span className="text-base font-bold text-primary">{label}</span>
                        </div>
                    ))}
                </div>
                <SlideCallout>
                    <strong className="text-primary">Bring your own.</strong> Drop a <code>SKILL.md</code> in your repo
                    and every agent picks it up, so your team's know-how ships with the code.
                </SlideCallout>
            </FeaturePanel>
        ),
    },
]

// Animated, moving gradient text – same treatment as the self-driving carousel's heading
// ("How a product improves itself").
const FlowingGradientHighlight = ({ children }: { children: React.ReactNode }) => (
    <em
        className="inline animate-gradient-rotate bg-gradient-to-r from-yellow via-green to-blue bg-[length:200%_200%] bg-clip-text not-italic text-transparent motion-reduce:animate-none"
        style={{ animationDuration: '12s' }}
    >
        {children}
    </em>
)

const Features = () => {
    return (
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            <h2 className="mb-4 text-2xl font-bold">
                Everything you'd expect in an AI coding tool,{' '}
                <span className="block">
                    but <FlowingGradientHighlight>way more...</FlowingGradientHighlight>
                </span>
            </h2>

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

// Traffic-light dots for the little window mockups.
const WindowDots = () => (
    <span className="flex gap-1.5" aria-hidden>
        <span className="size-2.5 rounded-full bg-red" />
        <span className="size-2.5 rounded-full bg-yellow" />
        <span className="size-2.5 rounded-full bg-green" />
    </span>
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

// Home slide: standard layout – copy + view toggles on top, the selected screenshot bleeding to the
// bottom edge. Clicking a toggle swaps the image and the line beneath the toggles.
const HomeSlide = () => {
    const [active, setActive] = useState('list')
    const current = homeViews.find((v) => v.key === active) ?? homeViews[0]
    return (
        <div className="flex h-full flex-col rounded bg-primary p-4 @xl:p-6">
            <div className="mb-2 flex items-center gap-2">
                <h3 className="m-0 text-2xl font-bold">Stay in flow</h3>
                <AlphaBadge />
            </div>
            <p className="m-0 text-[15px] text-secondary">
                Stop bouncing between GitHub, CI, and review tabs. Home pulls everything that needs you – PR feedback,
                failing checks, review requests, stale branches – into one place, in three views of the same work.
            </p>

            {/* View tabs (underline style, not pills, so it's unmistakably a tab bar) + the
                changing description sitting on the same row instead of below */}
            <div className="mt-4 flex flex-col gap-2 @sm:flex-row @sm:items-end @sm:justify-between">
                <div className="flex gap-5 border-b border-primary" role="tablist" aria-label="Home views">
                    {homeViews.map(({ key, Icon, color, label }) => {
                        const selected = key === active
                        return (
                            <button
                                key={key}
                                type="button"
                                role="tab"
                                aria-selected={selected}
                                onClick={() => setActive(key)}
                                className={`-mb-px flex items-center gap-1.5 border-b-2 pb-2 text-sm font-semibold transition-colors ${
                                    selected
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-secondary hover:border-primary/30 hover:text-primary'
                                }`}
                            >
                                <Icon className={`size-4 shrink-0 ${color}`} />
                                {label}
                            </button>
                        )
                    })}
                </div>
                <p className="m-0 text-sm text-secondary @sm:text-right">{current.desc}</p>
            </div>

            <div className="-mx-4 -mb-4 mt-4 overflow-hidden rounded-b leading-[0] @xl:-mx-6 @xl:-mb-6">
                <CloudinaryImage
                    key={current.key}
                    src={current.src}
                    alt={`Home ${current.label} view`}
                    imgClassName="block w-full"
                />
            </div>
        </div>
    )
}

// Channel window mockup used as the Channels slide visual.
const ChannelMockup = () => (
    <div className="bg-primary">
        <div className="flex items-center gap-2 border-b border-primary px-4 py-2.5">
            <WindowDots />
            <code className="text-sm font-bold text-primary">#billing-service</code>
            <span className="ml-auto hidden items-center gap-1 text-xs text-secondary @sm:inline-flex">
                <IconMessage className="size-3.5" />
                remembers everything
            </span>
        </div>
        <div className="grid gap-3 p-4 @sm:grid-cols-2">
            {channelKeeps.map(({ Icon, color, name, desc }) => (
                <div key={name} className="flex items-start gap-3 rounded-md border border-primary bg-accent p-3">
                    <Icon className={`mt-0.5 size-5 shrink-0 ${color}`} />
                    <div className="min-w-0">
                        <code className="text-sm font-bold text-primary">{name}</code>
                        <p className="m-0 mt-0.5 text-sm text-secondary">{desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

// Light/dark image pair used as a slide visual.
const SlideImage = ({ light, dark, alt }: { light: string; dark: string; alt: string }) => (
    <>
        <CloudinaryImage src={light} alt={alt} className="dark:hidden" imgClassName="block w-full" />
        <CloudinaryImage src={dark} alt={alt} className="hidden dark:block" imgClassName="block w-full" />
    </>
)

// A single alpha carousel slide: standard layout – copy (plus optional block content) on top,
// visual bleeding to the bottom edge.
const AlphaSlide = ({
    title,
    visual,
    children,
    extra,
}: {
    title: string
    visual: React.ReactNode
    children: React.ReactNode
    extra?: React.ReactNode
}) => (
    <div className="flex h-full flex-col rounded bg-primary p-4 @xl:p-6">
        <div className="mb-2 flex items-center gap-2">
            <h3 className="m-0 text-2xl font-bold">{title}</h3>
            <AlphaBadge />
        </div>
        <div className="flex-1">
            <p className="m-0 text-[15px] text-secondary">{children}</p>
            {extra}
        </div>
        <div className="-mx-4 -mb-4 mt-4 overflow-hidden rounded-b leading-[0] @xl:-mx-6 @xl:-mb-6">{visual}</div>
    </div>
)

// Example canvases, grouped into two titled columns – mirrors the self-driving "scouts" tab.
const canvasExampleGroups = [
    {
        title: 'Dashboards & reports',
        description: 'Answer a question, no query required.',
        items: [
            { Icon: IconGraph, color: 'text-blue', name: 'Weekly active users' },
            { Icon: IconTrends, color: 'text-green', name: 'Revenue by plan' },
            { Icon: IconColumns, color: 'text-purple', name: 'Churn cohorts' },
            { Icon: IconDashboard, color: 'text-orange', name: 'Funnel drop-off' },
        ],
    },
    {
        title: 'Internal tools',
        description: 'The apps nobody ever gets around to building.',
        items: [
            { Icon: IconList, color: 'text-red', name: 'Refunds tool' },
            { Icon: IconToggle, color: 'text-seagreen', name: 'Feature-flag toggler' },
            { Icon: IconBrowser, color: 'text-blue', name: 'User lookup' },
            { Icon: IconMessage, color: 'text-yellow', name: 'Support triage' },
        ],
    },
]

const alphaTabs: TabbedCarouselTab[] = [
    {
        value: 'collaboration',
        label: 'Collaboration',
        color: 'bg-lilac',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <AlphaSlide
                title="Multiplayer (like work actually is)"
                visual={
                    <SlideImage
                        light="https://res.cloudinary.com/dmukukwp6/image/upload/contexts_dark_1_c98fa79b8e.png"
                        dark="https://res.cloudinary.com/dmukukwp6/image/upload/contexts_dark_f006575ea6.png"
                        alt="Teammates and agents working the same threads in PostHog Desktop"
                    />
                }
                extra={
                    <SlideCallout>
                        <strong className="text-primary">Discuss tasks with your team.</strong> Messages stay between
                        humans unless the task author tags in the agent.
                    </SlideCallout>
                }
            >
                Agents are <strong className="text-primary">teammates with names.</strong> Your people and your agents
                work the same threads, hand off tasks, and see the same context – in real time. No "let me share my
                screen" or "let me pull the latest changes" – you're already in the workspace, agents and people
                building the same product, with your product data as the fuel.
            </AlphaSlide>
        ),
    },
    {
        value: 'contexts',
        label: 'Contexts',
        color: 'bg-teal',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        content: (
            <AlphaSlide title="Remembers everything" visual={<ChannelMockup />}>
                Chat windows have amnesia. Contexts don't – each one keeps its own working memory, so kicking off a task
                means the agent already knows the history.{' '}
                <strong className="text-primary">No re-briefing a goldfish.</strong>
            </AlphaSlide>
        ),
    },
    {
        value: 'canvases',
        label: 'Canvases',
        color: 'bg-salmon',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <AlphaSlide
                title="Describe the tool, get the tool"
                visual={
                    <SlideImage
                        light="https://res.cloudinary.com/dmukukwp6/image/upload/cavas_wau_dark_1_413aba435a.png"
                        dark="https://res.cloudinary.com/dmukukwp6/image/upload/cavas_wau_dark_8f7776e12b.png"
                        alt="A generated canvas: a weekly active users report built on your PostHog data"
                    />
                }
                extra={<IconGroupColumns groups={canvasExampleGroups} />}
            >
                Ask a context for a report, a dashboard, or that internal refunds tool nobody ever builds – and get a{' '}
                <strong className="text-primary">canvas</strong>: generative UI on PostHog's actual data model.
            </AlphaSlide>
        ),
    },
    {
        value: 'home',
        label: 'Home',
        color: 'bg-seagreen',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: <HomeSlide />,
    },
    {
        value: 'autoresearch',
        label: 'Autoresearch',
        color: 'bg-fuchsia',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <FeaturePanel
                title="Run a"
                highlightedTitle="bounded experiment loop"
                titleSuffix="inside your task"
                highlightColor="fuchsia"
                alpha
                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/autoresearch_prompt_light_73dcb825bf.png"
                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/autoresearch_prompt_dark_ed1e639863.png"
                imageAlt="Prompting an autoresearch task in PostHog Desktop"
            >
                <p className="m-0">
                    Point it at a metric and it optimizes on its own – measure a baseline, try a change, measure again,
                    and repeat until it hits the target or runs out of attempts.
                </p>
                <div className="not-prose mt-4 grid grid-cols-1 gap-4 @sm:grid-cols-3">
                    {[
                        { step: 'Measure a baseline', desc: 'Run the measurement from your prompt.' },
                        { step: 'Try an improvement', desc: 'Change the code and measure again.' },
                        { step: 'Repeat until it stops', desc: 'Stop at the attempt limit or target value.' },
                    ].map(({ step, desc }, i) => (
                        <div key={step}>
                            <div className="flex items-center gap-1.5">
                                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-fuchsia/15 text-xs font-bold text-fuchsia">
                                    {i + 1}
                                </span>
                                <span className="text-base font-bold text-primary">{step}</span>
                            </div>
                            <p className="m-0 mt-1 text-sm leading-snug text-secondary">{desc}</p>
                        </div>
                    ))}
                </div>
                <SlideCallout>
                    <strong className="text-primary">Needs a metric, a measurement command, and constraints</strong> in
                    your prompt. It doesn't invent or independently verify the metric – it just follows what you tell
                    it.
                </SlideCallout>
            </FeaturePanel>
        ),
    },
]

// "Alphas within the beta" – the shared, still-cooking workspace, shown as a hero-style carousel
// (visually differentiated from the flat Features carousel above).
const AgenticWorkspaceSection = () => {
    return (
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            <SectionLabel>
                <span className="inline-flex items-center gap-2.5">
                    <StickerAi className="size-8 shrink-0 -rotate-3" />
                    Alphas within the beta
                </span>
            </SectionLabel>
            <p className="mb-6 max-w-3xl">
                PostHog Desktop is in beta. These bits are still <em>alpha inside it</em> – rough, changing weekly, and
                the most fun. It's where coding stops being a solo tool: your team and your agents share{' '}
                <RoughAnnotation type="underline" color="#F54E00" strokeWidth={2}>
                    one workspace
                </RoughAnnotation>
                .
            </p>

            <TabbedCarousel tabs={alphaTabs} />
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
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            {/* One combined layout: supported-model chips under the title (left),
                the open-source story + cost annotation in the other column (right).
                Both headings live inside the grid so they sit in the same row. */}
            <div className="grid items-start gap-10 @xl:grid-cols-2 @xl:gap-12">
                {/* Left: supported models as compact chip rows, under the main title */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold mb-4">Supported LLMs</h2>
                    <div>
                        <p className="m-0 mb-1.5 text-xs font-semibold uppercase tracking-wide text-secondary">
                            OpenAI
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <ModelChip>GPT-5.5</ModelChip>
                            <ModelChip>GPT-5.4</ModelChip>
                        </div>
                    </div>
                    <div>
                        <p className="m-0 mb-1.5 text-xs font-semibold uppercase tracking-wide text-secondary">
                            Anthropic
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <ModelChip>Claude Fable 5</ModelChip>
                            <ModelChip>Claude Sonnet 4.6</ModelChip>
                            <ModelChip>Claude Opus 4.8</ModelChip>
                            <ModelChip>Claude Opus 4.7</ModelChip>
                            <ModelChip>Claude Haiku 4.5</ModelChip>
                        </div>
                    </div>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog_fable_task_light_80d657b9d6.png"
                        alt="Picking a model for a task in PostHog Desktop"
                        className="dark:hidden pt-2"
                        imgClassName="w-full rounded border border-primary shadow-xl"
                    />
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog_fable_task_dark_e30ddc1938.png"
                        alt="Picking a model for a task in PostHog Desktop"
                        className="hidden dark:block pt-2"
                        imgClassName="w-full rounded border border-primary shadow-xl"
                    />
                </div>

                {/* Right: subheading (the open-source one), copy, and the hand-drawn cost stat */}
                <div>
                    <h3 className="text-xl font-bold mb-3">Open-source models got good? (awkward)</h3>
                    <p className="m-0 mb-1.5 text-xs font-semibold uppercase tracking-wide text-secondary">
                        We support
                    </p>
                    <div className="mb-4 flex flex-wrap items-baseline gap-2">
                        <ModelChip>GLM-5.2</ModelChip>
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
                        PostHog Desktop runs both. Pay token cost (with no markup) on the best tool for the job.
                    </p>

                    <div className="flex items-end justify-between gap-4">
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
                        {/* Kaiju hedgehog fills the empty space beside the cost stat – hover to rampage */}
                        <MiniHogzilla className="hidden w-24 shrink-0 self-end @sm:block @xl:w-28" />
                    </div>
                </div>
            </div>

            <style>{`
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

const MCPMarketplace = () => {
    return (
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            <SectionLabel>MCP marketplace</SectionLabel>
            <p>Extend your agents with tools, data, and integrations.</p>

            {/* Cap the height and fade the bottom out with a mask so the list reads as "and more".
                A mask (not a bg-gradient overlay) fades the content itself to transparent, so it works
                over the translucent window background instead of painting a solid rectangle on top. */}
            <div className="mt-4 max-h-64 overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_calc(100%-6rem),transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_calc(100%-6rem),transparent_100%)]">
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
            </div>
        </section>
    )
}

// Third beat of the opening narrative (old way → PostHog way → this): the job abstracting up.
const BiggerPictureSection = () => {
    return (
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            <SectionLabel>
                <InlineIcon icon={StickerMayor} className="!size-10 !top-3 -rotate-1">
                    Congratulations
                </InlineIcon>{' '}
                on your promotion
            </SectionLabel>

            <p className="text-base leading-loose">
                <ChoppyReveal wordDelay={40}>
                    {'You used to write code. Then you prompted outputs. Now you orchestrate '}
                    <Highlight>outcomes</Highlight>
                    {". PostHog Desktop is built for the abstraction level you're moving to next – and the work that "}
                    <RoughAnnotation type="underline" color="#F54E00" strokeWidth={2}>
                        <em>isn't quite possible yet</em>
                    </RoughAnnotation>
                    {" (but you'll probably be doing soon)."}
                </ChoppyReveal>
            </p>
        </section>
    )
}

const InboxCallout = () => {
    return (
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            <div className="relative overflow-hidden rounded-md border border-blue bg-blue/10 shadow-xl">
                <div className="grid gap-6 p-6 @2xl:grid-cols-2 @2xl:items-center @2xl:gap-10 @2xl:p-8">
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <StickerPullRequest className="size-8 -rotate-3" />
                            <h2 className="m-0 text-2xl font-bold">Part of the self-driving loop</h2>
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
                        <p className="mb-5 text-center text-sm text-secondary">
                            Waking up to three PRs for papercuts that would have derailed your day? Ah, that's bliss.
                        </p>
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/inbox_light_9aa9eed335.png"
                            alt="The Inbox surfacing reports and pull requests in PostHog Desktop"
                            className="dark:hidden w-full rounded border border-primary shadow-2xl"
                        />
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/inbox_dark_216a157762.png"
                            alt="The Inbox surfacing reports and pull requests in PostHog Desktop"
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
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            <h2 className="text-2xl font-bold mb-2">Try it</h2>
            <p className="m-0">PostHog Desktop is launching in Summer 2026.</p>
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
        trigger: 'What is PostHog Desktop?',
        content: (
            <div className="space-y-3">
                <p>
                    PostHog Desktop is a{' '}
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
        trigger: "Wait, wasn't this called PostHog Code?",
        content: (
            <div className="space-y-3">
                <p>
                    Yep, we renamed it. Writing code turned out to be just one part of building a product – so we added
                    things like canvases and multiplayer to make room for the rest of the work.
                </p>
                <p>
                    It's less "AI coding tool" now and more a workspace for agentic product builders – so we gave it a
                    name that fits.
                </p>
            </div>
        ),
    },
    {
        trigger: "What's the difference between PostHog AI and PostHog Desktop?",
        content: (
            <div className="space-y-3">
                <p>
                    PostHog AI is the product assistant built into PostHog Web. It's deeply integrated with your data
                    and helps with things like writing SQL and analyzing user behavior through natural-language prompts.
                </p>
                <p>
                    PostHog Desktop is a desktop app focused on shipping code. It orchestrates multiple coding agents
                    from different providers (Anthropic, OpenAI) and turns product signals – errors, support tickets,
                    session replay trends – into PRs.
                </p>
                <p>
                    In a nutshell:{' '}
                    <strong>PostHog AI helps you understand your product. PostHog Desktop helps you build it.</strong>
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
                    Yep! PostHog Desktop is a full coding agent – not just a plugin for another editor – so you can use
                    it as your primary tool for generating code.
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
                    PostHog Desktop is built on top of two{' '}
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
                PostHog Desktop runs on top of PostHog, so you'll need to be on PostHog first. The good news: PostHog is
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
                    Your code stays in GitHub. PostHog Desktop agents access your repo to open PRs, much like any CI/CD
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
                Yes. PostHog Desktop queries your data through the PostHog API using your personal API key. Data is
                never stored, cached, or sent anywhere other than to PostHog&apos;s servers, and you control exactly
                what the agent can access through your API key&apos;s permissions.
            </p>
        ),
    },
    {
        trigger: 'Can it modify my PostHog configuration?',
        content: (
            <div className="space-y-3">
                <p>
                    Yes – PostHog Desktop can both read and write to PostHog, depending on your API key permissions. It
                    can create feature flags, set up experiments, build dashboards, and define actions.
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
                    PostHog Desktop is usage-based – there's no fixed subscription. You spend AI credits as you go (100
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
        <section className="mb-12 @xl:mb-16 px-4 @xl:px-8">
            <h2 className="text-2xl font-bold m-0 mb-6">Frequently asked questions</h2>

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
                title="PostHog Desktop"
                description="A desktop app for steering coding agents and editing your product"
                structuredData={buildProductStructuredData({
                    name: 'PostHog Desktop',
                    description: 'A desktop app for steering coding agents and editing your product',
                    slug: 'desktop',
                    operatingSystem: 'macOS, Windows, Linux',
                })}
            />
            <Editor slug="/desktop" maxWidth="100%" hasPadding={false} disableFormatting>
                <div className="@container not-prose font-rounded">
                    <header className="relative mb-8 border-b border-primary">
                        <div className="max-w-4xl mx-auto px-4 @xl:px-8 pt-6 @xl:pt-8 pb-8">
                            <HeroSection />
                        </div>
                    </header>

                    <div className="max-w-4xl mx-auto">
                        <OldWaySection />

                        <PostHogWaySection onComplete={() => setPostHogWayDone(true)} />

                        <Features />

                        <SupportedLLMs />

                        <MCPMarketplace />

                        {/* Self-driving loop box sits just above the alphas carousel */}
                        <InboxCallout />

                        <AgenticWorkspaceSection />

                        {/* The "promotion" narrative beat lands just before the closing CTA */}
                        <BiggerPictureSection />

                        <TLDR ready={postHogWayDone} />

                        <FAQ />
                    </div>
                </div>
            </Editor>
        </>
    )
}
