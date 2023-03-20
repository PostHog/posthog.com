import React, { useRef } from 'react'
import root from 'react-shadow/styled-components'
import { Provider as OrgProvider } from '../../hooks/useOrg'
import { Provider as UserProvider } from '../../hooks/useUser'
import SingleQuestion, { QuestionProps } from '../Question'
import { Theme } from '../Theme'
import ErrorBoundary from '../ErrorBoundary'

export const Question: React.FC<QuestionProps & { organizationId: string }> = ({
    apiHost,
    organizationId,
    onResolve,
    onSubmit,
    question,
}) => {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <ErrorBoundary>
            {/* @ts-ignore */}
            <root.div ref={containerRef}>
                <OrgProvider value={{ organizationId, apiHost }}>
                    <UserProvider>
                        <Theme containerRef={containerRef} />
                        <div className="squeak">
                            <SingleQuestion
                                apiHost={apiHost}
                                question={question}
                                onSubmit={onSubmit}
                                onResolve={onResolve}
                            />
                        </div>
                    </UserProvider>
                </OrgProvider>
            </root.div>
        </ErrorBoundary>
    )
}
