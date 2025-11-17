import React, { useState, useRef } from 'react'
import type { User } from 'hooks/useUser'
import ForgotPassword from './auth/ForgotPassword'
import Avatar from './Avatar'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import ResetPassword from './auth/ResetPassword'
import OSButton from 'components/OSButton'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'

export const inputClasses = `rounded-md border border-black/30 dark:border-white/30 block mb-5 py-2 px-4 w-full text-base text-black`
export const labelClasses = `block text-base font-semibold mb-1 opacity-60`

type AuthenticationProps = {
    formValues?: any
    setParentView?: (view: string | null) => void
    initialView?: string
    buttonText?: Record<string, string>
    showBanner?: boolean
    showProfile?: boolean
    handleMessageSubmit?: (values: any, user: User | null) => void
    onAuth?: (user: User) => void
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
        <div data-scheme="primary" className="bg-primary">
            {showProfile && <Avatar className="w-[40px] h-[40px]" />}
            {formValues && (
                <div className="items-center border border-primary bg-accent rounded flex py-2 px-4 max-w-xl mb-2">
                    <div className="items-baseline flex flex-1 min-w-0 whitespace-nowrap overflow-hidden">
                        {formValues?.subject && (
                            <h3 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold m-0 text-base mr-2 shrink-0">
                                {formValues.subject}
                            </h3>
                        )}
                        {formValues?.body}
                    </div>
                    <div className="ml-1 whitespace-nowrap">
                        <button
                            className="font-bold text-red dark:text-yellow text-sm"
                            onClick={() => setParentView?.('question-form')}
                        >
                            Edit post
                        </button>
                    </div>
                </div>
            )}
            <div style={showProfile ? { marginLeft: 54 } : {}}>
                {showBanner && (
                    <div className="bg-[#FFF7E9] border border-primary rounded mb-2 p-4 max-w-xl">
                        <h4 className="m-0 text-base pb-1 text-primary dark:text-primary-dark">
                            Please sign up to post.
                        </h4>
                        <p className="m-0 text-sm">Create an account to ask questions & help others.</p>
                    </div>
                )}
                <div className={`overflow-hidden relative max-w-sm ${showBanner ? '' : ''}`}>
                    {view !== 'forgot-password' && view !== 'reset-password' && (
                        <ToggleGroup
                            title="Authentication"
                            hideTitle
                            options={[
                                { label: 'Login', value: 'sign-in' },
                                { label: 'Signup', value: 'sign-up' },
                            ]}
                            value={view}
                            onValueChange={(value) => setView(value)}
                            className="mb-2"
                        />
                    )}
                    <div>
                        {message && (
                            <p className="bg-[#FFF7E9] border border-primary rounded py-2 px-4 m-0 text-red font-semibold mb-4">
                                {message}
                            </p>
                        )}
                        <div className="space-y-2">
                            {
                                {
                                    'sign-in': (
                                        <SignIn
                                            buttonText={buttonText.login}
                                            setMessage={setMessage}
                                            onSubmit={async (user) => {
                                                if (formValues) {
                                                    await handleMessageSubmit?.(formValues, user)
                                                } else {
                                                    setParentView?.(null)
                                                }

                                                onAuth?.(user)
                                            }}
                                        />
                                    ),
                                    'sign-up': (
                                        <SignUp
                                            buttonText={buttonText.signUp}
                                            setMessage={setMessage}
                                            onSubmit={async (user) => {
                                                if (formValues) {
                                                    await handleMessageSubmit?.(formValues, user)
                                                } else {
                                                    setParentView?.(null)
                                                }

                                                onAuth?.(user)
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
                                <OSButton width="full" variant="secondary" onClick={handleForgotPassword}>
                                    Forgot password
                                </OSButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication
