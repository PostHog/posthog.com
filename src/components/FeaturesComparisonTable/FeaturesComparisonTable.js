import React from 'react'
/* import { Link } from 'gatsby'
import asterisk from '../../images/asterisk.svg' */
import featuresComparisonData from './comparison-data'
import './features-table.scss'

const FeaturesComparisonTable = () => {
    return (
        <div>
            <div className="features-table-container bg-navy">
                <h2 className="center header-2">Features Comparison</h2>

                <div className="mobile-labels">
                    <p className="center">
                        Comparing features available in PostHog (PH), Amplitude (AM), Mixpanel (MP), and Heap (HE).
                    </p>
                    <br />
                </div>

                <span className="table-borders features">
                    <table className="center">
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
                                <tr>
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
            {/*             <div className="featuresTableText">
                <img src={asterisk} />
                <p>
                    Full parity has not been achieved for this feature yet. You can follow our progress{' '}
                    <Link to="https://github.com/PostHog/posthog/projects/5">here</Link>.
                    </p>
            </div> */}
        </div>
    )
}

export default FeaturesComparisonTable
