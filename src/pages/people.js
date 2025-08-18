import React, { useState } from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import People from 'components/People'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'

const PeoplePage = () => {
    const { activeTab, handleTabChange, createTabs } = useCompanyNavigation()
    const [searchTerm, setSearchTerm] = useState('')

    // Create tabs using the shared hook
    const tabs = createTabs((tabValue, item) => (
        <div className="w-full">
            {tabValue === 'people' ? (
                <People searchTerm={searchTerm} />
            ) : (
                <div className="p-8 text-center text-muted">
                    <p>Loading {item.name} content...</p>
                </div>
            )}
        </div>
    ))

    return (
        <>
            <SEO title="People – PostHog" description="Meet the PostHog team" image={`/images/og/people.jpg`} />
            <Editor
                title="Company"
                type="people"
                proseSize="base"
                onSearchChange={(query) => setSearchTerm(query)}
                bookmark={{
                    title: 'People',
                    description: 'Meet the PostHog team',
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

export default PeoplePage
