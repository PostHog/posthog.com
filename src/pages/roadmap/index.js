import React, { useState } from 'react'
import Roadmap from 'components/Roadmap'
import { Editor } from 'components/Editor'

const RoadmapPage = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearchChange = (query) => {
        // Update the search query state
        setSearchQuery(query)
    }

    return (
        <Editor
            title="roadmap"
            type="psheet"
            slug="/roadmap"
            maxWidth="full"
            filters={{
                products: ['product_analytics'],
                caseStudy: true,
            }}
            onSearchChange={handleSearchChange}
        >
            <Roadmap searchQuery={searchQuery} />
        </Editor>
    )
}

export default RoadmapPage
