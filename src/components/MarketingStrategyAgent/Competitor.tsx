import { ResearchCompetitor } from './types'
import React from 'react'

interface Props {
    competitor: ResearchCompetitor
}

export const Competitor = ({ competitor }: Props): React.ReactElement => {
    return (
        <div className="competitor">
            <h3>{competitor.name}</h3>
            {competitor.marketing_research_data && (
                <div>
                    <p>
                        <strong>Score:</strong> {competitor.marketing_research_data.score ?? 'N/A'}
                    </p>
                    <p>
                        <strong>Published Date:</strong>{' '}
                        {new Date(competitor.marketing_research_data.published_date).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Author:</strong> {competitor.marketing_research_data.author}
                    </p>
                    <p>
                        <strong>Summary:</strong> {competitor.marketing_research_data.summary}
                    </p>
                </div>
            )}
        </div>
    )
}
