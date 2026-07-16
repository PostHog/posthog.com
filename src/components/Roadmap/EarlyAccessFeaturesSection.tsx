import React, { useEffect, useMemo, useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { IconRocket, IconClock, IconX } from '@posthog/icons'
import Input from 'components/OSForm/input'
import OSButton from 'components/OSButton'
import { Select } from 'components/RadixUI/Select'
import EarlyAccessOptIn from 'components/EarlyAccessOptIn'
import SmallTeam from 'components/SmallTeam'
import SurveySignup from 'components/SurveySignup'
import { useFeatureOwnership } from 'hooks/useFeatureOwnership'
import useEarlyAccessFeatures, { EarlyAccessFeature } from 'hooks/useEarlyAccessFeatures'

// The in-app feature previews page supports deep links: /settings/user-feature-previews#<flagKey>
// scrolls to (and highlights) that feature's toggle, so each beta card links straight to it.
const featurePreviewUrl = (flagKey: string): string =>
    `https://us.posthog.com/settings/user-feature-previews#${flagKey}`

// Only surface the search + filter controls once the list is long enough to need them.
const CONTROLS_THRESHOLD = 8

// Features created within this window are flagged "New" (and lead the "Newest" sort).
const NEW_WINDOW_MS = 30 * 24 * 60 * 60 * 1000

type StageFilter = 'all' | 'beta' | 'coming-soon'
type SortKey = 'featured' | 'newest' | 'az' | 'team'

// Coming-soon covers both concept and alpha stages; a small chip tells them apart on the card
// without splitting the section. Beta cards live in their own section, so no chip is needed.
const STAGE_LABELS: Record<string, string> = { concept: 'Concept', alpha: 'Alpha' }

const StageChip = ({ stage }: { stage: string }): JSX.Element | null => {
    const label = STAGE_LABELS[stage]
    if (!label) {
        return null
    }
    return (
        <span className="shrink-0 bg-accent border border-primary rounded-full px-2 py-0.5 text-xs font-semibold text-secondary">
            {label}
        </span>
    )
}

// Emphasised chip for recently added features — colour-forward so it stands out from the stage chip.
const NewChip = (): JSX.Element => (
    <span className="shrink-0 bg-accent border border-primary rounded-full px-2 py-0.5 text-xs font-semibold text-red dark:text-yellow">
        New
    </span>
)

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
    children,
}: {
    feature: EarlyAccessFeature
    teamSlug?: string
    badge?: React.ReactNode
    children?: React.ReactNode
}): JSX.Element => (
    <div
        data-scheme="secondary"
        id={feature.flagKey}
        className="@container bg-primary border border-primary rounded-md p-3 flex flex-col gap-1.5 h-full scroll-mt-24 transition-colors hover:border-secondary target:border-red dark:target:border-yellow"
    >
        {/* The owning team's crest anchors the card visually and reinforces the team filter. */}
        {teamSlug && (
            <div className="mb-0.5">
                <SmallTeam slug={teamSlug} />
            </div>
        )}
        <div className="flex items-start gap-2">
            <h3 className="text-base @md:text-lg m-0 leading-tight flex-1">{feature.name}</h3>
            {badge}
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
}: {
    feature: EarlyAccessFeature
    teamSlug?: string
    badge?: React.ReactNode
}): JSX.Element => (
    <FeatureCard feature={feature} teamSlug={teamSlug} badge={badge}>
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
}: {
    feature: EarlyAccessFeature
    teamSlug?: string
    badge?: React.ReactNode
}): JSX.Element => {
    const [showForm, setShowForm] = useState(false)
    const surveyId = feature.payload?.survey_id as string | undefined
    const surveyQuestionId = feature.payload?.survey_question_id as string | undefined

    // Without a linked survey there's nowhere to record the sign-up, so show info only.
    if (!surveyId) {
        return <FeatureCard feature={feature} teamSlug={teamSlug} badge={badge} />
    }

    return (
        <FeatureCard feature={feature} teamSlug={teamSlug} badge={badge}>
            {showForm ? (
                <SurveySignup
                    surveyId={surveyId}
                    surveyQuestionId={surveyQuestionId}
                    productName={feature.name}
                    autoFocus
                    confetti={false}
                    buttonLabel="Notify me at launch"
                />
            ) : (
                <OSButton variant="secondary" size="md" width="full" onClick={() => setShowForm(true)}>
                    Get notified at launch
                </OSButton>
            )}
        </FeatureCard>
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
 *  - Betas — live now; each card deep-links to its toggle in the app's feature previews.
 *  - Coming soon — collect an email via each feature's linked waitlist survey.
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

    // Small-team display names, keyed by slug (mirrors SmallTeam's query) — used for the team
    // filter labels. Build-time / SSR-safe.
    const { allSqueakTeam } = useStaticQuery(graphql`
        {
            allSqueakTeam {
                nodes {
                    slug
                    name
                }
            }
        }
    `)
    const teamNameBySlug = useMemo(() => {
        const map: Record<string, string> = {}
        allSqueakTeam.nodes.forEach((node: { slug: string; name: string }) => {
            map[node.slug] = node.name
        })
        return map
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
    const teamForFeature = (feature: EarlyAccessFeature): string | undefined =>
        teamByFeatureSlug[feature.flagKey] || teamByFeatureSlug[slugify(feature.name)]

    const totalBeta = grouped.beta.length
    const totalComing = grouped.comingSoon.length
    const total = totalBeta + totalComing
    const hasFeatures = total > 0

    // Team filter options: every owning team present in the data (with counts), plus "All teams"
    // and an "Unassigned" bucket so ownership-unmatched features stay filterable, not hidden.
    const teamOptions = useMemo(() => {
        const counts: Record<string, number> = {}
        let unassigned = 0
        ;[...grouped.beta, ...grouped.comingSoon].forEach((feature) => {
            const slug = teamByFeatureSlug[feature.flagKey] || teamByFeatureSlug[slugify(feature.name)]
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

    // Unassigned features sort last under "By team" (￿ sorts after any real name).
    const teamLabelFor = (f: EarlyAccessFeature): string => teamNameBySlug[teamForFeature(f) ?? ''] ?? '￿'
    const sortFeatures = (list: EarlyAccessFeature[], isComing: boolean): EarlyAccessFeature[] => {
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
                // "Featured": coming-soon leads with joinable items; beta keeps its natural order.
                return isComing ? arr.sort(bySignupAvailability) : arr
        }
    }
    const beta = sortFeatures(grouped.beta.filter(matches), false)
    const comingSoon = sortFeatures(grouped.comingSoon.filter(matches), true)

    // Recently created features (createdAt within NEW_WINDOW_MS) get a "New" chip alongside any stage chip.
    const now = Date.now()
    const isNew = (f: EarlyAccessFeature): boolean =>
        mounted && typeof f.createdAt === 'number' && now - f.createdAt < NEW_WINDOW_MS
    const badgeFor = (f: EarlyAccessFeature): React.ReactNode => (
        <>
            {isNew(f) && <NewChip />}
            <StageChip stage={f.stage} />
        </>
    )

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
    const showComing = (stageFilter === 'all' || stageFilter === 'coming-soon') && comingSoon.length > 0
    const shownCount = (showBeta ? beta.length : 0) + (showComing ? comingSoon.length : 0)
    const showControls = total > CONTROLS_THRESHOLD

    return (
        <div className="@container">
            {/* Stage ladder so visitors understand what "in beta" vs "coming soon" means. */}
            <p className="text-secondary text-sm mt-0 mb-4">
                Every feature moves through stages – concept and alpha are early ideas, beta is ready to try, and then
                it reaches general availability.
            </p>

            {showControls && (
                <div className="sticky top-0 z-20 bg-primary border-b border-primary pt-1 pb-3 mb-6">
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
                                In beta
                            </OSButton>
                            <OSButton
                                size="md"
                                active={stageFilter === 'coming-soon'}
                                onClick={() => setStageFilter('coming-soon')}
                                label={String(totalComing)}
                            >
                                Coming soon
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
                                    label={stageFilter === 'beta' ? 'In beta' : 'Coming soon'}
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
                        title="In beta – try it now"
                        count={beta.length}
                        description="These are live. Each card links straight to its toggle in your PostHog account – flip it on and go."
                    />
                    <Grid>
                        {beta.map((feature) => (
                            <BetaCard
                                key={feature.flagKey}
                                feature={feature}
                                teamSlug={teamForFeature(feature)}
                                badge={badgeFor(feature)}
                            />
                        ))}
                    </Grid>
                </section>
            )}

            {showComing && (
                <section className="mb-10">
                    <SectionHeader
                        icon={<IconClock className="size-6 text-red dark:text-yellow" />}
                        title="Coming soon"
                        count={comingSoon.length}
                        description="Join a waitlist and we'll email you the moment it launches."
                    />
                    <Grid>
                        {comingSoon.map((feature) => (
                            <ComingSoonCard
                                key={feature.flagKey}
                                feature={feature}
                                teamSlug={teamForFeature(feature)}
                                badge={badgeFor(feature)}
                            />
                        ))}
                    </Grid>
                </section>
            )}

            {!showBeta && !showComing && (
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
