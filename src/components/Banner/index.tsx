import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { useLayoutData } from '../Layout/hooks'
import { IconX } from '@posthog/icons'

function setCookie(name, value, days) {
    let expires = ''
    if (days) {
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

function getCookie(name) {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
}

export default function Banner() {
    const { compact } = useLayoutData()
    const [isCookieSet, setIsCookieSet] = useState(false)

    useEffect(() => {
        const cookie = getCookie('bannerDismissed')
        setIsCookieSet(cookie !== null)
    }, [])

    const handleDismiss = () => {
        setCookie('bannerDismissed', 'true', 7)
        setIsCookieSet(true)
        console.log('Banner dismissed')
    }

    return (
        <>
            {!compact && (
                <div
                    className={`${
                        isCookieSet ? 'h-0' : '!max-h-96'
                    } transition-all overflow-hidden relative hidden md:block border-b border-black/50`}
                    style={{ maxHeight: '0px' }}
                >
                    <div className="bg-red-2-dark md:text-center text-sm text-white pl-4 pr-10 md:px-10 py-2 font-semibold">
                        Why are you on a B2B SaaS website on Valentine’s Day weekend? Are you here for the{' '}
                        <Link to="/photobooth" className="underline font-bold hover:text-white" onClick={handleDismiss}>
                            photobooth?
                        </Link>
                        <button
                            onClick={handleDismiss}
                            className="absolute right-2 top-2 md:top-1.5 p-1 cursor-pointer"
                        >
                            <IconX className="size-4" />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
