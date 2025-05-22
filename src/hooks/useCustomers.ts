import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

// Import SVG logos
import MistralLogo from '../images/customers/mistralai-light.svg'
import RaycastLogo from '../images/customers/raycast-light.svg'
import AirbusLogo from '../images/customers/airbus-light.svg'
import ContraLogo from '../images/customers/contra-light.svg'
import DhlLogo from '../images/customers/dhl-light.svg'
import SpeakeasyLogo from '../images/customers/speakeasy-light.svg'
import StartEngineLogo from '../images/customers/startengine-light.svg'
import TrustWalletLogo from '../images/customers/trustwallet-light.svg'
import PostHogLogo from '../images/customers/posthog-light.svg'
import SupabaseLogo from '../images/customers/supabase-light.svg'

import MistralLogoDark from '../images/customers/mistralai-dark.svg'
import RaycastLogoDark from '../images/customers/raycast-dark.svg'
import AirbusLogoDark from '../images/customers/airbus-dark.svg'
import ContraLogoDark from '../images/customers/contra-dark.svg'
import DhlLogoDark from '../images/customers/dhl-dark.svg'
import StartEngineLogoDark from '../images/customers/startengine-dark.svg'
import TrustWalletLogoDark from '../images/customers/trustwallet-dark.svg'
import PostHogLogoDark from '../images/customers/posthog-dark.svg'
import SupabaseLogoDark from '../images/customers/supabase-dark.svg'

export interface Customer {
    slug: string
    name: string
    toolsUsed: string[]
    notes?: string
    logo?: {
        light: string
        dark: string
    }
    height?: number
}

interface BaseCustomer {
    name: string
    toolsUsed: string[]
    notes?: string
    logo?: {
        light: string
        dark: string
    }
    height?: number
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
            light: 'https://res.cloudinary.com/dmukukwp6/image/upload/assemblyai_light.svg',
            dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/assemblyai_dark.svg',
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
            light: 'https://res.cloudinary.com/dmukukwp6/image/upload/elevenlabs_light.svg',
            dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/elevenlabs_dark.svg',
        },
        height: 18,
    },
    hasura: {
        name: 'Hasura',
        toolsUsed: [],
        notes: '',
        logo: {
            light: 'https://res.cloudinary.com/dmukukwp6/image/upload/hasura_light.svg',
            dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/hasura_dark.svg',
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
            light: 'https://res.cloudinary.com/dmukukwp6/image/upload/researchgate_light.svg',
            dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/researchgate_dark.svg',
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
                    logo: markdownData.frontmatter.logo?.publicURL
                        ? {
                              light: markdownData.frontmatter.logo.publicURL,
                              dark: markdownData.frontmatter.logoDark.publicURL,
                          }
                        : customer.logo,
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
