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
                    className={`${isCookieSet ? 'h-0' : '!max-h-96'} transition-all overflow-hidden relative`}
                    style={{ maxHeight: '0px' }}
                >
                    <div className="bg-yellow/75 dark:bg-yellow/90 md:text-center text-sm dark:text-primary pl-4 pr-10 md:px-10 py-2">
                        <strong>We've decided to make less money:</strong> We've slashed our pricing for session replay.
                        They're now{' '}
                        <Link
                            to="/blog/session-replay-pricing"
                            className="underline font-semibold hover:text-red  dark:hover:text-red"
                            onClick={handleDismiss}
                        >
                            more than 50% cheaper
                        </Link>{' '}
                        for most customers.
                        <button onClick={handleDismiss} className="absolute right-2 top-2 md:top-1 p-1 cursor-pointer">
                            <IconX className="size-5" />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
