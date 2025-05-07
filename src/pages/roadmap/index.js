import React from 'react'
import Roadmap from 'components/Roadmap'
import { Editor } from 'components/Editor'

const RoadmapPage = () => {
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
        >
            <Roadmap />
        </Editor>
    )
}

export default RoadmapPage
