import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Explorer from 'components/Explorer'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import { MdxCodeBlock } from '../components/CodeBlock'
import HogpediaShell from 'components/Hogpedia/HogpediaShell'
import { buildSectionSources, primarySource } from 'components/Hogpedia/context'
import TableOfContents, { TocItem } from 'components/Hogpedia/TableOfContents'
import Infobox from 'components/Hogpedia/Infobox'
import MaintenanceBanner from 'components/Hogpedia/MaintenanceBanner'
import References, { Ref } from 'components/Hogpedia/References'
import CitationNeeded from 'components/Hogpedia/CitationNeeded'
import { SeeAlso, CategoryLinks } from 'components/Hogpedia/ArticleFooter'
import { makeSectionHeading } from 'components/Hogpedia/SectionHeading'

/**
 * A Hogpedia article.
 *
 * The global MDX `shortcodes` map is deliberately *not* spread in here, unlike
 * `src/templates/Plain.js` and `src/templates/Handbook.tsx`. Those components carry site
 * design tokens and would look wrong inside a 2007 skin, and a short allow-list keeps the
 * article vocabulary reviewable. An unregistered component name fails the build, which is
 * the failure mode we want.
 */
const A = (props: any) => <Link {...props} externalNoIcon />

const components = {
    a: A,
    pre: MdxCodeBlock,
    h2: makeSectionHeading('h2'),
    h3: makeSectionHeading('h3'),
    h4: makeSectionHeading('h4'),
    Ref,
    CitationNeeded,
}

/** `formatToc` returns a flat list with `depth` 0 for h2 and 1 for h3. Nest it so the
 *  Contents box can number sections as 1, 1.1, 1.2, 2. */
const nestToc = (flat: { value: string; url: string; depth: number }[] = []): TocItem[] => {
    const root: TocItem[] = []
    flat.forEach((heading) => {
        const item: TocItem = { ...heading, url: `#${heading.url}`, items: [] }
        if (heading.depth <= 0 || root.length === 0) {
            root.push(item)
            return
        }
        let parent = root[root.length - 1]
        for (let level = 1; level < heading.depth; level++) {
            const last = parent.items && parent.items[parent.items.length - 1]
            if (!last) break
            parent = last
        }
        parent.items = parent.items || []
        parent.items.push(item)
    })
    return root
}

export default function HogpediaArticle({
    data: { article, talkPage },
    pageContext: { tableOfContents, slug },
}: any): JSX.Element {
    const { body, excerpt, frontmatter, fields, parent } = article
    const { title, description, hogpedia } = frontmatter
    const meta = hogpedia || {}
    const filePath = parent?.relativePath
    // `gitLogLatestDate` falls back to "now" when the build has no GitHub token, so it
    // would print today's date for every article. Only the real commit log is trusted.
    const lastModified = fields?.commits?.[0]?.date
        ? new Date(fields.commits[0].date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
          })
        : undefined
    const summary = description || excerpt
    const toc = nestToc(tableOfContents)
    // A talk page lives at /hogpedia/talk/<slug> and renders through the same template. It
    // gets the "Talk:" prefix, the discussion tab, and no index – an editorial argument is
    // not a reference work.
    const isTalk = slug.startsWith('/hogpedia/talk/')
    const heading = isTalk ? `Talk: ${title}` : title

    return (
        <>
            <SEO title={`${heading} - Hogpedia`} description={summary} canonicalUrl={slug} article />
            <Explorer
                template="generic"
                slug="hogpedia"
                title={`${heading} - Hogpedia`}
                fullScreen
                showAddressBar={false}
            >
                <HogpediaShell
                    title={heading}
                    tagline={isTalk ? 'This is the discussion page for the article above.' : undefined}
                    slug={slug}
                    filePath={filePath}
                    hasTalkPage={isTalk || !!talkPage}
                    referenceIds={(meta.references || []).map((r: { id: string }) => String(r.id))}
                    sectionSources={buildSectionSources(article.rawBody, meta.references)}
                    primarySource={primarySource(meta.references)}
                    currentTab={isTalk ? 'discussion' : 'article'}
                    lastModified={lastModified}
                >
                    <MaintenanceBanner notices={meta.notices} />
                    <Infobox data={meta.infobox} title={title} />
                    <div className="hp-prose">
                        <TableOfContents items={toc} />
                        <MDXProvider components={components}>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                        {meta.seeAlso && meta.seeAlso.length > 0 && (
                            <>
                                {React.createElement(
                                    makeSectionHeading('h2'),
                                    { id: 'see-also', noEdit: true },
                                    'See also'
                                )}
                                <SeeAlso entries={meta.seeAlso} />
                            </>
                        )}
                        {meta.references && meta.references.length > 0 && (
                            <>
                                {React.createElement(
                                    makeSectionHeading('h2'),
                                    { id: 'references', noEdit: true },
                                    'References'
                                )}
                                <References references={meta.references} />
                            </>
                        )}
                        {meta.external && meta.external.length > 0 && (
                            <>
                                {React.createElement(
                                    makeSectionHeading('h2'),
                                    { id: 'external-links', noEdit: true },
                                    'External links'
                                )}
                                <ul>
                                    {meta.external.map((entry: { title: string; url: string }) => (
                                        <li key={entry.url}>
                                            <Link to={entry.url} externalNoIcon className="hp-external">
                                                {entry.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                    <CategoryLinks categories={meta.categories} />
                </HogpediaShell>
            </Explorer>
        </>
    )
}

export const query = graphql`
    query HogpediaArticle($id: String!, $talkSlug: String!) {
        article: mdx(id: { eq: $id }) {
            body
            rawBody
            excerpt(pruneLength: 165)
            fields {
                slug
                commits {
                    date
                    message
                    url
                    author {
                        login
                        html_url
                    }
                }
            }
            frontmatter {
                title
                description
                hogpedia {
                    notices
                    categories
                    aliases
                    seeAlso
                    infobox {
                        title
                        hog
                        caption
                        rows {
                            label
                            value
                        }
                    }
                    references {
                        id
                        text
                        url
                    }
                    external {
                        title
                        url
                    }
                }
            }
            parent {
                ... on File {
                    relativePath
                }
            }
        }
        talkPage: mdx(fields: { slug: { eq: $talkSlug } }) {
            id
        }
    }
`
