import React from 'react'

export const OnePlaceSlide = () => {
    return (
        <div>
            <h2 className="mt-0">Build better products with better data </h2>
            <p className="text-secondary text-sm">
                These aren't integrations. Third party data is imported into PostHog's CDP and warehouse and lives as a
                first-class citizen. This means you can query third party data _and_ product usage data together,
                leading to more informed decisions.
            </p>

            <div className="grid grid-cols-3 gap-4">
                <div className="text-center text-secondary">Data sources & import</div>
                <div className="text-center text-secondary">Manage & query</div>
                <div className="text-center text-secondary">Data export</div>
            </div>
        </div>
    )
}

export const UnderstandUsageSlide = () => {
    return (
        <div>
            <p className="text-secondary text-sm">Understand product usage</p>
        </div>
    )
}

export const DebugFixSlide = () => {
    return (
        <div>
            <p className="text-secondary text-sm">Debug & fix issues</p>
        </div>
    )
}

export const TestRolloutSlide = () => {
    return (
        <div>
            <p className="text-secondary text-sm">Test & roll out changes</p>
        </div>
    )
}
