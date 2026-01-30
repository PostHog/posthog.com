import React from 'react'
import Link from 'components/Link'

export default function ProductComparisonDisclaimer() {
    return (
        <p className="text-sm text-secondary mt-3 mb-6">
            Help us keep this comparison up to date.{' '}
            <Link
                to="https://github.com/PostHog/posthog.com/pulls"
                external
                className="text-secondary underline hover:text-primary"
            >
                Open a PR
            </Link>{' '}
            if you spot something wrong!
        </p>
    )
}

export { ProductComparisonDisclaimer }
