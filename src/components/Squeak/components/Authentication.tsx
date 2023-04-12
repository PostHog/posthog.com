import React, { useState, useRef } from 'react'
import root from 'react-shadow/styled-components'

import type { User } from 'hooks/useUser'
import ForgotPassword from './auth/ForgotPassword'
import Avatar from './Avatar'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import ResetPassword from './auth/ResetPassword'

import { Theme } from './Theme'
type AuthenticationProps = {
    formValues?: any
    setParentView?: (view: string | null) => void
    initialView?: string
    buttonText?: Record<string, string>
    showBanner?: boolean
    showProfile?: boolean
    handleMessageSubmit?: (values: any, user: User | null) => void
    onAuth?: () => void
}

export const Authentication = ({
    formValues,
    setParentView,
    initialView = 'sign-in',
    buttonText = { login: 'Login', signUp: 'Sign up' },
    showBanner = true,
    showProfile = true,
    handleMessageSubmit,
    onAuth,
}: AuthenticationProps) => {
    const [view, setView] = useState(initialView)
    const [message, setMessage] = useState<string | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleForgotPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setView('forgot-password')
    }

    return (
        <root.div ref={containerRef}>
            <Theme containerRef={containerRef} />
            <div className="squeak">
                {showProfile && <Avatar />}
                {formValues && (
                    <div className="squeak-post-preview-container">
                        <div className="squeak-post-preview">
                            {formValues?.subject && <h3>{formValues.subject}</h3>}
                            {formValues.question}
                        </div>
                        <div className="squeak-button-container">
                            <button onClick={() => setParentView?.('question-form')}>Edit post</button>
                        </div>
                    </div>
                )}
                <div style={showProfile ? { marginLeft: 50 } : {}} className={`squeak-authentication-form-container`}>
                    {showBanner && (
                        <div className="squeak-authentication-form-message">
                            <h4>Please signup to post.</h4>
                            <p>Create an account to ask questions & help others.</p>
                        </div>
                    )}
                    <div className="squeak-authentication-form">
                        <div className="squeak-authentication-navigation">
                            <button className={view === 'sign-in' ? 'active' : ''} onClick={() => setView('sign-in')}>
                                Login
                            </button>
                            <button className={view === 'sign-up' ? 'active' : ''} onClick={() => setView('sign-up')}>
                                Signup
                            </button>
                            <div
                                style={{
                                    opacity: view === 'forgot-password' || view === 'reset-password' ? 0 : 1,
                                }}
                                className={`squeak-authentication-navigation-rail ${view}`}
                            />
                        </div>
                        <div className="squeak-authentication-form-wrapper">
                            {message && <p className="squeak-auth-error">{message}</p>}

                            {
                                {
                                    'sign-in': (
                                        <SignIn
                                            buttonText={buttonText.login}
                                            setMessage={setMessage}
                                            onSubmit={(user) => {
                                                if (formValues) {
                                                    handleMessageSubmit?.(formValues, user)
                                                } else {
                                                    setParentView?.(null)
                                                }

                                                onAuth?.()
                                            }}
                                        />
                                    ),
                                    'sign-up': (
                                        <SignUp
                                            buttonText={buttonText.signUp}
                                            setMessage={setMessage}
                                            onSubmit={(user) => {
                                                if (formValues) {
                                                    handleMessageSubmit?.(formValues, user)
                                                } else {
                                                    setParentView?.(null)
                                                }

                                                onAuth?.()
                                            }}
                                        />
                                    ),
                                    'forgot-password': (
                                        <ForgotPassword setParentView={setParentView} setMessage={setMessage} />
                                    ),
                                    'reset-password': (
                                        <ResetPassword setParentView={setParentView} setMessage={setMessage} />
                                    ),
                                }[view]
                            }
                            {view !== 'forgot-password' && view !== 'reset-password' && (
                                <button onClick={handleForgotPassword} className="squeak-forgot-password">
                                    Forgot password
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </root.div>
    )
}

export default Authentication
