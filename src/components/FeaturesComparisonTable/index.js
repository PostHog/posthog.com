import React from 'react'
import featuresComparisonData from './comparison-data'
import './features-table.scss'

export const FeaturesComparisonTable = () => {
    return (
        <div className="features-table-container bg-navy">
            <h2 className="center header-2">Features Comparison</h2>

            <div className="mobile-labels">
                <p className="center">
                    Comparing features available in PostHog (PH), Amplitude (AM), Mixpanel (MP), and Heap (HE).
                </p>
                <br />
            </div>

            <span className="table-borders features">
                <table>
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>
                                <span className="desktop-th">PostHog</span>
                                <span className="mobile-th">PH</span>
                            </th>
                            <th>
                                <span className="desktop-th">Amplitude</span>
                                <span className="mobile-th">AM</span>
                            </th>
                            <th>
                                <span className="desktop-th">Mixpanel</span>
                                <span className="mobile-th">MP</span>
                            </th>
                            <th>
                                <span className="desktop-th">Heap</span>
                                <span className="mobile-th">HE</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {featuresComparisonData.map((feature) => (
                            <tr key={feature.title.toLowerCase()}>
                                <td>{feature.title}</td>
                                <td>{feature.posthog ? '✔' : ''}</td>
                                <td>{feature.amplitude ? '✔' : ''}</td>
                                <td>{feature.mixpanel ? '✔' : ''}</td>
                                <td>{feature.heap ? '✔' : ''}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </span>
        </div>
    )
}
