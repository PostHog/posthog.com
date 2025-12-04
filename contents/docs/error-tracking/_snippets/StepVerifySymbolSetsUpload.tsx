import React from 'react'
import { Step } from '../../../../src/components/Docs/Steps'
import { CallToAction } from '../../../../src/components/CallToAction'

interface StepVerifySymbolSetsUploadProps {
    symbolType?: 'source maps' | 'mappings'
}

export const StepVerifySymbolSetsUpload: React.FC<StepVerifySymbolSetsUploadProps> = ({
    symbolType = 'source maps',
}) => {
    return (
        <Step checkpoint title={`Verify ${symbolType} upload`}>
            Confirm that {symbolType} are successfully uploaded to PostHog.
            <CallToAction
                className="my-2"
                size="sm"
                type="secondary"
                to="https://app.posthog.com/settings/project-error-tracking#error-tracking-symbol-sets"
                external={true}
            >
                Check symbol sets in PostHog
            </CallToAction>
        </Step>
    )
}

export default StepVerifySymbolSetsUpload
