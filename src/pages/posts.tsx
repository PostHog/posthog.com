import { Sidebar } from 'components/Edition/Posts'
import SEO from 'components/seo'
import React from 'react'

export default function Posts() {
    return (
        <>
            <SEO title="Posts - PostHog" />
            <div className="md:block hidden">
                <Sidebar />
            </div>
        </>
    )
}
