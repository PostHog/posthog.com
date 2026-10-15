import React from 'react'
import CalloutBox from './CalloutBox'

const SUPPORT_URL = 'https://us.posthog.com/#panel=support%3Asupport%3Adata_warehouse%3A%3Atrue'

interface SourceReleaseCalloutProps {
    // `releaseStatus` on the source's `SourceConfig` in posthog/posthog, fetched at build time
    // by `fetchDataWarehouseSources`. Null for a source the catalog does not describe.
    releaseStatus?: string | null
}

/** Lets a caller decide whether to render a wrapper before mounting the callout itself. */
export const hasReleaseCallout = (releaseStatus?: string | null): boolean =>
    releaseStatus === 'alpha' || releaseStatus === 'beta'

const SourceReleaseCallout: React.FC<SourceReleaseCalloutProps> = ({ releaseStatus }) => {
    if (releaseStatus === 'alpha') {
        return (
            <CalloutBox icon="IconFlask" title="Alpha release" type="action">
                <p>
                    This source is currently in <strong>alpha</strong>. The interface and available tables may change.
                </p>
            </CalloutBox>
        )
    }

    if (releaseStatus === 'beta') {
        return (
            <CalloutBox icon="IconFlask" title="Beta release" type="action">
                <p>
                    This source is currently in <strong>beta</strong>. It works end to end, but you may still hit rough
                    edges. <a href={SUPPORT_URL}>Let us know</a> if you do.
                </p>
            </CalloutBox>
        )
    }

    return null
}

export default SourceReleaseCallout
