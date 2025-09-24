import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

// Import PNG logos (not converted to React components)
import AirbusLogo from '../components/CustomerLogos/AirbusLogo'
import AssemblyAILogo from '../components/CustomerLogos/AssemblyAILogo'
import BrainboardLogo from '../components/CustomerLogos/BrainboardLogo'
import CarVerticalLogo from '../components/CustomerLogos/CarVerticalLogo'
import ContraLogo from '../components/CustomerLogos/ContraLogo'
import CreatifyLogo from '../images/customers/creatify-light.png'
import CreatifyLogoDark from '../images/customers/creatify-dark.png'
import DHLLogo from '../components/CustomerLogos/DHLLogo'
import ElevenLabsLogo from '../components/CustomerLogos/ElevenLabsLogo'
import GanksterLogo from '../components/CustomerLogos/GanksterLogo'
import HasuraLogo from '../components/CustomerLogos/HasuraLogo'
import HeadshotProLogo from '../components/CustomerLogos/HeadshotProLogo'
import HeygenLogo from '../components/CustomerLogos/HeygenLogo'
import HostAILogo from '../components/CustomerLogos/HostAILogo'
import JuiceboxLogo from '../components/CustomerLogos/JuiceboxLogo'
import LovableLogo from 'components/CustomerLogos/LovableLogo'
import MentionMeLogo from '../components/CustomerLogos/MentionMeLogo'
import MistralAILogo from '../components/CustomerLogos/MistralAILogo'
import MintlifyLogo from '../components/CustomerLogos/MintlifyLogo'
import NetdataLogo from '../components/CustomerLogos/NetdataLogo'
import OpenSaucedLogo from '../components/CustomerLogos/OpenSaucedLogo'
import PhantomLogo from '../components/CustomerLogos/PhantomLogo'
import PostHogLogo from '../components/CustomerLogos/PostHogLogo'
import PryLogo from '../components/CustomerLogos/PryLogo'
import PurpleWaveLogo from '../components/CustomerLogos/PurpleWaveLogo'
import QredLogo from '../components/CustomerLogos/QredLogo'
import RaycastLogo from '../components/CustomerLogos/RaycastLogo'
import ResearchGateLogo from '../components/CustomerLogos/ResearchGateLogo'
import SignificaLogo from '../components/CustomerLogos/SignificaLogo'
import SpeakeasyLogo from '../components/CustomerLogos/SpeakeasyLogo'
import SquadSVenturesLogo from '../components/CustomerLogos/SquadSVenturesLogo'
import StartEngineLogo from '../components/CustomerLogos/StartEngineLogo'
import SupabaseLogo from '../components/CustomerLogos/SupabaseLogo'
import TrustWalletLogo from '../components/CustomerLogos/TrustWalletLogo'
import VendastaLogo from '../components/CustomerLogos/VendastaLogo'
import WebshareLogo from '../components/CustomerLogos/WebshareLogo'
import WittyWorksLogo from '../components/CustomerLogos/WittyWorksLogo'
import YCombinatorLogo from '../components/CustomerLogos/YCombinatorLogo'
import ZealotLogo from '../images/customers/zealot-light.png'
import ZealotLogoDark from '../images/customers/zealot-dark.png'
import Link from 'components/Link'
import useProducts from './useProducts'

export interface Customer {
    slug: string
    name: string
    toolsUsed: string[]
    toolsUsedHandles?: string[] // Original handles for product lookup
    industries?: string[]
    users?: string[]
    notes?: React.ReactNode
    logo?:
        | React.ComponentType<any>
        | {
              light: string
              dark: string
          }
    height?: number
    quotes?: Record<
        string,
        {
            name: string
            role: string
            image: {
                thumb: string
                url?: string
            }
            products: Record<string, string>
        }
    >
    featured: boolean
    hasCaseStudy: boolean // Now always populated dynamically
}

interface BaseCustomer {
    name: string
    toolsUsed: string[]
    industries?: string[]
    users?: string[]
    notes?: React.ReactNode
    logo?:
        | React.ComponentType<any>
        | {
              light: string
              dark: string
          }
    legacyLogo?: string // Temporary until SVG component created
    legacyLogoDark?: string // Temporary until SVG component created
    height?: number
    quotes?: Record<
        string,
        {
            name: string
            role: string
            image: {
                thumb: string
                url?: string
            }
            products: Record<string, string>
        }
    >
    featured: boolean
}

// Note: height needs to be a Tailwind class. Use /customers for reference as that's where it's balanced out.
// Product customer slides also use these, but use the value with a multiplier to make them larger for that slide.
const CUSTOMER_DATA: Record<string, BaseCustomer> = {
    '4dayweek': {
        name: '4DayWeek',
        toolsUsed: ['experiments', 'product_analytics'],
        industries: ['Recruitment'],
        users: ['Marketing', 'Leadership', 'Founders'],
        notes: 'Job board',
        featured: false,
        // logo: 4DayWeekLogo, // TODO: Create SVG component
        legacyLogo:
            'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/4dayweek/4dayweek-logo.png',
        legacyLogoDark:
            'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/4dayweek/4dayweek-logo-dark.png',
    },
    '11x': {
        name: '11x',
        toolsUsed: ['experiments', 'product_analytics', 'llm_analytics', 'cdp'],
        industries: ['AI'],
        users: ['Marketing', 'Leadership', 'Founders', 'Engineering'],
        notes: 'AI SDR',
        featured: false,
        // logo: 11xLogo, // TODO: Create SVG component
        legacyLogo: 'https://res.cloudinary.com/dmukukwp6/image/upload/11x_logo_light_8c7d326edb.png',
        legacyLogoDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/11x_logo_dark_0934407584.png',
    },
    adauris: {
        name: 'Adauris',
        toolsUsed: ['experiments', 'session_replay', 'product_analytics'],
        industries: ['SaaS', 'Publishing'],
        users: ['Growth', 'Engineering', 'Product', 'Marketing'],
        notes: 'Generative AI audio',
        featured: false,
        // logo: AdaurisLogo, // TODO: Create SVG component
        legacyLogo:
            'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/adauris/logo.png',
        legacyLogoDark:
            'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/adauris/logo-dark.png',
    },
    airbus: {
        name: 'Airbus',
        toolsUsed: [], // TODO: Add toolsUsed
        // industries: [], // TODO: Add industries
        // users: [], // TODO: Add users
        notes: 'They make airplanes',
        logo: AirbusLogo,
        height: 9,
        featured: true,
    },
    brainboard: {
        name: 'Brainboard',
        toolsUsed: ['experiments', 'product_analytics'],
        industries: ['SaaS', 'Devtool'],
        users: ['Product', 'Engineering', 'Growth', 'Marketing'],
        notes: 'Collaborative DevOps',
        logo: BrainboardLogo,
        featured: false,
        height: 14,
    },
    carvertical: {
        name: 'carVertical',
        toolsUsed: ['feature_flags', 'product_analytics'],
        industries: ['Recruitment'],
        users: ['Growth', 'Engineering', 'Product'],
        notes: 'Vehicle history reports',
        logo: CarVerticalLogo,
        featured: false,
        height: 10,
    },
    contra: {
        name: 'Contra',
        toolsUsed: ['feature_flags', 'session_replay', 'product_analytics'],
        industries: ['SaaS'],
        users: ['Product', 'Engineering'],
        notes: 'Creative freelance marketplace',
        logo: ContraLogo,
        featured: false,
        height: 8,
    },
    creatify: {
        name: 'Creatify',
        toolsUsed: ['web_analytics', 'product_analytics'],
        industries: ['AI'],
        users: ['Engineering', 'Leadership', 'Founders'],
        notes: 'AI video editor',
        logo: {
            light: CreatifyLogo,
            dark: CreatifyLogoDark,
        },
        height: 12,
        featured: false,
    },
    elevenlabs: {
        name: 'ElevenLabs',
        toolsUsed: ['feature_flags', 'product_analytics', 'surveys'],
        industries: ['AI'],
        users: ['Marketing', 'Growth', 'Engineering'],
        notes: 'AI voice generator',
        logo: ElevenLabsLogo,
        height: 8,
        featured: true,
    },
    'great-expectations': {
        name: 'Great Expectations',
        toolsUsed: ['product_analytics'],
        industries: ['SaaS', 'Data'],
        users: ['Growth', 'Engineering', 'Product', 'Marketing'],
        notes: 'Data quality SaaS platform',
        featured: false,
        // logo: GreatExpectationsLogo, // TODO: Create SVG component
        legacyLogo: 'https://res.cloudinary.com/dmukukwp6/image/upload/gx_logo_light_ce286f1955.png',
        legacyLogoDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/gx_logo_dark_5a1dba99f7.png',
    },
    groove: {
        name: 'Groove',
        toolsUsed: ['experiments', 'product_analytics', 'surveys'],
        industries: ['Support'],
        users: ['Engineering', 'Leadership', 'Founders'],
        notes: 'Help desk platform',
        featured: false,
        // logo: GrooveLogo, // TODO: Create SVG component
        legacyLogo:
            'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/groove/logo.png',
        legacyLogoDark:
            'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/groove/logo-dark.png',
    },
    hasura: {
        name: 'Hasura',
        toolsUsed: ['funnels', 'session_replay'],
        industries: ['Devtool'],
        users: ['Engineering', 'User Experience', 'Marketing'],
        notes: 'Open source GraphQL engine',
        logo: HasuraLogo,
        featured: true,
        height: 10,
    },
    headshotpro: {
        name: 'HeadshotPro',
        toolsUsed: ['data_warehouse', 'product_analytics'],
        industries: ['AI'],
        users: ['Growth', 'Engineering', 'Product'],
        notes: 'AI photo generator',
        logo: HeadshotProLogo,
        featured: false,
        height: 10,
    },
    heygen: {
        name: 'Heygen',
        toolsUsed: [], // TODO: Add toolsUsed
        // industries: [], // TODO: Add industries
        // users: [], // TODO: Add users
        notes: 'AI video editor',
        logo: HeygenLogo,
        featured: true,
        height: 8,
    },
    hostai: {
        name: 'HostAI',
        toolsUsed: ['feature_flags', 'product_analytics', 'llm_analytics'],
        industries: ['AI'],
        users: ['Engineering', 'Leadership', 'Founders'],
        notes: 'AI for vacation rentals managers',
        featured: false,
        logo: HostAILogo,
        height: 12,
    },
    lovable: {
        name: 'Lovable',
        toolsUsed: ['llm_analytics', 'experiments', 'feature_flags'],
        industries: ['Devtool'],
        users: ['Engineering'],
        notes: 'AI app & website builder',
        featured: true,
        logo: LovableLogo,
        height: 8,
    },
    juicebox: {
        name: 'Juicebox',
        toolsUsed: ['feature_flags', 'product_analytics', 'session_replay', 'llm_analytics'],
        industries: ['AI'],
        users: ['Engineering', 'Leadership', 'Founders'],
        notes: 'AI recruitment platform',
        featured: false,
        logo: JuiceboxLogo,
        height: 10,
    },
    'mention-me': {
        name: 'Mention Me',
        toolsUsed: ['funnels', 'session_replay'],
        industries: ['Marketing platform'],
        users: ['Product', 'Engineering', 'User Experience'],
        notes: 'Marketing referral campaigns',
        logo: MentionMeLogo,
        featured: false,
        height: 10,
    },
    mintlify: {
        name: 'Mintlify',
        toolsUsed: ['session_replay', 'api'],
        industries: ['SaaS', 'Devtool'],
        users: ['Leadership', 'Engineering', 'Product'],
        notes: 'Product and technical docs',
        logo: MintlifyLogo,
        featured: false,
        height: 10,
    },
    mistralai: {
        name: 'Mistral AI',
        toolsUsed: [], // TODO: Add toolsUsed
        // industries: [], // TODO: Add industries
        // users: [], // TODO: Add users
        notes: 'Open source LLMs',
        logo: MistralAILogo,
        height: 12,
        featured: true,
    },
    netdata: {
        name: 'Netdata',
        toolsUsed: ['session_replay', 'product_analytics'],
        industries: ['SaaS', 'Devtool'],
        users: ['Product', 'Engineering'],
        notes: 'Open source monitoring',
        logo: NetdataLogo,
        height: 8,
        featured: false,
    },
    octomind: {
        name: 'Octomind',
        toolsUsed: ['experiments', 'surveys', 'product_analytics', 'web_analytics'],
        industries: ['Devtool', 'SaaS'],
        users: ['Marketing'],
        notes: 'AI-powered end-to-end testing',
        featured: false,
        // logo: OctomindLogo, // TODO: Create SVG component
        legacyLogo: 'https://res.cloudinary.com/dmukukwp6/image/upload/octomind_logo_dark_a89deeee90.png',
        legacyLogoDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/octomind_logo_673e0ed777.png',
    },
    opensauced: {
        name: 'OpenSauced',
        toolsUsed: ['product_analytics'],
        industries: ['SaaS', 'Devtool'],
        users: ['Leadership', 'Investors', 'Founders', 'Marketing', 'Design', 'Engineering'],
        notes: 'Open source contribution tracker',
        logo: OpenSaucedLogo,
        featured: false,
        height: 10,
    },
    phantom: {
        name: 'Phantom',
        toolsUsed: ['data_warehouse', 'feature_flags'],
        industries: ['Cryptocurrency & blockchain'],
        users: ['Leadership', 'Product', 'Engineering'],
        notes: 'Crypto wallet',
        logo: PhantomLogo,
        featured: false,
        height: 10,
    },
    pry: {
        name: 'Pry',
        toolsUsed: ['product_analytics', 'funnels', 'session_replay', 'heatmaps'],
        industries: ['Financial planning software'],
        users: ['Leadership', 'Product', 'Engineering'],
        notes: 'Financial planning for SMBs, acquired by Brex',
        logo: PryLogo,
        height: 8,
        featured: false,
    },
    posthog: {
        name: 'PostHog',
        toolsUsed: [
            'web_analytics',
            'product_analytics',
            'session_replay',
            'feature_flags',
            'experiments',
            'surveys',
            'data_warehouse',
            'error_tracking',
            'cdp',
            'max_ai',
        ],
        notes: <>Would it be clever or lame if we included our own company here?</>,
        logo: PostHogLogo,
        height: 10,
        featured: true,
    },
    purplewave: {
        name: 'Purple Wave',
        toolsUsed: ['surveys'],
        industries: ['E-commerce'],
        users: ['Product'],
        notes: 'Heavy duty equipment marketplace',
        logo: PurpleWaveLogo,
        height: 24,
        featured: false,
        quotes: {
            matt_amick: {
                name: 'Matt Amick',
                role: 'Product Owner',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/purplewave_matt_175a82bf75.jpg',
                },
                products: {
                    surveys:
                        'I love everything about PostHog from the design to the culture, just everything. When the team launched the surveys beta and we could make no-code surveys and have everything in one place too? That was just phenomenal.',
                },
            },
        },
    },
    raycast: {
        name: 'Raycast',
        toolsUsed: [], // TODO: Add toolsUsed
        // industries: [], // TODO: Add industries
        // users: [], // TODO: Add users
        notes: 'The MacOS Spotlight that Apple should have built',
        logo: RaycastLogo,
        featured: true,
        height: 12,
    },
    researchgate: {
        name: 'ResearchGate',
        toolsUsed: ['experiments', 'feature_flags', 'product_analytics'],
        industries: ['Science', 'Social network'],
        users: ['Growth', 'Engineering', 'Product', 'Marketing'],
        notes: "World's largest professional network for scientists",
        logo: ResearchGateLogo,
        height: 8,
        featured: true,
    },
    significa: {
        name: 'Significa',
        toolsUsed: ['web_analytics', 'product_analytics'],
        industries: ['Agency'],
        users: ['Marketing'],
        notes: 'Digital agency',
        logo: SignificaLogo,
        height: 12,
        featured: false,
        quotes: {
            tomas_gouveia: {
                name: 'Tomás Gouveia',
                role: 'Digital Marketer',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/significa_tomas_thumb_51eaed534c.jpg',
                    url: 'https://res.cloudinary.com/dmukukwp6/image/upload/significa_tomas_baced563d7.jpg',
                },
                products: {
                    web_analytics:
                        "PostHog gives me all the same information Plausible used to give us, and a lot more. It's way more powerful and insightful than Plausible.",
                },
            },
        },
    },
    speakeasy: {
        name: 'Speakeasy',
        toolsUsed: ['feature_flags', 'product_analytics', 'dashboards'],
        industries: ['Devtool'],
        users: ['Product', 'Engineering', 'Growth', 'Developer Relations'],
        notes: 'API generator',
        logo: SpeakeasyLogo,
        featured: false,
        height: 6,
    },
    squadsventures: {
        name: 'SquadS Ventures',
        toolsUsed: ['product_analytics', 'session_replay', 'error_tracking'],
        notes: 'Venture funding for LatAm startups',
        logo: SquadSVenturesLogo,
        featured: false,
        height: 12,
        quotes: {
            luciano_trujillo: {
                name: 'Luciano Trujillo',
                role: 'Head of Engineering',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/luciano_trujullo_thumb_50ac708fc7.jpg',
                    url: 'https://res.cloudinary.com/dmukukwp6/image/upload/luciano_trujullo_3bb80fa039.jpg',
                },
                products: {
                    error_tracking:
                        "My smartwatch indicates a 20% increase in sleep quality after using PostHog's Error Tracking. We ditched our previous error tracking SaaS so we could manage errors, see session replays, and do analytics all in one place. It's exactly what we were looking for.",
                },
            },
        },
    },
    supabase: {
        name: 'Supabase',
        toolsUsed: ['max_ai', 'experiments', 'product_analytics'],
        industries: ['Devtool'],
        users: ['Engineering', 'Growth', 'Marketing'],
        notes: 'Postgres in the cloud',
        logo: SupabaseLogo,
        featured: true,
        height: 10,
    },
    startengine: {
        name: 'StartEngine',
        toolsUsed: [], // TODO: Add toolsUsed
        // industries: [], // TODO: Add industries
        // users: [], // TODO: Add users
        notes: 'Crowdfunding for startups',
        logo: StartEngineLogo,
        height: 14,
        featured: true,
    },
    trust: {
        name: 'Trust',
        toolsUsed: [], // TODO: Add toolsUsed
        // industries: [], // TODO: Add industries
        // users: [], // TODO: Add users
        notes: 'Crypto wallet',
        logo: TrustWalletLogo,
        featured: true,
        height: 10,
    },
    vendasta: {
        name: 'Vendasta',
        toolsUsed: ['experiments', 'cdp'],
        industries: ['SaaS'],
        users: ['Product', 'Engineering'],
        notes: 'Channel partner platform',
        logo: VendastaLogo,
        featured: false,
        height: 10,
    },
    webshare: {
        name: 'Webshare',
        toolsUsed: ['experiments', 'product_analytics'],
        industries: ['Devtool'],
        users: ['Marketing', 'Leadership', 'Customer Success'],
        notes: 'Proxy server',
        logo: WebshareLogo,
        featured: false,
        height: 10,
    },
    wittyworks: {
        name: 'Witty Works',
        toolsUsed: ['dashboards'],
        industries: ['SaaS', 'Browser extension'],
        users: ['Marketing', 'Engineering'],
        notes: 'AI writing assistant',
        logo: WittyWorksLogo,
        featured: false,
        height: 10,
    },
    ycombinator: {
        name: 'Y Combinator',
        toolsUsed: ['experiments', 'product_analytics'],
        industries: ['SaaS', 'Education'],
        users: ['Leadership', 'Engineering', 'Product'],
        notes: "World's premier startup accelerator",
        logo: YCombinatorLogo,
        height: 10,
        featured: true,
    },
    zealot: {
        name: 'Zealot',
        toolsUsed: ['llm_analytics', 'session_replay', 'error_tracking', 'product_analytics'],
        industries: ['Recruitment'],
        users: ['Engineering', 'Leadership', 'Founders'],
        notes: 'AI customer activation platform',
        logo: {
            light: ZealotLogo,
            dark: ZealotLogoDark,
        },
        featured: false,
        quotes: {
            brandon_jakobson: {
                name: 'Brandon Jakobson',
                role: 'Co-founder & CTO',
                image: {
                    thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/zealot_brandon_thumb_6c4b5ea067.png',
                    url: 'https://res.cloudinary.com/dmukukwp6/image/upload/zealot_brandon_ef6f4241d7.png',
                },
                quotes: [
                    "I'm so glad you guys don't price based on seats. As soon as I realized that, I invited my whole team.",
                ],
                products: {
                    error_tracking:
                        'I can look at an error and see everyone who had it, then view their replays, in two clicks. That’s the part about PostHog that’s so cool: you get all these tools for free and the more you use, the more powerful they become.',
                },
            },
        },
    },
    // New customers from MDX files
    assemblyai: {
        name: 'AssemblyAI',
        toolsUsed: ['experiments', 'product_analytics'],
        industries: ['API Platform'],
        users: ['Leadership', 'Marketing', 'Engineering'],
        notes: 'Speech-to-text and audio intelligence API',
        logo: AssemblyAILogo,
        featured: false,
        height: 10,
    },
    // rebtel: { // Will be added via PR
    //     name: 'Rebtel',
    //     toolsUsed: ['product_analytics', 'experiments'],
    //     industries: ['Telecom'],
    //     users: [],
    //     notes: 'International calling and messaging',
    //     featured: false,
    //     // logo: RebtelLogo, // Logo not available
    // },
    gankster: {
        name: 'Gankster',
        toolsUsed: ['max_ai', 'session_replay', 'product_analytics'],
        industries: ['Gaming'],
        users: ['Engineering', 'Growth', 'Marketing'],
        notes: 'Gaming platform',
        featured: false,
        logo: GanksterLogo,
        height: 10,
    },
    qred: {
        name: 'Qred',
        toolsUsed: ['feature_flags', 'session_replay', 'experiments', 'product_analytics', 'cdp'],
        industries: ['Fintech'],
        users: ['Engineering', 'Product', 'Marketing'],
        notes: 'Business loans and financial services',
        featured: false,
        logo: QredLogo,
        height: 8,
    },
    // swype: {
    //     name: 'Swype',
    //     toolsUsed: ['session_replay', 'product_analytics'],
    //     industries: ['Recruitment', 'Data'],
    //     users: ['Founders', 'Engineering'],
    //     notes: 'Talent acquisition platform',
    //     featured: false,
    //     // logo: SwypeLogo, // Logo not available
    // },
    // wowzer: {
    //     name: 'Wowzer',
    //     toolsUsed: ['experiments', 'product_analytics', 'surveys', 'llm_analytics'],
    //     industries: ['AI'],
    //     users: ['Growth', 'Engineering', 'Product'],
    //     notes: 'AI-powered platform',
    //     featured: false,
    //     // logo: WowzerLogo, // Logo not available
    // },
}

export const useCustomers = () => {
    const { products } = useProducts()

    // Query only to detect which customers have case studies
    const data = useStaticQuery(graphql`
        query {
            allCustomers: allMdx(filter: { fields: { slug: { regex: "/^/customers/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                }
            }
        }
    `)

    // Create a set of customer slugs that have MDX case studies
    const customersWithCaseStudies = new Set(
        data.allCustomers.nodes.map((node: any) => node.fields.slug.split('/').pop() || '')
    )

    const getProductTitleByHandle = (handle: string) => {
        return products.find((product) => product.handle === handle)?.name
    }

    // Transform customer data with product titles and case study info
    const customers = Object.entries(CUSTOMER_DATA).reduce((acc, [key, customer]) => {
        // Use logo if available, otherwise fall back to legacy logo URLs
        let logo = customer.logo
        if (!logo && customer.legacyLogo && customer.legacyLogoDark) {
            logo = {
                light: customer.legacyLogo,
                dark: customer.legacyLogoDark,
            }
        }

        const customerWithSlug: Customer = {
            ...customer,
            slug: key,
            logo,
            // Keep original handles for product lookup
            toolsUsedHandles: customer.toolsUsed || [],
            // Convert handles to human-readable product names for display
            toolsUsed:
                customer.toolsUsed
                    ?.map((tool) => getProductTitleByHandle(tool))
                    .filter((name): name is string => name !== undefined) || [],
            // Dynamically check if customer has a case study
            hasCaseStudy: customersWithCaseStudies.has(key),
        }

        // Remove legacy fields from final object
        delete (customerWithSlug as any).legacyLogo
        delete (customerWithSlug as any).legacyLogoDark

        return {
            ...acc,
            [key]: customerWithSlug,
        }
    }, {} as Record<string, Customer>)

    const getCustomer = (slug: string): Customer | undefined => {
        return customers[slug]
    }

    const getCustomers = (slugs: string[]): Customer[] => {
        return slugs.map((slug) => customers[slug]).filter(Boolean) as Customer[]
    }

    const hasCaseStudy = (slug: string): boolean => {
        return customers[slug]?.hasCaseStudy ?? false
    }

    const isFeatured = (slug: string): boolean => {
        return !!customers[slug]?.featured
    }

    return {
        customers,
        getCustomer,
        getCustomers,
        hasCaseStudy,
        isFeatured,
    }
}
