import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

// todos:
// - import roles, industries from MDX
// - source "tools used" exclusively from useCustomers
//   - read tools used by slug, check useProduct hook to get name, link, and link product name to presentation (product page)
// - make 'featured' filter work, default page to feature = true
// - open filters bar by default on /customers page
// - don't we have a case study we link to for ourselves? can't find it offline.
// - link PostHog's "Read [how we use PostHog](/blog/posthog-marketing) at PostHog." from PostHog row's notes (whether it be Markdown link parsing or dangerouslySetInnerHtml)

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
import HasuraLogo from '../components/CustomerLogos/HasuraLogo'
import HeadshotProLogo from '../components/CustomerLogos/HeadshotProLogo'
import HeygenLogo from '../components/CustomerLogos/HeygenLogo'
import HostAILogo from '../components/CustomerLogos/HostAILogo'
import JuiceboxLogo from '../components/CustomerLogos/JuiceboxLogo'
import MentionMeLogo from '../components/CustomerLogos/MentionMeLogo'
import MistralAILogo from '../components/CustomerLogos/MistralAILogo'
import MintlifyLogo from '../components/CustomerLogos/MintlifyLogo'
import NetdataLogo from '../components/CustomerLogos/NetdataLogo'
import OpenSaucedLogo from '../components/CustomerLogos/OpenSaucedLogo'
import PhantomLogo from '../components/CustomerLogos/PhantomLogo'
import PostHogLogo from '../components/CustomerLogos/PostHogLogo'
import PryLogo from '../components/CustomerLogos/PryLogo'
import PurpleWaveLogo from '../components/CustomerLogos/PurpleWaveLogo'
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
import LovableLogo from 'components/CustomerLogos/LovableLogo'
import useProducts from './useProducts'

export interface Customer {
    slug: string
    name: string
    toolsUsed: string[]
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
}

interface BaseCustomer {
    name: string
    toolsUsed: string[]
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
}

// Note: height needs to be a Tailwind class. Use /customers for reference as that's where it's balanced out.
// Product customer slides also use these, but use the value with a multiplier to make them larger for that slide.
const CUSTOMER_DATA: Record<string, BaseCustomer> = {
    '4dayweek': {
        name: '4DayWeek',
        toolsUsed: ['experiments', 'product_analytics'],
        notes: 'Job board',
        featured: false,
        // logo: 4DayWeekLogo,
    },
    '11x': {
        name: '11x',
        toolsUsed: ['experiments', 'product_analytics', 'llm_analytics', 'cdp'],
        notes: 'AI SDR',
        featured: false,
        // logo: 11xLogo,
    },
    adauris: {
        name: 'Adauris',
        toolsUsed: ['experiments', 'session_replay', 'product_analytics'],
        notes: 'Generative AI audio',
        featured: false,
        // logo: AdaurisLogo,
    },
    airbus: {
        name: 'Airbus',
        toolsUsed: [],
        notes: 'They make airplanes',
        logo: AirbusLogo,
        height: 9,
        featured: true,
    },
    // assemblyai: {
    //     name: 'AssemblyAI',
    //     toolsUsed: ['experiments', 'product_analytics'],
    //     notes: 'AI-based transcription APIs',
    //     logo: AssemblyAILogo,
    //     featured: true,
    //     height: 10,
    // },
    brainboard: {
        name: 'Brainboard',
        toolsUsed: ['experiments', 'product_analytics', 'apps'],
        notes: 'Collaborative DevOps',
        logo: BrainboardLogo,
        featured: false,
        height: 14,
    },
    carvertical: {
        name: 'carVertical',
        toolsUsed: ['feature_flags', 'product_analytics'],
        notes: 'Vehicle history reports',
        logo: CarVerticalLogo,
        featured: false,
        height: 10,
    },
    contra: {
        name: 'Contra',
        toolsUsed: ['feature_flags', 'session_replay', 'product_analytics'],
        notes: 'Creative freelance marketplace',
        logo: ContraLogo,
        featured: false,
        height: 8,
    },
    creatify: {
        name: 'Creatify',
        toolsUsed: ['web_analytics', 'product_analytics'],
        notes: 'AI video editor',
        logo: {
            light: CreatifyLogo,
            dark: CreatifyLogoDark,
        },
        height: 12,
        featured: false,
    },
    // dhl: {
    //     name: 'DHL',
    //     toolsUsed: [],
    //     notes: 'The logistics company with the red and yellow logo',
    //     logo: DHLLogo,
    //     featured: true,
    //     height: 10,
    // },
    elevenlabs: {
        name: 'ElevenLabs',
        toolsUsed: ['feature_flags', 'product_analytics', 'feature_flags', 'surveys'],
        notes: 'AI voice generator',
        logo: ElevenLabsLogo,
        height: 8,
        featured: true,
    },
    greatexpectations: {
        name: 'Great Expectations',
        toolsUsed: ['product_analytics'],
        notes: 'Data quality SaaS platform',
        featured: false,
        // logo: GreatExpectationsLogo,
    },
    groove: {
        name: 'Groove',
        toolsUsed: ['experiments', 'product_analytics', 'surveys'],
        notes: 'Help desk platform',
        featured: false,
        // logo: GrooveLogo,
    },
    hasura: {
        name: 'Hasura',
        toolsUsed: ['session_replay', 'product_analytics'],
        notes: 'Open source GraphQL engine',
        logo: HasuraLogo,
        featured: true,
        height: 10,
    },
    headshotpro: {
        name: 'HeadshotPro',
        toolsUsed: ['data_warehouse', 'product_analytics'],
        notes: 'AI photo generator',
        logo: HeadshotProLogo,
        featured: false,
        height: 10,
    },
    heygen: {
        name: 'Heygen',
        // toolsUsed: ['data_warehouse', 'product_analytics'],
        notes: 'AI video editor',
        logo: HeygenLogo,
        featured: true,
        height: 8,
    },
    hostai: {
        name: 'HostAI',
        toolsUsed: ['feature_flags', 'product_analytics', 'llm_analytics'],
        notes: 'AI for vacation rentals managers',
        featured: false,
        logo: HostAILogo,
        height: 12,
    },
    lovable: {
        name: 'Lovable',
        toolsUsed: [],
        notes: 'AI app & website builder',
        featured: true,
        logo: LovableLogo,
        height: 8,
    },
    juicebox: {
        name: 'Juicebox',
        toolsUsed: ['feature_flags', 'product_analytics', 'session_replay', 'llm_analytics'],
        notes: 'AI recruitment platform',
        featured: false,
        logo: JuiceboxLogo,
        height: 10,
    },
    mentionme: {
        name: 'Mention Me',
        toolsUsed: ['product_analytics', 'session_replay'],
        notes: 'Marketing referral campaigns',
        logo: MentionMeLogo,
        featured: false,
        height: 10,
    },
    mintlify: {
        name: 'Mintlify',
        toolsUsed: ['session_replay', 'api'],
        notes: 'Product and technical docs',
        logo: MintlifyLogo,
        featured: false,
        height: 10,
    },
    mistralai: {
        name: 'Mistral AI',
        toolsUsed: [],
        notes: 'Open source LLMs',
        logo: MistralAILogo,
        height: 12,
        featured: true,
    },
    netdata: {
        name: 'Netdata',
        toolsUsed: ['session_replay', 'apps'],
        notes: 'Open source monitoring',
        logo: NetdataLogo,
        height: 8,
        featured: false,
    },
    octomind: {
        name: 'Octomind',
        toolsUsed: ['experiments', 'surveys', 'product_analytics', 'web_analytics'],
        notes: 'AI-powered end-to-end testing',
        featured: false,
        // logo: OctomindLogo,
    },
    opensauced: {
        name: 'OpenSauced',
        toolsUsed: ['product_analytics'],
        notes: 'Open source contribution tracker',
        logo: OpenSaucedLogo,
        featured: false,
        height: 10,
    },
    phantom: {
        name: 'Phantom',
        toolsUsed: ['data_warehouse', 'feature_flags'],
        notes: 'Crypto wallet',
        logo: PhantomLogo,
        featured: false,
        height: 10,
    },
    pry: {
        name: 'Pry',
        toolsUsed: ['product_analytics', 'session_replay', 'heatmaps'],
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
        toolsUsed: [],
        notes: 'The MacOS Spotlight that Apple should have built',
        logo: RaycastLogo,
        featured: true,
        height: 12,
    },
    researchgate: {
        name: 'ResearchGate',
        toolsUsed: ['experiments', 'feature_flags', 'product_analytics'],
        notes: "World's largest professional network for scientists",
        logo: ResearchGateLogo,
        height: 8,
        featured: true,
    },
    significa: {
        name: 'Significa',
        toolsUsed: ['web_analytics', 'product_analytics'],
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
        toolsUsed: ['feature_flags', 'product_analytics'],
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
        notes: 'Postgres in the cloud',
        logo: SupabaseLogo,
        featured: true,
        height: 10,
    },
    // swype: {
    //     name: 'Swype',
    //     toolsUsed: ['session_replay', 'product_analytics'],
    //     notes: 'Tinder for jobs',
    //     // logo: SwypeLogo,
    // },
    startengine: {
        name: 'StartEngine',
        toolsUsed: [],
        notes: 'Crowdfunding for startups',
        logo: StartEngineLogo,
        height: 14,
        featured: true,
    },
    trust: {
        name: 'Trust',
        toolsUsed: [],
        notes: 'Crypto wallet',
        logo: TrustWalletLogo,
        featured: true,
        height: 10,
    },
    vendasta: {
        name: 'Vendasta',
        toolsUsed: ['experiments', 'apps', 'cdp'],
        notes: 'Channel partner platform',
        logo: VendastaLogo,
        featured: false,
        height: 10,
    },
    webshare: {
        name: 'Webshare',
        toolsUsed: ['data_warehouse', 'experiments', 'product_analytics'],
        notes: 'Proxy server',
        logo: WebshareLogo,
        featured: false,
        height: 10,
    },
    wittyworks: {
        name: 'Witty Works',
        toolsUsed: ['apps', 'product_analytics'],
        notes: '',
        logo: WittyWorksLogo,
        featured: false,
        height: 10,
    },
    // wowzer: {
    //     name: 'Wowzer',
    //     toolsUsed: ['experiments', 'product_analytics', 'surveys', 'llm_analytics'],
    //     notes: 'AI image generator',
    //     featured: false,
    //     // logo: WowzerLogo,
    // },
    ycombinator: {
        name: 'Y Combinator',
        toolsUsed: ['experiments', 'insights'],
        notes: "World's premier startup accelerator",
        logo: YCombinatorLogo,
        height: 10,
        featured: true,
    },
    zealot: {
        name: 'Zealot',
        toolsUsed: ['error_tracking', 'session_replay', 'error_tracking', 'product_analytics'],
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
}

export const useCustomers = () => {
    const { products } = useProducts()
    const data = useStaticQuery(graphql`
        query {
            allCustomers: allMdx(filter: { fields: { slug: { regex: "/^/customers/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        customer
                        toolsUsed
                        notes
                        logo {
                            publicURL
                        }
                        logoDark {
                            publicURL
                        }
                    }
                }
            }
        }
    `)

    const getProductTitleByHandle = (handle: string) => {
        return products.find((product) => product.handle === handle)?.name
    }

    // Create a map of frontmatter customers for quick lookup
    const frontmatterCustomers = data.allCustomers.nodes.reduce((acc: Record<string, any>, node: any) => {
        const key = node.fields.slug.split('/').pop() || ''
        acc[key] = node
        return acc
    }, {})

    // Merge markdown data with our base customer data
    const customers = Object.entries(CUSTOMER_DATA).reduce((acc, [key, customer]) => {
        const markdownData = frontmatterCustomers[key]
        const customerWithSlug: Customer = {
            ...customer,
            slug: key,
        }

        const toolsUsed =
            markdownData?.frontmatter?.toolsUsed ||
            customer?.toolsUsed?.map((tool) => getProductTitleByHandle(tool)).filter(Boolean)

        if (markdownData) {
            return {
                ...acc,
                [key]: {
                    ...customerWithSlug,
                    name: markdownData.frontmatter.customer || customer.name,
                    toolsUsed,
                    notes: markdownData.frontmatter.notes || customer.notes,
                    logo:
                        customer.logo ||
                        (markdownData.frontmatter.logo?.publicURL
                            ? {
                                  light: markdownData.frontmatter.logo.publicURL,
                                  dark: markdownData.frontmatter.logoDark.publicURL,
                              }
                            : undefined),
                },
            }
        }
        return {
            ...acc,
            [key]: { ...customerWithSlug, toolsUsed },
        }
    }, {} as Record<string, Customer>)

    const getCustomer = (slug: string): Customer | undefined => {
        return customers[slug]
    }

    const getCustomers = (slugs: string[]): Customer[] => {
        return slugs.map((slug) => customers[slug]).filter(Boolean) as Customer[]
    }

    const hasCaseStudy = (slug: string): boolean => {
        return !!frontmatterCustomers[slug]
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
