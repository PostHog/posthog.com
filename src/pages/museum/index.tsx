import React, { useEffect, useMemo, useRef, useState } from 'react'
import { navigate } from 'gatsby'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import SmallTeam from 'components/SmallTeam'
import { RollingWords, type RollingWordStep } from 'components/Home/Sections/RollingWords'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { IconChevronLeft, IconChevronRight, IconSpinner } from '@posthog/icons'
import MuseumCard from 'components/Museum/MuseumCard'
import { useArtifactForm } from 'components/Museum/ArtifactForm'
import { useExhibitForm } from 'components/Museum/ExhibitForm'
import { formatDate } from 'components/Museum/utils'
import { useArtifacts, useExhibits, useMuseumTaxonomy, type MuseumExhibit } from 'hooks/useMuseum'
import { useUser } from 'hooks/useUser'
import { useWindow } from '../../context/Window'

type Filters = { category?: string; type?: string; collection?: string; sort: 'newest' | 'oldest' }

const ATTENTION_WORDS: RollingWordStep[] = [
    { word: 'eyeballs', hold: 900 },
    { word: 'clicks', hold: 700 },
    { word: 'sign-ups', hold: 500 },
    { word: 'laughs', hold: 400 },
    { word: 'attention', hold: 0 },
]

const hog = (file: string) => `https://res.cloudinary.com/dmukukwp6/image/upload/${file}.png`

// Each wing of the museum gets its own hog and intro line, keyed by category or collection slug.
// A Strapi description, when set, replaces the intro line.
const LOBBY = { image: hog('terminator_4daea0a449') }
const WINGS: Record<string, { image: string; intro: string }> = {
    'digital-ads': { image: hog('trenchcoat_4cacbaddb5'), intro: 'Ads we paid to put in your feed.' },
    social: { image: hog('organized_5bf86d34ab'), intro: 'Posts, carousels, and memes from our social channels.' },
    email: { image: hog('research_8bfa53dab7'), intro: 'Emails we sent that people actually opened.' },
    'out-of-home': {
        image: hog('gold_star_hog_145ba52b71'),
        intro: 'Billboards, bus ads, and posters out in the real world.',
    },
    video: { image: hog('banana_relax_83149feac6'), intro: 'Launch videos and ads. Sit back and enjoy.' },
    merch: { image: hog('plague_doctor_df3d1c532f'), intro: 'Things we made for you to wear, use, and show off.' },
    misc: { image: hog('1_up_mario_hog_985458514f'), intro: 'Games and everything else that fits nowhere else.' },
    'product-launches': {
        image: hog('transformer_hedgehog_2a379334d7'),
        intro: 'How we tell the world about new products.',
    },
    'do-more-weird': { image: hog('endpoints_7e459e6202'), intro: 'Real things that came out of #domoreweird.' },
}

// Exhibits that are pages in this repo rather than Strapi entries. Shown in the lobby sidebar.
const PERMANENT_EXHIBIT = {
    title: 'The Evolution of Marketing',
    url: '/museum/exhibits/evolution',
    summary: 'The Department of Anthropology presents six years of PostHog marketing evolution, 2020–2026.',
    image: hog('research_8bfa53dab7'),
}

// Slugs of the teams that make what's in the museum, credited at the bottom of the page
const CREATIVE_TEAMS = ['developer-marketing', 'demand-gen', 'graphics', 'youtube', 'editorial', 'website']

const STARBURST_POINTS = Array.from({ length: 48 }, (_, i) => {
    const radius = i % 2 ? 43 : 50
    const angle = (i * Math.PI) / 24
    return `${50 + radius * Math.sin(angle)},${50 - radius * Math.cos(angle)}`
}).join(' ')

const exhibitImage = (exhibit: MuseumExhibit) =>
    exhibit.coverImage?.data?.attributes.url ||
    exhibit.stops?.[0]?.artifact.data?.attributes.heroImage?.data?.attributes.url

const exhibitMeta = (exhibit: MuseumExhibit) => `${exhibit.stops?.length || 0} artifacts`

const FilterButton = ({
    active,
    onClick,
    children,
}: {
    active: boolean
    onClick: () => void
    children: React.ReactNode
}) => (
    <OSButton size="sm" align="left" width="full" active={active} onClick={onClick}>
        {children}
    </OSButton>
)

export default function Museum({ location }: { location: { search: string } }): JSX.Element {
    const { artifacts, isLoading, mutate } = useArtifacts()
    const { exhibits, mutate: mutateExhibits } = useExhibits()
    const { categories, types, collections } = useMuseumTaxonomy()
    const { isModerator } = useUser()
    const openArtifactForm = useArtifactForm()
    const openExhibitForm = useExhibitForm()
    const { appWindow } = useWindow()
    const [filters, setFilters] = useState<Filters>({ sort: 'newest' })

    const search = appWindow?.location?.search ?? location?.search
    useEffect(() => {
        const params = new URLSearchParams(search)
        setFilters({
            category: params.get('category') || undefined,
            type: params.get('type') || undefined,
            collection: params.get('collection') || undefined,
            sort: params.get('sort') === 'oldest' ? 'oldest' : 'newest',
        })
    }, [search])

    const updateFilters = (next: Partial<Filters>) => {
        const updated = { ...filters, ...next }
        setFilters(updated)
        const params = new URLSearchParams()
        if (updated.category) params.set('category', updated.category)
        if (updated.type) params.set('type', updated.type)
        if (updated.collection) params.set('collection', updated.collection)
        if (updated.sort === 'oldest') params.set('sort', 'oldest')
        const query = params.toString()
        navigate(query ? `/museum?${query}` : '/museum', { replace: true })
    }

    const filtered = useMemo(() => {
        const matches = artifacts.filter(({ attributes }) => {
            if (filters.category && attributes.category?.data?.attributes.slug !== filters.category) return false
            if (filters.type && attributes.type?.data?.attributes.slug !== filters.type) return false
            if (
                filters.collection &&
                !attributes.collections?.data?.some((collection) => collection.attributes.slug === filters.collection)
            )
                return false
            return true
        })
        return filters.sort === 'oldest' ? [...matches].reverse() : matches
    }, [artifacts, filters])

    const isLobby = !filters.category && !filters.type && !filters.collection
    const featured = isLobby ? exhibits.find(({ attributes }) => attributes.featured) || exhibits[0] : undefined
    const otherExhibits = isLobby ? exhibits.filter((exhibit) => exhibit !== featured) : []
    const exhibitStripRef = useRef<HTMLDivElement>(null)
    const [stripEdges, setStripEdges] = useState({ atStart: true, atEnd: false })
    const updateStripEdges = () => {
        const strip = exhibitStripRef.current
        if (!strip) return
        setStripEdges({
            atStart: strip.scrollLeft <= 1,
            atEnd: strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 1,
        })
    }
    useEffect(() => {
        const strip = exhibitStripRef.current
        if (!strip) return
        const observer = new ResizeObserver(updateStripEdges)
        observer.observe(strip)
        return () => observer.disconnect()
    }, [otherExhibits.length])
    const scrollExhibits = (direction: 1 | -1) => {
        const strip = exhibitStripRef.current
        strip?.scrollBy({ left: direction * strip.clientWidth * 0.8, behavior: 'smooth' })
    }

    const wing =
        collections.find(({ attributes }) => attributes.slug === filters.collection) ||
        categories.find(({ attributes }) => attributes.slug === filters.category)
    const wingStyle = wing ? WINGS[wing.attributes.slug] : undefined
    const hogImage = wingStyle?.image || LOBBY.image

    const categoryTypes = types.filter((type) => type.attributes.category?.data?.attributes.slug === filters.category)

    return (
        <>
            <SEO
                title="PostHog marketing museum"
                description="Billboards, ads, launch videos, merch, and everything else we've made to get your attention."
                image="/images/og/default.png"
            />
            <Explorer
                template="generic"
                slug="museum"
                title="PostHog marketing museum"
                showTitle={false}
                leftSidebarContent={[
                    {
                        title: 'Category',
                        content: (
                            <div className="space-y-px">
                                <FilterButton
                                    active={!filters.category}
                                    onClick={() => updateFilters({ category: undefined, type: undefined })}
                                >
                                    All
                                </FilterButton>
                                {categories.map(({ id, attributes: { name, slug } }) => (
                                    <React.Fragment key={id}>
                                        <FilterButton
                                            active={filters.category === slug && !filters.type}
                                            onClick={() => updateFilters({ category: slug, type: undefined })}
                                        >
                                            {name}
                                        </FilterButton>
                                        {filters.category === slug &&
                                            categoryTypes.map((type) => (
                                                <div key={type.id} className="pl-4">
                                                    <FilterButton
                                                        active={filters.type === type.attributes.slug}
                                                        onClick={() => updateFilters({ type: type.attributes.slug })}
                                                    >
                                                        {type.attributes.name}
                                                    </FilterButton>
                                                </div>
                                            ))}
                                    </React.Fragment>
                                ))}
                            </div>
                        ),
                    },
                    {
                        title: 'Collections',
                        content: (
                            <div className="space-y-px">
                                {collections.map(({ id, attributes: { name, slug } }) => (
                                    <FilterButton
                                        key={id}
                                        active={filters.collection === slug}
                                        onClick={() =>
                                            updateFilters({
                                                collection: filters.collection === slug ? undefined : slug,
                                            })
                                        }
                                    >
                                        {name}
                                    </FilterButton>
                                ))}
                            </div>
                        ),
                    },
                    {
                        title: 'Permanent collection',
                        content: (
                            <Link
                                to={PERMANENT_EXHIBIT.url}
                                state={{ newWindow: true }}
                                data-scheme="primary"
                                className="not-prose group block rounded border border-primary bg-primary p-3 text-primary no-underline shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:-rotate-1 hover:shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <CloudinaryImage
                                        src={PERMANENT_EXHIBIT.image}
                                        alt=""
                                        imgClassName="h-auto w-14 shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className="m-0 text-sm font-bold leading-tight group-hover:underline">
                                            {PERMANENT_EXHIBIT.title}
                                        </p>
                                        <p className="m-0 mt-1 text-xs leading-snug text-secondary">
                                            {PERMANENT_EXHIBIT.summary}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ),
                    },
                    {
                        title: 'Visitor info',
                        content: (
                            <dl
                                data-scheme="primary"
                                className="not-prose m-0 rounded border border-primary bg-primary px-4 py-1 text-center shadow-sm"
                            >
                                {[
                                    { label: 'Hours', value: 'Open 24/7' },
                                    { label: 'Photography', value: 'Encouraged. Please tag us.' },
                                    {
                                        label: 'Gift shop',
                                        value: (
                                            <Link to="/merch" state={{ newWindow: true }}>
                                                The merch store
                                            </Link>
                                        ),
                                    },
                                ].map(({ label, value }) => (
                                    <div key={label} className="border-t border-primary py-3 first:border-t-0">
                                        <dt className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
                                            {label}
                                        </dt>
                                        <dd className="m-0 mt-1 text-sm font-semibold text-primary">{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        ),
                    },
                ]}
            >
                <div className="@container not-prose space-y-8">
                    <header className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                            <h1 className="m-0 text-3xl @xl:text-4xl">
                                {wing ? wing.attributes.name : 'PostHog marketing museum'}
                            </h1>
                            <p className="m-0 mt-2 max-w-xl text-balance text-secondary">
                                {wing ? (
                                    wing.attributes.description || wingStyle?.intro
                                ) : (
                                    <>
                                        Billboards, ads, launch videos, merch, and everything else we've made to get
                                        your{' '}
                                        <RollingWords steps={ATTENTION_WORDS} className="font-semibold text-primary" />
                                    </>
                                )}
                            </p>
                            {isModerator && (
                                <div className="mt-4 flex gap-2">
                                    <OSButton
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => openArtifactForm(undefined, () => mutate())}
                                    >
                                        Add artifact
                                    </OSButton>
                                    <OSButton
                                        size="sm"
                                        variant="primary"
                                        onClick={() => openExhibitForm(undefined, () => mutateExhibits())}
                                    >
                                        Curate exhibit
                                    </OSButton>
                                </div>
                            )}
                        </div>
                        <div className="relative w-24 shrink-0 @xl:w-32">
                            <CloudinaryImage
                                key={hogImage}
                                src={hogImage}
                                alt=""
                                className="motion-safe:animate-slide-up-fade-in"
                                imgClassName="h-auto w-full"
                            />
                            {isLobby && (
                                <div aria-hidden className="absolute -bottom-3 -left-10 size-20 rotate-12 @xl:size-24">
                                    <svg viewBox="0 0 100 100" className="absolute inset-0 size-full drop-shadow-md">
                                        <polygon
                                            points={STARBURST_POINTS}
                                            className="fill-yellow stroke-black"
                                            strokeWidth={2}
                                        />
                                    </svg>
                                    <span className="relative flex size-full flex-col items-center justify-center font-bold uppercase leading-none text-black">
                                        <span className="text-xl @xl:text-2xl">Free</span>
                                        <span className="text-[9px] @xl:text-[10px]">admission</span>
                                    </span>
                                </div>
                            )}
                        </div>
                    </header>

                    {featured && (
                        <div className="space-y-3">
                            <section className="flex items-center gap-4 rounded-md border border-primary bg-light p-4 dark:bg-accent @xl:gap-6">
                                <div className="aspect-video w-28 shrink-0 rotate-1 overflow-hidden rounded border-4 border-white bg-accent shadow-xl dark:border-primary @xl:w-48">
                                    {exhibitImage(featured.attributes) && (
                                        <img
                                            src={exhibitImage(featured.attributes)}
                                            alt=""
                                            className="size-full object-cover"
                                        />
                                    )}
                                </div>
                                <div className="flex min-w-0 flex-1 flex-col items-start gap-2 @2xl:flex-row @2xl:items-center @2xl:gap-6">
                                    <div className="min-w-0 flex-1">
                                        <p className="m-0 text-xs font-semibold uppercase leading-none tracking-wide text-orange dark:text-orange-dark">
                                            Now showing
                                        </p>
                                        <h2 className="m-0 mt-2 text-lg font-bold leading-tight @xl:text-xl">
                                            <Link
                                                to={`/museum/exhibits/${featured.attributes.slug}`}
                                                state={{ newWindow: true }}
                                                className="text-primary no-underline hover:underline"
                                            >
                                                {featured.attributes.title}
                                            </Link>
                                        </h2>
                                        <p className="m-0 mt-1 text-sm text-secondary">
                                            {exhibitMeta(featured.attributes)}
                                            {featured.attributes.summary && ` · ${featured.attributes.summary}`}
                                        </p>
                                    </div>
                                    <OSButton
                                        asLink
                                        to={`/museum/exhibits/${featured.attributes.slug}`}
                                        state={{ newWindow: true }}
                                        variant="primary"
                                        size="md"
                                        className="shrink-0"
                                    >
                                        Step inside
                                    </OSButton>
                                </div>
                            </section>
                            {otherExhibits.length > 0 && (
                                <section>
                                    <div className="mb-2 flex items-center justify-between gap-2">
                                        <h2 className="m-0 text-sm font-semibold text-secondary">
                                            More exhibits ({otherExhibits.length})
                                        </h2>
                                        <div className="flex gap-1">
                                            <OSButton
                                                size="sm"
                                                icon={<IconChevronLeft />}
                                                aria-label="Previous exhibits"
                                                disabled={stripEdges.atStart}
                                                onClick={() => scrollExhibits(-1)}
                                            />
                                            <OSButton
                                                size="sm"
                                                icon={<IconChevronRight />}
                                                aria-label="Next exhibits"
                                                disabled={stripEdges.atEnd}
                                                onClick={() => scrollExhibits(1)}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        ref={exhibitStripRef}
                                        onScroll={updateStripEdges}
                                        style={{
                                            maskImage: `linear-gradient(to right, ${
                                                stripEdges.atStart ? '#000' : 'transparent'
                                            }, #000 3rem, #000 calc(100% - 3rem), ${
                                                stripEdges.atEnd ? '#000' : 'transparent'
                                            })`,
                                        }}
                                        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none]"
                                    >
                                        {otherExhibits.map(({ id, attributes: exhibit }) => (
                                            <div key={id} className="w-48 shrink-0 snap-start @xl:w-56">
                                                <MuseumCard
                                                    newWindow
                                                    to={`/museum/exhibits/${exhibit.slug}`}
                                                    image={exhibitImage(exhibit)}
                                                    title={exhibit.title}
                                                    meta={exhibitMeta(exhibit)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}

                    <section>
                        <div className="mb-4 flex flex-wrap items-end justify-between gap-2 border-b border-primary pb-2">
                            <h2 className="m-0 text-2xl">
                                Artifacts{' '}
                                {!isLoading && <span className="font-normal text-secondary">({filtered.length})</span>}
                            </h2>
                            <ToggleGroup
                                title="Sort"
                                hideTitle
                                options={[
                                    { label: 'Newest', value: 'newest' },
                                    { label: 'Oldest', value: 'oldest' },
                                ]}
                                value={filters.sort}
                                onValueChange={(sort) => updateFilters({ sort: sort as Filters['sort'] })}
                            />
                        </div>
                        {isLoading ? (
                            <IconSpinner className="size-6 animate-spin opacity-50" />
                        ) : filtered.length === 0 ? (
                            <p className="text-secondary">Nothing here yet.</p>
                        ) : (
                            <div className="grid gap-4 @md:grid-cols-2 @3xl:grid-cols-3">
                                {filtered.map(({ id, attributes: artifact }) => (
                                    <MuseumCard
                                        newWindow
                                        key={id}
                                        to={`/museum/artifacts/${artifact.slug}`}
                                        image={artifact.heroImage?.data?.attributes.url}
                                        title={artifact.title}
                                        meta={[
                                            formatDate(artifact.date, artifact.datePrecision),
                                            artifact.type?.data?.attributes.name ||
                                                artifact.category?.data?.attributes.name,
                                        ]
                                            .filter(Boolean)
                                            .join(' · ')}
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                    <section>
                        <h2 className="mb-4 border-b border-primary pb-2 text-2xl">Made by</h2>
                        <div className="grid gap-6 @md:grid-cols-2 @3xl:grid-cols-3">
                            {CREATIVE_TEAMS.map((slug) => (
                                <SmallTeam key={slug} slug={slug} variant="crest" crestClassName="size-16" />
                            ))}
                        </div>
                    </section>
                </div>
            </Explorer>
        </>
    )
}
