import React from 'react'
import { graphql } from 'gatsby'
import Explorer from 'components/Explorer'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import HogpediaShell from 'components/Hogpedia/HogpediaShell'
import { categoryPath } from 'components/Hogpedia/categories'

/**
 * A category listing, the page a category link at the foot of an article opens.
 *
 * It is server-rendered from the articles that declare the category, so the list can never
 * name an article that does not exist.
 */
export default function HogpediaCategory({ data: { articles }, pageContext: { category } }: any): JSX.Element {
    const nodes = articles.nodes.filter((node: any) => !node.fields.slug.startsWith('/hogpedia/talk/'))
    const title = `Category: ${category}`

    return (
        <>
            <SEO
                title={`${title} - Hogpedia`}
                description={`Hogpedia articles in the ${category} category. ${nodes.length} ${
                    nodes.length === 1 ? 'page' : 'pages'
                }.`}
                canonicalUrl={categoryPath(category)}
            />
            <Explorer
                template="generic"
                slug="hogpedia"
                title={`${title} - Hogpedia`}
                fullScreen
                showAddressBar={false}
            >
                <HogpediaShell
                    title={title}
                    tagline="From Hogpedia, the free encyclopedia"
                    slug={categoryPath(category)}
                    showTabs={false}
                >
                    <div className="hp-prose">
                        <p>
                            This category contains {nodes.length} {nodes.length === 1 ? 'page' : 'pages'}. See{' '}
                            <Link to="/hogpedia/all-pages">all pages</Link> for the full index.
                        </p>
                        <ul>
                            {nodes.map((node: any) => (
                                <li key={node.fields.slug}>
                                    <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                                    {node.frontmatter.description && <> – {node.frontmatter.description}</>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </HogpediaShell>
            </Explorer>
        </>
    )
}

export const query = graphql`
    query HogpediaCategory($category: String!) {
        articles: allMdx(
            filter: {
                fields: { slug: { regex: "/^/hogpedia//" } }
                frontmatter: { hogpedia: { categories: { in: [$category] } } }
            }
            sort: { fields: frontmatter___title, order: ASC }
        ) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    title
                    description
                }
            }
        }
    }
`
