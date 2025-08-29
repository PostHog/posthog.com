import { ResearchCompetitor } from './types'
import React from 'react'

interface Props {
    competitor: ResearchCompetitor
}

export const Competitor = ({ competitor }: Props): React.ReactElement => {
    const info = competitor.enrich_competitors_data || competitor.find_competitors_data
    return (
        <div className="competitor">
            <h3>{competitor.name}</h3>
            {info && (
                <div>
                    <p>
                        <strong>Score:</strong> {info.score ?? 'N/A'}
                    </p>
                    <p>
                        <strong>Published Date:</strong> {new Date(info.published_date).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Author:</strong> {info.author}
                    </p>
                    <p>
                        <strong>Summary:</strong> {info.summary}
                    </p>
                </div>
            )}
        </div>
    )
}
