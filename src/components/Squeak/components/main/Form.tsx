import React, { useRef } from 'react'
import root from 'react-shadow/styled-components'
import QuestionForm from '../QuestionForm'
import { Theme } from '../Theme'
import ErrorBoundary from '../ErrorBoundary'

type FormProps = {
    initialView?: string
    onSubmit: React.FormEventHandler
}

export const Form: React.FC<FormProps> = ({ initialView, onSubmit }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <ErrorBoundary>
            {/* @ts-ignore */}
            <root.div ref={containerRef}>
                <Theme containerRef={containerRef} />
                <div className="squeak">
                    {/* @ts-ignore */}
                    <QuestionForm onSubmit={onSubmit} initialView={initialView} />
                </div>
            </root.div>
        </ErrorBoundary>
    )
}
