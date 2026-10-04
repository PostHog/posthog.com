import React, { useContext, useEffect } from 'react'
import { useApp } from '../context/App'
import { useWindow } from '../context/Window'
import { ServerLocationContext, useLocation } from 'lib/navigation'
import { collectHead, siteMetadata } from 'lib/head'

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
    documentRkey?: string
}

export type LanguageAlternate = {
    hrefLang: string
    href: string
}

/**
 * Describes the page's <head>. Renders nothing: on the server it records the tags for the Astro
 * layout to write (see src/lib/head.ts). Astro's router swaps the head on navigation, so the client
 * only updates the window title.
 */
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
    documentRkey,
}: SEOProps): null => {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()
    const { pathname } = useLocation()
    const serverLocation = useContext(ServerLocationContext)
    const { siteUrl } = siteMetadata
    const resolvedTitle = title || siteMetadata.title

    if (typeof window === 'undefined' && serverLocation) {
        const url = `${siteUrl}${pathname}`
        collectHead(serverLocation.pathname, {
            title: resolvedTitle,
            description: description || siteMetadata.description,
            image:
                imageType === 'absolute' || image?.startsWith('http')
                    ? image
                    : `${import.meta.env.PUBLIC_DEPLOY_PRIME_URL || siteUrl}${image || siteMetadata.image}`,
            url,
            // Callers may pass a site-relative path; canonical links have to be absolute.
            canonical: (canonicalUrl?.startsWith('/') ? `${siteUrl}${canonicalUrl}` : canonicalUrl) || url,
            article: !!article,
            noindex: !!noindex,
            lang,
            languageAlternates: (languageAlternates || []).map(({ hrefLang, href }) => ({
                hrefLang,
                href: href.startsWith('http') ? href : `${siteUrl}${href.startsWith('/') ? href : `/${href}`}`,
            })),
            structuredData: structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [],
            documentRkey,
        })
    }

    useEffect(() => {
        if (updateWindowTitle && resolvedTitle && appWindow) {
            setWindowTitle(appWindow, resolvedTitle)
        }
    }, [resolvedTitle])

    return null
}

export default SEO

/**
 * PostHog as a schema.org Organization. Shared so the homepage and every product page
 * describe the same entity rather than drifting copies of it.
 */
const POSTHOG_ORGANIZATION = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PostHog',
    url: 'https://posthog.com',
    logo: 'https://posthog.com/brand/posthog-logo-stacked.png',
    sameAs: ['https://twitter.com/PostHog', 'https://github.com/PostHog', 'https://www.linkedin.com/company/posthog'],
    address: {
        '@type': 'PostalAddress',
        streetAddress: '2261 Market Street #4008',
        addressLocality: 'San Francisco',
        addressRegion: 'CA',
        postalCode: '94114',
        addressCountry: 'US',
    },
}

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
        POSTHOG_ORGANIZATION,
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
