import React, { useEffect, useMemo, useRef, useState } from 'react'
import { IconRocket, IconClock } from '@posthog/icons'
import Input from 'components/OSForm/input'
import OSButton from 'components/OSButton'
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

type StageFilter = 'all' | 'beta' | 'coming-soon'

const slugify = (text: string): string =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

// Feature descriptions come from the app and can run long. Clamp to three lines and only
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
            <p ref={ref} className={`text-sm text-secondary m-0 whitespace-pre-line ${expanded ? '' : 'line-clamp-3'}`}>
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
    children,
}: {
    feature: EarlyAccessFeature
    teamSlug?: string
    children?: React.ReactNode
}): JSX.Element => (
    <div
        data-scheme="secondary"
        id={feature.flagKey}
        className="@container bg-primary border border-primary rounded-md p-4 flex flex-col gap-2 h-full scroll-mt-24 target:border-red dark:target:border-yellow"
    >
        <h3 className="text-base @md:text-lg m-0 leading-tight">{feature.name}</h3>
        {feature.description && <ClampedDescription text={feature.description} />}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {teamSlug && <SmallTeam slug={teamSlug} />}
            {feature.documentationUrl && (
                <OSButton asLink to={feature.documentationUrl} external size="sm" variant="underlineOnHover">
                    Read the docs
                </OSButton>
            )}
        </div>
        {children && <div className="mt-auto pt-1">{children}</div>}
    </div>
)

// Beta — live now. Link straight to this feature's toggle in the app (identities aren't
// shared between posthog.com and the app, so enrollment has to happen there).
const BetaCard = ({ feature, teamSlug }: { feature: EarlyAccessFeature; teamSlug?: string }): JSX.Element => (
    <FeatureCard feature={feature} teamSlug={teamSlug}>
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
const ComingSoonCard = ({ feature, teamSlug }: { feature: EarlyAccessFeature; teamSlug?: string }): JSX.Element => {
    const [showForm, setShowForm] = useState(false)
    const surveyId = feature.payload?.survey_id as string | undefined
    const surveyQuestionId = feature.payload?.survey_question_id as string | undefined

    // Without a linked survey there's nowhere to record the sign-up, so show info only.
    if (!surveyId) {
        return <FeatureCard feature={feature} teamSlug={teamSlug} />
    }

    return (
        <FeatureCard feature={feature} teamSlug={teamSlug}>
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
    <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-3">{children}</div>
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
 * Cards show the owning small team (via the feature-ownership map) when we can match one,
 * are addressable (/roadmap#flag-key), and highlight when targeted. Search + a stage filter
 * keep a long list scannable. Renders nothing when empty.
 */
export default function EarlyAccessFeaturesSection(): JSX.Element | null {
    const { grouped, loading } = useEarlyAccessFeatures()
    const { features: ownedFeatures } = useFeatureOwnership()
    const [query, setQuery] = useState('')
    const [stageFilter, setStageFilter] = useState<StageFilter>('all')

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

    // Deep links to a card (/roadmap#flag-key) should scroll it into view once cards exist —
    // the browser's native anchor jump fires before this list finishes rendering.
    useEffect(() => {
        if (!hasFeatures || typeof window === 'undefined' || !window.location.hash) {
            return
        }
        document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: 'center' })
    }, [hasFeatures])

    if (loading && total === 0) {
        return <p className="text-muted text-sm">Loading what's new…</p>
    }
    if (total === 0) {
        return null
    }

    const q = query.trim().toLowerCase()
    const matches = (f: EarlyAccessFeature) =>
        !q || f.name.toLowerCase().includes(q) || (f.description || '').toLowerCase().includes(q)
    const beta = grouped.beta.filter(matches)
    const comingSoon = grouped.comingSoon.filter(matches).sort(bySignupAvailability)

    const showBeta = (stageFilter === 'all' || stageFilter === 'beta') && beta.length > 0
    const showComing = (stageFilter === 'all' || stageFilter === 'coming-soon') && comingSoon.length > 0
    const showControls = total > CONTROLS_THRESHOLD

    return (
        <div className="@container">
            {showControls && (
                <div className="flex flex-col @md:flex-row @md:items-center gap-2 @md:gap-4 mb-6">
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
                            <BetaCard key={feature.flagKey} feature={feature} teamSlug={teamForFeature(feature)} />
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
                            />
                        ))}
                    </Grid>
                </section>
            )}

            {q && !showBeta && !showComing && (
                <div className="flex flex-col items-center gap-2 py-8 text-center">
                    <img
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/detective_hog_9b2bb1da51.png"
                        alt="A hedgehog detective, stumped"
                        className="max-h-32"
                    />
                    <p className="text-secondary text-sm m-0">
                        No features match “{query}”. Detective Hog has no leads – try a different search.
                    </p>
                </div>
            )}
        </div>
    )
}
