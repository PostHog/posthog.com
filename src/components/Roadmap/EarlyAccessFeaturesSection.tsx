import React, { useEffect, useMemo, useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { IconRocket, IconFlask, IconLightBulb, IconX, IconCopy, IconCheck, IconTrending } from '@posthog/icons'
import Link from 'components/Link'
import Input from 'components/OSForm/input'
import OSButton from 'components/OSButton'
import { Select } from 'components/RadixUI/Select'
import Tooltip from 'components/RadixUI/Tooltip'
import EarlyAccessOptIn from 'components/EarlyAccessOptIn'
import SmallTeam from 'components/SmallTeam'
import SurveySignup from 'components/SurveySignup'
import usePostHog from 'hooks/usePostHog'
import { useFeatureOwnership } from 'hooks/useFeatureOwnership'
import useEarlyAccessFeatures, { EarlyAccessFeature } from 'hooks/useEarlyAccessFeatures'
import { ROADMAP_TEAM_OVERRIDES } from './roadmapTeamOverrides'

// The in-app feature previews page supports deep links: /settings/user-feature-previews#<flagKey>
// scrolls to (and highlights) that feature's toggle, so each beta card links straight to it.
const featurePreviewUrl = (flagKey: string): string =>
    `https://us.posthog.com/settings/user-feature-previews#${flagKey}`

// Only surface the search + filter controls once the list is long enough to need them.
const CONTROLS_THRESHOLD = 8

// Frosted in-window surfaces, matching the site redesign (see src/constants/frostedSurfaces.ts
// for the window chrome equivalents and the pricing cards for this in-window idiom). Solid
// fallback when the user has reduce-transparency on.
const FROSTED_CARD =
    'bg-primary/80 backdrop-blur-sm shadow-sm reduce-transparency:!bg-primary reduce-transparency:backdrop-blur-none'
const FROSTED_TOOLBAR =
    'bg-primary/80 backdrop-blur-md shadow-sm reduce-transparency:!bg-primary reduce-transparency:backdrop-blur-none'

// Features created within this window are flagged "New", glow, and lead their section.
const NEW_WINDOW_MS = 40 * 24 * 60 * 60 * 1000
// How many of the most-signed-up features get the "Popular" chip.
const POPULAR_TOP_N = 10

// The "Roadmap concept pitches" survey (project 2) behind the pitch-a-concept card.
const PITCH_SURVEY_ID = '019f8008-6dfe-0000-696a-515c59643b03'
const PITCH_QUESTION_ID = 'd257defb-d875-42fd-8cb6-80845c2bb26f'
const PITCH_EMAIL_QUESTION_ID = '794db2f2-7ed4-4cf2-a8a3-d27df1b85530'

type StageFilter = 'all' | 'beta' | 'alpha' | 'concept'
type SortKey = 'featured' | 'newest' | 'az' | 'team'

const STAGE_FILTER_LABELS: Record<Exclude<StageFilter, 'all'>, string> = {
    beta: 'In beta',
    alpha: 'In alpha',
    concept: 'Concepts',
}

// Emphasised chip for recently added features.
const NewChip = (): JSX.Element => (
    <span className="shrink-0 bg-accent border border-primary rounded-full px-2 py-0.5 text-xs font-semibold text-red dark:text-yellow">
        New
    </span>
)

// Chip for the top-N features by waitlist signups.
const PopularChip = (): JSX.Element => (
    <span className="shrink-0 inline-flex items-center gap-0.5 bg-accent border border-primary rounded-full px-2 py-0.5 text-xs font-semibold text-red dark:text-yellow">
        <IconTrending className="size-3" />
        Popular
    </span>
)

// Discrete copy-link button — cards are addressable at /roadmap#flag-key, so every card is a
// shareable artifact. Hidden until the card is hovered; flips to a check on copy.
const CopyLinkButton = ({ flagKey }: { flagKey: string }): JSX.Element => {
    const [copied, setCopied] = useState(false)
    const copy = () => {
        const url = `${window.location.origin}/roadmap#${flagKey}`
        navigator.clipboard?.writeText(url).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }
    return (
        <button
            type="button"
            onClick={copy}
            aria-label={copied ? 'Link copied' : 'Copy link to this feature'}
            className="shrink-0 text-muted hover:text-primary opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
        >
            {copied ? <IconCheck className="size-4 text-green" /> : <IconCopy className="size-4" />}
        </button>
    )
}

type TeamPerson = { name: string; role?: string; avatar?: string }

// The humans behind the card — overlapping avatars for the owning team's members.
const TeamFaces = ({ people }: { people: TeamPerson[] }): JSX.Element | null => {
    const withAvatars = people.filter((p) => p.avatar)
    if (withAvatars.length === 0) {
        return null
    }
    const shown = withAvatars.slice(0, 4)
    const extra = withAvatars.length - shown.length
    return (
        <span className="inline-flex items-center">
            {shown.map((person, index) => (
                <Tooltip
                    key={person.name}
                    delay={0}
                    trigger={
                        <img
                            src={person.avatar}
                            alt={person.name}
                            className={`size-6 rounded-full border border-primary bg-accent object-cover ${
                                index > 0 ? '-ml-1.5' : ''
                            }`}
                        />
                    }
                >
                    <span className="text-sm px-1">
                        <strong>{person.name}</strong>
                        {person.role ? <span className="text-secondary"> – {person.role}</span> : null}
                    </span>
                </Tooltip>
            ))}
            {extra > 0 && (
                <span className="-ml-1.5 size-6 rounded-full border border-primary bg-accent text-[10px] font-semibold text-secondary inline-flex items-center justify-center">
                    +{extra}
                </span>
            )}
        </span>
    )
}

// A removable pill summarising one active filter, so the current view is visible and resettable.
const FilterChip = ({ label, onRemove }: { label: string; onRemove: () => void }): JSX.Element => (
    <span className="inline-flex items-center gap-1 bg-accent border border-primary rounded-full pl-2 pr-1 py-0.5 text-xs font-semibold text-secondary">
        {label}
        <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${label} filter`}
            className="inline-flex items-center hover:text-primary"
        >
            <IconX className="size-3" />
        </button>
    </span>
)

const slugify = (text: string): string =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

// Feature descriptions come from the app and can run long. Clamp to two lines and only
// offer "Show more" when the text actually overflows — re-measured on resize, since cards
// live in a resizable window.
const ClampedDescription = ({ text }: { text: string }): JSX.Element => {
    const [expanded, setExpanded] = useState(false)
    const [isClamped, setIsClamped] = useState(false)
    const ref = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) {
            return
        }
        const measure = () => setIsClamped(el.scrollHeight > el.clientHeight + 1)
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(el)
        return () => observer.disconnect()
    }, [text])

    return (
        <>
            <p ref={ref} className={`text-sm text-secondary m-0 whitespace-pre-line ${expanded ? '' : 'line-clamp-2'}`}>
                {text}
            </p>
            {(isClamped || expanded) && (
                <div>
                    <OSButton size="sm" variant="underlineOnHover" onClick={() => setExpanded(!expanded)}>
                        {expanded ? 'Show less' : 'Show more'}
                    </OSButton>
                </div>
            )}
        </>
    )
}

const FeatureCard = ({
    feature,
    teamSlug,
    badge,
    people,
    effectClassName = '',
    children,
}: {
    feature: EarlyAccessFeature
    teamSlug?: string
    badge?: React.ReactNode
    people?: TeamPerson[]
    effectClassName?: string
    children?: React.ReactNode
}): JSX.Element => (
    <div
        data-scheme="secondary"
        id={feature.flagKey}
        className={`group @container ${FROSTED_CARD} border border-primary rounded-lg p-3 flex flex-col gap-1.5 h-full scroll-mt-24 transition-all hover:border-secondary target:border-red dark:target:border-yellow ${effectClassName}`}
    >
        {/* The owning team's crest and members anchor the card visually. */}
        {(teamSlug || people?.length) && (
            <div className="mb-0.5 flex items-center justify-between gap-2">
                {teamSlug ? <SmallTeam slug={teamSlug} /> : <span />}
                {people && <TeamFaces people={people} />}
            </div>
        )}
        <div className="flex items-start gap-2">
            <h3 className="text-base @md:text-lg m-0 leading-tight flex-1">{feature.name}</h3>
            {badge}
            <CopyLinkButton flagKey={feature.flagKey} />
        </div>
        {feature.description && <ClampedDescription text={feature.description} />}
        {feature.documentationUrl && (
            <div>
                <OSButton asLink to={feature.documentationUrl} external size="sm" variant="underlineOnHover">
                    Read the docs
                </OSButton>
            </div>
        )}
        {children && <div className="mt-auto pt-1">{children}</div>}
    </div>
)

// Beta — live now. Link straight to this feature's toggle in the app (identities aren't
// shared between posthog.com and the app, so enrollment has to happen there).
const BetaCard = ({
    feature,
    teamSlug,
    badge,
    people,
    effectClassName,
}: {
    feature: EarlyAccessFeature
    teamSlug?: string
    badge?: React.ReactNode
    people?: TeamPerson[]
    effectClassName?: string
}): JSX.Element => (
    <FeatureCard feature={feature} teamSlug={teamSlug} badge={badge} people={people} effectClassName={effectClassName}>
        <EarlyAccessOptIn
            to={featurePreviewUrl(feature.flagKey)}
            state="request_access"
            label="Enable in PostHog"
            size="sm"
        />
    </FeatureCard>
)

// Coming soon — collect an email via the feature's linked waitlist survey. Reveal the
// field only on intent so the grid stays compact.
const ComingSoonCard = ({
    feature,
    teamSlug,
    badge,
    people,
    effectClassName,
}: {
    feature: EarlyAccessFeature
    teamSlug?: string
    badge?: React.ReactNode
    people?: TeamPerson[]
    effectClassName?: string
}): JSX.Element => {
    const [showForm, setShowForm] = useState(false)
    const surveyId = feature.payload?.survey_id as string | undefined
    const surveyQuestionId = feature.payload?.survey_question_id as string | undefined

    // Without a linked survey there's nowhere to record the sign-up, so show info only.
    if (!surveyId) {
        return (
            <FeatureCard
                feature={feature}
                teamSlug={teamSlug}
                badge={badge}
                people={people}
                effectClassName={effectClassName}
            />
        )
    }

    // Alphas are about getting into testing, concepts about hearing when it ships — the CTA
    // copy follows suit. Both record to the feature's linked waitlist survey either way.
    const isAlpha = feature.stage === 'alpha'
    return (
        <FeatureCard
            feature={feature}
            teamSlug={teamSlug}
            badge={badge}
            people={people}
            effectClassName={effectClassName}
        >
            {showForm ? (
                <SurveySignup
                    surveyId={surveyId}
                    surveyQuestionId={surveyQuestionId}
                    // Only concept-stage joins fire the $feature_enrollment_update event —
                    // alpha waitlists aren't concept enrollments.
                    flagKey={feature.stage === 'concept' ? feature.flagKey : undefined}
                    productName={feature.name}
                    autoFocus
                    buttonLabel={isAlpha ? 'Join the waitlist' : 'Notify me at launch'}
                />
            ) : (
                <OSButton variant="secondary" size="md" width="full" onClick={() => setShowForm(true)}>
                    {isAlpha ? 'Join the waitlist' : 'Get notified at launch'}
                </OSButton>
            )}
        </FeatureCard>
    )
}

// The intake card at the end of the Concept grid — the roadmap collects ideas, it doesn't
// just broadcast them. Pitches land as responses on the "Roadmap concept pitches" survey.
const PitchConceptCard = (): JSX.Element => {
    const posthog = usePostHog()
    const [open, setOpen] = useState(false)
    const [idea, setIdea] = useState('')
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
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

    if (submitted) {
        return (
            <div
                data-scheme="secondary"
                className={`@container ${FROSTED_CARD} border border-green rounded-lg p-3 flex flex-col justify-center gap-1 h-full`}
            >
                <p className="m-0 font-bold flex items-center gap-1">
                    <IconCheck className="size-5 text-green shrink-0" /> Pitch received
                </p>
                <p className="m-0 text-sm text-secondary">
                    The team reads every one. If it's good, you'll see it on this page.
                </p>
            </div>
        )
    }

    if (!open) {
        return (
            <button
                type="button"
                onClick={() => setOpen(true)}
                className={`@container ${FROSTED_CARD} border border-dashed border-primary rounded-lg p-3 flex flex-col items-start justify-center gap-1 h-full min-h-32 text-left transition-colors hover:border-secondary cursor-pointer`}
            >
                <span className="text-base @md:text-lg font-bold leading-tight">What should we build? →</span>
                <span className="text-sm text-secondary">Pitch us a concept. The best ideas end up on this page.</span>
            </button>
        )
    }

    return (
        <form
            onSubmit={submit}
            data-scheme="secondary"
            className={`@container ${FROSTED_CARD} border border-primary rounded-lg p-3 flex flex-col gap-2 h-full`}
        >
            <h3 className="text-base @md:text-lg m-0 leading-tight">What should we build?</h3>
            <textarea
                autoFocus
                required
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Pitch your idea…"
                rows={3}
                className="w-full rounded border border-input bg-primary p-2 text-sm text-primary placeholder:text-muted focus:border-input-hover focus:outline-none resize-y"
            />
            <Input
                label="Email (optional)"
                showLabel={false}
                size="md"
                type="email"
                placeholder="Email (optional)"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <div className="mt-auto pt-1">
                <OSButton type="submit" variant="primary" size="md" width="full">
                    Pitch it
                </OSButton>
            </div>
        </form>
    )
}

const Grid = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 @7xl:grid-cols-4 gap-3">{children}</div>
)

const SectionHeader = ({
    icon,
    title,
    count,
    description,
}: {
    icon: React.ReactNode
    title: string
    count: number
    description: string
}): JSX.Element => (
    <>
        <div className="flex items-center gap-2">
            {icon}
            <h2 className="m-0">{title}</h2>
            <span className="bg-accent border border-primary rounded-full px-2 py-0.5 text-xs font-semibold text-secondary">
                {count}
            </span>
        </div>
        <p className="text-secondary mt-1 mb-4 text-sm">{description}</p>
    </>
)

// Joinable items (with a linked survey) surface first so the actionable cards lead.
const bySignupAvailability = (a: EarlyAccessFeature, b: EarlyAccessFeature): number =>
    Number(!!b.payload?.survey_id) - Number(!!a.payload?.survey_id)

/**
 * The roadmap's Early Access Feature sections. Data is sourced at build time (SEO-friendly,
 * renders instantly) and revalidated client-side via posthog-js — see useEarlyAccessFeatures.
 *  - Beta — live now; each card deep-links to its toggle in the app's feature previews.
 *  - Alpha — in closed testing; collect an email via each feature's linked waitlist survey.
 *  - Concept — coming soon; same waitlist mechanic as alpha.
 * Cards show the owning small team crest (via the feature-ownership map) when we can match one,
 * flag recently added features ("New"), are addressable (/roadmap#flag-key), and highlight when
 * targeted. Search + stage + team filters and a sort control (with a sticky bar) keep a long list
 * scannable. Renders nothing when empty.
 */
export default function EarlyAccessFeaturesSection(): JSX.Element | null {
    const { grouped, loading } = useEarlyAccessFeatures()
    const { features: ownedFeatures } = useFeatureOwnership()
    const [query, setQuery] = useState('')
    const [stageFilter, setStageFilter] = useState<StageFilter>('all')
    const [teamFilter, setTeamFilter] = useState<string>('all')
    const [sortBy, setSortBy] = useState<SortKey>('featured')

    // "New" badges compare against the current time, so only render them after mount to avoid a
    // hydration mismatch with the build-time HTML (the createdAt itself is stable, so sort is safe).
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    // Small-team display names and members, keyed by slug (mirrors SmallTeam's query) — used
    // for the team filter labels and the per-card member avatars. Build-time / SSR-safe.
    const { allSqueakTeam } = useStaticQuery(graphql`
        {
            allSqueakTeam {
                nodes {
                    slug
                    name
                    profiles {
                        data {
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
    const { teamNameBySlug, peopleByTeamSlug } = useMemo(() => {
        const names: Record<string, string> = {}
        const people: Record<string, TeamPerson[]> = {}
        allSqueakTeam.nodes.forEach((node: any) => {
            names[node.slug] = node.name
            people[node.slug] = (node.profiles?.data || []).map((profile: any) => ({
                name: [profile.attributes?.firstName, profile.attributes?.lastName].filter(Boolean).join(' '),
                role: profile.attributes?.companyRole || undefined,
                avatar: profile.attributes?.avatar?.data?.attributes?.url || undefined,
            }))
        })
        return { teamNameBySlug: names, peopleByTeamSlug: people }
    }, [allSqueakTeam])

    // Owning team per feature slug, from the hand-maintained feature-ownership map. We match
    // by flag key first, then by slugified feature name — unmatched features just omit the badge.
    const teamByFeatureSlug = useMemo(() => {
        const map: Record<string, string> = {}
        ownedFeatures.forEach((f) => {
            if (f.owner?.[0]) {
                map[f.slug] = f.owner[0]
            }
        })
        return map
    }, [ownedFeatures])
    // Roadmap-specific overrides win (curated per flag key), then the shared ownership map.
    const teamForFeature = (feature: EarlyAccessFeature): string | undefined =>
        ROADMAP_TEAM_OVERRIDES[feature.flagKey] ||
        teamByFeatureSlug[feature.flagKey] ||
        teamByFeatureSlug[slugify(feature.name)]

    const totalBeta = grouped.beta.length
    const totalAlpha = grouped.comingSoon.filter((f) => f.stage === 'alpha').length
    const totalConcept = grouped.comingSoon.filter((f) => f.stage === 'concept').length
    const total = totalBeta + totalAlpha + totalConcept
    const hasFeatures = total > 0

    // Team filter options: every owning team present in the data (with counts), plus "All teams"
    // and an "Unassigned" bucket so ownership-unmatched features stay filterable, not hidden.
    const teamOptions = useMemo(() => {
        const counts: Record<string, number> = {}
        let unassigned = 0
        ;[...grouped.beta, ...grouped.comingSoon].forEach((feature) => {
            const slug =
                ROADMAP_TEAM_OVERRIDES[feature.flagKey] ||
                teamByFeatureSlug[feature.flagKey] ||
                teamByFeatureSlug[slugify(feature.name)]
            if (slug) {
                counts[slug] = (counts[slug] || 0) + 1
            } else {
                unassigned += 1
            }
        })
        const teamItems = Object.entries(counts)
            .map(([slug, count]) => ({ value: slug, label: `${teamNameBySlug[slug] || slug} (${count})` }))
            .sort((a, b) => a.label.localeCompare(b.label))
        const items = [{ value: 'all', label: `All teams (${total})` }, ...teamItems]
        if (unassigned > 0) {
            items.push({ value: 'unassigned', label: `Unassigned (${unassigned})` })
        }
        return items
    }, [grouped, teamByFeatureSlug, teamNameBySlug, total])

    // A deep-linked card (/roadmap#flag-key) could be filtered out by an active search/stage/team
    // filter, so clear filters on mount when a hash is present to guarantee the target is visible.
    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.hash) {
            setQuery('')
            setStageFilter('all')
            setTeamFilter('all')
        }
    }, [])

    // Then scroll the deep-linked card into view once cards exist and filters have settled — the
    // browser's native anchor jump fires before this list finishes rendering.
    useEffect(() => {
        if (!hasFeatures || typeof window === 'undefined' || !window.location.hash) {
            return
        }
        document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: 'center' })
    }, [hasFeatures, query, stageFilter, teamFilter])

    if (loading && total === 0) {
        return <p className="text-muted text-sm">Loading what's new…</p>
    }
    if (total === 0) {
        return null
    }

    const q = query.trim().toLowerCase()
    const matchesSearch = (f: EarlyAccessFeature) =>
        !q || f.name.toLowerCase().includes(q) || (f.description || '').toLowerCase().includes(q)
    const matchesTeam = (f: EarlyAccessFeature) => {
        if (teamFilter === 'all') {
            return true
        }
        const slug = teamForFeature(f)
        return teamFilter === 'unassigned' ? !slug : slug === teamFilter
    }
    const matches = (f: EarlyAccessFeature) => matchesSearch(f) && matchesTeam(f)

    // Recently created features get a "New" chip and glow, and lead their section under the
    // default sort (mounted-gated: newness compares against the current time, which would
    // mismatch the build-time HTML during hydration).
    const now = Date.now()
    const isNew = (f: EarlyAccessFeature): boolean =>
        mounted && typeof f.createdAt === 'number' && now - f.createdAt < NEW_WINDOW_MS

    // Unassigned features sort last under "By team" (￿ sorts after any real name).
    const teamLabelFor = (f: EarlyAccessFeature): string => teamNameBySlug[teamForFeature(f) ?? ''] ?? '￿'
    const sortFeatures = (list: EarlyAccessFeature[], hasWaitlists: boolean): EarlyAccessFeature[] => {
        const arr = [...list]
        switch (sortBy) {
            case 'az':
                return arr.sort((a, b) => a.name.localeCompare(b.name))
            case 'team':
                return arr.sort(
                    (a, b) => teamLabelFor(a).localeCompare(teamLabelFor(b)) || a.name.localeCompare(b.name)
                )
            case 'newest':
                return arr.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
            default:
                // "Featured": New items lead their section, then waitlist sections surface
                // joinable items; beta otherwise keeps its natural order.
                return arr.sort(
                    (a, b) => Number(isNew(b)) - Number(isNew(a)) || (hasWaitlists ? bySignupAvailability(a, b) : 0)
                )
        }
    }
    const beta = sortFeatures(grouped.beta.filter(matches), false)
    const alpha = sortFeatures(grouped.comingSoon.filter((f) => f.stage === 'alpha').filter(matches), true)
    const concept = sortFeatures(grouped.comingSoon.filter((f) => f.stage === 'concept').filter(matches), true)

    // Top-N features by waitlist signups get a "Popular" chip. Counts are aggregated at build
    // time (gatsby/sourceNodes.ts); with no counts available the set is empty and nothing shows.
    const popularFlagKeys = useMemo(() => {
        const ranked = [...grouped.beta, ...grouped.comingSoon]
            .filter((f) => typeof f.waitlistCount === 'number' && f.waitlistCount > 0)
            .sort((a, b) => (b.waitlistCount ?? 0) - (a.waitlistCount ?? 0))
            .slice(0, POPULAR_TOP_N)
        return new Set(ranked.map((f) => f.flagKey))
    }, [grouped])
    const isPopular = (f: EarlyAccessFeature): boolean => popularFlagKeys.has(f.flagKey)

    const badgeFor = (f: EarlyAccessFeature): React.ReactNode => (
        <>
            {isNew(f) && <NewChip />}
            {isPopular(f) && <PopularChip />}
        </>
    )
    // New = a soft glow; Popular = a firmer ring. New wins over Popular so freshly added
    // crowd-pleasers don't stack two rings.
    const effectFor = (f: EarlyAccessFeature): string =>
        isNew(f)
            ? 'ring-1 ring-red/40 dark:ring-yellow/40'
            : isPopular(f)
            ? 'ring-1 ring-red/25 dark:ring-yellow/25'
            : ''
    const peopleFor = (f: EarlyAccessFeature): TeamPerson[] | undefined => {
        const slug = teamForFeature(f)
        return slug ? peopleByTeamSlug[slug] : undefined
    }

    const anyDated = grouped.beta.some((f) => f.createdAt) || grouped.comingSoon.some((f) => f.createdAt)
    const sortItems = [
        { value: 'featured', label: 'Featured' },
        ...(anyDated ? [{ value: 'newest', label: 'Newest' }] : []),
        { value: 'az', label: 'A–Z' },
        { value: 'team', label: 'By team' },
    ]

    const teamFilterLabel = teamFilter === 'unassigned' ? 'Unassigned' : teamNameBySlug[teamFilter] || teamFilter
    const hasActiveFilters = query.trim() !== '' || stageFilter !== 'all' || teamFilter !== 'all'
    const clearAllFilters = () => {
        setQuery('')
        setStageFilter('all')
        setTeamFilter('all')
    }

    const showBeta = (stageFilter === 'all' || stageFilter === 'beta') && beta.length > 0
    const showAlpha = (stageFilter === 'all' || stageFilter === 'alpha') && alpha.length > 0
    const showConcept = (stageFilter === 'all' || stageFilter === 'concept') && concept.length > 0
    const shownCount =
        (showBeta ? beta.length : 0) + (showAlpha ? alpha.length : 0) + (showConcept ? concept.length : 0)
    const showControls = total > CONTROLS_THRESHOLD

    return (
        <div className="@container">
            {/* Stage ladder so visitors understand the concept → alpha → beta progression. */}
            <p className="text-secondary text-sm mt-0 mb-4">
                Every feature climbs the same ladder: concepts are ideas we've committed to, alphas are being tested
                with closed groups, and betas are ready for anyone to try. When something ships for real, it lands in
                the{' '}
                <Link to="/changelog" state={{ newWindow: true }} className="underline">
                    changelog
                </Link>
                .
            </p>

            {showControls && (
                <div
                    className={`sticky top-2 z-20 ${FROSTED_TOOLBAR} border border-primary rounded-lg px-3 py-2.5 mb-6`}
                >
                    <div className="flex flex-col @md:flex-row @md:flex-wrap @md:items-center gap-2 @md:gap-3">
                        <Input
                            label="Search features"
                            showLabel={false}
                            size="md"
                            type="text"
                            placeholder="Search features…"
                            value={query}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                            showClearButton
                            onClear={() => setQuery('')}
                            containerClassName="w-full @md:max-w-xs"
                        />
                        <div className="flex items-center gap-1">
                            <OSButton
                                size="md"
                                active={stageFilter === 'all'}
                                onClick={() => setStageFilter('all')}
                                label={String(total)}
                            >
                                All
                            </OSButton>
                            <OSButton
                                size="md"
                                active={stageFilter === 'beta'}
                                onClick={() => setStageFilter('beta')}
                                label={String(totalBeta)}
                            >
                                Beta
                            </OSButton>
                            <OSButton
                                size="md"
                                active={stageFilter === 'alpha'}
                                onClick={() => setStageFilter('alpha')}
                                label={String(totalAlpha)}
                            >
                                Alpha
                            </OSButton>
                            <OSButton
                                size="md"
                                active={stageFilter === 'concept'}
                                onClick={() => setStageFilter('concept')}
                                label={String(totalConcept)}
                            >
                                Concept
                            </OSButton>
                        </div>
                        <Select
                            ariaLabel="Filter by team"
                            placeholder="All teams"
                            value={teamFilter}
                            onValueChange={setTeamFilter}
                            groups={[{ label: 'Team', items: teamOptions }]}
                            className="w-full @md:w-auto"
                        />
                        <Select
                            ariaLabel="Sort features"
                            placeholder="Sort"
                            value={sortBy}
                            onValueChange={(value: string) => setSortBy(value as SortKey)}
                            groups={[{ label: 'Sort by', items: sortItems }]}
                            className="w-full @md:w-auto"
                        />
                        <span className="text-secondary text-sm @md:ml-auto whitespace-nowrap">
                            Showing {shownCount} of {total}
                        </span>
                    </div>

                    {hasActiveFilters && (
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                            {query.trim() && <FilterChip label={`“${query.trim()}”`} onRemove={() => setQuery('')} />}
                            {stageFilter !== 'all' && (
                                <FilterChip
                                    label={STAGE_FILTER_LABELS[stageFilter]}
                                    onRemove={() => setStageFilter('all')}
                                />
                            )}
                            {teamFilter !== 'all' && (
                                <FilterChip label={teamFilterLabel} onRemove={() => setTeamFilter('all')} />
                            )}
                            <OSButton size="sm" variant="underlineOnHover" onClick={clearAllFilters}>
                                Clear all
                            </OSButton>
                        </div>
                    )}
                </div>
            )}

            {showBeta && (
                <section className="mb-10">
                    <SectionHeader
                        icon={<IconRocket className="size-6 text-red dark:text-yellow" />}
                        title="Beta – try it now"
                        count={beta.length}
                        description="Live in PostHog today. Each card links straight to its toggle in your account – flip it on and go."
                    />
                    <Grid>
                        {beta.map((feature) => (
                            <BetaCard
                                key={feature.flagKey}
                                feature={feature}
                                teamSlug={teamForFeature(feature)}
                                badge={badgeFor(feature)}
                                people={peopleFor(feature)}
                                effectClassName={effectFor(feature)}
                            />
                        ))}
                    </Grid>
                </section>
            )}

            {showAlpha && (
                <section className="mb-10">
                    <SectionHeader
                        icon={<IconFlask className="size-6 text-red dark:text-yellow" />}
                        title="Alpha – in closed testing"
                        count={alpha.length}
                        description="We're testing these with small groups while we work out the rough edges. Join a waitlist and we'll let you know when testing opens up."
                    />
                    <Grid>
                        {alpha.map((feature) => (
                            <ComingSoonCard
                                key={feature.flagKey}
                                feature={feature}
                                teamSlug={teamForFeature(feature)}
                                badge={badgeFor(feature)}
                                people={peopleFor(feature)}
                                effectClassName={effectFor(feature)}
                            />
                        ))}
                    </Grid>
                </section>
            )}

            {showConcept && (
                <section className="mb-10">
                    <SectionHeader
                        icon={<IconLightBulb className="size-6 text-red dark:text-yellow" />}
                        title="Concept – coming soon"
                        count={concept.length}
                        description="What we're building next. Join a waitlist and we'll email you when it's ready."
                    />
                    <Grid>
                        {concept.map((feature) => (
                            <ComingSoonCard
                                key={feature.flagKey}
                                feature={feature}
                                teamSlug={teamForFeature(feature)}
                                badge={badgeFor(feature)}
                                people={peopleFor(feature)}
                                effectClassName={effectFor(feature)}
                            />
                        ))}
                        {!q && <PitchConceptCard />}
                    </Grid>
                </section>
            )}

            {!showBeta && !showAlpha && !showConcept && (
                <div className="flex flex-col items-center gap-2 py-8 text-center">
                    <img
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/detective_hog_9b2bb1da51.png"
                        alt="A hedgehog detective, stumped"
                        className="max-h-32"
                    />
                    <p className="text-secondary text-sm m-0">
                        {q ? `No features match “${query}”. ` : 'No features match these filters. '}
                        Detective Hog has no leads – try a different filter.
                    </p>
                </div>
            )}
        </div>
    )
}
