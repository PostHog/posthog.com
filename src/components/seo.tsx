import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'
import { useApp } from '../context/App'
import { useWindow } from '../context/Window'
import { isMarkdownContentPath } from '../constants'

interface SEOProps {
    title: string
    description?: string
    image?: string
    article?: boolean
    canonicalUrl?: string
    noindex?: boolean
    imageType?: 'absolute' | 'relative'
    updateWindowTitle?: boolean
    lang?: string
    languageAlternates?: LanguageAlternate[]
    /** schema.org JSON-LD object(s) emitted as <script type="application/ld+json"> */
    structuredData?: Record<string, any> | Record<string, any>[]
}

export type LanguageAlternate = {
    hrefLang: string
    href: string
}

export const SEO = ({
    title,
    description,
    image,
    article,
    canonicalUrl,
    noindex,
    imageType = 'relative',
    updateWindowTitle = true,
    lang,
    languageAlternates,
    structuredData,
}: SEOProps): JSX.Element => {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()
    const { pathname } = useLocation()
    const { site } = useStaticQuery(query)

    const { defaultTitle, titleTemplate, defaultDescription, siteUrl, defaultImage, twitterUsername } =
        site.siteMetadata

    const structuredDataItems = structuredData
        ? Array.isArray(structuredData)
            ? structuredData
            : [structuredData]
        : []

    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image:
            imageType === 'absolute' || image?.startsWith('http')
                ? image
                : `${process.env.GATSBY_DEPLOY_PRIME_URL || siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathname}`,
    }

    useEffect(() => {
        if (updateWindowTitle && seo.title && appWindow) {
            setWindowTitle(appWindow, seo.title)
        }
    }, [seo.title])

    return (
        <Helmet title={seo.title} titleTemplate={titleTemplate}>
            {lang && <html lang={lang} />}
            {noindex && <meta name="robots" content="noindex" />}
            {seo.description && <meta name="description" content={seo.description} />}
            {seo.image && <meta name="image" content={seo.image} />}
            {<link rel="canonical" href={canonicalUrl ? canonicalUrl : seo.url} />}
            {/* Standard.site publication discovery hint for the blog (https://standard.site) */}
            {pathname?.startsWith('/blog') && (
                <link
                    rel="site.standard.publication"
                    href="at://did:plc:go7eemqz4y5nhonj4kg5w2p6/site.standard.publication/blog"
                />
            )}
            {languageAlternates?.map(({ hrefLang, href }) => (
                <link
                    key={hrefLang}
                    rel="alternate"
                    hrefLang={hrefLang}
                    href={href.startsWith('http') ? href : `${siteUrl}${href.startsWith('/') ? href : `/${href}`}`}
                />
            ))}
            {isMarkdownContentPath(pathname) && (
                <link rel="alternate" type="text/markdown" href={`${siteUrl}${pathname.replace(/\/$/, '')}.md`} />
            )}

            {seo.url && <meta property="og:url" content={seo.url} />}
            {article ? <meta property="og:type" content="article" /> : null}
            {seo.title && <meta property="og:title" content={seo.title} />}
            {seo.description && <meta property="og:description" content={seo.description} />}
            {seo.image && <meta property="og:image" content={seo.image} />}

            <meta name="twitter:card" content="summary_large_image" />
            {twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}
            {seo.title && <meta name="twitter:title" content={seo.title} />}
            {seo.description && <meta name="twitter:description" content={seo.description} />}
            {seo.image && <meta name="twitter:image" content={seo.image} />}
            <meta name="twitter:site" content="@PostHog" />

            {structuredDataItems.map((item, i) => (
                <script key={`ld-${i}`} type="application/ld+json">
                    {JSON.stringify(item)}
                </script>
            ))}
        </Helmet>
    )
}

export default SEO

/**
 * Build schema.org JSON-LD for a product/app page: a SoftwareApplication, the PostHog
 * Organization, and (optionally) a FAQPage. Pass the result to <SEO structuredData={...} />.
 * FAQ entries without an `answer` are skipped, so FAQPage only renders once answers exist.
 */
export const buildProductStructuredData = ({
    name,
    description,
    slug,
    operatingSystem = 'Web',
    faq,
}: {
    name: string
    description?: string
    slug: string
    operatingSystem?: string
    faq?: { question?: string; answer?: string }[]
}): Record<string, any>[] => {
    const items: Record<string, any>[] = [
        {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name,
            description,
            applicationCategory: 'BusinessApplication',
            operatingSystem,
            url: `https://posthog.com/${(slug || '').replace(/^\//, '')}`,
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                description: 'Generous free tier, then usage-based pricing',
            },
            publisher: { '@type': 'Organization', name: 'PostHog', url: 'https://posthog.com' },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'PostHog',
            url: 'https://posthog.com',
            logo: 'https://posthog.com/images/og/default.png',
            sameAs: [
                'https://twitter.com/PostHog',
                'https://github.com/PostHog',
                'https://www.linkedin.com/company/posthog',
            ],
        },
    ]
    const faqEntities = (faq || [])
        .filter((q) => q && q.question && q.answer)
        .map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: { '@type': 'Answer', text: q.answer },
        }))
    if (faqEntities.length) {
        items.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqEntities })
    }
    return items
}

const query = graphql`
    query SEO {
        site {
            siteMetadata {
                defaultTitle: title
                titleTemplate
                defaultDescription: description
                siteUrl: url
                defaultImage: image
                twitterUsername
            }
        }
    }
`
