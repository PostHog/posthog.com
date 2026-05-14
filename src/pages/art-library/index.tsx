import React from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import { useApp } from '../../context/App'

export default function ArtLibrary(): JSX.Element {
    const { websiteMode } = useApp()
    return (
        <>
            <SEO title="Art library - PostHog" description="Internal art library." image={`/images/og/default.png`} />
            <Explorer template="generic" slug="art-library" title="Art library" fullScreen showAddressBar={false}>
                <iframe
                    src="https://posthog-art-library.vercel.app/"
                    className={`w-full h-full border-0 ${websiteMode ? 'min-h-[calc(100vh-103px)]' : ''}`}
                />
            </Explorer>
        </>
    )
}
