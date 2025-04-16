import React from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import Editor from 'components/Editor'
import { graphql, useStaticQuery } from 'gatsby'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'

// Import SVG logos
import MistralLogo from '../../images/customers/mistralai-light.svg'
import RaycastLogo from '../../images/customers/raycast-light.svg'
import AirbusLogo from '../../images/customers/airbus-light.svg'
import DhlLogo from '../../images/customers/dhl-light.svg'
import StartEngineLogo from '../../images/customers/startengine-light.svg'
import TrustWalletLogo from '../../images/customers/trustwallet-light.svg'
import PostHogLogo from '../../images/customers/posthog-light.svg'

import MistralLogoDark from '../../images/customers/mistralai-dark.svg'
import RaycastLogoDark from '../../images/customers/raycast-dark.svg'
import AirbusLogoDark from '../../images/customers/airbus-dark.svg'
import DhlLogoDark from '../../images/customers/dhl-dark.svg'
import StartEngineLogoDark from '../../images/customers/startengine-dark.svg'
import TrustWalletLogoDark from '../../images/customers/trustwallet-dark.svg'
import PostHogLogoDark from '../../images/customers/posthog-dark.svg'
import ScrollArea from 'components/RadixUI/ScrollArea'

interface CustomerNode {
    fields: {
        slug: string
    }
    frontmatter: {
        customer: string
        toolsUsed?: string[]
        notes?: string
        logo?: {
            publicURL: string
        }
        logoDark?: {
            publicURL: string
        }
    }
}

interface ManualCustomer {
    name: string
    toolsUsed: string[]
    notes?: string
    logo: string
    logoDark: string
}

type CustomerOrder = (string | ManualCustomer)[]

const CUSTOMER_ORDER: CustomerOrder = [
    'ycombinator',
    {
        name: 'Mistral AI',
        toolsUsed: [],
        notes: '',
        logo: MistralLogo,
        logoDark: MistralLogoDark,
    },
    'elevenlabs',
    {
        name: 'Raycast',
        toolsUsed: [],
        notes: '',
        logo: RaycastLogo,
        logoDark: RaycastLogoDark,
    },
    {
        name: 'Airbus',
        toolsUsed: [],
        notes: '',
        logo: AirbusLogo,
        logoDark: AirbusLogoDark,
    },
    {
        name: 'DHL',
        toolsUsed: [],
        notes: '',
        logo: DhlLogo,
        logoDark: DhlLogoDark,
    },
    {
        name: 'StartEngine',
        toolsUsed: [],
        notes: '',
        logo: StartEngineLogo,
        logoDark: StartEngineLogoDark,
    },
    'assemblyai',
    'hasura',
    {
        name: 'Trust',
        toolsUsed: [],
        notes: '',
        logo: TrustWalletLogo,
        logoDark: TrustWalletLogoDark,
    },
    'researchgate',
    {
        name: 'PostHog',
        toolsUsed: [],
        notes: 'Would it be clever or lame if we included our own company here?',
        logo: PostHogLogo,
        logoDark: PostHogLogoDark,
    },
]

interface CustomerProps {
    number: number
    logo?: {
        light: string
        dark: string
    }
    name: string
    toolsUsed?: string[]
    slug?: string
    notes?: string
}

const Customer = ({ number, logo, name, toolsUsed, slug, notes }: CustomerProps) => {
    return (
        <React.Fragment>
            <div className="flex items-center justify-center">{number}</div>
            <div className={`flex items-center justify-center !p-4`}>
                {logo ? (
                    <>
                        <img 
                            src={logo.light} 
                            alt={name} 
                            className="w-auto object-contain dark:hidden" 
                        />
                        <img 
                            src={logo.dark} 
                            alt={name} 
                            className="w-auto object-contain hidden dark:block" 
                        />
                    </>
                ) : (
                    <span>{name}</span>
                )}
            </div>
            <div className="flex items-center text-sm">{toolsUsed?.join(', ')}</div>
            <div className="flex justify-center items-center">{slug && <Link to={slug}>Link</Link>}</div>
            <div className="flex justify-center items-center text-sm">{notes || ''}</div>
        </React.Fragment>
    )
}

export default function Customers(): JSX.Element {

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
    const frontmatterCustomers = data.allCustomers.nodes.reduce(
        (acc: Record<string, CustomerNode>, node: CustomerNode) => {
            const key = node.fields.slug.split('/').pop() || ''
            acc[key] = node
            return acc
        },
        {}
    )

    return (
        <>
            <SEO title="notable customers.mdx – PostHog" description="" image={`/images/og/customers.jpg`} />
            <Editor title="notable customers" type="mdx" slug="/customers">
              <ScrollArea>
                <div className="grid grid-cols-[auto_minmax(150px,1fr)_minmax(auto,250px)_minmax(auto,100px)_minmax(auto,180px)] divide-x divide-y divide-border border-r border-b border-primary [&_div]:p-2 text-[15px]">
                    <div className="text-sm border-l border-t border-border bg-input font-bold">&nbsp;</div>
                    <div className="text-sm bg-input font-bold text-center">Company name</div>
                    <div className="text-sm bg-input font-bold">Product(s) used</div>
                    <div className="text-sm bg-input font-bold text-center">Case study?</div>
                    <div className="text-sm bg-input font-bold">Notes</div>

                    {CUSTOMER_ORDER.map((item, index) => {
                        return (
                            <Customer
                                key={index}
                                number={index + 1}
                                logo={typeof item === 'string' 
                                    ? frontmatterCustomers[item]?.frontmatter?.logo?.publicURL 
                                        ? {
                                            light: frontmatterCustomers[item].frontmatter.logo.publicURL,
                                            dark: frontmatterCustomers[item].frontmatter.logoDark.publicURL
                                        }
                                        : undefined
                                    : {
                                        light: item.logo,
                                        dark: item.logoDark
                                    }
                                }
                                name={typeof item === 'string' ? frontmatterCustomers[item]?.frontmatter?.customer || '' : item.name}
                                slug={typeof item === 'string' ? frontmatterCustomers[item]?.fields?.slug : undefined}
                                toolsUsed={typeof item === 'string' ? frontmatterCustomers[item]?.frontmatter?.toolsUsed : item.toolsUsed}
                                notes={typeof item === 'string' 
                                    ? frontmatterCustomers[item]?.frontmatter?.notes 
                                    : item.notes}
                            />
                        )
                    })}
                </div>
                </ScrollArea>
            </Editor>
        </>
    )
}
