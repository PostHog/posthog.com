import React from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'

const ChangelogPage = () => {
    const { tabs, handleTabChange, tabContainerClassName, className } = useCompanyNavigation({
        value: '/changelog/2025',
        content: <></>,
    })

    return (
        <>
            <SEO
                title="Changelog – PostHog"
                description="See what's new in PostHog"
                image={`/images/og/changelog.jpg`}
            />
            <Editor
                hasTabs
                type="changelog"
                maxWidth="100%"
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

export default ChangelogPage
