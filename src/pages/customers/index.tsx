import React, { useEffect, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import SEO from 'components/seo'
import Link from 'components/Link'
import ReaderView from 'components/ReaderView'
import ViewerFilters from 'components/Viewer/ViewerFilters'
import OSTable from 'components/OSTable'
import OSButton from 'components/OSButton'
import CustomerLogo from 'components/CustomerLogo'
import CustomerLogos from 'components/Pricing/Redesign/CustomerLogos'
import { SectionLayout, SectionHeader } from 'components/Pricing/Test/Sections'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import Tooltip from 'components/RadixUI/Tooltip'
import CloudinaryImage from 'components/CloudinaryImage'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'
import { StickerCoffee } from 'components/Stickers/Stickers'
import { useCustomers, Customer as CustomerType } from 'hooks/useCustomers'
import { IconArrowUpRight, IconChevronLeft, IconChevronRight } from '@posthog/icons'

// Same lookup as OSQuote: a product quote when `product` is set, otherwise `quotes[quote]`
interface QuoteSource {
    customer: string
    author: string
    quote?: number
    product?: string
}

interface HeroPerson {
    customer: CustomerType
    author: string
    name: string
    role: string
    image?: { thumb: string }
    text: string
}

const resolveQuote = (
    customers: Record<string, CustomerType>,
    { customer: slug, author, quote = 0, product }: QuoteSource
): HeroPerson | undefined => {
    const customer = customers[slug]
    const person = customer?.quotes?.[author]
    const text = product ? person?.products?.[product] : person?.quotes?.[quote]
    return customer && person && text
        ? { customer, author, name: person.name, role: person.role, image: person.image, text }
        : undefined
}

const hasStory = (customer: CustomerType) => customer.hasCaseStudy || customer.slug === 'posthog'
const storyUrl = (customer: CustomerType) =>
    customer.slug === 'posthog' ? '/blog/posthog-marketing' : `/customers/${customer.slug}`

// These customers show first in the table, in this order
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

const ROLES = [
    { label: 'Engineering', blurb: 'Installed it before anyone asked.' },
    { label: 'Product', blurb: 'Came for one funnel. Built forty.' },
    { label: 'Marketing', blurb: 'Plenty of marketers ship code now.' },
    { label: 'Founders', blurb: 'Picked the tool. Still refreshing the dashboard.' },
]

// One role per person. The stat must be in the case study. Keep these people out of HERO_QUOTES
const ROLE_RESULTS: (QuoteSource & { role: string; stat: string; label: string })[] = [
    { role: 'Engineering', customer: 'cloudpeek', author: 'craig_hollington', stat: '10x', label: 'faster debugging' },
    {
        role: 'Engineering',
        customer: 'phantom',
        author: 'francesco_agosti',
        stat: '90%',
        label: 'fewer failed token transfers',
    },
    {
        role: 'Engineering',
        customer: 'adauris',
        author: 'varun_sharma',
        stat: '500%',
        label: 'more landing page visits',
    },
    {
        role: 'Product',
        customer: 'ycombinator',
        author: 'cat_li',
        stat: '40%',
        label: 'more messages sent, from one experiment',
    },
    {
        role: 'Product',
        customer: 'vendasta',
        author: 'taric_santos',
        stat: '50%',
        label: 'less drop-off in onboarding',
    },
    {
        role: 'Product',
        customer: 'purplewave',
        author: 'matt_amick',
        product: 'surveys',
        stat: '25%',
        label: 'survey response rate, up from 14%',
    },
    {
        role: 'Marketing',
        customer: 'brainboard',
        author: 'stephane_boghossian',
        stat: '3.5x',
        label: 'desktop conversion rate, from 20% to 70%',
    },
    {
        role: 'Marketing',
        customer: 'grantable',
        author: 'evan_ralliss',
        product: 'workflows',
        stat: '10 min',
        label: 'to set up a production workflow',
    },
    {
        role: 'Marketing',
        customer: '11x',
        author: 'keith_fearon',
        stat: '85%',
        label: 'of API usage traced to one bad actor',
    },
    {
        role: 'Founders',
        customer: 'webshare',
        author: 'utku_zihnioglu',
        product: 'experiments',
        stat: '26%',
        label: 'more conversions from one call-to-action change',
    },
    {
        role: 'Founders',
        customer: 'hostai',
        author: 'punn_kam',
        product: 'ai_observability',
        stat: '50%',
        label: 'higher AI evaluation score',
    },
    {
        role: 'Founders',
        customer: '4dayweek',
        author: 'phil_mcparlane',
        stat: '4%',
        label: 'more conversions from one A/B test',
    },
]

// About PostHog as a whole, not one product
const HERO_QUOTES: QuoteSource[] = [
    { customer: 'kilocode', author: 'job_rietbergen', quote: 2 },
    { customer: 'supabase', author: 'aleksi_immonen', quote: 1 },
    { customer: 'arena', author: 'matt_hova', product: 'experiments' },
    { customer: 'zealot', author: 'brandon_jakobson' },
]

const TOOLS_SHOWN = 5
const HERO_ROTATE_MS = 8000
const HOG_IMAGE = 'https://res.cloudinary.com/dmukukwp6/image/upload/will_smith_hog_0248c8f94c.png'
const NEWSPAPER_HOG_IMAGE = 'https://res.cloudinary.com/dmukukwp6/image/upload/newspaper_hog_f0dd8cda48.png'

const HogCard = ({
    image,
    imageClassName,
    className = '',
    children,
    ...props
}: {
    image: `https://res.cloudinary.com/${string}`
    imageClassName: string
} & React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`@container not-prose ${className}`} {...props}>
        <div className="paper-desk rounded-lg border border-primary">
            <div className="flex flex-col gap-6 p-6 @2xl:flex-row @2xl:items-center @2xl:gap-8 @2xl:p-8">
                <div className="min-w-0 flex-1">{children}</div>
                <CloudinaryImage
                    src={image}
                    alt=""
                    className={`hidden shrink-0 @2xl:block ${imageClassName}`}
                    imgClassName="h-auto w-full"
                />
            </div>
        </div>
    </div>
)

const HeroQuote = ({ people }: { people: HeroPerson[] }): JSX.Element => {
    const prefersReducedMotion = usePrefersReducedMotion()
    const [index, setIndex] = useState(0)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        if (prefersReducedMotion || paused || people.length < 2) return
        const timer = setInterval(() => setIndex((i) => (i + 1) % people.length), HERO_ROTATE_MS)
        return () => clearInterval(timer)
    }, [people.length, prefersReducedMotion, paused])

    const step = (delta: number) => setIndex((i) => (i + delta + people.length) % people.length)
    const person = people[index]

    return (
        <HogCard
            image={HOG_IMAGE}
            imageClassName="@2xl:w-56"
            className="mb-6"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            <h1 className="mb-1 text-2xl font-bold tracking-tight">Customers</h1>
            <p className="mb-5 text-base text-secondary">
                We build for{' '}
                <RoughAnnotation type="highlight" color="rgba(48, 164, 108, 0.2)" strokeWidth={1} padding={2}>
                    <Link to="/handbook/who-we-build-for" className="underline">
                        AI-pilled software teams
                    </Link>
                </RoughAnnotation>
                . Here are some of them.
            </p>

            {person && (
                <div key={`${person.customer.slug}-${person.author}`} className="motion-safe:animate-slide-up-fade-in">
                    <blockquote className="m-0 border-l-0 p-0 not-italic">
                        <p className="mb-4 text-balance text-2xl font-bold leading-tight tracking-tight @2xl:text-4xl">
                            &ldquo;{person.text}&rdquo;
                        </p>
                    </blockquote>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <div className="flex items-center gap-2">
                            {person.image?.thumb && (
                                <div className="size-9 overflow-hidden rounded-full bg-accent">
                                    <CloudinaryImage
                                        src={person.image.thumb as `https://res.cloudinary.com/${string}`}
                                        alt={person.name}
                                        imgClassName="size-9 object-cover object-center"
                                    />
                                </div>
                            )}
                            <p className="m-0 text-sm text-secondary">
                                <span className="font-semibold text-primary">{person.name}</span>, {person.role}
                                <span className="sr-only"> at {person.customer.name}</span>
                            </p>
                        </div>
                        <div className="flex h-8 items-center border-l border-primary pl-4">
                            <CustomerLogo customer={person.customer} className="h-6 max-w-40" />
                        </div>
                    </div>
                </div>
            )}

            {people.length > 1 && (
                <div className="mt-5 flex items-center gap-3">
                    <OSButton
                        variant="secondary"
                        size="sm"
                        icon={<IconChevronLeft className="size-4" />}
                        onClick={() => step(-1)}
                        aria-label="Previous quote"
                    />
                    <div className="flex items-center gap-1.5">
                        {people.map((p, i) => (
                            <button
                                key={`${p.customer.slug}-${p.author}`}
                                type="button"
                                onClick={() => setIndex(i)}
                                aria-label={`Show quote ${i + 1} of ${people.length}`}
                                aria-current={i === index}
                                className={`size-2.5 rounded-full border transition-colors ${
                                    i === index
                                        ? 'border-red bg-red dark:border-yellow dark:bg-yellow'
                                        : 'border-primary hover:bg-accent'
                                }`}
                            />
                        ))}
                    </div>
                    <OSButton
                        variant="secondary"
                        size="sm"
                        icon={<IconChevronRight className="size-4" />}
                        onClick={() => step(1)}
                        aria-label="Next quote"
                    />
                </div>
            )}
        </HogCard>
    )
}

interface Story {
    fields: { slug: string }
    frontmatter: { title: string; date: string }
}

const LatestCaseStudy = ({ story }: { story: Story }): JSX.Element => {
    const { customers } = useCustomers()
    const customer = customers[story.fields.slug.split('/').pop() || '']

    return (
        <HogCard image={NEWSPAPER_HOG_IMAGE} imageClassName="@2xl:w-40" className="mt-3">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight">
                <StickerCoffee className="size-8 -rotate-6" aria-hidden />
                Hot off the press
            </h2>
            <Link
                to={story.fields.slug}
                state={{ newWindow: true }}
                className="mb-4 block text-balance text-2xl font-bold leading-tight tracking-tight text-primary hover:underline @2xl:text-3xl"
            >
                {story.frontmatter.title}
            </Link>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {customer && (
                    <div className="flex h-8 items-center border-r border-primary pr-4">
                        <CustomerLogo customer={customer} className="h-6 max-w-40" />
                    </div>
                )}
                <span className="text-sm text-secondary">{story.frontmatter.date}</span>
                <OSButton
                    asLink
                    to={story.fields.slug}
                    state={{ newWindow: true }}
                    variant="primary"
                    size="sm"
                    className="ml-auto"
                >
                    Read the story
                </OSButton>
            </div>
        </HogCard>
    )
}

const StoryLink = ({
    customer,
    className = '',
    children,
}: {
    customer: CustomerType
    className?: string
    children: React.ReactNode
}) => (
    <Link to={storyUrl(customer)} state={{ newWindow: true }} className={`group ${className}`}>
        {children} <IconArrowUpRight className="inline-block size-4 text-muted group-hover:text-primary" />
    </Link>
)

const QuoteCard = ({ person, stat, label }: { person: HeroPerson; stat: string; label: string }) => (
    <figure className="m-0 flex flex-col gap-3 border-l border-t border-primary p-5 @2xl:p-6">
        <div className="flex items-start justify-between gap-3">
            <div>
                <p className="m-0 text-3xl font-bold leading-none tracking-tight text-primary @2xl:text-4xl">{stat}</p>
                <p className="m-0 mt-1 text-sm text-secondary">{label}</p>
            </div>
            <div className="flex h-6 shrink-0 items-center">
                <CustomerLogo customer={person.customer} className="h-5 max-w-24" />
            </div>
        </div>
        <blockquote className="m-0 border-l-0 p-0 text-sm not-italic leading-snug text-primary">
            &ldquo;{person.text}&rdquo;
        </blockquote>
        <figcaption className="mt-auto pt-2">
            <StoryLink customer={person.customer} className="text-sm font-semibold">
                Read the story
            </StoryLink>
        </figcaption>
    </figure>
)

const LogoWall = ({ customers }: { customers: CustomerType[] }) => (
    <div className="grid grid-cols-2 gap-2 @xl:grid-cols-3 @3xl:grid-cols-6">
        {customers.map((customer) => (
            <Tooltip
                key={customer.slug}
                delay={0}
                className="flex"
                trigger={
                    <div
                        tabIndex={0}
                        className="flex h-20 flex-1 items-center justify-center rounded border border-primary bg-light p-3 outline-none focus-visible:ring-2 focus-visible:ring-red dark:bg-dark"
                    >
                        <CustomerLogo customer={customer} className="h-7 max-w-full" />
                    </div>
                }
            >
                <p className="m-0 text-sm">
                    {customer.notes || customer.name}
                    {customer.yc && <span className="text-secondary"> · YC {customer.yc}</span>}
                </p>
            </Tooltip>
        ))}
    </div>
)

const customerRow = (customer: CustomerType) => ({
    key: customer.name,
    cells: [
        {
            content: (
                <div className="flex h-8 items-center">
                    <Link
                        to={storyUrl(customer)}
                        state={{ newWindow: true }}
                        wrapperClassName="flex max-w-full"
                        className="inline-flex h-full max-w-full items-center"
                    >
                        <CustomerLogo customer={customer} className="h-6 max-w-full" />
                    </Link>
                </div>
            ),
            className: '!p-4',
        },
        {
            content: (
                <span title={customer.toolsUsed?.join(', ')}>
                    {customer.toolsUsed?.slice(0, TOOLS_SHOWN).join(', ')}
                    {(customer.toolsUsed?.length || 0) > TOOLS_SHOWN && ', …'}
                </span>
            ),
            className: 'text-sm',
        },
        {
            content: (
                <StoryLink customer={customer} className="inline-flex h-full items-center">
                    Link
                </StoryLink>
            ),
        },
        {
            content: (
                <div className="flex flex-col gap-1">
                    {customer.notes}
                    {customer.yc && (
                        <span className="text-xs font-semibold uppercase tracking-wide leading-none text-orange dark:text-orange-dark">
                            YC {customer.yc}
                        </span>
                    )}
                </div>
            ),
            className: 'text-sm',
        },
    ],
})

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
    { name: 'Company name', width: 'minmax(120px,180px)', align: 'left' as const },
    { name: 'Product(s) used', width: 'minmax(auto,250px)', align: 'left' },
    { name: 'Case study', width: 'minmax(auto,100px)', align: 'center' as const },
    { name: 'Notes', width: 'minmax(180px,1fr)', align: 'left' as const },
]

export default function Customers(): JSX.Element {
    const { customers: allCustomers } = useCustomers()
    const customers = sortCustomers(Object.values(allCustomers))
    const tableCustomers = customers.filter(hasStory)
    const noStoryYet = customers.filter((customer) => !hasStory(customer))
    const [filteredCustomers, setFilteredCustomers] = useState<CustomerType[]>(tableCustomers)
    const [role, setRole] = useState(ROLES[0].label)

    const { stories } = useStaticQuery(graphql`
        query {
            stories: allMdx(
                filter: { fields: { slug: { regex: "/^/customers/" } } }
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 1
            ) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date(formatString: "MMMM D, YYYY")
                    }
                }
            }
        }
    `)
    const [latestStory]: Story[] = stories.nodes

    const heroPeople = HERO_QUOTES.flatMap((source) => resolveQuote(allCustomers, source) ?? [])
    const roleResults = ROLE_RESULTS.filter((result) => result.role === role).flatMap(({ stat, label, ...source }) => {
        const person = resolveQuote(allCustomers, source)
        return person ? [{ person, stat, label }] : []
    })

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

                    <CustomerLogos
                        title="And a few hundred thousand more"
                        subtitle="from a weekend project to the UK Government"
                        scrolling
                        reverse
                        hideLink
                        linkStories
                    />

                    <SectionLayout>
                        <SectionHeader>
                            <h2 className="mb-0 text-xl">Who brings PostHog in?</h2>
                            <p className="mb-0 mt-1 text-base text-secondary">
                                An engineer, usually. Then everybody else.
                            </p>
                        </SectionHeader>
                        <div className="paper-desk overflow-hidden rounded-lg border border-primary">
                            <div className="flex flex-col gap-2 p-4 @2xl:flex-row @2xl:items-center @2xl:gap-4 @2xl:px-6">
                                <div className="w-full max-w-md shrink-0">
                                    <ToggleGroup
                                        title="Filter by role"
                                        hideTitle
                                        value={role}
                                        onValueChange={setRole}
                                        options={ROLES.map(({ label }) => ({ label, value: label }))}
                                    />
                                </div>
                                <p className="m-0 text-sm text-secondary">
                                    {ROLES.find(({ label }) => label === role)?.blurb}
                                </p>
                            </div>
                            {/* Cells draw a top and left border. The negative margin hides the outer ones under the panel border */}
                            <div className="-ml-px -mt-px grid grid-cols-1 @3xl:grid-cols-3">
                                {roleResults.map(({ person, stat, label }) => (
                                    <QuoteCard key={person.customer.slug} person={person} stat={stat} label={label} />
                                ))}
                            </div>
                        </div>
                    </SectionLayout>

                    <SectionLayout className="!mb-4">
                        <SectionHeader>
                            <h2 className="mb-0 text-xl">Every case study, in a table</h2>
                            <p className="mb-0 mt-1 text-base text-secondary">
                                Filter it to read how they use different products.
                            </p>
                        </SectionHeader>
                        <ViewerFilters
                            availableFilters={[
                                {
                                    label: 'Product',
                                    options: [
                                        { label: 'Any', value: undefined },
                                        ...Array.from(
                                            new Set(tableCustomers.flatMap((customer) => customer.toolsUsed ?? []))
                                        ).map((tool) => ({
                                            label: tool,
                                            value: tool,
                                        })),
                                    ],
                                    filter: (obj, value) => obj['toolsUsed']?.includes(value),
                                    operator: 'includes',
                                },
                                {
                                    label: 'YC alum',
                                    options: [
                                        { label: 'Any', value: undefined },
                                        { label: 'Yes', value: true },
                                        { label: 'No', value: false },
                                    ],
                                    filter: (obj, value) => !!obj.yc === value,
                                    operator: 'equals',
                                },
                            ]}
                            dataToFilter={tableCustomers}
                            onFilterChange={(filtered) => setFilteredCustomers(sortCustomers(filtered))}
                        />
                        <OSTable
                            className="mt-2"
                            columns={columns}
                            width="full"
                            rows={filteredCustomers.map(customerRow)}
                        />
                    </SectionLayout>

                    {latestStory && <LatestCaseStudy story={latestStory} />}

                    {noStoryYet.length > 0 && (
                        <SectionLayout>
                            <SectionHeader>
                                <h2 className="mb-0 text-xl">Also on PostHog</h2>
                                <p className="mb-0 mt-1 text-base text-secondary">
                                    No case study yet. Hover a logo to read what they build.
                                </p>
                            </SectionHeader>
                            <LogoWall customers={noStoryYet} />
                        </SectionLayout>
                    )}
                </div>
            </ReaderView>
        </>
    )
}
