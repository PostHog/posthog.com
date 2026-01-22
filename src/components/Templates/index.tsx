import React from 'react'
import Editor from 'components/Editor'
import { SEO } from 'components/seo'
import Link from 'components/Link'
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
                <p className="!mt-0 mb-2">
                    Pre-built dashboards, surveys, and workflows. Copy one, customize it, ship it.
                </p>
                <p className="!mt-0 mb-4">
                    Learn more about{' '}
                    <Link to="/docs/product-analytics/dashboards" state={{ newWindow: true }}>
                        dashboards
                    </Link>
                    ,{' '}
                    <Link to="/docs/surveys" state={{ newWindow: true }}>
                        surveys
                    </Link>
                    , or{' '}
                    <Link to="/docs/workflows" state={{ newWindow: true }}>
                        workflows
                    </Link>
                    .
                </p>
                <TemplatesLibrary />
            </Editor>
        </>
    )
}
