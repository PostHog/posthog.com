import React from 'react'
import { CallToAction } from 'components/CallToAction'

const StepUploadSymbolSets = ({
    urlPath,
    framework,
    symbolType = 'source maps',
    basePath = 'upload-source-maps',
}: {
    urlPath: string
    framework: string
    symbolType?: string
    basePath?: string
}) => {
    return (
        <>
            <p>
                Great, you're capturing exceptions! If you serve minified bundles, the next step is to upload{' '}
                {symbolType} to generate accurate stack traces.
            </p>
            <p>Let's continue to the next section.</p>
            <CallToAction className="my-2" size="sm" to={`/docs/error-tracking/${basePath}/${urlPath}`} external={true}>
                Upload {symbolType} {framework ? `for ${framework}` : ''}
            </CallToAction>
        </>
    )
}

export default StepUploadSymbolSets
