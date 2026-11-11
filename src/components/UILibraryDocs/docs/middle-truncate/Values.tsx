import React from 'react'
import { MiddleTruncate } from 'components/UI/MiddleTruncate'
import { CopyButton } from 'components/UI/CopyButton'

const values = [
    'posthog.com/docs/advanced-configuration/feature-flags',
    '/workspace/posthog/frontend/src/scenes/feature-flags/FeatureFlag.tsx',
    'phc_example_public_project_key_0123456789abcdef',
    'subscription_checkout_payment_confirmation_completed',
]

export default function Values(): JSX.Element {
    return (
        <div className="w-full max-w-sm space-y-3">
            {values.map((value) => (
                <div key={value} className="flex min-w-0 items-center gap-2">
                    <MiddleTruncate className="flex-1 font-code text-sm" endChars={18}>
                        {value}
                    </MiddleTruncate>
                    <CopyButton text={value} label="Copy full value" />
                </div>
            ))}
        </div>
    )
}
