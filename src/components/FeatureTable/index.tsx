import React from 'react'
import features from '../../features.json'

const FeatureTable = () => {
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
                      selfServe: determineAvailability('free', value.features),
                      enterprise: determineAvailability('enterprise', value.features),
                  }

        return (
            <section key={feature} className="p-8">
                <h2>{feature}</h2>
                <table className="table-fixed border">
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
                        <table className="table-fixed border">
                            <tr className="border-b">
                                <th className="py-4"></th>
                                <th>Free / Open source</th>
                                <th>Self-serve</th>
                                <th>Enterprise</th>
                            </tr>
                            {Object.entries(value.features).map(([feature, availability]) => {
                                return (
                                    <tr key={feature} className="text-center">
                                        <td className="py-2">{feature}</td>
                                        <td>{renderFeature(availability.free)}</td>
                                        <td>{renderFeature(availability.selfServe)}</td>
                                        <td>{renderFeature(availability.enterprise)}</td>
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
