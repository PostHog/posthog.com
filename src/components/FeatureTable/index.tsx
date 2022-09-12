import React from 'react'
import features from '../../features.json'

export const FeatureTable = () => {
    const renderFeature = (availability: true | false | 'some' | string) => {
        switch (availability) {
            case true:
                return '✔️'
            case 'some':
                return '⚠️'
            case false:
                return '❌'
        }
    }

    const determineAvailability = (
        plan: 'free' | 'selfServe' | 'enterprise',
        features: Record<string, { free: boolean; selfServe: boolean; enterprise: boolean }>
    ) => {
        if (Object.values(features).every((feature) => feature[plan])) {
            return true
        } else if (Object.values(features).some((feature) => feature[plan])) {
            return 'some'
        } else {
            return false
        }
    }

    return Object.entries(features).map(([feature, value]) => {
        const availability =
            'availability' in value
                ? value.availability
                : {
                      free: determineAvailability('free', value.features),
                      selfServe: determineAvailability('selfServe', value.features),
                      enterprise: determineAvailability('enterprise', value.features),
                  }

        return (
            <section key={feature}>
                <h2>{value.name}</h2>
                <table className="table-fixed">
                    <tr>
                        <th className="py-4"></th>
                        <th>Free / Open source</th>
                        <th>Self-serve</th>
                        <th>Enterprise</th>
                    </tr>
                    <tr className="text-center">
                        <td></td>
                        <td>{renderFeature(availability.free)}</td>
                        <td>{renderFeature(availability.selfServe)}</td>
                        <td>{renderFeature(availability.enterprise)}</td>
                    </tr>
                </table>

                {'features' in value ? (
                    <>
                        <h5>Features</h5>
                        <table className="table-fixed">
                            <tr>
                                <th className="py-4"></th>
                                <th>Free / Open source</th>
                                <th>Self-serve</th>
                                <th>Enterprise</th>
                            </tr>

                            {Object.values(value.features).map(({ name, free, selfServe, enterprise }) => {
                                return (
                                    <tr key={feature} className="text-center">
                                        <td className="py-2">{name}</td>
                                        <td>{renderFeature(free)}</td>
                                        <td>{renderFeature(selfServe)}</td>
                                        <td>{renderFeature(enterprise)}</td>
                                    </tr>
                                )
                            })}
                        </table>
                    </>
                ) : null}
            </section>
        )
    })
}

export default FeatureTable
