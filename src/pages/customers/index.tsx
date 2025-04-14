import React from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import Editor from 'components/Editor'
import { graphql, useStaticQuery } from 'gatsby'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'

// Import SVG logos
import MistralLogo from '../../images/customers/mistral.svg'
import RaycastLogo from '../../images/customers/raycast.svg'
import AirbusLogo from '../../images/customers/airbus.svg'
import DhlLogo from '../../images/customers/dhl.svg'
import StartEngineLogo from '../../images/customers/startengine.svg'
import TrustLogo from '../../images/customers/trustwallet.svg'
import PostHogLogo from '../../images/customers/posthog.svg'

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
    toolsUsed: string
    notes?: string
    logo?: string
    logoDark?: string
}

type CustomerOrder = (string | ManualCustomer)[]

const CUSTOMER_ORDER: CustomerOrder = [
    'ycombinator',
    {
        name: 'Mistral AI',
        toolsUsed: '',
        notes: '',
        logo: MistralLogo,
        logoDark: MistralLogo
    },
    'elevenlabs',
    {
        name: 'Raycast',
        toolsUsed: '',
        notes: '',
        logo: RaycastLogo,
        logoDark: RaycastLogo
    },
    {
        name: 'Airbus',
        toolsUsed: '',
        notes: '',
        logo: AirbusLogo,
        logoDark: AirbusLogo
    },
    {
        name: 'DHL',
        toolsUsed: '',
        notes: '',
        logo: DhlLogo,
        logoDark: DhlLogo
    },
    {
        name: 'StartEngine',
        toolsUsed: '',
        notes: '',
        logo: StartEngineLogo,
        logoDark: StartEngineLogo
    },
    'assemblyai',
    'hasura',
    {
        name: 'Trust',
        toolsUsed: '',
        notes: '',
        logo: TrustLogo,
        logoDark: TrustLogo
    },
    'researchgate',
    {
        name: 'PostHog',
        toolsUsed: '',
        notes: 'Would it be clever or lame if we included our own company here?',
        logo: PostHogLogo,
        logoDark: PostHogLogo
    }
]

export default function Customers(): JSX.Element {
    const { websiteTheme } = useValues(layoutLogic)
    const isDarkMode = websiteTheme === 'dark'

    const data = useStaticQuery(graphql`
        query {
            allCustomers: allMdx(
                filter: { fields: { slug: { regex: "/^/customers/" } } }
            ) {
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
    const frontmatterCustomers = data.allCustomers.nodes.reduce((acc: Record<string, CustomerNode>, node: CustomerNode) => {
        const key = node.fields.slug.split('/').pop() || ''
        acc[key] = node
        return acc
    }, {})

    const renderCustomerName = (customer: CustomerNode | ManualCustomer, isManual: boolean) => {
        let logo = null
        let name: string

        if (isManual) {
            const manualCustomer = customer as ManualCustomer
            name = manualCustomer.name
            logo = isDarkMode ? manualCustomer.logoDark : manualCustomer.logo
        } else {
            const frontmatterCustomer = customer as CustomerNode
            name = frontmatterCustomer.frontmatter.customer
            logo = isDarkMode 
                ? frontmatterCustomer.frontmatter.logoDark?.publicURL 
                : frontmatterCustomer.frontmatter.logo?.publicURL
        }

        return (
            <div className="flex items-center gap-2">
                {logo ? (
                    <img 
                        src={logo} 
                        alt={name} 
                        className="h-8 w-auto object-contain"
                    />
                ) : (
                    <span>{name}</span>
                )}
            </div>
        )
    }

    return (
      <>
        <SEO
            title="notable customers.mdx – PostHog"
            description=""
            image={`/images/og/customers.jpg`}
        />
        <Editor 
          title="notable customers.mdx"
          slug="/customers"
        >
          <div className="grid grid-cols-[auto_1fr_minmax(auto,150px)_minmax(auto,100px)_minmax(auto,150px)] divide-x divide-y divide-border border-r border-b border-primary [&_div]:p-2 text-[15px]">
            <div className="border-l border-t border-border bg-input font-bold">&nbsp;</div>
            <div className="bg-input font-bold">
              Company name
            </div>
            <div className="bg-input font-bold">
              Product(s) used
            </div>
            <div className="bg-input font-bold">
              Case study?
            </div>
            <div className="bg-input font-bold">
              Notes
            </div>

            {CUSTOMER_ORDER.map((item, index) => {
                if (typeof item === 'string') {
                    const customer = frontmatterCustomers[item]
                    if (!customer) return null
                    
                    return (
                        <React.Fragment key={item}>
                            <div>{index + 1}</div>
                            <div>{renderCustomerName(customer, false)}</div>
                            <div>{customer.frontmatter.toolsUsed?.join(', ')}</div>
                            <div><Link to={customer.fields.slug}>Link</Link></div>
                            <div>&nbsp;</div>
                        </React.Fragment>
                    )
                } else {
                    return (
                        <React.Fragment key={item.name}>
                            <div>{index + 1}</div>
                            <div className="bg-black">{renderCustomerName(item, true)}</div>
                            <div>{item.toolsUsed}</div>
                            <div>&nbsp;</div>
                            <div>{item.notes || '&nbsp;'}</div>
                        </React.Fragment>
                    )
                }
            })}
          </div>
        </Editor>
      </>
    )
}
