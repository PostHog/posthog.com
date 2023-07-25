import React, { useState, useRef } from 'react'
import type { User } from 'hooks/useUser'
import ForgotPassword from './auth/ForgotPassword'
import Avatar from './Avatar'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import ResetPassword from './auth/ResetPassword'
import Button from './Button'

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
        <div>
            {showProfile && <Avatar className="w-[40px] h-[40px] mr-[10px]" />}
            {formValues && (
                <div className="items-center border border-black/20 dark:border-white/20 rounded-md border-b-0 flex max-w-[600px] py-2 px-4 rounded-bl-none rounded-br-none">
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
            <div style={showProfile ? { marginLeft: 50 } : {}}>
                {showBanner && (
                    <div className="bg-[#FFF7E9] dark:bg-accent-dark border border-light dark:border-dark text-primary dark:text-primary-dark border-b-0 py-2 px-4 rounded-tr-0 rounded-tl-0">
                        <h4 className="m-0 text-base pb-1 text-primary dark:text-primary-dark">
                            Please signup to post.
                        </h4>
                        <p className="m-0 text-sm">Create an account to ask questions & help others.</p>
                    </div>
                )}
                <div
                    className={`border border-light dark:border-dark border-t-0 rounded-md overflow-hidden relative ${
                        showBanner ? 'rounded-tr-none rounded-tl-none' : ''
                    }`}
                >
                    <div className="border-y grid grid-cols-2 relative border-black/[.2] dark:border-white/[.2]">
                        <button
                            className={`${
                                view === 'sign-in' ? 'text-red dark:text-yellow' : 'text-black/50 dark:text-white/50'
                            } text-sm font-bold py-3 px-1`}
                            onClick={() => setView('sign-in')}
                        >
                            Login
                        </button>
                        <button
                            className={`${
                                view === 'sign-up' ? 'text-red dark:text-yellow' : 'text-black/50 dark:text-white/50'
                            } text-sm font-bold py-3 px-1`}
                            onClick={() => setView('sign-up')}
                        >
                            Signup
                        </button>
                        <div
                            style={{
                                opacity: view === 'forgot-password' || view === 'reset-password' ? 0 : 1,
                            }}
                            className={`bottom-[-1px] w-1/2 left-0 bg-red dark:bg-yellow h-[2px] transition-all absolute rounded-md ${
                                view === 'sign-up' ? 'translate-x-full' : ''
                            }`}
                        />
                    </div>
                    <div>
                        {message && (
                            <p className="bg-[#FFF7E9] border-b border-black/20 dark:border-white/20 py-2 px-4 m-0 text-[red] font-semibold">
                                {message}
                            </p>
                        )}
                        <div className="pt-4 px-6 bg-accent dark:bg-accent-dark">
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
                                <Button
                                    width="full"
                                    buttonType="outline"
                                    className="mt-2 mb-4"
                                    onClick={handleForgotPassword}
                                >
                                    Forgot password
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication
