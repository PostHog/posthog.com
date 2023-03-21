import React from 'react'

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: any) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error(error, errorInfo)
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return null
        } else {
            return this.props.children
        }
    }
}
