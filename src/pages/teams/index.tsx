import React from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import Teams from '../teams'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'

const TeamsPage = () => {
    const { activeTab, handleTabChange, createTabs } = useCompanyNavigation()

    // Create tabs using the shared hook
    const tabs = createTabs((tabValue, item) => (
        <div className="w-full">
            {tabValue === 'teams' ? (
                <Teams />
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
                title="Teams – PostHog"
                description="PostHog teams and their missions"
                image={`/images/og/teams.jpg`}
            />
            <Editor
                title="Company"
                type="teams"
                proseSize="base"
                bookmark={{
                    title: 'Teams',
                    description: 'PostHog teams and their missions',
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

export default TeamsPage
