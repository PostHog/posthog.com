import React from 'react'
import {
    IconCheck,
    IconCopy,
    IconDashboard,
    IconDirectedGraph,
    IconEye,
    IconHide,
    IconLlmPromptEvaluation,
    IconThumbsUp,
} from '@posthog/icons'
import OSButton from 'components/OSButton'
import { IconClaudeCode } from 'components/OSIcons/Icons'
import { StepDefinition } from 'onboarding/steps'
import { Logo } from '@posthog/brand/logo'
import { getCookie } from 'lib/utils'
import TraceExplorerCallout from './trace-explorer-callout'

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

export const ClaudePlatformBanner = (): JSX.Element => (
    <div className="not-prose mb-8">
        <TraceExplorerCallout
            hedgehogSrc={EXPLORER_HOG}
            claudeLogo={<IconClaudeCode />}
            posthogLogo={<Logo layout="logomark" width="auto" />}
            setUpHref="#copy-your-project-token"
            className="!my-0"
        />
    </div>
)

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
