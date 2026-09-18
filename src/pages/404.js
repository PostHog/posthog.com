import React from 'react'
import SEO from 'components/seo'
import NotFoundPage from 'components/NotFoundPage'

export default function NotFound() {
    return (
        <>
            {/* The 404 rendered no <SEO>, so it was the one page with no canonical, no
                og tags and no llms.txt signpost — and nothing telling a search engine
                not to index it. */}
            <SEO title="404: Page not found" noindex />
            <NotFoundPage />
        </>
    )
}
