import React, { useEffect, useMemo, useRef, useState } from 'react'
import { navigate, graphql, useStaticQuery } from 'gatsby'
// @ts-expect-error @gatsbyjs/reach-router does not ship TypeScript declarations.
import { useLocation } from '@gatsbyjs/reach-router'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import {
    IconCheck,
    IconArrowRight,
    IconBrain,
    IconCopy,
    IconFlask,
    IconLightBulb,
    IconRocket,
    IconTrending,
    IconUser,
    IconX,
} from '@posthog/icons'
import { Dialog as RadixDialog } from 'radix-ui'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import EarlyAccessOptIn from 'components/EarlyAccessOptIn'
import Input from 'components/shared/forms/OSForm/input'
import Link from 'components/Link'
import OSButton from 'components/shared/ui/OSButton'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { Select } from 'components/RadixUI/Select'
import Tooltip from 'components/RadixUI/Tooltip'
import SmallTeam from 'components/SmallTeam'
import SurveySignup from 'components/shared/forms/SurveySignup'
import { EarlyAccessFeature, EarlyAccessFeatureStage } from 'hooks/useEarlyAccessFeatures'
import useRoadmapEarlyAccessFeatures from 'hooks/useRoadmapEarlyAccessFeatures'
import usePostHog from 'hooks/usePostHog'
import { ROADMAP_STAGE_STYLES } from './roadmapStageStyles'

const featurePreviewUrl = (flagKey: string): string =>
    `https://us.posthog.com/settings/user-feature-previews#${flagKey}`

const NEW_WINDOW_MS = 40 * 24 * 60 * 60 * 1000
const POPULAR_TOP_N = 10

// Features owned by the AI Research team are "Research Previews": tagged with a special chip
// and pinned to the top of the Concept lane. See /research for the tracks behind them.
const RESEARCH_TEAM_SLUG = 'ai-research'

const PITCH_SURVEY_ID = '019f8008-6dfe-0000-696a-515c59643b03'
const PITCH_QUESTION_ID = 'd257defb-d875-42fd-8cb6-80845c2bb26f'
const PITCH_EMAIL_QUESTION_ID = '794db2f2-7ed4-4cf2-a8a3-d27df1b85530'

type BoardStage = Extract<EarlyAccessFeatureStage, 'concept' | 'alpha' | 'beta'>

interface StageDefinition {
    stage: BoardStage
    title: string
    description: string
    icon: React.ReactNode
    styles: (typeof ROADMAP_STAGE_STYLES)[BoardStage]
}

const STAGES: StageDefinition[] = [
    {
        stage: 'concept',
        title: 'Concept',
        description: 'Ideas we have committed to exploring.',
        icon: <IconLightBulb className="size-5" />,
        styles: ROADMAP_STAGE_STYLES.concept,
    },
    {
        stage: 'alpha',
        title: 'Alpha',
        description: 'In testing with a small group of users.',
        icon: <IconFlask className="size-5" />,
        styles: ROADMAP_STAGE_STYLES.alpha,
    },
    {
        stage: 'beta',
        title: 'Beta',
        description: 'Ready to enable and try in PostHog.',
        icon: <IconRocket className="size-5" />,
        styles: ROADMAP_STAGE_STYLES.beta,
    },
]

type TeamPerson = { id?: string; name: string; role?: string; avatar?: string }
type TeamInfo = { name: string; miniCrest?: Parameters<typeof getImage>[0] }

interface SqueakProfileNode {
    id?: string | number
    attributes?: {
        firstName?: string
        lastName?: string
        companyRole?: string
        avatar?: { data?: { attributes?: { url?: string } } }
    }
}

interface SqueakTeamNode {
    slug: string
    name: string
    miniCrest?: Parameters<typeof getImage>[0]
    profiles?: { data?: SqueakProfileNode[] }
}

type ChipSize = 'sm' | 'md'

const CHIP_SIZE_CLASSES: Record<ChipSize, string> = {
    sm: 'inline-flex shrink-0 items-center gap-0.5 rounded-full border px-2 py-0.5 text-xs font-semibold leading-none',
    md: 'inline-flex h-7 shrink-0 items-center gap-1 rounded-full border px-2.5 text-xs font-semibold leading-none',
}

const CHIP_ICON_SIZE: Record<ChipSize, string> = {
    sm: 'size-3',
    md: 'size-5',
}

const STAGE_CHIP_ICONS: Record<BoardStage, (iconClassName: string) => React.ReactNode> = {
    beta: (iconClassName) => <IconRocket className={iconClassName} />,
    alpha: (iconClassName) => <IconFlask className={iconClassName} />,
    concept: (iconClassName) => <IconLightBulb className={iconClassName} />,
}

const NewChip = ({ size = 'sm' }: { size?: ChipSize }): JSX.Element => (
    <span className={`${CHIP_SIZE_CLASSES[size]} border-primary bg-accent text-red dark:text-yellow`}>New</span>
)

const PopularChip = ({ size = 'sm' }: { size?: ChipSize }): JSX.Element => (
    <span className={`${CHIP_SIZE_CLASSES[size]} border-primary bg-accent text-red dark:text-yellow`}>
        <IconTrending className={CHIP_ICON_SIZE[size]} />
        Popular
    </span>
)

const ResearchPreviewChip = ({ size = 'sm' }: { size?: ChipSize }): JSX.Element => (
    <span className={`${CHIP_SIZE_CLASSES[size]} border-purple bg-purple/10 text-purple`}>
        <IconBrain className={CHIP_ICON_SIZE[size]} />
        Research Preview
    </span>
)

const FeatureBadges = ({
    isResearch,
    isNew,
    isPopular,
    size = 'sm',
}: {
    isResearch: boolean
    isNew: boolean
    isPopular: boolean
    size?: ChipSize
}): JSX.Element | null => {
    if (!isResearch && !isNew && !isPopular) {
        return null
    }

    return (
        <span className="flex flex-wrap items-center gap-1">
            {isResearch && <ResearchPreviewChip size={size} />}
            {isNew && <NewChip size={size} />}
            {isPopular && <PopularChip size={size} />}
        </span>
    )
}

const StageChip = ({ stage, size = 'sm' }: { stage: BoardStage; size?: ChipSize }): JSX.Element => {
    const styles = ROADMAP_STAGE_STYLES[stage]
    return (
        <span className={`${CHIP_SIZE_CLASSES[size]} capitalize ${styles.border} ${styles.surface} ${styles.text}`}>
            {STAGE_CHIP_ICONS[stage](CHIP_ICON_SIZE[size])}
            {stage}
        </span>
    )
}

const roadmapUrl = (search: string, feature?: string): string => {
    const params = new URLSearchParams(search)
    if (feature) {
        params.set('feature', feature)
    } else {
        params.delete('feature')
    }
    const query = params.toString()
    return `/roadmap${query ? `?${query}` : ''}`
}

const CopyLinkButton = ({ flagKey }: { flagKey: string }): JSX.Element => {
    const [copied, setCopied] = useState(false)

    const copy = () => {
        const url = `${window.location.origin}${roadmapUrl('', flagKey)}`
        navigator.clipboard?.writeText(url).then(() => {
            setCopied(true)
            window.setTimeout(() => setCopied(false), 2000)
        })
    }

    return (
        <OSButton
            type="button"
            size="sm"
            variant="default"
            hover="border"
            zoomHover={false}
            icon={copied ? <IconCheck className="text-green" /> : <IconCopy />}
            aria-label={copied ? 'Link copied' : 'Copy link'}
            tooltip={copied ? 'Copied' : 'Copy link'}
            onClick={copy}
        />
    )
}

/** Keep the last word + copy control together so the icon never orphans onto its own line. */
const FeatureTitle = ({ name, flagKey }: { name: string; flagKey: string }): JSX.Element => {
    const words = name.trim().split(/\s+/)
    const lastWord = words.pop() ?? name
    const leading = words.join(' ')

    return (
        <h2 className="m-0 text-2xl leading-tight">
            {leading ? `${leading} ` : null}
            <span className="whitespace-nowrap">
                {lastWord}
                <span className="ml-1.5 inline-flex translate-y-[-0.1em] align-middle">
                    <CopyLinkButton flagKey={flagKey} />
                </span>
            </span>
        </h2>
    )
}

const RoadmapOverlayPanel = ({
    isOpen,
    onClose,
    title,
    portalContainer,
    children,
}: {
    isOpen: boolean
    onClose: () => void
    title: string
    portalContainer: HTMLElement | null
    children: React.ReactNode
}): JSX.Element | null => {
    const shouldReduceMotion = useReducedMotion()

    if (!portalContainer) {
        return null
    }

    return (
        <RadixDialog.Root open={isOpen} modal={false} onOpenChange={() => undefined}>
            <RadixDialog.Portal forceMount container={portalContainer}>
                <AnimatePresence>
                    {isOpen && (
                        <RadixDialog.Content forceMount asChild onEscapeKeyDown={(event) => event.preventDefault()}>
                            <motion.aside
                                data-roadmap-drawer=""
                                className="absolute inset-y-4 right-4 z-50 isolate w-[min(430px,calc(100%-2rem))] overflow-hidden rounded-lg border border-primary bg-primary text-primary shadow-2xl [backface-visibility:hidden] [contain:paint] [will-change:transform] focus:outline-none"
                                initial={shouldReduceMotion ? { x: 0 } : { x: 'calc(100% + 1rem)' }}
                                animate={{ x: 0 }}
                                exit={shouldReduceMotion ? { x: 0 } : { x: 'calc(100% + 1rem)' }}
                                transition={
                                    shouldReduceMotion
                                        ? { duration: 0 }
                                        : { type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }
                                }
                            >
                                <RadixDialog.Title className="sr-only">{title}</RadixDialog.Title>
                                <div className="absolute right-2 top-2 z-20">
                                    <OSButton
                                        type="button"
                                        aria-label="Close panel"
                                        windowButton
                                        size="md"
                                        icon={<IconX />}
                                        onClick={onClose}
                                    />
                                </div>
                                {children}
                            </motion.aside>
                        </RadixDialog.Content>
                    )}
                </AnimatePresence>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    )
}

const PitchIdeaCard = ({ onClick }: { onClick: () => void }): JSX.Element => (
    <button
        data-roadmap-item=""
        type="button"
        aria-haspopup="dialog"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-3 rounded-md border border-dashed border-primary bg-transparent p-3 text-left hover:border-secondary hover:bg-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red dark:focus-visible:ring-yellow"
    >
        <span className="min-w-0">
            <span className="block text-sm font-bold leading-snug">Your idea here.</span>
            <span className="mt-0.5 block text-xs text-secondary">What do you think we should build?</span>
        </span>
        <IconArrowRight className="size-5 shrink-0 text-red dark:text-yellow" />
    </button>
)

const PitchIdeaPanel = (): JSX.Element => {
    const posthog = usePostHog()
    const [idea, setIdea] = useState('')
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const submit = (event: React.FormEvent) => {
        event.preventDefault()
        if (!idea.trim()) {
            return
        }
        posthog?.capture('survey sent', {
            $survey_id: PITCH_SURVEY_ID,
            $survey_response: idea.trim(),
            [`$survey_response_${PITCH_QUESTION_ID}`]: idea.trim(),
            ...(email.trim() ? { [`$survey_response_${PITCH_EMAIL_QUESTION_ID}`]: email.trim() } : {}),
        })
        setSubmitted(true)
    }

    return (
        <div data-scheme="primary" className="flex h-full min-h-0 flex-col bg-primary">
            <header className="shrink-0 border-b border-primary px-4 py-4 pr-14">
                <h2 className="m-0 text-2xl leading-tight">What should we build?</h2>
                <p className="mb-0 mt-2 text-sm text-secondary">
                    Pitch us a concept. The best ideas may end up on this roadmap.
                </p>
            </header>

            <ScrollArea className="min-h-0 flex-1">
                {submitted ? (
                    <div className="p-4">
                        <div className="rounded-md border border-green bg-green/10 p-4">
                            <p className="m-0 flex items-center gap-2 font-bold">
                                <IconCheck className="size-5 shrink-0 text-green" /> Pitch received
                            </p>
                            <p className="mb-0 mt-2 text-sm text-secondary">The team reads every submission.</p>
                        </div>
                    </div>
                ) : (
                    <form id="roadmap-pitch-form" onSubmit={submit} className="flex flex-col gap-5 p-4">
                        <label className="m-0 text-sm font-semibold">
                            Your idea
                            <textarea
                                required
                                value={idea}
                                onChange={(event) => setIdea(event.target.value)}
                                placeholder="What should PostHog build?"
                                rows={8}
                                className="mt-1 block w-full resize-y rounded border border-input bg-primary p-3 text-sm font-normal text-primary placeholder:text-muted focus:border-input-hover focus:outline-none"
                            />
                        </label>
                        <Input
                            label="Email (optional)"
                            showLabel
                            direction="column"
                            size="md"
                            type="email"
                            placeholder="you@company.com"
                            value={email}
                            containerClassName="[&_label]:!text-sm [&_label]:font-semibold"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                        />
                    </form>
                )}
            </ScrollArea>

            {!submitted && (
                <footer className="shrink-0 border-t border-primary bg-primary p-4">
                    <OSButton form="roadmap-pitch-form" type="submit" variant="primary" size="md" width="full">
                        Submit idea
                    </OSButton>
                </footer>
            )}
        </div>
    )
}

const ChangelogCard = (): JSX.Element => (
    <Link
        to="/changelog"
        // The Editor's prose styles hit this anchor (underline, semibold, link color) — reset
        // them so the text matches the PitchIdeaCard button above.
        className="flex w-full items-center justify-between gap-3 rounded-md border border-dashed border-primary bg-transparent p-3 text-left !font-normal !text-primary !no-underline hover:border-secondary hover:bg-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red dark:focus-visible:ring-yellow"
    >
        <span className="min-w-0">
            <span className="block text-sm font-bold leading-snug">What's just shipped?</span>
            <span className="mt-0.5 block text-xs text-secondary">Check the changelog</span>
        </span>
        <IconArrowRight className="size-5 shrink-0 text-red dark:text-yellow" />
    </Link>
)

const FeatureCard = ({
    feature,
    team,
    teamSlug,
    active,
    isNew,
    isPopular,
    onClick,
}: {
    feature: EarlyAccessFeature
    team?: TeamInfo
    teamSlug?: string
    active: boolean
    isNew: boolean
    isPopular: boolean
    onClick: () => void
}): JSX.Element => {
    const crest = team?.miniCrest ? getImage(team.miniCrest) : undefined

    return (
        <button
            data-roadmap-item=""
            type="button"
            aria-haspopup="dialog"
            aria-expanded={active}
            onClick={onClick}
            className={`group flex w-full items-center gap-3 rounded-md border border-primary p-3 text-left hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red dark:focus-visible:ring-yellow ${
                active ? 'bg-accent' : 'bg-primary'
            }`}
        >
            <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold leading-snug text-primary">{feature.name}</span>
                <span className="mt-1 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-semibold text-secondary">
                        {team ? `${team.name} Team` : teamSlug ? `${teamSlug} Team` : 'Unassigned'}
                    </span>
                    <FeatureBadges isResearch={teamSlug === RESEARCH_TEAM_SLUG} isNew={isNew} isPopular={isPopular} />
                </span>
            </span>
            {crest && (
                <GatsbyImage
                    image={crest}
                    alt={`${team?.name ?? teamSlug} team mini crest`}
                    className="size-9 shrink-0"
                />
            )}
        </button>
    )
}

const RoadmapLane = ({
    definition,
    features,
    activeFlagKey,
    teamForFeature,
    teamInfoBySlug,
    isNew,
    isPopular,
    onFeatureClick,
    onPitchClick,
}: {
    definition: StageDefinition
    features: EarlyAccessFeature[]
    activeFlagKey?: string
    teamForFeature: (feature: EarlyAccessFeature) => string | undefined
    teamInfoBySlug: Record<string, TeamInfo>
    isNew: (feature: EarlyAccessFeature) => boolean
    isPopular: (feature: EarlyAccessFeature) => boolean
    onFeatureClick: (feature: EarlyAccessFeature) => void
    onPitchClick: () => void
}): JSX.Element => {
    const shouldReduceMotion = useReducedMotion()
    const layoutTransition = shouldReduceMotion
        ? { duration: 0 }
        : { type: 'tween' as const, duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }

    return (
        <section
            aria-labelledby={`roadmap-${definition.stage}-title`}
            className="flex h-min w-[min(340px,calc(100cqw-2rem))] shrink-0 snap-start flex-col self-start overflow-hidden rounded-lg border border-primary bg-accent @5xl:w-auto"
        >
            <header className="shrink-0 border-b border-primary bg-primary px-3 py-3">
                <div className="flex items-center gap-2">
                    <span
                        className={`inline-flex size-7 shrink-0 items-center justify-center rounded-md ${definition.styles.surface} ${definition.styles.text}`}
                    >
                        {definition.icon}
                    </span>
                    <h2 id={`roadmap-${definition.stage}-title`} className="m-0 text-lg text-primary">
                        {definition.title}
                    </h2>
                    <span
                        className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${definition.styles.border} ${definition.styles.surface} ${definition.styles.text}`}
                    >
                        {features.length}
                    </span>
                </div>
                <p className="mb-0 mt-1 text-xs text-secondary">{definition.description}</p>
            </header>
            <ul className="relative m-0 flex list-none flex-col gap-2 p-2">
                <AnimatePresence initial={false} mode="popLayout">
                    {features.map((feature) => {
                        const teamSlug = teamForFeature(feature)
                        return (
                            <motion.li
                                key={feature.flagKey}
                                layout={shouldReduceMotion ? false : 'position'}
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                                transition={layoutTransition}
                                className="m-0 list-none p-0"
                            >
                                <FeatureCard
                                    feature={feature}
                                    teamSlug={teamSlug}
                                    team={teamSlug ? teamInfoBySlug[teamSlug] : undefined}
                                    active={activeFlagKey === feature.flagKey}
                                    isNew={isNew(feature)}
                                    isPopular={isPopular(feature)}
                                    onClick={() => onFeatureClick(feature)}
                                />
                            </motion.li>
                        )
                    })}
                </AnimatePresence>
                {/* Ideas enter as concepts — keep the pitch CTA in that lane only so sparse
                    stages (alpha) don't get a tall empty well under a repeated card. */}
                {definition.stage === 'concept' && (
                    <motion.li
                        layout={shouldReduceMotion ? false : 'position'}
                        transition={{ layout: layoutTransition }}
                        className="m-0 list-none p-0"
                    >
                        <PitchIdeaCard onClick={onPitchClick} />
                    </motion.li>
                )}
                {/* Features graduate from beta by shipping — point onward to the changelog. */}
                {definition.stage === 'beta' && (
                    <motion.li
                        layout={shouldReduceMotion ? false : 'position'}
                        transition={{ layout: layoutTransition }}
                        className="m-0 list-none p-0"
                    >
                        <ChangelogCard />
                    </motion.li>
                )}
            </ul>
        </section>
    )
}

const TeamRoster = ({ people }: { people: TeamPerson[] }): JSX.Element | null => {
    if (people.length === 0) {
        return null
    }

    return (
        <div>
            <h3 className="mb-2 mt-0 text-sm">Team roster</h3>
            <div className="flex flex-wrap gap-2">
                {people.map((person) => {
                    const avatar = person.avatar ? (
                        <img
                            src={person.avatar}
                            alt={person.name}
                            className="size-10 rounded-full border border-primary bg-accent object-cover"
                        />
                    ) : (
                        <span
                            role="img"
                            aria-label={person.name}
                            className="flex size-10 items-center justify-center rounded-full border border-primary bg-accent"
                        >
                            <IconUser className="size-5 text-secondary" />
                        </span>
                    )
                    return (
                        <Tooltip
                            key={person.id ?? person.name}
                            delay={0}
                            trigger={
                                person.id ? (
                                    <Link
                                        to={`/community/profiles/${person.id}`}
                                        state={{ newWindow: true }}
                                        className="block rounded-full"
                                    >
                                        {avatar}
                                    </Link>
                                ) : (
                                    avatar
                                )
                            }
                        >
                            <span className="px-1 text-sm">
                                <strong>{person.name}</strong>
                                {person.role ? <span className="text-secondary"> - {person.role}</span> : null}
                            </span>
                        </Tooltip>
                    )
                })}
            </div>
        </div>
    )
}

const DrawerAction = ({ feature }: { feature: EarlyAccessFeature }): JSX.Element => {
    if (feature.stage === 'beta') {
        return (
            <EarlyAccessOptIn
                to={featurePreviewUrl(feature.flagKey)}
                state="request_access"
                label="Enable"
                size="md"
                width="full"
            />
        )
    }

    const surveyId = feature.payload?.survey_id as string | undefined
    const surveyQuestionId = feature.payload?.survey_question_id as string | undefined
    if (!surveyId) {
        return <p className="m-0 text-sm text-secondary">Signups are not open for this feature yet.</p>
    }

    const isAlpha = feature.stage === 'alpha'
    return (
        <SurveySignup
            surveyId={surveyId}
            surveyQuestionId={surveyQuestionId}
            flagKey={feature.stage === 'concept' ? feature.flagKey : undefined}
            productName={feature.name}
            buttonLabel={isAlpha ? 'Join the waitlist' : 'Notify me at launch'}
        />
    )
}

const FeaturePanel = ({
    feature,
    teamSlug,
    people,
    isNew,
    isPopular,
}: {
    feature: EarlyAccessFeature
    teamSlug?: string
    people: TeamPerson[]
    isNew: boolean
    isPopular: boolean
}): JSX.Element => (
    <div data-scheme="primary" className="flex h-full min-h-0 flex-col bg-primary">
        <header className="shrink-0 border-b border-primary px-4 py-4 pr-14">
            <div className="mb-2 flex flex-wrap items-center gap-2">
                <StageChip stage={feature.stage as BoardStage} />
                <FeatureBadges isResearch={teamSlug === RESEARCH_TEAM_SLUG} isNew={isNew} isPopular={isPopular} />
            </div>
            <FeatureTitle name={feature.name} flagKey={feature.flagKey} />
        </header>

        <ScrollArea className="min-h-0 flex-1">
            <div className="flex flex-col gap-6 p-4">
                {feature.description && (
                    <div>
                        <h3 className="mb-2 mt-0 text-sm">About this feature</h3>
                        <p className="m-0 whitespace-pre-line text-base text-secondary">{feature.description}</p>
                    </div>
                )}
                {feature.documentationUrl && (
                    <div>
                        <OSButton asLink to={feature.documentationUrl} external size="md" variant="secondary">
                            Read the documentation
                        </OSButton>
                    </div>
                )}
                {teamSlug && (
                    <div>
                        <h3 className="mb-2 mt-0 text-sm">Built by</h3>
                        <SmallTeam slug={teamSlug} />
                    </div>
                )}
                <TeamRoster people={people} />
            </div>
        </ScrollArea>

        <footer className="shrink-0 border-t border-primary bg-primary p-4">
            <DrawerAction feature={feature} />
        </footer>
    </div>
)

const bySignupAvailability = (a: EarlyAccessFeature, b: EarlyAccessFeature): number =>
    Number(!!b.payload?.survey_id) - Number(!!a.payload?.survey_id)

export default function EarlyAccessFeaturesSection(): JSX.Element | null {
    const roadmapRootRef = useRef<HTMLDivElement>(null)
    const location = useLocation()
    const { grouped, loading, teamForFeature } = useRoadmapEarlyAccessFeatures()
    const [query, setQuery] = useState('')
    const [teamFilter, setTeamFilter] = useState('all')
    const [pitchOpen, setPitchOpen] = useState(false)
    const [selectedFlagKey, setSelectedFlagKey] = useState<string>()
    const [mounted, setMounted] = useState(false)
    const [overlayContainer, setOverlayContainer] = useState<HTMLElement | null>(null)

    useEffect(() => setMounted(true), [])

    const { allSqueakTeam } = useStaticQuery<{ allSqueakTeam: { nodes: SqueakTeamNode[] } }>(graphql`
        {
            allSqueakTeam {
                nodes {
                    slug
                    name
                    miniCrest {
                        gatsbyImageData(width: 40, height: 40)
                    }
                    profiles {
                        data {
                            id
                            attributes {
                                firstName
                                lastName
                                companyRole
                                avatar {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `)

    const { teamInfoBySlug, peopleByTeamSlug } = useMemo(() => {
        const teams: Record<string, TeamInfo> = {}
        const people: Record<string, TeamPerson[]> = {}
        allSqueakTeam.nodes.forEach((node) => {
            teams[node.slug] = { name: node.name, miniCrest: node.miniCrest }
            people[node.slug] = (node.profiles?.data || []).map((profile) => ({
                id: profile.id ? String(profile.id) : undefined,
                name: [profile.attributes?.firstName, profile.attributes?.lastName].filter(Boolean).join(' '),
                role: profile.attributes?.companyRole || undefined,
                avatar: profile.attributes?.avatar?.data?.attributes?.url || undefined,
            }))
        })
        return { teamInfoBySlug: teams, peopleByTeamSlug: people }
    }, [allSqueakTeam])

    const allFeatures = useMemo(() => [...grouped.comingSoon, ...grouped.beta], [grouped.beta, grouped.comingSoon])
    const total = allFeatures.length

    useEffect(() => {
        if (!roadmapRootRef.current) {
            return
        }
        setOverlayContainer(
            roadmapRootRef.current.closest<HTMLElement>('[data-app="Editor"]') ?? roadmapRootRef.current
        )
    }, [total])

    const teamOptions = useMemo(() => {
        const counts: Record<string, number> = {}
        let unassigned = 0
        allFeatures.forEach((feature) => {
            const slug = teamForFeature(feature)
            if (slug) {
                counts[slug] = (counts[slug] || 0) + 1
            } else {
                unassigned += 1
            }
        })
        const teams = Object.entries(counts)
            .map(([slug, count]) => ({
                value: slug,
                label: `${teamInfoBySlug[slug]?.name || slug} (${count})`,
            }))
            .sort((a, b) => a.label.localeCompare(b.label))
        const options = [{ value: 'all', label: 'All teams' }, ...teams]
        if (unassigned) {
            options.push({ value: 'unassigned', label: `Unassigned (${unassigned})` })
        }
        return options
    }, [allFeatures, teamForFeature, teamInfoBySlug])

    const requestedFlagKey = useMemo(
        () => new URLSearchParams(location.search).get('feature') || undefined,
        [location.search]
    )
    // Let other pages deep-link the board to a single team, e.g. /roadmap?team=ai-research.
    const requestedTeam = useMemo(
        () => new URLSearchParams(location.search).get('team') || undefined,
        [location.search]
    )
    useEffect(() => {
        if (requestedTeam) {
            setTeamFilter(requestedTeam)
        }
    }, [requestedTeam])
    const requestedFeature = requestedFlagKey
        ? allFeatures.find((feature) => feature.flagKey === requestedFlagKey)
        : undefined
    const activeFlagKey = selectedFlagKey ?? requestedFlagKey
    const activeFeature = activeFlagKey ? allFeatures.find((feature) => feature.flagKey === activeFlagKey) : undefined
    const drawerOpen = pitchOpen || !!activeFeature

    useEffect(() => {
        if (selectedFlagKey && requestedFlagKey === selectedFlagKey) {
            setSelectedFlagKey(undefined)
        }
    }, [requestedFlagKey, selectedFlagKey])

    useEffect(() => {
        if (requestedFlagKey || !location.hash || loading) {
            return
        }
        let legacyFlagKey = location.hash.slice(1)
        try {
            legacyFlagKey = decodeURIComponent(legacyFlagKey)
        } catch {
            return
        }
        if (allFeatures.some((feature) => feature.flagKey === legacyFlagKey)) {
            navigate(roadmapUrl(location.search, legacyFlagKey), { replace: true })
        }
    }, [allFeatures, loading, location.hash, location.search, requestedFlagKey])

    useEffect(() => {
        if (!loading && requestedFlagKey && !requestedFeature) {
            navigate(roadmapUrl(location.search), { replace: true })
        }
    }, [loading, location.search, requestedFeature, requestedFlagKey])

    useEffect(() => {
        if (!overlayContainer || !drawerOpen) {
            return
        }

        const closeOnNonItemClick = (event: MouseEvent) => {
            const target = event.target
            if (!(target instanceof Element) || target.closest('[data-roadmap-item], [data-roadmap-drawer]')) {
                return
            }
            setPitchOpen(false)
            setSelectedFlagKey(undefined)
            navigate(roadmapUrl(location.search), { replace: true })
        }

        overlayContainer.addEventListener('click', closeOnNonItemClick)
        return () => overlayContainer.removeEventListener('click', closeOnNonItemClick)
    }, [drawerOpen, location.search, overlayContainer])

    const popularFlagKeys = useMemo(() => {
        const ranked = [...allFeatures]
            .filter((feature) => typeof feature.waitlistCount === 'number' && feature.waitlistCount > 0)
            .sort((a, b) => (b.waitlistCount ?? 0) - (a.waitlistCount ?? 0))
            .slice(0, POPULAR_TOP_N)
        return new Set(ranked.map((feature) => feature.flagKey))
    }, [allFeatures])

    if (loading && total === 0) {
        return <p className="m-0 text-sm text-muted">Loading what's new…</p>
    }
    if (total === 0) {
        return null
    }

    const now = Date.now()
    const isNew = (feature: EarlyAccessFeature): boolean =>
        mounted && typeof feature.createdAt === 'number' && now - feature.createdAt < NEW_WINDOW_MS
    const isPopular = (feature: EarlyAccessFeature): boolean => popularFlagKeys.has(feature.flagKey)
    const isResearch = (feature: EarlyAccessFeature): boolean => teamForFeature(feature) === RESEARCH_TEAM_SLUG
    const matchesSearch = (feature: EarlyAccessFeature): boolean => {
        const value = query.trim().toLowerCase()
        if (!value) {
            return true
        }
        const teamSlug = teamForFeature(feature)
        const teamName = teamSlug ? teamInfoBySlug[teamSlug]?.name || teamSlug : 'unassigned'
        return [feature.name, feature.description, feature.flagKey, teamName].some((field) =>
            (field || '').toLowerCase().includes(value)
        )
    }
    const matchesTeam = (feature: EarlyAccessFeature): boolean => {
        if (teamFilter === 'all') {
            return true
        }
        const teamSlug = teamForFeature(feature)
        return teamFilter === 'unassigned' ? !teamSlug : teamSlug === teamFilter
    }
    // Research Previews lead the Concept lane; elsewhere the existing New/signup ordering holds.
    const sortFeatures = (features: EarlyAccessFeature[]): EarlyAccessFeature[] =>
        [...features].sort(
            (a, b) =>
                (a.stage === 'concept' ? Number(isResearch(b)) - Number(isResearch(a)) : 0) ||
                Number(isNew(b)) - Number(isNew(a)) ||
                (a.stage === 'beta' ? 0 : bySignupAvailability(a, b))
        )

    const filteredByStage = STAGES.reduce<Record<BoardStage, EarlyAccessFeature[]>>(
        (result, { stage }) => {
            result[stage] = sortFeatures(
                allFeatures.filter(
                    (feature) => feature.stage === stage && matchesSearch(feature) && matchesTeam(feature)
                )
            )
            return result
        },
        { concept: [], alpha: [], beta: [] }
    )

    const filteredTotal = STAGES.reduce((count, { stage }) => count + filteredByStage[stage].length, 0)
    const openFeature = (feature: EarlyAccessFeature) => {
        setSelectedFlagKey(feature.flagKey)
        setPitchOpen(false)
        navigate(roadmapUrl(location.search, feature.flagKey), { replace: true })
    }
    const openPitch = () => {
        setPitchOpen(true)
        setSelectedFlagKey(undefined)
        navigate(roadmapUrl(location.search), { replace: true })
    }
    const closeDrawer = () => {
        setPitchOpen(false)
        setSelectedFlagKey(undefined)
        navigate(roadmapUrl(location.search), { replace: true })
    }
    const activeTeamSlug = activeFeature ? teamForFeature(activeFeature) : undefined
    const drawerTitle = pitchOpen ? 'Pitch a roadmap idea' : activeFeature?.name ?? 'Roadmap feature'

    return (
        <div ref={roadmapRootRef} className="relative flex min-w-0 flex-col gap-3">
            <div className="shrink-0 rounded-lg border border-primary bg-primary px-3 py-2.5" data-scheme="primary">
                <div className="flex flex-col gap-2 @3xl:flex-row @3xl:items-center">
                    <Input
                        label="Search roadmap"
                        showLabel={false}
                        size="md"
                        type="search"
                        placeholder="Search features, teams, or flag keys…"
                        value={query}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                        showClearButton
                        onClear={() => setQuery('')}
                        className="!h-10 !rounded-[8px]"
                        containerClassName="w-full min-w-0 @3xl:max-w-md @3xl:shrink-0"
                    />
                    <div className="min-w-0 w-full @3xl:w-auto @3xl:max-w-xs @3xl:shrink [&>div]:w-full">
                        <Select
                            ariaLabel="Filter roadmap by team"
                            placeholder="All teams"
                            value={teamFilter}
                            onValueChange={setTeamFilter}
                            groups={[{ label: 'Team', items: teamOptions }]}
                            className="!h-10 w-full max-w-full overflow-hidden !rounded-[8px] px-3 [&>span]:min-w-0 [&>span]:truncate"
                        />
                    </div>
                    <span className="ml-auto shrink-0 whitespace-nowrap text-sm text-secondary">
                        {filteredTotal} of {total} features
                    </span>
                </div>
            </div>

            <div className="app-scroll-viewport min-w-0 overflow-x-auto">
                <div className="flex min-w-max snap-x snap-mandatory items-start gap-3 pr-2 @5xl:grid @5xl:min-w-full @5xl:snap-none @5xl:grid-cols-3 @5xl:items-start @5xl:pr-0">
                    {STAGES.map((definition) => (
                        <RoadmapLane
                            key={definition.stage}
                            definition={definition}
                            features={filteredByStage[definition.stage]}
                            activeFlagKey={activeFeature?.flagKey}
                            teamForFeature={teamForFeature}
                            teamInfoBySlug={teamInfoBySlug}
                            isNew={isNew}
                            isPopular={isPopular}
                            onFeatureClick={openFeature}
                            onPitchClick={openPitch}
                        />
                    ))}
                </div>
            </div>

            <RoadmapOverlayPanel
                isOpen={drawerOpen}
                onClose={closeDrawer}
                title={drawerTitle}
                portalContainer={overlayContainer}
            >
                {pitchOpen ? (
                    <PitchIdeaPanel />
                ) : activeFeature ? (
                    <FeaturePanel
                        feature={activeFeature}
                        teamSlug={activeTeamSlug}
                        people={activeTeamSlug ? peopleByTeamSlug[activeTeamSlug] || [] : []}
                        isNew={isNew(activeFeature)}
                        isPopular={isPopular(activeFeature)}
                    />
                ) : null}
            </RoadmapOverlayPanel>
        </div>
    )
}
