import React from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'

const ChangelogPage = () => {
    const { activeTab, handleTabChange, createTabs } = useCompanyNavigation()

    // Create tabs using the shared hook
    const tabs = createTabs((tabValue, item) => (
        <div className="prose prose-lg max-w-none">
            {tabValue === 'changelog' ? (
                <div className="p-8">
                    <h1>Changelog</h1>
                    <p>View our latest updates and releases</p>
                    <p className="text-sm text-muted">Navigate to specific changelog entries to see details.</p>
                </div>
            ) : (
                <div className="p-8 text-center text-muted">
                    <p>Loading {item.name} content...</p>
                </div>
            )}
        </div>
    ))

    return (
        <>
            <SEO
                title="Changelog – PostHog"
                description="See what's new in PostHog"
                image={`/images/og/changelog.jpg`}
            />
            <Editor
                title="Company"
                type="changelog"
                proseSize="base"
                bookmark={{
                    title: 'Changelog',
                    description: 'Latest updates and releases',
                }}
            >
                <OSTabs
                    tabs={tabs}
                    value={activeTab}
                    onValueChange={handleTabChange}
                    frame={false}
                    className="-mx-4 -mt-4"
                    triggerDataScheme="primary"
                />
            </Editor>
        </>
    )
}

export default ChangelogPage
