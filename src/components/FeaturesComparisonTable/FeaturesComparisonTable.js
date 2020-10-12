import React from 'react'
import featuresComparisonData from './comparison-data'
import styles from './features-table.module.css'

const FeaturesComparisonTable = () => {
    return (
        <div>
            <h2 className={styles.center}>Comparison</h2>

            <span className={`${styles.tableBorders} ${styles.features} ${styles.center}`}>
                <table>
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>PostHog</th>
                            <th>Amplitude</th>
                            <th>Mixpanel</th>
                            <th>Heap</th>
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
    )
}

export default FeaturesComparisonTable
