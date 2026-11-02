import React from 'react'

/** A failed optional illustration must not remove the surrounding chapter. */
export default class FigureErrorBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
    state = { failed: false }

    static getDerivedStateFromError(): { failed: boolean } {
        return { failed: true }
    }

    render(): React.ReactNode {
        return this.state.failed ? (
            <p role="status" className="not-prose my-6 text-sm text-secondary">
                This example couldn’t load. Refresh to try again.
            </p>
        ) : (
            this.props.children
        )
    }
}
