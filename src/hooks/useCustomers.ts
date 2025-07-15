import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

// Import PNG logos (not converted to React components)
import CreatifyLogo from '../images/customers/creatify-light.png'
import CreatifyLogoDark from '../images/customers/creatify-dark.png'
import SignificaLogo from '../components/CustomerLogos/SignificaLogo'
import VendastaLogo from '../components/CustomerLogos/VendastaLogo'
import AirbusLogo from '../components/CustomerLogos/AirbusLogo'
import AssemblyAILogo from '../components/CustomerLogos/AssemblyAILogo'
import CarVerticalLogo from '../components/CustomerLogos/CarVerticalLogo'
import ContraLogo from '../components/CustomerLogos/ContraLogo'
import DHLLogo from '../components/CustomerLogos/DHLLogo'
import ElevenLabsLogo from '../components/CustomerLogos/ElevenLabsLogo'
import HasuraLogo from '../components/CustomerLogos/HasuraLogo'
import HeadshotProLogo from '../components/CustomerLogos/HeadshotProLogo'
import MistralAILogo from '../components/CustomerLogos/MistralAILogo'
import NetdataLogo from '../components/CustomerLogos/NetdataLogo'
import PhantomLogo from '../components/CustomerLogos/PhantomLogo'
import PostHogLogo from '../components/CustomerLogos/PostHogLogo'
import PurpleWaveLogo from '../components/CustomerLogos/PurpleWaveLogo'
import PryLogo from '../components/CustomerLogos/PryLogo'
import RaycastLogo from '../components/CustomerLogos/RaycastLogo'
import ResearchGateLogo from '../components/CustomerLogos/ResearchGateLogo'
import SpeakeasyLogo from '../components/CustomerLogos/SpeakeasyLogo'
import StartEngineLogo from '../components/CustomerLogos/StartEngineLogo'
import SupabaseLogo from '../components/CustomerLogos/SupabaseLogo'
import TrustWalletLogo from '../components/CustomerLogos/TrustWalletLogo'
import WebshareLogo from '../components/CustomerLogos/WebshareLogo'
import YCombinatorLogo from '../components/CustomerLogos/YCombinatorLogo'
import ZealotLogo from '../images/customers/zealot-light.png'
import ZealotLogoDark from '../images/customers/zealot-dark.png'

export interface Customer {
    slug: string
    name: string
    toolsUsed: string[]
    notes?: string
    logo?:
        | React.ComponentType<any>
        | {
              light: string
              dark: string
          }
    height?: number
    quotes?: Array<{
        name: string
        role: string
        image: {
            thumb: string
            url?: string
        }
        products: Record<string, string>
    }>
}

interface BaseCustomer {
    name: string
    toolsUsed: string[]
    notes?: string
    logo?:
        | React.ComponentType<any>
        | {
              light: string
              dark: string
          }
    height?: number
    quotes?: Array<{
        name: string
        role: string
        image: {
            thumb: string
            url?: string
        }
        products: Record<string, string>
    }>
}

// Define all customer data
const CUSTOMER_DATA: Record<string, BaseCustomer> = {
    airbus: {
        name: 'Airbus',
        toolsUsed: [],
        notes: '',
        logo: AirbusLogo,
        height: 24,
    },
    assemblyai: {
        name: 'AssemblyAI',
        toolsUsed: [],
        notes: '',
        logo: AssemblyAILogo,
    },
    carvertical: {
        name: 'carVertical',
        toolsUsed: [],
        notes: '',
        logo: CarVerticalLogo,
    },
    contra: {
        name: 'Contra',
        toolsUsed: [],
        notes: '',
        logo: ContraLogo,
    },
    creatify: {
        name: 'Creatify',
        toolsUsed: ['web_analytics'],
        notes: '',
        logo: {
            light: CreatifyLogo,
            dark: CreatifyLogoDark,
        },
    },
    dhl: {
        name: 'DHL',
        toolsUsed: [],
        notes: '',
        logo: DHLLogo,
    },
    elevenlabs: {
        name: 'ElevenLabs',
        toolsUsed: [],
        notes: '',
        logo: ElevenLabsLogo,
        height: 18,
    },
    hasura: {
        name: 'Hasura',
        toolsUsed: ['session_replay'],
        notes: '',
        logo: HasuraLogo,
    },
    headshotpro: {
        name: 'HeadshotPro',
        toolsUsed: ['data_warehouse'],
        notes: '',
        logo: HeadshotProLogo,
    },
    mistralai: {
        name: 'Mistral AI',
        toolsUsed: [],
        notes: '',
        logo: MistralAILogo,
    },
    netdata: {
        name: 'Netdata',
        toolsUsed: [],
        notes: '',
        logo: NetdataLogo,
    },
    phantom: {
        name: 'Phantom',
        toolsUsed: [],
        notes: '',
        logo: PhantomLogo,
    },
    pry: {
        name: 'Pry',
        toolsUsed: [],
        notes: '',
        logo: PryLogo,
    },
    posthog: {
        name: 'PostHog',
        toolsUsed: [],
        notes: 'Would it be clever or lame if we included our own company here?',
        logo: PostHogLogo,
    },
    purplewave: {
        name: 'Purplewave',
        toolsUsed: ['surveys'],
        notes: '',
        logo: PurpleWaveLogo,
        height: 24,
    },
    raycast: {
        name: 'Raycast',
        toolsUsed: [],
        notes: '',
        logo: RaycastLogo,
    },
    researchgate: {
        name: 'ResearchGate',
        toolsUsed: [],
        notes: '',
        logo: ResearchGateLogo,
        height: 20,
    },
    speakeasy: {
        name: 'Speakeasy',
        toolsUsed: [],
        notes: '',
        logo: SpeakeasyLogo,
    },
    significa: {
        name: 'Significa',
        toolsUsed: ['web_analytics', 'product_analytics'],
        notes: '',
        logo: SignificaLogo,
        quotes: [
            {
                name: 'Tomás Gouveia',
                role: 'Digital Marketer',
                image: {
                    thumb: 'https://posthog.com/images/customers/significa-tomas.jpg',
                },
                products: {
                    web_analytics:
                        "PostHog gives me all the same information Plausible used to give us, and a lot more. It's way more powerful and insightful than Plausible.",
                },
            },
        ],
    },
    supabase: {
        name: 'Supabase',
        toolsUsed: [],
        notes: '',
        logo: SupabaseLogo,
    },
    startengine: {
        name: 'StartEngine',
        toolsUsed: [],
        notes: '',
        logo: StartEngineLogo,
    },
    trust: {
        name: 'Trust',
        toolsUsed: [],
        notes: '',
        logo: TrustWalletLogo,
    },
    vendasta: {
        name: 'Vendasta',
        toolsUsed: ['experiments'],
        notes: '',
        logo: VendastaLogo,
    },
    webshare: {
        name: 'Webshare',
        toolsUsed: ['data_warehouse'],
        notes: '',
        logo: WebshareLogo,
    },
    ycombinator: {
        name: 'Y Combinator',
        toolsUsed: ['experiments', 'autocapture', 'posthog_cloud', 'insights'],
        notes: '',
        logo: YCombinatorLogo,
    },
    zealot: {
        name: 'Zealot',
        toolsUsed: ['error_tracking'],
        notes: '',
        logo: {
            light: ZealotLogo,
            dark: ZealotLogoDark,
        },
    },
}

export const useCustomers = () => {
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

        if (markdownData) {
            return {
                ...acc,
                [key]: {
                    ...customerWithSlug,
                    name: markdownData.frontmatter.customer || customer.name,
                    toolsUsed: markdownData.frontmatter.toolsUsed || customer.toolsUsed,
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
        return !!frontmatterCustomers[slug]
    }

    return {
        customers,
        getCustomer,
        getCustomers,
        hasCaseStudy,
    }
}
