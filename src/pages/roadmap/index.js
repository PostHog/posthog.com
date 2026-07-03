import React from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import EarlyAccessFeaturesSection from 'components/Roadmap/EarlyAccessFeaturesSection'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'

const RoadmapPage = () => {
    const { tabs, handleTabChange, tabContainerClassName, className } = useCompanyNavigation({
        value: '/roadmap',
        content: (
            <div className="p-4 @xl:p-8">
                <img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/hog_engineer_0eebaf7af1.png"
                    alt="A hedgehog engineer hard at work"
                    className="@xl:float-right @xl:ml-4 max-h-40 -mt-2"
                />
                <h1>Roadmap</h1>
                <p className="text-secondary max-w-2xl">
                    Here's what we're building. Betas are ready to enable today, and anything coming soon has a waitlist
                    – drop your email and we'll let you know the moment it ships.
                </p>
                <EarlyAccessFeaturesSection />
            </div>
        ),
    })

    return (
        <>
            <SEO
                title="Roadmap – PostHog"
                description="See what we're building next"
                image={`/images/og/roadmap.jpg`}
            />
            <Editor
                hasTabs
                type="roadmap"
                proseSize="base"
                maxWidth="100%"
                bookmark={{
                    title: 'Roadmap',
                    description: "See what we're building next",
                }}
            >
                <OSTabs
                    tabs={tabs}
                    defaultValue="/roadmap"
                    onValueChange={handleTabChange}
                    padding
                    contentPadding={false}
                    tabContainerClassName={tabContainerClassName}
                    className={className}
                    triggerDataScheme="primary"
                    centerTabs
                />
            </Editor>
        </>
    )
}

export default RoadmapPage
