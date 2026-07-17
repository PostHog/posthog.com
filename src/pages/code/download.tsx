import Editor from 'components/Editor'
import SEO from 'components/seo'
import { DownloadContent } from 'components/Code/DownloadContent'
import React from 'react'

export default function CodeDownloadPage(): JSX.Element {
    return (
        <>
            <SEO
                title="Download PostHog Code"
                description="Download the PostHog Code desktop app for macOS, Windows, or Linux."
                noindex
            />
            <Editor slug="/code/download" maxWidth="100%" hasPadding={false}>
                <div className="@container not-prose font-rounded">
                    <DownloadContent className="max-w-xl mx-auto px-4 @xl:px-8 py-16 text-center" />
                </div>
            </Editor>
        </>
    )
}
