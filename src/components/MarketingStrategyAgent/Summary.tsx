import { GetSummarySummary } from './types'
import React from 'react'

interface Props {
    summary: GetSummarySummary
}

export const Summary = ({ summary }: Props): React.ReactElement => {
    return (
        <div className="summary">
            <h3>Market Analysis</h3>
            <p>
                <strong>Position:</strong> {summary.market_analysis.position}
            </p>
            <p>
                <strong>Key Differentiators:</strong> {summary.market_analysis.key_differentiators.join(', ')}
            </p>
            <p>
                <strong>Competitive Advantages:</strong> {summary.market_analysis.competitive_advantages.join(', ')}
            </p>
            <h3>Recommendations</h3>
            <ul>
                {summary.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                ))}
            </ul>
        </div>
    )
}
