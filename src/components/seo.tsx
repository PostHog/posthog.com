import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'
import { useApp } from '../context/App'
import { useWindow } from '../context/Window'

interface SEOProps {
    title: string
    description?: string
    image?: string
    article?: boolean
    canonicalUrl?: string
    noindex?: boolean
    imageType?: 'absolute' | 'relative'
    updateWindowTitle?: boolean
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
}: SEOProps): JSX.Element => {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()
    const { pathname } = useLocation()
    const { site } = useStaticQuery(query)

    const { defaultTitle, titleTemplate, defaultDescription, siteUrl, defaultImage, twitterUsername } =
        site.siteMetadata

    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image:
            imageType === 'absolute'
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
            {noindex && <meta name="robots" content="noindex" />}
            {seo.description && <meta name="description" content={seo.description} />}
            {seo.image && <meta name="image" content={seo.image} />}
            {<link rel="canonical" href={canonicalUrl ? canonicalUrl : seo.url} />}

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
        </Helmet>
    )
}

export default SEO

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
