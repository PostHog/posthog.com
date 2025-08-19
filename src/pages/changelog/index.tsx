import React from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'

const ChangelogPage = () => {
    const { tabs, handleTabChange, tabContainerClassName, className } = useCompanyNavigation({
        value: '/changelog/2025',
        content: (
            <div className="p-8 max-w-3xl mx-auto">
                <h1>Changelog</h1>
                <p>View our latest updates and releases</p>
                <p className="text-sm text-muted">Navigate to specific changelog entries to see details.</p>
            </div>
        ),
    })

    return (
        <>
            <SEO
                title="Changelog – PostHog"
                description="See what's new in PostHog"
                image={`/images/og/changelog.jpg`}
            />
            <Editor
                type="changelog"
                maxWidth="full"
                proseSize="base"
                bookmark={{
                    title: 'Changelog',
                    description: 'Latest updates and releases',
                }}
            >
                <OSTabs
                    tabs={tabs}
                    defaultValue="/changelog/2025"
                    onValueChange={handleTabChange}
                    frame={false}
                    tabContainerClassName={tabContainerClassName}
                    className={className}
                    triggerDataScheme="primary"
                />
            </Editor>
        </>
    )
}

export default ChangelogPage
