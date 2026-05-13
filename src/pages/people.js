import React from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import People from 'components/People'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'
import { useApp } from '../context/App'

const PeoplePage = () => {
    const { websiteMode } = useApp()

    const { handleTabChange, tabs, tabContainerClassName, className } = useCompanyNavigation({
        value: '/people',
        content: (
            <div className={` ${websiteMode && 'max-w-7xl mx-auto'}`}>
                <People />
            </div>
        ),
    })

    return (
        <>
            <SEO title="People – PostHog" description="Meet the PostHog team" image={`/images/og/people.jpg`} />
            <Editor
                hasTabs
                type="people"
                maxWidth="100%"
                proseSize="base"
                bookmark={{
                    title: 'People',
                    description: 'Meet the PostHog team',
                }}
            >
                <OSTabs
                    tabs={tabs}
                    defaultValue="/people"
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

export default PeoplePage
