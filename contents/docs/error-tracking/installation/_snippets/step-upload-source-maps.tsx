import React from 'react'
import { CallToAction } from 'components/CallToAction'

const StepUploadSourceMaps = ({ urlPath, framework }: { urlPath: string; framework: string }) => {
    return (
        <>
            <p>
                Great, you're capturing exceptions! If you serve minified bundles, the next step is to upload source
                maps to generate accurate stack traces.
            </p>
            <p>Let's continue to the next section.</p>
            <CallToAction
                className="my-2"
                size="sm"
                to={`/docs/error-tracking/upload-source-maps/${urlPath}`}
                external={true}
            >
                Upload source maps {framework ? `for ${framework}` : ''}
            </CallToAction>
        </>
    )
}

export default StepUploadSourceMaps
