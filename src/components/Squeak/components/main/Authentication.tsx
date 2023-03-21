import React, { useRef } from 'react'
import AuthenticationComponent from '../Authentication'
import root from 'react-shadow/styled-components'
import { Theme } from '../Theme'
import ErrorBoundary from '../ErrorBoundary'

type AuthenticationProps = {
    onAuth: () => void
}

export const Authentication: React.FC<AuthenticationProps> = ({ onAuth }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <ErrorBoundary>
            {/* @ts-ignore */}
            <root.div ref={containerRef}>
                <Theme containerRef={containerRef} />
                <div className="squeak">
                    <AuthenticationComponent
                        banner={{
                            title: 'Please signup to post.',
                            body: 'Create an account to ask questions & help others.',
                        }}
                        buttonText={{
                            login: 'Login & post question',
                            signUp: 'Sign up & post question',
                        }}
                        setParentView={() => {}}
                        handleMessageSubmit={onAuth}
                        onSignUp={onAuth}
                    />
                </div>
            </root.div>
        </ErrorBoundary>
    )
}
export default Authentication
