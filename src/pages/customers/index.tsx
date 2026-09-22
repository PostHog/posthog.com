import React, { useEffect, useMemo, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import ReaderView from 'components/ReaderView'
import ViewerFilters from 'components/Viewer/ViewerFilters'
import OSTable from 'components/OSTable'
import OSButton from 'components/OSButton'
import CustomerShuffle from 'components/CustomerShuffle'
import CustomerCards, { CustomerBadges } from 'components/CustomerCards'
import { OSQuote } from 'components/OSQuote'
import CloudinaryImage from 'components/CloudinaryImage'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'
import { StickerAi, StickerCrown, StickerLaptop } from 'components/Stickers/Stickers'
import { COL1, COL2, companyAttributes, companyBreakdowns } from 'components/Home/Customers'
import { useCustomers, Customer as CustomerType, CustomerPerson, PERSONAS, CURRENT_YC_BATCH } from 'hooks/useCustomers'
import { IconArrowUpRight } from '@posthog/icons'

// add `featured: true` to useCustomers.ts (for filtering), then set the order below:
const CUSTOMER_ORDER = [
    'ycombinator',
    'mistralai',
    'supabase',
    'elevenlabs',
    'raycast',
    'airbus',
    'arena',
    'researchgate',
    'startengine',
    'exa',
    'convex',
    'hasura',
    'trust',
    'heygen',
    'posthog',
]

// The board reuses the homepage's curated logo set, because the joke categories are written against it.
const BOARD = [...COL1, ...COL2]

// Category pairs we can prove from the customer data, so nothing here is a second list to maintain.
// A pair with fewer than three companies in column 1 hides itself — see components/CustomerShuffle.
const ICP_BREAKDOWNS = {
    aiPilled: { col1: 'AI-pilled', col2: 'AI-curious' },
    yc: { col1: 'YC alumni', col2: 'Got funded without a demo day' },
    currentYcBatch: { col1: `In YC right now (${CURRENT_YC_BATCH})`, col2: 'Already survived YC' },
    startupProgram: { col1: 'Started on free startup credits', col2: 'Now pays us real money' },
    outsideUS: { col1: 'Builds outside the US', col2: 'Builds in the US (or everywhere)' },
    posthogAI: { col1: 'Asks PostHog AI', col2: 'Builds the funnel by hand' },
    engineerLed: { col1: 'An engineer brought us in', col2: 'Somebody else brought us in' },
    allIn: { col1: 'Uses six products or more', col2: 'Has treats left to find' },
}

const PERSONA_BLURBS: Record<string, string> = {
    Engineering: 'Engineers get here first, because engineers exist first.',
    Product: 'They arrived second and immediately asked for a funnel.',
    Growth: 'Somebody has to find out where the users went.',
    Marketing: 'The people who learned to code so they could stop filing tickets.',
    Founders: 'Technical founders, mostly. They picked the tool and never left.',
    Data: 'They were doing this before it was AI-pilled.',
}

const LOGO_CLASS = 'h-8 w-auto max-w-[180px] object-contain fill-current'
const QUOTES_SHOWN = 6
const HERO_ROTATE_MS = 8000
// A quote has to fit on three lines at display size, or the hero stops being a hero.
const HERO_MAX_CHARS = 150

// ─────────────────────────────────────────────
// Hero — a customer does the talking, not us
// ─────────────────────────────────────────────

const HeroQuote = ({ people }: { people: CustomerPerson[] }): JSX.Element | null => {
    const prefersReducedMotion = usePrefersReducedMotion()
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (prefersReducedMotion || people.length < 2) return
        const timer = setInterval(() => setIndex((i) => (i + 1) % people.length), HERO_ROTATE_MS)
        return () => clearInterval(timer)
    }, [people.length, prefersReducedMotion])

    if (people.length === 0) return null
    const person = people[index % people.length]

    return (
        <div className="relative mb-8">
            <StickerAi className="absolute -top-4 right-0 hidden size-16 rotate-12 @2xl:block" aria-hidden />
            <p className="!mt-0 mb-2 text-sm font-semibold uppercase tracking-wide text-secondary">
                We build for{' '}
                <RoughAnnotation type="highlight" color="rgba(48, 164, 108, 0.2)" strokeWidth={1} padding={2}>
                    <Link to="/handbook/who-we-build-for">AI-pilled software teams</Link>
                </RoughAnnotation>
            </p>
            <blockquote
                key={person.key}
                className={`m-0 border-l-0 p-0 not-italic ${prefersReducedMotion ? '' : 'animate-slide-up-fade-in'}`}
            >
                <h1 className="m-0 text-balance text-2xl font-bold leading-tight tracking-tight @2xl:text-4xl @2xl:pr-20">
                    “{person.quote}”
                </h1>
            </blockquote>
            <div className="mt-3 flex items-center gap-2">
                {person.image?.thumb && (
                    <div className="size-9 overflow-hidden rounded-full bg-accent">
                        <CloudinaryImage
                            src={person.image.thumb as `https://res.cloudinary.com/${string}`}
                            alt={person.name}
                            imgClassName="size-9 object-cover object-center"
                        />
                    </div>
                )}
                <p className="!my-0 text-sm text-secondary">
                    <span className="font-semibold text-primary">{person.name}</span>, {person.role} at{' '}
                    {person.customer.name}
                </p>
            </div>
            {people.length > 1 && (
                <div className="mt-3 flex gap-1.5">
                    {people.map((p, i) => (
                        <button
                            key={p.key}
                            onClick={() => setIndex(i)}
                            aria-label={`Show the quote from ${p.name}`}
                            aria-current={i === index % people.length}
                            className={`h-1.5 w-6 rounded-full transition-colors ${
                                i === index % people.length ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/40'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

// ─────────────────────────────────────────────
// Table
// ─────────────────────────────────────────────

const CustomerLink = ({
    customer,
    hasCaseStudy,
    children,
    className = 'group inline-flex h-full items-center',
}: {
    customer: CustomerType
    hasCaseStudy: (slug: string) => boolean
    children: React.ReactNode
    className?: string
}) => {
    return hasCaseStudy(customer.slug) || customer.slug === 'posthog' ? (
        <Link
            to={customer.slug === 'posthog' ? '/blog/posthog-marketing' : `/customers/${customer.slug}`}
            state={{ newWindow: true }}
            className={className}
        >
            {children}
        </Link>
    ) : (
        <>{children}</>
    )
}

interface CustomerProps {
    number: number
    customer: CustomerType
    hasCaseStudy: (slug: string) => boolean
}

const Customer = ({ number, customer, hasCaseStudy }: CustomerProps) => {
    const renderLogo = () => {
        if (!customer.logo) {
            return <span>{customer.name}</span>
        }

        // Check if logo is a React component (single SVG format)
        if (typeof customer.logo === 'function') {
            const LogoComponent = customer.logo

            return (
                <CustomerLink customer={customer} hasCaseStudy={hasCaseStudy}>
                    <LogoComponent className={LOGO_CLASS} />
                </CustomerLink>
            )
        }

        // Otherwise, it's the existing light/dark object format
        return (
            <CustomerLink customer={customer} hasCaseStudy={hasCaseStudy}>
                <img src={customer.logo.light} alt={customer.name} className={`${LOGO_CLASS} dark:hidden`} />
                <img src={customer.logo.dark} alt={customer.name} className={`${LOGO_CLASS} hidden dark:block`} />
            </CustomerLink>
        )
    }

    return {
        key: customer.name,
        cells: [
            { content: number },
            {
                content: (
                    <div className="flex flex-col gap-1">
                        <div className="flex h-8 items-center">{renderLogo()}</div>
                        <CustomerBadges customer={customer} />
                    </div>
                ),
                className: '!p-4',
            },
            { content: customer.toolsUsed?.join(', '), className: 'text-sm' },
            {
                content:
                    hasCaseStudy(customer.slug) || customer.slug === 'posthog' ? (
                        <CustomerLink customer={customer} hasCaseStudy={hasCaseStudy}>
                            Link{' '}
                            <IconArrowUpRight className="size-4 inline-block text-muted group-hover:text-primary" />
                        </CustomerLink>
                    ) : null,
            },
            { content: customer.notes || '', className: 'text-sm' },
        ],
    }
}

const sortCustomers = (customers: CustomerType[]) => {
    return [...customers].sort((a, b) => {
        const aIndex = CUSTOMER_ORDER.indexOf(a.slug)
        const bIndex = CUSTOMER_ORDER.indexOf(b.slug)
        const aOrder = aIndex === -1 ? Infinity : aIndex
        const bOrder = bIndex === -1 ? Infinity : bIndex
        return aOrder - bOrder
    })
}

const columns = [
    { name: '', width: 'auto', align: 'center' as const },
    { name: 'Company name', width: 'minmax(150px,1fr)', align: 'left' as const },
    { name: 'Product(s) used', width: 'minmax(auto,250px)', align: 'left' },
    { name: 'Case study', width: 'minmax(auto,100px)', align: 'center' as const },
    { name: 'Notes', width: 'minmax(auto,180px)', align: 'left' as const },
]

export default function Customers(): JSX.Element {
    const { hasCaseStudy, isFeatured, customers: allCustomers, getPeople } = useCustomers()
    const customers = useMemo(() => sortCustomers(Object.values(allCustomers)), [allCustomers])
    const [filteredCustomers, setFilteredCustomers] = useState<any>(customers.filter((customer) => customer.featured))
    const [persona, setPersona] = useState(PERSONAS[0].label)
    const [showAllQuotes, setShowAllQuotes] = useState(false)

    const icpAttributes = useMemo(() => {
        const where = (test: (customer: CustomerType) => boolean) =>
            BOARD.filter((slug) => allCustomers[slug] && test(allCustomers[slug]))
        return {
            aiPilled: where((customer) => !!customer.aiPilled),
            yc: where((customer) => !!customer.yc),
            currentYcBatch: where((customer) => customer.yc === CURRENT_YC_BATCH),
            startupProgram: where((customer) => !!customer.startupProgram),
            outsideUS: where((customer) => !!customer.region && customer.region !== 'US'),
            posthogAI: where((customer) => !!customer.toolsUsedHandles?.includes('posthog_ai')),
            engineerLed: where((customer) => !!customer.users?.includes('Engineering')),
            allIn: where((customer) => (customer.toolsUsedHandles?.length || 0) >= 6),
        }
    }, [allCustomers])

    const people = useMemo(() => getPeople(), [allCustomers])
    const heroPeople = useMemo(
        () => people.filter((person) => (person.quote?.length || 0) <= HERO_MAX_CHARS).slice(0, 6),
        [people]
    )
    const personas = useMemo(
        () =>
            PERSONAS.map(({ label }) => ({
                label,
                people: people.filter((person) => person.personas.includes(label)),
            })).filter(({ people: matched }) => matched.length > 0),
        [people]
    )
    const selected = personas.find(({ label }) => label === persona) || personas[0]
    const visibleQuotes = showAllQuotes ? selected?.people : selected?.people.slice(0, QUOTES_SHOWN)

    // A quote per customer, so a card can upgrade itself from its `notes` line the day one arrives.
    const peopleBySlug = useMemo(
        () =>
            people.reduce((acc, person) => {
                if (!acc[person.customer.slug]) acc[person.customer.slug] = person
                return acc
            }, {} as Record<string, CustomerPerson>),
        [people]
    )

    // The middle rung: companies we want to show off that have no case study. Their `notes` line
    // carries the card until somebody gives us a quote.
    const noStoryYet = useMemo(
        () =>
            BOARD.map((slug) => allCustomers[slug]).filter(
                (customer) =>
                    customer && customer.aiPilled && !hasCaseStudy(customer.slug) && customer.slug !== 'posthog'
            ),
        [allCustomers]
    )

    const founders = useMemo(
        () => people.filter((person) => person.personas.includes('Founders')).slice(0, 3),
        [people]
    )

    const handleFilterChange = (filters: any) => {
        setFilteredCustomers(sortCustomers(filters))
    }

    return (
        <>
            <SEO title="Customers – PostHog" description="" image={`/images/og/customers.jpg`} />
            <ReaderView
                hideTitle
                proseSize="lg"
                showQuestions={false}
                hideRightSidebar
                hideLeftSidebar
                hideMenu
                defaultNavVisible={false}
            >
                <div className="@container w-full max-w-5xl mx-auto">
                    <HeroQuote people={heroPeople} />

                    <CustomerShuffle
                        companies={BOARD}
                        breakdowns={{ ...ICP_BREAKDOWNS, ...companyBreakdowns }}
                        attributes={{ ...icpAttributes, ...companyAttributes }}
                        defaultBreakdown="aiPilled"
                        showPicker
                        className="mb-8"
                    />

                    <h2 className="text-xl font-bold mb-1">Who brings PostHog in?</h2>
                    <p className="!mt-0 mb-2">
                        An engineer, almost always. Then everybody else turns up. Pick a job and read what that person
                        said — one company can show up more than once, because Arena's engineer and Arena's marketer do
                        not use the same half of PostHog.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                        {personas.map(({ label, people: matched }) => (
                            <button
                                key={label}
                                onClick={() => {
                                    setPersona(label)
                                    setShowAllQuotes(false)
                                }}
                                className={`text-sm px-2 py-1 rounded border transition-colors ${
                                    label === selected?.label
                                        ? 'border-primary bg-accent font-semibold'
                                        : 'border-transparent text-secondary hover:border-primary'
                                }`}
                            >
                                {label} <span className="text-xs text-muted font-normal">{matched.length}</span>
                            </button>
                        ))}
                    </div>
                    {selected && (
                        <>
                            <p className="!mt-0 mb-3 text-secondary italic">{PERSONA_BLURBS[selected.label]}</p>
                            <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-4 [&_>div>div]:!max-w-none [&_>div>div]:!mb-0 [&_>div>div]:!flex-1 mb-3">
                                {visibleQuotes?.map((person) => (
                                    <div key={`${person.customer.slug}-${person.key}`} className="flex flex-col">
                                        <OSQuote
                                            customer={person.customer.slug}
                                            author={person.key}
                                            product={person.product}
                                        />
                                        {hasCaseStudy(person.customer.slug) && (
                                            <Link
                                                to={`/customers/${person.customer.slug}`}
                                                state={{ newWindow: true }}
                                                className="group text-sm mt-1"
                                            >
                                                Read the {person.customer.name} story{' '}
                                                <IconArrowUpRight className="size-4 inline-block text-muted group-hover:text-primary" />
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {selected.people.length > QUOTES_SHOWN && (
                                <OSButton
                                    onClick={() => setShowAllQuotes(!showAllQuotes)}
                                    variant="secondary"
                                    size="sm"
                                    className="mb-8"
                                >
                                    {showAllQuotes ? 'Show fewer' : `Show all ${selected.people.length}`}
                                </OSButton>
                            )}
                        </>
                    )}

                    {noStoryYet.length > 0 && (
                        <>
                            <h2 className="text-xl font-bold mb-1">Teams who have not written us a story yet</h2>
                            <p className="!mt-0 mb-3">
                                Shipping beats writing, and we respect that. Here is what they build while we wait for
                                somebody to answer our email.
                            </p>
                            <CustomerCards
                                customers={noStoryYet}
                                people={peopleBySlug}
                                hasCaseStudy={hasCaseStudy}
                                className="mb-8"
                            />
                        </>
                    )}

                    <div className="mb-8 grid grid-cols-1 gap-3 @2xl:grid-cols-2">
                        <div className="relative rounded border border-primary bg-accent p-4">
                            <StickerLaptop className="absolute right-3 top-3 size-10 -rotate-6" aria-hidden />
                            <h2 className="!mt-0 mb-1 pr-12 text-lg font-bold">One person, one laptop</h2>
                            <p className="!mt-0 mb-2 text-[15px] text-secondary">
                                Plenty of the names above started as a founder and a terminal. If that is you, do not
                                write us a case study. Take the free credits and go build.
                            </p>
                            {founders.length > 0 && (
                                <p className="!mt-0 mb-3 text-[15px] italic">
                                    “{founders[0].quote}” —{' '}
                                    <span className="not-italic">
                                        {founders[0].name}, {founders[0].customer.name}
                                    </span>
                                </p>
                            )}
                            <div className="flex flex-wrap gap-2">
                                <OSButton asLink to="/startups" state={{ newWindow: true }} variant="primary" size="sm">
                                    Startup program
                                </OSButton>
                                <OSButton
                                    asLink
                                    to="/students"
                                    state={{ newWindow: true }}
                                    variant="secondary"
                                    size="sm"
                                >
                                    Students
                                </OSButton>
                            </div>
                        </div>
                        <div className="relative rounded border border-primary bg-accent p-4">
                            <StickerCrown className="absolute right-3 top-3 size-10 rotate-6" aria-hidden />
                            <h2 className="!mt-0 mb-1 pr-12 text-lg font-bold">Rather a lot of people</h2>
                            <p className="!mt-0 mb-3 text-[15px] text-secondary">
                                Airbus and the UK Government are on this page too. Procurement, security reviews, and
                                the rest of it are somebody else's problem — ours.
                            </p>
                            <OSButton asLink to="/enterprise" state={{ newWindow: true }} variant="primary" size="sm">
                                PostHog for enterprise
                            </OSButton>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mb-1">Everybody, in a table</h2>
                    <p className="!mt-0">You can use the filters below to read how they use different products.</p>
                    <ViewerFilters
                        availableFilters={[
                            {
                                label: 'Product',
                                options: [
                                    { label: 'Any', value: undefined },
                                    ...Array.from(
                                        new Set(
                                            customers
                                                .filter((customer) => customer.toolsUsed?.length)
                                                .flatMap((customer) => customer.toolsUsed || [])
                                        )
                                    ).map((tool) => ({
                                        label: tool,
                                        value: tool,
                                    })),
                                ],
                                filter: (obj, value) => obj['toolsUsed']?.includes(value),
                                operator: 'includes',
                            },
                            {
                                label: 'Case study',
                                options: [
                                    { label: 'Any', value: undefined },
                                    { label: 'Yes', value: true },
                                    { label: 'No', value: false },
                                ],
                                filter: (obj, value) => (value ? hasCaseStudy(obj.slug) : !hasCaseStudy(obj.slug)),
                                operator: 'equals',
                            },
                            {
                                label: 'Badge',
                                options: [
                                    { label: 'Any', value: undefined },
                                    { label: 'AI-pilled', value: 'aiPilled' },
                                    { label: 'YC alum', value: 'yc' },
                                ],
                                filter: (obj, value) => !!obj[value],
                                operator: 'equals',
                            },
                            {
                                label: 'Featured',
                                options: [
                                    { label: 'Any', value: undefined },
                                    { label: 'Yes', value: true },
                                    { label: 'No', value: false },
                                ],
                                filter: (obj, value) => (value ? isFeatured(obj.slug) : !isFeatured(obj.slug)),
                                operator: 'equals',
                                initialValue: true,
                            },
                        ]}
                        dataToFilter={customers}
                        onFilterChange={handleFilterChange}
                    />
                    <OSTable
                        className="mt-2"
                        columns={columns}
                        width="full"
                        rows={(filteredCustomers || customers).map((customer: any, index: number) => {
                            return Customer({
                                number: index + 1,
                                customer,
                                hasCaseStudy,
                            })
                        })}
                    />
                </div>
            </ReaderView>
        </>
    )
}
