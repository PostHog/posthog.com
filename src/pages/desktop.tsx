import React, { useEffect, useRef, useState } from 'react'
import SEO, { buildProductStructuredData } from 'components/seo'
import Editor from 'components/Editor'
import {
    IconAI,
    IconArrowUpRight,
    IconBatteryCharge,
    IconBrain,
    IconBrowser,
    IconCheck,
    IconColumns,
    IconCrown,
    IconDashboard,
    IconDocument,
    IconFlask,
    IconGraph,
    IconHandMoney,
    IconList,
    IconListCheck,
    IconLive,
    IconMemory,
    IconMessage,
    IconPlus,
    IconPullRequest,
    IconPulse,
    IconSparkles,
    IconStack,
    IconTerminal,
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
import {
    StickerTombstone,
    StickerMayor,
    StickerPullRequest,
    StickerAi,
    StickerRobot,
} from 'components/Stickers/Stickers'
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
                            The{' '}
                            <RoughAnnotation
                                type="highlight"
                                color="rgba(48, 164, 108, 0.2)"
                                strokeWidth={1}
                                padding={2}
                                delay={300}
                            >
                                product editor
                            </RoughAnnotation>
                            {' for '}
                            <RoughAnnotation type="underline" color="#F54E00" strokeWidth={2} delay={600}>
                                <span className="font-bold">product builders</span>
                            </RoughAnnotation>
                        </h1>

                        <div className="flex flex-col items-start @4xl/editor:flex-row @4xl/editor:gap-8">
                            <div className="@4xl/editor:flex-[0_0_280px]">
                                <p>
                                    All the PostHog you already use, plus a coding agent that can act on your data. Real
                                    usage in, pull requests out.
                                </p>
                                <ul className="mb-4 list-none space-y-0.5 p-0 text-[15px]">
                                    {[
                                        'Build and edit your product',
                                        'Run a fleet of agents',
                                        'Turn product signals into PRs',
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

            <p className="text-base leading-loose mb-8">
                <ChoppyReveal wordDelay={40}>
                    {'Most AI code editors '}
                    <em>lack context</em>
                    {'. They use your '}
                    <strong className="font-mono bg-blue/10 border border-blue rounded-sm px-1 leading-normal inline-block">
                        &lt;codebase /&gt;
                    </strong>
                    {' as the source of truth and wait for '}
                    <RoughAnnotation type="underline" color="currentColor" strokeWidth={1.5}>
                        <em>you</em>
                    </RoughAnnotation>
                    {' to hit '}
                    <KeyBadge>
                        Build <span className="relative top-px">↵</span>
                    </KeyBadge>
                    {' – not how '}
                    <RoughAnnotation type="underline" color="#30A46C" strokeWidth={2}>
                        <em>people actually use your product</em>
                    </RoughAnnotation>
                    {'.'}
                </ChoppyReveal>
            </p>

            {/* Table stakes + receipt: the standard starter pack every AI tool ships (also the "old way") */}
            <div className="mt-8 grid items-start gap-8 @2xl:grid-cols-2 @2xl:gap-12">
                <div>
                    <h3 className="mb-3 text-lg font-bold text-primary">Sound familiar?</h3>
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
                            className="pointer-events-none absolute -bottom-10 -left-20 z-20 w-32 @xl:w-36"
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
                        <strong>TL;DR:</strong> There are plenty of AI coding tools, but only one that{' '}
                        <RoughAnnotation type="underline" color="currentColor" strokeWidth={1.5} delay={400}>
                            <span className="inline-block">
                                knows your product like <strong>PostHog Desktop</strong>.
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
                <p className="m-0 text-center font-bold tracking-widest">TABLE STAKES 2026</p>
                <p className="m-0 mb-4 text-center text-xs italic text-[#8a8272]">(yep, PostHog has that)</p>

                <div className="space-y-1">
                    <ReceiptRow label="parallel agents" />
                    <ReceiptRow label="multi model" />
                    <ReceiptRow label="MCP servers" />
                    <ReceiptRow label="code diffs" />
                    <ReceiptRow label="cloud sandboxes" />
                    <ReceiptRow label="AI sparkles" />
                </div>

                <div className="my-3 border-t border-dashed border-[#c9c2b4]" />

                <div className="flex items-baseline justify-between gap-4 font-bold">
                    <span>TOTAL</span>
                    <span>$0.00</span>
                </div>

                <p className="m-0 mt-4 text-center text-xs text-[#8a8272]">thanks for shopping at agent mart</p>
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
                    title="meep.mov"
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
        description: 'Capture structured application logs for inspection and debugging.',
    },
    {
        icon: IconGraph,
        color: 'text-blue',
        title: 'Track events',
        description: 'Instruments events so you can measure changes in production.',
    },
    {
        icon: IconWarning,
        color: 'text-yellow',
        title: 'Track errors',
        description: 'Capture exceptions with full stack traces so new issues surface quickly.',
    },
    {
        icon: IconLive,
        color: 'text-purple',
        title: 'Trace LLM calls',
        description: 'Inspect traces, spans, latency, usage, and per-user costs for AI-powered features.',
    },
    {
        icon: IconToggle,
        color: 'text-teal',
        title: 'Add a feature flag',
        description: 'Ship changes behind a flag to control the rollout (and kill it fast).',
    },
    {
        icon: IconFlask,
        color: 'text-purple',
        title: 'Run an experiment',
        description: 'Scaffolds A/B tests with control and test variants tied to a primary metric.',
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

// Highlighted callout inside a carousel slide, à la the Slack app page carousel.
const SlideCallout = ({ children }: { children: React.ReactNode }) => (
    <div className="mt-5 rounded border border-yellow bg-yellow/10 px-3 py-2.5 text-sm text-secondary">{children}</div>
)

// Model name pill – same treatment as the <codebase /> tag in "The old way" section.
const ModelChip = ({ children }: { children: React.ReactNode }) => (
    <code className="inline-flex items-center rounded-sm border border-blue bg-blue/10 px-1.5 py-1 font-mono font-bold leading-none not-italic">
        {children}
    </code>
)

// Titled columns of icon + example items, à la the self-driving "scouts" tab: a short group title
// and description, with a few concrete examples listed underneath each.
type IconGroup = {
    title: string
    description?: string
    items: { Icon: React.ComponentType<{ className?: string }>; color: string; name: string }[]
}
const IconGroupColumns = ({ groups }: { groups: IconGroup[] }) => (
    <div className="mt-4 grid grid-cols-1 gap-6 @sm:grid-cols-2">
        {groups.map((group) => (
            <div key={group.title} className="@container flex flex-col gap-2">
                <div>
                    <p className="m-0 text-base font-bold text-primary">{group.title}</p>
                    {group.description && <p className="m-0 text-sm text-secondary">{group.description}</p>}
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
                    If <em>dangerously skipping permissions</em> isn't your thing, coding tasks can start in Plan mode.
                    The agent explores your data, asks clarifying questions, then writes an implementation plan for you
                    to approve.
                </p>
                <div className="not-prose mt-4 grid grid-cols-1 gap-4 @sm:grid-cols-3">
                    {[
                        {
                            Icon: IconToggle,
                            color: 'text-green',
                            title: 'Mode',
                            tagline: 'Switch anytime, even mid-task',
                            items: ['Accept Edits', 'Plan Mode', 'Auto Mode'],
                        },
                        {
                            Icon: IconAI,
                            color: 'text-purple',
                            title: 'Model',
                            tagline: 'Choose your weapon',
                            items: ['Claude', 'Codex', 'Open source'],
                        },
                        {
                            Icon: IconBrain,
                            color: 'text-orange',
                            title: 'Effort level',
                            tagline: 'Still effortless for you',
                            items: ['Low–medium', 'High–extra high', 'Max'],
                        },
                    ].map(({ Icon, color, title, tagline, items }) => (
                        <div key={title}>
                            <div className="flex items-center gap-1.5">
                                <Icon className={`size-5 shrink-0 ${color}`} />
                                <span className="text-base font-bold text-primary">{title}</span>
                            </div>
                            <p className="m-0 mt-1 text-sm leading-snug text-secondary">{tagline}</p>
                            <div className="mt-2 flex flex-col gap-1">
                                {items.map((item) => (
                                    <span key={item} className="flex items-center gap-2 text-sm text-secondary">
                                        <span className="size-1.5 shrink-0 rounded-full bg-border" />
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
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
                title="Ship code by"
                highlightedTitle="describing it"
                highlightColor="yellow"
                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/prompt_task_light_ad118d1efc.png"
                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/prompt_task_dark_6cb8a38596.png"
                imageAlt="Prompting a task in PostHog Desktop"
            >
                <p className="m-0">
                    A <strong className="text-primary">task</strong> is the unit of work in PostHog Desktop. Prompt code
                    changes locally, or in the cloud.
                </p>
                <SlideCallout>
                    <strong className="text-primary">Steer</strong> injects your message at the next tool boundary.{' '}
                    <strong className="text-primary">Queue</strong> holds the message until the current turn ends.
                </SlideCallout>
                <div className="not-prose mt-4 grid grid-cols-1 gap-4 @sm:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconBatteryCharge className="size-5 shrink-0 text-green" />
                            <span className="text-base font-bold text-primary">Context</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            A 1M-token window, with a live meter as you chat. Run <code>/compact</code> any time to
                            summarize.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconHandMoney className="size-5 shrink-0 text-orange" />
                            <span className="text-base font-bold text-primary">Cost</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            It's usage-based, so switching models per task pays off (no need for a bazooka to swat a
                            fly).
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconTerminal className="size-5 shrink-0 text-blue" />
                            <span className="text-base font-bold text-primary">Do it here</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Prompt changes, attach a screenshot, use a slash command, review the diff, open a terminal.
                        </p>
                    </div>
                </div>
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
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/coastal_hog_79dc4dff47.png"
                    alt="A hedgehog relaxing on a pool float with a laptop"
                    imgClassName="float-right ml-4 mb-2 w-32 @sm:w-40"
                />
                <p className="m-0">
                    Open the Command Center and run up to nine agents at once, mixing local and cloud tasks in the same
                    grid. Each cell shows its own status, environment, and repo (stop one without touching the rest).
                </p>
                <SlideCallout>
                    A full 3x3 grid of agents lit up and running? We call that{' '}
                    <strong className="text-primary">dopamine mode</strong>.
                </SlideCallout>
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
            <FeaturePanel title="Control the change," highlightedTitle="measure what happened" highlightColor="purple">
                <p className="m-0">
                    Shipping without instrumentation? Oh, you mean guessing whether it worked. PostHog helps you roll
                    out features to specific users or groups, then test and validate ideas before you ship them to
                    everyone.
                </p>
                <p className="m-0 mt-3">
                    Control the blast radius, ship with confidence (and roll things back when they don't work out).
                </p>
                <ul className="not-prose mt-5 grid list-none grid-cols-1 gap-x-8 gap-y-4 p-0 @sm:grid-cols-2">
                    {instrumentationItems.map(({ icon: Icon, color, title, description }) => (
                        <li key={title}>
                            <div className="flex items-center gap-1.5">
                                <Icon className={`size-5 shrink-0 ${color}`} />
                                <span className="text-base font-bold text-primary">{title}</span>
                            </div>
                            <p className="m-0 mt-1 text-sm leading-snug text-secondary">{description}</p>
                        </li>
                    ))}
                </ul>
                <div className="hidden @2xl:block">
                    <SlideCallout>
                        Agents ship code faster than any human can review it. Instrumentation is how you know what
                        shipped is actually working – not just that it compiled and passed CI.
                    </SlideCallout>
                </div>
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

// What connects into a channel to make it a hub of work – floated in an arc around the
// channel window, à la the "understand product usage" arc on the homepage carousel.
// Each entry carries [x%, y%] positions at two @container breakpoints (see ArcProducts
// in HeroCarousel/slides.tsx for the coordinate system). Below @2xl these fall back to a grid.
const channelArtifacts: {
    Icon: React.ComponentType<{ className?: string }>
    color: string
    name: string
    href?: string
    '@2xl': [number, number]
    '@3xl': [number, number]
}[] = [
    { Icon: IconDocument, color: 'text-blue', name: 'context.md', '@2xl': [12, 8], '@3xl': [10, 8] },
    { Icon: IconMemory, color: 'text-purple', name: 'Memory', '@2xl': [10, 42], '@3xl': [8, 42] },
    { Icon: IconStack, color: 'text-orange', name: 'Artifacts', '@2xl': [12, 76], '@3xl': [10, 76] },
    {
        Icon: IconMessage,
        color: 'text-yellow',
        name: 'Inbox',
        href: '/docs/self-driving/inbox',
        '@2xl': [88, 8],
        '@3xl': [90, 8],
    },
    { Icon: IconListCheck, color: 'text-green', name: 'To-do list', '@2xl': [90, 42], '@3xl': [92, 42] },
    { Icon: IconPullRequest, color: 'text-red', name: 'PR #4821', '@2xl': [88, 76], '@3xl': [90, 76] },
]

// A floating artifact chip – a small bordered pill so it reads over the tinted slide bg.
// When `href` is set, the chip is a link (used for the Inbox → docs).
const ChannelArtifactChip = ({
    Icon,
    color,
    name,
    href,
}: {
    Icon: any
    color: string
    name: string
    href?: string
}) => {
    const inner = (
        <>
            <Icon className={`size-4 shrink-0 ${color}`} />
            {name}
        </>
    )
    const classes =
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-primary bg-light px-2.5 py-1.5 text-sm font-semibold text-primary shadow-sm dark:bg-[#222328]'
    return href ? (
        <Link to={href} state={{ newWindow: true }} className={`${classes} no-underline hover:border-secondary`}>
            {inner}
        </Link>
    ) : (
        <span className={classes}>{inner}</span>
    )
}

// The chat rows inside the channel hub – a Slack-style thread that makes clear who kicked off
// which agent. `agent` rows get the PostHog bot avatar + Agent badge; people get initials.
const channelHistory: {
    agent?: boolean
    avatar?: string
    avatarTone?: string
    name: string
    time: string
    mention?: string
    action: string
    task?: { label: string; status: string; tone: string }
}[] = [
    { avatar: 'AL', avatarTone: 'bg-blue text-white', name: 'Adam', time: '1w', action: 'joined the channel' },
    {
        agent: true,
        name: 'PostHog',
        time: '2h',
        mention: '@Peter',
        action: 'started a new task',
        task: { label: 'Add role-based permissions', status: 'PR ready', tone: 'bg-green/15 text-green' },
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
        color: 'text-red',
        activeClasses: 'border-red bg-red/10',
        label: 'List',
        desc: 'triage what needs you',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Home_list_e43dd0c2b5.png',
    },
    {
        key: 'board',
        Icon: IconColumns,
        color: 'text-blue',
        activeClasses: 'border-blue bg-blue/10',
        label: 'Board',
        desc: 'everything in flight',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Home_board_e9d7302c9e.png',
    },
    {
        key: 'config',
        Icon: IconGraph,
        color: 'text-purple',
        activeClasses: 'border-purple bg-purple/10',
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
                The <strong className="text-primary">Home</strong> tab gives you a high-level view of all your work. It
                pulls PR feedback, failing checks, review requests, stale branches (and everything else that needs your
                attention) into one place. Stop bouncing between apps, stay in flow with your whole workflow.
            </p>

            {/* View tabs as a pill segmented control – background + border color makes the
                selected view unambiguous, not just a subtle underline. */}
            <div className="mt-4 flex flex-col gap-2 @sm:flex-row @sm:items-end @sm:justify-between">
                <div className="flex gap-2" role="tablist" aria-label="Home views">
                    {homeViews.map(({ key, Icon, color, activeClasses, label }) => {
                        const selected = key === active
                        return (
                            <button
                                key={key}
                                type="button"
                                role="tab"
                                aria-selected={selected}
                                onClick={() => setActive(key)}
                                className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm font-semibold transition-colors ${
                                    selected
                                        ? `${activeClasses} text-primary`
                                        : 'border-transparent text-secondary hover:bg-accent'
                                }`}
                            >
                                <Icon className={`size-4 shrink-0 ${selected ? color : 'text-secondary'}`} />
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

// Orange @mention, matching the channel screenshot.
const Mention = ({ children }: { children: React.ReactNode }) => (
    <span className="font-semibold text-red dark:text-yellow">{children}</span>
)

// The prompt composer at the bottom of the channel – "what do you want to ship?".
const ChannelComposer = () => (
    <div className="rounded-md border border-primary bg-light px-3 pb-2 pt-2.5 shadow-sm dark:bg-[#222328]">
        <p className="m-0 text-sm text-secondary">
            What do you want to ship? <span className="text-muted">/ for skills</span>
        </p>
        <div className="mt-2.5 flex items-center gap-2">
            <IconPlus className="size-4 shrink-0 text-secondary" />
            <span className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-md bg-salmon text-white">
                <IconArrowUpRight className="size-3.5" />
            </span>
        </div>
    </div>
)

// The channel window at the center of the hub: a Slack-style thread with clear attribution.
const ChannelHub = () => (
    <div className="mx-auto w-full max-w-[400px] overflow-hidden rounded-lg border border-primary bg-light text-left shadow-xl dark:bg-[#1d1e22]">
        <div className="border-b border-primary px-4 py-3">
            <h4 className="m-0 text-base font-bold text-primary">access-control</h4>
            <p className="m-0 mt-0.5 text-xs leading-snug text-secondary">
                <Mention>@Peter</Mention> created this channel. It remembers everything.
            </p>
        </div>
        <div className="flex flex-col gap-3 px-4 py-3">
            {channelHistory.map(({ agent, avatar, avatarTone, name, time, mention, action, task }, i) => (
                <div key={i} className="flex gap-2.5">
                    {agent ? (
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-primary bg-accent/40">
                            <IconAI className="size-4 text-primary" />
                        </span>
                    ) : (
                        <span
                            className={`flex size-7 shrink-0 items-center justify-center rounded-md text-[11px] font-bold ${avatarTone}`}
                        >
                            {avatar}
                        </span>
                    )}
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-primary">{name}</span>
                            {agent && (
                                <span className="rounded bg-blue/10 px-1 py-px text-[10px] font-semibold text-blue dark:bg-blue/20">
                                    Agent
                                </span>
                            )}
                            <span className="text-xs text-secondary">{time}</span>
                        </div>
                        <p className="m-0 text-sm leading-snug text-secondary">
                            {mention && <Mention>{mention} </Mention>}
                            {action}
                        </p>
                        {task && (
                            <div className="mt-1.5 flex items-center gap-2 rounded-md border border-primary bg-light px-2.5 py-1.5 dark:bg-[#222328]">
                                <span className="size-2.5 shrink-0 rounded-full bg-green" />
                                <span className="min-w-0 flex-1 truncate text-sm font-medium text-primary">
                                    {task.label}
                                </span>
                                <span
                                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${task.tone}`}
                                >
                                    {task.status}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <ChannelComposer />
        </div>
    </div>
)

// The connected artifacts floating in an arc around the channel hub.
const ChannelArtifacts = () => {
    const renderSlots = (breakpoint: '@2xl' | '@3xl') =>
        channelArtifacts.map(({ name, Icon, color, href, ...pos }, i) => {
            const [x, y] = pos[breakpoint]
            const duration = 4 + (i % 4) * 0.9
            const delay = -(i * 1.3)
            return (
                <div
                    key={name}
                    className="absolute animate-[scattered-float_ease-in-out_infinite]"
                    style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`,
                    }}
                >
                    <ChannelArtifactChip Icon={Icon} color={color} name={name} href={href} />
                </div>
            )
        })

    return (
        <>
            {/* Below @2xl (not enough gutter for the arc): simple grid above the hub */}
            <div className="z-10 mb-4 flex flex-wrap justify-center gap-2 @2xl:hidden">
                {channelArtifacts.map(({ name, Icon, color, href }) => (
                    <ChannelArtifactChip key={name} Icon={Icon} color={color} name={name} href={href} />
                ))}
            </div>
            <div className="absolute inset-0 z-10 hidden @2xl:block @3xl:hidden">{renderSlots('@2xl')}</div>
            <div className="absolute inset-0 z-10 hidden @3xl:block">{renderSlots('@3xl')}</div>
        </>
    )
}

// Channels slide – mirrors the homepage "understand product usage" arc: connected artifacts
// (context.md, memory, inbox, to-do) float around the channel window at the center.
const ChannelsSlide = () => (
    <div className="@container relative flex h-full flex-col rounded bg-[#F3F4F0] p-4 dark:bg-[#131316] @xl:p-6">
        <div className="mb-2 flex items-center gap-2">
            <h3 className="m-0 text-2xl font-bold">Multiplayer (like work actually is)</h3>
            <AlphaBadge />
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-2 @lg:grid-cols-2">
            <p className="m-0 text-[15px] text-secondary">
                A channel is a group of tasks related to a specific topic or project. Each one keeps its own working
                memory, so kicking off a task doesn't require you to re-brief a goldfish.
            </p>
            <p className="m-0 text-[15px] text-secondary">
                <code className="text-sm font-bold text-primary">CONTEXT.md</code> tells agents the specific details
                they need to know when working in access-control – conventions, gotchas, key files, and anything else
                that isn't obvious from the code.
            </p>
        </div>
        <div className="relative mt-4 flex flex-1 flex-col justify-center @2xl:mt-2 @2xl:min-h-[300px]">
            <ChannelArtifacts />
            <div className="relative mx-auto w-full">
                <ChannelHub />
            </div>
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
        items: [
            { Icon: IconGraph, color: 'text-blue', name: 'Weekly active users' },
            { Icon: IconTrends, color: 'text-green', name: 'Revenue by plan' },
            { Icon: IconColumns, color: 'text-purple', name: 'Churn cohorts' },
            { Icon: IconDashboard, color: 'text-orange', name: 'Funnel drop-off' },
        ],
    },
    {
        title: 'Internal tools',
        items: [
            { Icon: IconHandMoney, color: 'text-green', name: 'Refund tool' },
            { Icon: IconMessage, color: 'text-yellow', name: 'Support triage' },
            { Icon: IconBrowser, color: 'text-blue', name: 'Customer lookup' },
            { Icon: IconCrown, color: 'text-purple', name: 'AI leaderboard' },
        ],
    },
]

const alphaTabs: TabbedCarouselTab[] = [
    {
        value: 'contexts',
        label: 'Channels',
        color: 'bg-teal',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        content: <ChannelsSlide />,
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
                Ask for a report, a dashboard, or random internal tool, get exactly what you want in a{' '}
                <strong className="text-primary">canvas</strong> built with generative UI on PostHog's actual data
                model.
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
                title="Run a bounded"
                highlightedTitle="experiment loop"
                titleSuffix="inside any task"
                highlightColor="fuchsia"
                alpha
                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/autoresearch_prompt_light_73dcb825bf.png"
                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/autoresearch_prompt_dark_ed1e639863.png"
                imageAlt="Prompting an autoresearch task in PostHog Desktop"
            >
                <p className="m-0">
                    <strong className="text-primary">Autoresearch</strong> iteratively modifies your codebase and
                    evaluates against a prompt. Define the metric to optimize, the command or steps to measure it, and
                    the constraints the agent must preserve.
                </p>
                <SlideCallout>
                    It doesn't invent or independently verify the metric – it just follows what you tell it (this is
                    that{' '}
                    <Link to="/newsletter/loops" state={{ newWindow: true }} className="font-semibold underline">
                        agent loops
                    </Link>{' '}
                    thing everyone keeps talking about).
                </SlideCallout>
                <div className="not-prose mt-4 grid grid-cols-1 gap-4 @sm:grid-cols-3">
                    {['Measure a baseline', 'Try an improvement', 'Repeat until it stops'].map((step, i) => (
                        <div key={step} className="flex items-center gap-1.5">
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-fuchsia/15 text-xs font-bold text-fuchsia">
                                {i + 1}
                            </span>
                            <span className="text-base font-bold text-primary">{step}</span>
                        </div>
                    ))}
                </div>
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
                PostHog Desktop is in beta. These bits are still <em>alpha inside it</em> (rough, changing weekly, and
                the most fun). It's where coding stops being a single player, and your team and agents share{' '}
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

// Ordered by rough developer-community popularity, not alphabetically, so the
// most recognizable servers (GitHub, Slack, Stripe, Supabase…) land in the
// visible rows before the list masks out.
const mcpServers: MCPServer[] = [
    { name: 'GitHub', logoKey: 'github' },
    { name: 'Slack', logoKey: 'slack' },
    { name: 'Notion', domain: 'notion.so' },
    { name: 'Linear', logoKey: 'linear' },
    { name: 'Figma', domain: 'figma.com' },
    { name: 'Stripe', logoKey: 'stripe' },
    { name: 'Supabase', logoKey: 'supabase' },
    { name: 'GitLab', domain: 'gitlab.com' },
    { name: 'Granola', logoKey: 'granola' },
    { name: 'Sentry', logoKey: 'sentry' },
    { name: 'Cloudflare', logoKey: 'cloudflare' },
    { name: 'Datadog', domain: 'datadoghq.com' },
    { name: 'HubSpot', logoKey: 'hubspot' },
    { name: 'Atlassian', domain: 'atlassian.com' },
    { name: 'Postman', domain: 'postman.com' },
    { name: 'ClickHouse', domain: 'clickhouse.com' },
    { name: 'Prisma', domain: 'prisma.io' },
    { name: 'Neon', domain: 'neon.tech' },
    { name: 'PlanetScale', domain: 'planetscale.com' },
    { name: 'Render', domain: 'render.com' },
    { name: 'Clerk', domain: 'clerk.com' },
    { name: 'LaunchDarkly', domain: 'launchdarkly.com' },
    { name: 'PagerDuty', domain: 'pagerduty.com' },
    { name: 'Context7', domain: 'context7.com' },
    { name: 'Canva', domain: 'canva.com' },
    { name: 'Box', domain: 'box.com' },
    { name: 'Monday', domain: 'monday.com' },
    { name: 'Sanity', domain: 'sanity.io' },
    { name: 'Svelte', domain: 'svelte.dev' },
    { name: 'Hex', domain: 'hex.tech' },
    { name: 'Wix', domain: 'wix.com' },
    { name: 'Attio', logoKey: 'attio' },
    { name: 'Mem0', domain: 'mem0.ai' },
    { name: 'Circle', domain: 'circle.so' },
    { name: 'Browserbase', domain: 'browserbase.com' },
    { name: 'AirOps', domain: 'airops.com' },
    { name: 'Cisco ThousandEyes', domain: 'thousandeyes.com' },
    { name: 'Firetiger', domain: 'firetiger.com' },
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
                            <ModelChip>GPT-5.6 Sol</ModelChip>
                            <ModelChip>GPT-5.6 Terra</ModelChip>
                            <ModelChip>GPT-5.6 Luna</ModelChip>
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
                    <h3 className="text-xl font-bold mb-3">Open source models got good? (awkward)</h3>
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
                        The gap between free and frontier went from “lol” to “wait…” real quick. For a big slice of
                        coding work, open source models now perform the same for a tenth of the price.
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

const skillsCalloutItems = [
    { label: 'Personal skills', desc: 'Your party tricks (nobody else needs to know).' },
    { label: 'Team skills', desc: '"How do we do X here", with version history.' },
    { label: 'Skills marketplace', desc: 'Someone already solved this. Take the win.' },
]

// Skills callout: BYOS, or steal ours. Sits right under the MCP marketplace list.
const SkillsCallout = () => {
    return (
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            <div className="rounded-md border border-purple bg-purple/10 p-6 shadow-xl @xl:p-8">
                <div className="mb-3 flex items-center gap-2">
                    <StickerRobot className="size-8 -rotate-3" />
                    <h2 className="m-0 text-2xl font-bold">Dang, PostHog's got skills</h2>
                </div>
                <p className="m-0 text-secondary">
                    PostHog Desktop loads the same skills Claude Code uses: from your machine, from the repo you are in,
                    and from any marketplace plugins you have installed. It also includes PostHog-maintained skills for
                    things like event capture, feature flags, experiments, and error tracking.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-4 @sm:grid-cols-3">
                    {skillsCalloutItems.map(({ label, desc }) => (
                        <div key={label}>
                            <div className="flex items-center gap-1.5">
                                <IconSparkles className="size-5 shrink-0 text-purple" />
                                <span className="text-base font-bold text-primary">{label}</span>
                            </div>
                            <p className="m-0 mt-1 text-sm leading-snug text-secondary">{desc}</p>
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
            <div className="relative overflow-hidden rounded-md border border-yellow bg-gradient-to-br from-yellow/25 via-yellow/10 to-orange/10 shadow-xl">
                <div className="grid gap-6 p-6 @2xl:grid-cols-2 @2xl:items-center @2xl:gap-10 @2xl:p-8">
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <StickerPullRequest className="size-8 -rotate-3" />
                            <h2 className="m-0 text-2xl font-bold">Part of the self-driving loop</h2>
                        </div>
                        <ul className="m-0 mb-6 list-none space-y-3 p-0">
                            <li>
                                <strong>PostHog Desktop</strong> is where you do the work – run and steer agents, solo
                                or with your team.
                            </li>
                            <li>
                                <Link
                                    to="/slack"
                                    state={{ newWindow: true }}
                                    className="font-bold text-red dark:text-yellow"
                                >
                                    Slack
                                </Link>{' '}
                                is where you talk it through – tag{' '}
                                <code className="border-blue bg-blue/10">@PostHog</code> to ship without leaving the
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
                                are how you ship from anywhere – clicky dashboards for humans, an agent-native surface
                                for everything else. PostHog can ship without you too (that's the self-driving part).
                            </li>
                        </ul>
                        <OSButton asLink to="/self-driving" state={{ newWindow: true }} variant="primary" size="md">
                            How self-driving works
                        </OSButton>
                    </div>

                    <div className="relative">
                        <p className="mb-5 text-center text-sm text-secondary">
                            Finally, an{' '}
                            <Link
                                to="/docs/self-driving/inbox"
                                state={{ newWindow: true }}
                                className="font-bold text-primary underline"
                            >
                                inbox
                            </Link>{' '}
                            you look forward to opening. Product signals go in, PRs come out.
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
                    <a href="/docs/posthog-desktop" className="underline">
                        desktop coding agent
                    </a>{' '}
                    that understands your product and business, not just your source code. It picks up work from product
                    signals – errors, support tickets, session replays, GitHub issues, Linear, Zendesk – researches the
                    causes, and ships pull requests for you to review.
                </p>
                <p>
                    You can also drive it manually like a regular coding agent: open a{' '}
                    <a href="/docs/posthog-desktop/tasks" className="underline">
                        task
                    </a>
                    , describe what you want, and watch it work. Run tasks locally, in an isolated{' '}
                    <a href="/docs/posthog-desktop/worktrees" className="underline">
                        worktree
                    </a>
                    , or in a{' '}
                    <a href="/docs/posthog-desktop/cloud-runs" className="underline">
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
                    <a href="/docs/posthog-desktop/use-any-model-and-harness" className="underline">
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
                    <a href="/docs/posthog-desktop/tasks" className="underline">
                        Three modes
                    </a>
                    , picked per task:
                </p>
                <p>
                    <strong>Local</strong> runs in your current branch and working directory.{' '}
                    <a href="/docs/posthog-desktop/worktrees" className="underline">
                        <strong>Worktree</strong>
                    </a>{' '}
                    creates an isolated git worktree per task, so you can run several agents in parallel without
                    stepping on each other.{' '}
                    <a href="/docs/posthog-desktop/cloud-runs" className="underline">
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
                    <a href="/docs/posthog-desktop/posthog-integration" className="underline">
                        enricher
                    </a>{' '}
                    uses tree-sitter to detect PostHog SDK calls right on your machine – no source code is uploaded for
                    that.{' '}
                    <a href="/docs/posthog-desktop/cloud-runs" className="underline">
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
                    <a href="/docs/posthog-desktop/pricing" className="underline">
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
                <a href="/docs/posthog-desktop/open-source" className="underline">
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
                description="The desktop for product builders – run a fleet of agents that build your product, not just your code"
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

                        <SkillsCallout />

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
