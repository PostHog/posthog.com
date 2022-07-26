import React from 'react'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import DocsLayout from 'components/Docs/Layout'

export default function Handbook({ data: { guides, docsSidebar } }) {
    /*const {
        body,
        frontmatter,
        contributors,
        fields: { slug },
    } = post
    const { title, hideAnchor, description, hideLastUpdated } = frontmatter
    const { parent, excerpt } = post
    const lastUpdated = parent?.fields?.gitLogLatestDate
    const filePath = `/${parent?.relativePath}`*/
    const docsMenu = docsSidebar.childSidebarsJson.docs

    return (
        <DocsLayout
            title="User guides"
            filePath=""
            slug="/docs/user-guides"
            hideAnchor={true}
            lastUpdated=""
            breadcrumbBase={{ name: 'User guides', url: '/docs/user-guides' }}
            breadcrumb={[]}
            menu={docsMenu}
            hideLastUpdated={true}
            contributors={[]}
            tableOfContents={[]}
        >
            <SEO title={`User guides - PostHog`} description={''} article />
        </DocsLayout>
    )
}

export const query = graphql`
    query UserGuidesQuery {
        ...DocsSidebar
        guides: allMdx(filter: { slug: { regex: "/^/docs/user-guides/.*$/" } }) {
            nodes {
                frontmatter {
                    title
                }
            }
        }
    }
`
