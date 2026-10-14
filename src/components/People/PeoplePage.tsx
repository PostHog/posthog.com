import React from 'react'
import Editor from 'components/Editor'
import SEO from 'components/seo'
import People from 'components/People'

interface PeoplePageProps {
    initialView?: 'list' | 'map'
}

const PeoplePage = ({ initialView = 'list' }: PeoplePageProps) => {
    return (
        <>
            <SEO title="People – PostHog" description="Meet the PostHog team" image={`/images/og/people.jpg`} />
            <Editor
                type="people"
                maxWidth="100%"
                hasPadding={false}
                proseSize="base"
                bookmark={{
                    title: 'People',
                    description: 'Meet the PostHog team',
                }}
            >
                <People initialView={initialView} />
            </Editor>
        </>
    )
}

export default PeoplePage
