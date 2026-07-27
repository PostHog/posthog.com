import React, { useEffect, useRef, useState } from 'react'

// Broken on purpose. The coverage tiles 403 every time, which gives the
// error-tracking, rage-click, and server-logs annotations something real
// to point at. Retry fails too, so the button stays worth hammering.
export default function CoverageMap(): JSX.Element {
    const [loading, setLoading] = useState(false)
    const timeout = useRef<ReturnType<typeof setTimeout>>()

    useEffect(() => () => clearTimeout(timeout.current), [])

    const retry = () => {
        if (loading) return
        setLoading(true)
        timeout.current = setTimeout(() => setLoading(false), 900)
    }

    return (
        <div className="un-coverage" data-unter-id="coverage-map">
            <div className="un-coverage-head">
                <h3>Where Unter runs</h3>
            </div>
            <div className="un-coverage-body">
                {loading ? (
                    <div className="un-coverage-loading">Loading service areas…</div>
                ) : (
                    <div className="un-coverage-error" data-unter-id="coverage-error">
                        <b>TileLoadError: 403 (tiles.unter.co.uk/coverage)</b>
                        <div className="un-desc">
                            The coverage map didn't load. Unter is still running in every area, we just can't show you
                            where right now.
                        </div>
                        <button data-unter-id="btn-coverage-retry" onClick={retry}>
                            Retry
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
