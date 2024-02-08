import React, { useState } from 'react'
import type { User } from 'hooks/useUser'
import Avatar from './Avatar'
import { CallToAction } from 'components/CallToAction'

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

const regions = [
    // { domain: 'https://app.posthog.com', label: 'US Cloud' },
    { domain: 'https://eu.posthog.com', label: 'EU Cloud' },
    // { domain: 'http://localhost:3001/auth', label: 'Link Cloud' },
    { domain: 'http://localhost:8000/authorize_and_redirect/', label: 'Local Cloud' },
]

export const Authentication = ({
    formValues,
    setParentView,
    initialView = 'sign-in',
    showBanner = true,
    showProfile = true,
    handleMessageSubmit,
    onAuth,
}: AuthenticationProps) => {
    const [view, setView] = useState(initialView)
    const [message, setMessage] = useState<string | null>(null)
    const [selectedRegion, setSelectedRegion] = useState<typeof regions[0]>(regions[0])

    const handleLogin = () => {
        const path = `?redirect=${encodeURI(window.location.href)}&forum_login=true`
        window.location.href = selectedRegion.domain + path
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
                        {regions.map((region) => (
                            <button
                                key={region.domain}
                                className={`${
                                    selectedRegion === region
                                        ? 'text-red dark:text-yellow'
                                        : 'text-black/50 dark:text-white/50'
                                } text-sm font-bold py-3 px-1`}
                                onClick={() => setSelectedRegion(region)}
                            >
                                {region.label}
                            </button>
                        ))}
                        <div
                            className={`bottom-[-1px] w-1/2 left-0 bg-red dark:bg-yellow h-[2px] transition-all absolute rounded-md ${
                                selectedRegion === regions[0] ? '' : 'translate-x-full'
                            }`}
                        />
                    </div>
                    <div>
                        {message && (
                            <p className="bg-[#FFF7E9] border-b border-black/20 dark:border-white/20 py-2 px-4 m-0 text-[red] font-semibold">
                                {message}
                            </p>
                        )}
                        <div className="py-4 px-6 bg-accent dark:bg-accent-dark">
                            <CallToAction onClick={() => handleLogin()} width="full" size="md">
                                Login using Cloud Account
                            </CallToAction>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication
