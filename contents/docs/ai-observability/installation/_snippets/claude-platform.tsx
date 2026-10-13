import React from 'react'
import { createPortal } from 'react-dom'
import {
    IconCheck,
    IconCopy,
    IconDashboard,
    IconDirectedGraph,
    IconEye,
    IconHide,
    IconLlmPromptEvaluation,
    IconThumbsUp,
    IconX,
} from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import OSButton from 'components/OSButton'
import { IconClaudeCode } from 'components/OSIcons/Icons'
import { StepDefinition } from 'onboarding/steps'
import { Logo } from '@posthog/brand/logo'
import { getCookie } from 'lib/utils'
import TraceExplorerCallout from './trace-explorer-callout'

const SUPER_MAX = 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/max.png'
const EXPLORER_HOG = '/images/docs/ai-observability/explorer-hedgehog.png'
const PROJECT_TOKEN_URL = 'https://app.posthog.com/settings/project#variables'

const LOGIN_URL = 'https://app.posthog.com/login'

const readCookie = (name: string): string | null => getCookie(name)?.replace(/^"|"$/g, '') || null

// The app sets these cookies on .posthog.com for logged-in users, so the docs can show the
// visitor's own project token and region.
type CurrentProject = { token: string | null; name: string | null; region: 'US' | 'EU' | null }

const readRegion = (): CurrentProject['region'] => {
    const instance = readCookie('ph_current_instance')
    if (!instance) {
        return null
    }
    return instance.includes('eu.') ? 'EU' : 'US'
}

const useCurrentProject = (): CurrentProject => {
    const [project, setProject] = React.useState<CurrentProject>({ token: null, name: null, region: null })

    React.useEffect(() => {
        setProject({
            token: readCookie('ph_current_project_token'),
            name: readCookie('ph_current_project_name'),
            region: readRegion(),
        })
    }, [])

    return project
}

export const ProjectToken = (): JSX.Element => {
    const { token, name, region } = useCurrentProject()
    const [copied, setCopied] = React.useState(false)
    const [revealed, setRevealed] = React.useState(false)

    if (!token) {
        return (
            <div className="not-prose rounded border border-primary bg-primary p-3 text-sm text-left mb-2">
                <p className="!m-0 !mb-2 font-semibold">Log in to see your project token here</p>
                <div className="flex flex-wrap items-center gap-2">
                    <OSButton asLink to={LOGIN_URL} external variant="primary" size="sm">
                        Log in to PostHog
                    </OSButton>
                    <a href={PROJECT_TOKEN_URL} className="underline opacity-75">
                        or open your project settings
                    </a>
                </div>
            </div>
        )
    }

    const copy = (): void => {
        void navigator.clipboard.writeText(token)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="not-prose rounded border border-primary bg-primary p-3 text-sm text-left mb-2">
            <p className="!m-0 !mb-2 opacity-75">
                {name ? (
                    <>
                        Your project token for <strong>{name}</strong>.
                    </>
                ) : (
                    'Your project token.'
                )}
                {region && (
                    <>
                        {' '}
                        In Claude, pick the <strong>{region}</strong> region.
                    </>
                )}
            </p>
            <div className="flex items-center gap-2">
                <code className="flex-1 min-w-0 truncate rounded border border-primary bg-accent px-2 py-1 font-mono text-xs">
                    {revealed ? token : `${token.slice(0, 4)}${'•'.repeat(24)}`}
                </code>
                <OSButton size="sm" icon={revealed ? <IconHide /> : <IconEye />} onClick={() => setRevealed(!revealed)}>
                    {revealed ? 'Hide' : 'Show'}
                </OSButton>
                <OSButton variant="primary" size="sm" icon={copied ? <IconCheck /> : <IconCopy />} onClick={copy}>
                    {copied ? 'Copied' : 'Copy'}
                </OSButton>
            </div>
        </div>
    )
}

// Made-up Messages API calls, so visitors see what arrives in PostHog before they connect anything.
const DEMO_CALLS = [
    { prompt: 'Summarize this support ticket', tokens: '1,204 → 318', cost: 0.014, seconds: 2.1 },
    { prompt: 'Write a SQL query for weekly signups', tokens: '842 → 506', cost: 0.017, seconds: 3.4 },
    { prompt: 'Classify the sentiment of this review', tokens: '388 → 12', cost: 0.002, seconds: 0.6 },
    { prompt: 'Translate the release notes to Spanish', tokens: '2,310 → 2,145', cost: 0.065, seconds: 7.8 },
    { prompt: 'Tell me about hedgehogs', tokens: '24 → 690', cost: 0.017, seconds: 4.2 },
]

const MAX_SECONDS = Math.max(...DEMO_CALLS.map((call) => call.seconds))
const STEP_MS = 1100

// Plays once: a new call lands on top every STEP_MS until all of them are in.
const CallFeed = (): JSX.Element => {
    const [visible, setVisible] = React.useState(1)

    React.useEffect(() => {
        if (visible >= DEMO_CALLS.length) {
            return
        }
        const timeout = setTimeout(() => setVisible(visible + 1), STEP_MS)
        return () => clearTimeout(timeout)
    }, [visible])

    const calls = DEMO_CALLS.slice(0, visible)
    const totalCost = calls.reduce((sum, call) => sum + call.cost, 0)

    return (
        <div className="rounded border border-primary bg-primary p-3 text-left shadow-sm" aria-label="Example calls">
            <div className="flex items-center gap-2 text-xs font-semibold mb-2">
                <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-green opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-green" />
                </span>
                <span>Live</span>
                <span className="truncate opacity-50 font-normal">Example calls to claude-opus-5</span>
                <span className="ml-auto shrink-0 tabular-nums">
                    {visible} {visible === 1 ? 'call' : 'calls'} · ${totalCost.toFixed(3)}
                </span>
            </div>
            <div className="flex flex-col gap-1.5">
                {[...calls].reverse().map((call) => (
                    <div
                        key={call.prompt}
                        className="cp-row-in grid grid-cols-[minmax(0,1fr)_7rem] items-center gap-3 text-xs"
                    >
                        <div className="min-w-0">
                            <div className="truncate font-semibold">"{call.prompt}"</div>
                            <div className="truncate opacity-60 tabular-nums">
                                {call.tokens} tokens · ${call.cost.toFixed(3)}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative h-2 flex-1 rounded-full bg-accent">
                                <div
                                    className="cp-bar-in absolute left-0 top-0 h-2 rounded-full bg-orange"
                                    style={{ width: `${(call.seconds / MAX_SECONDS) * 100}%` }}
                                />
                            </div>
                            <span className="w-8 text-right tabular-nums opacity-60">{call.seconds}s</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const DROP_IN_SEEN_KEY = 'claude-platform-drop-in-seen'
const DROP_IN_SECONDS = 10

const DROP_IN_STYLES = `
@keyframes cp-rappel { 0% { transform: translateY(-120vh); } 70% { transform: translateY(3vh); } 85% { transform: translateY(-1vh); } 100% { transform: translateY(0); } }
@keyframes cp-swing { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(1deg); } 75% { transform: rotate(-1deg); } }
@keyframes cp-countdown { from { width: 100%; } to { width: 0%; } }
@keyframes cp-row-in { from { opacity: 0; transform: translateY(-0.5rem); } }
@keyframes cp-bar-in { from { width: 0; } }
@keyframes cp-fade-out { to { opacity: 0; transform: translateY(-1rem); } }
.cp-rappel { animation: cp-rappel 1.2s cubic-bezier(0.2, 0.8, 0.3, 1) both; }
.cp-swing { transform-origin: top center; animation: cp-swing 3s ease-in-out 1.2s infinite; }
.cp-countdown { animation: cp-countdown ${DROP_IN_SECONDS}s linear 1.2s both; }
.cp-drop-in:hover .cp-countdown, .cp-drop-in:focus-within .cp-countdown { animation-play-state: paused; }
.cp-row-in { animation: cp-row-in 0.4s ease-out both; }
.cp-bar-in { animation: cp-bar-in 0.7s ease-out 0.2s both; }
.cp-leaving { animation: cp-fade-out 0.3s ease-in forwards; }
`

const readSessionFlag = (): boolean => {
    try {
        return sessionStorage.getItem(DROP_IN_SEEN_KEY) === '1'
    } catch {
        return false
    }
}

const writeSessionFlag = (): void => {
    try {
        sessionStorage.setItem(DROP_IN_SEEN_KEY, '1')
    } catch {
        // Private windows can block storage. The drop-in then shows again next visit.
    }
}

// Max rappels into the top-right corner once per session when a visitor lands on the Claude Platform tab
// from a direct link, such as the "PostHog docs" link in the Claude Console. It closes after 10 seconds,
// and the countdown pauses while the pointer or focus is on it.
const MaxDropIn = ({ onAccept }: { onAccept: () => void }): JSX.Element | null => {
    const [state, setState] = React.useState<'hidden' | 'shown' | 'leaving'>('hidden')

    React.useEffect(() => {
        const tab = new URLSearchParams(window.location.search).get('tab')
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (tab === 'Claude Platform' && !reducedMotion && !readSessionFlag()) {
            writeSessionFlag()
            setState('shown')
        }
    }, [])

    const close = React.useCallback(
        (accepted: boolean): void => {
            setState('leaving')
            setTimeout(() => {
                setState('hidden')
                if (accepted) {
                    onAccept()
                }
            }, 300)
        },
        [onAccept]
    )

    if (state === 'hidden') {
        return null
    }

    return createPortal(
        <div
            role="dialog"
            data-scheme="primary"
            aria-label="Your Claude calls in PostHog"
            className={`cp-drop-in fixed top-16 right-4 z-[1000] w-[min(26rem,calc(100vw-2rem))] ${
                state === 'leaving' ? 'cp-leaving' : ''
            }`}
        >
            <style>{DROP_IN_STYLES}</style>
            <div className="cp-rappel">
                <div className="cp-swing flex flex-col items-center">
                    <div className="relative">
                        <div className="absolute bottom-[85%] left-1/2 h-[100vh] w-[3px] -translate-x-1/2 rounded-full bg-[#8a6a3a]" />
                        <img
                            src={SUPER_MAX}
                            alt="Max the hedgehog in a mask and cape"
                            className="relative w-20 drop-shadow-lg"
                        />
                    </div>
                    <div className="not-prose relative -mt-2 w-full overflow-hidden rounded border border-secondary bg-[#faebcd] dark:bg-[#2a2a2d] text-left shadow-2xl">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_9608fcca70.png"
                            className="dark:hidden absolute inset-0 -bottom-12"
                            imgClassName="h-full w-full object-cover"
                        />
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_dark_a92b0e022d.png"
                            className="hidden dark:block absolute inset-0 -bottom-12"
                            imgClassName="h-full w-full object-cover"
                        />
                        <div className="relative p-4">
                            <div className="flex items-start gap-2">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <IconClaudeCode className="size-7" />
                                        <span className="text-lg font-bold opacity-40">×</span>
                                        <Logo layout="logomark" width="auto" className="h-6 w-auto" />
                                    </div>
                                    <p className="!mt-2 !mb-0 text-xl font-bold leading-tight">Claude, meet PostHog</p>
                                    <p className="!mt-1 !mb-3 text-sm opacity-75">
                                        See the cost and latency of every Claude call, live.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    aria-label="Close"
                                    onClick={() => close(false)}
                                    className="rounded p-1 opacity-60 hover:opacity-100 hover:bg-accent"
                                >
                                    <IconX className="size-4" />
                                </button>
                            </div>
                            <CallFeed />
                            <div className="mt-3 flex items-center gap-3">
                                <OSButton variant="primary" size="md" onClick={() => close(true)}>
                                    Set it up
                                </OSButton>
                                <span className="text-sm opacity-75">Two steps, no code changes.</span>
                            </div>
                        </div>
                        <div className="relative h-1 bg-accent">
                            <div className="cp-countdown h-1 bg-orange" onAnimationEnd={() => close(false)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}

export const ClaudePlatformBanner = (): JSX.Element => {
    const scrollToSetup = React.useCallback(() => {
        document.getElementById('copy-your-project-token')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, [])

    return (
        <div className="not-prose mb-8">
            <MaxDropIn onAccept={scrollToSetup} />
            <TraceExplorerCallout
                hedgehogSrc={EXPLORER_HOG}
                claudeLogo={<IconClaudeCode />}
                posthogLogo={<Logo layout="logomark" width="auto" />}
                setUpHref="#copy-your-project-token"
                className="!my-0"
            />
        </div>
    )
}

const NEXT_STEPS = [
    {
        icon: <IconLlmPromptEvaluation className="size-5" />,
        title: 'Evaluations',
        description:
            'Quickly monitor how your agent is doing. Score every response for helpfulness, hallucinations, or tone, and see when quality drops.',
        cta: 'Set up evaluations',
        to: '/docs/ai-evals',
    },
    {
        icon: <IconDashboard className="size-5" />,
        title: 'Dashboard',
        description: 'Follow cost, usage, and latency over time, broken down by model or workspace.',
        cta: 'Explore the dashboard',
        to: '/docs/ai-observability/dashboard',
    },
    {
        icon: <IconDirectedGraph className="size-5" />,
        title: 'Clusters',
        description: 'Group similar conversations to see what people ask your agent most.',
        cta: 'Find patterns',
        to: '/docs/ai-observability/clusters',
    },
    {
        icon: <IconThumbsUp className="size-5" />,
        title: 'Sentiment',
        description: 'See how users feel while they talk to your agent.',
        cta: 'Track sentiment',
        to: '/docs/ai-observability/sentiment',
    },
]

const [FEATURED_STEP, ...OTHER_STEPS] = NEXT_STEPS

const NextStepCard = ({
    step: { icon, title, description, cta, to },
    featured = false,
}: {
    step: typeof FEATURED_STEP
    featured?: boolean
}): JSX.Element => (
    <div
        className={`flex flex-col gap-2 rounded border p-4 bg-primary ${featured ? 'border-orange' : 'border-primary'}`}
    >
        <div className="flex items-center gap-2 font-bold">
            {icon}
            <span>{title}</span>
        </div>
        <p className="!m-0 text-sm text-secondary flex-1">{description}</p>
        <div>
            <OSButton asLink to={to} variant={featured ? 'primary' : 'secondary'} size="sm">
                {cta}
            </OSButton>
        </div>
    </div>
)

const NextStepsCards = (): JSX.Element => (
    <div className="not-prose">
        <p className="!mt-0 !mb-4">Your traces are in. Now put them to work.</p>
        <div className="flex flex-col gap-3">
            <NextStepCard step={FEATURED_STEP} featured />
            <div className="grid grid-cols-1 @xl:grid-cols-3 gap-3">
                {OTHER_STEPS.map((step) => (
                    <NextStepCard key={step.title} step={step} />
                ))}
            </div>
        </div>
    </div>
)

const KEEP_AN_EYE_STEP: StepDefinition = {
    title: 'Keep an eye on your agent',
    badge: 'recommended',
    content: <NextStepsCards />,
}

// Troubleshooting stays the last step, so the cards go right before it.
export const addClaudePlatformNextSteps = (steps: StepDefinition[]): StepDefinition[] => {
    const troubleshootingIndex = steps.findIndex((step) => step.title === 'Troubleshooting')
    if (troubleshootingIndex === -1) {
        return [...steps, KEEP_AN_EYE_STEP]
    }
    return [...steps.slice(0, troubleshootingIndex), KEEP_AN_EYE_STEP, ...steps.slice(troubleshootingIndex)]
}
