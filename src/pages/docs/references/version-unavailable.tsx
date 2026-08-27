import React, { useEffect, useState } from 'react'
import SEO from 'components/seo'
import Wizard from 'components/Wizard'
import Link from 'components/Link'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { parseVersionedReferencePath } from 'components/SdkReferences/utils'

/**
 * Served (via a vercel.json rewrite) for versioned SDK reference URLs the build no longer
 * publishes. Only the newest few versions per SDK are built, so older ones age out — see
 * MAX_VERSIONS_PER_SDK in gatsby/sourceNodes.ts.
 *
 * The rewrite is transparent, so the requested URL is still in the address bar. One page serves
 * every SDK, which is why the copy below is generic and the specifics are filled in on the client.
 */

export default function VersionUnavailable(): JSX.Element {
    // Resolved after mount: the static HTML is shared by every SDK, so the requested version is
    // only knowable on the client. Filling it in during render would break hydration.
    const [requested, setRequested] = useState<{ sdk: string; version: string } | null>(null)

    useEffect(() => {
        setRequested(parseVersionedReferencePath(window.location.pathname))
    }, [])

    return (
        <>
            <SEO
                title="SDK reference version not available"
                description="This version of the SDK reference is no longer published. The current reference is available instead."
                noindex
            />
            <Wizard>
                <div className="bg-accent h-full">
                    <ScrollArea>
                        <div className="p-6 text-sm">
                            <h1 className="text-lg mb-4">This SDK reference version is not available</h1>
                            <p className="mb-2">
                                {requested ? (
                                    <>
                                        <strong>
                                            {requested.sdk} {requested.version}
                                        </strong>{' '}
                                        is no longer published.
                                    </>
                                ) : (
                                    <>The version you asked for is no longer published.</>
                                )}{' '}
                                We keep the reference for the most recent releases only, so older versions age out.
                            </p>
                            <p className="mb-4">
                                The current reference is always at the unversioned URL, and it documents the latest
                                release:
                            </p>
                            <p className="mb-4">
                                {requested ? (
                                    <Link to={`/docs/references/${requested.sdk}`} className="underline font-medium">
                                        /docs/references/{requested.sdk}
                                    </Link>
                                ) : (
                                    <Link to="/docs/libraries" className="underline font-medium">
                                        Browse all SDK docs
                                    </Link>
                                )}
                            </p>
                            <p className="mb-2 opacity-75">
                                Its contents describe the latest version, so anything you read there may not match the
                                version you asked for. To pin behavior to a specific release, check that version's
                                changelog in the SDK repository.
                            </p>
                        </div>
                    </ScrollArea>
                </div>
            </Wizard>
        </>
    )
}
