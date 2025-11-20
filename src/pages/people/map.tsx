import React from 'react'
import SEO from 'components/seo'
import HogMap from 'components/HogMap'

export default function PeopleMapPage(): JSX.Element {
    return (
        <div data-scheme="primary" className="bg-primary h-full relative">
            <SEO title="The hog map" />
            <HogMap />
        </div>
    )
}
