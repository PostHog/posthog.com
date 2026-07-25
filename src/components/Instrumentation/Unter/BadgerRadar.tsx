import React, { useEffect, useRef, useState } from 'react'

// Broken on purpose. The badger layer 403s every time, which gives the
// error-tracking, rage-click, and server-logs annotations something real
// to point at.
export default function BadgerRadar(): JSX.Element {
    const [loading, setLoading] = useState(false)
    const timeout = useRef<ReturnType<typeof setTimeout>>()

    useEffect(() => () => clearTimeout(timeout.current), [])

    const retry = () => {
        if (loading) return
        setLoading(true)
        timeout.current = setTimeout(() => setLoading(false), 900)
    }

    return (
        <div className="un-radar" data-unter-id="badger-radar">
            <div className="un-radar-head">
                <h3>Live badger radar</h3>
                <span className="un-live">LIVE</span>
            </div>
            <div className="un-radar-body">
                {loading ? (
                    <div className="un-radar-loading">Loading badger layer…</div>
                ) : (
                    <div className="un-radar-error" data-unter-id="radar-error">
                        <b>TileLoadError: 403 (tiles.unter.co.uk/badger-layer)</b>
                        <div className="un-desc">
                            The badger layer failed to load. The badgers are still out there. We just can't show you
                            where, which is worse, really.
                        </div>
                        <button data-unter-id="btn-radar-retry" onClick={retry}>
                            Retry
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
