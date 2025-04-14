import React from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import Editor from 'components/Editor'
import { graphql, useStaticQuery } from 'gatsby'

interface CustomerNode {
    fields: {
        slug: string
    }
    frontmatter: {
        customer: string
        toolsUsed?: string[]
    }
}

interface ManualCustomer {
    name: string
    toolsUsed: string
    notes?: string
}

type CustomerOrder = (string | ManualCustomer)[]

const CUSTOMER_ORDER: CustomerOrder = [
    'ycombinator',
    'elevenlabs',
    {
        name: 'Mistral AI',
        toolsUsed: 'Product analytics, Session replay',
        notes: 'Optional field'
    },
    'assemblyai'
]

export default function Customers(): JSX.Element {
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
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] divide-x divide-y divide-border border-r border-b border-primary [&_div]:p-2 text-[15px]">
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
                            <div>{customer.frontmatter.customer}</div>
                            <div>{customer.frontmatter.toolsUsed?.join(', ')}</div>
                            <div><Link to={customer.fields.slug}>Link</Link></div>
                            <div>&nbsp;</div>
                        </React.Fragment>
                    )
                } else {
                    return (
                        <React.Fragment key={item.name}>
                            <div>{index + 1}</div>
                            <div>{item.name}</div>
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
