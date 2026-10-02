import React, { useRef } from 'react'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import { SEO } from 'components/seo'
import Tooltip from 'components/RadixUI/Tooltip'
import CloudinaryImage from 'components/CloudinaryImage'
import Editor from 'components/Editor'
import { graphql, useStaticQuery } from 'gatsby'
import { ScrollToElement } from 'components/ScrollToElement'
import OSTable from 'components/OSTable'
import { ChoppyReveal } from 'components/Code/ChoppyReveal'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { Receipt } from 'components/Code/Receipt'
import { SignalsCallout, type CalloutItem } from 'components/Code/SignalsCallout'
import { DottedConnection } from 'components/Code/DottedConnection'
import { InlineIcon } from 'components/ReplayVision/sectionHelpers'
import {
    StickerPath,
    StickerTerminal,
    StickerELearning,
    StickerServers,
    StickerPalmTree,
} from 'components/Stickers/Stickers'
import { WINDOW_BG } from '../../constants/frostedSurfaces'
import {
    IconArrowRightDown,
    IconArrowUpRight,
    IconCheck,
    IconPeople,
    IconReceipt,
    IconHandMoney,
    IconSupport,
    IconDatabase,
    IconServer,
    IconStack,
    IconCloud,
    IconLetter,
    IconPlug,
} from '@posthog/icons'

// The sources box for the integration section, same component as the "Signals" box on /desktop.
const INTEGRATION_SOURCES: CalloutItem[] = [
    { label: 'Stripe', icon: IconReceipt, color: 'text-purple' },
    { label: 'Hubspot', icon: IconHandMoney, color: 'text-orange' },
    { label: 'Zendesk', icon: IconSupport, color: 'text-green' },
    { label: 'Postgres', icon: IconDatabase, color: 'text-blue' },
    { label: 'Snowflake', icon: IconServer, color: 'text-blue' },
    { label: 'BigQuery', icon: IconStack, color: 'text-red' },
    { label: 'Salesforce', icon: IconPeople, color: 'text-blue' },
    { label: 'S3', icon: IconCloud, color: 'text-orange' },
    { label: 'Customer.io', icon: IconLetter, color: 'text-yellow' },
    { label: 'Anything with an API', icon: IconPlug, color: 'text-green' },
]

const ServiceLink = ({ label, to }: { label: string; to: string }) => (
    <ScrollToElement targetId={to} as="span" className="group font-semibold cursor-pointer whitespace-nowrap underline">
        {label}
        <IconArrowRightDown className="inline-block size-4 invisible group-hover:visible" />
    </ScrollToElement>
)

const ServicesTable = () => {
    const columns = [
        { name: 'Service', width: '170px', align: 'left' as const },
        { name: 'What we do', width: '1fr', align: 'left' as const },
    ]

    const rows = [
        {
            cells: [
                {
                    content: <ServiceLink label="Managed migration" to="migration" />,
                },
                {
                    content: (
                        <ul className="-my-1">
                            <li>Move you from Amplitude, Mixpanel, Heap, LaunchDarkly, GA, or Pendo</li>
                            <li>We'll import your historic data and buy out existing contracts</li>
                        </ul>
                    ),
                },
            ],
        },
        {
            cells: [
                {
                    content: <ServiceLink label="Instrumentation" to="instrumentation" />,
                },
                {
                    content: (
                        <ul className="-my-1">
                            <li>SDK setup across your stack, event tracking, privacy compliance (HIPAA, SOC 2)</li>
                            <li>Initial dashboards, feature flags, and surveys</li>
                        </ul>
                    ),
                },
            ],
        },
        {
            cells: [
                {
                    content: <ServiceLink label="Training" to="training" />,
                },
                {
                    content: (
                        <ul className="-my-1">
                            <li>Best practices, team onboarding, and hands-on sessions</li>
                            <li>Remote by default, on-site available</li>
                        </ul>
                    ),
                },
            ],
        },
        {
            cells: [
                {
                    content: <ServiceLink label="Integration" to="integration" />,
                },
                {
                    content: (
                        <ul className="-my-1">
                            <li>Connect your data sources (Stripe, Snowflake, Hubspot, Zendesk)</li>
                            <li>Set up pipelines, destinations, and real-time workflows</li>
                        </ul>
                    ),
                },
            ],
        },
    ]

    return <OSTable columns={columns} rows={rows} size="md" rowAlignment="top" width="full" />
}

const MigrationVendors = () => {
    const vendors = [
        { name: 'Amplitude', url: '/docs/migrate/migrate-from-amplitude' },
        { name: 'Mixpanel', url: '/docs/migrate/mixpanel' },
        { name: 'Heap', url: '/docs/migrate/heap' },
        { name: 'LaunchDarkly', url: '/docs/migrate/launchdarkly' },
        { name: 'Google Analytics', url: '/docs/migrate/google-analytics' },
        { name: 'Pendo', url: '/docs/migrate/pendo' },
    ]

    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {vendors.map((vendor) => (
                <Link
                    key={vendor.name}
                    to={vendor.url}
                    className="group inline-flex items-center  text-sm  whitespace-nowrap"
                    state={{ newWindow: true }}
                >
                    {vendor.name}
                    <IconArrowUpRight className="inline-block size-4 opacity-30 group-hover:opacity-75" />
                </Link>
            ))}
        </div>
    )
}

// Deliverables list with the same green check treatment as "Sound familiar?" on /desktop.
const Deliverables = ({ items }: { items: React.ReactNode[] }) => (
    <ul className="list-none !p-0 !my-0 space-y-2 not-prose">
        {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
                <IconCheck className="relative top-0.5 size-5 shrink-0 text-green" />
                <span className="text-base">{item}</span>
            </li>
        ))}
    </ul>
)

/**
 * One service section, in the style of "The old way" / "The PostHog way" on /desktop:
 * a sticker in the heading, a word-by-word lead with hand-drawn annotations, and a
 * card floated right with a hog peeking out from behind it. On narrow windows the
 * card drops inline under the lead.
 */
const ServiceSection = ({
    id,
    title,
    sticker,
    stickerClassName = '',
    lead,
    card,
    image,
    imageAlt = '',
    imageClassName = '',
    imagePosition = '-bottom-4 right-0',
    connectFrom,
    children,
}: {
    id: string
    title: string
    sticker: React.ComponentType<{ className?: string }>
    stickerClassName?: string
    lead: React.ReactNode
    /** The object floated right of the text. Without one, the hog itself floats there. */
    card?: React.ReactNode
    image?: `https://res.cloudinary.com/${string}`
    imageAlt?: string
    /** Width and any decoration for the hog (rotation, rounding). Position is set per layout below. */
    imageClassName?: string
    /** Where the hog sits relative to the card on wide windows. */
    imagePosition?: string
    /** A word in the lead to join to the card with a dotted line, like "signals" on /desktop. */
    connectFrom?: React.RefObject<HTMLElement>
    children: React.ReactNode
}) => {
    const sectionRef = useRef<HTMLElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)
    const hog = (position: string) =>
        image ? (
            <CloudinaryImage
                src={image}
                alt={imageAlt}
                width={320}
                className={`absolute z-0 pointer-events-none ${imageClassName} ${position}`}
                imgClassName="w-full h-auto"
            />
        ) : null
    return (
        <section
            id={id}
            ref={sectionRef}
            className="@container relative scroll-mt-20 border-t border-primary pt-6 mt-10"
        >
            {card ? (
                /* Wide: the card and the hog share one float box, so text wraps around both. */
                <div
                    className={`hidden @xl:block float-right ml-8 mb-2 w-[300px] @2xl:w-[340px] relative ${
                        image ? 'pb-16' : ''
                    }`}
                >
                    <div ref={cardRef} className="relative z-10">
                        {card}
                    </div>
                    {hog(imagePosition)}
                </div>
            ) : image ? (
                /* A plain img: CloudinaryImage drops the layout classes when the URL carries transformations. */
                <img
                    src={image}
                    alt={imageAlt}
                    className={`float-right ml-6 mb-2 w-28 @xl:w-44 h-auto ${imageClassName}`}
                />
            ) : null}

            <h3 className="!mt-0 text-2xl">
                <InlineIcon icon={sticker} className={`!size-9 !top-2 ${stickerClassName}`} /> {title}
            </h3>

            <p className="text-base leading-loose mb-5">
                <ChoppyReveal wordDelay={30}>{lead}</ChoppyReveal>
            </p>

            {card && (
                /* Narrow: the card sits inline under the lead, the hog tucked at its bottom-right corner. */
                <div className={`@xl:hidden relative mb-5 ${image ? 'pb-20' : ''}`}>
                    <div className="relative z-10">{card}</div>
                    {hog('-bottom-2 right-0')}
                </div>
            )}

            {children}
            <div className="clear-both" />

            {connectFrom && (
                <DottedConnection sourceRef={connectFrom} targetRef={cardRef} containerRef={sectionRef} desktopOnly />
            )}
        </section>
    )
}

// A card with a heading, a line of copy, and a hog at the bottom. Same shape as the
// "So, what's left for you?" cards on /self-driving.
const HogCard = ({
    heading,
    copy,
    image,
    alt,
}: {
    heading: string
    copy: React.ReactNode
    image: `https://res.cloudinary.com/${string}`
    alt: string
}) => (
    <div className={`flex flex-col overflow-hidden rounded-md border border-primary ${WINDOW_BG}`}>
        <div className="p-4">
            <p className="m-0 text-base font-bold text-primary">{heading}</p>
            <p className="m-0 mt-1 text-[15px] text-secondary">{copy}</p>
        </div>
        <div className="mt-auto px-6 pt-2">
            <CloudinaryImage src={image} alt={alt} width={400} className="w-full !block" imgClassName="w-full !block" />
        </div>
    </div>
)

const regionName = (code: string): string => {
    try {
        return new Intl.DisplayNames(['en'], { type: 'region' }).of(code.toUpperCase()) || ''
    } catch {
        return ''
    }
}

// The FDE team, as the overlapping avatar strip. Hover a face for the name and location.
const TeamAvatars = () => {
    const { allTeams } = useStaticQuery(graphql`
        {
            allTeams: allSqueakTeam {
                nodes {
                    id
                    name
                    slug
                    profiles {
                        data {
                            id
                            attributes {
                                color
                                firstName
                                lastName
                                companyRole
                                location
                                country
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
                    leadProfiles {
                        data {
                            id
                        }
                    }
                }
            }
        }
    `)

    const team = allTeams.nodes.find((t: any) => t.slug === 'forward-deployed-engineering')
    const profiles = team?.profiles?.data || []
    const leadProfiles = team?.leadProfiles?.data || []

    if (profiles.length === 0) return null

    const isLead = (id: string | number) =>
        leadProfiles.some(({ id: leadID }: { id: string | number }) => String(leadID) === String(id))

    const sortedProfiles = profiles.slice().sort((a: any, b: any) => {
        const aIsLead = isLead(a.id)
        const bIsLead = isLead(b.id)
        if (aIsLead !== bIsLead) return aIsLead ? -1 : 1
        return (a.attributes.firstName || '').localeCompare(b.attributes.firstName || '')
    })

    return (
        <div className="flex flex-wrap justify-end ml-3 mb-2" dir="rtl">
            {sortedProfiles
                .slice()
                .reverse()
                .map(
                    ({
                        id,
                        attributes: { firstName, lastName, companyRole, location, country, avatar, color },
                    }: any) => {
                        const name = [firstName, lastName].filter(Boolean).join(' ')
                        const place = location || (country && country !== 'world' ? regionName(country) : '')
                        return (
                            <span
                                key={id}
                                className={`visible cursor-default -ml-3 relative hover:z-10 transform scale-100 hover:scale-125 transition-all rounded-full border-1 ${
                                    isLead(id) ? 'border-yellow dark:border-yellow' : 'border-primary'
                                }`}
                            >
                                <Tooltip
                                    trigger={
                                        <Link to={`/community/profiles/${id}`} state={{ newWindow: true }}>
                                            <img
                                                src={avatar?.data?.attributes?.url}
                                                className={`size-12 rounded-full bg-${
                                                    color ?? 'accent'
                                                } border border-light dark:border-dark`}
                                                alt={name}
                                            />
                                        </Link>
                                    }
                                    side="bottom"
                                    delay={0}
                                >
                                    <span dir="ltr" className="block text-left">
                                        <strong>{name}</strong>
                                        {isLead(id) ? ' (Team lead)' : ''}
                                        <br />
                                        <span className="text-secondary text-sm">
                                            {[companyRole, place].filter(Boolean).join(' · ')}
                                        </span>
                                    </span>
                                </Tooltip>
                            </span>
                        )
                    }
                )}
        </div>
    )
}

const initialContactValues = {
    talk_about: "I'd like to learn more about PostHog's forward deployed engineering services.",
}

const QuoteCTA = ({ className = '', width }: { className?: string; width?: 'auto' | 'full' }) => (
    <CallToAction
        href="/talk-to-a-human"
        type="primary"
        size="md"
        state={{ newWindow: true, initialValues: initialContactValues }}
        width={width}
        className={className}
    >
        Get a custom quote
    </CallToAction>
)

const GreenHighlight = ({ children }: { children: React.ReactNode }) => (
    <RoughAnnotation type="highlight" color="rgba(48, 164, 108, 0.2)" strokeWidth={1} padding={2} multiline>
        {children}
    </RoughAnnotation>
)

export const ProfessionalServices = () => {
    const sourcesWordRef = useRef<HTMLSpanElement>(null)
    return (
        <>
            <SEO
                title="Services - PostHog"
                description="Forward-deployed engineers to help you migrate, instrument, train, and integrate PostHog into your stack."
                image={`/images/og/deskhog.jpg`}
            />
            <Editor
                scrollable={false}
                maxWidth={900}
                proseSize="base"
                bookmark={{
                    title: 'Services',
                    description: 'Expert help for PostHog setup',
                }}
            >
                <h1 className="text-center @xl:text-left pt-8 mb-4">
                    Hire a{' '}
                    <RoughAnnotation
                        type="highlight"
                        color="rgba(48, 164, 108, 0.2)"
                        strokeWidth={1}
                        padding={2}
                        delay={300}
                        multiline
                        show
                    >
                        PostHog expert
                    </RoughAnnotation>
                </h1>

                <CloudinaryImage
                    quality={90}
                    placeholder="blurred"
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/posthog-ae.png"
                    width={436}
                    className="flex justify-center @xl:justify-start @xl:float-right rotate-1 @xl:ml-8 @xl:max-w-64 @2xl:max-w-80 mb-4"
                />

                <p className="text-lg !mt-0 mb-6 text-center @xl:text-left">
                    From complete installation packages to one-off projects,{' '}
                    <strong>PostHog's forward-deployed engineers are here to help.</strong>
                </p>

                <div className="mb-4">
                    <QuoteCTA width="full" className="@xl:hidden" />
                    <QuoteCTA className="hidden @xl:inline-flex" />
                </div>

                <p className="mb-12 text-center @xl:text-left">
                    Our FDEs do the hands-on engineering work in your codebase and your PostHog instance, and hand it back in a
                    state your team can run without us.
                </p>

                <h2 className="clear-both">How we can help</h2>
                <ServicesTable />

                <ServiceSection
                    id="migration"
                    title="Managed migration"
                    sticker={StickerPath}
                    stickerClassName="-rotate-3"
                    card={
                        <Receipt
                            title={
                                <>
                                    COME TO THE <s className="opacity-60">DARK</s> HOG SIDE
                                </>
                            }
                            subtitle="(your old tool's invoice, on us)"
                            rows={[
                                { label: 'old subscription', price: 'on us' },
                                { label: 'historic data import', price: 'included' },
                                { label: 'recreating same functionality', price: 'included' },
                            ]}
                            totalLabel="YOU PAY TWICE"
                        />
                    }
                    image="https://res.cloudinary.com/dmukukwp6/image/upload/hog_screens_965070a722.png"
                    imageAlt="A hedgehog carrying dashboards and charts"
                    imageClassName="w-32"
                    imagePosition="-bottom-2 left-0"
                    lead={
                        <>
                            {'Still paying for your '}
                            <RoughAnnotation type="underline" color="currentColor" strokeWidth={1.5}>
                                <em>old</em>
                            </RoughAnnotation>
                            {' dusty tool? We handle the entire migration, historic data included, and we '}
                            <GreenHighlight>
                                <strong>buy out your existing contract</strong>
                            </GreenHighlight>
                            {' so you can switch without paying twice.'}
                        </>
                    }
                >
                    <Deliverables
                        items={[
                            'Historic data imported and reconciled against the old tool',
                            'Event taxonomy mapped and documented',
                            'Core dashboards and functionality rebuilt in PostHog',
                        ]}
                    />
                    <p className="text-sm text-secondary !mb-2 mt-5">Guides for migration to PostHog from...</p>
                    <MigrationVendors />
                </ServiceSection>

                <ServiceSection
                    id="instrumentation"
                    title="Instrumentation"
                    sticker={StickerTerminal}
                    stickerClassName="rotate-2"
                    image="https://res.cloudinary.com/dmukukwp6/image/upload/w_520,c_scale,q_auto,f_auto/hog_engineer_0eebaf7af1.png"
                    imageAlt="A hedgehog engineer repairing a robot"
                    lead={
                        <>
                            {'Complex tracking? Privacy requirements? We set up PostHog '}
                            <GreenHighlight>
                                <strong>correctly the first time</strong>
                            </GreenHighlight>
                            {' (or fix your existing setup).'}
                        </>
                    }
                >
                    <Deliverables
                        items={[
                            <>
                                <strong>Tracking across surfaces:</strong> web, mobile, and backend, with identity wired
                                up between them
                            </>,
                            <>
                                <strong>Stay compliant:</strong> HIPAA BAA, SOC 2, and GDPR
                            </>,
                            <>
                                <strong>Event tracking plan:</strong> the events that matter, named and documented, so
                                you only pay for what matters
                            </>,
                            <>
                                <strong>Initial dashboards, feature flags, and surveys</strong> configured to your specs
                            </>,
                            <>
                                <strong>An audit report</strong> of what was wrong, what we changed, and what to watch
                            </>,
                        ]}
                    />
                </ServiceSection>

                <ServiceSection
                    id="training"
                    title="Training"
                    sticker={StickerELearning}
                    stickerClassName="-rotate-2"
                    image="https://res.cloudinary.com/dmukukwp6/image/upload/w_520,c_scale/e_make_transparent:20/e_trim/posthog.com/contents/images/newsletter/feature-images/teacher.png"
                    imageAlt="A hedgehog in a graduation cap holding a stack of books"
                    lead={
                        <>
                            {'Your team will know their analytics from their elbows, with '}
                            <RoughAnnotation type="box" color="currentColor" strokeWidth={1} padding={2}>
                                <strong className="inline-block">minimal meetings</strong>
                            </RoughAnnotation>
                            {'. Remote by default, '}
                            <RoughAnnotation type="underline" color="#30A46C" strokeWidth={2}>
                                <em>on-site if you want it</em>
                            </RoughAnnotation>
                            {', hedgehog stickers included.'}
                        </>
                    }
                >
                    <Deliverables
                        items={[
                            <>
                                <strong>Hands-on sessions</strong> built around your data and your questions, not a
                                generic deck
                            </>,
                            <>
                                <strong>Remote by default:</strong> async docs, video calls, Slack support
                            </>,
                            <>
                                <strong>On-site available</strong> if you want face-to-face sessions (we'll travel)
                            </>,
                            <>
                                <strong>Merch included,</strong> because everyone deserves a hedgehog sticker
                            </>,
                        ]}
                    />
                </ServiceSection>

                <ServiceSection
                    id="integration"
                    title="Integration"
                    sticker={StickerServers}
                    stickerClassName="rotate-3"
                    card={<SignalsCallout title="Sources" items={INTEGRATION_SOURCES} className="@xl:my-4" />}
                    connectFrom={sourcesWordRef}
                    lead={
                        <>
                            {'Whatever tools you use, we get your '}
                            <span ref={sourcesWordRef}>
                                <GreenHighlight>
                                    <strong>sources</strong>
                                </GreenHighlight>
                            </span>
                            {' talking to PostHog, joined to your product data in '}
                            <RoughAnnotation type="underline" color="#30A46C" strokeWidth={2}>
                                <em>one warehouse</em>
                            </RoughAnnotation>
                            {' your team can query.'}
                        </>
                    }
                >
                    <Deliverables
                        items={[
                            <>
                                <Link to="/context-warehouse/sources" state={{ newWindow: true }}>
                                    <strong>Data sources</strong>
                                </Link>{' '}
                                pulled in and joined to your product data
                            </>,
                            <>
                                <Link to="/cdp" state={{ newWindow: true }}>
                                    <strong>Pipeline destinations</strong>
                                </Link>{' '}
                                pushing to your CRM, data warehouse, or anywhere else
                            </>,
                            <>
                                <Link to="/workflows" state={{ newWindow: true }}>
                                    <strong>Workflows</strong>
                                </Link>{' '}
                                that trigger real-time actions based on user behavior
                            </>,
                            <>
                                <strong>A data model your team can extend</strong> without re-learning how it was built
                            </>,
                        ]}
                    />
                </ServiceSection>

                <section id="remote-or-on-site" className="@container scroll-mt-20 border-t border-primary pt-6 mt-10">
                    <h3 className="!mt-0 text-2xl">
                        <InlineIcon icon={StickerPalmTree} className="!size-9 !top-2 rotate-3" /> Remote by default,
                        on-site when it counts
                    </h3>
                    <p className="text-base leading-loose mb-5">
                        <ChoppyReveal wordDelay={30}>
                            {'PostHog is a '}
                            <GreenHighlight>
                                <strong>100% remote company</strong>
                            </GreenHighlight>
                            {'. Doing things well '}
                            <code className="font-mono text-[0.9em] bg-blue/10 border border-blue rounded-sm px-1 leading-normal inline-block">
                                async
                            </code>
                            {
                                " is in our DNA! But we also love to meet our customers face to face, and when it counts, we can travel to your office, look over your engineers' shoulders, make the code changes together, and run the training "
                            }
                            <RoughAnnotation type="underline" color="#30A46C" strokeWidth={2}>
                                <em>in person</em>
                            </RoughAnnotation>
                            {'.'}
                        </ChoppyReveal>
                    </p>
                </section>

                <h2>Sooo, how does it work?</h2>
                <div className="not-prose grid grid-cols-1 @md:grid-cols-3 gap-3 my-6">
                    <HogCard
                        heading="1. Tell us what you need"
                        copy="A quick call or an email thread. You tell us what's going on, we come back with a detailed scope and a quote. Free."
                        image="https://res.cloudinary.com/dmukukwp6/image/upload/w_500,c_limit,q_auto,f_auto/hog_head_point_b6a2ffb400.png"
                        alt="A hedgehog pointing to the side"
                    />
                    <HogCard
                        heading="2. We do the work"
                        copy="A dedicated engineer owns it end to end, with a weekly sync and a written update. You review, we iterate."
                        image="https://res.cloudinary.com/dmukukwp6/image/upload/hog_head_laptop_2afc8d8955.png"
                        alt="A hedgehog working at a laptop"
                    />
                    <HogCard
                        heading="3. You take it from here"
                        copy="Approved by a named person on your side, follow-ups written down, and your team able to run it without us."
                        image="https://res.cloudinary.com/dmukukwp6/image/upload/hog_head_popcorn_82aa11ea69.png"
                        alt="A hedgehog eating popcorn"
                    />
                </div>

                <p>Our Forward Deployed Engineers are waiting to judge your implementation (don't be scared).</p>
                <TeamAvatars />

                <h2>Pricing</h2>
                <p>
                    Pricing is based on the scope of work and <strong>quoted per milestone deliverable</strong>, not per
                    hour, with a <strong>$5k minimum.</strong> A deliverable that doubles in scope gets a new quote, not
                    a surprise invoice.
                </p>
                <ul>
                    <li>Discovery and scoping before an engagement are free.</li>
                    <li>You get a quote within a day or two of the scoping call.</li>
                    <li>
                        For migrations, we'll also buy out the remainder of your existing contract where it makes sense.
                    </li>
                </ul>
                <h3>Out of budget?</h3>
                <p>
                    PostHog remains self-serve, and our{' '}
                    <Link to="/docs/ai-engineering/ai-wizard" state={{ newWindow: true }}>
                        AI wizard
                    </Link>{' '}
                    can already do a lot of this for you, even if you're not hog-pilled yet. The FDE team is for when
                    you don't have the resources or the time to do it yourself. If you're just looking for a human to
                    talk to, the{' '}
                    <Link to="/merch?product=30-min-onboarding-consultation" state={{ newWindow: true }}>
                        30-minute consultation for $80
                    </Link>{' '}
                    (a separate thing) might be right for you.
                </p>

                {/* Final CTA */}
                <div className="border-t border-primary pt-8 mt-8 pb-16">
                    <h2 className="!mt-0">Ready to get started?</h2>
                    <p>
                        Tell us what you're trying to accomplish. We'll figure out the scope together and get you a
                        quote within a day or two.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <QuoteCTA />
                        <CallToAction
                            href="/blog/forward-deployed-engineer"
                            type="secondary"
                            size="md"
                            state={{ newWindow: true }}
                        >
                            What's an FDE?
                        </CallToAction>
                    </div>
                </div>
            </Editor>
        </>
    )
}

export default ProfessionalServices
