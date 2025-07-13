import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

// Import SVG logos
import AssemblyAILogo from '../images/customers/assemblyai-light.svg'
import MistralLogo from '../images/customers/mistralai-light.svg'
import RaycastLogo from '../images/customers/raycast-light.svg'
import AirbusLogo from '../images/customers/airbus-light.svg'
import ContraLogo from '../images/customers/contra-light.svg'
import CreatifyLogo from '../images/customers/creatify-light.png'
import DhlLogo from '../images/customers/dhl-light.svg'
import ElevenlabsLogo from '../images/customers/elevenlabs-light.svg'
import HasuraLogo from '../images/customers/hasura-light.svg'
import ResearchGateLogo from '../images/customers/researchgate-light.svg'
import SpeakeasyLogo from '../images/customers/speakeasy-light.svg'
import StartEngineLogo from '../images/customers/startengine-light.svg'
import TrustWalletLogo from '../images/customers/trustwallet-light.svg'
import PostHogLogo from '../images/customers/posthog-light.svg'
import SupabaseLogo from '../images/customers/supabase-light.svg'
import NetdataLogo from '../images/customers/netdata-light.svg'
import PryLogo from '../images/customers/pry-light.svg'
import CarVerticalLogo from '../images/customers/carvertical-light.svg'
import PhantomLogo from '../images/customers/phantom-light.svg'

import AssemblyAILogoDark from '../images/customers/assemblyai-dark.svg'
import MistralLogoDark from '../images/customers/mistralai-dark.svg'
import RaycastLogoDark from '../images/customers/raycast-dark.svg'
import AirbusLogoDark from '../images/customers/airbus-dark.svg'
import ContraLogoDark from '../images/customers/contra-dark.svg'
import CreatifyLogoDark from '../images/customers/creatify-dark.png'
import DhlLogoDark from '../images/customers/dhl-dark.svg'
import ElevenlabsLogoDark from '../images/customers/elevenlabs-dark.svg'
import HasuraLogoDark from '../images/customers/hasura-dark.svg'
import ResearchGateLogoDark from '../images/customers/researchgate-dark.svg'
import StartEngineLogoDark from '../images/customers/startengine-dark.svg'
import TrustWalletLogoDark from '../images/customers/trustwallet-dark.svg'
import PostHogLogoDark from '../images/customers/posthog-dark.svg'
import SupabaseLogoDark from '../images/customers/supabase-dark.svg'
import NetdataLogoDark from '../images/customers/netdata-dark.svg'
import PryLogoDark from '../images/customers/pry-dark.svg'
import CarVerticalLogoDark from '../images/customers/carvertical-dark.svg'
import PhantomLogoDark from '../images/customers/phantom-dark.svg'

import SignificaLogo from '../components/CustomerLogos/SignificaLogo'
import VendastaLogo from '../components/CustomerLogos/VendastaLogo'

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
        logo: {
            light: AirbusLogo,
            dark: AirbusLogoDark,
        },
        height: 24,
    },
    assemblyai: {
        name: 'AssemblyAI',
        toolsUsed: [],
        notes: '',
        logo: {
            light: AssemblyAILogo,
            dark: AssemblyAILogoDark,
        },
    },
    carvertical: {
        name: 'carVertical',
        toolsUsed: [],
        notes: '',
        logo: {
            light: CarVerticalLogo,
            dark: CarVerticalLogoDark,
        },
    },
    contra: {
        name: 'Contra',
        toolsUsed: [],
        notes: '',
        logo: {
            light: ContraLogo,
            dark: ContraLogoDark,
        },
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
        logo: {
            light: DhlLogo,
            dark: DhlLogoDark,
        },
    },
    elevenlabs: {
        name: 'ElevenLabs',
        toolsUsed: [],
        notes: '',
        logo: {
            light: ElevenlabsLogo,
            dark: ElevenlabsLogoDark,
        },
        height: 18,
    },
    hasura: {
        name: 'Hasura',
        toolsUsed: ['session_replay'],
        notes: '',
        logo: {
            light: HasuraLogo,
            dark: HasuraLogoDark,
        },
    },
    mistralai: {
        name: 'Mistral AI',
        toolsUsed: [],
        notes: '',
        logo: {
            light: MistralLogo,
            dark: MistralLogoDark,
        },
    },
    netdata: {
        name: 'Netdata',
        toolsUsed: [],
        notes: '',
        logo: {
            light: NetdataLogo,
            dark: NetdataLogoDark,
        },
    },
    phantom: {
        name: 'Phantom',
        toolsUsed: [],
        notes: '',
        logo: {
            light: PhantomLogo,
            dark: PhantomLogoDark,
        },
    },
    pry: {
        name: 'Pry',
        toolsUsed: [],
        notes: '',
        logo: {
            light: PryLogo,
            dark: PryLogoDark,
        },
    },
    posthog: {
        name: 'PostHog',
        toolsUsed: [],
        notes: 'Would it be clever or lame if we included our own company here?',
        logo: {
            light: PostHogLogo,
            dark: PostHogLogoDark,
        },
    },
    raycast: {
        name: 'Raycast',
        toolsUsed: [],
        notes: '',
        logo: {
            light: RaycastLogo,
            dark: RaycastLogoDark,
        },
    },
    researchgate: {
        name: 'ResearchGate',
        toolsUsed: [],
        notes: '',
        logo: {
            light: ResearchGateLogo,
            dark: ResearchGateLogoDark,
        },
        height: 20,
    },
    speakeasy: {
        name: 'Speakeasy',
        toolsUsed: [],
        notes: '',
        logo: {
            light: SpeakeasyLogo,
            dark: SpeakeasyLogo,
        },
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
        logo: {
            light: SupabaseLogo,
            dark: SupabaseLogoDark,
        },
    },
    startengine: {
        name: 'StartEngine',
        toolsUsed: [],
        notes: '',
        logo: {
            light: StartEngineLogo,
            dark: StartEngineLogoDark,
        },
    },
    trust: {
        name: 'Trust',
        toolsUsed: [],
        notes: '',
        logo: {
            light: TrustWalletLogo,
            dark: TrustWalletLogoDark,
        },
    },
    vendasta: {
        name: 'Vendasta',
        toolsUsed: ['experiments'],
        notes: '',
        logo: VendastaLogo,
    },
    ycombinator: {
        name: 'Y Combinator',
        toolsUsed: ['Experiments', 'Autocapture', 'PostHog Cloud', 'Insights'],
        notes: '',
        logo: {
            light: 'https://res.cloudinary.com/dmukukwp6/image/upload/ycombinator_light_86e121ca81.svg',
            dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/ycombinator_dark_926586dfe2.svg',
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
