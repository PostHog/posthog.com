import React from 'react'
import Editor from 'components/Editor'
import { SEO } from 'components/seo'
import TemplatesLibrary from 'components/TemplatesLibrary'

export default function TemplatesPage(): JSX.Element {
    return (
        <>
            <SEO
                title="Templates – PostHog"
                description="Pre-built dashboards, surveys, and workflows to help you start collecting insights and feedback right away"
                image="/images/og/default.png"
            />
            <Editor
                maxWidth={1100}
                title="templates"
                type="library"
                bookmark={{
                    title: 'Templates',
                    description: 'Pre-built dashboards, surveys, and workflows',
                }}
            >
                <TemplatesLibrary />
            </Editor>
        </>
    )
}
