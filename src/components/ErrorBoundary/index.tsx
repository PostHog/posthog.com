import React from 'react'

interface ErrorBoundaryProps {
    children: React.ReactNode
    /** Rendered in place of the children after a child throws. Defaults to nothing. */
    fallback?: React.ReactNode
    /** Called once when a child throws, for logging or error tracking. */
    onError?: (error: Error, info: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
    hasError: boolean
}

/**
 * Catches a render, lifecycle, or effect error thrown by any descendant and shows `fallback`
 * instead. Without a boundary, one throw unmounts the whole React tree above it, so wrap any
 * subtree whose failure should stay local (for example a third-party widget) in this component.
 */
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true }
    }

    componentDidCatch(error: Error, info: React.ErrorInfo): void {
        this.props.onError?.(error, info)
        // Keep the error visible: it is unhandled without a boundary, so report it to error tracking.
        if (typeof window !== 'undefined') {
            ;(window as any).posthog?.captureException?.(error, { react_component_stack: info.componentStack })
        }
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return this.props.fallback ?? null
        }
        return this.props.children
    }
}
