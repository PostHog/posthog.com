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

interface CustomerNode {
    fields: {
        slug: string
    }
    frontmatter: {
        customer: string
        toolsUsed?: string[]
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
    logo?: string
    logoDark?: string
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

const Customer = ({ number, logo, name, toolsUsed, slug, dark }) => {
    return (
        <React.Fragment>
            <div>{number}</div>
            <div className={dark ? 'bg-black' : ''}>
                <div className="flex items-center gap-2">
                    {logo ? <img src={logo} alt={name} className="h-8 w-auto object-contain" /> : <span>{name}</span>}
                </div>
            </div>
            <div>{toolsUsed?.join(', ')}</div>
            <div>{slug && <Link to={slug}>Link</Link>}</div>
            <div>&nbsp;</div>
        </React.Fragment>
    )
}

export default function Customers(): JSX.Element {
    const { websiteTheme } = useValues(layoutLogic)
    const isDarkMode = websiteTheme === 'dark'

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
            <Editor title="notable customers.mdx" slug="/customers">
                <div className="grid grid-cols-[auto_1fr_minmax(auto,150px)_minmax(auto,100px)_minmax(auto,150px)] divide-x divide-y divide-border border-r border-b border-primary [&_div]:p-2 text-[15px]">
                    <div className="border-l border-t border-border bg-input font-bold">&nbsp;</div>
                    <div className="bg-input font-bold">Company name</div>
                    <div className="bg-input font-bold">Product(s) used</div>
                    <div className="bg-input font-bold">Case study?</div>
                    <div className="bg-input font-bold">Notes</div>

                    {CUSTOMER_ORDER.map((item, index) => {
                        return (
                            <Customer
                                key={index}
                                number={index + 1}
                                logo={
                                    frontmatterCustomers[item]?.frontmatter?.[isDarkMode ? 'logoDark' : 'logo']
                                        ?.publicURL || item?.[isDarkMode ? 'logoDark' : 'logo']
                                }
                                dark={typeof item !== 'string'}
                                name={frontmatterCustomers[item]?.frontmatter?.customer || item.name}
                                slug={frontmatterCustomers[item]?.fields?.slug}
                                toolsUsed={frontmatterCustomers[item]?.frontmatter?.toolsUsed || item.toolsUsed}
                            />
                        )
                    })}
                </div>
            </Editor>
        </>
    )
}
