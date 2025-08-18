import React from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import Roadmap from 'components/Roadmap'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'

const RoadmapPage = () => {
    const { activeTab, handleTabChange, createTabs } = useCompanyNavigation()

    // Create tabs using the shared hook
    const tabs = createTabs((tabValue, item) => (
        <div className="w-full">
            {tabValue === 'roadmap' ? (
                <Roadmap />
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
                title="Roadmap – PostHog"
                description="See what we're building next"
                image={`/images/og/roadmap.jpg`}
            />
            <Editor
                title="Company"
                type="roadmap"
                proseSize="base"
                bookmark={{
                    title: 'Roadmap',
                    description: "See what we're building next",
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

export default RoadmapPage
