import React from 'react'
import { graphql } from 'gatsby'
import { docs } from '../../sidebars/sidebars.json'
import * as allIcons from 'components/UserGuideIcons'

import Link from 'components/Link'
import { SEO } from 'components/seo'
import DocsLayout from 'components/Docs/Layout'

export default function UserGuides({ data }) {
    /*const { title, hideAnchor, description, hideLastUpdated } = frontmatter
    const { parent, excerpt } = post
    const lastUpdated = parent?.fields?.gitLogLatestDate
    const filePath = `/${parent?.relativePath}`*/

    const { guides } = data

    return (
        <DocsLayout
            title="User guides"
            filePath=""
            lastUpdated=""
            menu={docs}
            slug="docs/user-guides"
            breadcrumb={[]}
            breadcrumbBase={{ name: 'User guides', url: '/docs/user-guides' }}
            hideAnchor={true}
            tableOfContents={[]}
        >
            <SEO title={`User guides - PostHog`} description={'PostHog user guides'} article />

            <h3>Browse by feature</h3>

            <div className="flex flex-col w-full shrink-0 flex-wrap">
                {guides.group.map((group) => {
                    return (
                        <div key={group.category} className="w-1/2 odd:order-2 event:order-1">
                            <h5>{group.category}</h5>
                            <ul className="list-none m-0 p-0 space-y-4">
                                {group.nodes.map((page) => {
                                    const Icon = allIcons[page.frontmatter.icon]

                                    return (
                                        <li key={page.slug}>
                                            <Link to={'/' + page.slug} className="flex items-center space-x-2">
                                                {Icon && <Icon className="w-6 h-6" />}
                                                <div>
                                                    <span className="block font-bold !mb-0">
                                                        {page.frontmatter.title}
                                                    </span>
                                                    <p className="block text-gray !mb-0">
                                                        {page.frontmatter.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </DocsLayout>
    )
}

export const query = graphql`
    query UserGuides {
        guides: allMdx(filter: { slug: { glob: "docs/user-guides/*" } }) {
            group(field: frontmatter___category) {
                category: fieldValue
                nodes {
                    slug
                    frontmatter {
                        icon
                        title
                        description
                    }
                }
            }
        }
    }
`
