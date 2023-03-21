import React, { useRef } from 'react'
import root from 'react-shadow/styled-components'

import QuestionsList from '../Questions'
import { Theme } from '../Theme'
import ErrorBoundary from '../ErrorBoundary'

type QuestionsProps = {
    limit?: number
    onSubmit: () => void
    onLoad: () => void
    topics?: boolean
    onSignUp: () => void
    topic?: any
    profileLink?: (profile: any) => string
}

export const Questions = ({ limit, onSubmit, onLoad, topics = true, onSignUp, topic, profileLink }: QuestionsProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <ErrorBoundary>
            {/* @ts-ignore */}
            <root.div ref={containerRef}>
                <Theme containerRef={containerRef} />
                <div className="squeak">
                    <QuestionsList
                        onSignUp={onSignUp}
                        onLoad={onLoad}
                        topics={topics}
                        onSubmit={onSubmit}
                        limit={limit}
                        topic={topic}
                    />
                </div>
            </root.div>
        </ErrorBoundary>
    }
    )
