import React, { useState } from 'react'
import Editor from 'components/Editor'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import Teams from '../teams'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'

const TeamsPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const { handleTabChange, tabs, tabContainerClassName, className } = useCompanyNavigation({
        value: '/teams',
        content: (
            <div className="max-w-screen-lg mx-auto mt-6 px-4">
                <Teams searchTerm={searchTerm} />
            </div>
        ),
    })

    return (
        <>
            <SEO
                title="Teams – PostHog"
                description="PostHog teams and their missions"
                image={`/images/og/teams.jpg`}
            />
            <Editor
                type="teams"
                maxWidth="full"
                proseSize="base"
                onSearchChange={(query) => setSearchTerm(query)}
                bookmark={{
                    title: 'Teams',
                    description: 'PostHog teams and their missions',
                }}
            >
                <OSTabs
                    tabs={tabs}
                    defaultValue="/teams"
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

export default TeamsPage
