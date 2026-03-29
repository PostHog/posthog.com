import React, { useRef, useState } from 'react'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import { IconApple, IconArrowRight } from '@posthog/icons'
import { ChoppyReveal } from 'components/Code/ChoppyReveal'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { IconPop } from 'components/Code/IconPop'
import { SignalsCallout } from 'components/Code/SignalsCallout'
import { FlowDiagram } from 'components/Code/FlowDiagram'
import { DottedConnection } from 'components/Code/DottedConnection'
import {
    StickerAi,
    StickerBulb,
    StickerCloud,
    StickerCoffee,
    StickerELearning,
    StickerMicroscope,
    StickerTombstone,
    StickerPause,
    StickerPullRequest,
    StickerRobot,
    StickerTerminal,
    StickerUsers,
    StickerWebsite,
    StickerZZZ,
    StickerOne,
} from 'components/Stickers/Stickers'
import { ZoomImage } from 'components/ZoomImage'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

// ─────────────────────────────────────────────
// Download CTA Button
// ─────────────────────────────────────────────

function DownloadButton() {
    return (
        <a
            href="#"
            className="inline-flex items-center gap-2 bg-[#1d1f27] dark:bg-white text-white dark:text-[#1d1f27] rounded-full px-5 py-2.5 text-sm font-semibold no-underline hover:opacity-90 transition-opacity"
        >
            <IconApple className="size-4" />
            <span>Download for Mac</span>
            <IconArrowRight className="size-4" />
        </a>
    )
}

// ─────────────────────────────────────────────
// Section label ("The old way", "The PostHog way")
// ─────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
    return <div className="font-squeak text-secondary text-2xl uppercase mx-auto max-w-lg">{children}</div>
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

// ─────────────────────────────────────────────
// AI Model badge with connection point
// ─────────────────────────────────────────────

function AIModelBadge({ innerRef }: { innerRef: React.RefObject<HTMLSpanElement> }) {
    return (
        <span
            ref={innerRef}
            className="inline-flex items-center gap-1.5 border border-primary rounded px-2 py-1 text-xs bg-accent align-middle ml-6 mt-0 mb-2"
        >
            <span className="font-semibold">Supports</span>
            <span className="text-secondary">Haiku, Opus, Sonnet, Codex, GPT 5.2</span>
        </span>
    )
}

function PostHogCodeLogo() {
    return (
        <svg
            width="229"
            height="28"
            viewBox="0 0 229 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-8"
        >
            <g clipPath="url(#clip0_216_389)">
                <path
                    d="M50.01 23.3376L49.6723 23.2968C48.6653 23.1688 47.7281 22.7031 47.0179 21.9696L33.2856 7.74258V28.0004H48.9971C50.4757 28.0004 51.669 26.8012 51.669 25.3284V25.2237C51.669 24.2632 50.953 23.454 50.0041 23.3376H50.01ZM39.2 23.5471C38.2162 23.5471 37.4187 22.7496 37.4187 21.7659C37.4187 20.7821 38.2162 19.9846 39.2 19.9846C40.1838 19.9846 40.9813 20.7821 40.9813 21.7659C40.9813 22.7496 40.1838 23.5471 39.2 23.5471Z"
                    fill="#111111"
                />
                <path d="M21.9692 28.0003H31.0154L21.9692 18.6922V28.0003Z" fill="url(#paint0_linear_216_389)" />
                <path
                    d="M21.9692 7.64934V18.6922L31.0154 28.0003H33.2915V19.29L21.9692 7.64934Z"
                    fill="url(#paint1_linear_216_389)"
                />
                <path
                    d="M33.2915 19.2975V7.74242L26.5563 0.81519C24.8857 -0.907887 21.9692 0.279639 21.9692 2.67798V7.65L33.2915 19.2917V19.2975Z"
                    fill="url(#paint2_linear_216_389)"
                />
                <path d="M10.7402 28.0003H19.6001L10.7402 18.733V28.0003Z" fill="url(#paint3_linear_216_389)" />
                <path
                    d="M10.7402 7.14297V18.733L19.6001 28.0004H21.9693V18.6922L10.7402 7.14297Z"
                    fill="url(#paint4_linear_216_389)"
                />
                <path
                    d="M21.9693 7.64929L15.3273 0.81519C13.6567 -0.907887 10.7402 0.279639 10.7402 2.67798V7.15L21.9693 18.6921V7.64929Z"
                    fill="url(#paint5_linear_216_389)"
                />
                <path
                    d="M0 25.4097C0 26.8403 1.15978 28.0001 2.59044 28.0001H8.94531L0 18.18V25.4097Z"
                    fill="url(#paint6_linear_216_389)"
                />
                <path
                    d="M10.74 18.725V28.0001H8.94141L0 18.1836V7.50948L10.74 18.725Z"
                    fill="url(#paint7_linear_216_389)"
                />
                <path
                    d="M10.7401 7.14294L4.58711 0.815289C2.91642 -0.907788 0 0.279738 0 2.67808V7.50968L10.7401 18.733V7.14294Z"
                    fill="url(#paint8_linear_216_389)"
                />
            </g>
            <path
                d="M64.9072 22.8764C64.2266 22.8764 63.6748 22.3246 63.6748 21.644V5.23239C63.6748 4.55176 64.2266 4 64.9072 4H71.495C75.4051 4 77.913 6.3191 77.913 9.90562C77.913 13.4921 75.4051 15.8112 71.495 15.8112H67.9355V21.644C67.9355 22.3246 67.3837 22.8764 66.7031 22.8764H64.9072ZM67.9355 10.9384C67.9355 11.619 68.4872 12.1708 69.1679 12.1708H71.0636C72.6815 12.1708 73.6523 11.3079 73.6523 9.90562C73.6523 8.50337 72.6815 7.64045 71.0636 7.64045H69.1679C68.4872 7.64045 67.9355 8.19221 67.9355 8.87284V10.9384Z"
                fill="#111111"
            />
            <path
                d="M84.8122 23.0921C80.6054 23.0921 77.6391 20.1258 77.6391 16.0809C77.6391 12.036 80.6054 9.06966 84.8122 9.06966C88.965 9.06966 91.9852 12.036 91.9852 16.0809C91.9852 20.1258 88.965 23.0921 84.8122 23.0921ZM81.5762 16.0809C81.5762 18.2382 82.8706 19.7213 84.8122 19.7213C86.7268 19.7213 88.0212 18.2382 88.0212 16.0809C88.0212 13.9236 86.7268 12.4404 84.8122 12.4404C82.8706 12.4404 81.5762 13.9236 81.5762 16.0809Z"
                fill="#111111"
            />
            <path
                d="M97.9945 23.0921C95.2621 23.0921 93.3898 21.7197 92.4229 20.0903C92.0858 19.5223 92.4126 18.831 93.0279 18.5911L93.8118 18.2855C94.5013 18.0167 95.2589 18.4413 95.7228 19.0179C96.243 19.6646 97.0241 20.0989 97.9945 20.0989C99.0462 20.0989 99.7473 19.5865 99.7473 18.8315C99.7473 16.7011 92.5473 18.1303 92.5473 12.9798C92.5473 10.8494 94.408 9.06966 97.4012 9.06966C99.6737 9.06966 101.621 9.97222 102.594 11.3786C102.957 11.9037 102.639 12.5743 102.049 12.8191L101.19 13.1758C100.509 13.4589 99.7411 13.0353 99.1924 12.5414C98.7094 12.1067 98.0884 11.9011 97.536 11.9011C96.6462 11.9011 96.0259 12.2787 96.0259 12.8719C96.0259 15.0292 103.334 13.2494 103.334 18.7506C103.334 21.0966 101.176 23.0921 97.9945 23.0921Z"
                fill="#111111"
            />
            <path
                d="M112.699 21.7805C112.744 22.3451 112.399 22.8782 111.841 22.9786C111.438 23.0513 111.009 23.0921 110.564 23.0921C107.624 23.0921 105.386 21.5281 105.386 18.2382V12.5753H104.461C103.78 12.5753 103.229 12.0235 103.229 11.3429V10.5178C103.229 9.83715 103.78 9.28539 104.461 9.28539H105.386V6.5807C105.386 5.90007 105.938 5.34832 106.618 5.34832H108.118C108.798 5.34832 109.35 5.90007 109.35 6.5807V9.28539H111.408C112.088 9.28539 112.64 9.83715 112.64 10.5178V11.3429C112.64 12.0235 112.088 12.5753 111.408 12.5753H109.35V17.7258C109.35 18.9393 109.997 19.6405 110.968 19.6405C111.717 19.6405 112.571 20.1504 112.63 20.8973L112.699 21.7805Z"
                fill="#111111"
            />
            <path
                d="M125.787 5.23239C125.787 4.55176 126.339 4 127.019 4H128.842C129.523 4 130.074 4.55176 130.074 5.23239V21.644C130.074 22.3246 129.523 22.8764 128.842 22.8764H127.019C126.339 22.8764 125.787 22.3246 125.787 21.644V16.2077C125.787 15.527 125.235 14.9753 124.554 14.9753H119.523C118.842 14.9753 118.29 15.527 118.29 16.2077V21.644C118.29 22.3246 117.738 22.8764 117.058 22.8764H115.262C114.581 22.8764 114.03 22.3246 114.03 21.644V5.23239C114.03 4.55176 114.581 4 115.262 4H117.058C117.738 4 118.29 4.55176 118.29 5.23239V10.1024C118.29 10.7831 118.842 11.3348 119.523 11.3348H124.554C125.235 11.3348 125.787 10.7831 125.787 10.1024V5.23239Z"
                fill="#111111"
            />
            <path
                d="M138.723 23.0921C134.516 23.0921 131.55 20.1258 131.55 16.0809C131.55 12.036 134.516 9.06966 138.723 9.06966C142.875 9.06966 145.896 12.036 145.896 16.0809C145.896 20.1258 142.875 23.0921 138.723 23.0921ZM135.487 16.0809C135.487 18.2382 136.781 19.7213 138.723 19.7213C140.637 19.7213 141.932 18.2382 141.932 16.0809C141.932 13.9236 140.637 12.4404 138.723 12.4404C136.781 12.4404 135.487 13.9236 135.487 16.0809Z"
                fill="#111111"
            />
            <path
                d="M152.738 22.4449C148.882 22.4449 146.509 19.8562 146.509 15.7573C146.509 11.6584 148.882 9.06966 152.657 9.06966C154.248 9.06966 155.488 9.60899 156.216 10.4449C156.216 9.80454 156.736 9.28539 157.376 9.28539H158.894C159.575 9.28539 160.126 9.83715 160.126 10.5178V21.9056C160.126 25.5461 157.349 28 153.169 28C150.514 28 148.254 26.7986 147.296 24.9126C146.98 24.292 147.455 23.6231 148.143 23.5154L149.298 23.3343C149.964 23.2299 150.583 23.7336 151.081 24.1882C151.583 24.6467 152.344 24.8989 153.169 24.8989C155.03 24.8989 156.243 23.8472 156.243 22.3371V21.0427C155.542 21.9326 154.221 22.4449 152.738 22.4449ZM150.365 15.7573C150.365 17.7798 151.551 19.0742 153.385 19.0742C155.246 19.0742 156.432 17.7798 156.432 15.7573C156.432 13.7348 155.246 12.4404 153.385 12.4404C151.551 12.4404 150.365 13.7348 150.365 15.7573Z"
                fill="#111111"
            />
            <path
                d="M215.662 16.5474C215.662 13.3467 217.608 9.88989 222.064 9.88989C226.724 9.88989 228.695 13.3467 228.695 16.2145C228.695 16.4485 228.69 16.7038 228.682 16.9391C228.668 17.3267 228.347 17.6228 227.959 17.6228H220.313C219.832 17.6228 219.469 18.0766 219.684 18.5067C220.195 19.5304 221.134 20.0809 222.396 20.0809C223.372 20.0809 224.154 19.739 224.596 19.1003C224.833 18.7583 225.233 18.5042 225.634 18.6119L227.682 19.161C228.095 19.2716 228.337 19.7077 228.15 20.0916C227.182 22.0751 225.046 23.2048 222.294 23.2048C217.839 23.2048 215.662 19.7481 215.662 16.5474ZM219.744 14.0682C219.525 14.4999 219.891 14.9598 220.375 14.9598H223.848C224.291 14.9598 224.65 14.5694 224.49 14.1563C224.148 13.2743 223.363 12.6809 222.064 12.6809C221.006 12.6809 220.213 13.1474 219.744 14.0682Z"
                fill="black"
            />
            <path
                d="M206.433 23.2049C202.644 23.2049 200.365 20.5931 200.365 16.5474C200.365 12.5017 202.644 9.88992 206.382 9.88992C207.039 9.88992 207.632 9.98956 208.153 10.1698C208.818 10.4 209.864 9.93698 209.864 9.23333V5.62122C209.864 5.207 210.2 4.87122 210.614 4.87122H212.878C213.293 4.87122 213.628 5.207 213.628 5.62122V22.25C213.628 22.6642 213.293 23 212.878 23H210.177C210.004 23 209.864 22.8599 209.864 22.6872C209.864 22.3837 209.424 22.2183 209.178 22.3959C208.467 22.9092 207.491 23.2049 206.433 23.2049ZM204.026 16.5474C204.026 18.6214 205.255 20.0041 207.048 20.0041C208.891 20.0041 210.095 18.6214 210.095 16.5474C210.095 14.4733 208.891 13.0906 207.048 13.0906C205.255 13.0906 204.026 14.4733 204.026 16.5474Z"
                fill="black"
            />
            <path
                d="M192.204 23.2048C188.209 23.2048 185.393 20.3882 185.393 16.5474C185.393 12.7065 188.209 9.88989 192.204 9.88989C196.147 9.88989 199.015 12.7065 199.015 16.5474C199.015 20.3882 196.147 23.2048 192.204 23.2048ZM189.131 16.5474C189.131 18.5958 190.36 20.0041 192.204 20.0041C194.022 20.0041 195.251 18.5958 195.251 16.5474C195.251 14.4989 194.022 13.0906 192.204 13.0906C190.36 13.0906 189.131 14.4989 189.131 16.5474Z"
                fill="black"
            />
            <path
                d="M175.783 23.2049C170.918 23.2049 166.77 20.081 166.77 14.038C166.77 7.9951 170.995 4.87122 175.783 4.87122C179.981 4.87122 182.988 6.98386 183.772 10.3037C183.863 10.687 183.601 11.0538 183.216 11.1348L180.628 11.6787C180.217 11.7651 179.822 11.494 179.681 11.0984C179.072 9.37953 177.583 8.32798 175.758 8.32798C173.043 8.32798 170.841 10.2996 170.841 14.038C170.841 17.7765 173.018 19.7225 175.758 19.7225C177.578 19.7225 178.956 18.8174 179.557 17.3246C179.713 16.937 180.111 16.674 180.518 16.7663L183.11 17.353C183.517 17.4452 183.774 17.8539 183.639 18.2489C182.577 21.3676 179.711 23.2049 175.783 23.2049Z"
                fill="black"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_216_389"
                    x1="22.0706"
                    y1="18.9105"
                    x2="30.9817"
                    y2="27.977"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FF9500" />
                    <stop offset="1" stopColor="#F8AA00" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_216_389"
                    x1="21.9176"
                    y1="7.96688"
                    x2="33.3267"
                    y2="27.9328"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FFB700" />
                    <stop offset="1" stopColor="#F9AA01" />
                </linearGradient>
                <linearGradient
                    id="paint2_linear_216_389"
                    x1="21.9176"
                    y1="1.96209"
                    x2="33.3267"
                    y2="18.7755"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FFD849" />
                    <stop offset="0.955762" stopColor="#FBAE01" />
                </linearGradient>
                <linearGradient
                    id="paint3_linear_216_389"
                    x1="10.3585"
                    y1="19.6762"
                    x2="16.6306"
                    y2="27.9771"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#C42C00" />
                    <stop offset="1" stopColor="#D63600" />
                </linearGradient>
                <linearGradient
                    id="paint4_linear_216_389"
                    x1="10.6587"
                    y1="7.36639"
                    x2="22.6683"
                    y2="28.233"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#EF3C00" />
                    <stop offset="1" stopColor="#D63601" />
                </linearGradient>
                <linearGradient
                    id="paint5_linear_216_389"
                    x1="10.7763"
                    y1="7.25343"
                    x2="21.9669"
                    y2="18.6514"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FF651E" />
                    <stop offset="1" stopColor="#E4400A" />
                </linearGradient>
                <linearGradient
                    id="paint6_linear_216_389"
                    x1="8.85508e-07"
                    y1="18.94"
                    x2="9.22196"
                    y2="28.2656"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#0041C6" />
                    <stop offset="1" stopColor="#0045D0" />
                </linearGradient>
                <linearGradient
                    id="paint7_linear_216_389"
                    x1="-4.65371"
                    y1="13.8113"
                    x2="8.85929"
                    y2="27.977"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#0255FF" />
                    <stop offset="1" stopColor="#0145D2" />
                </linearGradient>
                <linearGradient
                    id="paint8_linear_216_389"
                    x1="-5.10406"
                    y1="1.80181"
                    x2="10.8086"
                    y2="19.5159"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#3F80FF" />
                    <stop offset="1" stopColor="#084FE0" />
                </linearGradient>
                <clipPath id="clip0_216_389">
                    <rect width="51.6748" height="28" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}

function PostHogCodeLogomark({ className }) {
    return (
        <svg
            width="96"
            height="52"
            viewBox="0 0 96 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
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
    )
}

// ─────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────

function HeroSection() {
    return (
        <section className="my-6 @4xl/editor:mb-16 gap-8 @4xl/editor:gap-4 flex flex-col @4xl/editor:flex-row items-center">
            <div>
                <PostHogCodeLogo />
                <h1 className="text-xl @xl:text-2xl font-bold leading-tight mb-5 !mt-0">
                    {'The AI code editor that knows your '}
                    <RoughAnnotation type="underline" color="#F54E00" strokeWidth={2} delay={300}>
                        <em className="font-bold">product</em>
                    </RoughAnnotation>
                    {', not just your '}
                    <RoughAnnotation type="underline" color="#F54E00" strokeWidth={2} delay={600}>
                        <em className="font-bold">codebase</em>
                    </RoughAnnotation>
                </h1>

                <DownloadButton />
            </div>

            <div className="@4xl/editor:flex-[0_0_440px] @4xl/editor:-mr-16">
                <ZoomImage>
                    <img
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/signals_light_4b3440dc2b.png"
                        alt="PostHog Code screenshot"
                        className="w-full rounded shadow-2xl dark:hidden"
                    />
                    <img
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/signals_dark_b29e5ed8f9.png"
                        alt="PostHog Code screenshot"
                        className="w-full rounded shadow-2xl hidden dark:block"
                    />
                </ZoomImage>
                {/* 
                <img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/code_screenshot_light_d0c42a8067.png"
                    alt="PostHog Code screenshot"
                    className="w-full rounded border border-primary dark:hidden"
                />
                <img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/code_screenshot_dark_b2a90f3c71.png"
                    alt="PostHog Code screenshot"
                    className="w-full rounded border border-primary hidden dark:block"
                />
                 */}
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// "The old way" Section
// ─────────────────────────────────────────────

function OldWaySection() {
    return (
        <section className="relative mb-8 @2xl:mb-12">
            <SectionLabel>
                The{' '}
                <InlineIcon icon={StickerTombstone} className="!size-10 !top-3 -rotate-1">
                    old way
                </InlineIcon>{' '}
                to build
            </SectionLabel>

            <p className="text-base leading-loose mb-5 mx-auto max-w-lg">
                <ChoppyReveal wordDelay={40}>
                    {'Most AI code editors '}
                    <InlineIcon icon={StickerBulb}>
                        <em>lack context</em>
                    </InlineIcon>
                    {' and '}
                    <InlineIcon icon={StickerPause}>{' wait for '}</InlineIcon>
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

            <FlowDiagram className="mb-5" />

            <p className="text-base leading-loose mx-auto max-w-lg">
                <ChoppyReveal wordDelay={40}>
                    {'They use your '}
                    <InlineIcon icon={StickerTerminal}>
                        {' '}
                        <strong className="font-mono bg-blue/10 border border-blue rounded-sm px-1 leading-normal">
                            &lt;codebase /&gt;
                        </strong>
                    </InlineIcon>
                    {' as the source of truth, not how '}
                    <InlineIcon icon={StickerUsers}>
                        <em>humans</em>
                    </InlineIcon>{' '}
                    (or{' '}
                    <InlineIcon icon={StickerRobot}>
                        <em>agents</em>
                    </InlineIcon>
                    ){' use your '}
                    <InlineIcon icon={StickerWebsite}>
                        {' '}
                        <RoughAnnotation type="underline" color="#30A46C" strokeWidth={2}>
                            <em>product</em>
                        </RoughAnnotation>
                    </InlineIcon>
                    {'.'}
                </ChoppyReveal>
            </p>
        </section>
    )
}

// ─────────────────────────────────────────────
// "The PostHog way" Section
// ─────────────────────────────────────────────

function PostHogWaySection() {
    const signalsWordRef = useRef<HTMLSpanElement>(null)
    const signalsBoxRef = useRef<HTMLDivElement>(null)
    const aiModelRef = useRef<HTMLSpanElement>(null)
    const aiModelBadgeRef = useRef<HTMLSpanElement>(null)
    const sectionRef = useRef<HTMLDivElement>(null)

    return (
        <section ref={sectionRef} className="relative mb-8 @2xl:mb-12">
            <SectionLabel>
                The <PostHogCodeLogomark className="inline-block -rotate-2 w-12 relative -top-0.5" /> PostHog way
            </SectionLabel>

            <div className="relative mx-auto max-w-lg">
                {/* Signals callout — in DOM before paragraph so float-right works on desktop.
                    On mobile (no float), it falls in normal flow above the paragraph,
                    but we use flex + order to push it below the first paragraph. */}
                <div className="flex flex-col @2xl:block">
                    <div
                        ref={signalsBoxRef}
                        className="order-2 mb-5 @2xl:order-none @2xl:float-right @2xl:ml-6 @2xl:my-4 @2xl:w-72 @2xl:-mr-24"
                    >
                        <SignalsCallout />
                    </div>

                    <p className="text-base leading-loose mb-5 mx-auto order-1">
                        <ChoppyReveal wordDelay={40}>
                            <InlineIcon icon={StickerCoffee}>
                                <strong>{' PostHog Code'}</strong>
                            </InlineIcon>
                            {' uses '}
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
                            <span className="text-green text-sm">&#9679;</span> <strong>production data</strong>
                            {' to '}
                            <InlineIcon icon={StickerMicroscope}>{' diagnose'}</InlineIcon>
                            {' issues and generate '}
                            <InlineIcon icon={StickerPullRequest}>{' pull requests'}</InlineIcon>
                            {' to fix them — '}
                            <em>before you even know there&apos;s a problem.</em>
                            <InlineIcon icon={StickerZZZ} />
                        </ChoppyReveal>
                    </p>
                </div>

                <p className="text-base leading-loose mb-2">
                    <ChoppyReveal wordDelay={40}>
                        {'Run it '}
                        <InlineIcon icon={StickerELearning}>{' locally'}</InlineIcon>
                        {' or in the '}
                        <InlineIcon icon={StickerCloud}>{' cloud'}</InlineIcon>
                        {' — either way, it automatically uses the right '}
                        <span ref={aiModelRef}>
                            <RoughAnnotation type="box" color="currentColor" strokeWidth={1} padding={2}>
                                <strong>AI model</strong>
                            </RoughAnnotation>
                        </span>
                        {' for the job.'}
                    </ChoppyReveal>
                </p>

                <AIModelBadge innerRef={aiModelBadgeRef} />

                <p className="text-base leading-loose mb-2">One subscription, access to all the models you expect.</p>

                {/* Clear float */}
                <div className="clear-both" />

                {/* Dotted connection lines */}
                <DottedConnection sourceRef={signalsWordRef} targetRef={signalsBoxRef} containerRef={sectionRef} />
                <DottedConnection sourceRef={aiModelRef} targetRef={aiModelBadgeRef} containerRef={sectionRef} />
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Bottom CTA
// ─────────────────────────────────────────────

function BottomCTASection() {
    return (
        <section className="mb-8">
            <p className="text-base leading-loose mb-5 mx-auto max-w-lg">
                <ChoppyReveal wordDelay={40}>
                    {'There are plenty of '}
                    <InlineIcon icon={StickerAi}>{' AI coding tools.'}</InlineIcon>
                    {" But there's only "}
                    <InlineIcon icon={StickerOne}>{' one'}</InlineIcon>
                    {' that knows your product like '}
                    <InlineIcon icon={StickerCoffee}>
                        {' '}
                        <strong>PostHog Code.</strong>
                    </InlineIcon>
                </ChoppyReveal>
            </p>
            <div className="mx-auto max-w-lg">
                <DownloadButton />
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function CodePage() {
    return (
        <>
            <SEO
                title="PostHog Code – The AI code editor that knows your product"
                description="PostHog Code uses signals from production data to diagnose issues and generate pull requests — before you even know there's a problem."
            />
            <Editor slug="/code">
                <div className="@container not-prose font-rounded">
                    <HeroSection />
                    <OldWaySection />

                    {/* Dotted divider */}
                    <hr className="border-t border-dashed border-primary my-8 @2xl:my-12" />

                    <PostHogWaySection />

                    {/* Dotted divider */}
                    <hr className="border-t border-dashed border-primary my-8 @2xl:my-12" />

                    <BottomCTASection />
                </div>
            </Editor>
        </>
    )
}
