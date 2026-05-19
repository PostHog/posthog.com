import React from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import TeamLocationMap from 'components/TeamLocationMap'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'

const MapPage = () => {
    const { handleTabChange, tabs, tabContainerClassName, className } = useCompanyNavigation({
        value: '/map',
        content: (
            <div className="max-w-screen-6xl mx-auto px-4 py-8">
                <h1>Team Map</h1>
                <TeamLocationMap />
            </div>
        ),
    })

    return (
        <>
            <SEO
                title="Team Map – PostHog"
                description="See where PostHog team members are based around the world"
                image={`/images/og/people.jpg`}
            />
            <Editor
                hasTabs
                type="map"
                maxWidth="100%"
                proseSize="base"
                bookmark={{
                    title: 'Team Map',
                    description: 'See where PostHog team members are based around the world',
                }}
            >
                <OSTabs
                    tabs={tabs}
                    defaultValue="/map"
                    onValueChange={handleTabChange}
                    padding
                    tabContainerClassName={tabContainerClassName}
                    className={className}
                    triggerDataScheme="primary"
                    centerTabs
                />
            </Editor>
        </>
    )
}

export default MapPage
